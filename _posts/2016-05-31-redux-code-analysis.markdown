---
layout: post
title: "redux原理解读-关键代码分析(一)"
categories: jekyll post
date: 2016-05-31 08:39:32 中国标准时间
---

redux代码量不多，但是思路非常清晰，大概浏览了一遍，感叹它的结构设计巧妙。本文按照创建store，监听store改变，分配anction的流程，对redux的内部机制做一个简单的分析。

### store

#### createStore

```js
export default function createStore(reducer, initialState, enhancer) {
  //*注：下面这种小圆点注释表示前后有省略的代码
  //...
  var currentReducer = reducer
  var currentState = initialState
  var currentListeners = []
  var nextListeners = currentListeners
  var isDispatching = false
  //...
  dispatch({ type: ActionTypes.INIT });
  //...
}
```

创建store时，传入参数中的recuder函数和initialState初始状态保存在createStore函数内部的两个变量中。
在createStore返回之前，会分配一个INIT初始化action，用来生成默认的store。

对于使用了middleware的情况，会单独放到后面来讲。

#### dispatch

接下来看看dispath函数，弄清当dispatch分配一个action时，redux内部是怎样来让store发生改变的。

```js
function dispatch(action) {
  //...
  try {
    isDispatching = true
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }
  //...
  var listeners = currentListeners = nextListeners
  for (var i = 0; i < listeners.length; i++) {
    listeners[i]()
  }

  return action
}
```

可以看到，dispatch函数做了两件事情：

1. 先调用当前的reducer函数，传入当前的state和action作为参数，生成新的state。
2. state更新后，依次调用已经注册的listeners。

#### subscribe

```js
function subscribe(listener) {
  //...
  nextListeners.push(listener)

  return function unsubscribe() {
    //...
    var index = nextListeners.indexOf(listener)
    nextListeners.splice(index, 1)
  }
}
```

用subscribe注册监听函数时，将传入的监听函数添加到nextListeners数组，并返回一个取消监听的函数。

#### 一个完整的例子

参考redux的[Counter][1]实例

#### 总结

在一个简单的应用中，首先定义好reducer函数，用reducer创建store，然后将监听store变化的方法通过store.subscribe注册到的listeners数组。

当在view中做一些交互操作时，可以通过store.dispatch分派一个action时，redux会调用reducer函数来更新store，然后依次调用listeners数组中的监听函数，这些监听函数又来更新视图。

这样就实现了一个

>VIEW -- interaction --> ACTION -- dispatch --> STORE -- subscribe --> LISTENER -- update --> VIEW

的redux数据流。

[1]: https://github.com/reactjs/redux/tree/master/examples/counter
