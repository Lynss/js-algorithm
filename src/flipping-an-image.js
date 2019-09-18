import _ from 'lodash';

/**
 * https://leetcode.com/problems/flipping-an-image/
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = function(A) {
    return A.map(matrix=>matrix.reverse().map(i => Math.abs(i - 1)));
};

console.assert(_.isEqual(flipAndInvertImage([[1, 1, 0], [1, 0, 1], [0, 0, 0]]), [[1, 0, 0], [0, 1, 0], [1, 1, 1]]), 'Unexpected result');
