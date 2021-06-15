/*
Given an n x n grid containing only values 0 and 1, where 0 represents water and 1 represents land, find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or water exists in the grid, return -1.

The distance used in this problem is the Manhattan distance: the distance between two cells (x0, y0) and (x1, y1) is |x0 - x1| + |y0 - y1|.

 

Example 1:


Input: grid = [[1,0,1],[0,0,0],[1,0,1]]
Output: 2
Explanation: The cell (1, 1) is as far as possible from all the land with distance 2.
Example 2:


Input: grid = [[1,0,0],[0,0,0],[0,0,0]]
Output: 4
Explanation: The cell (2, 2) is as far as possible from all the land with distance 4.
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 100
grid[i][j] is 0 or 1
*/
var maxDistance = function(grid) {
    var max = 0;
    var lastIndex = grid.length - 1;
    var point;
    
    var points = [];
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid.length; j++) {
            if (grid[i][j] === 1) {
                points.push({ row: i, col: j, step: 0 });
            }
        }
    }
    
    var row, col, step;
    while (points.length) {
        point = points.shift();
        
        if (max < point.step) {
            max = point.step;
        }
        
        step = point.step + 1;
        if (point.row > 0 && grid[(row = point.row - 1)][point.col] === 0) {
            grid[row][point.col] = step;
            points.push({ row: row, col: point.col, step: step });
        }
        if (point.col > 0 && grid[point.row][(col = point.col - 1)] === 0) {
            grid[point.row][col] = step;
            points.push({ row: point.row, col: col, step: step });
        }
        if (point.row < lastIndex && grid[(row = point.row + 1)][point.col] === 0) {
            grid[row][point.col] = step;
            points.push({ row: row, col: point.col, step: step });
        }
        if (point.col  < lastIndex && grid[point.row][(col = point.col + 1)] === 0) {
            grid[point.row][col] = step;
            points.push({ row: point.row, col: col, step: step });
        }
    }    

    return max === 0 ? -1 : max;
};