import { def } from "../util/index"
import { arrayMethods } from "./array"
import Dep from "./dep"

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep() // 数组的依赖手机
    // value.__ob__ = this
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      protoAugment(value, arrayMethods)

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
  let childOb = observe(value)
  if (arguments.length === 2) {
    value = obj[key]
  }

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
      if(childOb) {
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
  if (value.__ob__) {
    return value.__ob__
  } else {
    return new Observer(value)
  }

}

function protoAugment(value, target) {
  value.__proto__ = target
}