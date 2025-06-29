
declare type MathFn = (a: number, b: number) => number;

declare type calculateFn = (a: number, b: number, op: Operation) => number;

declare enum Operation {
    ADD = "ADD",
    SUBTRACT = "SUBTRACT",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE"
}


const add: MathFn = (a, b) => a + b;
const subtract: MathFn = (a, b) => a - b;
const multiply: MathFn = (a, b) => a * b;
const divide: MathFn = (a, b) => {
  if (b === 0) throw new Error("Divide by zero");
  return a / b;
};



export const calculate: calculateFn = (a, b, op) => {
  switch (op) {
    case Operation.ADD: return add(a, b);
    case Operation.SUBTRACT: return subtract(a, b);
    case Operation.MULTIPLY: return multiply(a, b);
    case Operation.DIVIDE: return divide(a, b);
    default: throw new Error('Unknown operation');
  }
}