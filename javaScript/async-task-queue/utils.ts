
export function isPromise(value: any): boolean {

  if (value instanceof Promise) {
    return true;
  }

  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.then === 'function' &&
    typeof value.catch === 'function'
  );
}