import _ from 'lodash';

/**
 * https://leetcode.com/problems/add-strings/
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    let up = 0;
    const l1 = num1.length;
    const l2 = num2.length;
    const max = Math.max(l1, l2);
    let result = [];
    for (let x = 1; x <= max; x++) {
        const n1 = +num1[l1 - x] || 0;
        const n2 = +num2[l2 - x] || 0;
        let total = n1 + n2 + up;
        if (total >= 10) {
            total -= 10;
            up = 1;
        } else {
            up = 0;
        }
        result.unshift(total);
    }
    if (up === 1) {
        result.unshift(up);
    }
    return result.join('');
};


console.warn(addStrings('0', '0'));
