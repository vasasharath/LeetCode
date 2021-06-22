/*
Return the number of permutations of 1 to n so that prime numbers are at prime indices (1-indexed.)

(Recall that an integer is prime if and only if it is greater than 1, and cannot be written as a product of two positive integers both smaller than it.)

Since the answer may be large, return the answer modulo 10^9 + 7.

 

Example 1:

Input: n = 5
Output: 12
Explanation: For example [1,2,5,4,3] is a valid permutation, but [5,2,3,4,1] is not because the prime number 5 is at index 1.
Example 2:

Input: n = 100
Output: 682289015
 

Constraints:

1 <= n <= 100
*/
var numPrimeArrangements = function(n) {
    /*
    Let say count of prime numbers from 1 to n is primeCount
    And rest or the numbers are nonePrimeCount, nonePrimeCount=n-primeCount;
    The answer will be factorial primeCount *  v
    */
    let primeCount,nonePrimeCount,ans=1;
    primeCount = countPrime(n);
    nonePrimeCount = n-primeCount;
    for(let i=0;i<primeCount;i++){//Calculate factorial primeCount
        ans*=primeCount-i;
        ans%=1000000007;
    }
    for(let i=0;i<nonePrimeCount;i++){//Calculate factorial primeCount and multiply with factorial primeCount
        ans*=nonePrimeCount-i;
        ans%=1000000007;
    }
    return ans;
    function countPrime(n){
        var prime=[],count=0;
        for(let i=2;i<=n;i++){
            prime[i]=true;
        }
        for(let i=2;i*i<=n;i++){
            if(prime[i]===false){
                continue;
            }
            for(let j=i*i;j<=n;j+=i){
                prime[j]=false;
            }
        }
        for(let i=2;i<=n;i++){
            if(prime[i]===true){
                count++;
            }
        }
        return count;
    }
};