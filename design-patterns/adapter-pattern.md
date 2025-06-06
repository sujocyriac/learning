### 🔌 Adapter Pattern

The Adapter Pattern is a structural design pattern that allows objects with incompatible interfaces to work together. It acts as a translator between two objects, enabling them to collaborate.

---

#### 🧩 Concept
- **Core Idea:** Convert the interface of a class into another interface clients expect.
- **Analogy:** A universal travel adapter lets you plug your device into any socket, regardless of the plug type.

---

## 💡 Example (JavaScript)

```js
// Old interface
class OldPrinter {
  printOld(text) {
    console.log('Old Printer:', text);
  }
}

// New interface expected by the client
class NewPrinter {
  print(text) {
    console.log('New Printer:', text);
  }
}

// Adapter
class PrinterAdapter {
  constructor(oldPrinter) {
    this.oldPrinter = oldPrinter;
  }
  print(text) {
    this.oldPrinter.printOld(text);
  }
}

// Usage
const oldPrinter = new OldPrinter();
const adapter = new PrinterAdapter(oldPrinter);
adapter.print('Hello!'); // Old Printer: Hello!
```

---

## 🚀 When to Use
- When you want to use an existing class, but its interface does not match the one you need.
- When you want to create a reusable class that cooperates with unrelated or unforeseen classes.

---


🧩 What is the Adapter Pattern?
The Adapter Pattern is a structural design pattern that allows incompatible interfaces to work together. It acts as a bridge between two incompatible systems.

✅ React-Specific Use Case

🧠 Scenario:
You're building a React component that expects user data like this:

```js
{
  id: 1,
  fullName: 'John Doe',
  email: 'john@example.com'
}
```

But the API you're using returns data like this:

```js
{
  userId: 1,
  name: { first: 'John', last: 'Doe' },
  contact: { emailAddress: 'john@example.com' }
}
```
Lets create an adpter hook to convert the API data to the expected format.

```js 

const useAPIDataAdapter = (data) {

    return {
        id: data.userId,
        fullName: `${data.name.first} ${data.name.last}`,
        email: data.contact.emailAddress
    };
}

## 📚 Further Reading
- [Refactoring Guru: Adapter Pattern](https://refactoring.guru/design-patterns/adapter)