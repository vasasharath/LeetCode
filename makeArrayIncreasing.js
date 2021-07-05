/*
Given two integer arrays arr1 and arr2, return the minimum number of operations (possibly zero) needed to make arr1 strictly increasing.

In one operation, you can choose two indices 0 <= i < arr1.length and 0 <= j < arr2.length and do the assignment arr1[i] = arr2[j].

If there is no way to make arr1 strictly increasing, return -1.

 

Example 1:

Input: arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
Output: 1
Explanation: Replace 5 with 2, then arr1 = [1, 2, 3, 6, 7].
Example 2:

Input: arr1 = [1,5,3,6,7], arr2 = [4,3,1]
Output: 2
Explanation: Replace 5 with 3 and then replace 3 with 4. arr1 = [1, 3, 4, 6, 7].
Example 3:

Input: arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
Output: -1
Explanation: You can't make arr1 strictly increasing.
 

Constraints:

1 <= arr1.length, arr2.length <= 2000
0 <= arr1[i], arr2[i] <= 10^9
*/
function makeArrayIncreasing(arr1, arr2) {
  arr2.sort((a, b) => a - b);
  
  let dp = new Map([[-1, 0]]), tmp;
  for (const currNum of arr1) {
    tmp = new Map();
    for (const [stateNum, ops] of dp) {
      updateState(currNum, stateNum, ops);
    }
    if (tmp.size === 0) return -1;
    dp = tmp;
  }
  
  return Math.min(...dp.values());
  
  function updateState(currNum, stateNum, ops) {
    const num = firstGreaterThan(arr2, stateNum);
    if (currNum > stateNum) {
      updateMapValByKey(currNum, ops);
      if (num !== undefined && num < currNum) {
        updateMapValByKey(num, ops + 1);
      }
    } else if (num !== undefined) {
      updateMapValByKey(num, ops + 1);
    }
  }
  
  function updateMapValByKey(key, val) {
    tmp.set(key, Math.min(tmp.get(key) || Infinity, val));
  }
  
  function firstGreaterThan(arr, target) {
    let begin = 0, end = arr.length;
    while (begin < end) {
      const mid = (begin + end) >> 1;
      if (arr[mid] <= target) begin = mid + 1;
      else end = mid;
    }
    return arr[end];
  }
};