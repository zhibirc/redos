const { hrtime } = require('process');

process.on('message', data => {
    const { regexp, string } = data;
    if ( !regexp || !string ) process.exit(1);

    const cpuStartUsage = process.cpuUsage();
    const timeStart = hrtime.bigint();

    // potential CPU usage spike
    const result = new RegExp(regexp).test(string);

    const cpuLoad = process.cpuUsage(cpuStartUsage);
    const timeDelta = Number(hrtime.bigint() - timeStart) / 1e6;

    process.send({
        string: `${string.slice(0, 20)}... (${string.length})`,
        regexp: `/${regexp}/`,
        result,
        cpuLoad,
        timeDelta
    });
});
