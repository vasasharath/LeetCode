/*
Today, the bookstore owner has a store open for customers.length minutes.  Every minute, some number of customers (customers[i]) enter the store, and all those customers leave after the end of that minute.

On some minutes, the bookstore owner is grumpy.  If the bookstore owner is grumpy on the i-th minute, grumpy[i] = 1, otherwise grumpy[i] = 0.  When the bookstore owner is grumpy, the customers of that minute are not satisfied, otherwise they are satisfied.

The bookstore owner knows a secret technique to keep themselves not grumpy for X minutes straight, but can only use it once.

Return the maximum number of customers that can be satisfied throughout the day.

 

Example 1:

Input: customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
Output: 16
Explanation: The bookstore owner keeps themselves not grumpy for the last 3 minutes. 
The maximum number of customers that can be satisfied = 1 + 1 + 1 + 1 + 7 + 5 = 16.
 

Note:

1 <= X <= customers.length == grumpy.length <= 20000
0 <= customers[i] <= 1000
0 <= grumpy[i] <= 1

*/
var maxSatisfied = function(customers, grumpy, X) {

    // Get base satisfaction assuming X === 0
    let totalSatisfaction = 0;
    for (let i = 0; i < customers.length; i++) if (!grumpy[i]) totalSatisfaction += customers[i];
    
    
    // Handle some easy edge cases
    if (X === 0) return totalSatisfaction;
    if (customers.length < X) return customers.reduce((acc, current) => acc + current, 0);
    
    
    // Use a sliding window of size X including customers that
    // would have been previously exluded when they were grumpy
    
    let slidingWindowSum = totalSatisfaction;
    let maxSum = totalSatisfaction;
    let currentEndPosition = -1;
    
    while (currentEndPosition < customers.length - 1) {
        currentEndPosition += 1;
        const previousStartPosition = currentEndPosition - X;
        
        if (previousStartPosition >= 0 && grumpy[previousStartPosition]) slidingWindowSum -= customers[previousStartPosition];
        if (grumpy[currentEndPosition]) slidingWindowSum += customers[currentEndPosition];
        
        maxSum = Math.max(slidingWindowSum, maxSum);
    }
    
    return maxSum;
};