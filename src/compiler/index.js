import { createCompilerCreator } from './create-compiler'
import { parse } from "./parser/index"

export const createCompiler = createCompilerCreator(function baseCompiler(template, options) {
  // ...
  // 模板解析阶段 生成ast
  const ast = parse(template.trim(), options)

  // 优化阶段 遍历ast 为静态节点打上标记
  // 将ast生成render函数

  return {
    ast
  }
})