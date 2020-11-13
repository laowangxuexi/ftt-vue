import { def, isObject } from "../util/index"
import { arrayMethods } from "./array"
import Dep from "./dep"

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep() // 数组的依赖数组
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      protoAugment(value, arrayMethods)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    let keys = Object.keys(obj)
    keys.forEach((item, index) => {
      defineReactive(obj, item)
    })
  }

  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }

}

function defineReactive(obj, key, value) {

  if (arguments.length === 2) {
    value = obj[key]
  }
  let childOb = observe(value)

  if (typeof value == 'object') {
    new Observer(value)
  }
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('-这里是getter-', value)
      dep.depend(key)
      if (childOb) {
        console.log('这里说明有childOb', '执行了depend()方法')
        childOb.dep.depend(key) // 数组的依赖收集
      }
      return value
    },
    set(newVal) {
      console.log('-这里是setter-newVal:', newVal)
      if (newVal === value) return
      value = newVal
      dep.notify()
    }
  })
}

function observe(value, asRootData) {
  if (!isObject(value)) return
  if (value.__ob__) {
    return value.__ob__
  } else {
    return new Observer(value)
  }
}

function protoAugment(value, target) {
  value.__proto__ = target
}