/*
Given an array of positive integers arr (not necessarily distinct), return the lexicographically largest permutation that is smaller than arr, that can be made with exactly one swap (A swap exchanges the positions of two numbers arr[i] and arr[j]). If it cannot be done, then return the same array.

 

Example 1:

Input: arr = [3,2,1]
Output: [3,1,2]
Explanation: Swapping 2 and 1.
Example 2:

Input: arr = [1,1,5]
Output: [1,1,5]
Explanation: This is already the smallest permutation.
Example 3:

Input: arr = [1,9,4,6,7]
Output: [1,7,4,6,9]
Explanation: Swapping 9 and 7.
Example 4:

Input: arr = [3,1,1,3]
Output: [1,3,1,3]
Explanation: Swapping 1 and 3.
 

Constraints:

1 <= arr.length <= 104
1 <= arr[i] <= 104
*/
var prevPermOpt1 = function(A) {
    let first = -1
    let last = -1
    for(let i = A.length - 2; i >= 0 && first === -1; i--) {
        if(A[i] > A[i + 1]) first = i
    }
    if(first === -1) return A
    for(let j = first + 1; j <A.length; j++) {
        if(A[j] < A[first] && (last === -1 || A[j] > A[last])) last = j
    }
    [A[first], A[last]]  = [A[last], A[first]]
    return A
};