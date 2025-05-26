## 🔥 React Deep Dive — Round 1: Core Concepts & Practical Scenarios

### ✅ Question 1: React Rendering and Performance

> Q1: How does React decide whether to re-render a component? What strategies do you use to prevent unnecessary renders?

🧠 Follow-up: Explain how React.memo, useMemo, and useCallback help.

`Answer:` 

React decides to re-render a component when its state or props change. To prevent unnecessary renders, I use several strategies:

1. **Pure Components**: By using `React.PureComponent` or `React.memo`, I can ensure that a component only re-renders when its props change shallowly.

2. **State Management**: I lift state up to the nearest common ancestor to avoid prop drilling and unnecessary re-renders of deeply nested components.

3. **Batched Updates**: I take advantage of React's batching mechanism to group multiple state updates into a single render.

4. **Throttling/Debouncing**: For expensive operations (like API calls), I use throttling or debouncing techniques to limit the frequency of updates.

### ✅ Question 2: Custom Hook Challenge

> Q2: Build a custom hook called usePrevious that returns the previous value of a prop or state.

```js
import { useEffect, useRef } from 'react';

const usePrevious = (value) => {
    const currentValue = useRef();

    useEffect(() => {
        currentValue.current = value;
    }, [value]);

    return currentValue.current;
};

```
### ✅ Question 3: React Reconciliation and Keys
> Q3: What is React’s reconciliation algorithm, and how do keys help it?

React's reconciliation algorithm is the process React uses to update the DOM when the state or props of a component change. Instead of re-rendering the entire DOM, React creates a virtual DOM and compares the new virtual DOM tree with the previous one. This process is called "diffing."

React then calculates the minimal set of changes needed and updates the real DOM efficiently.

Keys play a critical role in this process — especially when rendering lists. They help React identify which items have changed, been added, or removed. Without keys, React may re-render or reorder DOM elements incorrectly, leading to performance issues or UI bugs.

For example:

```js
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```
Here, `key={item.id}` gives React a stable identity for each list item, so when the list updates, React can match up the old and new items correctly.

If you use index as a key, it may lead to problems when items are added or removed, because the index changes and React can’t track the items properly.

If you want to show deeper understanding, you can add:

"React assumes elements with the same key are the same component and skips re-rendering them. This is why using stable, unique keys — like a database ID — is preferred over array indices."