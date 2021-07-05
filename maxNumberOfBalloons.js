/*
Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

You can use each character in text at most once. Return the maximum number of instances that can be formed.

 

Example 1:



Input: text = "nlaebolko"
Output: 1
Example 2:



Input: text = "loonbalxballpoon"
Output: 2
Example 3:

Input: text = "leetcode"
Output: 0
 

Constraints:

1 <= text.length <= 104
text consists of lower case English letters only.
*/
var maxNumberOfBalloons = function(text) {
  const one = {
    b: 1,
    a: 1,
    l: 2,
    o: 2,
    n: 1
  };
  const map = {};
  for (let i = 0; i < text.length; i++) {
    if (one[text[i]]) map[text[i]] = (map[text[i]] || 0) + 1;
  }
  for (const key of Object.keys(one)) {
    if (!map[key]) return 0;
  }
  map['l'] = map['l'] >> 1;
  map['o'] = map['o'] >> 1;
  return Math.min(...Object.values(map));
};