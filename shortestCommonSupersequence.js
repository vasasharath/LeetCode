/*
Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences.  If multiple answers exist, you may return any of them.

(A string S is a subsequence of string T if deleting some number of characters from T (possibly 0, and the characters are chosen anywhere from T) results in the string S.)

 

Example 1:

Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.
 

Note:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of lowercase English letters.
*/
var shortestCommonSupersequence = function(str1, str2) {
    /*Initialise Array for DP */
    let dp=new Array(str2.length+1);
    for(let i=0;i<dp.length;i++)
        dp[i]=new Array(str1.length+1).fill(0);
    
    /*Perform DP for Longest Common Subsequence*/
    for(let i=1;i<dp.length;i++){
        for(let j=1;j<dp[i].length;j++){
            if(str2[i-1]==str1[j-1])
                dp[i][j]=1+dp[i-1][j-1];
            else
                dp[i][j]=Math.max(dp[i][j-1],dp[i-1][j]);
        }
    }
    
    /*Early Termination*/
    if(dp[str2.length][str1.length]==0)
        return str1+str2;
    
    /*Getting the SubSequence*/
    let seq='';
    let i=dp.length-1,j=dp[i].length-1;
    while(i>=1&&j>=1){
        if(str2[i-1]==str1[j-1]){
            seq=str2[i-1]+seq;
            i--;
            j--;
        }
        else{
            if(dp[i-1][j]==dp[i][j])
                i--;     
            else
                j--;
        }
            
    }
    
    /*Generating the Answer*/
    let a=0,b=0,res='';
    for(let i=0;i<seq.length;i++){
        while(a<str1.length&&str1[a]!==seq[i])
            res+=str1[a++];
        while(b<str2.length&&str2[b]!==seq[i])
            res+=str2[b++];
        a++;
        b++;
        res+=seq[i];
    }
    while(a<str1.length)
            res+=str1[a++];
    while(b<str2.length)
            res+=str2[b++];
    
    /*Return the result*/
    return res;
};