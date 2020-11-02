import { Observer } from "../observer/index"

export function initState(vm) {
  let opts = vm.$options

  if (opts.data) {
    initData(vm)
  }
}


function initData(vm) {
  let data = vm.$options.data
  new Observer(data)
}