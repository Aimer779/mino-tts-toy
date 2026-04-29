---
name: archive
description: "阶段完成、暂停或放弃时，把 spec 和 handoff 复制到 archive/ 目录，防止误删。规范化归档流程，确保历史可追溯。"
when_to_use: "阶段完成, 归档, 暂停任务, 放弃任务, 里程碑, archive, save progress, wrap up phase"
---

# Archive: 复制归档

阶段完成、暂停或放弃时，把当前 spec.md 和 handoff.md 复制到 archive/ 目录，改名保存。不重新组织内容，直接复制。

## 触发条件

- 阶段目标全部完成（`completed`）
- 任务暂停，后续会继续（`paused`）
- 任务放弃，不再继续（`abandoned`）
- 关键里程碑达成（`milestone`，如上线、发布）
- 用户说"归档"、"保存进度"、"这个阶段结束"

## 命名格式

`{日期}-{类型}-{行为}-{描述}.md`

| 字段 | 规则 | 示例 |
|------|------|------|
| 日期 | `YYYY-MM-DD`，归档当天日期 | `2024-04-29` |
| 类型 | `spec` 或 `handoff` | `spec` |
| 行为 | `completed` / `paused` / `abandoned` / `milestone` | `completed` |
| 描述 | 短横线连接，3-5 个关键词 | `homepage-pagination` |

完整示例：
- `2024-04-29-spec-completed-homepage-pagination.md`
- `2024-04-29-handoff-completed-homepage-pagination.md`

## 归档流程

1. 确定行为类型：`completed` / `paused` / `abandoned` / `milestone`
2. 确定描述：3-5 个关键词概括阶段内容
3. 生成文件名
4. 复制文件
5. 更新索引
6. 清空 spec.md

## 归档操作

### 复制 spec

```bash
cp harness/spec.md harness/archive/spec/{日期}-spec-{行为}-{描述}.md
```

### 复制 handoff

```bash
cp harness/handoff.md harness/archive/handoff/{日期}-handoff-{行为}-{描述}.md
```

### 更新索引

```bash
echo "- {日期} | spec-{行为}-{描述} | archive/spec/{日期}-spec-{行为}-{描述}.md" >> harness/archive/index.md
echo "- {日期} | handoff-{行为}-{描述} | archive/handoff/{日期}-handoff-{行为}-{描述}.md" >> harness/archive/index.md
```

### 清空 spec

```bash
echo "" > harness/spec.md
```

## 输出格式

归档完成后，输出确认：

```
## 归档完成

- spec → archive/spec/2024-04-29-spec-completed-homepage-pagination.md
- handoff → archive/handoff/2024-04-29-handoff-completed-homepage-pagination.md
- 索引已更新
- spec.md 已清空
```

## 规则

| 场景 | 做法 |
|------|------|
| 只归档 spec | handoff 不复制，只复制 spec |
| 只归档 handoff | spec 不复制，只复制 handoff |
| 两者都归档 | 都复制，用相同的日期、行为、描述 |
| 描述不确定 | 问用户："这个阶段叫什么？" |

## 禁止

- 不要重新写归档内容，直接复制
- 不要跳过 index.md 更新
- 不要忘记清空 spec.md
- 文件名不要用中文（保持可排序性）
- 不要跳过归档直接清空 spec

## 后续动作

归档完成后：
- 开始新阶段 → 进入 `intent-align` 或 `spec-write`
- 会话结束 → 进入 `handoff-write`
