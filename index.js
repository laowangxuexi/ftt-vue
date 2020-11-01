(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.V = factory());
}(this, (function () { 'use strict';

  function initMixin(V) {
    V.prototype._init = function(options) {
      const vm = this;
      vm._data = options.data;
    };
  }

  function V(options) {
    this._init(options);
  }

  initMixin(V);

  return V;

})));
