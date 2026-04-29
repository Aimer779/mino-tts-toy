# MiMo TTS Web Panel - Spec

## 总目标
本地使用的网页版 MiMo TTS 面板，通过图形界面调用小米 TTS API。

## 本轮目标
实现预置音色合成页面：选音色、写文本、调 API、播放音频。

## 技术栈
- 原生 HTML + JS + 内联 CSS
- 单个 index.html 文件
- API Key 存 localStorage

## 动作清单
1. 创建 index.html，包含完整 HTML + CSS + JS
2. 实现三个 Tab 切换 UI（预置音色 / 音色设计 / 音色复刻）
3. 实现预置音色 Tab 完整流程：
   - 音色下拉选择
   - 风格控制输入（自然语言）
   - 合成文本输入
   - 调用 API 并播放音频
   - 右侧请求预览（JSON）

## 边界约束
- 不做：音色设计/复刻 Tab 实际功能（只做 UI 占位）
- 不做：cURL/Python 代码预览
- 不做：音频下载
- 保持：API Key 设置弹窗

## 验证方式
手动：打开 index.html → 输入 API Key → 选音色 → 输入文本 → 点击合成 → 能听到声音
