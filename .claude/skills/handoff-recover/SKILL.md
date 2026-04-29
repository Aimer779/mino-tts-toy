---
name: handoff-recover
description: "从外部真相源恢复任务状态。读取 spec 和 handoff，复述当前进度和下一步，防止靠'印象续写'。适用于新会话开始、跨天继续、上下文丢失时。"
when_to_use: "恢复任务, 继续上次, 接着做, 上次做到哪了, 新会话, resume task, continue where we left off, what was I doing"
---

# Handoff Recover: 从真相源恢复状态

读取 `harness/spec.md` 和 `harness/handoff.md`，基于外部真相源恢复任务状态。不要靠记忆，不要靠印象，只认文件里写的内容。

## 触发条件

- 新开一个会话继续昨天的工作
- 中断后需要恢复进度
- 上下文被压缩或丢失
- 用户说"接着做"、"上次做到哪了"、"恢复任务"

## 标准流程

1. 读取 `harness/spec.md`（项目规格）
2. 读取 `harness/handoff.md`（上次会话状态）
3. 输出恢复报告，等待用户确认

## 输出格式

```
## 状态恢复

### 当前阶段目标
[从 spec.md 中提取]

### 上次完成
[从 handoff.md 中提取]

### 残留问题
[从 handoff.md 中提取]

### 建议的下一步
[基于 spec 和 handoff 推导]

### 需要读取的文件
- [文件 1]
- [文件 2]

等你确认后，我再继续。
```

## 规则

| 场景 | 做法 |
|------|------|
| spec.md 不存在 | 问用户："没有找到 spec，需要先创建吗？" |
| handoff.md 不存在 | 问用户："没有找到 handoff，这是新任务吗？" |
| spec 和 handoff 内容冲突 | 以 spec 为准（spec 是真相源） |
| 恢复报告和用户记忆不一致 | 以文件为准，不要改文件 |

## 禁止

- 不要靠记忆说"我记得上次是在做..."
- 不要跳过残留问题直接开始新任务
- 不要修改 spec 或 handoff（除非用户要求）

## 后续动作

状态恢复确认后：
- 如果 spec 已明确 → 进入 `check-before-execute`
- 如果需要重新规划 → 进入 `spec-write`
