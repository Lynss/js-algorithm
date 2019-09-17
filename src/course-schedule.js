/**
 * https://leetcode.com/problems/course-schedule/
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * 思路:关键在于条件中是否有循环条件。如果有，则不能，否则行
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const courseMap = [];
    for (let prerequisite of prerequisites) {
        const [want, require] = prerequisite;
        courseMap[want] = require;
    }
    return prerequisites.every(prerequisite => {
        const [want, require] = prerequisite;
        let forbidden = new Set([want, require]);
        let reqReq = courseMap[require];
        while (reqReq !== undefined) {
            if (forbidden.has(reqReq)) {
                return false;
            }
            forbidden.add(reqReq);
            reqReq = courseMap[reqReq];
        }
        return true;
    });
};

console.assert(canFinish(3,[[1,0],[2,1]]), 'Unexpected result');
console.assert(canFinish(2, [[1,0]]), 'Unexpected result');
console.assert(!canFinish(2, [[1,0],[0,1]]), 'Unexpected result');
