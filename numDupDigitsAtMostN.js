/*
Given a positive integer N, return the number of positive integers less than or equal to N that have at least 1 repeated digit.

 

Example 1:

Input: 20
Output: 1
Explanation: The only positive number (<= 20) with at least 1 repeated digit is 11.
Example 2:

Input: 100
Output: 10
Explanation: The positive numbers (<= 100) with atleast 1 repeated digit are 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100.
Example 3:

Input: 1000
Output: 262
 

Note:

1 <= N <= 10^9
*/
var numDupDigitsAtMostN = function(N) {
    var r = N
    var nn = new Array(10).fill(false)
    var nnp = function (len,nn,t=0){
        if (len == 0){
            if (t > N) return true
            r--
            return false
        }else{
            t*=10
            for (var i = (t?0:1); i < 10; i++){
                if (nn[i]) continue
                nn[i] = true
                var flag = nnp(len - 1, nn, t + i)
                nn[i] = false
                if (flag)return true
            }
        }
    }
    var Nlen = (""+N).length
    for (var len = 1; len <= Nlen; len ++){
        nnp(len, nn)            
    }
    
    return r
};