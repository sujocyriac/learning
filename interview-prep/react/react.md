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

