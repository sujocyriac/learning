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

Some useful compiler options include:

- `declaration` (boolean): If enabled, generates a declaration (`.d.ts`) file for each TypeScript file, providing type information for consumers.
- `module` (string): Specifies the module system for the output files, such as `commonjs`, `esnext`, or `umd`. This changes how the generated JavaScript files handle imports and exports.

---

## Generic vs Non-Generic Types

Generics in TypeScript enable you to create flexible, reusable components that work with any data type while preserving type safety. With generics, you can define functions, classes, and interfaces that operate on a variety of types without losing the benefits of static typing.

Generics use angle brackets (`<T>`) to specify a placeholder type, which is provided when the component is used. This approach allows your code to adapt to different data types in a type-safe manner.

**Example: Generic Function**
```ts
function identity<T>(arg: T): T {
  return arg;
}
```
In this example, `identity` is a generic function that returns the same type as its input, regardless of what that type is.

Non-generic types or literals, on the other hand, are fixed to specific types and cannot adapt to different data types.

**Example: Non-Generic Function**
```ts
function double(x: number): number {
  return x * 2;
}
```
In this example, `double` only works with `number` types. If you try to pass a value of another type, TypeScript will raise a type error.

**Example: Literal Type**
```ts
type Direction = 'up' | 'down' | 'left' | 'right';
```
Here, `Direction` is a union of string literal types. Only these specific string values are allowed.


### 🔄 Type Casting

Type casting in TypeScript allows you to tell the compiler to treat a value as a specific type. This is useful when you know more about the value's type than TypeScript can infer, such as when working with values from external sources or when narrowing types.

There are two common syntaxes for type casting:

1. **Angle-bracket syntax** (not allowed in `.tsx` files):
  ```ts
    let someValue: unknown = "hello";
      let strLength: number = (<string>someValue).length;
        ```

        2. **`as` syntax** (recommended, especially in React projects):
          ```ts
            let someValue: unknown = "hello";
              let strLength: number = (someValue as string).length;
                ```

                Type casting does not change the runtime type of a value—it only affects how TypeScript checks types at compile time. Use casting carefully, as incorrect casts can lead to runtime errors.

                **Example: Casting to a more specific type**
                ```ts
                function handle(input: string | number) {
                  if (typeof input === "string") {
                     // TypeScript knows input is a string here
                        console.log((input as string).toUpperCase());
                          }
                          }
                          ```

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


### 🗝️ Index Signatures

An **index signature** in TypeScript allows you to define the shape of objects with dynamic keys, where the key names are not known ahead of time. This is useful when you want to describe objects that can have any number of properties, as long as their keys and values follow a specific structure.

**Example: Nested Index Signature**
```ts
interface PhoneTypes {
  [outerKey: string]: {
    [innerKey: string]: { a: number; b: string }
  }
}

const x: PhoneTypes = {
  anyData: {
    someData: {
      a: 2,
      b: "ss"
    }
  }
};

console.log(x);
```

In this example:
- `PhoneTypes` describes an object where each property (like `anyData`) is itself an object with string keys (like `someData`), and each of those properties is an object with properties `a` (number) and `b` (string).
- This pattern is helpful for representing deeply nested or dynamic data

---
Here are some examples to illustrate TypeScript's type inference and array/object typing:

```js
const x = [12, 10];
// x is inferred as number[]

const users = [{ name: "user-1" }, { name: "user-2" }];
// users is inferred as { name: string }[]

type ArrayOfObj = { [key: string]: number }[];

const data: ArrayOfObj = [{ dd: 2 }];
// data is inferred as { [key: string]: number }[]
```

### 🧩 Tuples

Tuples in TypeScript are special arrays that allow you to specify the exact number and types of elements in the array. Each element can have a different type, making tuples useful for representing structured data with a fixed format.

```ts
type MyArray = readonly [string?, number?];

const x: MyArray = ["dsdsd", 1];

// The following line will cause an error because the tuple is readonly and has a fixed
```
the `readonly` modifier prevents modification of the tuple after its creation, ensuring that the structure remains consistent.

example of 2d array:

```ts
type My3DArray = [string, number][][];

const x: My3DArray = [[["sd", 2]]];
```

### 🏗️ Structural vs. Nominal Typing

TypeScript uses **structural typing** as its core type system. This means that type compatibility is determined by the actual shape and structure of the types (i.e., the properties and their types), rather than by explicit declarations or names. If two types have the same structure, they are considered compatible—even if they were declared separately.

This approach allows for greater flexibility and code reuse, as you can easily substitute objects with matching shapes, regardless of their declared type names.

**Nominal typing**, by contrast, requires types to be explicitly declared and matched by name, which is more restrictive and less common in TypeScript. Some other languages (like Java or C#) use nominal typing.

**Example:**
```ts
interface Point {
  x: number;
  y: number;
}

interface Coordinate {
  x: number;
  y: number;
}

const a: Point = { x: 1, y: 2 };
const b: Coordinate = a; // Allowed in TypeScript due to structural typing
```

In this example, `Point` and `Coordinate` have the same structure, so you can assign one to the other without error.

> Making a mental model that types are a set of allowed values can help you understand how TypeScript's type system works. Instead of thinking about types as rigid contracts, consider them as flexible templates that describe the shape of data. This perspective can make it easier to work with complex types and leverage TypeScript's powerful type inference capabilities.

### 🔗 Union and Intersection Types

Union and intersection types are advanced features in TypeScript that let you combine multiple types to create new, flexible type definitions.

- **Union Types (`|`)** allow a value to be one of several types. This is useful when a variable or parameter can accept multiple types.
  
  **Example:**
  ```ts
  type Status = 'active' | 'inactive' | 'pending';
  let currentStatus: Status = 'active'; // Only these values are allowed

  function printId(id: number | string) {
    console.log('ID:', id);
  }
  ```
  Here, `Status` can be any of the specified string literals, and `printId` accepts either a number or a string.

- **Intersection Types (`&`)** combine multiple types into one, requiring that a value satisfy all the combined types. This is useful for merging interfaces or types.
  
  **Example:**
  ```ts
  interface Person {
    name: string;
  }
  interface Employee {
    employeeId: number;
  }
  type Staff = Person & Employee;

  const staffMember: Staff = {
    name: 'Alice',
    employeeId: 123
  };
  ```
  Here, `Staff` must have both the properties from `Person` and `Employee`.

Union and intersection types help you model complex data structures and write more expressive, type-safe code in TypeScript.



type wholeNumbersTillFive = 1 | 2 | 3 | 4 | 5
type eventNumbersTillFive = 2 | 4 | 6

let numValue: wholeNumbersTillFive & eventNumbersTillFive

numValue = 8 as wholeNumbersTillFive & eventNumbersTillFive

#### Example: Intersection of Union Types

```ts
// Define two union types:
type WholeNumbersTillFive = 1 | 2 | 3 | 4 | 5;
type EvenNumbersTillSix = 2 | 4 | 6;

// Intersection type:
let numValue: WholeNumbersTillFive & EvenNumbersTillSix;
```

Here, `WholeNumbersTillFive` is the set {1, 2, 3, 4, 5} and `EvenNumbersTillSix` is the set {2, 4, 6}. The intersection type `WholeNumbersTillFive & EvenNumbersTillSix` represents values that are present in both sets. In this case, only `2` and `4` are valid values for `numValue`.

If you try to assign a value outside the intersection, TypeScript will raise a type error:

```ts
numValue = 8 as WholeNumbersTillFive & EvenNumbersTillSix; // ❌ Invalid: 8 is not in either set
numValue = 2; // ✅ Valid
numValue = 4; // ✅ Valid
numValue = 6; // ❌ Invalid: 6 is not in WholeNumbersTillFive
```

**Summary:**
- The intersection of union types results in a type that only allows values present in both unions.
- This is useful for narrowing down possible values and enforcing stricter type constraints.

Aliasing with subtypes
```ts
type DescriptionFunction =  () => string
type CustomDate = Date & { getDescription: DescriptionFunction };


const today: CustomDate = Object.assign(new Date, { getDescription: () => "hello" })
const description = today.getDescription(); // "Date with value: ..."
console.log(description);

```