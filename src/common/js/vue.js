/**
 * 专门负责解析模板内容
 */
export class Compile {
  constructor(el, vm) {
    // el: new page传递的选择器
    this.el = typeof el === "string" ? document.querySelector(el) : el
    // vm: new的page实例
    this.vm = vm;
    this.observer = new Observer(vm.$data);
    // 编译模板
    if (this.el) {
      //1. 把el中所有的子节点都放入到内存中， fragment
      let fragment = this.node2fragment(this.el)
      //2. 在内存中编译fragment
      this.compile(fragment.childNodes)
      //3. 把fragment一次性的添加到页面
      this.el.appendChild(fragment)
      // 创建DOM观察者
      this.mutationObserver();
    }
  }
  mutationObserver() {
    // Firefox和Chrome早期版本中带有前缀
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (!MutationObserver) throw '错误：浏览器不支持MutationObserver，请升级浏览器'
    // 创建观察者对象
    let mutation = new MutationObserver((mutations) => {
      Util.toArray(mutations).forEach((n) => {
        if (n.addedNodes && n.addedNodes.length > 0) this.compile(Util.toArray(n.addedNodes))
        if (n.removedNodes && n.removedNodes.length > 0) this.deleSubscriber(n.removedNodes);
      })
    });
    // 传入目标节点和观察选项
    mutation.observe(this.el, { childList: true, subtree: true });
  }
  /* 核心方法 */
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    // 把el中所有的子节点挨个添加到文档碎片中
    Util.toArray(node.childNodes).forEach(node => {
      // 把所有的子节点都添加到frament中
      fragment.appendChild(node)
    })
    return fragment
  }
  /**
   * 删除订阅者
   */
  deleSubscriber(removedNodes) {
    Util.toArray(removedNodes).forEach(node => {
      if (node._uuid) this.observer.watchers.forEach(watcher => { watcher.deleSub(node._uuid) });
      if (node.childNodes && node.childNodes.length > 0) this.deleSubscriber(node.childNodes);
    })
  }
  /**
   * 编译文档碎片（内存中）
   * @param {*} childNodes
   */
  compile(childNodes) {
    Util.toArray(childNodes).forEach(node => {
      // 编译子节点
      if (node.nodeType === 1) this.compileElement(node);// 如果是元素， 需要解析指令
      if (node.nodeType === 3) Directives.slot(node, this.vm)// 如果是文本节点， 需要解析插值表达式
      if (node.childNodes && node.childNodes.length > 0) this.compile(node.childNodes)// 如果当前节点还有子节点，需要递归的解析
    })
  }

  // 解析html标签
  compileElement(node) {
    // 1. 获取到当前节点下所有的属性
    let attributes = node.attributes
    Util.toArray(attributes).forEach(attr => {
      // 2. 解析page的指令（所以以v-开头的属性）
      let attrName = attr.name;
      let expr = attr.value;
      if (attrName.startsWith("v-")) {
        let type = attrName.slice(2)
        if (type.split(":")[0] === "on") {
          Directives.on(node, this.vm, type, expr)
        } else if (type.split(":")[0] === "one") {
          Directives.one(node, this.vm, type, expr)
        } else {
          Directives[type] && Directives[type](node, this.vm, expr)
        }
      } else {
      }
    })
  }
}
/**
 * observer用于给data中所有的数据添加getter和setter 方便我们在获取或者设置data中数据的时候，实现我们的逻辑
 */
class Observer {
  constructor(data) {
    this.data = data
    this.watchers = []
    this.walk(data)
  }
  /* 核心方法 */
  /* 遍历data中所有的数据，都添加上getter和setter */
  walk(data) {
    if (!data || typeof data != "object") {
      return
    }
    Object.keys(data).forEach(key => {
      // 给data对象的key设置getter和setter
      this.defineReactive(data, key, data[key])
      // 如果data[key]是一个复杂的类型，递归的walk
      this.walk(data[key])
    })
  }
  // 定义响应式的数据（数据劫持）
  // data中的每一个数据都应该维护一个dep对象
  // dep保存了所有的订阅了该数据的订阅者
  defineReactive(obj, key, value) {
    let _this = this
    let dep = new Watcher();
    this.watchers.push(dep);// 管理员集合
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 如果Dep.target中有watcher对象，存储到订阅者数组中
        Watcher.target && dep.addSub(Watcher._uuid, Watcher.target)
        return value
      },
      set(newValue) {
        if (value === newValue) {
          return
        }
        value = newValue
        // 如果newValue是一个对象，也应该对她进行劫持
        _this.walk(newValue)
        // 发布通知，让所有的订阅者更新内容
        dep.notify()
      }
    })
  }
}
/**
 * 订阅者，订阅数据
 */
class Subscriber {
  // vm: 当前的page实例
  // expr: data中数据的名字
  // 一旦数据发生了改变，需要调用cb
  constructor(node, vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // this表示的就是新创建的watcher对象
    // 存储到Dep.target属性上
    node._uuid = Util.getUuid();// 加上订阅id
    Watcher._uuid = node._uuid
    Watcher.target = this
    // 需要把expr的旧值给存储起来
    this.oldValue = Util.getVMValue(vm, expr)
    // 清空Dep.target
    Watcher.target = Watcher._uuid = null;
  }
  // 对外暴漏的一个方法，这个方法用于更新页面
  update() {
    // 对比expr是否发生了改变，如果发生了改变，需要调用cb
    let oldValue = this.oldValue
    let newValue = Util.getVMValue(this.vm, this.expr)
    if (oldValue != newValue) {
      this.cb(newValue, oldValue)
    }
  }
}
/**
 * 管理订阅者的管理员
 */
class Watcher {
  constructor() {
    // 用于管理订阅者
    this.subs = new Map();
  }
  // 添加订阅者
  addSub(_uuid, watcher) {
    return this.subs.set(_uuid, watcher)
  }
  // 删除订阅者
  deleSub(_uuid) {
    return this.subs.delete(_uuid)
  }
  // 通知
  notify() {
    // 遍历所有的订阅者，调用watcher的update方法
    this.subs.forEach(sub => sub.update())
  }
}
let Directives = {
  slot(node, vm) {
    let oldtxt = node.textContent;
    let txt = oldtxt;
    if (txt) {
      let reg = /\{\{(.+?)\}\}/g
      let val;
      while (val = reg.exec(txt)) {
        let expr = val[1];
        let reg1 = new RegExp(val[0].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "g");
        node.textContent = txt = txt.replace(reg1, Util.getVMValue(vm, expr));
        // 创建数据订阅者,将会被存在
        new Subscriber(node, vm, expr, newValue => node.textContent = oldtxt.replace(reg1, newValue))
      }
    }
  },
  // 处理v-text指令
  text(node, vm, expr) {
    node.textContent = Util.getVMValue(vm, expr)
    // 创建数据订阅者
    new Subscriber(node, vm, expr, (newValue, oldValue) => node.textContent = newValue)
  },
  html(node, vm, expr) {
    node.innerHTML = Util.getVMValue(vm, expr);
    // 创建数据订阅者
    new Subscriber(node, vm, expr, newValue => {
      node.innerHTML = newValue
    })
  },
  model(node, vm, expr) {
    node.value = Util.getVMValue(vm, expr)
    // 实现双向的数据绑定， 给node注册input事件，当当前元素的value值发生改变，修改对应的数据
    $(node).on("input", function () {
      Util.setVMValue(vm, expr, this.value)
    })
    // 创建数据订阅者
    new Subscriber(node, vm, expr, newValue => node.value = newValue)
  },
  on(node, vm, type, expr) {
    // 给当前元素注册事件即可
    let eventType = type.split(":")[1]
    let fn = vm.$methods && vm.$methods[expr]
    if (eventType && fn) {
      $(node).on(eventType, fn.bind(vm))
    }
  },
  one(node, vm, type, expr) {
    // 给当前元素注册事件即可
    let eventType = type.split(":")[1]
    let fn = vm.$methods && vm.$methods[expr]
    if (eventType && fn) {
      $(node).one(eventType, fn.bind(vm))
    }
  },
  bind(node, vm, type, expr) {

  }
}
let Util = {
  // 这个方法用于获取VM中的数据
  getVMValue(vm, expr) {
    return eval('vm.$data.' + expr)
  },
  // 这个方法用于设置VM中的数据
  setVMValue(vm, expr, value) {
    eval(`vm.$data.${expr}=${JSON.stringify(value)}`)
  },
  /* 工具方法 */
  toArray(likeArray) {
    return [].slice.call(likeArray)
  },
  getUuid(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  }
}