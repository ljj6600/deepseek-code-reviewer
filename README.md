# DeepSeek Code Reviewer

<p align="center">
  <img src="https://img.shields.io/badge/DeepSeek-API-4A6CF7?style=flat-square" alt="DeepSeek API"/>
  <img src="https://img.shields.io/badge/ready-Claude%20Code-blueviolet?style=flat-square" alt="Claude Code"/>
  <img src="https://img.shields.io/badge/ready-Cline-orange?style=flat-square" alt="Cline"/>
  <img src="https://img.shields.io/badge/Node.js-14%2B-339933?style=flat-square&logo=node.js" alt="Node.js"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="MIT License"/>
</p>

🤖 **DeepSeek 驱动的代码审查插件** — 集成到 Claude Code / Cline / Cursor 中，对代码进行多维度 AI 智能审查。

适用于 **Xiaomi MiMo 百亿 Token 激励计划**申请材料！

## ✨ 功能特性

- 🔍 **智能审查** — 使用 DeepSeek AI 扫描代码中的 Bug、安全漏洞、性能问题
- 🌐 **多语言** — Python, JavaScript, TypeScript, Go, Rust, Java, C/C++ 等
- ⚡ **零依赖** — 纯 Node.js 内置模块，无需安装任何第三方包
- 🔧 **双重配置** — 支持环境变量和持久化配置文件
- 🔌 **即插即用** — 可直接作为 Claude Code / Cline 的插件使用
- 📊 **Token 统计** — 每次审查显示 Token 消耗，便于成本控制

## 🚀 快速开始

```bash
# 1. 克隆
git clone https://github.com/ljj6600/deepseek-code-reviewer.git
cd deepseek-code-reviewer

# 2. 配置 API Key
export DEEPSEEK_API_KEY=your-deepseek-api-key

# 3. 审查代码
node index.js review "function hello() { console.log('Hello'); }" javascript
```

## 📖 使用指南

### 配置 API Key

```bash
# 方式一：环境变量（临时，推荐命令行用）
export DEEPSEEK_API_KEY=sk-your-key-here

# 方式二：命令设置（持久化到 ~/.deepseek-code-reviewer.json）
node index.js set-key sk-your-key-here

# 查看配置
node index.js config
```

### CLI 命令

| 命令 | 说明 |
|------|------|
| `node index.js review "<code>" [language]` | 审查代码片段 |
| `node index.js review-file <filepath>` | 审查文件中的代码 |
| `node index.js set-key <api-key>` | 持久化设置 API Key |
| `node index.js config` | 查看当前配置 |
| `node index.js reset` | 重置配置 |

### 示例

```bash
# 审查 Python
node index.js review "def add(a, b): return a + b" python

# 审查 JavaScript
node index.js review "const x = 1; console.log(x);" javascript

# 审查文件
node index.js review-file ./myfile.py
```

## 🔌 集成到 Claude Code / Cline

### 方式一：自定义 MCP Server（推荐）

在 `~/.config/cline/config.json` 或 Cline 的 MCP 配置中添加：

```json
{
  "mcpServers": {
    "deepseek-reviewer": {
      "command": "node",
      "args": ["/path/to/deepseek-code-reviewer/index.js", "review"],
      "env": {
        "DEEPSEEK_API_KEY": "sk-your-key-here"
      }
    }
  }
}
```

### 方式二：命令行集成

直接在 Claude Code / Cline 中运行：

```bash
!node /path/to/deepseek-code-reviewer/index.js review "$(cat current_file.py)" python
```

### 方式三：作为 Node.js 模块

```javascript
const { reviewCode } = require('./index');

// 直接审查代码
const result = await reviewCode('function hello() { return 1; }', 'javascript');

if (result.success) {
  console.log(result.report);
}
```

## 📊 输出示例

```
🔍 Reviewing code...

## 代码审查报告

### 🔴 严重问题
- 无类型注解，建议添加以提高可维护性

### 🟡 建议优化
- 可考虑添加输入验证

### 🟢 代码亮点
- 代码简洁，逻辑清晰

### 📝 总结
代码整体质量良好，建议补充类型注解和错误处理。

📊 Tokens used: 1024 (prompt: 512, completion: 512)
```

## ⚙️ 配置项

配置文件 `~/.deepseek-code-reviewer.json`：

```json
{
  "apiKey": "sk-...",
  "model": "deepseek-chat",
  "temperature": 0.7,
  "maxTokens": 4096,
  "language": "zh-CN"
}
```

## 🧩 项目结构

```
deepseek-code-reviewer/
├── index.js     # CLI 入口 + 模块导出
├── api.js       # DeepSeek API 客户端（零依赖）
├── review.js    # 代码审查核心逻辑
├── config.js    # 配置管理（持久化）
├── prompts.js   # 审查 Prompt 模板
├── package.json
└── README.md
```

## 📄 许可证

MIT License

## 👤 作者

[ljj6600](https://github.com/ljj6600) — 申请 Xiaomi MiMo 百亿 Token 计划
