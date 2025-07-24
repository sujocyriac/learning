# Custom Reactive System in JavaScript (Vue-like)

## 🔧 Problem

Create a custom reactivity system in vanilla JavaScript that mimics Vue.js core features. The system should:

- Make a plain object reactive
- Track dependencies during property access
- Notify watchers when values change
- Support deep reactivity

## ✅ Features

- `reactive(obj)` — Returns a deeply reactive proxy of the object.
- `watch(getter, callback)` — Watches reactive dependencies and runs the callback when changes happen.

## 📦 Full Solution

```javascript
let activeEffect = null;
const targetMap = new WeakMap();

function reactive(target) {
  return new Proxy(target, {
    get(obj, key, receiver) {
      const result = Reflect.get(obj, key, receiver);
      track(obj, key);

      if (typeof result === 'object' && result !== null) {
        return reactive(result); // Deep reactivity
      }

      return result;
    },
    set(obj, key, value, receiver) {
      const oldValue = obj[key];
      const result = Reflect.set(obj, key, value, receiver);

      if (oldValue !== value) {
        trigger(obj, key, value, oldValue);
      }

      return result;
    }
  });
}

function track(target, key) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
}

function trigger(target, key, newValue, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effectFn => effectFn(newValue, oldValue));
  }
}

function watch(getter, callback) {
  let oldValue;
  const onInvalidate = new Set();

  const runner = () => {
    cleanup();
    activeEffect = onDependencyChanged;
    const newValue = getter();
    activeEffect = null;

    if (newValue !== oldValue) {
      callback(newValue, oldValue);
      oldValue = newValue;
    }
  };

  const onDependencyChanged = (...args) => {
    runner();
  };

  const cleanup = () => {
    onInvalidate.forEach(dep => dep.delete(onDependencyChanged));
    onInvalidate.clear();
  };

  // Initial run to collect dependencies
  activeEffect = onDependencyChanged;
  oldValue = getter();
  activeEffect = null;
}
```

## 🧪 Example Usage

```javascript
const state = reactive({
  count: 0,
  nested: {
    value: 42
  }
});

watch(() => state.count, (newVal, oldVal) => {
  console.log(`state.count changed from ${oldVal} to ${newVal}`);
});

state.count = 1;
state.count = 2;

watch(() => state.nested.value, (newVal, oldVal) => {
  console.log(`state.nested.value changed from ${oldVal} to ${newVal}`);
});

state.nested.value = 100;
```

## 📤 Output

```
state.count changed from 0 to 1
state.count changed from 1 to 2
state.nested.value changed from 42 to 100
```

## 🚀 Extensions (Optional Challenges)

- `computed()` — Support computed reactive values.
- Batching updates using `queueMicrotask()` or similar.
- Manual `effect()` runner.
- Pausing/resuming watchers.
- Dependency cleanup optimization.

## 📚 Concepts Involved

- JavaScript Proxy
- Closures and reactive effect scopes
- Dependency tracking with `WeakMap → Map → Set`
- Vue.js-style reactivity core ideas

Let me know if you want a version formatted for a coding interview challenge, a module-based export, or additional features like `computed()` or `effect()`.