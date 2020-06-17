# 重学 DOM

## Range API

```
var range = new Range()
range.setStart(element, 9)
range.setEnd(element, 4)

var range = document.getSelection().getRangeAt(0)

var fragment = range.extractContents()
range.insertNode(document.createTextNode('aaaa'))
```

## CSSOM

### Rule

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule('p {color: pink;}', 0); // 要插入的样式，插入的位置
- document.styleSheets[0].removeRule(0); // 移除某个位置的样式

- CSSStyleRule

### getComputedStyle

- window.getComputedStyle(elt, pseudoElt)
  - elt：想要获取的元素
  - pseudoElt：可选，伪元素

**data uri 构成 **

```
data:协议;base64,转义后的内容

data:text/css;base64,p%7Bcolor:blue%7D
data:text/css,p%7Bcolor:blue%7D
注：base64可加可不加，使用的话后面的内容需要转成base64
```

### getClientRects

获取元素尺寸，inline 元素会获取到多个盒，不包含伪元素

### getBoundingClientRect

获取元素尺寸
