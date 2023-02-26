exports.orderBy = function (list, direction = 'ASC') {
    return list.sort((x, y) => {
        return direction === 'ASC'
            ? x.timeDelta - y.timeDelta
            : y.timeDelta - x.timeDelta;
    });
};
