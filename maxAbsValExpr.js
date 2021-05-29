/*
Given two arrays of integers with equal lengths, return the maximum value of:

|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|

where the maximum is taken over all 0 <= i, j < arr1.length.

 

Example 1:

Input: arr1 = [1,2,3,4], arr2 = [-1,4,5,6]
Output: 13
Example 2:

Input: arr1 = [1,-2,-5,0,10], arr2 = [0,-2,-1,-7,-4]
Output: 20
 

Constraints:

2 <= arr1.length == arr2.length <= 40000
-10^6 <= arr1[i], arr2[i] <= 10^6
*/
var maxAbsValExpr = function(arr1, arr2) {
    const n = arr1.length;
    const bucket1 = new Array(n);
    const bucket2 = new Array(n);
    const bucket3 = new Array(n);
    const bucket4 = new Array(n);
    
    for(let i = 0; i < n; i++)
    {
        bucket1[i] = arr1[i] + arr2[i] + i;
        bucket2[i] = arr1[i] + arr2[i] - i;
        bucket3[i] = arr1[i] - arr2[i] + i;
        bucket4[i] = arr1[i] - arr2[i] - i;
    }

    return Math.max(
        getMinMaxDiff(bucket1),
        getMinMaxDiff(bucket2),
        getMinMaxDiff(bucket3),
        getMinMaxDiff(bucket4),
    );
};

function getMinMaxDiff(arr) {
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;

    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
        min = Math.min(min, arr[i]);
    }
    
    return max - min;
}