# 🎁 Decorator Pattern

The Decorator Pattern is a structural design pattern that allows you to dynamically add new behavior to objects without modifying their existing code. It is often used to extend the functionalities of classes in a flexible and reusable way.

---

## 📝 Concept
- **Core Idea:** Wrap an object with another object that adds new behavior or responsibilities.
- **Analogy:** Think of a basic coffee cup. You can add a lid, a sleeve, or a fancy handle—each new accessory adds a feature without changing the original cup.

---

## 💡 Example 1 (JavaScript)

```js
// Base component
class Coffee {
  cost() {
    return 5; // Base cost of coffee
  }
}

// Decorator that adds milk
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee; // Store the original coffee object
  }
  cost() {
    // Add the cost of milk to the original coffee cost
    return this.coffee.cost() + 2;
  }
}

// Usage
let myCoffee = new Coffee(); // Create a plain coffee
myCoffee = new MilkDecorator(myCoffee); // Decorate it with milk
console.log(myCoffee.cost()); // 7
```

---

## 💡 Example 2 (JavaScript)

```js
// Base IceCream class
class IceCream {
  cost() {
    return 10; // Base cost
  }
  ingredients() {
    return "milk, sugar, cream"; // Base ingredients
  }
}

// Base decorator for IceCream
class IceCreamDecorator {
  constructor(iceCreamInstance) {
    this.iceCreamInstance = iceCreamInstance; // Store the original ice cream
  }
  cost() {
    // Delegate cost to the wrapped instance
    return this.iceCreamInstance.cost();
  }
  ingredients() {
    // Delegate ingredients to the wrapped instance
    return this.iceCreamInstance.ingredients();
  }
}

// Decorator that adds chocolate
class ChocolateIceCreamDecorator extends IceCreamDecorator {
  cost() {
    // Add chocolate cost
    return super.cost() + 10;
  }
  ingredients() {
    // Add chocolate to ingredients
    return super.ingredients() + ", chocolate";
  }
}

// Decorator that adds white froast
class WhiteFroastDecorator extends IceCreamDecorator {
  cost() {
    // Add white froast cost
    return super.cost() + 5;
  }
  ingredients() {
    // Add white froast to ingredients
    return super.ingredients() + ", white froast";
  }
}

// Usage examples
const regularIceCream = new IceCream();
const chocolateIceCream = new ChocolateIceCreamDecorator(regularIceCream);
const chocolateIceCreamWithWhiteFroast = new WhiteFroastDecorator(chocolateIceCream);

console.log("Regular Ice cream costs:", regularIceCream.cost()); // 10
console.log("Regular Ice cream ingredients:", regularIceCream.ingredients()); // milk, sugar, cream

console.log("Chocolate Ice cream costs:", chocolateIceCream.cost()); // 20
console.log("Chocolate Ice cream ingredients:", chocolateIceCream.ingredients()); // milk, sugar, cream, chocolate

console.log("Chocolate Ice cream with White Froast costs:", chocolateIceCreamWithWhiteFroast.cost()); // 25
console.log("Chocolate Ice cream with White Froast ingredients:", chocolateIceCreamWithWhiteFroast.ingredients()); // milk, sugar, cream, chocolate, white froast
```

---

## 🚀 When to Use
- When you want to add responsibilities to individual objects, not to an entire class.
- When extension by subclassing is impractical or impossible.

---

> In React, decorator patterns are used with HOC (Higher-Order Components) to enhance components with additional functionality, such as logging, error handling, or performance optimizations.

## 📚 Further Reading
- [Refactoring Guru: Decorator Pattern](https://refactoring.guru/design-patterns/decorator)
- [MDN Web Docs: Decorators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#decorators)

>  A complex example https://pgarciacamou.medium.com/modern-javascript-decorator-pattern-1b440500b38e