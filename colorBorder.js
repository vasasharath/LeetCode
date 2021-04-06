/*
Given a 2-dimensional grid of integers, each value in the grid represents the color of the grid square at that location.

Two squares belong to the same connected component if and only if they have the same color and are next to each other in any of the 4 directions.

The border of a connected component is all the squares in the connected component that are either 4-directionally adjacent to a square not in the component, or on the boundary of the grid (the first or last row or column).

Given a square at location (r0, c0) in the grid and a color, color the border of the connected component of that square with the given color, and return the final grid.

 

Example 1:

Input: grid = [[1,1],[1,2]], r0 = 0, c0 = 0, color = 3
Output: [[3, 3], [3, 2]]
Example 2:

Input: grid = [[1,2,2],[2,3,2]], r0 = 0, c0 = 1, color = 3
Output: [[1, 3, 3], [2, 3, 3]]
Example 3:

Input: grid = [[1,1,1],[1,1,1],[1,1,1]], r0 = 1, c0 = 1, color = 2
Output: [[2, 2, 2], [2, 1, 2], [2, 2, 2]]
 

Note:

1 <= grid.length <= 50
1 <= grid[0].length <= 50
1 <= grid[i][j] <= 1000
0 <= r0 < grid.length
0 <= c0 < grid[0].length
1 <= color <= 1000
*/
var colorBorder = function(grid, r0, c0, color) {
    var lastRowIndex = grid.length - 1;
    var lastColumnIndex = grid[0].length - 1;
    
    var stack = [[r0, c0]];
    var initColor = grid[r0][c0];
    
    var index = 0;
    var point, left, right, top, bottom;
    
    while (index < stack.length) {
        point = stack[index];

        top = point[0] - 1;
        left = point[1] - 1;
        bottom = point[0] + 1;
        right = point[1] + 1;
        
        grid[point[0]][point[1]] = -1;
        
        if (point[0] > 0 && grid[top][point[1]] === initColor) {
            stack.push([top, point[1]]);
        }
        if (point[1] > 0 && grid[point[0]][left] === initColor) {
            stack.push([point[0], left]);
        }
        if (point[0] < lastRowIndex && grid[bottom][point[1]] === initColor) {
            stack.push([bottom, point[1]]);
        }
        if (point[1] < lastColumnIndex && grid[point[0]][right] === initColor) {
            stack.push([point[0], right]);
        }
        
        index++;
    }
    
    for (var i = 0; i < stack.length; i++) {
        point = stack[i];
        if (point[0] > 0 && grid[point[0] - 1][point[1]] < 0 
            && point[0] < lastRowIndex && grid[point[0] + 1][point[1]] < 0 
            && point[1] > 0 && grid[point[0]][point[1] - 1] < 0 
            && point[1] < lastColumnIndex && grid[point[0]][point[1] + 1] < 0) {
            stack[i].push(initColor);
        }
    }
    
    for (var data of stack) {
        grid[data[0]][data[1]] = data[2] === initColor ? initColor : color;
    }
    
    return grid;
};