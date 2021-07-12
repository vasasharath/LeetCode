/*
You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.

You can swap the characters at any pair of indices in the given pairs any number of times.

Return the lexicographically smallest string that s can be changed to after using the swaps.

 

Example 1:

Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[1] and s[2], s = "bacd"
Example 2:

Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
Output: "abcd"
Explaination: 
Swap s[0] and s[3], s = "bcad"
Swap s[0] and s[2], s = "acbd"
Swap s[1] and s[2], s = "abcd"
Example 3:

Input: s = "cba", pairs = [[0,1],[1,2]]
Output: "abc"
Explaination: 
Swap s[0] and s[1], s = "bca"
Swap s[1] and s[2], s = "bac"
Swap s[0] and s[1], s = "abc"
 

Constraints:

1 <= s.length <= 10^5
0 <= pairs.length <= 10^5
0 <= pairs[i][0], pairs[i][1] < s.length
s only contains lower case English letters.
*/
var smallestStringWithSwaps = function(s, pairs) {
    let roots = []
    let res = s.split('')
    const n = s.length;
    for (let i=0; i<n; i++) roots[i] = i
    let rank = Array(n).fill(1)
    
    for (let [a, b] of pairs) {
        union(a, b)
    }
    
    const groups = {}
    for (let i=0; i<n; i++) {
        let k = find(i)
        groups[k] = groups[k] || []
        groups[k].push(i)
    }

    for (let key in groups) {
        let vals = groups[key];
        let sorted = vals.slice();
        sorted.sort((i1, i2) => s[i1].localeCompare(s[i2]))
        for (let i=0; i<vals.length; i++) {
            res[vals[i]] = s[sorted[i]]
        }
    }
    return res.join('')
    
    
    function union(a, b) {
        let x = find(a)
        let y = find(b)
        
        if (rank[x] > rank[y]) {
            roots[y] = x
            rank[x] += rank[y]
        } else {
            roots[x] = y
            rank[y] += rank[x]
        }
    }
    
    function find(x) {
        while (x !== roots[x]) x = roots[x]
        return x
    }
};