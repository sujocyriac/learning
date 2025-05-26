

### Singleton Pattern
The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it. This is useful when exactly one object is needed to coordinate actions across the system.

example:

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