---
layout: post
title: "redux源码分析-重要概念解读"
categories: jekyll post
date: 2016-05-31 08:39:32 +0800
---

### store

#### createStore

```javascript
export default function createStore(reducer, initialState, enhancer) {
    //...
    var currentReducer = reducer
    var currentState = initialState
    //...
}
```

continue...