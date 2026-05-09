/**
 * DeepSeek API 客户端
 */
const https = require('https');
const http = require('http');

/**
 * DeepSeek API 客户端类
 */
class DeepSeekClient {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.DEEPSEEK_API_KEY || '';
    this.model = config.model || 'deepseek-chat';
    this.baseURL = 'https://api.deepseek.com';
  }

  /**
   * 发送 HTTP 请求
   */
  _request(options, data) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(json);
            } else {
              reject(new Error(json.error?.message || `HTTP ${res.statusCode}`));
            }
          } catch (e) {
            reject(new Error(`Invalid response: ${body}`));
          }
        });
      });

      req.on('error', reject);
      req.setTimeout(60000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      if (data) {
        req.write(JSON.stringify(data));
      }
      req.end();
    });
  }

  /**
   * 发送聊天请求
   */
  async chat(messages) {
    const data = {
      model: this.model,
      messages: messages,
      temperature: 0.7,
      max_tokens: 4096
    };

    const options = {
      hostname: 'api.deepseek.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      }
    };

    return this._request(options, data);
  }

  /**
   * 简单的一次性对话
   */
  async simpleChat(systemPrompt, userPrompt) {
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    const response = await this.chat(messages);
    return response.choices[0]?.message?.content || '';
  }
}

/**
 * 创建 DeepSeek 客户端实例
 */
function createDeepSeekClient(config) {
  return new DeepSeekClient(config);
}

module.exports = {
  DeepSeekClient,
  createDeepSeekClient
};