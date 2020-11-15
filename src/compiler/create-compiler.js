

export function createCompilerCreator(baseCompiler) {
  return function createCompiler(baseOptions) {
    // ...
    function compiler(template, options) {
      //...

      const finalOptions = Object.create(options) // ***** 临时这样写的 *****

      const compiled = baseCompiler(template.trim(), finalOptions)
      //...
      return compiled
    }

    return {
      compiler,
      compilerToFunctions: { test: '待开发...' }
    }
  }
}