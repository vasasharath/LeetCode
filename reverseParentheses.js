/*
You are given a string s that consists of lower case English letters and brackets. 

Reverse the strings in each pair of matching parentheses, starting from the innermost one.

Your result should not contain any brackets.

 

Example 1:

Input: s = "(abcd)"
Output: "dcba"
Example 2:

Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.
Example 3:

Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.
Example 4:

Input: s = "a(bcdefghijkl(mno)p)q"
Output: "apmnolkjihgfedcbq"
 

Constraints:

0 <= s.length <= 2000
s only contains lower case English characters and parentheses.
It's guaranteed that all parentheses are balanced.
*/
var reverseParentheses = function(s) {
    let stack = [];

    for (let iii = 0; iii < s.length; iii++) {
        if (s.charAt(iii) != ')') {
            stack.push(s.charAt(iii));
        } else {
            let reversed_internal = '';

            let pop_char = stack.pop();

            while (pop_char != '(') {
                reversed_internal += pop_char;
                pop_char = stack.pop();
            }

            reversed_internal = reversed_internal.split('');

            stack.push(...reversed_internal);
        }
    }

    return stack.join('');
};