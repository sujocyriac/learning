### 🦸‍♂️ Singleton Pattern

The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it. This is useful when exactly one object is needed to coordinate actions across the system.

---

#### 🏗️ Example: Singleton Class in JavaScript

```js
class Sujo {
    static instance = null;

    constructor() {
        if (Sujo.instance) {
            throw new Error("Use Sujo.getInstance() instead of new.");
        }
    }

    static getInstance() {
        if (!Sujo.instance) {
            Sujo.instance = new Sujo();
        }
        return Sujo.instance;
    }
}

const a = Sujo.getInstance();
const b = Sujo.getInstance();

console.log(a === b); // true

const sujo = new Sujo(); // Error: Use Sujo.getInstance() instead of new.
```

---

#### 🛠️ Example: Singleton with Closure (Function Use Case)

```js
function getDBInstance() {
    let dbInstance = null;
    return function () {
        if (!dbInstance) {
            dbInstance = new MonogoClient("mongodb://localhost:27017");
        }
        return dbInstance;
    }
}

const getInstance = getDBInstance();
const db1 = getInstance();
const db2 = getInstance();
console.log(db1 === db2); // true
```

---

#### ✅ Model Answer: Using Singleton in React Frontend
"In the frontend, particularly in React, I’ve used the Singleton pattern in scenarios where I needed to ensure a single shared instance across the app — for example, for managing services like a WebSocket connection, a global event bus, a logging service, or a wrapper around localStorage/sessionStorage.

I typically implement it using a module-level singleton or a closure that returns the same instance. For example, in a recent project, I created a Singleton for a WebSocket client. I exposed a single instance to the entire app so multiple components could subscribe to real-time updates without reinitializing the socket connection. This ensured consistent state and reduced connection overhead.

Here’s a simple example:

```js
// WebSocketClient.js
// socketService.js
let socketInstance;

export function getSocketInstance() {
  if (!socketInstance) {
    socketInstance = new WebSocket('wss://example.com/socket');
  }
  return socketInstance;
}
````

Another exaple would be a useAxios hook that uses a singleton instance of Axios to ensure all API calls are made through the same instance, allowing for consistent configuration and interceptors.

```js
// useApiClient.js
import axios from 'axios';

let apiInstance = null;

export function useApiClient() {
  if (!apiInstance) {
    apiInstance = axios.create({
      baseURL: 'https://api.example.com',
      headers: {
        'Authorization': 'Bearer your_token_here',
      },
    });
  }
  return apiInstance;
}
````