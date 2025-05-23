The `tsc`  command with execute the typescript with the `tsconfig.json` from the root of the directory where you are executing `tsc`  and based on the configuration it

The `tsconfig.json` tell the typescript compiler that what option are to be used.

```JSON
{
    "compilerOptions": {
        "outDir": "build",
        "target": "esnext",
        "noEmit": true
    },
    "include": [
        "src/**/*.ts"
    ]
}
```

A file named `fileName.d.ts` in a package is a TypeScript declaration file. These files contain type information about the code, allowing TypeScript to understand the structure of the code without having access to its implementation.

### 📘 What Is a .d.ts File?
A .d.ts file, or declaration file, provides TypeScript with information about the types, interfaces, functions, and classes that a module exports. Unlike .ts files, .d.ts files do not contain executable code; they are solely used for type checking and IntelliSense support.

For example, if you have a JavaScript file math.js that exports a function, you can create a corresponding math.d.ts file:

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

```

```ts
// math.d.ts
export function add(a: number, b: number): number;
```
This setup allows TypeScript to understand the types used in the add function, even though the implementation is in JavaScript.

## Index Access Types

Index access types allow you to access the type of a property in an object or interface using its key. This is useful when you want to reuse or reference a specific type from an existing structure.

#### Example:
```ts
interface Contact {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending';
}

type ContactId = Contact['id']; // The type of ContactId is number
type ContactStatus = Contact['status']; // The type of ContactStatus is 'active' | 'inactive' | 'pending'
```

In this example:
- `Contact['id']` retrieves the type of the `id` property from the `Contact` interface, which is `number`.
- `Contact['status']` retrieves the type of the `status` property, which is a union type (`'active' | 'inactive' | 'pending'`).

Index access types are a powerful feature in TypeScript that allow you to dynamically reference types from existing structures.