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

  function isObject(value) {
    return typeof value == 'object' && value !== null
  }

  function isDef(value) {
    return value !== null && value !== undefined
  }

  function isTrue(value) {
    return value === true
  }

  function isPrimitive(value) {
    return (
      typeof value === 'string' || value === 'number' || value === 'boolean' || value === 'symbol'
    )
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

  class VNode {
    constructor(
      tag,
      data,
      children,
      text,
      elm, // 真实dom节点
      context, // 组件对应的vue实例
      componentOptions, // 组件的options选项
      asyncFactory, // 
    ) {
      this.tag = tag;
      this.data = data;
      this.children = children;
      this.text = text;
      this.elm = elm;
      this.context = context;
      this.componentOptions = componentOptions;
      this.asyncFactory = asyncFactory;

      this.ns = undefined; // 命名空间
      this.key = data && data.key; // 遍历时的优化key
      this.parent = null; // 父节点
      this.row = false; // innerHTML为ture  textContent时候为false
      this.isStatic = false; // 静态节点
      this.isRootInsert = true; // 是否作为根节点插入
      this.isComment = false; // 注释节点
      this.isClone = false; // 克隆节点
      this.isOnce = false; // 是否有v-once指令
    }
    get child() {
      return this.componentOptions
    }

  }

  function createElement(tagName, vnode) {
    const elm = document.createElement(tagName);
    return elm
    // if (tagName !== 'select') {
    //   return elm
    // }
  }

  function appendChild(node, child) {
    node.appendChild(child);
  }

  function createTextNode(text) {
    return document.createTextNode(text)
  }

  function createComment(text) {
    return document.createComment(text)
  }

  function createElm(vnode, insertVnodeQueue, parentElm, refElm) {
    const data = vnode.data;
    const children = vnode.children;
    const tag = vnode.tag;
    if (isDef(tag)) {
      // 元素节点
      vnode.elm = createElement(tag);
      createChildren(vnode, children, insertVnodeQueue);
      insert(parentElm, vnode.elm);
    } else if (isTrue(vnode.isComment)) {
      // 注释节点
      vnode.elm = createComment(vnode.text);
      insert(parentElm, vnode.elm);
    } else {
      // 文本节点
      vnode.elm = createTextNode(String(vnode.text));
      insert(parentElm, vnode.elm);
    }
  }

  function createChildren(vnode, children, insertVnodeQueue) {
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        createEle(children[i], insertVnodeQueue, vnode.elm);
      }
    } else if (isPrimitive(vnode.text)) {
      appendChild(vnode.elm, createTextNode(String(vnode.text)));
    }
  }

  function insert(parent, elm, ref) {
    appendChild(parent, elm);
    // if (isDef(parent)) {
    //   if(ifDef(ref)) {

    //   } else {

    //   }
    // }
  }

  function createCompilerCreator(baseCompiler) {
    return function createCompiler(baseOptions) {
      // ...
      function compiler(template, options) {
        //...

        const finalOptions = Object.create(options);

        const compiled = baseCompiler(template.trim(), finalOptions);
        //...
        return compiled
      }

      return {
        compiler,
        compilerToFunctions: { test: '待开发...' }
      }
    }
  }

  const createCompiler = createCompilerCreator(function baseCompiler(template, options) {
    // ...
    // 模板解析阶段 生成ast
    // const ast = parse(template.trim(), options)
    const ast = "parse ast";

    // 优化阶段 遍历ast 为静态节点打上标记
    // 将ast生成render函数

    return {
      ast
    }
  });

  function V(options) {
    this._init(options);
  }
  V.prototype.VNode = VNode;
  V.prototype.createElm = createElm;
  V.prototype.createCompiler = createCompiler;

  initMixin(V);

  return V;

})));
