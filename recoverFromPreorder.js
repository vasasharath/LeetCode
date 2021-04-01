/*
We run a preorder depth-first search (DFS) on the root of a binary tree.

At each node in this traversal, we output D dashes (where D is the depth of this node), then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The depth of the root node is 0.

If a node has only one child, that child is guaranteed to be the left child.

Given the output S of this traversal, recover the tree and return its root.

 

Example 1:


Input: S = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
Example 2:


Input: S = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]
Example 3:


Input: S = "1-401--349---90--88"
Output: [1,401,null,349,88,90]
 

Constraints:

The number of nodes in the original tree is in the range [1, 1000].
1 <= Node.val <= 109
*/
var recoverFromPreorder = function(S) {
    if(S.length<=0)
        return null;
    let i=0;
    while(i<S.length&&S[i]!=='-')
        i++;
    let root=new TreeNode(S.substring(0,i));
    let stk=new Array();
    let temp;
    stk.push([root,0]);    
    let dash=0,j=i;
    while(i<S.length){
        dash=0;
        while(S[i]=='-'){
            dash++;
            i++;
        }
        j=i;
        while(i<S.length&&S[i]!=='-'){
            i++;
        }
        temp=stk.pop();
        if(dash==temp[1]+1){
            if(temp[0].left){
                temp[0].right=new TreeNode(S.substring(j,i));
                stk.push([temp[0].right,dash]);
            }                
            else{
                temp[0].left =new TreeNode(S.substring(j,i));                
                stk.push(temp);
                stk.push([temp[0].left,dash]);
            }   
        }
        else{
            while(stk.length>0&&dash<=stk[stk.length-1][1]){
                stk.pop();
            }            
            temp=stk.pop();
            if(dash==temp[1]+1){
                if(temp[0].left){
                    temp[0].right=new TreeNode(S.substring(j,i));
                    stk.push([temp[0].right,dash]);
                }                
                else{
                    temp[0].left =new TreeNode(S.substring(j,i));                
                    stk.push(temp);
                    stk.push([temp[0].left,dash]);
                }   
            }
            
        }
        // console.log(stk);
        // console.log(root);
        // console.log(i);
    }
    return root;
};