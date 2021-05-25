/*
We are given hours, a list of the number of hours worked per day for a given employee.

A day is considered to be a tiring day if and only if the number of hours worked is (strictly) greater than 8.

A well-performing interval is an interval of days for which the number of tiring days is strictly larger than the number of non-tiring days.

Return the length of the longest well-performing interval.

 

Example 1:

Input: hours = [9,9,6,0,6,6,9]
Output: 3
Explanation: The longest well-performing interval is [9,9,6].
 

Constraints:

1 <= hours.length <= 10000
0 <= hours[i] <= 16
*/
const longestWPI = (hours) => {
    let n = hours.length;
    let prefixSum = 0;
    let idxMap = new Map();
    let res = 0;
    for (let i = 0; i < n; i++) {
        prefixSum += hours[i] > 8 ? 1: -1;
        if (prefixSum > 0) {
            res = i + 1;
        } else {
            if (!idxMap.has(prefixSum)) {
                idxMap.set(prefixSum, i);
            }
            if (idxMap.has(prefixSum - 1)) {
                res = Math.max(res, i - idxMap.get(prefixSum - 1));
            }
        }
    }
    return res;
};