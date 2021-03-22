/*
In an array A containing only 0s and 1s, a K-bit flip consists of choosing a (contiguous) subarray of length K and simultaneously changing every 0 in the subarray to 1, and every 1 in the subarray to 0.

Return the minimum number of K-bit flips required so that there is no 0 in the array.  If it is not possible, return -1.

 

Example 1:

Input: A = [0,1,0], K = 1
Output: 2
Explanation: Flip A[0], then flip A[2].
Example 2:

Input: A = [1,1,0], K = 2
Output: -1
Explanation: No matter how we flip subarrays of size 2, we can't make the array become [1,1,1].
Example 3:

Input: A = [0,0,0,1,0,1,1,0], K = 3
Output: 3
Explanation:
Flip A[0],A[1],A[2]: A becomes [1,1,1,1,0,1,1,0]
Flip A[4],A[5],A[6]: A becomes [1,1,1,1,1,0,0,0]
Flip A[5],A[6],A[7]: A becomes [1,1,1,1,1,1,1,1]
 

Note:

1 <= A.length <= 30000
1 <= K <= A.length
*/
var minKBitFlips = function(A, K) {
  if (!A || !A.length) return [];

  // flipped: keep track of total flipped status
  // 0: not flipped
  // 1: flipped
  let flips = 0, flipped = 0;
  // indicate whether A[i] is truly flipped or not
  const hasFlipped = Array(A.length).fill(0);

  for (const [i, num] of A.entries()) {
    // IMPORTANT: to determine whether at this pointer, the current value has been
    // flipped or not, we need to find it based on flipped and hasFlipped[i - k]
    if (i >= K) {
      flipped ^= hasFlipped[i - K];
    }

    // if num == 0 and current value has not been flipped yet (flipped == 0)
    // if num == 1 and current value has been flipped yet (flipped == 1)
    // for any of the two above cases, we need to flip the value
    if (flipped === num) {
      // if the window which starts from current value cannot fit into the array
      if (i + K - 1 >= A.length) return -1;

      // flip current value
      flipped ^= 1;

      // record it
      hasFlipped[i] = 1;

      ++flips;
    }
  }
  return flips;
};