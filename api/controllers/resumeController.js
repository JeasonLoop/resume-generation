import { Resume, Template } from '../models/index.js';
import { success, fail, paginated, ErrorCode } from '../utils/response.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const createResume = async (req, res) => {
  try {
    const { title, template_id, content_json, content_markdown, is_public } = req.body;
    const user_id = req.user.id;

    const resume = await Resume.create({
      user_id,
      title,
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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
