function timeout ( delay ) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.warn(`operation timed out (${delay}ms)`);
            reject();
        }, delay);
    });
}


module.exports = timeout;
