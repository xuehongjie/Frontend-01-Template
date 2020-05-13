# 学习总结

## 结构化

### 宏任务/微任务

- 宏任务(setTimeout)，一个代码片段就是一个宏任务
- 微任务(Promise、MutationObserver)，微任务先于宏任务执行

```
new Promise(resolve => resolve()).then(() => console.log('cool')), (1 + 1); // cool 2
```

### Realm

- JS Context => Realm
- 宏任务
- 微任务
- 函数调用(Execution Context)
- 语句/声明
- 表达式
- 直接量/变量/this

### Lexical Environment

- this
- new.target
- super
- 变量
