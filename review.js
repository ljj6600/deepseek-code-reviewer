/**
 * 代码审查核心模块
 */
const { DeepSeekClient } = require('./api');
const { getReviewPrompt } = require('./prompts');
const { getConfig } = require('./config');

/**
 * 代码审查结果
 */
class ReviewResult {
  constructor(success, data = {}) {
    this.success = success;
    this.report = data.report || null;
    this.error = data.error || null;
    this.usage = data.usage || null;
  }
}

/**
 * 代码审查器类
 */
class CodeReviewer {
  constructor(config = {}) {
    const cfg = config.apiKey ? config : getConfig();
    this.client = new DeepSeekClient({
      apiKey: cfg.apiKey,
      model: cfg.model || 'deepseek-chat'
    });
  }

  /**
   * 审查代码
   * @param {string} code - 要审查的代码
   * @param {string} language - 代码语言（可选）
   */
  async review(code, language) {
    const config = getConfig();

    // 检查 API Key
    if (!config.apiKey) {
      return new ReviewResult(false, {
        error: 'DeepSeek API Key not configured. Please set DEEPSEEK_API_KEY environment variable or use: node index.js set-key <your-api-key>'
      });
    }

    // 检查代码是否为空
    if (!code || code.trim().length === 0) {
      return new ReviewResult(false, {
        error: 'No code provided for review.'
      });
    }

    try {
      // 获取审查提示词
      const systemPrompt = getReviewPrompt(language);
      const userPrompt = `请审查以下代码:\n\n\`\`\`${language || 'text'}\n${code}\n\`\`\``;

      // 调用 API
      const response = await this.client.chat([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]);

      const report = response.choices[0]?.message?.content || '';

      return new ReviewResult(true, {
        report: report,
        usage: response.usage
      });
    } catch (error) {
      return new ReviewResult(false, {
        error: error.message || 'Unknown error occurred during review'
      });
    }
  }

  /**
   * 审查多个代码片段
   */
  async reviewMultiple(codes) {
    const results = [];

    for (const item of codes) {
      const result = await this.review(item.code, item.language);
      results.push(result);

      // 添加小延迟以避免 API 限流
      if (codes.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }
}

/**
 * 创建代码审查器实例
 */
function createCodeReviewer(config) {
  return new CodeReviewer(config);
}

/**
 * 便捷函数：直接审查代码
 */
async function reviewCode(code, language, apiKey) {
  const config = apiKey ? { apiKey } : getConfig();
  const reviewer = new CodeReviewer(config);
  return reviewer.review(code, language);
}

module.exports = {
  CodeReviewer,
  ReviewResult,
  createCodeReviewer,
  reviewCode
};