/**
 * 配置管理模块
 */
const fs = require('fs');
const path = require('path');

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  apiKey: process.env.DEEPSEEK_API_KEY || '',
  model: 'deepseek-chat',
  temperature: 0.7,
  maxTokens: 4096,
  language: 'zh-CN',
  autoReview: false
};

/**
 * 配置文件路径
 */
const CONFIG_FILE = path.join(
  process.env.HOME || process.env.USERPROFILE || '',
  '.deepseek-code-reviewer.json'
);

let cachedConfig = null;

/**
 * 加载配置
 */
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      const fileConfig = JSON.parse(data);
      return { ...DEFAULT_CONFIG, ...fileConfig };
    }
  } catch (error) {
    console.warn('Failed to load config file:', error.message);
  }
  return { ...DEFAULT_CONFIG };
}

/**
 * 保存配置
 */
function saveConfig(config) {
  try {
    const currentConfig = loadConfig();
    const newConfig = { ...currentConfig, ...config };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2), 'utf-8');
    cachedConfig = newConfig;
    return true;
  } catch (error) {
    throw new Error(`Failed to save config: ${error.message}`);
  }
}

/**
 * 获取配置（带缓存）
 */
function getConfig() {
  if (!cachedConfig) {
    cachedConfig = loadConfig();
  }
  return cachedConfig;
}

/**
 * 设置 API Key
 */
function setApiKey(apiKey) {
  return saveConfig({ apiKey });
}

/**
 * 获取 API Key
 */
function getApiKey() {
  const config = getConfig();
  return config.apiKey;
}

/**
 * 检查是否已配置 API Key
 */
function isConfigured() {
  const config = getConfig();
  return !!config.apiKey;
}

/**
 * 重置配置
 */
function resetConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
    }
    cachedConfig = null;
    return true;
  } catch (error) {
    throw new Error(`Failed to reset config: ${error.message}`);
  }
}

/**
 * 获取配置文件的路径
 */
function getConfigPath() {
  return CONFIG_FILE;
}

module.exports = {
  loadConfig,
  saveConfig,
  getConfig,
  setApiKey,
  getApiKey,
  isConfigured,
  resetConfig,
  getConfigPath,
  DEFAULT_CONFIG,
  CONFIG_FILE
};