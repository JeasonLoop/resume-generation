import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ExportHistory = sequelize.define('ExportHistory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  resume_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  export_format: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'export_history',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default ExportHistory;
