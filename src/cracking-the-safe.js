/**
 * https://leetcode.com/problems/cracking-the-safe/
 * @param {number} n
 * @param {number} k
 * @return {string}
 * 思路：这道题的本质是找到所有可能的密码，并且要求在输出时，输出过所有的可能性
 * 1.密码的可能性为 k^n
 * 2.最小的长度大于等于n+k^n-1
 * 3.答案不止一种，这里假设起使位置都是0开始
 */
var crackSafe = function(n, k) {
  const ans = new Set();
  const start = "0".repeat(n - 1);
  let result = start;
  const dfs = start => {
    for (let i = k - 1; i >= 0; i--) {
      let newAns = start + i;
      if (ans.has(newAns)) {
        continue;
      }
      ans.add(newAns);
      result += i;
      dfs(newAns.substr(1));
    }
  };
  dfs(start);
  return result;
};

console.assert(
  ["00110", "01100", "10011", "11001"].includes(crackSafe(2, 2)),
  "Unexpected result"
);
