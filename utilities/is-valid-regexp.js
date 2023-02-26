function isValidRegexp ( value ) {
    try {
        new RegExp(value);

        return !/(?:^|\()\||\|(?:$|\))/.test(value) && !/\(\)/.test(value);
    } catch {
        return false;
    }
}


module.exports = isValidRegexp;
