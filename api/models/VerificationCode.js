import { DataTypes, Op } from 'sequelize';
import sequelize from '../config/database.js';

const VerificationCode = sequelize.define('VerificationCode', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('password_reset', 'email_verification'),
    allowNull: false,
    defaultValue: 'password_reset'
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'verification_codes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['email', 'type', 'used']
    },
    {
      fields: ['expires_at']
    }
  ]
});

// 静态方法：生成验证码
VerificationCode.generate = async (email, type = 'password_reset') => {
  // 生成6位数字验证码
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // 有效期5分钟
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // 将该邮箱之前同类型未使用的验证码标记为已使用
  await VerificationCode.update(
    { used: true },
    {
      where: {
        email,
        type,
        used: false,
        expires_at: { [Op.gt]: new Date() }
      }
    }
  );

  // 创建新的验证码
  await VerificationCode.create({
    email,
    code,
    type,
    expires_at: expiresAt
  });

  return code;
};

// 静态方法：验证验证码
VerificationCode.verify = async (email, code, type = 'password_reset') => {
  const verificationCode = await VerificationCode.findOne({
    where: {
      email,
      code,
      type,
      used: false,
      expires_at: { [Op.gt]: new Date() }
    }
  });

  if (!verificationCode) {
    return false;
  }

  // 标记为已使用
  await verificationCode.update({ used: true });

  return true;
};

// 静态方法：清理过期验证码
VerificationCode.cleanupExpired = async () => {
  const deletedCount = await VerificationCode.destroy({
    where: {
      expires_at: { [Op.lt]: new Date() }
    }
  });
  console.log(`清理了${deletedCount}个过期的验证码`);
  return deletedCount;
};

// 每小时清理一次过期验证码
setInterval(() => {
  VerificationCode.cleanupExpired();
}, 60 * 60 * 1000);

export default VerificationCode;
