/*
Given two numbers arr1 and arr2 in base -2, return the result of adding them together.

Each number is given in array format:  as an array of 0s and 1s, from most significant bit to least significant bit.  For example, arr = [1,1,0,1] represents the number (-2)^3 + (-2)^2 + (-2)^0 = -3.  A number arr in array, format is also guaranteed to have no leading zeros: either arr == [0] or arr[0] == 1.

Return the result of adding arr1 and arr2 in the same format: as an array of 0s and 1s with no leading zeros.

 

Example 1:

Input: arr1 = [1,1,1,1,1], arr2 = [1,0,1]
Output: [1,0,0,0,0]
Explanation: arr1 represents 11, arr2 represents 5, the output represents 16.
Example 2:

Input: arr1 = [0], arr2 = [0]
Output: [0]
Example 3:

Input: arr1 = [0], arr2 = [1]
Output: [1]
 

Constraints:

1 <= arr1.length, arr2.length <= 1000
arr1[i] and arr2[i] are 0 or 1
arr1 and arr2 have no leading zeros
*/
var addNegabinary = function(arr1, arr2) {
     // making array size equal
      if(arr1.length > arr2.length) {
          arr2 = new Array(arr1.length - arr2.length).fill(0).concat(arr2);
      }
      else {
          arr1 = new Array(arr2.length - arr1.length).fill(0).concat(arr1);
      }
      let carry = 0;
      let result = [];
	  // carry 1 + 1 = -1  
      for(let i = arr2.length - 1; i >= 0; i--) {
          sum = carry + arr2[i] + arr1[i];
          carry = 0;
          if(sum > 1){
              carry = -1;
          }
          else if(sum < 0){
              carry = 1;
              sum = 1;
          }
          result.push(sum %2);
      }
      
      if( carry == -1) {
          result.push(1,1)
      }
    
      if( carry == 1) {
          result.push(1)
      }
    let t = 0;
    for(let i = result.length-1; i >= 0; i--) {
        if(result[i] === 1)
            break;
        t++;
    }
    if(t === result.length) {
        return [0];
    }
    return result.reverse().slice(t);
};