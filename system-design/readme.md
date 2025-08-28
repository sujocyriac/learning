### System Design Concepts

#### Deep Compare (Stable Serialization)

In libraries like **Svelte Query** (part of the TanStack ecosystem), "Deep Compare (Stable Serialization)" is a method for determining whether two query keys are equivalent. Here's how it works:

- **Stable Serialization**: Keys (usually arrays or objects) are serialized into strings with a consistent, canonical order. This ensures that different arrangements of keys that are essentially the same produce identical serialized forms.
- **Deep Compare**: The comparison goes beyond a shallow reference check (`===`) and genuinely inspects nested structures for equivalence.

For example, from a Svelte Query comparison table:

| Library       | Query Key Change Detection            |
|---------------|---------------------------------------|
| Svelte Query  | Deep Compare (Stable Serialization)   |
| SWR           | Referential Equality (`===`)          |
| Apollo        | Deep Compare (Unstable Serialization) |

[Learn more about Svelte Query](https://sveltequery.vercel.app)

#### Why It Matters

1. **Consistency in Caching**: Ensures that semantically identical queries (regardless of object or array key order) map to the same cache entry.
2. **Accurate Invalidation**: Helps libraries detect changes reliably without relying on object identity.
3. **Advanced Features**: Enables patterns like partial cache invalidation (e.g., "refetch all queries whose keys start with `['todos', …]`") because of deterministic serialization.

#### How This Compares to Other Approaches

| Approach                              | Pros                                              | Cons                                           |
|---------------------------------------|--------------------------------------------------|------------------------------------------------|
| Stable Serialization + Deep Compare   | Highly reliable, handles nested structures, order-insensitive | Higher overhead (serialization, parsing)       |
| Unstable Serialization                | Still does deep comparison, but order-sensitive  | Can treat same content as different if key order changes |
| Referential Equality (`===`)          | Very fast, minimal overhead                      | Fails if different object instances represent same data   |

#### TL;DR

“Deep Compare Keys (Stable Serialization)” refers to:

- Deeply comparing query keys (not just checking references).
- Using a stable serialization process—i.e., consistently ordering keys before generating a string representation for comparison.

This approach balances accuracy and consistency, especially in complex data-fetching scenarios where key equality matters for caching behavior.

---

### Caching Strategies

#### 1. Hierarchical Key → Value

**Idea**: Keys are structured hierarchically, like a path.

**Example:**

```javascript
cache["todos"]["completed"] = [...];
cache["todos"]["pending"] = [...];
```

**Pros:**

- Easy to group related data.
- Supports partial invalidation (e.g., clear only `todos.completed`).

**Cons:**

- More complex to manage deeply nested structures.
- Potential for accidental collisions if hierarchy isn’t consistent.

---

#### 2. Unique Key → Value

**Idea**: Each cache entry is identified by a single unique key (usually a string or hash).

**Example:**

```javascript
cache["GET:/api/todos?completed=true"] = [...];
```

**Pros:**

- Simple, direct lookup.
- Works well for exact query caching.

**Cons:**

- Doesn’t naturally support partial cache invalidation.
- Duplicates may appear if different keys represent equivalent queries.

---

#### 3. Normalized Schema

**Idea**: Cache stores entities by unique IDs (like a database), and queries are reconstructed from those entities.

**Example (GraphQL / Apollo style):**

```javascript
cache["Todo:1"] = { id: 1, text: "Buy milk", completed: false };
cache["Todo:2"] = { id: 2, text: "Read book", completed: true };
```

**Pros:**

- Eliminates duplication.
- Updates propagate automatically everywhere the entity is used.

**Cons:**

- More complex to implement.
- Requires schema knowledge.

---

#### 4. Nested Route → Value

**Idea**: Keys follow the app’s route hierarchy.

**Example (in frameworks like Next.js / Remix):**

```javascript
cache["/todos"] = [...];
cache["/todos/completed"] = [...];
```

**Pros:**

- Natural fit for routing-based applications.
- Easy to prefetch or invalidate per route.

**Cons:**

- Tied to routing; not always flexible for non-URL-based data.
- Harder to normalize entities across routes.
