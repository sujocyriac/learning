### 🧩 Design Patterns

Imagine you're building with LEGOs. Design patterns are like pre-made instructions or blueprints for common building challenges. Instead of figuring out how to build a car wheel from scratch every time, you have a reliable way to do it.

---

#### 🏗️ Structural Patterns: How Objects Are Composed

> **Analogy:** How different LEGO bricks are connected and arranged to form larger, more complex structures.

**What they do:**
- Organize objects and classes into larger structures while maintaining flexibility and efficiency.
- Ensure that changes in one part of the structure don't break everything else.
- Focus on relationships between entities.

**Why they're useful:**
- 🧩 You need to make incompatible interfaces work together.
- ➕ You want to add new functionalities to an object without changing its core structure.
- 🛠️ You want to simplify the interface to a complex subsystem.

---

#### ✨ Simple Examples

**🔌 Adapter Pattern:**
- **Idea:** Allows objects with incompatible interfaces to collaborate. It acts as a translator.
- **Analogy:** A universal travel adapter. You have a device with a plug that doesn't fit the wall socket, so you use an adapter to make them compatible.
- **In JavaScript:** You might have an old library that expects data in one format, but your new code provides it in another. An adapter function can convert the data so they can work together.

---



**🎁 Decorator Pattern:**
- **Idea:** Attaches new responsibilities to an object dynamically. It's like wrapping an object to give it new behaviors.
- **Analogy:** Adding accessories to a basic coffee cup. You can add a lid, a sleeve, or a fancy handle, each adding a new feature without changing the original cup.
- **Learn more:** [See Decorator Pattern details](./decorator-pattern.md)

---
