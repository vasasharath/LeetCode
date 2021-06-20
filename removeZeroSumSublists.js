/*
Given the head of a linked list, we repeatedly delete consecutive sequences of nodes that sum to 0 until there are no such sequences.

After doing so, return the head of the final linked list.  You may return any such answer.

 

(Note that in the examples below, all sequences are serializations of ListNode objects.)

Example 1:

Input: head = [1,2,-3,3,1]
Output: [3,1]
Note: The answer [1,2,1] would also be accepted.
Example 2:

Input: head = [1,2,3,-3,4]
Output: [1,2,4]
Example 3:

Input: head = [1,2,3,-3,-2]
Output: [1]
 

Constraints:

The given linked list will contain between 1 and 1000 nodes.
Each node in the linked list has -1000 <= node.val <= 1000.
*/
var removeZeroSumSublists = function(head) {
    let sum = 0, dummy = {val: 0, next: head},  map = {0: [dummy]};
    while(head){
        sum += head.val;
        if(sum in map) map[sum].forEach(node => node.next = head.next);
        map[sum] ? map[sum].push(head) : map[sum] = [head];
        head = head.next;
    }
    return dummy.next;
};
