### closures

A closure is formed when an inner function remembers the variables from its lexical scope even after the outer function has finished executing. This allows the inner function to access and manipulate those variables.

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  }
}

const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```