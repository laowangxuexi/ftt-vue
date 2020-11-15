import { isDef, isTrue, isPrimitive } from "../util/index"
import { createElement, appendChild, createTextNode, createComment, parentNode, removeChild } from "../../platforms/web/runtime/node-ops"

export function createElm(vnode, insertVnodeQueue, parentElm, refElm) {
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    // 元素节点
    vnode.elm = createElement(tag, vnode)
    createChildren(vnode, children, insertVnodeQueue)
    insert(parentElm, vnode.elm)
  } else if (isTrue(vnode.isComment)) {
    // 注释节点
    vnode.elm = createComment(vnode.text)
    insert(parentElm, vnode.elm)
  } else {
    // 文本节点
    vnode.elm = createTextNode(String(vnode.text))
    insert(parentElm, vnode.elm)
  }
}

function createChildren(vnode, children, insertVnodeQueue) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; ++i) {
      createEle(children[i], insertVnodeQueue, vnode.elm)
    }
  } else if (isPrimitive(vnode.text)) {
    appendChild(vnode.elm, createTextNode(String(vnode.text)))
  }
}

function insert(parent, elm, ref) {
  appendChild(parent, elm)
  // if (isDef(parent)) {
  //   if(ifDef(ref)) {

  //   } else {

  //   }
  // }
}

function removeChild(el) {
  let parent = el.parentNode()
  if (isDef(parent)) {
    removeChild(parent, el)
  }
}

function patchVnode() {
}