# 学习总结

## 编程语言通识

### 按语法分类

- 非形式语言
  - 中文
- 形式语言
  - 0 型: 无限制文法
    - 等号左边不止一个 `<a><b> ::= "c"`
  - 1 型: 上下文相关文法
    - `"a"<b>"c"::="a""x""c"`
  - 2 型: 上下文无关文法
    - js, 大部分情况是上下文无关
  - 3 型: 正则文法
    - 限制表达能力

#### 产生式 BNF

- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称为终结符
  - 符合结构称为非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- `*` 表示重复多次
- `|` 表示或
- `+` 表示至少一次

练习:

```

<Program>: = ("a"+ | <Program> "b"+)+


整数连加
<Number>: "0" | "1" ... "9"
<Deciamal>: "0" | (("1" ~ "9") <Number>+)
<Expression>: <Deciamal> ("+" <Deciamal>)+
<Expression>: Deciamal | (<Expression> "+" <Deciamal>)

四则运算
<PrimaryExpression> = <DecimalNumber> |
"(" <LogicalExpression> ")"


<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>


<AdditiveExpression> = <MultiplicativeExpression> |
<AdditiveExpression> "+" <MultiplicativeExpression>|
<AdditiveExpression> "-" <MultiplicativeExpression>

逻辑判断
<LogicalExpression> = <AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>

```

终结符, 如: "+"
非终结符: 如: <LogicalExpression>

### 图灵完备性

- 命令式 -- 图灵机
  - goto
  - if while
- 声明式 -- lambda
  - 递归
  - 分治

### 类型系统

- 动态静态
- 强类型弱类型
- 复合类型
- 子类型
  - 逆变/协变

## JavaScript 词法/类型

### atom

> LF：U+0010，换行；SPACE：U+0020，空格

- WhiteSpace

  - <TAB> 制表符，`\t` `\u0009`
  - <VT> 纵向制表符，`\v`
  - <SP> 空格，`\u0020`
  - <NBSP> NO-BREAK SPACE，`\u00A0`，有粘合性，在文本中换行时会粘连起来一起换行
  - <ZWNBSP> ZERO WIDTH NO-BREAK SPACE，`\uFEFF`
  - <USP>

- InputElement
  - WhiteSpace 空格
  - LineTerminator 换行
  - Comment 注释
  - Token
    - Punctuator：符号，如 `< > = }`
    - IdentifierName：标识符
      - Keywords
      - Identifier
      - Future reserved Keywords：预留的关键字，目前剩余一个 `enum`
    - Literal 直接量
      - Number
        - 二进制，`0b10` // 2
        - 八进制，`0o10` // 8
        - 十进制，`10` // 10
        - 十六进制，`0x10` // 16
      - String
      - Boolean
      - Object
      - Null
      - Undefined
      - Symbol

```
// 差值小于Number.EPSILON即可认为相等
Math.abs(0.1+0.2-0.3)<=Number.EPSILON

97 .toString(2); // 0110 0001
```
