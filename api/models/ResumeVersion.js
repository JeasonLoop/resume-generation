import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ResumeVersion = sequelize.define('ResumeVersion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  resume_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content_markdown: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content_json: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  version_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'resume_versions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default ResumeVersion;
