/**
 * DeepSeek Code Reviewer
 * Claude Code / Cline Plugin for AI-powered code review
 * 
 * @author ljj6600
 * @version 1.0.0
 */

const { CodeReviewer, reviewCode, createCodeReviewer } = require('./review');
const { 
  getConfig, 
  setApiKey, 
  getApiKey, 
  isConfigured, 
  saveConfig, 
  resetConfig,
  getConfigPath 
} = require('./config');
const { DeepSeekClient } = require('./api');

// 导出主要类型和函数
module.exports = {
  CodeReviewer,
  reviewCode,
  createCodeReviewer,
  DeepSeekClient,
  getConfig,
  setApiKey,
  getApiKey,
  isConfigured,
  saveConfig,
  resetConfig,
  getConfigPath,
  PLUGIN_INFO: {
    name: 'deepseek-code-reviewer',
    version: '1.0.0',
    description: 'DeepSeek-powered code review plugin for Claude Code / Cline',
    author: 'ljj6600'
  }
};

/**
 * CLI 入口函数
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log(`
🤖 DeepSeek Code Reviewer - CLI

Usage:
  node index.js review "<code>" [language]
  node index.js set-key <api-key>
  node index.js config
  node index.js reset

Examples:
  node index.js review "function hello() { console.log('Hello'); }" javascript
  node index.js review "def hello(): print('Hello')" python
  node index.js set-key sk-xxxxxxxxxxxxxxxx
  node index.js config
`);
    return;
  }

  const command = args[0];

  switch (command) {
    case 'review': {
      const code = args[1] || '';
      const language = args[2] || '';
      
      if (!code) {
        console.error('❌ Please provide code to review');
        console.error('Usage: node index.js review "<code>" [language]');
        process.exit(1);
      }
      
      console.log('🔍 Reviewing code...\n');
      
      const result = await reviewCode(code, language);
      
      if (result.success && result.report) {
        console.log(result.report);
        if (result.usage) {
          console.log(`\n📊 Tokens used: ${result.usage.total_tokens} (prompt: ${result.usage.prompt_tokens}, completion: ${result.usage.completion_tokens})`);
        }
      } else {
        console.error('❌ Error:', result.error);
        process.exit(1);
      }
      break;
    }
    
    case 'set-key': {
      const apiKey = args[1];
      if (!apiKey) {
        console.error('❌ Please provide an API key');
        console.error('Usage: node index.js set-key <api-key>');
        process.exit(1);
      }
      setApiKey(apiKey);
      console.log('✅ API key saved successfully!');
      console.log(`   Config file: ${getConfigPath()}`);
      break;
    }
    
    case 'config': {
      const config = getConfig();
      console.log('⚙️  Current Configuration:');
      console.log(JSON.stringify({
        ...config,
        apiKey: config.apiKey ? `${config.apiKey.substring(0, 10)}...` : '(not set)'
      }, null, 2));
      console.log(`\n📁 Config file: ${getConfigPath()}`);
      break;
    }
    
    case 'reset': {
      resetConfig();
      console.log('✅ Configuration reset successfully!');
      break;
    }
    
    default:
      console.log(`❌ Unknown command: ${command}`);
      console.log('Run without arguments to see usage');
      process.exit(1);
  }
}

// 如果作为主程序运行
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}