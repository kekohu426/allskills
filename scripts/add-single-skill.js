#!/usr/bin/env node
/**
 * 添加单个 skill 到数据库
 * 用法: node scripts/add-single-skill.js <source-name> <source-url>
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/add-single-skill.js <source-name> <source-url>');
  console.error('Example: node scripts/add-single-skill.js vercel-cache https://github.com/vercel/next.js');
  process.exit(1);
}

const [sourceName, sourceUrl] = args;
const skillPath = path.join('external', sourceName, 'SKILL.md');

if (!fs.existsSync(skillPath)) {
  console.error(`Error: ${skillPath} not found`);
  console.error(`Please download SKILL.md first to external/${sourceName}/`);
  process.exit(1);
}

// 读取现有 skills
const existingSkills = JSON.parse(
  fs.readFileSync('data/skills-content.json', 'utf8')
);

// 读取新 skill
const skillMd = fs.readFileSync(skillPath, 'utf8');

// 解析 frontmatter
const frontmatterMatch = skillMd.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
const body = frontmatterMatch ? frontmatterMatch[2] : skillMd;

// 提取元数据
const nameMatch = frontmatter.match(/name:\s*(.+)/);
const descMatch = frontmatter.match(/description:\s*\|?\s*([\s\S]*?)(?=\n\w+:|$)/);

const name = nameMatch ? nameMatch[1].trim() : sourceName;
const description = descMatch
  ? descMatch[1].trim().replace(/\n\s+/g, ' ')
  : 'No description available';

// 生成 slug
const slug = sourceName;

// 检查是否已存在
if (existingSkills[slug]) {
  console.warn(`⚠ Warning: Skill '${slug}' already exists. Overwriting...`);
}

// 添加到数据库
existingSkills[slug] = {
  name: name,
  description: description,
  body: body.trim(),
  sourceLabel: sourceName,
  sourceUrl: sourceUrl,
  license: 'MIT'
};

// 保存
fs.writeFileSync(
  'data/skills-content.json',
  JSON.stringify(existingSkills, null, 2),
  'utf8'
);

console.log('✓ Added skill:', slug);
console.log('  Name:', name);
console.log('  Description:', description.substring(0, 100) + (description.length > 100 ? '...' : ''));
console.log('  Source:', sourceUrl);
console.log('\nTotal skills:', Object.keys(existingSkills).length);
console.log('\nNext steps:');
console.log('1. Update SKILL_SOURCES.md');
console.log('2. Run: npm run build');
console.log('3. Commit and push changes');
