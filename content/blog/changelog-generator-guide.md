---
title: "用 Changelog Generator Skill 自动生成发布日志"
date: "2026-01-11"
description: "从 Git 提交记录生成结构化发布说明的最短路径。"
---

如果你发布频繁，写 Release Notes 是最耗时间的工作之一。Changelog Generator Skill 可以根据提交记录自动输出结构化的发布说明。

## 适用场景

- 产品每周/每月发布
- 开源项目版本迭代
- 内部系统更新公告

## 使用流程

### Step 1：复制 Skill 指令

在 AllSkills.cn 找到 Changelog Generator 详情页复制完整指令。

### Step 2：准备输入素材

你可以提供：

- 最近一段时间的 git log
- 合并请求标题列表
- Issue 列表与标签

示例输入：

```
以下是最近 2 周的 git 提交记录，请生成发布日志：
- feat: add export button for reports
- fix: handle null values in dashboard
- chore: update dependencies
- feat: support en locale
```

### Step 3：要求输出格式

你可以要求：

- 标准版本格式（Added / Changed / Fixed）
- 面向用户的友好语气
- 包含风险提示与回滚建议

## 输出模板建议

```
## Highlights
- ...

## Added
- ...

## Changed
- ...

## Fixed
- ...
```

## 总结

Changelog Generator 特别适合有固定发布节奏的团队，让 Release Notes 可重复、可标准化。
