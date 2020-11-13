(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.V = factory());
}(this, (function () { 'use strict';

  function def(obj, key, value) {
    Object.defineProperty(obj, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: value
    });
  }

  function isObject(value) {
    return typeof value == 'object' && value !== null
  }

  const arrayProto = Array.prototype;

  // 
  const arrayMethods = Object.create(arrayProto);

  const methodsToPatch = [
    'push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'
  ];

  methodsToPatch.forEach(method => {
    let originalFunc = arrayMethods[method];
    Object.defineProperty(arrayMethods, method, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function mutator(...args) {
        const result = originalFunc.apply(this, args);
        console.log('这里执行数组的依赖更新', this);
        return result
      }
    });
  });

  class Dep {
    constructor() {
      this.subs = [];
    }
    addSub(sub) {
      this.subs.push(sub);
    }
    removeSub(sub) {
      remove(this.subs, sub);
    }
    depend(key) {
      console.log("这里是depend, 并且我在这个地方模拟了一个window.target key: ", key);
      window.target = {
        update() {
          console.log('update执行了!');
        }
      };
      if (window.target) {
        this.addSub(window.target);
      }
    }
    notify() {
      // !tips 用slice 创建一个 subs副本
      const subs = this.subs.slice();
      subs.forEach(sub => {
        sub.update();
      });
    }
  }

  function remove(arr, item) {
    if (arr.length) {
      const index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  class Observer {
    constructor(value) {
      this.value = value;
      this.dep = new Dep(); // 数组的依赖数组
      def(value, '__ob__', this);
      if (Array.isArray(value)) {
        protoAugment(value, arrayMethods);
        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    walk(obj) {
      let keys = Object.keys(obj);
      keys.forEach((item, index) => {
        defineReactive(obj, item);
      });
    }

    observeArray(items) {
      for (let i = 0; i < items.length; i++) {
        observe(items[i]);
      }
    }

  }

  function defineReactive(obj, key, value) {

    if (arguments.length === 2) {
      value = obj[key];
    }
    let childOb = observe(value);

    if (typeof value == 'object') {
      new Observer(value);
    }
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('-这里是getter-', value);
        dep.depend(key);
        if (childOb) {
          console.log('这里说明有childOb', '执行了depend()方法');
          childOb.dep.depend(key); // 数组的依赖收集
        }
        return value
      },
      set(newVal) {
        console.log('-这里是setter-newVal:', newVal);
        if (newVal === value) return
        value = newVal;
        dep.notify();
      }
    });
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
    value.__proto__ = target;
  }

  function initState(vm) {
    let opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }


  function initData(vm) {
    let data = vm.$options.data;
    new Observer(data);
  }

  function initMixin(V) {
    V.prototype._init = function(options) {
      const vm = this;
      vm.$options = options;

      initState(vm);
    };
  }

  function V(options) {
    this._init(options);
  }

  initMixin(V);

  return V;

})));
