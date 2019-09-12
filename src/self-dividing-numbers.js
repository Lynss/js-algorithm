import _ from 'lodash';

/**
 * https://leetcode.com/problems/self-dividing-numbers/
 * @param {number} left
 * @param {number} right
 * @return {number[]}
 */
var selfDividingNumbers = function (left, right) {
    return _.range(left, right + 1).filter(number => number.toString().split('').every(d => number % d === 0));
};

console.assert(_.isEqual(selfDividingNumbers(1, 22), [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]), 'Unexpected result');
