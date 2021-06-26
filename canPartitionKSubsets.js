/*
Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.

 

Example 1:

Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
Example 2:

Input: nums = [1,2,3,4], k = 3
Output: false
 

Constraints:

1 <= k <= nums.length <= 16
1 <= nums[i] <= 104
The frequency of each element is in the range [1, 4].
*/
var canPartitionKSubsets = function(nums, k) {
    let total = nums.reduce((a,b)=>a+b)
    let answer = total/k 
    if (total%k!==0 ){
        return false
    }
  //DFS
    let marker = new Array(nums.length)
    marker.fill(false)
    function helper (  k, answer, start, index) {
        if(k===0) {
            return true
        }
        else{
            for (let i =index; i<nums.length; i++){
                if (nums[i]>answer){
                    return false
                }
                if (marker[i]===false && start+nums[i]<answer){
                    marker[i]=true
                    let result = helper(k, answer,start+nums[i] , i+1)
                    if (result ===true){
                        return true
                    }
                    marker[i]=false
                }
                else if (marker[i]===false && start+nums[i]===answer) {
                    marker[i]=true
                    let result = helper(k-1, answer,0 ,0)
                    if (result ===true){
                        return true
                    }
                    marker[i]=false
                }
            }
            return false
        }
    }
    let finalanswer = helper(k,answer,0,0)
    return finalanswer
};