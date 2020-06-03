# 重学 CSS

## 选择器

### 选择器语法

- 简单选择器
  - `*`(universal selector)
  - `div svg|a`
  - `.cls`
  - `#id`
  - `[attr=value]`
  - `:hover`
  - `::before`
- 复合选择器
  - <简单选择器><简单选择器><简单选择器>
  - - 或者 div 必须写在最前面，伪类写在最后面
- 复杂选择器

  - <复合选择器><sp><复合选择器>
  - <复合选择器>">"<复合选择器>
  - <复合选择器>"~"<复合选择器>
  - <复合选择器>"+"<复合选择器>
  - <复合选择器>"||"<复合选择器> (用得少)

  ### 选择器优先级

  写出下列选择器的优先级

  ```
  [行内，id，class，标签]
  div#a.b .c[id=x]  // 0131, 属性选择器 == class 选择器
  #a:not(#b)        // 0200, :not()不改变优先级
  *.a               // 0010, *不改变优先级
  div.a             // 0011
  ```

  >

### 伪类

- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child
  - :first-child :last-child :only-child(会回溯)
- 逻辑型
  - :not 伪类
  - :where :has

### 伪元素

- ::before
- ::after
- ::first-line
- ::first-letter

#### first-line 的可用属性

- font 系列
- color 系列
- background 系列
- word-spacing
- letter-spacing
- text-decoration
- text-transform
- line-height

#### first-letter 的可用属性

- font 系列
- color 系列
- background 系列
- word-spacing
- letter-spacing
- text-decoration
- text-transform
- line-height
- float
- vertical-align
- 盒模型系列: margin、padding、border

#### 思考

**1. 为什么 first-letter 可以设置 float 之类的样式，而 first-line 不行**
如果设置了 float 会脱离文档流，会产生新的 first-line，新的 first-line 又会命中 float 样式，会出现循环

**2. 为什么 first-line 可以设置 font 等相关的样式**
浏览器是先进行文字的排版，再确定哪个是第一行的

## 排版

### 盒

| 源代码 | 语义    | 表现 |
| ------ | ------- | ---- |
| 标签   | 元素    | 盒   |
| Tag    | Element | Box  |

- HTML 代码中可以书写开始标签、结束标签和自封闭标签
- 一对起止标签，表示一个元素
- DOM 树种存储的是元素和其他类型的节点(Node)
- CSS 选择器选择的是元素
- CSS 选择器选择的元素，在排版时可能产生多个盒
- 排版和渲染的基本单位是盒

### 盒模型

- box-sizing
  - content-box: 宽度 = width
  - border-box: 宽度 = width + padding + border

### 正常流

正常流排版

- 收集盒进行
- 计算盒在行中的排布
- 计算行的排布

#### 对齐方式

基线：没有文字就是盒的下边缘

1. Vertical-align: baseline，是拿自己的 baseline 去对其行的 baseline
2. Vertical-align: top，middle，bottom，是拿自己的 ”顶部“ “中线” ”底部“ 去对其行的 ”顶部“ “中线” ”底部“
3. vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线

#### float 与 clear

#### margin 折叠

如何创建 BFC:

- overflow 不为 visible
- display 为 inline-block / table
- float 不为 none
- position 为 absolute / fixed

#### overflow: visible 与 BFC

- block-level 表示可以被放入 BFC
- block-container 表示可以容纳 BFC
- block-box = block-level + block-container
- block-box 如果 overflow 是 visible, 那么就跟父 BFC 合并

#### Flex排版

- 收集盒进行
- 计算盒在主轴方向的排布
- 计算盒在交叉轴方向的排布
