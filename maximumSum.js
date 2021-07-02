/*
Given an array of integers, return the maximum sum for a non-empty subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum possible.

Note that the subarray needs to be non-empty after deleting one element.

 

Example 1:

Input: arr = [1,-2,0,3]
Output: 4
Explanation: Because we can choose [1, -2, 0, 3] and drop -2, thus the subarray [1, 0, 3] becomes the maximum value.
Example 2:

Input: arr = [1,-2,-2,3]
Output: 3
Explanation: We just choose [3] and it's the maximum sum.
Example 3:

Input: arr = [-1,-1,-1,-1]
Output: -1
Explanation: The final subarray needs to be non-empty. You can't choose [-1] and delete -1 from it, then get an empty subarray to make the sum equals to 0.
 

Constraints:

1 <= arr.length <= 105
-104 <= arr[i] <= 104
*/
var maximumSum = function(arr) {
  let dp = new Array(2).fill(0).map(x => new Array(arr.length).fill(0));
  let max = 0, next, hasPos = false;
  for(let i = arr.length-1; i >= 0; i--){
    
    next = dp[0][i+1] || 0;
    dp[0][i] = Math.max(arr[i] , arr[i]+next , 0);
    if(dp[0][i] > max) max = dp[0][i];
  }

  for(let i = arr.length-1; i >= 0; i--){
    next0 = dp[0][i+1] || 0;
    next1 = dp[1][i+1] || 0;
    dp[1][i] = Math.max(arr[i], next0, arr[i] + next1);
    if(dp[1][i] > max) max = dp[1][i];
  }

  if(max <= 0) return Math.max(...arr);
  return max;
};