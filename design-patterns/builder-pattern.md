### 🏗️ Builder Pattern

The Builder Pattern is a creational design pattern that allows for the step-by-step construction of complex objects. It separates the construction of a complex object from its representation, enabling the same construction process to create different representations.

---

#### 🧩 Concept
- **Core Idea:** Use a builder to construct an object step by step, allowing for more control over the construction process.
- **Analogy:** Think of a house builder who constructs a house by adding rooms, windows, and doors one at a time, rather than building the entire house in one go.
- **When to Use:** When an object needs to be created with many optional parameters or when the construction process is complex and requires multiple steps.
- **Benefits:** Makes the code more readable and maintainable, as it allows for a clear separation of concerns.

---

### 🧱 When to Use the Builder Pattern
- When the object creation involves many steps.
- When the object requires many optional parameters.
- When you want to avoid a telescoping constructor (i.e., many constructor overloads).

---

### 🔧 Key Components
- **Product:** The complex object being built.
- **Builder:** Abstract interface defining steps.
- **ConcreteBuilder:** Implements the Builder interface.
- **Director (optional):** Constructs the object using the Builder.

---

## 💡 Example (JavaScript)

```js
// Concrete builder for a Computer object
class ComputerBuilder {
   constructor() {
      this.cpu = null;
      this.memory = null;
      this.graphics = null;
      this.rgbLighting = null;
   }

   addCpu(cpu) {
      this.cpu = cpu;
      return this;
   }

   addMemory(memory) {
      this.memory = memory;
      return this;
   }

   addGraphics(graphics) {
      this.graphics = graphics;
      return this;
   }

   addRgbLighting(rgbLighting) {
      this.rgbLighting = rgbLighting;
      return this;
   }

   build() {
      return {
         cpu: this.cpu,
         memory: this.memory,
         graphics: this.graphics,
         rgbLighting: this.rgbLighting
      };
   }
}

// Usage
const myPC = new ComputerBuilder()
   .addCpu('Intel i9')
   .addMemory('32GB')
   .addGraphics('NVIDIA RTX 4090')
   .addRgbLighting(true)
   .build();

console.log(myPC);
// Output: { cpu: 'Intel i9', memory: '32GB', graphics: 'NVIDIA RTX 4090', rgbLighting: true }
```

---

### 🧱 React-Specific Example: Table Builder

Imagine you're building a highly customizable `<DataTable />` component. Rather than passing a large configuration object all at once, you can build it step-by-step using the Builder Pattern.

```js
class DataTable {
    columns = [];
    rows = [];
    sortable = false;
    pagination = false;

    addColumns(data) {
        if (Array.isArray(data)) {
            this.columns = [...this.columns, ...data];
        } else {
            this.columns.push(data);
        }
        return this;
    }

    addRows(data) {
        if (Array.isArray(data)) {
            this.rows = [...this.rows, ...data];
        } else {
            this.rows.push(data);
        }
        return this;
    }

    setSortable(sortable) {
        this.sortable = sortable;
        return this;
    }

    setPagination(pagination) {
        this.pagination = pagination;
        return this;
    }

    build() {
        return {
            columns: this.columns,
            rows: this.rows,
            sortable: this.sortable,
            pagination: this.pagination
        };
    }
}

// Usage
const tableData = new DataTable()
    .addColumns([{ id: 'Id' }, { name: 'Name' }])
    .addColumns({ age: 'Age' })
    .addRows({ id: '1', name: 'Sujo', age: '36' })
    .addRows([
        { id: '2', name: 'Rose', age: '34' },
        { id: '3', name: 'Steven', age: '2' },
    ])
    .build();

/*
{
  columns: [ { id: 'Id' }, { name: 'Name' }, { age: 'Age' } ],
  rows: [
    { id: '1', name: 'Sujo', age: '36' },
    { id: '2', name: 'Rose', age: '34' },
    { id: '3', name: 'Steven', age: '2' }
  ],
  sortable: false,
  pagination: false
}
*/
```

---