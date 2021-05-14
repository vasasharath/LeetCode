/*
Return the result of evaluating a given boolean expression, represented as a string.

An expression can either be:

"t", evaluating to True;
"f", evaluating to False;
"!(expr)", evaluating to the logical NOT of the inner expression expr;
"&(expr1,expr2,...)", evaluating to the logical AND of 2 or more inner expressions expr1, expr2, ...;
"|(expr1,expr2,...)", evaluating to the logical OR of 2 or more inner expressions expr1, expr2, ...
 

Example 1:

Input: expression = "!(f)"
Output: true
Example 2:

Input: expression = "|(f,t)"
Output: true
Example 3:

Input: expression = "&(t,f)"
Output: false
Example 4:

Input: expression = "|(&(t,f,t),!(t))"
Output: false
 

Constraints:

1 <= expression.length <= 20000
expression[i] consists of characters in {'(', ')', '&', '|', '!', 't', 'f', ','}.
expression is a valid expression representing a boolean, as given in the description.
*/
var parseBoolExpr = function(expression) {
  const [res] = parse(expression);
  return res;
};

function parse(expression, startI = 0) {
  const subExpression = expression.slice(startI);

  if (!/^[\&\|\!]/.test(subExpression)) {
    return [subExpression[0] === "t", startI];
  }
  
  const vals = [];
  let operator = expression[startI];

  let startExpression = startI + 1;
  let endI;

  for (let i = startExpression; i < expression.length; i++) {
    const current = expression[i];

    if (current === ")") {
      endI = i;
      break;
    }

    if (current === "," || current === "(") {
      const [val, endI] = parse(expression, i + 1);
      vals.push(val);
      i = endI;
    }
  }

  return [getOutput(vals, operator), endI];
}

function getOutput(vals, operator) {
  switch (operator) {
    case "&": {
      return vals.reduce((acc, v) => acc && v);
    }
    case "|": {
      return vals.reduce((acc, v) => acc || v);
    }
    case "!": {
      return !vals[0];
    }
    default: {
      throw new Error("Something went wrong!");
    }
  }
}