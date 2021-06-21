/*
You have an infinite number of stacks arranged in a row and numbered (left to right) from 0, each of the stacks has the same maximum capacity.

Implement the DinnerPlates class:

DinnerPlates(int capacity) Initializes the object with the maximum capacity of the stacks.
void push(int val) Pushes the given positive integer val into the leftmost stack with size less than capacity.
int pop() Returns the value at the top of the rightmost non-empty stack and removes it from that stack, and returns -1 if all stacks are empty.
int popAtStack(int index) Returns the value at the top of the stack with the given index and removes it from that stack, and returns -1 if the stack with that given index is empty.
Example:

Input: 
["DinnerPlates","push","push","push","push","push","popAtStack","push","push","popAtStack","popAtStack","pop","pop","pop","pop","pop"]
[[2],[1],[2],[3],[4],[5],[0],[20],[21],[0],[2],[],[],[],[],[]]
Output: 
[null,null,null,null,null,null,2,null,null,20,21,5,4,3,1,-1]

Explanation: 
DinnerPlates D = DinnerPlates(2);  // Initialize with capacity = 2
D.push(1);
D.push(2);
D.push(3);
D.push(4);
D.push(5);         // The stacks are now:  2  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 2.  The stacks are now:     4
                                                       1  3  5
                                                       ﹈ ﹈ ﹈
D.push(20);        // The stacks are now: 20  4
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.push(21);        // The stacks are now: 20  4 21
                                           1  3  5
                                           ﹈ ﹈ ﹈
D.popAtStack(0);   // Returns 20.  The stacks are now:     4 21
                                                        1  3  5
                                                        ﹈ ﹈ ﹈
D.popAtStack(2);   // Returns 21.  The stacks are now:     4
                                                        1  3  5
                                                        ﹈ ﹈ ﹈ 
D.pop()            // Returns 5.  The stacks are now:      4
                                                        1  3 
                                                        ﹈ ﹈  
D.pop()            // Returns 4.  The stacks are now:   1  3 
                                                        ﹈ ﹈   
D.pop()            // Returns 3.  The stacks are now:   1 
                                                        ﹈   
D.pop()            // Returns 1.  There are no stacks.
D.pop()            // Returns -1.  There are still no stacks.
 

Constraints:

1 <= capacity <= 20000
1 <= val <= 20000
0 <= index <= 100000
At most 200000 calls will be made to push, pop, and popAtStack.
*/
class DinnerPlates {
    constructor(capacity) {
        this.capacity = capacity;
        this.stacks = [];
        this.sortedEmptyArraySlotIndex = []; // big -> small
    }
    
    push (value) { // O(1)
        if (this.sortedEmptyArraySlotIndex.length === 0) { // no empty array slots, append value the end
            this.stacks.push(value);
        } else {
            this.stacks[this.sortedEmptyArraySlotIndex.pop()] = value; // add value to the first empty slot
        }
    }
    
    pop () { // amortized O(1)? in most cases? O(n) worst case (n = number of contiguous empty slots)
        let value = this.stacks.pop();
        while (this.stacks.length && value === undefined) { // if value had been removed by popAtStack e.g. [value1, undefined, undefined, undefined]
            value = this.stacks.pop();
        }
        return value === undefined ? - 1 : value;
    }
    
    popAtStack (index) { // O(n)
        // locate stack in the array
        const stackStartIndex = index * this.capacity;
        const stackEndIndex = stackStartIndex + this.capacity - 1;

        for (let i = stackEndIndex; i >= stackStartIndex; i--) {
            if (this.stacks[i] !== undefined) { // find the last non-empty value in the stack
                const returnValue = this.stacks[i];
                this.stacks[i] = undefined; // remove value from array        
				insertSorted(this.sortedEmptyArraySlotIndex, i); // add index to empty slots, sort big -> small
                return returnValue;
            }
        }
		
        return -1;
    }
}

function insertSorted(sortedArray, value) { // the value in the correct place in a sorted array
    sortedArray.push(value);
    let index = sortedArray.length - 1;
    while (sortedArray[index] > sortedArray[index - 1]) {
        [sortedArray[index], sortedArray[index-1]] = [sortedArray[index-1], sortedArray[index]]; // swap
        index--;
    }
}