---
layout: post
title: "redux源码分析-重要概念解读"
category: jekyll post
date: 2016-05-31 16:39:32 中国标准时间
---

### store

#### createStore

```javascript
export default function createStore(reducer, initialState, enhancer) {
    ...
    var currentReducer = reducer
    var currentState = initialState
```