/*
Three stones are on a number line at positions a, b, and c.

Each turn, you pick up a stone at an endpoint (ie., either the lowest or highest position stone), and move it to an unoccupied position between those endpoints.  Formally, let's say the stones are currently at positions x, y, z with x < y < z.  You pick up the stone at either position x or position z, and move that stone to an integer position k, with x < k < z and k != y.

The game ends when you cannot make any more moves, ie. the stones are in consecutive positions.

When the game ends, what is the minimum and maximum number of moves that you could have made?  Return the answer as an length 2 array: answer = [minimum_moves, maximum_moves]

 

Example 1:

Input: a = 1, b = 2, c = 5
Output: [1,2]
Explanation: Move the stone from 5 to 3, or move the stone from 5 to 4 to 3.
Example 2:

Input: a = 4, b = 3, c = 2
Output: [0,0]
Explanation: We cannot make any moves.
Example 3:

Input: a = 3, b = 5, c = 1
Output: [1,2]
Explanation: Move the stone from 1 to 4; or move the stone from 1 to 2 to 4.
 

Note:

1 <= a <= 100
1 <= b <= 100
1 <= c <= 100
a != b, b != c, c != a
*/
var numMovesStones = function(a, b, c) {
    let arr = [a,b,c].sort((a,b) => a - b);
    
    // the num of moves that the last stone can make is the maximum
    const max = arr[2] - arr[0] - 2;
    
    // Normally, the num of minimum moves is which is moving `b` next to `a`, then moving `c` next to `b`
    let min = 2;
    
    // if there are no gaps between  `c` and `b`, or `b` and `a`, the num of minimum moves is 1
    if (arr[2] - arr[1] < 3 || arr[1] - arr[0] < 3) min = 1;
    
    // if these three stones are adjacent, there are no moves can be made
    if (arr[2] - arr[1] === 1 && arr[1] - arr[0] === 1) min = 0;
    
    return [min, max];
};