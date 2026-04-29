// State
let apiKey = localStorage.getItem('mimo_api_key') || '';
let baseUrl = localStorage.getItem('mimo_base_url') || 'https://api.xiaomimimo.com/v1';
let currentAudio = null;
let isPlaying = false;
let currentPreviewTab = 'json';
let cloneFileBase64 = '';
let clonePreviewAudio = null;

// Init
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();
    updatePreview();
    setupCharCount();
    setupCloneUpload();
});

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
    updatePreview();
}

// Preview tab switching
function switchPreviewTab(tabName) {
    currentPreviewTab = tabName;
    document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-preview="${tabName}"]`).classList.add('active');
    updatePreview();
}

// Settings
function openSettings() {
    document.getElementById('apiKeyInput').value = apiKey;
    document.getElementById('baseUrlInput').value = baseUrl;
    document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

function saveApiKey() {
    apiKey = document.getElementById('apiKeyInput').value.trim();
    baseUrl = document.getElementById('baseUrlInput').value.trim() || 'https://api.xiaomimimo.com/v1';
    localStorage.setItem('mimo_api_key', apiKey);
    localStorage.setItem('mimo_base_url', baseUrl);
    updateStatus();
    updatePreview();
    closeSettings();
}

function clearApiKey() {
    apiKey = '';
    baseUrl = 'https://api.xiaomimimo.com/v1';
    localStorage.removeItem('mimo_api_key');
    localStorage.removeItem('mimo_base_url');
    document.getElementById('apiKeyInput').value = '';
    document.getElementById('baseUrlInput').value = '';
    updateStatus();
    updatePreview();
}

function updateStatus() {
    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    if (apiKey) {
        dot.classList.add('connected');
        text.textContent = '已连接';
    } else {
        dot.classList.remove('connected');
        text.textContent = '未配置';
    }
}

// Quick tags
function addTag(btn) {
    btn.classList.toggle('selected');
    const tags = Array.from(document.querySelectorAll('.tag.selected')).map(t => t.textContent);
    const styleInput = document.getElementById('styleInput');
    styleInput.value = tags.join('，');
    updatePreview();
}

// Char count
function setupCharCount() {
    const textInput = document.getElementById('textInput');
    const charCount = document.getElementById('charCount');
    textInput.addEventListener('input', () => {
        charCount.textContent = textInput.value.length;
        updatePreview();
    });

    const styleInput = document.getElementById('styleInput');
    styleInput.addEventListener('input', updatePreview);
    document.getElementById('voiceSelect').addEventListener('change', updatePreview);

    // Design tab
    const designTextInput = document.getElementById('designTextInput');
    const designCharCount = document.getElementById('designCharCount');
    designTextInput.addEventListener('input', () => {
        designCharCount.textContent = designTextInput.value.length;
        updatePreview();
    });

    const designDescInput = document.getElementById('designDescInput');
    designDescInput.addEventListener('input', updatePreview);

    // Clone tab
    const cloneTextInput = document.getElementById('cloneTextInput');
    const cloneCharCount = document.getElementById('cloneCharCount');
    cloneTextInput.addEventListener('input', () => {
        cloneCharCount.textContent = cloneTextInput.value.length;
        updatePreview();
    });
}

// Clone file upload
function setupCloneUpload() {
    const zone = document.getElementById('cloneUploadZone');
    const fileInput = document.getElementById('cloneFileInput');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) handleCloneFile(fileInput.files[0]);
    });

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) handleCloneFile(e.dataTransfer.files[0]);
    });
}

function handleCloneFile(file) {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav)$/i)) {
        alert('仅支持 MP3 和 WAV 格式');
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        alert('文件大小不能超过 10MB');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        cloneFileBase64 = reader.result; // data:audio/mpeg;base64,...
        document.getElementById('cloneFileName').textContent = file.name;
        document.getElementById('cloneFileSize').textContent = (file.size / 1024).toFixed(0) + 'KB';
        document.getElementById('cloneFileInfo').classList.remove('hidden');
        document.getElementById('cloneUploadZone').classList.add('hidden');
        updatePreview();
    };
    reader.readAsDataURL(file);
}

function clearCloneFile() {
    if (clonePreviewAudio) {
        clonePreviewAudio.pause();
        clonePreviewAudio = null;
    }
    cloneFileBase64 = '';
    document.getElementById('cloneFileInput').value = '';
    document.getElementById('cloneFileInfo').classList.add('hidden');
    document.getElementById('cloneUploadZone').classList.remove('hidden');
    document.getElementById('clonePreviewBtn').textContent = '▶';
    updatePreview();
}

function toggleClonePreview() {
    if (!cloneFileBase64) return;
    const btn = document.getElementById('clonePreviewBtn');
    if (clonePreviewAudio && !clonePreviewAudio.paused) {
        clonePreviewAudio.pause();
        btn.textContent = '▶';
    } else {
        if (!clonePreviewAudio) {
            clonePreviewAudio = new Audio(cloneFileBase64);
            clonePreviewAudio.addEventListener('ended', () => btn.textContent = '▶');
        }
        clonePreviewAudio.play();
        btn.textContent = '⏸';
    }
}

// Get current active tab
function getActiveTab() {
    const active = document.querySelector('.tab.active');
    return active ? active.dataset.tab : 'preset';
}

// Update preview
function updatePreview() {
    const activeTab = getActiveTab();
    let requestData;

    if (activeTab === 'preset') {
        const voice = document.getElementById('voiceSelect').value;
        const style = document.getElementById('styleInput').value;
        const text = document.getElementById('textInput').value || '请输入要合成的文本...';
        requestData = {
            model: 'mimo-v2.5-tts',
            messages: [
                ...(style ? [{ role: 'user', content: style }] : []),
                { role: 'assistant', content: text }
            ],
            audio: {
                format: 'wav',
                voice: voice
            }
        };
    } else if (activeTab === 'design') {
        const desc = document.getElementById('designDescInput').value || '请描述音色...';
        const text = document.getElementById('designTextInput').value || '请输入要合成的文本...';
        requestData = {
            model: 'mimo-v2.5-tts-voicedesign',
            messages: [
                { role: 'user', content: desc },
                { role: 'assistant', content: text }
            ],
            audio: {
                format: 'wav'
            }
        };
    } else if (activeTab === 'clone') {
        const text = document.getElementById('cloneTextInput').value || '请输入要合成的文本...';
        const voicePreview = cloneFileBase64
            ? cloneFileBase64.substring(0, 40) + '...' + cloneFileBase64.substring(cloneFileBase64.length - 10)
            : 'data:audio/wav;base64,<请上传音频样本>';
        requestData = {
            model: 'mimo-v2.5-tts-voiceclone',
            messages: [
                { role: 'user', content: '' },
                { role: 'assistant', content: text }
            ],
            audio: {
                format: 'wav',
                voice: voicePreview
            }
        };
    } else {
        return;
    }

    const previewCode = document.getElementById('previewCode');

    if (currentPreviewTab === 'json') {
        previewCode.textContent = JSON.stringify(requestData, null, 2);
    } else if (currentPreviewTab === 'curl') {
        previewCode.textContent = generateCurl(requestData);
    } else if (currentPreviewTab === 'python') {
        previewCode.textContent = generatePython(requestData);
    }
}

function generateCurl(data) {
    return `curl --location --request POST '${baseUrl}/chat/completions' \\
--header "api-key: $MIMO_API_KEY" \\
--header 'Content-Type: application/json' \\
--data-raw '${JSON.stringify(data, null, 2)}'`;
}

function generatePython(data) {
    const voiceLine = data.audio.voice ? `\n        "voice": "${data.audio.voice}",` : '';
    return `import os
from openai import OpenAI
import base64

client = OpenAI(
    api_key=os.environ.get("MIMO_API_KEY"),
    base_url="${baseUrl}"
)

completion = client.chat.completions.create(
    model="${data.model}",
    messages=${JSON.stringify(data.messages, null, 4).replace(/"/g, "'")},
    audio={
        "format": "${data.audio.format}",${voiceLine}
    }
)

message = completion.choices[0].message
audio_bytes = base64.b64decode(message.audio.data)
with open("audio_file.wav", "wb") as f:
    f.write(audio_bytes)`;
}

function copyPreview() {
    const code = document.getElementById('previewCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.copy-btn');
        const original = btn.textContent;
        btn.textContent = '✓ 已复制';
        setTimeout(() => btn.textContent = original, 2000);
    });
}

// Synthesize
async function synthesize() {
    if (!apiKey) {
        openSettings();
        return;
    }

    const text = document.getElementById('textInput').value.trim();
    if (!text) {
        alert('请输入要合成的文本');
        return;
    }

    const voice = document.getElementById('voiceSelect').value;
    const style = document.getElementById('styleInput').value;

    const requestData = {
        model: 'mimo-v2.5-tts',
        messages: [
            ...(style ? [{ role: 'user', content: style }] : []),
            { role: 'assistant', content: text }
        ],
        audio: {
            format: 'wav',
            voice: voice
        }
    };

    // Show loading
    document.getElementById('loading').classList.add('show');
    document.getElementById('resultSection').classList.add('hidden');

    const startTime = Date.now();

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        const audioBase64 = data.choices[0].message.audio.data;
        const audioBytes = base64ToArrayBuffer(audioBase64);
        const audioBlob = new Blob([audioBytes], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const size = (audioBlob.size / 1024).toFixed(0);

        // Setup audio
        if (currentAudio) {
            currentAudio.pause();
            URL.revokeObjectURL(currentAudio.src);
        }

        currentAudio = new Audio(audioUrl);
        currentAudio.addEventListener('timeupdate', updateProgress);
        currentAudio.addEventListener('ended', () => {
            isPlaying = false;
            document.getElementById('playBtn').textContent = '▶';
        });

        // Show result
        document.getElementById('loading').classList.remove('show');
        document.getElementById('resultSection').classList.remove('hidden');
        document.getElementById('resultMeta').textContent = `耗时: ${elapsed}s  大小: ${size}KB`;
        document.getElementById('playBtn').textContent = '▶';
        isPlaying = false;

    } catch (error) {
        document.getElementById('loading').classList.remove('show');
        alert('合成失败: ' + error.message);
        console.error(error);
    }
}

// Synthesize Design
async function synthesizeDesign() {
    if (!apiKey) {
        openSettings();
        return;
    }

    const desc = document.getElementById('designDescInput').value.trim();
    if (!desc) {
        alert('请输入音色描述');
        return;
    }

    const text = document.getElementById('designTextInput').value.trim();
    if (!text) {
        alert('请输入要合成的文本');
        return;
    }

    const requestData = {
        model: 'mimo-v2.5-tts-voicedesign',
        messages: [
            { role: 'user', content: desc },
            { role: 'assistant', content: text }
        ],
        audio: {
            format: 'wav'
        }
    };

    // Show loading
    document.getElementById('designLoading').classList.add('show');
    document.getElementById('designResultSection').classList.add('hidden');

    const startTime = Date.now();

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        const audioBase64 = data.choices[0].message.audio.data;
        const audioBytes = base64ToArrayBuffer(audioBase64);
        const audioBlob = new Blob([audioBytes], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const size = (audioBlob.size / 1024).toFixed(0);

        // Setup audio
        if (currentAudio) {
            currentAudio.pause();
            URL.revokeObjectURL(currentAudio.src);
        }

        currentAudio = new Audio(audioUrl);
        currentAudio.addEventListener('timeupdate', updateProgress);
        currentAudio.addEventListener('ended', () => {
            isPlaying = false;
            document.getElementById('designPlayBtn').textContent = '▶';
        });

        // Show result
        document.getElementById('designLoading').classList.remove('show');
        document.getElementById('designResultSection').classList.remove('hidden');
        document.getElementById('designResultMeta').textContent = `耗时: ${elapsed}s  大小: ${size}KB`;
        document.getElementById('designPlayBtn').textContent = '▶';
        isPlaying = false;

    } catch (error) {
        document.getElementById('designLoading').classList.remove('show');
        alert('合成失败: ' + error.message);
        console.error(error);
    }
}

// Synthesize Clone
async function synthesizeClone() {
    if (!apiKey) {
        openSettings();
        return;
    }

    if (!cloneFileBase64) {
        alert('请先上传音频样本');
        return;
    }

    const text = document.getElementById('cloneTextInput').value.trim();
    if (!text) {
        alert('请输入要合成的文本');
        return;
    }

    const requestData = {
        model: 'mimo-v2.5-tts-voiceclone',
        messages: [
            { role: 'user', content: '' },
            { role: 'assistant', content: text }
        ],
        audio: {
            format: 'wav',
            voice: cloneFileBase64
        }
    };

    // Show loading
    document.getElementById('cloneLoading').classList.add('show');
    document.getElementById('cloneResultSection').classList.add('hidden');

    const startTime = Date.now();

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status}`);
        }

        const data = await response.json();
        const audioBase64 = data.choices[0].message.audio.data;
        const audioBytes = base64ToArrayBuffer(audioBase64);
        const audioBlob = new Blob([audioBytes], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const size = (audioBlob.size / 1024).toFixed(0);

        // Setup audio
        if (currentAudio) {
            currentAudio.pause();
            URL.revokeObjectURL(currentAudio.src);
        }

        currentAudio = new Audio(audioUrl);
        currentAudio.addEventListener('timeupdate', updateProgress);
        currentAudio.addEventListener('ended', () => {
            isPlaying = false;
            document.getElementById('clonePlayBtn').textContent = '▶';
        });

        // Show result
        document.getElementById('cloneLoading').classList.remove('show');
        document.getElementById('cloneResultSection').classList.remove('hidden');
        document.getElementById('cloneResultMeta').textContent = `耗时: ${elapsed}s  大小: ${size}KB`;
        document.getElementById('clonePlayBtn').textContent = '▶';
        isPlaying = false;

    } catch (error) {
        document.getElementById('cloneLoading').classList.remove('show');
        alert('合成失败: ' + error.message);
        console.error(error);
    }
}

function base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

// Audio controls
function getAudioElementIds() {
    const activeTab = getActiveTab();
    if (activeTab === 'design') {
        return { playBtn: 'designPlayBtn', progressFill: 'designProgressFill', audioTime: 'designAudioTime' };
    }
    if (activeTab === 'clone') {
        return { playBtn: 'clonePlayBtn', progressFill: 'cloneProgressFill', audioTime: 'cloneAudioTime' };
    }
    return { playBtn: 'playBtn', progressFill: 'progressFill', audioTime: 'audioTime' };
}

function togglePlay() {
    if (!currentAudio) return;
    const ids = getAudioElementIds();

    if (isPlaying) {
        currentAudio.pause();
        document.getElementById(ids.playBtn).textContent = '▶';
    } else {
        currentAudio.play();
        document.getElementById(ids.playBtn).textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function updateProgress() {
    if (!currentAudio) return;
    const ids = getAudioElementIds();
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    document.getElementById(ids.progressFill).style.width = progress + '%';

    const current = formatTime(currentAudio.currentTime);
    const total = formatTime(currentAudio.duration);
    document.getElementById(ids.audioTime).textContent = `${current} / ${total}`;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

function downloadAudio() {
    if (!currentAudio) return;
    const a = document.createElement('a');
    a.href = currentAudio.src;
    a.download = 'mimo_tts_output.wav';
    a.click();
}
