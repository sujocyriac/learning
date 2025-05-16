// filepath: /home/sujo/learning/typeScript/using-decleration-file-with-ts/math.d.ts
// declare type MathFn = (a: number, b: number) => number;

// declare type calculateFn = (a: number, b: number, op: Operation) => number;

// declare enum Operation {
//     ADD = "ADD",
//     SUBTRACT = "SUBTRACT",
//     MULTIPLY = "MULTIPLY",
//     DIVIDE = "DIVIDE"
// }

declare global {
    enum Operation {
        ADD = "ADD",
        SUBTRACT = "SUBTRACT",
        MULTIPLY = "MULTIPLY",
        DIVIDE = "DIVIDE"
    }
  
    interface MathFn {
      (a: number, b: number): number;
    }
  
    // Interface for calculate function
    interface CalculateFn {
      (a: number, b: number, op: Operation): number;
    }
  }
  
  // This is needed to ensure this file is treated as a module
  export {};