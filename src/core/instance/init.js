
export function initMixin(V) {
  V.prototype._init = function(options) {
    const vm = this
    vm._data = options.data
  }
}