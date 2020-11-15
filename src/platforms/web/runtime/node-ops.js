
export function createElement(tagName, vnode) {
  const elm = document.createElement(tagName)
  return elm
  // if (tagName !== 'select') {
  //   return elm
  // }
}

export function appendChild(node, child) {
  node.appendChild(child)
}

export function createTextNode(text) {
  return document.createTextNode(text)
}

export function createComment(text) {
  return document.createComment(text)
}