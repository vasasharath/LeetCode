/*
A transaction is possibly invalid if:

the amount exceeds $1000, or;
if it occurs within (and including) 60 minutes of another transaction with the same name in a different city.
You are given an array of strings transaction where transactions[i] consists of comma-separated values representing the name, time (in minutes), amount, and city of the transaction.

Return a list of transactions that are possibly invalid. You may return the answer in any order.

 

Example 1:

Input: transactions = ["alice,20,800,mtv","alice,50,100,beijing"]
Output: ["alice,20,800,mtv","alice,50,100,beijing"]
Explanation: The first transaction is invalid because the second transaction occurs within a difference of 60 minutes, have the same name and is in a different city. Similarly the second one is invalid too.
Example 2:

Input: transactions = ["alice,20,800,mtv","alice,50,1200,mtv"]
Output: ["alice,50,1200,mtv"]
Example 3:

Input: transactions = ["alice,20,800,mtv","bob,50,1200,mtv"]
Output: ["bob,50,1200,mtv"]
 

Constraints:

transactions.length <= 1000
Each transactions[i] takes the form "{name},{time},{amount},{city}"
Each {name} and {city} consist of lowercase English letters, and have lengths between 1 and 10.
Each {time} consist of digits, and represent an integer between 0 and 1000.
Each {amount} consist of digits, and represent an integer between 0 and 2000.
*/
var invalidTransactions = function (transactions) {
  const map = new Map();

  for (let i = 0; i < transactions.length; i++) {
    let curr = transactions[i].slice(0, transactions[i].indexOf(','));
    if (map.has(curr)) {
      map
        .get(curr)
        .push([
          ...transactions[i].slice(transactions[i].indexOf(',') + 1).split(','),
          i,
        ]);
    } else {
      map.set(curr, [
        [
          ...transactions[i].slice(transactions[i].indexOf(',') + 1).split(','),
          i,
        ],
      ]);
    }
  }

  const list = {};

  for (let arr of map.values()) {
    if (arr.length > 1) {
      arr.sort((a, b) => Number(a[0]) - Number(b[0]));
      for (let i = 0; i < arr.length; i++) {
        if (i > 0) {
          let b = 1;
          while (i - b >= 0) {
            if (Number(arr[i][0]) - Number(arr[i - b][0]) > 60) {
              break;
            } else {
              if (arr[i][2] !== arr[i - b][2]) {
                list[arr[i][3]] = true;
                list[arr[i - b][3]] = true;
              }
            }
            b++;
          }
        }
        if (Number(arr[i][1]) > 1000) {
          list[arr[i][3]] = true;
        }
      }
    } else {
      if (Number(arr[0][1]) > 1000) {
        list[arr[0][3]] = true;
      }
    }
  }
  return transactions.filter((val, inx) => list.hasOwnProperty(inx));
};