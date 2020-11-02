import { initState } from './state'

export function initMixin(V) {
  V.prototype._init = function(options) {
    const vm = this
    vm.$options = options

    initState(vm)
  }
}