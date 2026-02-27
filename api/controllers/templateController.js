import { Template } from '../models/index.js';

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.json(templates);
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findByPk(id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
