/*
Given a string s, consider all duplicated substrings: (contiguous) substrings of s that occur 2 or more times. The occurrences may overlap.

Return any duplicated substring that has the longest possible length. If s does not have a duplicated substring, the answer is "".

 

Example 1:

Input: s = "banana"
Output: "ana"
Example 2:

Input: s = "abcd"
Output: ""
 

Constraints:

2 <= s.length <= 3 * 104
s consists of lowercase English letters.
*/
var longestDupSubstring = function(S) {
    let len = S.length;
    let sa = buildSuffixArray(S);
    let lcp = buildLongestCommonPrefix(S, sa);
    let max = 0;
    let startInd = 0;
    let endInd = 0;
    for (let i = 0; i < len; i++) {
        let len = lcp[i];
        if (len > max) {
            max = len;
            startInd = sa[i];
            endInd = sa[i] + len;
        }
    }
    return S.substring(startInd, endInd);
    
    function buildSuffixArray(S) {
        let suffixes = new Array(len);
        let suffixArray = new Array(len);
    	for (let i = len-1; i >=0 ; i--)
        	suffixes[i] = [i, S.substr(i)];
        suffixes.sort(function(x,y) {return x[1] < y[1] ? -1 : 1;});
        for(let i = 0; i < len; i++)
        	suffixArray[i] = suffixes[i][0];
        return suffixArray;
    } 
    
    function buildLongestCommonPrefix(S, sa) {
        let lcp = new Array(len);
        let ra = new Array(len);
        let longest = 0;
        for (let i = 0; i < len; i++)
            ra[sa[i]] = i;
        for (let i = 0; i < len; i++) {
            if (ra[i] == len-1) {
                longest = 0;
                continue;
            }
            let j = sa[ra[i] + 1];
            while (i + longest < len && j + longest < len && S[i+longest] == S[j+longest])
                longest++;
            lcp[ra[i]] = longest;
            if (longest > 0)
                longest--;
        }
        lcp[len-1] = 0;
        return lcp;
    }    
        
};