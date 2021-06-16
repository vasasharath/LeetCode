/*
Given a string s, return the last substring of s in lexicographical order.

 

Example 1:

Input: s = "abab"
Output: "bab"
Explanation: The substrings are ["a", "ab", "aba", "abab", "b", "ba", "bab"]. The lexicographically maximum substring is "bab".
Example 2:

Input: s = "leetcode"
Output: "tcode"
 

Constraints:

1 <= s.length <= 4 * 105
s contains only lowercase English letters.
*/
var lastSubstring = function(s) { 
    let res = 0;
    for(let i = 1; i < s.length; i++){
        if(s.slice(i) > s.slice(res)) res = i;     
    };
    return s.slice(res);
};