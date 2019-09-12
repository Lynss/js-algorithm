import _ from 'lodash';
/**
 * find duplicate subtrees
 * https://leetcode.com/problems/find-duplicate-subtrees/submissions/
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
    const map = {};
    let result = [];
    function lookUp(tree) {
        if (!tree) {
            return '_';
        }
        const key = tree.val + '-' + lookUp(tree.left) + '-' + lookUp(tree.right);
        const preCount = map[key] || 0;
        if (map[key] === 1) {
            result.push(tree);
        }
        map[key] = preCount + 1;
        return key;
    }

    lookUp(root);
    return result;
};

const test = new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3, new TreeNode(2, new TreeNode(4)), new TreeNode(4)));

const result = findDuplicateSubtrees(test);
console.assert(_.isEqual(result, [[2,4], 4]),'Unexpected result');
