export default class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  depend(key) {
    console.log("这里是depend, 并且我在这个地方模拟了一个window.target key: ", key)
    window.target = {
      update() {
        console.log('update执行了!')
      }
    }
    if (window.target) {
      this.addSub(window.target)
    }
  }
  notify() {
    // !tips 用slice 创建一个 subs副本
    const subs = this.subs.slice()
    subs.forEach(sub => {
      sub.update()
    })
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}