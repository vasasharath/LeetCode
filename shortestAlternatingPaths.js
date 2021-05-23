/*
Consider a directed graph, with nodes labelled 0, 1, ..., n-1.  In this graph, each edge is either red or blue, and there could be self-edges or parallel edges.

Each [i, j] in red_edges denotes a red directed edge from node i to node j.  Similarly, each [i, j] in blue_edges denotes a blue directed edge from node i to node j.

Return an array answer of length n, where each answer[X] is the length of the shortest path from node 0 to node X such that the edge colors alternate along the path (or -1 if such a path doesn't exist).

 

Example 1:

Input: n = 3, red_edges = [[0,1],[1,2]], blue_edges = []
Output: [0,1,-1]
Example 2:

Input: n = 3, red_edges = [[0,1]], blue_edges = [[2,1]]
Output: [0,1,-1]
Example 3:

Input: n = 3, red_edges = [[1,0]], blue_edges = [[2,1]]
Output: [0,-1,-1]
Example 4:

Input: n = 3, red_edges = [[0,1]], blue_edges = [[1,2]]
Output: [0,1,2]
Example 5:

Input: n = 3, red_edges = [[0,1],[0,2]], blue_edges = [[1,0]]
Output: [0,1,1]
 

Constraints:

1 <= n <= 100
red_edges.length <= 400
blue_edges.length <= 400
red_edges[i].length == blue_edges[i].length == 2
0 <= red_edges[i][j], blue_edges[i][j] < n
*/
var shortestAlternatingPaths = function(n, red_edges, blue_edges) {
    let graph = new Graph(n, red_edges, blue_edges);
    graph.bfs();
    return graph.getRes();
};

var Graph = function(n, red, blue) {
    debugger
    let arr = Array.from({length : n}, (t,i) => new Node(i));
    red.forEach(([a,b]) => {
        arr[a].redChildren.push(arr[b]);
    })
    blue.forEach(([a,b]) => {
        arr[a].blueChildren.push(arr[b]);
    })
    let root = arr[0];
    let res = Array.from({length: n}, ()=> -1);
    
    this.bfs = function(){
        this.bfsColor(0);
        this.bfsColor(1);
    }
    
    this.bfsColor = function(offset){
        let queue = [root];
        let steps = 0;
        let visited = new Set();
        visited.add(0);
        while(queue.length > 0){
            let len = queue.length;
            let newQueue = [];
            for(let i = 0; i < len; i++){
                let cur = queue.pop();
                if(res[cur.val] < 0) res[cur.val] = steps;
                else res[cur.val] = Math.min(res[cur.val], steps);
                
                cur.getChildren(steps + offset).forEach(c => {
                    let key = steps % 2 === 0 ? c.val : -c.val;
                    if(visited.has(key)) return;
                    newQueue.push(c);
                    visited.add(key);
                })
            }
            queue = newQueue;
            steps++;
        }
    }
    this.getRes = function() {
        return res;
    }
}

var Node = function(val) {
    this.val = val;
    this.redChildren = [];
    this.blueChildren = [];
    this.getChildren = function(n) {
        if(n % 2 === 0) return this.redChildren;
        return this.blueChildren;
    }
}