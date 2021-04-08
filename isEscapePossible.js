/*
There is a 1 million by 1 million grid on an XY-plane, and the coordinates of each grid square are (x, y).

We start at the source = [sx, sy] square and want to reach the target = [tx, ty] square. There is also an array of blocked squares, where each blocked[i] = [xi, yi] represents a blocked square with coordinates (xi, yi).

Each move, we can walk one square north, east, south, or west if the square is not in the array of blocked squares. We are also not allowed to walk outside of the grid.

Return true if and only if it is possible to reach the target square from the source square through a sequence of valid moves.

 

Example 1:

Input: blocked = [[0,1],[1,0]], source = [0,0], target = [0,2]
Output: false
Explanation: The target square is inaccessible starting from the source square because we cannot move.
We cannot move north or east because those squares are blocked.
We cannot move south or west because we cannot go outside of the grid.
Example 2:

Input: blocked = [], source = [0,0], target = [999999,999999]
Output: true
Explanation: Because there are no blocked cells, it is possible to reach the target square.
 

Constraints:

0 <= blocked.length <= 200
blocked[i].length == 2
0 <= xi, yi < 106
source.length == target.length == 2
0 <= sx, sy, tx, ty < 106
source != target
It is guaranteed that source and target are not blocked.
*/
const dr = [-1, +1, 0, 0];

/**
 * Define col directions [north, south, east, west]
 * @type {number[]}
 */
const dc = [0, 0, +1, -1];

/**
 * Maximum row index 10^6
 * @type {number}
 */
const R = 10 ** 6;

/**
 * Maximum col index 10^6
 * @type {number}
 */
const C = 10 ** 6;

/**
 * @param {number[][]} blocked
 * @param {number[]} source
 * @param {number[]} target
 * @return {boolean}
 */
const isEscapePossible = function (blocked, source, target) {

    /**
     * Create a hash map of blocked cells
     * @type {Record<string, undefined>}
     */
    const blocks = blocked.reduce((acc, [r, c]) => {
        acc[`${r}-${c}`] = undefined;
        return acc;
    }, {});

    /**
     * Method explores neighborhood cells and add them
     * to bfs queue
     *
     * @param r         - current row
     * @param c         - current cell
     * @param visited   - visited map
     * @param rq        - row queue
     * @param cq        - col queue
     */
    function checkNeighborhood(r, c, visited, rq, cq) {
        /*
         * Go through all possible directions
         */
        for (let side = 0; side < 4; side++) {
            const nr = r + dr[side];
            const nc = c + dc[side];

            /*
             * Do not add new cell if it's not valid
             */
            if (nr < 0 || nr >= R) continue;
            if (nc < 0 || nc >= C) continue;

            /*
             * Create a key for cell in order to store it
             * as visited
             */
            const cell = `${nr}-${nc}`;

            /*
             * Check if the side is blocked or visited.
             */
            if (
                blocks.hasOwnProperty(cell) ||
                visited.hasOwnProperty(cell)
            ) continue;

            /*
             * If the cell is valid, we add its row and col
             * to queues
             */
            rq.push(nr);
            cq.push(nc);

            /*
             * Mark as visited
             */
            visited[`${nr}-${nc}`] = undefined;
        }
    }

    /*
     * We need some heuristic for determining if
     * it's possible to go to the end. In this solution
     * we use a Manhattan distance. 
     * 
     * If manhattan distance from source to current cell
     * is bigger than number of blocked cell we can say
     * that it's possible to go to the end
     *
     * https://cs.stanford.edu/people/abisee/gs.pdf
     */
    const LIMIT = blocked.length;

    /**
     * Performs BFS for target position from source
     * @param sr - start row
     * @param sc - start col
     * @param tR - target row
     * @param tC - target col
     * @returns {boolean}
     */
    function bfs([sr, sc], [tR, tC]) {
        /**
         * Stores visited cells
         * @type {Record<string, undefined>}
         */
        const visited = {};
        
        /*
         * Queues for storing cells
         */
        const rq = [];
        const cq = [];

        /*
         * Push start points
         */
        rq.push(sr);
        cq.push(sc);

        while (rq.length !== 0) {
            const r = rq.shift();
            const c = cq.shift();
            /*
             * If current cell equals to target, we found a solution
             */
            if (r === tR && c === tC) return true;
            
            /*
             * If manhattan distance from source to current cell
             * is bigger than number of blocked cell we can say
             * that it's possible to go to the end
             */
            if ((Math.abs(sr - r) + Math.abs(sc - c)) > LIMIT) return true;

            /*
             * Perform neighborhood check
             */
            checkNeighborhood(r, c, visited, rq, cq);
        }

        // if no solution found
        return false;
    }
    
    /*
     * Here we check two things
     * 1. It's possible to go from source to target
     * 2. It's possible to go from target to source
     * 
     * If both true, it's possible to get to target
     * position
     */
    return bfs(source, target) && bfs(target, source);
};