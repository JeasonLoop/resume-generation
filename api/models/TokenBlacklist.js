import { DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';

const TokenBlacklist = sequelize.define('TokenBlacklist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'token_blacklist',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['token'],
      unique: true
    },
    {
      fields: ['expires_at']
    }
  ]
});

// 静态方法：添加Token到黑名单
TokenBlacklist.add = async (token, expiresAt) => {
  try {
    await TokenBlacklist.upsert({
      token,
      expires_at: expiresAt
    });
  } catch (error) {
    console.error('添加Token到黑名单失败:', error);
  }
};

// 静态方法：检查Token是否在黑名单中
TokenBlacklist.isBlacklisted = async (token) => {
  const count = await TokenBlacklist.count({
    where: {
      token,
      expires_at: {
        [Op.gt]: new Date()
      }
    }
  });
  return count > 0;
};

// 静态方法：清理过期的Token
TokenBlacklist.cleanupExpired = async () => {
  const deletedCount = await TokenBlacklist.destroy({
    where: {
      expires_at: {
        [Op.lt]: new Date()
      }
    }
  });
  console.log(`清理了${deletedCount}个过期的黑名单Token`);
  return deletedCount;
};

// 每小时自动清理一次过期Token
setInterval(() => {
  TokenBlacklist.cleanupExpired();
}, 60 * 60 * 1000);

export default TokenBlacklist;
