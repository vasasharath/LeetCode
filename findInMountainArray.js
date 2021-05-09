/*
You may recall that an array A is a mountain array if and only if:

A.length >= 3
There exists some i with 0 < i < A.length - 1 such that:
A[0] < A[1] < ... A[i-1] < A[i]
A[i] > A[i+1] > ... > A[A.length - 1]
Given a mountain array mountainArr, return the minimum index such that mountainArr.get(index) == target.  If such an index doesn't exist, return -1.

You can't access the mountain array directly.  You may only access the array using a MountainArray interface:

MountainArray.get(k) returns the element of the array at index k (0-indexed).
MountainArray.length() returns the length of the array.
Submissions making more than 100 calls to MountainArray.get will be judged Wrong Answer.  Also, any solutions that attempt to circumvent the judge will result in disqualification.

 

Example 1:

Input: array = [1,2,3,4,5,3,1], target = 3
Output: 2
Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, which is 2.
Example 2:

Input: array = [0,1,2,4,2,1], target = 3
Output: -1
Explanation: 3 does not exist in the array, so we return -1.
 

Constraints:

3 <= mountain_arr.length() <= 10000
0 <= target <= 10^9
0 <= mountain_arr.get(index) <= 10^9
*/
var findInMountainArray = function(target, mountainArr) {
    const cache = {};
    getCachedValue = (i) => {
        if (undefined === cache[i]) cache[i] = mountainArr.get(i);
        return cache[i];
    }
    binarySearch = (lo, hi, desc) => {
        while(lo <= hi) {
            let mid = Math.trunc(lo + (hi - lo) / 2);
            const val = getCachedValue(mid);
            if (val == target)  {
                return mid;
            } else if (desc && val > target || !desc && val <= target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }
    let max = 0, n = mountainArr.length();
    cache[n] = Number.MIN_VALUE;
    let right = n;
    while (max < right) {
        let mid = Math.trunc(max + (right - max) / 2);
        if (getCachedValue(mid) > getCachedValue(mid + 1)) right = mid;
        else max = mid + 1;
    }
    const res = binarySearch(0, max, false);
    return res == -1 ? binarySearch(max, n - 1, true) : res;
};