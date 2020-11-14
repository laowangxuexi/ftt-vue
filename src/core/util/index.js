export function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: value
  })
}

export function isObject(value) {
  return typeof value == 'object' && value !== null
}

export function isDef(value) {
  return value !== null && value !== undefined
}