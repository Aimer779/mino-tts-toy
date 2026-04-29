# Handoff - 2026-04-29

## 本轮完成
- 创建 index.html，单页 HTML 应用
- 实现三个 Tab 切换 UI（预置音色可用，音色设计/复刻占位）
- 实现预置音色 Tab 完整流程：音色选择、风格控制（自然语言+快捷标签）、文本输入、API 调用、音频播放
- 实现右侧请求预览（JSON / cURL / Python 三种格式，实时同步）
- 实现 API Key + Base URL 配置弹窗，存 localStorage
- 实现下载音频功能

## 验证结果
- [x] 手动：打开 index.html → 配置 API Key → 选冰糖音色 → 输入文本 → 点击合成 → 能播放音频

## 残留问题
- 音色设计 Tab 只有 UI 占位，无实际功能
- 音色复刻 Tab 只有 UI 占位，无实际功能
- 错误处理只有 alert，没有 UI 展示

## 下一轮最小目标
实现音色设计 Tab 的实际功能（使用 mimo-v2.5-tts-voicedesign 模型）

## 恢复指令
请先读：
1. harness/spec.md
2. harness/handoff.md
3. index.html
4. Xiaomi-MiMo-tts-doc.md（API 文档）

## 关键决策
- 使用原生 HTML + JS + 内联 CSS，单文件方案，便于本地直接打开
- API Key 和 Base URL 存 localStorage，适合本地个人使用场景
- 采用非流式调用（文档显示流式功能暂未上线）
