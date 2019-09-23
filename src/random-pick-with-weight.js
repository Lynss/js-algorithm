/**
 * https://leetcode.com/problems/random-pick-with-weight/
 * @param {number[]} w
 * 思路，
 * 1.一个权重对应数组中的一个索引，同一个权重对应的不同索引有相同的值 //失败。。。数字太大了。。。
 * 2.一个数据对应一个权重，每一个值都是前一个的加值，求和
 */
var Solution = function(w) {
  this.weightArray = [];
  let before = 0;
  w.forEach((value, index) => {
    this.weightArray[index] = before + value;
    before = this.weightArray[index];
  });
  this.sum = before;
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function() {
  const randomValue = Math.floor(Math.random() * this.sum);
  let start = 0;
  let end = this.weightArray.length - 1;
  while (start < end) {
    const mid = start + Math.floor((end - start) / 2);
    if (randomValue >= this.weightArray[mid]) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  return start;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
