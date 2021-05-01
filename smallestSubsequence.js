/*
Return the lexicographically smallest subsequence of s that contains all the distinct characters of s exactly once.

Note: This question is the same as 316: https://leetcode.com/problems/remove-duplicate-letters/

 

Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
 

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
*/
var smallestSubsequence = function (s) {
  const resultStack = [];
  const seen = new Set();
  const lastOccur = {};

  // Track last appearance for each character.
  for (let i = 0; i < s.length; i++) {
    lastOccur[s[i]] = i;
  }

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // Add only not seen.
    if (!seen.has(char)) {
      let peak = getResultPeak();

      // Compare with last added and remove last added if it's bigger and not last.
      while (peak && char < peak && lastOccur[peak] > i) {
        const removed = resultStack.pop();
        seen.delete(removed);
        peak = getResultPeak();
      }
      resultStack.push(char);
      seen.add(char);
    }
  }

  function getResultPeak() {
    return resultStack.length && resultStack[resultStack.length - 1];
  }

  return resultStack.join("");
};