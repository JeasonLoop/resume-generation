import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = process.env.DATABASE_PATH || path.join(__dirname, '../../database.sqlite');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
  logging: false
});

export default sequelize;
