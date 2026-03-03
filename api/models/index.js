import sequelize from '../config/database.js';
import User from './User.js';
import Template from './Template.js';
import Resume from './Resume.js';
import ExportHistory from './ExportHistory.js';

User.hasMany(Resume, { foreignKey: 'user_id' });
Resume.belongsTo(User, { foreignKey: 'user_id' });

Template.hasMany(Resume, { foreignKey: 'template_id' });
Resume.belongsTo(Template, { foreignKey: 'template_id' });

// ExportHistory: 预留功能，暂未启用
Resume.hasMany(ExportHistory, { foreignKey: 'resume_id' });
ExportHistory.belongsTo(Resume, { foreignKey: 'resume_id' });

export {
  sequelize,
  User,
  Template,
  Resume,
};
