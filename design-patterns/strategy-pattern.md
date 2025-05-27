### 🧠 Strategy Pattern

The Strategy Pattern encapsulates algorithms or behaviors in separate classes, allowing them to be interchangeable. This is useful when you have multiple ways to perform a task and want to switch between them easily.

---

## 🧩 What is the Strategy Pattern?
The Strategy Pattern is a behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable. This allows the algorithm to vary independently from the clients that use it.

---

## ✅ React-Specific Use Case

### Scenario
You have a React component that can sort a list of items in different ways (e.g., by name, by date, by price). Instead of hardcoding the sorting logic, you can define different sorting strategies and apply them dynamically.

```js
// Sorting strategies
const sortByName = (a, b) => a.name.localeCompare(b.name);
const sortByDate = (a, b) => new Date(a.date) - new Date(b.date);
const sortByPrice = (a, b) => a.price - b.price;

// Component that uses the strategy pattern
function ItemList({ items, sortStrategy }) {
  const sortedItems = [...items].sort(sortStrategy);
  return (
    <ul>
      {sortedItems.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// Usage
<ItemList items={items} sortStrategy={sortByName} />
<ItemList items={items} sortStrategy={sortByDate} />
<ItemList items={items} sortStrategy={sortByPrice} />
```

---

## 🚀 When to Use
- When you have multiple algorithms or behaviors that can be applied interchangeably.
- When you want to encapsulate the logic of an algorithm in a separate class, making it easier to maintain and extend.

✅ Option 1: Pass Strategy as a Function

```js
const add = (a, b) => a + b;
const sub = (a, b) => a - b;

class MathOperation {
    constructor(strategy) {
        this.strategy = strategy;
    }

    execute(a, b) {
        return this.strategy(a, b);
    }
}

// Use it
const sum = new MathOperation(add).execute(5, 3); // 8
const diff = new MathOperation(sub).execute(5, 3); // 2

console.log(sum, diff);
```
🔁 Now you can add more strategies (multiply, divide, etc.) without changing the MathOperation class.

✅ Option 2: Use Strategy Objects

```js

class AddStrategy {
    execute(a, b) {
        return a + b;
    }
}

class SubStrategy {
    execute(a, b) {
        return a - b;
    }
}

class MathOperation {
    constructor(strategy) {
        this.strategy = strategy;
    }

    execute(a, b) {
        return this.strategy.execute(a, b);
    }
}

const sum = new MathOperation(new AddStrategy()).execute(10, 4); // 14
const diff = new MathOperation(new SubStrategy()).execute(10, 4); // 6

console.log(sum, diff);
```