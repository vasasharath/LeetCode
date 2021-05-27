/*
Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a==c and b==d), or (a==d and b==c) - that is, one domino can be rotated to be equal to another domino.

Return the number of pairs (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].

 

Example 1:

Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1
 

Constraints:

1 <= dominoes.length <= 40000
1 <= dominoes[i][j] <= 9
*/
var numEquivDominoPairs = function(dominoes) {
    let length = dominoes.length;
    let hash = {};
    let count = 0;
    for (let i = 0; i < length; i++) {
        let domino = dominoes[i];
        let leftPart = domino[0];
        let rightPart = domino[1];
        if (leftPart > rightPart) {
            [leftPart, rightPart] = [rightPart, leftPart];
        };
        let straight = leftPart + '' + rightPart;
        if (!hash[straight]) {
            hash[straight] = 1;
            continue;
        };
        let pairs = ++hash[straight];
        count = count - (pairs - 1) * (pairs - 2) / 2  + pairs * (pairs - 1) / 2;
    };
    return count; 
};