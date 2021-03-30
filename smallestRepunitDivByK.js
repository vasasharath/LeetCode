/*
Given a positive integer K, you need to find the length of the smallest positive integer N such that N is divisible by K, and N only contains the digit 1.

Return the length of N. If there is no such N, return -1.

Note: N may not fit in a 64-bit signed integer.

 

Example 1:

Input: K = 1
Output: 1
Explanation: The smallest answer is N = 1, which has length 1.
Example 2:

Input: K = 2
Output: -1
Explanation: There is no such positive integer N divisible by 2.
Example 3:

Input: K = 3
Output: 3
Explanation: The smallest answer is N = 111, which has length 3.
 

Constraints:

1 <= K <= 105
*/
var smallestRepunitDivByK = function(K) {
    if(!(K%2) || !(K%5)) return -1; // short circuit
    
    let len = 0, val = 0, loop = 100000;
    
    while(loop--) {
        val = (val*10 + 1) % K; 
        len++
        if(!val) return len;
    }
};