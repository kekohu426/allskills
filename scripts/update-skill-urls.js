const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/skills-content.json', 'utf8'));
const slugs = Object.keys(data).sort();
const d = new Date();
const pad = n => String(n).padStart(2, '0');
const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const lines = [
  '# AllSkills.cn Skill URLs',
  '',
  `Last Updated: ${date}`,
  `Published: ${date}`,
  '',
  `Total Skills: ${slugs.length}`,
  '',
  '## URLs',
  '',
  ...slugs.map(s => `- https://allskills.cn/skills/${s}`)
];
fs.writeFileSync('docs/skill-urls.md', lines.join('\n'), 'utf8');
console.log('Updated docs/skill-urls.md with', slugs.length, 'skills');
