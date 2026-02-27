import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Template = sequelize.define('Template', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  style: {
    type: DataTypes.STRING,
    allowNull: false
  },
  css_styles: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  structure_json: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_premium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  usage_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'templates',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false // Templates usually don't need updated_at, but we can keep it if needed. The SQL says created_at only.
});

export default Template;
