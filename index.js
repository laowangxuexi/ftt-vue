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
    console.log('value', value);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('-这里是getter-', value);
        return value
      },
      set(newVal) {
        console.log('-这里是setter-newVal:', newVal);
        if (newVal === value) return
        value = newVal;
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
