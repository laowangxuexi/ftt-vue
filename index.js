(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.V = factory());
}(this, (function () { 'use strict';

  function def(obj, key, value) {
    Object.defineProperty(obj, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: value
    });
  }

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

  function remove (arr, item) {
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
      // value.__ob__ = this
      def(value, '__ob__', this);
      if (Array.isArray(value)) ; else {
        this.walk(value);
      }
    }

    walk(obj) {
      let keys = Object.keys(obj);
      keys.forEach((item, index) => {
        defineReactive(obj, item, obj[item]);
      });
    }
  }

  function defineReactive(obj, key, value) {

    if (arguments.length === 2) {
      value = obj[key];
    }

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
