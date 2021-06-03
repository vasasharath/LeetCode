/*
Alice and Bob continue their games with piles of stones.  There are a number of piles arranged in a row, and each pile has a positive integer number of stones piles[i].  The objective of the game is to end with the most stones. 

Alice and Bob take turns, with Alice starting first.  Initially, M = 1.

On each player's turn, that player can take all the stones in the first X remaining piles, where 1 <= X <= 2M.  Then, we set M = max(M, X).

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

 

Example 1:

Input: piles = [2,7,9,4,4]
Output: 10
Explanation:  If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 piles in total. So we return 10 since it's larger. 
Example 2:

Input: piles = [1,2,3,4,5,100]
Output: 104
 

Constraints:

1 <= piles.length <= 100
1 <= piles[i] <= 104
*/
var stoneGameII = function(piles) {
    let cache = [];

    const takePiles = (piles, index, M) => {
        let maxPiles = -Infinity;
        let totalPiles = 0;
        
        if (!cache[index]) {
            cache[index] = [];
        }

        if (cache[index][M]) {
            return cache[index][M];
        }

        if (index + 2*M >= piles.length) {
            for (let i = index; i < piles.length; i++) {
                totalPiles += piles[i];
            }
            
            cache[index][M] = totalPiles;
            return totalPiles;
        }
        
        for (let i = index; i < Math.min(piles.length, index + 2*M); i++) {
            totalPiles += piles[i];
            maxPiles = Math.max(maxPiles, totalPiles - takePiles(piles, i + 1, Math.max(M, i - index + 1), false));
        }
        
        cache[index][M] = maxPiles;
        return maxPiles;
    }
    
    let totalPiles = piles.reduce((prev, cur) => prev + cur, 0);

    return 0.5 * (totalPiles + takePiles(piles, 0, 1));
};