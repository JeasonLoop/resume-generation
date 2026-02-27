import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Resume = sequelize.define('Resume', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  template_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content_json: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content_markdown: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'resumes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Resume;
