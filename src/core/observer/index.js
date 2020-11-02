import { def } from "../util/index"

export class Observer {
  constructor(value) {
    this.value = value
    // value.__ob__ = this
    def(value, '__ob__', this)
    if (Array.isArray(value)) {

    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    let keys = Object.keys(obj)
    keys.forEach((item, index) => {
      defineReactive(obj, item, obj[item])
    })
  }
}

function defineReactive(obj, key, value) {

  if (arguments.length === 2) {
    value = obj[key]
  }

  if (typeof value == 'object') {
    new Observer(value)
  }
  console.log('value', value)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('-这里是getter-', value)
      return value
    },
    set(newVal) {
      console.log('-这里是setter-newVal:', newVal)
      if (newVal === value) return
      value = newVal
    }
  })
}