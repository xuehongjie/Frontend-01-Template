# 总结

## 浏览器工作原理

### 排版

#### 1. 理解主轴和交叉轴

- `flex-direction: row`
  - 主轴(Main)：width x left right
  - 交叉轴(Cross)：height y top bottom
- `flex-direction: column`
  - 主轴(Main)：height y top bottom
  - 交叉轴(Cross)：width x left right

#### 2. 收集元素进行

分行

- 根据主轴尺寸，把元素分进行
- 若设置了 `no-wrap`，则强行分配进第一行

#### 3. 计算主轴

计算主轴方向

- 找出所有 flex 元素
- 把主轴方向的剩余尺寸按比例分配
- 若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余元素

#### 4. 计算交叉轴

计算交叉轴方向

- 根据每一行中最大元素尺寸计算行高
- 根据行高 `flex-align` 和 `item-align`，确定元素的具体位置

### 绘制

#### 1. 绘制单个元素

绘制 `background-color` 、`border` 、`background-image` 等

#### 2. 绘制 DOM

递归调用子元素的绘制方法完成 DOM 树的绘制

## CSS

### CSS 总体结构

- `@charset`
- `@import`
- `rules`
  - `@media`
  - `@page`
  - `rule`

### CSS@规则的研究

- `@charset`
- `@import`
- `@media`
- `@page`
- `@counter-style`
- `@keyframes`
- `@fontface`
- `@supports`
- `@namespace`

### CSS 规则

- Selector
- Key
- Value
