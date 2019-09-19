/**
 * https://leetcode.com/problems/fruit-into-baskets/
 * @param {number[]} tree
 * @return {number}
 * 思路：本质上是找允许存在最多两种元素的最大区间
 */
var totalFruit = function(tree) {
  let max = 0;
  let contains = [];
  let before = -1;
  let counter = 0;
  let singleCounter = 0;
  let beforeCounter = 0;
  for (let i in tree) {
    const node = tree[i];
    //出现不一样的水果时，记录其数量
    if (before !== node) {
      before = node;
      //将容量记录好
      beforeCounter = singleCounter;
      //记录新的水果
      singleCounter = 0;
    }
    singleCounter += 1;
    counter += 1;
    if (!contains.includes(node)) {
      contains.push(node);
    } else if (contains[1] !== node) {
      contains.push(node);
      contains.shift();
    }
    //不能容纳这种水果
    if (contains.length > 2) {
      //从前一种水果开始计算新的容量
      contains.shift();
      counter = beforeCounter + 1;
      continue;
    }
    //计算此时两种水果的容量并记录max
    max = Math.max(counter, max);
  }
  return max;
};

console.assert(
  totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]) === 5,
  "Unexpected result"
);
