/*
For two strings s and t, we say "t divides s" if and only if s = t + ... + t  (t concatenated with itself 1 or more times)

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

 

Example 1:

Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Example 3:

Input: str1 = "LEET", str2 = "CODE"
Output: ""
Example 4:

Input: str1 = "ABCDEF", str2 = "ABC"
Output: ""
 

Constraints:

1 <= str1.length <= 1000
1 <= str2.length <= 1000
str1 and str2 consist of English uppercase letters.
*/
var gcdOfStrings = function(str1, str2) {
	if (str1 === '' || str2 === '') return '';

	let times = gcd(str1.length, str2.length);
	let str = str1 + str2;
	let common = str.substring(0, times);
	str = str.substring(times);

	while(str.length) {
		let tmp = str.substring(0, times);
		str = str.substring(times);
		if (tmp !== common) return '';
	}

	return common;

	function gcd(a, b) {
		if(b === 0) return a;
		return gcd(b, a % b);
	}
};