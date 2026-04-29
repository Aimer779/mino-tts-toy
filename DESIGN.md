# MiMo TTS Studio — Design System

## 1. Visual Theme and Atmosphere

温暖手工编辑器感。像一本精心排版的工具手册 — 暖色纸面、衬线标题、克制的装饰。给团队演示用，需要精致但不冰冷。Notion 的呼吸感 + 印刷品的温度。

## 2. Color Palette and Roles

### Surfaces

| Token | Value | Role |
|-------|-------|------|
| `--bg-canvas` | `#faf7f2` | 页面底色，暖米色 |
| `--bg-surface` | `#ffffff` | 卡片、面板、输入框 |
| `--bg-surface-warm` | `#f7f3ed` | 次级面板、预览区背景 |
| `--bg-code` | `#292524` | 代码预览区，暖黑 |

### Accent

| Token | Value | Role |
|-------|-------|------|
| `--accent` | `#b45309` | 主色，琥珀棕 — 按钮、Tab 选中、进度条 |
| `--accent-hover` | `#92400e` | 悬停态 |
| `--accent-light` | `#fef3c7` | 浅底 — Tag 选中、文件信息栏、上传 hover |
| `--accent-subtle` | `#fde68a` | 边框高亮 |

### Text

| Token | Value | Role |
|-------|-------|------|
| `--text-primary` | `#1c1917` | 标题、正文 |
| `--text-secondary` | `#57534e` | 说明文字、Tab 未选中 |
| `--text-muted` | `#a8a29e` | 占位符、字数统计 |
| `--text-inverse` | `#fafaf9` | 深色按钮上的文字 |

### Borders

| Token | Value | Role |
|-------|-------|------|
| `--border` | `#e7e5e4` | 通用边框 |
| `--border-warm` | `#d6d3d1` | 上传区虚线框 |

### Semantic

| Token | Value | Role |
|-------|-------|------|
| `--success` | `#15803d` | 连接状态圆点 |
| `--success-bg` | `#dcfce7` | 成功底色 |
| `--error` | `#b91c1c` | 错误文字 |
| `--error-bg` | `#fee2e2` | 错误底色 |

## 3. Typography Rules

| 层级 | 字体 | 大小 | 粗细 | 用途 |
|------|------|------|------|------|
| Display | Noto Serif SC | 20px | 600 | 页面标题 h1 |
| Section | Noto Serif SC | 14px | 600 | 分区标题 `.section-title` |
| Body | 系统无衬线 | 14px | 400 | 正文、输入框、按钮 |
| Caption | 系统无衬线 | 12px–13px | 400 | 字数统计、hint、时间码 |
| Code | SF Mono / Menlo | 12px | 400 | 预览代码区 |

- 衬线仅用于标题，正文全部无衬线
- 时间码使用 `font-variant-numeric: tabular-nums` + 等宽字体
- 中文回退栈：PingFang SC → Hiragino Sans GB → Microsoft YaHei

## 4. Component Stylings

### Buttons

| 类型 | 背景 | 文字 | 圆角 | 悬停 |
|------|------|------|------|------|
| `.btn-primary` | `--accent` | `--text-inverse` | `6px` | `--accent-hover` |
| `.btn-secondary` | `--bg-surface-warm` | `--text-secondary` | `6px` | `--border` |
| `.synth-btn` | 同 primary | 同 primary | `10px` | 同 primary |

- 所有按钮 `active: scale(0.97)`

### Tabs

- 未选中：`--text-muted`，无底边
- 选中：`--accent` 文字 + `--accent` 2px 底边
- 容器：`--bg-surface` 背景，顶部圆角 `14px`

### Inputs / Textarea

- 边框 `--border`，圆角 `6px`
- Focus：`--accent` 边框 + `--accent-light` 0 0 0 3px 光晕
- Textarea 行高 1.6

### Audio Player

- 播放按钮：42px 圆形，`--accent` 背景，`active: scale(0.93)`
- 进度条：4px 高，`--border` 底色，`--accent` 填充
- 时间码：等宽 + tabular-nums

### Upload Zone

- 虚线框 `--border-warm`，圆角 `10px`，`--bg-surface-warm` 底色
- Hover / drag-over：`--accent` 边框 + `--accent-light` 底色

### Modal

- 背景遮罩：`rgba(28,25,23,0.4)` + `backdrop-filter: blur(4px)`
- 卡片：`--bg-surface`，圆角 `14px`，`--shadow-lg`
- Footer 顶部分隔线 `--border`

### Preview Panel (Right)

- 面板底色 `--bg-surface-warm`，1px `--border` 边框
- 预览 Tab 切换：圆角 `6px` 容器，选中态 `--accent` 填充
- 代码区：`--bg-code`（暖黑），文字 `#d6d3d1`

## 5. Layout Principles

- 最大宽度 1200px，居中
- 左右面板：左 flex-1，右 380px 固定
- 间距基准：8px 网格（8 / 16 / 24 / 32 / 48）
- 分区间距 24px，分区内部间距 8px
- Header sticky，z-index 100

## 6. Depth and Elevation

不用阴影堆叠，用背景色阶梯 + 微妙阴影：

| 层级 | 表面 | 阴影 |
|------|------|------|
| Canvas | `--bg-canvas` (#faf7f2) | 无 |
| Surface | `--bg-surface` (#fff) | `0 1px 2px rgba(28,25,23,0.06)` |
| Elevated | Modal / 浮层 | `0 4px 16px rgba(28,25,23,0.10)` |
| Code | `--bg-code` (#292524) | 无（自成一体） |

阴影色相统一偏暖（`rgba(28,25,23,...)` 而不是纯黑）。

## 7. Do's and Don'ts

**Do**
- 衬线只用于标题，正文保持无衬线
- 按钮和交互元素保持 `min-height: 36px` 以上
- 时间码和数字用等宽 + tabular-nums
- 所有过渡用 `ease`，时长 0.15s–0.2s

**Don't**
- 不用纯白 `#fff` 做页面底色（太冷）
- 不用 Material 蓝 `#1976d2` 做主色
- 不用 `transition: all`（指定属性）
- 不用 Inter / DM Sans 等 AI 默认字体
- 不用紫色渐变、玻璃拟态、纯黑阴影

## 8. Responsive Behavior

- 900px 以下：左右面板改为上下排列
- 右面板宽度 100%
- 容器 padding 缩至 16px
- 触摸目标最小 36×36px

## 9. Agent Prompt Guide

### Quick Reference

```
bg-canvas: #faf7f2
bg-surface: #ffffff
bg-surface-warm: #f7f3ed
bg-code: #292524
accent: #b45309
accent-hover: #92400e
accent-light: #fef3c7
text-primary: #1c1917
text-secondary: #57534e
text-muted: #a8a29e
border: #e7e5e4
radius-sm: 6px
radius-md: 10px
radius-lg: 14px
```

### Example Prompts

**新增一个 Toast 组件**：
> 创建一个 Toast 组件，背景 `--bg-surface`，左侧 3px `--accent` 竖条（改为色点或背景色块），文字 `--text-primary`，圆角 `10px`，阴影 `--shadow-md`，从底部 `translateY` 滑入，3s 后自动消失。用 `opacity + transform` 做动画，不用 `transition: all`。

**新增一个 Tag 输入组件**：
> Tag 输入框，外层边框 `--border`，圆角 `6px`，focus 时 `--accent` 边框 + `--accent-light` 光晕。已选 Tag 用 `--accent-light` 底 + `--accent` 文字 + `--accent-subtle` 边框，圆角 pill。未选 Tag 用 `--bg-surface-warm` 底 + `--text-secondary` 文字。

**新增一个空状态占位**：
> 空状态区域，`--bg-surface-warm` 底色，圆角 `10px`，居中文字 `--text-muted`，图标用 emoji 或简单 SVG（不用插画），文字 14px。
