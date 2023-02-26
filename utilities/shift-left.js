function shiftLeft ( list, untilIndex ) {
    if ( !list.length ) return list;

    const first = list[0];

    for ( let i = 0; i < untilIndex; ++i ) {
        list[i] = list[i + 1];
    }

    list[untilIndex] = first;
}


module.exports = shiftLeft;
