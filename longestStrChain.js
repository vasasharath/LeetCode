/*
Given a list of words, each word consists of English lowercase letters.

Let's say word1 is a predecessor of word2 if and only if we can add exactly one letter anywhere in word1 to make it equal to word2.  For example, "abc" is a predecessor of "abac".

A word chain is a sequence of words [word_1, word_2, ..., word_k] with k >= 1, where word_1 is a predecessor of word_2, word_2 is a predecessor of word_3, and so on.

Return the longest possible length of a word chain with words chosen from the given list of words.

 

Example 1:

Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chain is "a","ba","bda","bdca".
Example 2:

Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
 

Constraints:

1 <= words.length <= 1000
1 <= words[i].length <= 16
words[i] only consists of English lowercase letters.
*/
function isPredecessor(word1, word2) {
    let ptr1 = 0;
    let ptr2 = 0;
    let diff = 1;
    
    while (ptr1 < word1.length || ptr2 < word2.length) {
        const char1 = word1[ptr1];
        const char2 = word2[ptr2];
        
        if (diff < 0) {
            return false;
        }
        
        if (char1 === char2) {
            ptr1++;
            ptr2++;
        } else {
            diff--;
            ptr1++;
        }
    }
    
    return true;
}

var longestStrChain = function(words) {
    words = words.sort((a, b) => a.length - b.length);
    
    const dp = new Array(words.length).fill(1);
    
    for (let i = 0; i < words.length; i++) {
        const word1 = words[i];
        
        for (let j = i - 1; j >= 0; j--) {
            const word2 = words[j];
            
            if (word1.length - word2.length === 0) {
                continue;
            } else if (word1.length - word2.length > 1) {
                break;
            }
            
            if (isPredecessor(word1, word2)) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);
};