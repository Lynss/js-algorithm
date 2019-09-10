/**
 * https://leetcode.com/problems/set-intersection-size-at-least-two/
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
    const [initial,...sortedIntervals] = intervals.sort((a, b) => {
        if (a[1] !== b[1]) {
            return a[1] - b[1];
        } else {
            return b[0] - a[0];
        }
    });
    const result = sortedIntervals.reduce((acc, current) => {
        const [begin, end] = current;
        const length = acc.length;

        //没有交集
        if (begin > acc[length - 1]) {
            acc.push(end - 1);
            acc.push(end);
        } else if (begin <= acc[length - 1] && begin > acc[length - 2]) {
            acc.push(end);
        }
        //包含关系不处理
        return acc;
    }, [initial[1] - 1, initial[1]]);
    return result.length;
};

console.assert(intersectionSizeTwo([[6, 21], [1, 15], [15, 20], [10, 21], [0, 7]]) === 4, 'Unexpected result');
// console.assert(intersectionSizeTwo([[33,44],[42,43],[13,37],[24,33],[24,33],[25,48],[10,47],[18,24],[29,37],[7,34]]) === 6, 'Unexpected result');
// console.assert(intersectionSizeTwo([[0, 3], [4, 5], [1, 3], [0, 2], [1, 5]]) === 4, 'Unexpected result');
// console.assert(intersectionSizeTwo([[12, 19], [18, 25], [4, 6], [19, 24], [19, 22]]) === 5, 'Unexpected result');
// console.assert(intersectionSizeTwo([[1, 3], [1, 4], [2, 5], [3, 5]]) === 3, 'Unexpected result');
// console.assert(intersectionSizeTwo([[1, 2], [2, 3], [2, 4], [4, 5]]) === 5, 'Unexpected result');
