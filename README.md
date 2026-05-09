# DeepSeek Code Reviewer

🤖 DeepSeek 驱动的代码审查插件，适用于 Claude Code / Cline / Cursor

## 功能特性

- 🔍 **智能代码审查** - 使用 DeepSeek AI 进行多维度代码分析
- 🎯 **多语言支持** - Python, JavaScript, TypeScript, Go, Rust, Java 等
- ⚡ **快速集成** - 简单的 CLI 接口，易于集成到现有工作流
- 🔧 **灵活配置** - 支持环境变量和配置文件

## 安装

```bash
git clone https://github.com/ljj6600/deepseek-code-reviewer.git
cd deepseek-code-reviewer
```

## 快速开始

### 1. 配置 API Key

```bash
# 方法一：使用命令设置
node index.js set-key your-deepseek-api-key

# 方法二：使用环境变量
export DEEPSEEK_API_KEY=your-deepseek-api-key
```

### 2. 审查代码

```bash
# 审查 JavaScript 代码
node index.js review "function hello() { console.log('Hello'); }" javascript

# 审查 Python 代码
node index.js review "def hello(): print('Hello')" python

# 审查 Go 代码
node index.js review "func hello() { fmt.Println(\"Hello\") }" go
```

### 3. 查看配置

```bash
node index.js config
```

## 输出示例

```
🔍 Reviewing code...

## 代码审查报告

### 🔴 严重问题
- [第1行] 建议添加类型注解以提高代码可维护性

### 🟡 建议优化
- [第1行] 函数名可以更具描述性，如 `greetUser`

### 🟢 代码亮点
- 代码简洁明了
- 遵循基本的命名规范

### 📝 总结
代码整体质量良好，是一个简单且易读的函数实现。建议考虑添加错误处理和日志记录以提高健壮性。

📊 Tokens used: 1024 (prompt: 512, completion: 512)
```

## 配置说明

配置文件位于: `~/.deepseek-code-reviewer.json`

```json
{
  "apiKey": "your-api-key",
  "model": "deepseek-chat",
  "temperature": 0.7,
  "maxTokens": 4096,
  "language": "zh-CN",
  "autoReview": false
}
```

## 作为模块使用

```javascript
const { reviewCode, CodeReviewer } = require('./index');

// 方式一：直接调用
const result = await reviewCode('your code here', 'javascript');

// 方式二：创建实例
const reviewer = new CodeReviewer({ apiKey: 'your-key' });
const result = await reviewer.review('your code here', 'javascript');

if (result.success) {
  console.log(result.report);
} else {
  console.error(result.error);
}
```

## Claude Code / Cline 集成

在 Cline 中使用 `Custom MCP Server` 或直接通过 shell 命令调用：

```
node /path/to/deepseek-code-reviewer/index.js review "你的代码" javascript
```

## 许可证

MIT License

## 作者

[ljj6600](https://github.com/ljj6600)