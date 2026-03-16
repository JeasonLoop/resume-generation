import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { encrypt, decrypt } from '../utils/encryption.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_premium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  ai_usage_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  custom_api_key: {
    type: DataTypes.STRING,
    allowNull: true
  },
  custom_base_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  custom_model: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    // 保存前加密敏感字段
    beforeSave: (user) => {
      if (user.changed('custom_api_key') && user.custom_api_key) {
        // 只有当API Key是明文且未加密时才加密
        if (!user.custom_api_key.includes(':')) {
          user.custom_api_key = encrypt(user.custom_api_key);
        }
      }
    },
    // 查询后解密敏感字段
    afterFind: (user) => {
      if (Array.isArray(user)) {
        // 处理批量查询结果
        user.forEach(u => {
          if (u.custom_api_key) {
            u.custom_api_key = decrypt(u.custom_api_key) || u.custom_api_key;
          }
        });
      } else if (user && user.custom_api_key) {
        // 处理单个查询结果
        user.custom_api_key = decrypt(user.custom_api_key) || user.custom_api_key;
      }
    }
  }
});

export default User;
