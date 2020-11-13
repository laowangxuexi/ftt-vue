
export default class VNode {
  constructor(
    tag,
    data,
    children,
    text,
    elm, // 真实dom节点
    context, // 组件对应的vue实例
    componentOptions, // 组件的options选项
    asyncFactory, // 
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.context = context
    this.componentOptions = componentOptions
    this.asyncFactory = asyncFactory

    this.ns = undefined // 命名空间
    this.key = data && data.key // 遍历时的优化key
    this.parent = null // 父节点
    this.row = false // innerHTML为ture  textContent时候为false
    this.isStatic = false // 静态节点
    this.isRootInsert = true // 是否作为根节点插入
    this.isComment = false // 注释节点
    this.isClone = false // 克隆节点
    this.isOnce = false // 是否有v-once指令
  }
  get child() {
    return this.componentOptions
  }

}