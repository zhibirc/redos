const required = require('./utilities/required');
const shiftLeft = require('./utilities/shift-left');
const isValidRegexp = require('./utilities/is-valid-regexp');

exports.getRandomString = (charList = required(), length = 100, separator = '') => {
    return charList.length
        ? Array.from({length}, () => charList[Math.random() * charList.length ^ 0]).join(separator) + '!'
        : '';
};

exports.getRandomRegexp = (charList = required()) => {
    charList = ['(', ')', '|', '+', '*'].concat(charList);
    const length = charList.length;
    const result = [charList.join('')];
    const index = Array.from({length}, (_, i) => i);
    let pivotIndex = length - 1;

    while ( pivotIndex > 0 ) {
        shiftLeft(index, pivotIndex);

        if ( index[pivotIndex] === pivotIndex ) {
            pivotIndex -= 1;
        } else {
            result.push(charList.map((x, i) => charList[index[i]]).join(''));
            pivotIndex = length - 1;
        }
    }

    return result.filter(isValidRegexp).map(re => re + '$');
};
