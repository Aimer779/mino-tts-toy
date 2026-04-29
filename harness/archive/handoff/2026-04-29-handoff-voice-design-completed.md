# Handoff - 2026-04-29

## 本轮完成
- 实现音色设计 Tab 合成流程：`synthesizeDesign()` 函数，model 用 `mimo-v2.5-tts-voicedesign`，user message 为音色描述（必填），audio 不带 voice 字段
- 请求预览同步：`updatePreview()` 感知当前 Tab，切换 Tab 时自动刷新
- 修复播放器元素 id 冲突：音色设计 Tab 用 `designPlayBtn` / `designProgressFill` / `designAudioTime`
- `togglePlay()` / `updateProgress()` 根据当前 Tab 使用正确的元素 id
- `generatePython()` 处理 voice 为空的情况
- 代码解耦：拆分为 `index.html` + `style.css` + `app.js` 三个文件

## 验证结果
- [x] 手动：打开 index.html → 切换到音色设计 Tab → 输入音色描述和文本 → 点击合成 → 请求预览同步显示 `mimo-v2.5-tts-voicedesign` 模型的 JSON / cURL / Python

## 残留问题
- 音色复刻 Tab 只有 UI 占位，无实际功能
- 错误处理只有 alert，没有 UI 展示
- 需要本地服务器才能运行（`python -m http.server` 或 VS Code Live Server）

## 下一轮最小目标
实现音色复刻 Tab 的实际功能（使用 `mimo-v2.5-tts-voiceclone` 模型，上传音频文件转 base64 传入 audio.voice）

## 恢复指令
请先读：
1. harness/spec.md
2. harness/handoff.md
3. index.html
4. style.css
5. app.js
6. Xiaomi-MiMo-tts-doc.md（API 文档，音色复刻章节）

## 关键决策
- 音色设计 Tab 的 audio 不带 voice 字段（API 文档明确：通过 user message 描述音色，无需预置音色）
- 播放器状态按 Tab 隔离，避免切换 Tab 时 UI 状态混乱
- 拆分为三个文件后需要本地服务器，不能直接双击打开
