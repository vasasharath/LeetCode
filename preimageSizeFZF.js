/*
Let f(x) be the number of zeroes at the end of x!. (Recall that x! = 1 * 2 * 3 * ... * x, and by convention, 0! = 1.)

For example, f(3) = 0 because 3! = 6 has no zeroes at the end, while f(11) = 2 because 11! = 39916800 has 2 zeroes at the end. Given k, find how many non-negative integers x have the property that f(x) = k.

Example 1:
Input: k = 0
Output: 5
Explanation: 0!, 1!, 2!, 3!, and 4! end with k = 0 zeroes.

Example 2:
Input: k = 5
Output: 0
Explanation: There is no x such that x! ends in k = 5 zeroes.
Note:

k will be an integer in the range [0, 109].
*/
const fx = function(x) {
    if(x < 5) return 0;
    let val = 5,
        count = 0;
    while(1) {
        const u = Math.floor(x/val);
        if(u === 0) break;
        count += u;
        val *= 5;
    }
    
    return count;
}

var preimageSizeFZF = function(K) {
    
    let lo = K, 
        hi = 5 * K;
    
    while(lo<=hi) {
        const mid = Math.floor((lo + hi) / 2);
        if(fx(mid) < K) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    
    let res = 0;
        
    while(fx(lo) === K) {
        res ++;
        lo++;
    }
    
    return res;
    
};