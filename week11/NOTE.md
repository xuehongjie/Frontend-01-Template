# 编程训练

```
// 生成一个长度为10000，每一项都为0的数组
let map = new Array(10001).join(0).split('').map((s) => Number(s));
```

## 搜索算法

- 深度优先搜索
- 广度优先搜索

## 正则

### api

- match

```
'abc'.match(/a(b)c/); // ['ab', 'b'],其中 b 为捕获组(括号)中捕获的值

// 带 g 标志返回与完整正则表达式匹配的所有结果，不会返回捕获组
'abc'.match(/a(b)c/g); // ['ab']

// 匹配 key、value
'[a=value]'.match(/\[([^=]+)=([^\]]+)\]/)
```

- replace

```
'aabcd'.replace(/a(b)c(d)/, function(
  match, // 匹配到的结果
  $1, // 第一个捕获组
  $2, // 第二个捕获组
  index, // 匹配结果的第一个索引
  str, // 原始字符串
) {
  console.log(arguments)
  return str
})
```

- exec
- lastIndex

> `[\s\S]` 匹配所有字符

### 语法

- `()` 捕获
- `(?:)` 不捕获
