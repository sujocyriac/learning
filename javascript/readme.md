# JavaScript Concepts and Examples

JavaScript is single-threaded, but it can handle asynchronous operations (like API calls, file reading, timers, etc.) using **Promises** and **async/await**. These help manage operations that take time without blocking the main thread.

---

## 🔹 1. Promises

A **Promise** is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

### 📌 States of a Promise:
- **Pending**: The initial state.
- **Fulfilled**: The operation completed successfully.
- **Rejected**: The operation failed.

### Example:

```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};

fetchData()
  .then((data) => {
    console.log(data); // "Data fetched"
  })
  .catch((error) => {
    console.error(error);
  });
```

### Key Methods:
- **`then()`**: Handles success.
- **`catch()`**: Handles errors.
- **`finally()`** (optional): Runs whether the promise is resolved or rejected.

---

## 🔹 2. Async/Await

**Async/await** is syntactic sugar over Promises. It makes asynchronous code look and behave more like synchronous code, improving readability.

### Example:

```js
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};

const getData = async () => {
  try {
    const data = await fetchData(); // Waits for the Promise to resolve
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

getData();
```

### Key Points:
- **`async`** before a function means it returns a Promise.
- **`await`** pauses the execution of the function until the Promise resolves.

---

## 🔹 Object Methods: `Object.freeze`

The `Object.freeze()` method freezes an object, preventing:
1. New properties from being added.
2. Existing properties from being removed.
3. Existing properties from being changed.

It essentially makes the object **immutable**.

### Example:

```js
"use strict";
const user = { name: "sujo", age: 36 };

Object.freeze(user);

user.name = "rose"; // This will not change the name property but throw an error in strict mode: `Cannot assign to read only property 'name' of object`

delete user.name; // This will throw a "cannot delete" error

user.phone = 123456; // This will throw an "add error"

console.log(user); // Output: { name: "sujo", age: 36 }
```

---

### Key Points:
1. **Immutability**: Once an object is frozen, its properties cannot be modified, added, or deleted.
2. **Shallow Freeze**: `Object.freeze()` only applies to the immediate properties of the object. If the object contains nested objects, those nested objects are not frozen and can still be modified.
3. **Strict Mode**: In strict mode, attempting to modify a frozen object will throw a `TypeError`. Without strict mode, such attempts will fail silently.

---

### Use Cases:
- To ensure the integrity of an object that should not be modified.
- To create constants or configuration objects that remain unchanged throughout the program.

---

### Example with Nested Objects:

```js
const user = {
  name: "sujo",
  age: 36,
  address: {
    city: "New York",
    zip: "10001",
  },
};

Object.freeze(user);

user.name = "rose"; // This will not change the name property
user.address.city = "Los Angeles"; // This will still change the city property

console.log(user);
// Output: { name: "sujo", age: 36, address: { city: "Los Angeles", zip: "10001" } }
```

---

### Deep Freeze Example:

To deeply freeze an object, you need to recursively apply `Object.freeze()` to all nested objects.

```js
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  });
}

const user = {
  name: "sujo",
  age: 36,
  address: {
    city: "New York",
    zip: "10001",
  },
};

deepFreeze(user);

user.address.city = "Los Angeles"; // This will not change the city property
console.log(user);
// Output: { name: "sujo", age: 36, address: { city: "New York", zip: "10001" } }
```

---

### Summary of `Object.freeze()`:
- **Immutability**: Ensures the object cannot be modified.
- **Shallow Freeze**: Only affects the immediate properties.
- **Deep Freeze**: Requires a recursive approach to freeze nested objects.


> read more about: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is