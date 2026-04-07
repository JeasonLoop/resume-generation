import { Resume, Template } from '../models/index.js';
import { success, fail, ErrorCode } from '../utils/response.js';

const NODE_ENV = process.env.NODE_ENV || 'development';

// 获取公开简历
export const getPublicResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resumeId = parseInt(id);
    if (!resumeId || isNaN(resumeId)) {
      return fail(res, ErrorCode.BAD_REQUEST, '无效的简历ID');
    }

    const resume = await Resume.findOne({
      where: { id: resumeId, is_public: true },
      include: [{ model: Template }]
    });

    if (!resume) {
      return fail(res, ErrorCode.NOT_FOUND, '简历不存在或未公开');
    }

    // Parse content_json
    if (typeof resume.content_json === 'string') {
      try {
        resume.content_json = JSON.parse(resume.content_json);
      } catch {
        // keep as string
      }
    }

    return success(res, resume);
  } catch (error) {
    console.error('Get public resume error:', error);
    const message = NODE_ENV === 'production' ? '服务器内部错误' : error.message;
    return fail(res, ErrorCode.INTERNAL_ERROR, message);
  }
};
