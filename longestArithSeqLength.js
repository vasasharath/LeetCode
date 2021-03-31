/*
Given an array A of integers, return the length of the longest arithmetic subsequence in A.

Recall that a subsequence of A is a list A[i_1], A[i_2], ..., A[i_k] with 0 <= i_1 < i_2 < ... < i_k <= A.length - 1, and that a sequence B is arithmetic if B[i+1] - B[i] are all the same value (for 0 <= i < B.length - 1).

 

Example 1:

Input: A = [3,6,9,12]
Output: 4
Explanation: 
The whole array is an arithmetic sequence with steps of length = 3.
Example 2:

Input: A = [9,4,7,2,10]
Output: 3
Explanation: 
The longest arithmetic subsequence is [4,7,10].
Example 3:

Input: A = [20,1,15,3,10,5,8]
Output: 4
Explanation: 
The longest arithmetic subsequence is [20,15,10,5].
*/
var longestArithSeqLength = function(A) {
    const LEN = A.length;
    if (LEN < 3)
        return LEN;
    
    let ans = 0, dp = [];
    for(let i = 0; i < LEN; i++)
        dp.push(new Map([[0, 1]]));    // difference: count of 

    for(let i = 1; i < LEN; i++) {
        let ai = A[i], dpi = dp[i];
        for(let j = 0; j < i; j++) {
            let aj = A[j], dpj = dp[j];
            let dif = ai - aj;
            if(dpj.has(dif)) {
                dpi.set(dif, 1 + dpj.get(dif));
                ans = Math.max(ans, dpi.get(dif));
            }
            else{
                dpi.set(dif, 2);
                ans = Math.max(ans, 2);
            }
        }
    }
    
    return ans;
};