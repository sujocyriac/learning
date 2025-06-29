## TypeScript

TypeScript is an open-source superset of JavaScript, maintained by Microsoft. It adds static typing and other features to JavaScript, making code more robust and maintainable.

---

TypeScript consists of three main components:

1. **The Language**: The syntax, keywords, and type system that extend JavaScript.
2. **The Compiler (`tsc`)**: Translates TypeScript code into JavaScript, checking types and applying configuration from `tsconfig.json`.
3. **The Language Server**: Provides editor features like IntelliSense, autocompletion, and real-time type checking in supported editors (e.g., VS Code).

### 🔧 Compiling TypeScript

The `tsc` command compiles TypeScript code using the `tsconfig.json` file found in the root of the directory where you run the command. The configuration in `tsconfig.json` determines how the TypeScript compiler behaves.

**Example `tsconfig.json`:**
```json
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
- `compilerOptions` specifies how the code should be compiled.
- `include` tells the compiler which files to process.

---

### 📘 What Is a `.d.ts` File?

A file named `fileName.d.ts` is a TypeScript declaration file. Declaration files provide type information about code, allowing TypeScript to understand the structure of modules without needing their implementation.

- `.d.ts` files contain only type declarations (types, interfaces, functions, classes) and no executable code.
- They enable type checking and IntelliSense for JavaScript codebases.

**Example:**
Suppose you have a JavaScript file `math.js` that exports a function:

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };
```

You can create a corresponding declaration file `math.d.ts`:

```ts
// math.d.ts
export function add(a: number, b: number): number;
```

This setup allows TypeScript to understand the types used in the `add` function, even though the implementation is in JavaScript.

---

## 🗝️ Index Access Types

Index access types let you reference the type of a property in an object or interface using its key. This is useful for reusing or extracting specific types from existing structures.

**Example:**
```ts
interface Contact {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending';
}

type ContactId = Contact['id']; // number
type ContactStatus = Contact['status']; // 'active' | 'inactive' | 'pending'
```

- `Contact['id']` gets the type of the `id` property (`number`).
- `Contact['status']` gets the type of the `status` property (a union type).

Index access types are a powerful feature in TypeScript for dynamically referencing types from existing structures.