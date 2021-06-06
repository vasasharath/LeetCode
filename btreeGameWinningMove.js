/*
Two players play a turn based game on a binary tree.  We are given the root of this binary tree, and the number of nodes n in the tree.  n is odd, and each node has a distinct value from 1 to n.

Initially, the first player names a value x with 1 <= x <= n, and the second player names a value y with 1 <= y <= n and y != x.  The first player colors the node with value x red, and the second player colors the node with value y blue.

Then, the players take turns starting with the first player.  In each turn, that player chooses a node of their color (red if player 1, blue if player 2) and colors an uncolored neighbor of the chosen node (either the left child, right child, or parent of the chosen node.)

If (and only if) a player cannot choose such a node in this way, they must pass their turn.  If both players pass their turn, the game ends, and the winner is the player that colored more nodes.

You are the second player.  If it is possible to choose such a y to ensure you win the game, return true.  If it is not possible, return false.

 

Example 1:


Input: root = [1,2,3,4,5,6,7,8,9,10,11], n = 11, x = 3
Output: true
Explanation: The second player can choose the node with value 2.
 

Constraints:

root is the root of a binary tree with n nodes and distinct node values from 1 to n.
n is odd.
1 <= x <= n <= 100
*/
var btreeGameWinningMove = function (root, n, x) {
    const xNode = getNode(root, x);
    const leftNodeCount = getNodeCount(xNode.left);
    const rightNodeCount = getNodeCount(xNode.right);
    const parentNodeCount = getParentNodeCount(root, xNode);
    
    if (Math.max(leftNodeCount, rightNodeCount, parentNodeCount) > (n - 1) / 2) {
        return true;
    }
    return false;
};

function getNode(root, x) {
    if (!root) return null;
    
    if (root.val === x) {
        return root;
    }
    
    const leftNode = getNode(root.left, x);
    const rightNode = getNode(root.right, x);
    
    return leftNode || rightNode;
}

function getNodeCount(root) {
    if (!root) return 0;
    return 1 + getNodeCount(root.left) + getNodeCount(root.right);
}

function getParentNodeCount(root, x) {
    if (!root) return 0;
    if (root !== x) {
        return getParentNodeCount(root.left, x) + getParentNodeCount(root.right, x) + 1;
    }
    return 0;
}