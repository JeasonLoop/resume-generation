import { Resume, Template } from '../models/index.js';

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

    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: '服务器内部错误' });
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

    res.json({
      resumes: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: '服务器内部错误' });
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
      return res.status(404).json({ message: '未找到简历' });
    }

    // Parse content_json if it's a string
    if (typeof resume.content_json === 'string') {
        try {
            resume.content_json = JSON.parse(resume.content_json);
        } catch {
            // keep as string if parse fails
        }
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const { title, template_id, content_json, content_markdown, is_public } = req.body;

    const resume = await Resume.findOne({ where: { id, user_id } });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    await resume.update({
      title: title || resume.title,
      template_id: template_id || resume.template_id,
      content_json: content_json ? JSON.stringify(content_json) : resume.content_json,
      content_markdown: content_markdown !== undefined ? content_markdown : resume.content_markdown,
      is_public: is_public !== undefined ? is_public : resume.is_public
    });

    res.json(resume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: '服务器内部错误' });
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
      return res.status(404).json({ message: '未找到简历' });
    }

    res.json({ message: '简历删除成功' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

export const deleteResumesBatch = async (req, res) => {
  try {
    const { ids } = req.body;
    const user_id = req.user.id;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: '未提供有效的简历ID' });
    }

    const deletedCount = await Resume.destroy({
      where: {
        id: ids,
        user_id
      }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: '未找到可删除的简历' });
    }

    res.json({ message: `成功删除 ${deletedCount} 份简历` });
  } catch (error) {
    console.error('Batch delete resume error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};
