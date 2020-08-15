# 工具链

```
//yc here
var y = g =>
    (f=>f(f))(
        self =>
            g( (...args)=>self(self)(...args) )
    )

//use yc
var f = y(self =>
    n => n < 0 ? 0 : n + self(n-1))

f(100); // 5050
```

### 关联 generator

1. 安装 yo， `npm i yo -g`
2. 创建 generator 目录
   ```
   mkdir generator-jay
   cd generator-jay
   npm init -y   // package.json中的 name 为 generator-xx 这命名方式
   npm install yeoman-generator
   npm link   // 关联至全局的node_modules上
   ```
3. 创建使用 generator 的目录
   ```
   cd ..
   mkdir jay-app
   cd jay-app
   yo jay   // 这里的 jay 是 generator-xx 里的 xx
   ```
