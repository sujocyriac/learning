## Bundling

Bundling is the process of packaging multiple files into a single file or a set of files. This is often done to reduce the number of HTTP requests needed to load a web page, which can improve performance.

### 🛠️ Popular Bundling Tools

- **Webpack**: Powerful module bundler for JavaScript applications. Bundles JS, CSS, images, and more.
- **Rollup**: Compiles small pieces of code into larger, more complex bundles. Great for libraries.
- **Parcel**: Web application bundler with zero configuration and fast performance.
- **Browserify**: Allows Node.js-style `require` in the browser, bundling dependencies into a single file.
- **Vite**: Modern build tool with fast development server and efficient production bundling.
- **esbuild**: Extremely fast JavaScript bundler and minifier supporting modern JS features.
- **Snowpack**: Serves files over native ESM for fast development and bundling.
- **FuseBox**: Fast JavaScript bundler with TypeScript and ES6 module support.
- **Metro**: Bundler used by React Native, optimized for mobile development.
- **Terser**: JavaScript parser, mangler, and compressor toolkit for ES6+.
- **UglifyJS**: JavaScript compressor for minifying and mangling JS code.

### 💡 Key Concepts

- **Tree Shaking**: Removes unused code from the final bundle, reducing size.
- **Code Splitting**: Splits code into smaller chunks that can be loaded on demand, improving load times and performance.
- **Minification**: Removes unnecessary characters (whitespace, comments) to reduce code size.
- **Source Maps**: Map transformed code back to the original source, making debugging easier.
- **Hot Module Replacement (HMR)**: Updates modules in the browser without a full reload, speeding up development.

### 🌳 What is Tree Shaking?

Tree shaking is a term commonly used in JavaScript to describe the removal of dead code. It relies on the static structure of ES6 module syntax (`import`/`export`) to determine which pieces of code are actually used and which can be safely removed.

**At its core, tree shaking (also known as "dead code elimination") is the process of removing unused JavaScript code from your final production bundle.**

Imagine your application's module dependency graph as a tree:
- The **trunk** is your main application entry point (e.g., `index.js`).
- The **branches** are the modules you import (e.g., `utility.js`, `api.js`).
- The **leaves** are the individual functions, classes, or variables exported from those modules.

If certain leaves (for example, a `sortByDate` function in `utility.js`) are never reached or used from the trunk or any other active branch, tree shaking will "shake" that leaf off, and it won't be part of the final "packaged" tree you deliver.

**How it works:**
- **Static Analysis:** Tree shaking tools perform static analysis of the code to identify which exports are used and which are not. This is typically done during the build process.
- **Dead Code Elimination:** Once unused code is identified, it can be removed from the final bundle, reducing its size.

**Benefits:**
- **Smaller Bundle Size:** By eliminating unused code, tree shaking helps create smaller, more efficient bundles.
- **Improved Load Times:** Smaller bundles lead to faster download and parsing times, improving overall application performance.


**Why is Tree Shaking Important?**

- **Reduced Bundle Size:**
  - **Faster Downloads:** Less data to transfer over the network.
  - **Faster Parsing and Execution:** Browsers can parse and execute smaller JavaScript files more quickly, leading to faster Time To Interactive (TTI) for users.
  - **Less Memory Usage:** Smaller scripts require less memory to be loaded and processed.
  - **Improved Performance:** Directly contributes to a snappier and more responsive user experience, especially on slower networks or less powerful devices.

- **Cleaner Codebase (Indirectly):**
  - While not a direct cleanup tool, knowing that unused code won't end up in production can encourage developers to leave potentially useful but currently unutilized functions in libraries, knowing they won't bloat the build.

> **Note:** Tree shaking works best with ES module `import`/`export` syntax, especially with named exports. It does not work with CommonJS `require` statements, as they are dynamic and cannot be statically analyzed in the same way. Always use named exports in your modules to take full advantage of tree shaking.

---

**How Does Tree Shaking Work?**

Tree shaking relies heavily on ES Modules (ESM) syntax (`import` and `export`). This is because ESM is static: the imports and exports are defined at the file level and can be determined before the code actually runs. This static analysis is crucial for bundlers to identify what's truly used and what's not.

Here's a simplified breakdown:

1. **Static Analysis:** Bundlers (like Webpack, Rollup, Parcel, and Vite) perform static analysis of your code. They build a dependency graph of your application, understanding which modules import which exports from other modules.
2. **Marking Exports:** When a module exports multiple functions or variables, the bundler "marks" each export.
3. **Tracing Imports/Usage:** The bundler then traverses the dependency graph starting from your application's entry point(s). As it encounters import statements, it marks the imported exports as "used."
4. **Dead Code Identification:** Any exports that are not marked as "used" during this traversal are considered "dead code."
5. **Exclusion from Bundle:** During the bundling process, the dead code is simply omitted from the final output.

Let’s say you write your code like this:

```js
 
// fruits.js
export const apple = '🍎';
export const banana = '🍌';
export const grape = '🍇';
``` 
```js
// basket.js
import { apple } from './fruits.js';
console.log(apple);
```
Because you used import, the helper can see clearly that:

✅ You used apple

❌ You didn’t use banana or grape

So it only keeps apple in your final code.

### Side-Effect Free Modules

marking modules as "side-effect free" is a crucial aspect of tree shaking. A side-effect free module is one that does not produce any observable effects when imported, other than exporting its values. This means it doesn't modify global state, doesn't perform I/O operations, and doesn't rely on external variables or states.

### 👩‍💻 Code Splitting

Code splitting is an optimization technique used in web development to improve the performance of web applications, especially their initial load times.

**What it is:**

- **Breaking down bundles**: When you build a web application, especially with modern JavaScript frameworks and tools (like React, Angular, Vue, and bundlers like Webpack, Rollup, Parcel), all your code (your own application code, third-party libraries, CSS, etc.) is often combined into one large file called a "bundle." Code splitting allows you to break this bundle into smaller, more manageable pieces that can be loaded on demand.

- **Loading on demand**: Code splitting involves dividing this single, large bundle into smaller, independent "chunks" or "bundles." These smaller bundles can then be loaded on demand or in parallel as the user interacts with the application, rather than downloading everything.

**Why it's needed (and its benefits):**

- **Reduced initial load time:** The primary benefit. When a user first visits your website, they only download the essential code needed for the current page or view. This significantly speeds up the initial page load, making the application feel faster and more responsive.

- **Improved user experience:** Faster load times lead to a better user experience. Users are more likely to stay on a site that loads quickly, reducing bounce rates.

- **Better caching:** If you update only a small part of your application, only the relevant small bundle needs to be re-downloaded by the user, rather than the entire large bundle. This improves caching efficiency.

- **Optimized resource utilization:** Users only download the code they actually need, saving bandwidth and resources, especially for those on slower connections or mobile devices.

**How it works (common techniques):**

- **Dynamic Imports:**
  The most common and flexible way to implement code splitting. JavaScript's `import()` syntax (e.g., `import('./myModule.js').then(...)`) tells bundlers to create a separate chunk for the imported module, which is then loaded asynchronously when that line of code is executed.

- **Route-Based Splitting:**
  In single-page applications (SPAs), it's common to split code based on routes. When a user navigates to a specific route (e.g., `/dashboard`), only the code necessary for that dashboard page is loaded.

- **Component-Based Splitting:**
  For frameworks like React, you can split code at the component level. A component's code is only loaded when that component is rendered on the page. React's `React.lazy()` and `Suspense` are specifically designed for this.

- **Vendor Splitting:**
  Separates third-party libraries (like React, Lodash, etc.) into their own bundles. These libraries tend to change less frequently, so they can be cached effectively.

- **Multiple Entry Points:**
  For applications with clearly defined, separate sections, you can configure your bundler with multiple entry points, each generating its own bundle.

---

### 🚚 What is Vendor Splitting?

Vendor splitting is a code-splitting technique where your application's third-party dependencies (also known as "vendor code" or "libraries") are separated into their own distinct JavaScript bundles, apart from your own application's code.

**Examples of vendor code include:**
- **Frameworks/Libraries:** React, Angular, Vue, jQuery
- **Utility Libraries:** Lodash, Moment.js
- **UI Libraries:** Material-UI, Ant Design
- **Data Fetching Libraries:** Axios, GraphQL clients
- **Polyfills:** Core-js

---

### 🎯 Why is Vendor Splitting Beneficial?

The core motivation behind vendor splitting is improved caching efficiency and reduced re-downloads for users.

**Leveraging Browser Caching:**
- Third-party libraries generally don't change as frequently as your own application code.
- When you release a new version of your application, your app code changes, resulting in a new hash for its bundle (e.g., `app.12345.js` becomes `app.67890.js`). This invalidates the old app bundle in the user's browser cache, forcing a re-download.
- However, if your vendor libraries are in a separate bundle (e.g., `vendors.abcdef.js`), and those libraries haven't changed, their hash remains the same. The browser will see that it already has `vendors.abcdef.js` in its cache and won't need to re-download it.
- This means users only download the changed application code, leading to significantly faster subsequent page loads.

**Reduced Initial Load Time (for subsequent visits):**
- The very first load might still download both vendor and app bundles, but subsequent visits benefit from the cached vendor bundle, making the application appear faster.

**Parallel Downloading:**
- Modern browsers can download multiple files in parallel. By splitting your code into smaller chunks (including a vendor chunk), the browser can download these chunks concurrently, potentially speeding up the overall initial load time.

**Clearer Bundle Analysis:**
- Having separate vendor bundles makes it easier to analyze your bundle sizes using tools like Webpack Bundle Analyzer.
- You can clearly see how much space your third-party dependencies are taking up versus your own code, which can help in identifying areas for optimization (e.g., switching to smaller libraries).