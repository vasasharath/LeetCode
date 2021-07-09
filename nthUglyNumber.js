/*
An ugly number is a positive integer that is divisible by a, b, or c.

Given four integers n, a, b, and c, return the nth ugly number.

 

Example 1:

Input: n = 3, a = 2, b = 3, c = 5
Output: 4
Explanation: The ugly numbers are 2, 3, 4, 5, 6, 8, 9, 10... The 3rd is 4.
Example 2:

Input: n = 4, a = 2, b = 3, c = 4
Output: 6
Explanation: The ugly numbers are 2, 3, 4, 6, 8, 9, 10, 12... The 4th is 6.
Example 3:

Input: n = 5, a = 2, b = 11, c = 13
Output: 10
Explanation: The ugly numbers are 2, 4, 6, 8, 10, 11, 12, 13... The 5th is 10.
Example 4:

Input: n = 1000000000, a = 2, b = 217983653, c = 336916467
Output: 1999999984
 

Constraints:

1 <= n, a, b, c <= 109
1 <= a * b * c <= 1018
It is guaranteed that the result will be in range [1, 2 * 109].
*/
var nthUglyNumber = function(n, a, b, c) {

    if(c === b) c = Number.MAX_SAFE_INTEGER;
    if(b === a) b = Number.MAX_SAFE_INTEGER;
    if(a === 1 || b === 1|| c === 1) return n;
    let tem = 1/a + 1/b + 1/c;
    let x = n/tem;
    let y = Math.floor(x);
    const fn = (x, y) => Math.floor(x/y);
    
    const dn = (a, b) => {
        function lcm_two_numbers(x, y) {
           if ((typeof x !== 'number') || (typeof y !== 'number')) 
            return false;
          return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
        }

        function gcd_two_numbers(x, y) {
          x = Math.abs(x);
          y = Math.abs(y);
          while(y) {
            var t = y;
            y = x % y;
            x = t;
          }
          return x;
        }
        return lcm_two_numbers(a, b);
    };
    
    let found = false;
    while( !found ){
        if( (y%a !== 0 && y%b !== 0 && y%c !== 0) ){
            y++;
        } else {
            if( fn(y,a) + fn(y, b) + fn(y, c) === n ){
                found = true;
            } else {
                y++;
            }
        }
    }
    
    let skiped = 0;
    skiped += fn(y, dn(a,b));
    skiped += fn(y, dn(a,c));
    skiped += fn(y, dn(b,c));
    skiped -= fn(y, dn( dn(a,b), dn(a,c)) );

    while(skiped >= 0){
        if(y%a !== 0 && y%b !== 0 && y%c !== 0){
            y++
        } else {
            skiped--;
            y++;
        }
    }

    return y-1;
    
    
};