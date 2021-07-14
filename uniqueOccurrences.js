/*
Given an array of integers arr, write a function that returns true if and only if the number of occurrences of each value in the array is unique.

 

Example 1:

Input: arr = [1,2,2,1,1,3]
Output: true
Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.
Example 2:

Input: arr = [1,2]
Output: false
Example 3:

Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
Output: true
 

Constraints:

1 <= arr.length <= 1000
-1000 <= arr[i] <= 1000
*/
var uniqueOccurrences = function (arr) {
    const numberAndCount = new Map();
    arr.forEach(num => {
        if (!numberAndCount.has(num)) {
            numberAndCount.set(num, 0);
        }
        numberAndCount.set(num, numberAndCount.get(num) + 1);
    });

    const set = new Set();

    const values = [...numberAndCount.values()];

    for (let i = 0; i < values.length; i++) {
        const val = values[i];
        if (set.has(val)) {
            return false;
        }
        set.add(val);
    }

    return true;
};