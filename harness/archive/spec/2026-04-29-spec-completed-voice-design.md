# MiMo TTS Web Panel - Spec

## 总目标
本地使用的网页版 MiMo TTS 面板，通过图形界面调用小米 TTS API。

## 本轮目标
让音色设计 Tab 能用：输入音色描述 + 合成文本 → 调 API → 播放音频

## 技术栈
- 原生 HTML + JS + 内联 CSS
- 单个 index.html 文件（后拆分为 index.html + style.css + app.js）
- API Key 存 localStorage

## 动作清单
1. 接通音色设计 Tab 的合成流程：启用按钮、加 id、写 `synthesizeDesign()` 函数，model 用 `mimo-v2.5-tts-voicedesign`，user message 放音色描述（必填），audio 不带 voice 字段
2. 同步请求预览：切换到音色设计 Tab 时，预览区显示对应的 JSON / cURL / Python

## 边界约束
- 不做：音色复刻 Tab 功能
- 不做：错误 UI 展示（保留 alert）
- 不做："生成文本"辅助按钮
- 保持：预置音色 Tab 所有现有功能不变

## 验证方式
手动：打开 index.html → 切换到音色设计 Tab → 输入音色描述 → 输入文本 → 点击合成 → 能播放音频 → 检查右侧预览是否同步
