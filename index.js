const os = require('os');
const path = require('path');
const { fork } = require('child_process');
const { getRandomRegexp, getRandomString } = require('./generators');
const { orderBy } = require('./utilities/sort');
const timeout = require('./utilities/timeout');

// default timeout value 120s
const DEFAULT_DELAY = 120_000;

const threadsMax = os.availableParallelism?.() ?? os.cpus().length;
const charList = JSON.parse(process.argv[2]);
const delay = parseInt(process.argv[3], 10) || DEFAULT_DELAY;

if ( !Array.isArray(charList) ) {
    console.error('unexpected CLI argument, expect string[]');
    process.exit(1);
}

const regexpList = getRandomRegexp(charList);
const randomString = getRandomString(
    // get unique [A-Za-z] characters
    charList.join('').match(/([a-z])(?!.*\1)/gi),
    20
);
const stat = [];
const workerPool = [];

function run () {
    const jobList = [];

    for ( let i = 0; i < threadsMax; ++i ) {
        const job = new Promise((resolve, reject) => {
            const worker = fork(path.join(__dirname, 'worker.js'));
            workerPool.push(worker);
            worker.on('message', data => {
                stat.push(data);

                // nothing left to process
                if ( !regexpList.length ) {
                    worker.kill();

                    return resolve();
                }

                worker.send({regexp: regexpList.pop(), string: randomString});
            });
        });
        jobList.push(job);
    }

    workerPool.forEach(worker => {
        worker.send({regexp: regexpList.pop(), string: randomString});
    });

    return Promise.race([
        // set time limiter for execution time upper bound
        timeout(delay),
        Promise.all(jobList)
    ]);
}

run()
    .then(() => console.table(orderBy(stat, 'DESC')))
    .catch(() => {
        workerPool.forEach(worker => worker.kill());
        // some workers finished their job
        stat.length && console.table(orderBy(stat, 'DESC'));
    });
