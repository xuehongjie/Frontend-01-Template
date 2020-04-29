# 每周总结

## Grammar 语法
- `+ -`
- `* /`
- `()`

## Expressions

- Member 成员访问
  - a.b
  - a['b']
  - foo\`string\`
  - super.b
  - super['b']
  - new.target：通过new运算符创建对象时为创建的对象，只能在函数中使用，`function foo() {console.log(new.target);}`
  - new Foo()：带括号的优先级更高
    ```
    function cls1(s) { console.log(s); }
    function cls2(s) {
      console.log('2', s);
      return cls1
    }

    new new cls2('good'); // 2 good undefined
    ```

- Reference：类似于指针
  - Object
  - Key
  ```
  // Reference的实现方法类似如下
  class Reference {
    constructor(object, property) {
      this.object = object;
      this.property = property;
    }
  }
  ```

- Call：函数调用
  - foo()
  - super()
  - foo()['b']
  - foo().b
  ```
  class foo {
    constructor() {
      this.b = 1;
    }
  }

  new foo()['b']; // 1
  foo['b'] = functio() {}; // f (){}
  new foo['b']; // foo.b{}
  new (foo['b']); // foo.b{}
  ```
- Left Handside & Right Handside：如，`a.b = c`

> 只要有函数调用，Member Expreesion 的优先级会降到比 new 更低

- Update
  - a++
  - a--
  - --a
  - ++a

```
a
++
b
// b会自增
```

- Unary 单步运算符
  - `delete a.b`
  - `void foo()`
  - `typeof a`
  - `+a`
  - `-a`
  - `~a`：位运算
  - `!a`
  - `await a`
- Exponental
  - `**`，唯一一个右结合的操作符
- Multiplicative
  - `* / %`
- Additive
  - `+ -`
- Shift：移位
  - `<< >> >>>`
- Relationship：比较
  - `< > <= >= instanceof in`
- Equality
  - `==`
  - `!=`
  - `===`
  - `!==`
- Bitwise：位运算
  - `& ^ |`
- Logical：逻辑运算，可以当 if 来使用
  - `&&`
  - `||`
- Conditional
  - `? :`，三目运算符

## Boxing & Unboxing 装箱和拆箱

### Boxing
- Number()
- String()
- Boolean()

### Unboxing
- `1 + {}`
- `1 + {valueOf() {return 2}}`
- `1 + {valueOf() {return 1}, toString() {return '2'}}  // 2`
- `'1' + {valueOf() {return 1}, toString() {return '2'}}  // 11`
- `1 + {[Symbol.toPrimitive()](){return 6}, valueOf() {return 1}}  // 7`

> 默认有个空的 `Symbol.toPrimitive`，如果自定义了`Symbol.toPrimitive` 则只调这个。如果没有，则先判断类型。数字类型相加时，会先调用 `valueOf`；如果是字符串相加，会先调用 `toString`

## Runtime
### Completion Record：完成的记录
- [[type]]：normal, break, continue, return, or throw
- [[value]]：Types
- [[target]]：label

简单语句
- ExpressionStatement：表达式语句，a = 1 + 2;
- EmptyStatement：空语句，分号;
- DebuggerStatement：debugger
- ThrowStatement：throw a
- ContinueStatemeng：continue label
- BreakStatement：break label
- ReturnStatement：return 1 + 2

复合语句
- BlockStatement：{   }，块级内顺序执行，`[[type]]`为normal
- iteration
  - while() {}
  - do{} while()
  - for(初始值; 是否继续的条件; 循环一次后的操作)
  - for( in )
  - for( of )
  - for await( of )
- LabelledStatement
- IterationStatement

**如何产生一个throw**
- throw a
- null.a

> 运行时错误可以产生throw

### Lexical Environment


