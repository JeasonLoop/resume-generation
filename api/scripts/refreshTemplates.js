
import { sequelize, Template } from '../models/index.js';
import { getTemplates } from '../data/templates.js';

async function refreshTemplates() {
  try {
    console.log('Starting template refresh...');

    // 1. 同步数据库结构（不重置数据）
    await sequelize.authenticate();
    console.log('Database connection established.');

    const templates = getTemplates();
    console.log(`Found ${templates.length} templates in data file.`);

    // 2. 获取数据库中现有的模板
    // const existingTemplates = await Template.findAll();
    // const existingNames = existingTemplates.map(t => t.name);
    // const newNames = templates.map(t => t.name);

    // 3. 删除旧模板数据
    console.log('Unlinking templates from existing resumes...');
    // 先将所有简历关联的模板 ID 置空，防止外键约束报错
    await sequelize.query('UPDATE resumes SET template_id = NULL');

    console.log('Clearing existing templates...');
    await Template.destroy({ where: {} });

    // 重置自增 ID (针对 SQLite)
    try {
      await sequelize.query('DELETE FROM sqlite_sequence WHERE name="templates"');
    } catch (e) {
      console.log(e, 'error');
      // 忽略找不到 sqlite_sequence 的错误
    }

    console.log('Existing templates cleared.');

    // 4. 插入新模板
    let createdCount = 0;

    for (const t of templates) {
      await Template.create(t);
      createdCount++;
    }

    console.log(`Refresh complete: ${createdCount} templates created.`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to refresh templates:', error);
    process.exit(1);
  }
}

refreshTemplates();
