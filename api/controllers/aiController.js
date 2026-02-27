import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// SiliconFlow API configuration
const SILICONFLOW_API_KEY = process.env.SILICONFLOW_API_KEY || process.env.OPENAI_API_KEY;
const SILICONFLOW_BASE_URL = 'https://api.siliconflow.cn/v1';
const MODEL_NAME = 'Pro/zai-org/GLM-4.7';

// Create axios instance
const apiClient = axios.create({
  baseURL: SILICONFLOW_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SILICONFLOW_API_KEY}`,
  },
});

// Helper function to call chat completions
const callChatCompletion = async (messages, options = {}) => {
  try {
    const response = await apiClient.post('/chat/completions', {
      model: MODEL_NAME,
      messages: messages,
      max_tokens: options.maxTokens || 1000,
      temperature: options.temperature || 0.7,
      ...options,
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const optimizeContent = async (req, res) => {
  try {
    const { content, type, industry } = req.body;

    if (!SILICONFLOW_API_KEY || SILICONFLOW_API_KEY.includes('your_openai_api_key') || SILICONFLOW_API_KEY.includes('sk-hmldnzdfarkzmvvnzqxasgaqdznjpjfvxyqczpmifbmwtqda')) {
      // Mock response if no valid API key
      return res.json({
        optimized: `[AI 模拟结果]\n\n针对 ${industry || '通用'} 行业优化建议：\n\n${content}\n\n👉 优化亮点：\n1. 使用了更具影响力的动词。\n2. 强调了量化成果。\n3. 调整了语气，使其更具职业素养。`
      });
    }

    const messages = [
      {
        role: 'system',
        content: '你是一位专业的简历优化专家。请直接输出优化后的内容，不要包含任何说明、解释或问候语。只用中文回答。'
      },
      {
        role: 'user',
        content: `请优化以下 ${type} 部分的内容，使其适用于 ${industry || '通用'} 行业。

要求：
1. 语气专业、自信。
2. 尽量使用强有力的动词（如：主导、负责、提升、优化）。
3. 如果可能，量化成就。

原始内容：
"${content}"

优化后的内容：`
      }
    ];

    const optimized = await callChatCompletion(messages, {
      maxTokens: 800,
      temperature: 0.7,
    });

    res.json({ optimized });
  } catch (error) {
    console.error('AI Optimize error:', error);
    res.status(500).json({ message: 'AI 服务暂时不可用' });
  }
};

export const generateSuggestions = async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (!SILICONFLOW_API_KEY || SILICONFLOW_API_KEY.includes('your_openai_api_key') || SILICONFLOW_API_KEY.includes('sk-hmldnzdfarkzmvvnzqxasgaqdznjpjfvxyqczpmifbmwtqda')) {
      return res.json({
        suggestion: `[AI 建议]\n基于您的请求 "${prompt}"，我有以下建议：\n- 建议点 1\n- 建议点 2\n- 建议点 3`
      });
    }

    const messages = [
      {
        role: 'system',
        content: '你是一位专业的简历写作顾问。请直接给出建议内容，不要包含问候语或多余的说明。只用中文回答。'
      },
      {
        role: 'user',
        content: `上下文信息: ${JSON.stringify(context)}\n用户请求: ${prompt}\n请给出建议：`
      }
    ];

    const suggestion = await callChatCompletion(messages, {
      maxTokens: 500,
      temperature: 0.7,
    });

    res.json({ suggestion });
  } catch (error) {
    console.error('AI Suggest error:', error);
    res.status(500).json({ message: 'AI 服务暂时不可用' });
  }
};
