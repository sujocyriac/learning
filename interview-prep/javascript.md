💡 Q1: Deep Freeze Challenge
Implement a deepFreeze(obj) function that recursively freezes an object, including all nested objects and arrays.

```js
const user = {
  name: "Sujo",
  address: {
    city: "Bangalore",
    zip: 560001,
  },
  skills: ["React", "JS"],
};

deepFreeze(user);
user.address.city = "Mumbai"; // should not change
user.skills.push("Node"); // should throw error in strict mode

function deepFreeze(obj) {
  if (typeof obj !== "object") {
    return;
  }

  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    if (typeof obj[keys[i]] === "object") {
      Object.freeze(obj[keys[i]]);
      deepFreeze(obj[keys[i]]);
    }
  }
}

console.log(user);
```

💡 Q2: Currying with Dynamic Arity
Create a function curry(fn) that supports currying of any function with any number of arguments.

```js
function sum(a, b, c) {
  return a + b + c;
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...newArgs) {
        return curried(...args, ...newArgs);
      };
    }
  };
}

const curried = curry(sum);

console.log(curried(1)(2)(3));
```

---

## 💡 Q3: Execution Order Madness

```js
async function async1() {
  console.log("A");
  await async2();
  console.log("B");
}

async function async2() {
  console.log("C");
}

console.log("D");
async1();
console.log("E");
```

**Question:**

> What will be the output? Why?

**Answer:**

The output will be:

```
D
A
C
E
B
```

**Explanation:**

- `console.log("D")` runs first (synchronous).
- `async1()` is called, logs "A" (synchronous), then calls `await async2()`.
- `async2()` logs "C" (synchronous), then returns a resolved Promise.
- The `await` in `async1` yields control, so the next line (`console.log("B")`) is scheduled as a microtask.
- `console.log("E")` runs next (synchronous).
- The microtask queue runs, so `console.log("B")` executes last.

---

## 💡 Q4: Event Delegation vs Bubbling Trap

**Question:**

> Why doesn't `event.stopPropagation()` stop a delegated event listener from firing on a parent element?

**Explanation:**

`event.stopPropagation()` prevents the event from bubbling up **after** it reaches the current target. However, if you attach a delegated event listener to a parent (e.g., using event delegation), the event is handled at the parent during the bubbling phase, even if a child calls `stopPropagation()` in its own handler. This is because the delegated handler is triggered as the event bubbles up to the parent.

**Example:**

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

```js
document.getElementById("parent").addEventListener("click", function (e) {
  alert("Parent handler (delegated)");
});

document.getElementById("child").addEventListener("click", function (e) {
  e.stopPropagation();
  alert("Child handler");
});
```

**What happens?**

- Click the button: "Child handler" alert shows, then "Parent handler" alert shows.
- Even though `stopPropagation()` is called in the child, the parent’s delegated handler still runs because it is listening for events that bubble up from its children.

**Summary:**

- `stopPropagation()` prevents further bubbling **after** the current event handler.
- Delegated listeners on parents still receive the event because they are part of the bubbling phase.

---
