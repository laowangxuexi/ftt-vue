import { parseHTML } from "./html-parser"

export function parse(template, options) {
  // ... 其他代码
  let root
  parseHTML(template, {
    //...
    test() {
      console.log('test test test 钩子函数')
    },
    start(tag, attrs, unary, start, end) {
      let currentParent = null
      let element = createASTElement(tag, attrs, currentParent)
    },
    end(tag, start, end) {
      console.log('end钩子')
    },
    chars(text, start, end) {
      console.log('chars钩子')
    },
    comment(text) {
      let element = {
        type: 3,
        text,
        isComment: true
      }
    }

  })
  root = 'root ast ast ast ast'
  return root
}

export function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent,
    children: []
  }
}

function makeAttrsMap(attrs) {
  const map = {}
  for (let i = 0, l = attrs.length; i < l; i++) {
    map[attrs[i].name] = attrs[i].value
  }
  return map
}