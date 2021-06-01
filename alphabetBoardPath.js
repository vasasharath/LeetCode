/*
On an alphabet board, we start at position (0, 0), corresponding to character board[0][0].

Here, board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"], as shown in the diagram below.



We may make the following moves:

'U' moves our position up one row, if the position exists on the board;
'D' moves our position down one row, if the position exists on the board;
'L' moves our position left one column, if the position exists on the board;
'R' moves our position right one column, if the position exists on the board;
'!' adds the character board[r][c] at our current position (r, c) to the answer.
(Here, the only positions that exist on the board are positions with letters on them.)

Return a sequence of moves that makes our answer equal to target in the minimum number of moves.  You may return any path that does so.

 

Example 1:

Input: target = "leet"
Output: "DDR!UURRR!!DDD!"
Example 2:

Input: target = "code"
Output: "RR!DDRR!UUL!R!"
 

Constraints:

1 <= target.length <= 100
target consists only of English lowercase letters.
*/
var alphabetBoardPath = function(target) {
    let board = ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "z"]
    let map = {}
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
            map[board[i].charAt(j)]=[i,j]
        }
    }
    // console.log(map)
    let curr = [0,0]
    let res = ''
    for(let i=0;i<target.length;i++){
        let ele = target[i]
        // console.log(ele,map[ele])
        let col = map[ele][1]-curr[1]
        let row = map[ele][0]-curr[0]
        let count = 0
        for(let j=0;j<Math.abs(row);j++){
            if(map[ele][0] == 5 && map[ele][1] == 0 && count == row-1){
                break;
            }
            if(row<0){
               res += 'U' 
            }else{
                res += 'D'
            }
            count++
        }
        for(let j=0;j<Math.abs(col);j++){
            
            if(col<0){
               res += 'L' 
            }else{
                res += 'R'
            }
        }
        if(count < Math.abs(row)){
            for(let j=0;j<Math.abs(row)-count;j++){
            if(row<0){
               res += 'U' 
            }else{
                res += 'D'
            }
            count++
        }
        }
        res += '!'
        curr = map[ele]
    }
    return res
};