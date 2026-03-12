import { Template } from '../models/index.js';
import { success, fail, ErrorCode } from '../utils/response.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    return success(res, templates);
  } catch (error) {
    console.error('Get templates error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findByPk(id);
    if (!template) {
      return fail(res, ErrorCode.NOT_FOUND, '模板不存在');
    }
    return success(res, template);
  } catch (error) {
    console.error('Get template error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};
