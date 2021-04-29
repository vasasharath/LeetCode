/*
You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

 

Example 1:

Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
Example 2:

Input: tiles = "AAABBC"
Output: 188
Example 3:

Input: tiles = "V"
Output: 1
 

Constraints:

1 <= tiles.length <= 7
tiles consists of uppercase English letters.
*/
let fm=new Map();//factorial
var numTilePossibilities = function(tilesOrig) {    
    tilesOrig=tilesOrig.split('').sort().join('');
    let fac = function(n){
        if(n==1||n==0)
            return 1;
        if(fm.has(n))
            return fm.get(n);
        let t=n*fac(n-1);
        fm.set(n,t);
        return t;
    }
    
    let repeat=new Map();
    let solve = function(tiles){        
        if(repeat.has(tiles)||tiles.length<=0)
            return 0;
        let s=1;
        let freq=new Map();    
        tiles.split('').map((item)=>{
            let t=freq.get(item)||0;
            freq.set(item,t+1);        
        });
        [...freq.values()].map((item)=>{
            s*=fac(item);
        });
        let f=fac(tiles.length);
        f=f/s;   
        repeat.set(tiles,f);
        
        let ar=tiles.split('');
        for(let i=0;i<ar.length;i++){
            let copy=ar[i];
            ar.splice(i,1);
            f+=solve(ar.join(''));
            ar.splice(i,0,copy);
        }
        return f;
    }
    return solve(tilesOrig);
    
};