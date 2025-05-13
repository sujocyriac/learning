


JavaScript is single-threaded, but it can handle asynchronous operations (like API calls, file reading, timers, etc.) using Promises and async/await. These help manage operations that take time without blocking the main thread.


### 🔹 1. Promises
A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

#### 📌 States of a Promise:
- Pending: The initial state.

- Fulfilled: The operation completed successfully.

- Rejected: The operation failed.

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

- `then()` handles success.

- `catch()` handles errors.

- `finally()` (optional) runs whether resolved or rejected.

### 🔹 2. Async/Await

Async/await is syntactic sugar over Promises. It makes asynchronous code look and behave more like synchronous code, improving readability.

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
    const data = await fetchData(); // Waits for Promise to resolve
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

getData();

```

sync before a function means it returns a Promise.

await pauses the execution of the function until the Promise resolves.