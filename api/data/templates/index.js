import { minimalTemplates } from './minimal.js';
import { professionalTemplates } from './professional.js';
import { modernTemplates } from './modern.js';
import { elegantTemplates } from './elegant.js';
import { creativeTemplates } from './creative.js';
import { techTemplates } from './tech.js';
import { traditionalTemplates } from './traditional.js';

export const getTemplates = () => {
  return [
    ...minimalTemplates(),
    ...professionalTemplates(),
    ...modernTemplates(),
    ...elegantTemplates(),
    ...creativeTemplates(),
    ...techTemplates(),
    ...traditionalTemplates()
  ];
};

export { iconMail, iconPhone, iconLink, getCommonIconsCss } from './common.js';
