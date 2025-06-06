
### Observer Pattern
The Observer Pattern is a behavioral design pattern that defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. This pattern is particularly useful in scenarios where a change in one object requires updates to multiple other objects.   

---
#### 🧩 Concept 
- **Core Idea:** Establish a subscription mechanism to allow multiple observers to listen and react to changes in a subject.
- **Analogy:** Think of a newspaper subscription. You subscribe to a newspaper (you are the observer), and when a new edition is published (the subject changes state), it's delivered to you automatically.
- **When to Use:** When you need to maintain consistency between related objects without tightly coupling them.
- **Benefits:** Promotes loose coupling between the subject and observers, making it easier to add or remove observers without affecting the subject.
---
## 💡 Example (JavaScript)

```js
class Observer {
    items = [];
    subscribers = [];

    get listItems() {
        return this.items;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    notify(value, list) {
        for (const subscriber of this.subscribers) {
            subscriber(value, list);
        }
    }

    set value(item) {
        this.items.push(item);
        this.notify(item, this.items);
    }
}
```

React internally uses the Observer Pattern for state management. When a component's state changes, it notifies all subscribed components to re-render with the new state.