import nodemailer from 'nodemailer';

const NODE_ENV = process.env.NODE_ENV || 'development';

// 邮件配置
const getMailConfig = () => {
  // 开发环境下使用Ethereal测试邮箱，不需要配置真实SMTP
  if (NODE_ENV === 'development') {
    return {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'your-ethereal-user',
        pass: process.env.SMTP_PASS || 'your-ethereal-pass'
      }
    };
  }

  // 生产环境使用真实SMTP配置
  return {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };
};

// 创建邮件传输器
let transporter = null;

const initTransporter = async () => {
  if (transporter) return transporter;

  try {
    const config = getMailConfig();

    // 开发环境如果没有配置SMTP，使用模拟发送
    if (NODE_ENV === 'development' && (!config.auth.user || config.auth.user === 'your-ethereal-user')) {
      console.warn('[DEV] 未配置SMTP服务，验证码将输出到控制台');
      transporter = {
        sendMail: async (options) => {
          console.log('\n==================== 邮件内容 ====================');
          console.log(`收件人: ${options.to}`);
          console.log(`主题: ${options.subject}`);
          console.log(`内容:\n${options.text || options.html}`);
          console.log('==================================================\n');
          return { messageId: 'dev-fake-message-id' };
        }
      };
      return transporter;
    }

    transporter = nodemailer.createTransport(config);

    // 验证连接
    await transporter.verify();
    console.log('SMTP 服务连接成功');
    return transporter;
  } catch (error) {
    console.error('SMTP 服务初始化失败:', error);
    // 失败后使用模拟发送
    transporter = {
      sendMail: async (options) => {
        console.log('\n==================== 邮件内容 ====================');
        console.log(`收件人: ${options.to}`);
        console.log(`主题: ${options.subject}`);
        console.log(`内容:\n${options.text || options.html}`);
        console.log('==================================================\n');
        return { messageId: 'fallback-fake-message-id' };
      }
    };
    return transporter;
  }
};

/**
 * 发送密码重置验证码邮件
 * @param {string} email 收件人邮箱
 * @param {string} code 6位验证码
 * @returns {Promise<boolean>} 发送是否成功
 */
export const sendPasswordResetCode = async (email, code) => {
  try {
    const transporter = await initTransporter();

    const mailOptions = {
      from: process.env.SMTP_FROM || '"简历生成平台" <no-reply@example.com>',
      to: email,
      subject: '密码重置验证码',
      text: `您的密码重置验证码是：${code}\n\n该验证码5分钟内有效，请不要泄露给他人。\n如果您没有请求重置密码，请忽略此邮件。`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>密码重置验证码</h2>
          <p>您好！</p>
          <p>您收到这封邮件是因为您请求了密码重置。</p>
          <p style="font-size: 24px; font-weight: bold; color: #2563eb; letter-spacing: 4px; padding: 10px; background: #eff6ff; border-radius: 6px; text-align: center;">
            ${code}
          </p>
          <p>该验证码 <strong>5分钟内有效</strong>，请不要泄露给他人。</p>
          <p>如果您没有请求重置密码，请忽略此邮件，您的账号不会受到任何影响。</p>
          <hr>
          <p style="color: #6b7280; font-size: 12px;">
            此邮件由系统自动发送，请勿直接回复。
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('发送邮件失败:', error);
    return false;
  }
};
