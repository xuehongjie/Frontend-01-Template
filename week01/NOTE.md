# 学习总结

## 学习方法

### 整理法

- 顺序关系
- 组合关系
- 维度关系
- 分类关系

### 追溯法

- 源头
  - 最早出现的论文、杂志
  - 最初的实现案例
- 标准和文档
  - w3.org
  - developer.mozilla.org
  - msdn.microsoft.com
  - developer.apple.com

## 面试

### 评判面试题的好坏

- 区分度
- 覆盖面
- 深度

### 面试中会遇到的问题

- 打断
  - 打断意味着不感兴趣
- 争论
  - 争论与压力面试
  - 争论的技巧
- 难题
  - 展现分析过程
  - 缩小规模

## 构建知识体系

### ECMA

[所有实体](https://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent)

### 标签

```
let tmp = $0.querySelectorAll('code');
[...new Set([...tmp].map(item => item.innerText))].join('\n'); // 列出所有标签
```

### W3C 标准的状态

- Candidate Recommendation：候选
- Group Note
- Proposed Edited Recommendation
- Proposed Recommendation：第二个状态，建议推荐
- Recommendation：REC，正式的标准
- Retired：已退休的标准
- Working Draft：WD，最初的状态，草稿

## 优秀的工程师

- 领域知识，掌握的知识要串联起来
- 能力
  - 编程能力，能否解决问题的能力
  - 架构能力，解决多大规模的问题
  - 工程能力，解决多少人一起协作的问题
- 潜力
- 职业规划，决定自己的成长历程
- 成就，项目中的成果，能够展示自己能力的
  - 业务型成就
  - 工程型成就

### 业务型成就

- 业务目标
  - 理解公司业务的核心目标
  - 目标转化为指标
- 技术方案
  - 业务指标到技术指标的转化
  - 形成纸面方案、完成小规模试验
- 实施方案
  - 确定实施目标、参与人
  - 管理实施进度
- 结果评估
  - 数据采集、数据报表
  - 向上级汇报

### 工程型成就

- 目标，质量、效率
- 方案与实施
  - 规章制度
  - 代码库
  - 工具
  - 系统
- 结果，线上监控

## 数据驱动的思考方式

- 目标：分析业务目标，定数据指标
- 现状：采集数据，建立数据展示系统
- 方案：设计技术方案，预估数据
- 实施：小规模实验，推广全公司落地，形成制度
- 结果：统计最终效果汇报

> 用户活跃度 = 日活 / 月活

## 前端技能模型

- 领域知识
- 前端知识
- 编程能力
- 架构能力
- 工程能力

### 工具链

#### 工具链的作用

将多个工具关联起来

#### 工具的分类

- 脚手架，init
- 本地调试，run
- 单元测试，test
- 发布，publish

#### 工具链体系的设计

### 持续集成

- Check-in build
- Lint + Rule Check

> CICD：持续集成 (Continuous Integration) 和持续部署 (Continuous Deployment) 简称

### 技术架构

解决大量页面需求带来的重复劳动问题

#### 复用

- 库：有复用价值的代码
  - URL
  - AJAX
  - ENV
- 组件：UI 上多次出现的元素
  - 轮播
  - Tab
- 模块：经常被使用的业务区块
  - 登录
