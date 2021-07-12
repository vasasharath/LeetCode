/*
There are n items each belonging to zero or one of m groups where group[i] is the group that the i-th item belongs to and it's equal to -1 if the i-th item belongs to no group. The items and the groups are zero indexed. A group can have no item belonging to it.

Return a sorted list of the items such that:

The items that belong to the same group are next to each other in the sorted list.
There are some relations between these items where beforeItems[i] is a list containing all the items that should come before the i-th item in the sorted array (to the left of the i-th item).
Return any solution if there is more than one solution and return an empty list if there is no solution.

 

Example 1:



Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
Output: [6,3,4,1,5,2,0,7]
Example 2:

Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3],[],[4],[]]
Output: []
Explanation: This is the same as example 1 except that 4 needs to be before 6 in the sorted list.
 

Constraints:

1 <= m <= n <= 3 * 104
group.length == beforeItems.length == n
-1 <= group[i] <= m - 1
0 <= beforeItems[i].length <= n - 1
0 <= beforeItems[i][j] <= n - 1
i != beforeItems[i][j]
beforeItems[i] does not contain duplicates elements.
*/
var sortItems = function (n, m, group, beforeItems) {
    const vertexs = new Map();
    const groupVertexs = new Map();
    let groupNo = m;
    for (let i = 0; i < n; i++) {
        vertexs.set(i, {
            neighbors: new Set(),
            indegree: 0
        });
        if (group[i] === -1) {
            group[i] = groupNo++;
        }
        if (!groupVertexs.has(group[i])) {
            groupVertexs.set(group[i], {
                v: new Set(),
                neighbors: new Set(),
                indegree: 0
            });
        }
        groupVertexs.get(group[i]).v.add(i);
    }


    for (let i = 0; i < n; i++) {
        for (const before of beforeItems[i]) {
            if (!vertexs.get(before).neighbors.has(i)) {
                vertexs.get(i).indegree += 1;
            }
            vertexs.get(before).neighbors.add(i);

            const groupOfBefore = group[before];
            if (groupOfBefore === group[i]) continue;
            if (!groupVertexs.get(groupOfBefore).neighbors.has(group[i])) {
                groupVertexs.get(group[i]).indegree += 1;
            }
            groupVertexs.get(groupOfBefore).neighbors.add(group[i]);
        }
    }

    const zeroGroup = [];
    for (const group of groupVertexs) {
        if (group[1].indegree === 0) {
            zeroGroup.push(group[0]);
        }
    }
    const result = [];
    let cntGroup = 0;
    let cntV = 0;
    const groupTotal = groupVertexs.size;

    while (zeroGroup.length) {
        const top = zeroGroup.pop();
        cntGroup += 1;
        const v = groupVertexs.get(top).v;
        const total = v.size;
        const zero = [];

        for (const i of v) {
            if (vertexs.get(i).indegree === 0) {
                zero.push(i);
            }
        }
        while (zero.length) {
            const it = zero.pop();
            result.push(it);
            for (const n of vertexs.get(it).neighbors) {
                vertexs.get(n).indegree -= 1;
                if (v.has(n) && vertexs.get(n).indegree === 0) {
                    zero.push(n);
                }
            }
        }
        if (result.length - cntV !== total) {
            return [];
        }
        cntV = result.length;

        for (const groupneigbor of groupVertexs.get(top).neighbors) {
            groupVertexs.get(groupneigbor).indegree -= 1;
            if (groupVertexs.get(groupneigbor).indegree === 0) {
                zeroGroup.push(groupneigbor);
            }
        }
    }
    return cntGroup === groupTotal ? result : [];
};