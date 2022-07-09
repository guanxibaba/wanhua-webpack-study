const { SyncWaterfallHook, SyncHook, SyncBailHook, SyncLoopHook, AsyncSeriesHook, AsyncParallelHook } = require("tapable");

class MyPlugin {
  constructor() {
    this.hooks = {
      // syncWaterfall 如果注册的第一次事件有返回值，则第二次注册的事件的第一个参数是上一次返回的值
      // syncHook: new SyncWaterfallHook(["name", "age"])

      // bail 如果有返回值，后续的事件不会被执行
      // syncHook: new SyncBailHook(["name", "age"])

      // 在某个时间监听的函数中, 如果返回值为true, 那么这个回调函数就会循环执行.(返回undefined, 就停止执行)
      // syncHook: new SyncLoopHook(["name", "age"])

      // series: 在一个hook中, 监听了多次事件(多个回调函数), 这多个回调函数是串行执行
      // 也就是会等待前一个执行完才会执行下一个
      // asyncHook: new AsyncSeriesHook(["name", "age"]),

      // parallel: 在一个hook中, 监听了多次事件(多个回调函数), 这两个回调函数是并行执行
      asyncHook: new AsyncParallelHook(["name", "age"]),
    }

    // this.hooks.syncHook.tap("注册的第一个事件", (name, age) => {
    //   console.log("注册的第一个事件", name, age);
    //   return '1';
    // })

    // this.hooks.syncHook.tap("注册的第二个事件", (name, age) => {
    //   console.log("注册的第二个事件", name, age);
    // })

    this.hooks.asyncHook.tapAsync("异步事件1", (name, age, callback) => {
      setTimeout(() => {
        console.log("异步事件1", name, age);
        callback();
      }, 2000)
    })

    this.hooks.asyncHook.tapAsync("异步事件", (name, age, callback) => {
      setTimeout(() => {
        console.log("异步事件2", name, age);
        callback();
      }, 2000)
    })
  }

  emit() {
    // this.hooks.syncHook.call("hwh", 18);

    this.hooks.asyncHook.callAsync("hwh", 18, () => {
      console.log("异步事件回调");
    })
  }
}

const myPlugin = new MyPlugin();
myPlugin.emit();