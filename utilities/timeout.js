function timeout ( delay ) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            console.warn(`operation timed out (${delay}ms)`);
            reject();
        }, delay);
        timer.unref();
    });
}


module.exports = timeout;
