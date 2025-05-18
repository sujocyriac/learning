React component names must always start with a capital letter, while HTML tags must be lowercase.

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display user.name:

```jsx
return <h1>{user.name}</h1>;
```

For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. React uses your keys to know what happened if you later insert, delete, or reorder the items.

## ✅ Difference Between `useCallback` and `useMemo` in React

### 🔁 `useCallback`

**Purpose:**  
`useCallback` is used to **memoize a function**—it returns a **cached version** of a callback function that only changes if its dependencies change.

**Use Case:**  
Used when you want to avoid re-creating functions unnecessarily, especially when:

- Passing functions to child components (to avoid re-renders)
- Functions are used in `useEffect`, `useMemo`, or other hooks

**Example:**

```jsx
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, []);
```

---

### 🧠 `useMemo`

**Purpose:**  
`useMemo` is used to **memoize a computed value**—it avoids recalculating expensive operations unless dependencies change.

**Use Case:**  
Used when you want to avoid re-running expensive calculations or creating complex objects unless dependencies have changed.

**Example:**

```jsx
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);
```

---

### 🆚 Summary: Key Differences

| Feature          | `useCallback`                         | `useMemo`                         |
| ---------------- | ------------------------------------- | --------------------------------- |
| Memoizes         | A **function**                        | A **computed value or result**    |
| Returns          | A **function**                        | The **result of the computation** |
| Primary Use Case | Optimize functions (especially props) | Optimize expensive computations   |
| Prevents         | Function re-creation                  | Value recalculation               |
| Example Return   | `() => {}`                            | `number`, `object`, `array`, etc. |

---

## ⚠️ Overuse and When to Use `useCallback` and `useMemo`

### 🔄 What Does “Overuse” Mean?

In React, **overusing** `useCallback` and `useMemo` means adding them in places where they:

- Don’t provide a measurable performance benefit
- Add unnecessary complexity
- Actually slow down the app due to **extra memory usage and processing**

---

### ✅ When to Use `useMemo` (Good Use Cases)

Use `useMemo` when:

1. You're doing **expensive calculations** (e.g., sorting, filtering, data transformation).
2. You need to prevent recalculating **derived data** unless dependencies change.
3. You're creating a **stable object or array reference** passed to a child component to avoid unnecessary renders.

**Example:**

```jsx
const filteredList = useMemo(() => {
  return list.filter((item) => item.active);
}, [list]);
```

❌ Don’t use it for simple values like `const doubled = value * 2;` — just compute it directly.

---

### ✅ When to Use `useCallback` (Good Use Cases)

Use `useCallback` when:

1. You're passing **callback functions** to child components that are memoized (e.g., `React.memo`).
2. The function would otherwise **cause unnecessary re-renders** of child components.
3. You have a function inside `useEffect` or other hooks, and it’s important the function identity doesn’t change.

**Example:**

```jsx
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);
```

❌ Don’t use it for functions not passed down or not reused across renders.

---

### 🚫 Examples of Overuse

```jsx
// ❌ Overkill use of useMemo for a basic value
const sum = useMemo(() => a + b, [a, b]);

// ❌ Unnecessary use of useCallback for a one-liner not passed as prop
const handleInput = useCallback((e) => setText(e.target.value), []);
```

These examples add **complexity with no gain**—just write them directly.

---

### 🧠 Rule of Thumb (Professional Advice)

| Question to Ask                              | Hook to Use   | Use It If...                                     |
| -------------------------------------------- | ------------- | ------------------------------------------------ |
| Is this an expensive computation?            | `useMemo`     | It avoids doing costly work on every render.     |
| Is this function passed to a memoized child? | `useCallback` | It prevents unnecessary re-renders.              |
| Will memoization improve performance here?   | Both          | You’ve measured or observed a performance issue. |
| Is the value/function simple and cheap?      | Neither       | Don’t use memoization — let it recalculate.      |

---

### 📊 TL;DR

- ✅ Use them **strategically**, not by default.
- 🧪 Consider using them **after identifying performance bottlenecks**.
- 🧼 Keep code clean — memoization is a **performance optimization**, not a style.

## 🔍 How `useCallback` Works Behind the Scenes

### ✅ Conceptual Overview

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

This caches the function instance and only recreates it when its dependencies change.

---

### ⚙️ What Happens Behind the Scenes

1. **On Initial Render:**

   - React stores the function you passed (`() => doSomething(a, b)`) along with the dependencies `[a, b]`.
   - It saves this in an internal memory structure tied to the component.
   - It returns the function.

2. **On Re-renders:**
   - React checks: "Did `[a, b]` change since the last render?"
     - If **yes**: React recreates the function and stores the new version.
     - If **no**: React returns the **same function instance** from the previous render.

✅ This ensures:

- The function reference is **stable** across renders.
- Avoids re-renders in memoized child components (like those using `React.memo`).

---

### 🧠 Internal Representation (Simplified)

React internally maintains a list of hook states per component:

```js
[
  {
    hookType: "useCallback",
    dependencies: [a, b],
    value: () => doSomething(a, b) // cached function
  },
  ...
]
```

On each render, React:

- Compares the current and previous dependencies using **shallow comparison**
- If dependencies changed → recalculates and updates
- If dependencies are the same → reuses the previously stored function

✅ This is the same underlying mechanism used by `useMemo`.

---

### 💡 Why It Matters

- Prevents **referential inequality** (where two identical-looking functions are actually different in memory)
- Ensures child components using `React.memo` don’t re-render unnecessarily
- Keeps stable function references for hooks like `useEffect` or `useMemo` that depend on it

---

### 🛠️ Rough Analogy (Simplified)

```js
function useCallback(fn, deps) {
  const prev = getPreviousHookState();
  if (!prev || depsChanged(prev.deps, deps)) {
    storeHookState({ value: fn, deps });
    return fn;
  }
  return prev.value;
}
```

> ⚠️ This is a simplified conceptual model — React’s internal implementation is more complex and optimized.

---

### 🚫 Common Misconception

`useCallback` does **not** prevent the function from running.  
It only controls whether the **function object itself** is recreated.

You control _when_ it runs — `useCallback` only helps with _reference stability_.

---

### 📌 Summary

- ✅ `useCallback(fn, deps)` memoizes the function instance
- 🔄 React compares dependencies on each render
- 🧠 Returns the same function unless dependencies change
- 🚫 Don’t misuse it for every function — use it **strategically** to avoid unnecessary re-renders

---

# 🧠 React.memo vs useMemo vs useCallback (Deep Dive)

---

## ✅ `useCallback` — How It Works Behind the Scenes

### 🔍 Conceptual Overview

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

This caches the function instance and only recreates it when its dependencies change.

---

### ⚙️ What Happens Behind the Scenes

1. **On Initial Render:**

   - React stores the function and its dependencies.
   - Returns that function back to your component.

2. **On Re-renders:**
   - React checks if dependencies `[a, b]` have changed.
   - If yes → new function created and stored.
   - If no → same function instance is returned.

✅ Ensures:

- Stable function reference across renders
- Prevents unnecessary re-renders (e.g. in memoized child components)

---

### 🧠 Internal Representation (Simplified)

```js
[
  {
    hookType: "useCallback",
    dependencies: [a, b],
    value: () => doSomething(a, b), // cached function
  },
];
```

---

### 🛠️ Rough Analogy

```js
function useCallback(fn, deps) {
  const prev = getPreviousHookState();
  if (!prev || depsChanged(prev.deps, deps)) {
    storeHookState({ value: fn, deps });
    return fn;
  }
  return prev.value;
}
```

> This is a simplified version of what React internally does.

---

### ❗ Misconception

- `useCallback` does **not** prevent the function from running.
- It only **prevents re-creating the function object** unless dependencies change.

---

---

## 🔁 React.memo vs 🧠 useMemo

### ✅ TL;DR Comparison

| Feature              | `React.memo`                        | `useMemo`                                  |
| -------------------- | ----------------------------------- | ------------------------------------------ |
| **What it memoizes** | A **React component**               | A **computed value** (object, array, etc.) |
| **Usage context**    | Outside the component (HOC)         | Inside the component (hook)                |
| **Purpose**          | Prevents unnecessary **re-renders** | Prevents unnecessary **re-computations**   |
| **Returns**          | A **memoized component**            | A **memoized value**                       |

---

### 🧠 `useMemo` — Memoize a Value

```jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(input);
}, [input]);
```

✅ Avoids re-running expensive computations unless dependencies change.

---

### 🧱 `React.memo` — Memoize a Component

```jsx
const MyComponent = React.memo(({ name }) => {
  return <div>{name}</div>;
});
```

✅ Prevents re-rendering unless props change (shallow compare).

---

### ✅ Using Them Together

```jsx
const memoizedItems = useMemo(() => transform(list), [list]);

const ItemList = React.memo(({ items }) => {
  return items.map((i) => <div key={i.id}>{i.name}</div>);
});
```

- `useMemo`: memoizes `items`
- `React.memo`: prevents unnecessary renders of `ItemList`

---

## ❓ Does `React.memo` Track Props of Child Components?

### 🔴 No, `React.memo` only tracks **its own props**

`React.memo`:

- ✅ Does shallow comparison on _its own props_
- ❌ Does **not track props of children**
- ❌ Does **not prevent child components from re-rendering** unless they are also memoized

---

### 🧪 Example

```jsx
const Child = React.memo(({ name }) => {
  console.log("Child render");
  return <div>{name}</div>;
});

const Parent = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Child name="John" />
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
};
```

✅ `Child` doesn’t re-render because its prop `name` didn’t change.

---

### ⚠️ But Watch Out:

```jsx
const data = { value: "Hello" }; // new object each render

const Child = React.memo(({ data }) => {
  return <div>{data.value}</div>;
});
```

🔴 This still re-renders because:

- `data` is a new object on every render.
- `React.memo` does shallow comparison → `{ value: "Hello" } !== { value: "Hello" }`

✅ Fix it using `useMemo`:

```jsx
const data = useMemo(() => ({ value: "Hello" }), []);
```

---

### 🧠 Summary

| Question                                               | Answer                        |
| ------------------------------------------------------ | ----------------------------- |
| Does `React.memo` track children’s props?              | ❌ No                         |
| Does it shallowly compare _its own_ props?             | ✅ Yes                        |
| Can children still re-render inside a memoized parent? | ✅ Yes                        |
| How to prevent children from re-rendering?             | Wrap them in `React.memo` too |

---

Let me know if you'd like this saved as a `.md` file!

### 🧠 What is useImperativeHandle?

It's a React hook that lets you customize what a parent can do with a ref to a child component.

Usually, when a parent uses a ref on a child component, it only gets access to the DOM element (like a div or input). But with `useImperativeHandle`, you can let the parent call custom methods on the child — like `focus()`, `reset()`, `scrollToTop()`, etc.
This is useful when you want to expose specific functionality of a child component without exposing the entire DOM element.

### Example

```jsx
import React, { useImperativeHandle, forwardRef, useRef } from "react";
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // Expose a focus method to the parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    reset: () => {
      inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} type="text" />;
});

const ParentComponent = () => {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleReset = () => {
    inputRef.current.reset();
  };

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleReset}>Reset Input</button>
    </div>
  );
};
```

In this example, the `CustomInput` component exposes two methods: `focus` and `reset`. The parent component can call these methods using the ref, allowing it to control the child component's behavior without directly manipulating the DOM.

### 🧠 What is useInsertionEffect?

It’s a special React hook that runs very early, before any DOM changes are visible — specifically meant for things like styling libraries that need to inject CSS at the perfect moment.

### 💡 In simpler words:

Imagine you're using a styling library (like Emotion or Styled Components), and you need to inject styles into the <head> before the browser draws anything on screen.

React gives you useInsertionEffect to do that — it's even earlier than useLayoutEffect.

### Example

```jsx
import React, { useInsertionEffect } from "react";
import { css } from "@emotion/react";

const MyComponent = () => {
  useInsertionEffect(() => {
    // This runs before the browser paints
    const style = css`
      color: red;
    `;
    document.head.appendChild(style);
  }, []);

  return <div>Hello World</div>;
};
```

In this example, the `useInsertionEffect` hook is used to inject a CSS style into the document head before the browser paints the component. This ensures that the styles are applied immediately and avoids any flickering or flash of unstyled content (FOUC).

🧠 What is useLayouteffect?

`useLayoutEffect` is a React hook that runs synchronously after all DOM mutations but before the browser has a chance to paint. It’s useful for reading layout from the DOM and synchronously re-rendering. It’s similar to `useEffect`, but it fires earlier in the lifecycle.

### Example

```jsx
import React, { useLayoutEffect, useRef } from "react";

const MyComponent = () => {
  const divRef = useRef();

  useLayoutEffect(() => {
    const { height } = divRef.current.getBoundingClientRect();
    console.log("Div height:", height);
  }, []);

  return <div ref={divRef}>Hello World</div>;
};
```

In this example, the `useLayoutEffect` hook is used to read the height of a div after it has been rendered but before the browser paints. This allows you to perform measurements and potentially adjust the layout without causing visual flickering.

But you cannot use useInsertionEffect in the above example because the element is not yet ready—DOM mutations have not occurred yet.

- `useInsertionEffect` is intended for injecting styles before the browser paints, ensuring styles are applied immediately and preventing flashes of unstyled content.
- `useLayoutEffect` is used to read layout information or make DOM measurements after the DOM has been updated but before the browser paints.

In summary: useInsertionEffect is for injecting styles before paint, while useLayoutEffect is for reading or modifying layout after DOM updates but before the paint.
