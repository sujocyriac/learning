

/**
 * This is a basic example of memoization in JavaScript.
 * Memoization is an optimization technique that stores the results of expensive function calls
 * and returns the cached result when the same inputs occur again.
 * This can significantly improve performance for functions that are called frequently with the same arguments.
 * In this example, we create a memoize function that takes an executor function as an argument.
 * The memoize function returns a new function that caches the results of the executor function.
 * The cache is implemented using a Map object, which stores the results of the executor function
 * for each unique set of arguments.
 * The memoized function checks if the result for the given arguments is already in the cache.
 * If it is, it returns the cached result. If not, it calls the executor function and stores the result in the cache.
 * This example demonstrates how memoization can improve performance by avoiding redundant calculations.
 * @param {function} executorFn - The function to be memoized.
 * @returns {function} - The memoized function.             
 */

function memoize(executorFn) {
    const hash = new Map();

    return function (...args) {
        const key = args.length > 0 ? btoa(args.join('')) : null
        const memoizedValue = hash.get(key);
        const result = memoizedValue ? memoizedValue : executorFn(...args);

        hash.set(key, result);

        return result;
    }

}

const memoized = memoize(function (count) {
    let i = 0;
    let result = 0;
    while (i < count) {
        result = result + i
        i++;
    }
    return result
})

const t0 = performance.now();
const out1 = memoized(1000000000);
const t1 = performance.now();
const out2 = memoized(1000000000);
const out3 = memoized(1000000000);
const t2 = performance.now();

console.log(`performance difference in millisec for cold start: ${t1 - t0}`)
console.log(`performance difference in millisec for after memo start: ${t2 - t1}`)