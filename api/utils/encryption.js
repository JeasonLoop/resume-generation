import crypto from 'crypto';

const ENCRYPTION_ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;

// 从环境变量获取加密密钥
const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ENCRYPTION_KEY environment variable is required in production');
    }
    // 开发环境默认密钥，仅用于开发测试
    return Buffer.from('dev_encryption_key_32bytes_long_12345678', 'utf8');
  }
  if (key.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be 32 bytes long');
  }
  return Buffer.from(key, 'utf8');
};

/**
 * AES-256-GCM加密
 * @param {string} plaintext 明文
 * @returns {string} 加密后的字符串，格式：salt:iv:tag:ciphertext
 */
export const encrypt = (plaintext) => {
  if (!plaintext) return plaintext;

  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getEncryptionKey();

  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    salt.toString('base64'),
    iv.toString('base64'),
    tag.toString('base64'),
    encrypted.toString('base64')
  ].join(':');
};

/**
 * AES-256-GCM解密
 * @param {string} encryptedText 加密后的字符串
 * @returns {string} 明文
 */
export const decrypt = (encryptedText) => {
  if (!encryptedText || !encryptedText.includes(':')) return encryptedText;

  try {
    const [salt, iv, tag, ciphertext] = encryptedText.split(':').map(part => Buffer.from(part, 'base64'));
    const key = getEncryptionKey();

    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption failed:', error.message);
    return null;
  }
};
