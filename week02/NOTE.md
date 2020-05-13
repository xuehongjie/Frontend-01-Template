# 学习总结

## 编程语言通识

### 按语法分类

- 非形式语言
  - 中文
- 形式语言(乔姆斯基谱系)

  - 0 型: 无限制文法，等号左边不止一个
    ```
    ? ::= ?
    <a><b> ::= "c"
    ```
  - 1 型: 上下文相关文法
    ```
    ?<A>? ::= ?<B>?
    "a"<b>"c"::="a""x""c"
    ```
  - 2 型: 上下文无关文法，如 js，大部分情况是上下文无关
    ```
    <A> ::= ?
    ```
  - 3 型: 正则文法，限制表达能力

    ```
    <A> ::= <A>?

    ```

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

// 乘法
<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>

// 加法
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
- 强类型弱类型，有隐式转换的都是弱类型
  - String + Number，隐式转换
  - String == Boolean
- 复合类型
  - 结构体，如对象
  - 函数签名，参数列表 + 返回值
- 子类型
  - 逆变/协变，继承

## JavaScript 词法/类型

### Atom

> LF：U+0010，换行；SPACE：U+0020，空格

- InputElement
  - WhiteSpace 空格
    - `<TAB>` 制表符，`\t` `\u0009`
    - `<VT>` 纵向制表符，`\v`
    - `<SP>` 空格，`\u0020`
    - `<NBSP>` NO-BREAK SPACE，`\u00A0`，有粘合性，在文本中换行时会粘连起来一起换行
    - `<ZWNBSP>` ZERO WIDTH NO-BREAK SPACE，`\uFEFF`
    - `<USP>`
  - LineTerminator 换行
    - `<LF>` 换行 LINEFEED `U+000A`
    - `<CR>` 回车 CARRIAGE RETURN `U+000D`
  - Comment 注释
  - Token
    - Punctuator：符号，如 `< > = }`
    - IdentifierName：标识符
      - Keywords：关键字，如 `for`、`class`
      - Identifier：变量名
      - Future reserved Keywords：预留的关键字，目前剩余一个 `enum`
    - Literal 直接量
      - Number
        - BinaryIntegerLiteral：二进制，`0b10` // 2
        - OctalIntegerLiteral：八进制，`0o10` // 8
        - DecimalLiteral：十进制，`10` // 10
        - HexIntegerLiteral：十六进制，`0x10` // 16
      - String
        - Character   // a
        - Code Point  // 97
        - Encoding    // 01100001
        - 需要通过 \ 转义：`' " \ b f n r t v`
      - Boolean
      - Object
      - Null
      - Undefined
      - Symbol

```
// 差值小于Number.EPSILON即可认为相等
Math.abs(0.1+0.2-0.3)<=Number.EPSILON

// 不加空格会把97.当成小数处理
97 .toString(2); // 0110 0001
```
