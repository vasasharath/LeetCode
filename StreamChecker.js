/*
Implement the StreamChecker class as follows:

StreamChecker(words): Constructor, init the data structure with the given words.
query(letter): returns true if and only if for some k >= 1, the last k characters queried (in order from oldest to newest, including this letter just queried) spell one of the words in the given list.
 

Example:

StreamChecker streamChecker = new StreamChecker(["cd","f","kl"]); // init the dictionary.
streamChecker.query('a');          // return false
streamChecker.query('b');          // return false
streamChecker.query('c');          // return false
streamChecker.query('d');          // return true, because 'cd' is in the wordlist
streamChecker.query('e');          // return false
streamChecker.query('f');          // return true, because 'f' is in the wordlist
streamChecker.query('g');          // return false
streamChecker.query('h');          // return false
streamChecker.query('i');          // return false
streamChecker.query('j');          // return false
streamChecker.query('k');          // return false
streamChecker.query('l');          // return true, because 'kl' is in the wordlist
 

Note:

1 <= words.length <= 2000
1 <= words[i].length <= 2000
Words will only consist of lowercase English letters.
Queries will only consist of lowercase English letters.
The number of queries is at most 40000.
*/
const TrieNode = function() {
  this.children = {};
  this.isEnd = false;
};

/**
 * @param {char} ch char == a string with a length of one
 */
TrieNode.prototype.add = function(ch) {
  this.children[ch] = new TrieNode();
}


/**
 * @param {string} word
 */
TrieNode.prototype.addWord = function(word) {
  let curNode = this;
  for (let ch = 0; ch < word.length; ch++) {
    const char = word[ch];
    
    if (!curNode.children.hasOwnProperty(char)) {
      curNode.add(char);
      curNode = curNode.children[char];
    } else {
      curNode = curNode.children[char];
    }
  }
  curNode.isEnd = true;
}




/*******************************************
 * * Given Items                           *
*******************************************/

/**
 * @param {string[]} words
 */
var StreamChecker = function(words) {
  this.trie = new TrieNode(null);
  this.searches = [];

  for (let i = 0; i < words.length; i++) {
    let curNode = this.trie;
    const werd = words[i].split('').reverse();
    curNode.addWord(werd);

  }
};

/** 
 * @param {character} letter
 * @return {boolean}
 */
StreamChecker.prototype.query = function(letter) {
  this.searches.push(letter);

  let curNode = this.trie;
  for (let i = this.searches.length - 1; i >= 0; i--) {
    const curChar = this.searches[i];

    if (!curNode.children.hasOwnProperty(curChar)) return false;
    else {
      curNode = curNode.children[curChar];
      if (curNode.isEnd) return true;
    } 
  }
  return false
};