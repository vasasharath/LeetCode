/*
In an n*n grid, there is a snake that spans 2 cells and starts moving from the top left corner at (0, 0) and (0, 1). The grid has empty cells represented by zeros and blocked cells represented by ones. The snake wants to reach the lower right corner at (n-1, n-2) and (n-1, n-1).

In one move the snake can:

Move one cell to the right if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
Move down one cell if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
Rotate clockwise if it's in a horizontal position and the two cells under it are both empty. In that case the snake moves from (r, c) and (r, c+1) to (r, c) and (r+1, c).

Rotate counterclockwise if it's in a vertical position and the two cells to its right are both empty. In that case the snake moves from (r, c) and (r+1, c) to (r, c) and (r, c+1).

Return the minimum number of moves to reach the target.

If there is no way to reach the target, return -1.

 

Example 1:



Input: grid = [[0,0,0,0,0,1],
               [1,1,0,0,1,0],
               [0,0,0,0,1,1],
               [0,0,1,0,1,0],
               [0,1,1,0,0,0],
               [0,1,1,0,0,0]]
Output: 11
Explanation:
One possible solution is [right, right, rotate clockwise, right, down, down, down, down, rotate counterclockwise, right, down].
Example 2:

Input: grid = [[0,0,1,1,1,1],
               [0,0,0,0,1,1],
               [1,1,0,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,0]]
Output: 9
 

Constraints:

2 <= n <= 100
0 <= grid[i][j] <= 1
It is guaranteed that the snake starts at empty cells.
*/
var minimumMoves = function(grid) {
    var min = Number.MAX_VALUE;
    var finishRowHead = grid.length - 1;
    var finishColHead = finishRowHead;
    var finishRowBody = finishRowHead;
    var finishColBody = finishRowHead - 1;
    var lastIndex = finishRowHead;
    var stack = [{ rowHead: 0, colHead: 1, rowBody: 0, colBody: 0, step: 0 }];
    var rowHead, colHead, rowBody, colBody, step;
    var next;
    var pos;
    
    while (stack.length) {
        pos = stack.shift();
        rowHead = pos.rowHead;
        colHead = pos.colHead;
        rowBody = pos.rowBody;
        colBody = pos.colBody;
        step = pos.step;
        
        if (rowHead === finishRowHead && colHead === finishColHead && rowBody === finishRowBody && colBody === finishColBody) {
            min = step;
            break;
        }
        
        step++;
        if (rowHead === rowBody) { // horizontal
            if (colHead !== lastIndex && grid[rowHead][(next = colHead + 1)] === 0) {
                stack.push({ rowHead: rowHead, colHead: next, rowBody: rowBody, colBody: colHead, step: step }); // right
            }
            if (rowHead !== lastIndex && grid[(next = rowHead + 1)][colHead] === 0 && grid[next][colBody] === 0) {
                stack.push({ rowHead: next, colHead: colHead, rowBody: next, colBody: colBody, step: step }); // down
                grid[next][colBody] = 1;
                stack.push({ rowHead: next, colHead: colBody, rowBody: rowBody, colBody: colBody, step: step }); // rotate
            }
        } else { // vertical
            if (rowHead !== lastIndex && grid[(next = rowHead + 1)][colHead] === 0) {
                stack.push({ rowHead: next, colHead: colHead, rowBody: rowHead, colBody: colBody, step: step }); // down
            }
            if (colHead !== lastIndex && grid[rowHead][(next = colHead + 1)] === 0 && grid[rowBody][next] === 0) {
                stack.push({ rowHead: rowHead, colHead: next, rowBody: rowBody, colBody: next, step: step }); // right
                grid[rowBody][next] = 1;
                stack.push({ rowHead: rowBody, colHead: next, rowBody: rowBody, colBody: colBody, step: step }); // rotate
            }
        }
    };
    
    return min === Number.MAX_VALUE ? -1 : min;
};