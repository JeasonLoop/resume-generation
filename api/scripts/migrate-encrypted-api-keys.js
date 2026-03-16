import { sequelize } from './models/index.js';
import User from './models/User.js';
import { encrypt } from './utils/encryption.js';

/**
 * 迁移脚本：将现有明文存储的API Key加密
 * 运行方式：cd api && node scripts/migrate-encrypted-api-keys.js
 */
const migrateEncryptedApiKeys = async () => {
  try {
    console.log('开始迁移API Key加密...');

    // 获取所有有自定义API Key的用户
    const users = await User.findAll({
      where: {
        custom_api_key: {
          [sequelize.Op.not]: null,
          [sequelize.Op.ne]: ''
        }
      }
    });

    console.log(`找到${users.length}个有自定义API Key的用户`);

    let migratedCount = 0;
    for (const user of users) {
      // 检查是否已经加密（包含:分隔符）
      if (user.custom_api_key.includes(':')) {
        console.log(`用户ID ${user.id} 的API Key已经加密，跳过`);
        continue;
      }

      // 加密并保存
      const encryptedKey = encrypt(user.custom_api_key);
      await user.update({ custom_api_key: encryptedKey }, { hooks: false });
      migratedCount++;
      console.log(`用户ID ${user.id} 的API Key加密完成`);
    }

    console.log(`迁移完成，共加密了${migratedCount}个用户的API Key`);
    process.exit(0);
  } catch (error) {
    console.error('迁移失败:', error);
    process.exit(1);
  }
};

migrateEncryptedApiKeys();
