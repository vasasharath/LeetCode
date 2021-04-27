/*
Given a matrix and a target, return the number of non-empty submatrices that sum to target.

A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2.

Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some coordinate that is different: for example, if x1 != x1'.

 

Example 1:


Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4
Explanation: The four 1x1 submatrices that only contain 0.
Example 2:

Input: matrix = [[1,-1],[-1,1]], target = 0
Output: 5
Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.
Example 3:

Input: matrix = [[904]], target = 0
Output: 0
 

Constraints:

1 <= matrix.length <= 100
1 <= matrix[0].length <= 100
-1000 <= matrix[i] <= 1000
-10^8 <= target <= 10^8
*/
const numSubmatrixSumTarget = (g, target) => {
    let n = g.length;
    let m = g[0].length;
    let res = 0;
    for (let i = 0; i < n; i++) { // prefix sum for each row, use original grid to save
        for (let j = 1; j < m; j++) {
            g[i][j] += g[i][j - 1];
        }
    }
    for (let i = 0; i < m; i++) { // for every possible (left column, right column) range
        for (let j = i; j < m; j++) {
            let ma = new Map();
            ma.set(0, 1);
            let cur = 0;
            for (let k = 0; k < n; k++) { // accumulate the prefix sum of submatrices by adding up the sum of values for each row
                cur += g[k][j] - (i > 0 ? g[k][i - 1] : 0);
                res += ma.get(cur - target) || 0;
                ma.set(cur, ma.get(cur) + 1 || 1);
            }
        }
    }
    return res;
};