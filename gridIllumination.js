/*
You are given a grid of size N x N, and each cell of this grid has a lamp that is initially turned off.

You are also given an array of lamp positions lamps, where lamps[i] = [rowi, coli] indicates that the lamp at grid[rowi][coli] is turned on. When a lamp is turned on, it illuminates its cell and all other cells in the same row, column, or diagonal.

Finally, you are given a query array queries, where queries[i] = [rowi, coli]. For the ith query, determine whether grid[rowi][coli] is illuminated or not. After answering the ith query, turn off the lamp at grid[rowi][coli] and its 8 adjacent lamps if they exist. A lamp is adjacent if its cell shares either a side or corner with grid[rowi][coli].

Return an array of integers ans, where ans[i] should be 1 if the lamp in the ith query was illuminated, or 0 if the lamp was not.

 

Example 1:


Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
Output: [1,0]
Explanation: We have the initial grid with all lamps turned off. In the above picture we see the grid after turning on the lamp at grid[0][0] then turning on the lamp at grid[4][4].
The 0th query asks if the lamp at grid[1][1] is illuminated or not (the blue square). It is illuminated, so set ans[0] = 1. Then, we turn off all lamps in the red square.

The 1st query asks if the lamp at grid[1][0] is illuminated or not (the blue square). It is not illuminated, so set ans[1] = 0. Then, we turn off all lamps in the red rectangle.

Example 2:

Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
Output: [1,1]
Example 3:

Input: N = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
Output: [1,1,0]
 

Constraints:

1 <= N <= 109
0 <= lamps.length <= 20000
lamps[i].length == 2
0 <= lamps[i][j] < N
0 <= queries.length <= 20000
queries[i].length == 2
0 <= queries[i][j] < N
*/
const gridIllumination = (N, lamps, queries) => {
  const ans = [];
  const set = new Set();
  const row = {};
  const col = {};
  const d1 = {};
  const d2 = {};

  for (const lamp of lamps) {
    const [x, y] = lamp;
    const key = `${x}-${y}`;
    if (!set.has(key)) {
      set.add(key);
      row[x] = (row[x] || 0) + 1;
      col[y] = (col[y] || 0) + 1;
      d1[x + y] = (d1[x + y] || 0) + 1;
      d2[x - y] = (d2[x - y] || 0) + 1;
    }
  }

  for (const query of queries) {
    const [x, y] = query;
    if (row[x] > 0 || col[y] > 0 || d1[x + y] > 0 || d2[x - y] > 0) {
      ans.push(1);
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          const key = `${i}-${j}`;
		  
          if (set.has(key)) {
            set.delete(key);
            row[i]--;
            col[j]--;
            d1[i + j]--;
            d2[i - j]--;
          }
		  
        }
      }
    } else {
      ans.push(0);
    }
  }
  
  return ans;
};