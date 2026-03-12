import axios from 'axios';
import { success, fail, ErrorCode } from '../utils/response.js';
import { User } from '../models/index.js';

const DEFAULT_BASE_URL = 'https://api.siliconflow.cn/v1';
const DEFAULT_MODEL = 'THUDM/GLM-Z1-9B-0414';
const MAX_CONTENT_LEN = 5000;
const FREE_USAGE_LIMIT = 20;

const getServerApiKey = () => process.env.SILICONFLOW_API_KEY || process.env.OPENAI_API_KEY;

const isValidApiKey = (key) => {
  if (!key) return false;
  if (key.startsWith('your_')) return false;
  if (key.length < 20) return false;
  return true;
};

const resolveConfig = (user) => {
  const hasCustomKey = isValidApiKey(user.custom_api_key);
  return {
    apiKey: hasCustomKey ? user.custom_api_key : getServerApiKey(),
    baseUrl: (hasCustomKey && user.custom_base_url) || DEFAULT_BASE_URL,
    model: (hasCustomKey && user.custom_model) || DEFAULT_MODEL,
    isCustom: hasCustomKey,
  };
};

const buildClient = (config) => {
  return axios.create({
    baseURL: config.baseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
  });
};

const callChatCompletion = async (config, messages, options = {}) => {
  const { maxTokens = 1000, temperature = 0.7 } = options;
  const client = buildClient(config);
  const response = await client.post('/chat/completions', {
    model: config.model,
    messages,
    max_tokens: maxTokens,
    temperature,
  });
  return response.data.choices[0].message.content.trim();
};

const checkAndIncrementUsage = async (user, isCustom) => {
  if (isCustom) return null;

  if (!isValidApiKey(getServerApiKey())) {
    return { mock: true };
  }

  if (user.ai_usage_count >= FREE_USAGE_LIMIT) {
    return {
      limited: true,
      message: `内置 AI 免费额度已用完（${FREE_USAGE_LIMIT} 次），为避免资源被过多占用，请配置自己的 API Key 以继续使用`,
    };
  }

  await User.increment('ai_usage_count', { where: { id: user.id } });
  return null;
};

const parseAIError = (error) => {
  const status = error.response?.status;
  const data = error.response?.data;
  if (error.code === 'ECONNABORTED') return 'AI 服务响应超时，请稍后重试';
  if (status === 401 || status === 403) return 'API Key 无效或已过期，请检查配置';
  if (status === 404) return '模型不可用，请检查模型名称是否正确';
  if (status === 429) return 'AI 请求过于频繁，请稍后重试';
  if (data?.error?.message) return `AI 服务错误: ${data.error.message}`;
  return 'AI 服务暂时不可用，请稍后重试';
};

export const optimizeContent = async (req, res) => {
  try {
    const { content, type, industry } = req.body;

    if (!content || typeof content !== 'string') {
      return fail(res, ErrorCode.BAD_REQUEST, '请提供需要优化的内容');
    }
    if (content.length > MAX_CONTENT_LEN) {
      return fail(res, ErrorCode.VALIDATION_ERROR, `内容过长，最多支持 ${MAX_CONTENT_LEN} 个字符`);
    }

    const user = await User.findByPk(req.user.id);
    const config = resolveConfig(user);
    const usageCheck = await checkAndIncrementUsage(user, config.isCustom);

    if (usageCheck?.limited) {
      return fail(res, ErrorCode.FORBIDDEN, usageCheck.message);
    }
    if (usageCheck?.mock) {
      return success(res, {
        optimized: `[AI 模拟结果]\n\n针对 ${industry || '通用'} 行业优化建议：\n\n${content}\n\n优化亮点：\n1. 使用了更具影响力的动词\n2. 强调了量化成果\n3. 调整了语气，使其更具职业素养`,
        isMock: true,
      });
    }

    const sectionLabel = type || '简历';
    const industryLabel = industry || '通用';

    const messages = [
      {
        role: 'system',
        content: `你是一位专业的简历优化专家，擅长${industryLabel}行业的简历撰写。请直接输出优化后的内容，保持 Markdown 格式，不要包含任何说明、解释或问候语。只用中文回答。`,
      },
      {
        role: 'user',
        content: `请优化以下${sectionLabel}部分的内容，使其适用于${industryLabel}行业。

要求：
1. 语气专业、自信
2. 使用强有力的动词（如：主导、负责、提升、优化、推动）
3. 尽量量化成就（百分比、数字）
4. 保持简洁，每条不超过两行

原始内容：
${content}

优化后的内容：`,
      },
    ];

    const remaining = config.isCustom ? null : Math.max(0, FREE_USAGE_LIMIT - user.ai_usage_count - 1);
    const optimized = await callChatCompletion(config, messages, { maxTokens: 800, temperature: 0.7 });
    return success(res, { optimized, remaining });
  } catch (error) {
    console.error('AI Optimize error:', error.response?.data || error.message);
    return fail(res, ErrorCode.THIRD_PARTY_ERROR, parseAIError(error));
  }
};

export const generateSuggestions = async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return fail(res, ErrorCode.BAD_REQUEST, '请提供提示内容');
    }
    if (prompt.length > MAX_CONTENT_LEN) {
      return fail(res, ErrorCode.VALIDATION_ERROR, `内容过长，最多支持 ${MAX_CONTENT_LEN} 个字符`);
    }

    const user = await User.findByPk(req.user.id);
    const config = resolveConfig(user);
    const usageCheck = await checkAndIncrementUsage(user, config.isCustom);

    if (usageCheck?.limited) {
      return fail(res, ErrorCode.FORBIDDEN, usageCheck.message);
    }
    if (usageCheck?.mock) {
      return success(res, {
        suggestion: `[AI 模拟建议]\n\n基于您的请求「${prompt.substring(0, 50)}」：\n\n- 建议使用更具体的数据来支撑成就描述\n- 可以增加项目背景说明，让读者更好理解\n- 建议突出个人在团队中的独特贡献`,
        isMock: true,
      });
    }

    const contextStr = context ? `\n当前简历内容摘要: ${JSON.stringify(context).substring(0, 1000)}` : '';

    const messages = [
      {
        role: 'system',
        content: '你是一位专业的简历写作顾问。请直接给出具体、可操作的建议，使用 Markdown 列表格式。不要包含问候语或多余的说明。只用中文回答。',
      },
      {
        role: 'user',
        content: `${contextStr}\n\n用户请求: ${prompt}\n\n请给出具体建议：`,
      },
    ];

    const remaining = config.isCustom ? null : Math.max(0, FREE_USAGE_LIMIT - user.ai_usage_count - 1);
    const suggestion = await callChatCompletion(config, messages, { maxTokens: 600, temperature: 0.7 });
    return success(res, { suggestion, remaining });
  } catch (error) {
    console.error('AI Suggest error:', error.response?.data || error.message);
    return fail(res, ErrorCode.THIRD_PARTY_ERROR, parseAIError(error));
  }
};

export const getAiStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const hasCustomKey = isValidApiKey(user.custom_api_key);
    return success(res, {
      usageCount: user.ai_usage_count,
      limit: FREE_USAGE_LIMIT,
      remaining: hasCustomKey ? null : Math.max(0, FREE_USAGE_LIMIT - user.ai_usage_count),
      hasCustomKey,
      customBaseUrl: user.custom_base_url || '',
      customModel: user.custom_model || '',
    });
  } catch (error) {
    console.error('AI Status error:', error.message);
    return fail(res, ErrorCode.INTERNAL_ERROR, '获取 AI 状态失败');
  }
};

export const updateAiConfig = async (req, res) => {
  try {
    const { apiKey, baseUrl, model } = req.body;

    if (apiKey !== undefined && apiKey !== '' && !isValidApiKey(apiKey)) {
      return fail(res, ErrorCode.VALIDATION_ERROR, 'API Key 格式无效（至少 20 个字符）');
    }
    if (baseUrl !== undefined && baseUrl !== '') {
      try { new URL(baseUrl); } catch { return fail(res, ErrorCode.VALIDATION_ERROR, 'Base URL 格式无效'); }
    }
    if (model !== undefined && model.length > 100) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '模型名称过长');
    }

    const updateData = {};
    if (apiKey !== undefined) updateData.custom_api_key = apiKey || null;
    if (baseUrl !== undefined) updateData.custom_base_url = baseUrl || null;
    if (model !== undefined) updateData.custom_model = model || null;

    await User.update(updateData, { where: { id: req.user.id } });

    const user = await User.findByPk(req.user.id);
    const hasCustomKey = isValidApiKey(user.custom_api_key);

    return success(res, {
      hasCustomKey,
      customBaseUrl: user.custom_base_url || '',
      customModel: user.custom_model || '',
      remaining: hasCustomKey ? null : Math.max(0, FREE_USAGE_LIMIT - user.ai_usage_count),
    });
  } catch (error) {
    console.error('AI Config update error:', error.message);
    return fail(res, ErrorCode.INTERNAL_ERROR, '更新配置失败');
  }
};
