import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    
    try {
      const dbUser = await User.findByPk(user.id);
      if (!dbUser) return res.sendStatus(403);
      req.user = dbUser;
      next();
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
};
