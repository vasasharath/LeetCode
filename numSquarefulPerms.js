/*
Given an array A of non-negative integers, the array is squareful if for every pair of adjacent elements, their sum is a perfect square.

Return the number of permutations of A that are squareful.  Two permutations A1 and A2 differ if and only if there is some index i such that A1[i] != A2[i].

 

Example 1:

Input: [1,17,8]
Output: 2
Explanation: 
[1,8,17] and [17,8,1] are the valid permutations.
Example 2:

Input: [2,2,2]
Output: 1
 

Note:

1 <= A.length <= 12
0 <= A[i] <= 1e9
*/
var numSquarefulPerms = function(A) {
    // key a of A, value: number of a
    let map = {};
    let graph = {}; 
    A.forEach(a => {
        map[a] = ~~map[a] + 1;
        A.forEach(b => {
            if(Math.sqrt(a + b) % 1 === 0) {
                if(a in graph)
                    graph[a].add(b);
                else {
                    graph[a] = new Set();
                    graph[a].add(b);
                }
            }
        })
    });
    let res = 0;
    var dfs = function(p, remain) {
        if(remain === 0) {
            res++;
            return;
        }
        if(graph[p]) {
            graph[p].forEach(q => {
                if(map[q] > 0) {
                    map[q]--;
                    dfs(q, remain - 1);
                    map[q]++;
                }
            })
        }
    }
    Object.keys(graph).forEach(start => {
        map[start]--;
        dfs(start, A.length - 1);
        map[start]++;
    })
    
    return res;
};