import { parseHTML } from "./html-parser"

export function parse(template, options) {
  // ... 其他代码
  let root
  parseHTML(template, {
    //...
    test() {
      console.log('test test test 钩子函数')
    }
  })
  root = 'root ast ast ast ast'
  return root
}