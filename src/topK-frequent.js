import _ from 'lodash';

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
    const result = new Map();
    _.each(words, word => {
        let before = result.get(word) || 0;
        result.set(word, before + 1);
    });
    return _.chain([...result])
        .sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]))
        .take(k)
        .map(([value]) => value)
        .value();
};

console.warn(topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 3));