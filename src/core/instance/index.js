import { initMixin } from './init'

function V(options) {
  this._init(options)
}

initMixin(V)

export default V