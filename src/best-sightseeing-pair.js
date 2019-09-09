/**
 * https://leetcode.com/problems/best-sightseeing-pair/
 * @param {number[]} A
 * @return {number}
 */
var maxScoreSightseeingPair = function(A) {
    let bestFirstIndex = 0;
    let maxScore = 0;
    const length = A.length;
    for (let j = 1; j < length; j++) {
        const first = A[bestFirstIndex];
        const second = A[j];
        maxScore = Math.max(maxScore, first + bestFirstIndex + second - j);
        if (second + j > first + bestFirstIndex) {
            bestFirstIndex = j;
        }
    }
    return maxScore;
};

console.assert(maxScoreSightseeingPair([8, 1, 5, 2, 6]) === 11, 'Unexpected result');
