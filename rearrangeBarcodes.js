/*
In a warehouse, there is a row of barcodes, where the ith barcode is barcodes[i].

Rearrange the barcodes so that no two adjacent barcodes are equal. You may return any answer, and it is guaranteed an answer exists.

 

Example 1:

Input: barcodes = [1,1,1,2,2,2]
Output: [2,1,2,1,2,1]
Example 2:

Input: barcodes = [1,1,1,1,2,2,3,3]
Output: [1,3,1,3,1,2,1,2]
 

Constraints:

1 <= barcodes.length <= 10000
1 <= barcodes[i] <= 10000
*/
var rearrangeBarcodes = function(barcodes) {
    let map = new Map();
    let i,j;
    for(i=0;i<barcodes.length;i++){
        let barcode = barcodes[i];
        let count = map.get(barcode);
        if(!count){
            map.set(barcode,1);
        }else{
            map.set(barcode, count+1);
        }
    }
    let mapArr = Array.from(map);
    mapArr.sort(function(a,b){return b[1]-a[1]});
    let newArr = [];
    for(i=0;i<mapArr.length;i++){
        let entry = mapArr[i];
        let val = entry[0];
        for(j=0;j<entry[1];j++){
            newArr.push(val);
        }
    }
    let result = new Array(barcodes.length).fill();
    for(i=0;i<barcodes.length;i++){
        let index;
        if(2*i < barcodes.length){
            index = 2*i;
            result[index] = newArr[i];
        }else{
            index = (i-Math.ceil(barcodes.length/2)) * 2 +1;
            result[index] = newArr[i];
        }
        
    }
    return result;
};