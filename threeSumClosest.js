/*
Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 

Constraints:

3 <= nums.length <= 10^3
-10^3 <= nums[i] <= 10^3
-10^4 <= target <= 10^4
*/
var threeSumClosest = function(nums, target) {
    const sortedNums = nums.sort((a, b) => a - b);
    let closestNum = undefined;
    for(i = 0; i < sortedNums.length - 2; i++) {
      let left = i + 1;
      let right = sortedNums.length - 1;
      while(left < right) {
        const sum = sortedNums[i] + sortedNums[left] + sortedNums[right];
        // 此处不要用 !closestNum判断
        if(closestNum === undefined) {
          closestNum = sum;
        } else {
          if (Math.abs(sum - target) < Math.abs(closestNum - target)) {
            closestNum = sum;
          }
        }  
        if (sum < target) {
          left++;
        } else if (sum > target) {
          right--;
        } else {
          return target;
        }
      }
    }
    return closestNum;
};