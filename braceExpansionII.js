/*
Under a grammar given below, strings can represent a set of lowercase words.  Let's use R(expr) to denote the set of words the expression represents.

Grammar can best be understood through simple examples:

Single letters represent a singleton set containing that word.
R("a") = {"a"}
R("w") = {"w"}
When we take a comma delimited list of 2 or more expressions, we take the union of possibilities.
R("{a,b,c}") = {"a","b","c"}
R("{{a,b},{b,c}}") = {"a","b","c"} (notice the final set only contains each word at most once)
When we concatenate two expressions, we take the set of possible concatenations between two words where the first word comes from the first expression and the second word comes from the second expression.
R("{a,b}{c,d}") = {"ac","ad","bc","bd"}
R("a{b,c}{d,e}f{g,h}") = {"abdfg", "abdfh", "abefg", "abefh", "acdfg", "acdfh", "acefg", "acefh"}
Formally, the 3 rules for our grammar:

For every lowercase letter x, we have R(x) = {x}
For expressions e_1, e_2, ... , e_k with k >= 2, we have R({e_1,e_2,...}) = R(e_1) ∪ R(e_2) ∪ ...
For expressions e_1 and e_2, we have R(e_1 + e_2) = {a + b for (a, b) in R(e_1) × R(e_2)}, where + denotes concatenation, and × denotes the cartesian product.
Given an expression representing a set of words under the given grammar, return the sorted list of words that the expression represents.

 

Example 1:

Input: "{a,b}{c,{d,e}}"
Output: ["ac","ad","ae","bc","bd","be"]
Example 2:

Input: "{{a,z},a{b,c},{ab,z}}"
Output: ["a","ab","ac","z"]
Explanation: Each distinct word is written only once in the final answer.
 

Constraints:

1 <= expression.length <= 60
expression[i] consists of '{', '}', ','or lowercase English letters.
The given expression represents a set of words based on the grammar given in the description.
*/
const union = (a, b) => {
    b.forEach(val => a.add(val))
    return a
}

const product = (a, b) => {
    const newSet = new Set()
    a.forEach(val => {
        b.forEach(val2 => {
            newSet.add(val + val2)
        })
    })
    return newSet
}

const createSet = (sets, ops) => {
    let i = 0
    // Order of operations evaluate products before unions
    while (i < ops.length) {
        const operation = ops[i]
        if (operation === product) {
            const [ a, b ] = [sets[i], sets[i + 1]]
            const newSet = operation(a, b)
            ops.splice(i, 1)
            sets.splice(i, 2, newSet)
        } else {
            i++
        }
    }
    i = 0
    while (ops.length) {
        const operation = ops[i]
        const [ a, b ] = [sets[i], sets[i + 1]]
        const newSet = operation(a, b)
        ops.splice(i, 1)
        sets.splice(i, 2, newSet)
    }
    return sets[0]
}

// return tuple (index, set)
const genSet = (exp, startI) => {
    const sets = []
    const operations = []

    for (let i = startI + 1; i < exp.length; i++) {
        const char = exp[i]
        if (char === '{') {
            const [nextI, nextSet] = genSet(exp, i)
            i = nextI
            sets.push(nextSet)
        } else if (char === ',') {
            operations.push(union)
        } else if (char === '}') {
            return [i, createSet(sets, operations)]
        } else {
            sets.push(new Set([char]))
        }
        
        if (operations.length < sets.length - 1) {
            operations.push(product)
        }
    }
    return [exp.length, createSet(sets, operations)]
}

var braceExpansionII = function(expression) {
    const [_, resultSet] = genSet(expression, -1)
    return Array.from(resultSet).sort()
};