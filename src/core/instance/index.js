import { initMixin } from './init'


/**
 * 测试一下的
 */
import { VNode } from "../vdom/vnode"
import { createElm } from "../vdom/patch"
import { createCompiler } from "../../compiler/index"


function V(options) {
  this._init(options)
}
V.prototype.VNode = VNode
V.prototype.createElm = createElm
V.prototype.createCompiler = createCompiler

initMixin(V)

export default V