/*
You have a convex n-sided polygon where each vertex has an integer value. You are given an integer array values where values[i] is the value of the ith vertex (i.e., clockwise order).

You will triangulate the polygon into n - 2 triangles. For each triangle, the value of that triangle is the product of the values of its vertices, and the total score of the triangulation is the sum of these values over all n - 2 triangles in the triangulation.

Return the smallest possible total score that you can achieve with some triangulation of the polygon.

 

Example 1:


Input: values = [1,2,3]
Output: 6
Explanation: The polygon is already triangulated, and the score of the only triangle is 6.
Example 2:


Input: values = [3,7,4,5]
Output: 144
Explanation: There are two triangulations, with possible scores: 3*7*5 + 4*5*7 = 245, or 3*4*5 + 3*4*7 = 144.
The minimum score is 144.
Example 3:


Input: values = [1,3,1,4,1,5]
Output: 13
Explanation: The minimum score triangulation has score 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13.
 

Constraints:

n == values.length
3 <= n <= 50
1 <= values[i] <= 100
*/
var minScoreTriangulation = function(A) {
    let length = A.length;
    let dp = [];
    for (let i = 0;  i < length; i++)
        dp[i] = new Array(length);
    for (let gap = 0; gap < length; gap++) {
        for (let i = 0, j = gap; j < length; i++, j++) {
            if (j < i+2) {
                dp[i][j] = 0;
            } else {
                dp[i][j] = Infinity;
                for (let k = i+1; k < j; k++) {
                    let cost = dp[i][k] + dp[k][j] + A[i]*A[k]*A[j];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
    }
    return dp[0][length-1];
};