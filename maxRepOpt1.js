/*
Given a string text, we are allowed to swap two of the characters in the string. Find the length of the longest substring with repeated characters.

 

Example 1:

Input: text = "ababa"
Output: 3
Explanation: We can swap the first 'b' with the last 'a', or the last 'b' with the first 'a'. Then, the longest repeated character substring is "aaa", which its length is 3.
Example 2:

Input: text = "aaabaaa"
Output: 6
Explanation: Swap 'b' with the last 'a' (or the first 'a'), and we get longest repeated character substring "aaaaaa", which its length is 6.
Example 3:

Input: text = "aaabbaaa"
Output: 4
Example 4:

Input: text = "aaaaa"
Output: 5
Explanation: No need to swap, longest repeated character substring is "aaaaa", length is 5.
Example 5:

Input: text = "abcdef"
Output: 1
 

Constraints:

1 <= text.length <= 20000
text consist of lowercase English characters only.
*/
/**
 * @param {string} text
 * @return {number}
 */
var maxRepOpt1 = function(text) {
    var max = 0;
    var start = 0;
    var letter = text[0];
    var lastIndex = text.length - 1;
    var next = text.length + 1;
    var ranges = Object.create(null);
    
    for (var i = 1; i < next; i++) {
        if (letter !== text[i]) {
            if (ranges[letter]) {
                ranges[letter].push({ start: start, end: i });
            } else {
                ranges[letter] = [{ start: start, end: i }];
            }
            start = i;
            letter = text[i];
        }
    }
    
    var arr, prevArr;
    for (var letter in ranges) {
        arr = ranges[letter];
        max = Math.max(max, (arr.length > 1 ? (arr[0].end - arr[0].start + 1) : (arr[0].end - arr[0].start)));
        for (var i = 1; i < arr.length; i++) {
            max = Math.max(max, arr[i].end - arr[i].start + 1);
            prevArr = arr[i - 1];
            if (prevArr.end + 1 === arr[i].start) {
                max = Math.max(max, arr.length > 2 ? (arr[i].end - prevArr.start) : (arr[i].end - prevArr.start - 1));
            }
        }
    }
    
    return max;
};