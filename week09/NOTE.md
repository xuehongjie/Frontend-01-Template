# 总结

## 重学 CSS

### 动画

#### Animation

- @keyframes 定义
- animation: 使用
  - animation-name 时间曲线
  - animation-duration 动画时长
  - animation-timing-function 动画的时间曲线
  - animation-delay 动画开始前的延迟
  - animation-iteration-count 动画的播放次数
  - animation-direction 动画的方向

```
@keyframes ani {
  from {
    background: red;
  }
  to {
    background: yellow;
  }
}

div {
  animation: ani 5s infinite;
}
```

#### transition

- transition-property 要变换的属性
- transition-duration 变换的时长
- transition-timing-function 时间曲线
  - ease 推荐使用
  - linear 不建议使用
  - ease-in 适合退出的时候
  - ease-out
  - ease-in-out
- transition-delay 延迟

#### cubuc-bezier

### 绘制

#### 形状

- border
- box-shadow
- border-radius

## 重学 HTML

### HTML 的定义

XML 与 SGML

```
<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->       双引号
<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->        &符号
<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->   小于号
<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->    大于号
```

### HTML 标签-语义

### 合法元素

- Element: `<tagname></tagname>`
- Text: text
- Comment: <!-- comments -->
- DocumentType: `<!Doctype html>`
- ProcessingInstruction: `<?a 1?>`
- CDATA: `<![CDATA[]]>`

### 字符引用

- `&#161;`
- `&amp;`
- `&lt;`
- `&quot;`

## 重学 DOM

### 导航类操作

- 节点
  - `parentNode`: 元素的父节点
  - `childNodes`: 元素的所有子节点
  - `firstChild`: 元素的第一个子节点
  - `lastChild`: 元素的最后一个子节点
  - `nextSibling`: 元素相邻的下一个节点
  - `previousSibling`: 元素相邻的上一个节点
- 元素
  - `parentElement`
  - `children`
  - `nextElementSibling`
  - `previousElementSibling`
  - `firstElementChild`
  - `lastElementChild`

### 修改操作

- `appendChild`: 添加到子元素的最后一位
- `insertBefore`: 添加到元素的某个子元素之前
- `removeChild`: 移除子节点
- `replaceChild`: 替换子节点

> 每个元素只有一个父节点，一个元素被 append 到另一个元素时，默认会先移除原本的元素，并插入到新的位置

### 高级操作

- compareDocumentPosition: 用于比较两个节点中关系的函数
- contains: 检查一个节点是否包含另一个节点的函数
- isEqualNode: 检查两个节点是否完全相同
- isSameNode: 检查两个节点是否是同一个节点，实际上在 JavaScript 中可以用'==='
- cloneNode: 复制一个节点，如果传入参数 true，则会连着子元素一起拷贝

### DOM 事件

先捕获再冒泡
