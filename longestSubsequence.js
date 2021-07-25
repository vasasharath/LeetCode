/*
Given an integer array arr and an integer difference, return the length of the longest subsequence in arr which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals difference.

A subsequence is a sequence that can be derived from arr by deleting some or no elements without changing the order of the remaining elements.

 

Example 1:

Input: arr = [1,2,3,4], difference = 1
Output: 4
Explanation: The longest arithmetic subsequence is [1,2,3,4].
Example 2:

Input: arr = [1,3,5,7], difference = 1
Output: 1
Explanation: The longest arithmetic subsequence is any single element.
Example 3:

Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
Output: 4
Explanation: The longest arithmetic subsequence is [7,5,3,1].
 

Constraints:

1 <= arr.length <= 105
-104 <= arr[i], difference <= 104
*/
var longestSubsequence = function (arr, difference) {
    const n = arr.length;
    if (n === 0) return 0;
    const dp = new Array(n).fill(1);

    const numberAndLatestIndex = new Map();
    let global = 1;
    
    numberAndLatestIndex.set(arr[0], 0);

    for (let i = 1; i < n; i++) {
        if (numberAndLatestIndex.has(arr[i] - difference)) {
            dp[i] = dp[numberAndLatestIndex.get(arr[i] - difference)] + 1;
        }
        global = Math.max(global, dp[i]);

        numberAndLatestIndex.set(arr[i], i);
    }

    return global;
};
