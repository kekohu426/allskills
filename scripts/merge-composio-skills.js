const fs = require('fs');
const path = require('path');

// 读取现有的 skills
const existingSkills = JSON.parse(fs.readFileSync('data/skills-content.json', 'utf8'));
console.log('现有 skills 数量:', Object.keys(existingSkills).length);

// 读取 Composio skills
const composioDir = 'external/composio-awesome-claude-skills';

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };

  const frontmatter = match[1];
  const body = match[2];
  const data = {};

  const lines = frontmatter.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  }

  return { data, content: body };
}

function findSkillFiles(dir, out) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        findSkillFiles(fullPath, out);
      } else if (entry.isFile() && entry.name === 'SKILL.md') {
        out.push(fullPath);
      }
    }
  } catch (err) {}
}

const skillFiles = [];
findSkillFiles(composioDir, skillFiles);

let added = 0;
let skipped = 0;
for (const filePath of skillFiles) {
  if (filePath.includes('/template-skill/') || filePath.includes('/template/')) continue;

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(raw);
    const slug = 'composio-' + path.basename(path.dirname(filePath));

    if (!existingSkills[slug]) {
      existingSkills[slug] = {
        name: parsed.data.name || slug,
        description: parsed.data.description || '',
        body: parsed.content.trim(),
        sourceLabel: 'composio-awesome-claude-skills',
        sourceUrl: 'https://github.com/ComposioHQ/awesome-claude-skills',
        license: 'MIT'
      };
      added++;
      console.log('✓ 添加:', slug);
    } else {
      skipped++;
      console.log('⊘ 跳过（已存在）:', slug);
    }
  } catch (err) {
    console.error('✗ 错误:', filePath, err.message);
  }
}

fs.writeFileSync('data/skills-content.json', JSON.stringify(existingSkills, null, 2), 'utf8');
console.log('\n总计:', Object.keys(existingSkills).length, 'skills');
console.log('新增:', added, 'skills');
console.log('跳过:', skipped, 'skills');
