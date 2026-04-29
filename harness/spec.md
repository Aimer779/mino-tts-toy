# MiMo TTS Web Panel - Spec

## 总目标
本地使用的网页版 MiMo TTS 面板，通过图形界面调用小米 TTS API。

## 本轮目标
音色复刻 Tab 能用：上传音频文件 → base64 编码 → 调 API → 播放音频

## 技术栈
- 原生 HTML + JS + 内联 CSS
- 三个文件：index.html + style.css + app.js
- API Key 存 localStorage

## 动作清单
1. index.html：替换音色复刻 Tab 占位 UI，加文件上传（点击+拖拽）、独立 id 的播放器区
2. app.js：实现 `synthesizeClone()`，model=mimo-v2.5-tts-voiceclone，audio.voice=base64 前缀音频，user message 留空；`updatePreview()` / `getAudioElementIds()` 增加 clone 分支
3. style.css：拖拽 hover 状态、文件信息展示样式

## 边界约束
- 不做：音色复刻 user message 风格控制输入（本轮 user content 留空）
- 不做：流式播放
- 保持：预置音色 Tab 和音色设计 Tab 所有现有功能不变

## 验证方式
手动：打开 index.html → 切换到音色复刻 Tab → 上传 MP3/WAV → 输入文本 → 点击合成 → 能播放 → 预览显示 mimo-v2.5-tts-voiceclone 模型的 JSON / cURL / Python
