# 组件化

## Component

### 对象与组件
- 对象
  - Properties
  - Methods
  - Inherit
- 组件
  - Properties
  - Methods
  - Inherit
  - Attribute
  - Config & State
  - Event
  - Lifecycle
  - Children

### Attribute & Property

- Attribute 强调描述性
  ```
  <my-component attribute="v"/>
  myComponent.setAttribute('a', 'v')
  ```
- Property 强调从属关系

### 如何设计组件状态

| Markup set | JS set | JS Change | User Input Change |           |
| ---------- | ------ | --------- | ----------------- | --------- |
| ×          | √      | √         | ?                 | property  |
| √          | √      | √         | ?                 | attribute |
| ×          | √      | ×         | √                 | state     |
| ×          | √      | ×         | ×                 | config    |

### Lifecycy 生命周期
