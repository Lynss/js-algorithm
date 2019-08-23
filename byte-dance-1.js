import _ from 'lodash';

function byteDanceOne(userNum, degrees, groupNum, groups) {
    return groups.map(group => {
        const [left, right, k] = group;
        return _.slice(degrees, left - 1, right).filter(degree => degree === k).length;
    });
}

const result = byteDanceOne(5, [1, 2, 3, 3, 5], 3, [
    [1, 2, 1],
    [2, 4, 5],
    [3, 5, 3],
]);

console.warn(result);
console.assert(_.isEqual(result, [1, 0, 2]), 'byteDanceOne failed');
