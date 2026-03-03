import { Resume, Template } from '../models/index.js';
import { success, fail, paginated, ErrorCode } from '../utils/response.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const createResume = async (req, res) => {
  try {
    const { title, template_id, content_json, content_markdown, is_public } = req.body;
    const user_id = req.user.id;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return fail(res, ErrorCode.VALIDATION_ERROR, '请提供简历标题');
    }

    if (template_id) {
      const template = await Template.findByPk(template_id);
      if (!template) {
        return fail(res, ErrorCode.NOT_FOUND, '模板不存在');
      }
      if (template.is_premium && !req.user.is_premium) {
        return fail(res, ErrorCode.FORBIDDEN, '该模板为高级模板，请升级会员后使用');
      }
    }

    const resume = await Resume.create({
      user_id,
      title: title.trim(),
      template_id,
      content_json: JSON.stringify(content_json),
      content_markdown,
      is_public
    });

    return success(res, resume, '简历创建成功');
  } catch (error) {
    console.error('Create resume error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const getResumes = async (req, res) => {
  try {
    const user_id = req.user.id;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;

    const { count, rows } = await Resume.findAndCountAll({
      where: { user_id },
      limit,
      offset,
      order: [['updated_at', 'DESC']],
      include: [{ model: Template, attributes: ['name', 'id'] }]
    });

    return paginated(res, rows, count, page, limit);
  } catch (error) {
    console.error('Get resumes error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const resume = await Resume.findOne({
      where: { id, user_id },
      include: [{ model: Template }]
    });

    if (!resume) {
      return fail(res, ErrorCode.NOT_FOUND, '未找到简历');
    }

    // Parse content_json if it's a string
    if (typeof resume.content_json === 'string') {
      try {
        resume.content_json = JSON.parse(resume.content_json);
      } catch {
        // keep as string if parse fails
      }
    }

    return success(res, resume);
  } catch (error) {
    console.error('Get resume error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { title, template_id, content_json, content_markdown, is_public } = req.body;

    const resume = await Resume.findOne({ where: { id, user_id } });

    if (!resume) {
      return fail(res, ErrorCode.NOT_FOUND, '简历不存在');
    }

    if (template_id && template_id !== resume.template_id) {
      const template = await Template.findByPk(template_id);
      if (!template) {
        return fail(res, ErrorCode.NOT_FOUND, '模板不存在');
      }
      if (template.is_premium && !req.user.is_premium) {
        return fail(res, ErrorCode.FORBIDDEN, '该模板为高级模板，请升级会员后使用');
      }
    }

    await resume.update({
      title: title || resume.title,
      template_id: template_id || resume.template_id,
      content_json: content_json ? JSON.stringify(content_json) : resume.content_json,
      content_markdown: content_markdown !== undefined ? content_markdown : resume.content_markdown,
      is_public: is_public !== undefined ? is_public : resume.is_public
    });

    return success(res, resume, '简历更新成功');
  } catch (error) {
    console.error('Update resume error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const deleted = await Resume.destroy({
      where: { id, user_id }
    });

    if (!deleted) {
      return fail(res, ErrorCode.NOT_FOUND, '未找到简历');
    }

    return success(res, null, '简历删除成功');
  } catch (error) {
    console.error('Delete resume error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};

export const deleteResumesBatch = async (req, res) => {
  try {
    const { ids } = req.body;
    const user_id = req.user.id;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return fail(res, ErrorCode.BAD_REQUEST, '未提供有效的简历ID');
    }
    if (ids.length > 100 || !ids.every(id => Number.isInteger(id) && id > 0)) {
      return fail(res, ErrorCode.VALIDATION_ERROR, 'ID 列表格式不正确');
    }

    const deletedCount = await Resume.destroy({
      where: {
        id: ids,
        user_id
      }
    });

    if (deletedCount === 0) {
      return fail(res, ErrorCode.NOT_FOUND, '未找到可删除的简历');
    }

    return success(res, { deletedCount }, `成功删除 ${deletedCount} 份简历`);
  } catch (error) {
    console.error('Batch delete resume error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};
