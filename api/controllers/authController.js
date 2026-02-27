import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const register = async (req, res) => {
  try {
    console.log('Register Request Body:', req.body);
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: '用户已存在' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password_hash: hashedPassword,
      name
    });

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: '用户注册成功',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_premium: user.is_premium
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

export const login = async (req, res) => {
  try {
    console.log('Login Request Body:', req.body);
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: '凭证无效' });
    }

    console.log('User found:', user.id, user.email);
    console.log('Stored hash:', user.password_hash.substring(0, 30) + '...');

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: '凭证无效' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: '登录成功',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_premium: user.is_premium,
        avatar_url: user.avatar_url
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: '服务器内部错误' });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      is_premium: user.is_premium,
      avatar_url: user.avatar_url
    });
  } catch {
    res.status(500).json({ message: '服务器内部错误' });
  }
};
