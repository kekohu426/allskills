# Skill 上线流程

这是一个标准化的 Skill 上线流程文档，用于指导如何将新的 Claude Skills 集成到 AllSkills.cn 网站。

## 📋 上线前检查清单

### 1. 来源验证
- [ ] 确认来源可靠（官方仓库、知名开源项目、可信贡献者）
- [ ] 检查开源协议（MIT、Apache 2.0 或其他兼容协议）
- [ ] 验证内容质量（是否有完整文档、示例、使用说明）
- [ ] 确认没有重复（检查是否已存在相同或类似的 skill）

### 2. 格式检查
- [ ] 包含 SKILL.md 文件（或可转换为该格式）
- [ ] 有清晰的 name 和 description
- [ ] 内容结构完整（使用场景、示例、说明）
- [ ] Markdown 格式正确

### 3. 分类归属
- [ ] 确定所属分类（Design, Dev Tools, Writing, etc.）
- [ ] 添加适当的标签
- [ ] 确认中英文名称和描述

---

## 🔄 标准上线流程

### 阶段 1：发现与评估

**输入**：GitHub URL 或 Skill 源链接

**步骤**：
1. 访问源链接，查看仓库结构
2. 阅读 README 和文档
3. 评估质量和适用性
4. 检查开源协议

**输出**：决定是否上线

**工具**：
```bash
# 查看仓库信息
gh repo view <repo-url>

# 检查文件结构
curl -s <api-url> | jq '.tree[] | select(.path | contains("SKILL"))'
```

---

### 阶段 2：下载与准备

**步骤**：
1. 在 `external/` 目录创建源目录
2. 下载所有相关文件（SKILL.md 及其他参考文档）
3. 验证文件完整性

**命令模板**：
```bash
# 创建目录
mkdir -p external/<source-name>

# 下载 SKILL.md
curl -sL "<raw-github-url>/SKILL.md" -o external/<source-name>/SKILL.md

# 下载其他文件（如果有）
curl -sL "<raw-github-url>/PATTERNS.md" -o external/<source-name>/PATTERNS.md
curl -sL "<raw-github-url>/REFERENCE.md" -o external/<source-name>/REFERENCE.md
```

**验证**：
```bash
# 检查文件是否下载成功
ls -lh external/<source-name>/

# 验证文件不为空
[ -s external/<source-name>/SKILL.md ] && echo "✓ SKILL.md OK" || echo "✗ SKILL.md empty"
```

---

### 阶段 3：数据库集成

**步骤**：
1. 读取 SKILL.md 内容
2. 解析 frontmatter（name, description）
3. 合并多个文档（如果有）
4. 添加到 `data/skills-content.json`

**脚本模板**：
```javascript
const fs = require('fs');

// 读取现有 skills
const existingSkills = JSON.parse(
  fs.readFileSync('data/skills-content.json', 'utf8')
);

// 读取新 skill
const skillMd = fs.readFileSync('external/<source-name>/SKILL.md', 'utf8');

// 解析 frontmatter
const frontmatterMatch = skillMd.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
const body = frontmatterMatch ? frontmatterMatch[2] : skillMd;

// 提取元数据
const nameMatch = frontmatter.match(/name:\s*(.+)/);
const descMatch = frontmatter.match(/description:\s*\|?\s*([\s\S]*?)(?=\n\w+:|$)/);

const name = nameMatch ? nameMatch[1].trim() : '<skill-name>';
const description = descMatch
  ? descMatch[1].trim().replace(/\n\s+/g, ' ')
  : '<description>';

// 添加到数据库
const slug = '<source-name>';
existingSkills[slug] = {
  name: name,
  description: description,
  body: body.trim(),
  sourceLabel: '<source-label>',
  sourceUrl: '<source-url>',
  license: 'MIT'
};

// 保存
fs.writeFileSync(
  'data/skills-content.json',
  JSON.stringify(existingSkills, null, 2),
  'utf8'
);

console.log('✓ Added skill:', slug);
console.log('Total skills:', Object.keys(existingSkills).length);
```

**执行**：
```bash
node scripts/add-single-skill.js
```

---

### 阶段 4：更新追踪文件

**步骤**：
1. 打开 `SKILL_SOURCES.md`
2. 在"Currently Integrated Sources"部分添加新条目
3. 更新统计数据

**模板**：
```markdown
### ✅ <Source Name> ⭐ NEW
- **Repository**: [<repo-name>](<repo-url>)
- **Status**: ✅ Integrated
- **Skills Count**: <number> skill(s)
- **Last Sync**: <date>
- **Categories**: <categories>
- **Unique Features**:
  - <feature 1>
  - <feature 2>
- **Notes**: <notes>
```

**更新统计**：
```markdown
## 📊 Statistics

- **Total Integrated Sources**: <old-count + 1>
- **Total Skills**: <old-count + new-skills>
- **Last Integration**: <Source Name> (<date>, +<number> skills)
- **Last Updated**: <date>
```

---

### 阶段 5：构建与测试

**步骤**：
1. 运行构建命令
2. 检查构建输出
3. 验证新 skill 页面
4. 测试搜索功能

**命令**：
```bash
# 构建网站
npm run build

# 检查构建结果
# 应该看到新增的页面路径
# /skills/<new-skill-slug>

# 本地测试（可选）
npm run dev
# 访问 http://localhost:3000/skills/<new-skill-slug>
```

**验证清单**：
- [ ] 构建成功，无错误
- [ ] Sitemap 包含新 skill
- [ ] 技能总数正确更新
- [ ] 新 skill 页面可访问

---

### 阶段 6：提交与推送

**步骤**：
1. 查看变更
2. 添加所有文件
3. 编写规范的 commit message
4. 推送到 GitHub

**命令模板**：
```bash
# 查看变更
git status
git diff data/skills-content.json

# 添加文件
git add -A

# 提交
git commit -m "feat: integrate <Source Name> skill(s)

- Add <number> skill(s) from <source>
- <Key feature 1>
- <Key feature 2>
- Total skills: <old> → <new>

Source: <source-url>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# 推送
git push
```

---

## 🎯 快速参考

### 完整命令序列

```bash
# 1. 创建目录并下载
mkdir -p external/<source-name>
curl -sL "<raw-url>/SKILL.md" -o external/<source-name>/SKILL.md

# 2. 添加到数据库
node -e "
const fs = require('fs');
const skills = JSON.parse(fs.readFileSync('data/skills-content.json', 'utf8'));
const skillMd = fs.readFileSync('external/<source-name>/SKILL.md', 'utf8');
// ... (添加逻辑)
fs.writeFileSync('data/skills-content.json', JSON.stringify(skills, null, 2));
"

# 3. 更新追踪文件
# 手动编辑 SKILL_SOURCES.md

# 4. 构建测试
npm run build

# 5. 提交推送
git add -A
git commit -m "feat: integrate <source> skill(s)"
git push
```

---

## 📝 Commit Message 规范

### 格式

```
feat: integrate <Source Name> skill(s)

- Add <number> skill(s) from <source>
- <Key feature or description>
- <Another feature>
- Total skills: <old> → <new>

<Optional: More details>

Source: <source-url>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

### 示例

```
feat: integrate Vercel Next.js Cache Components skill

- Add comprehensive Next.js Cache Components and PPR skill from Vercel
- Includes SKILL.md, PATTERNS.md, REFERENCE.md, and TROUBLESHOOTING.md
- Covers 'use cache' directive, cacheLife(), cacheTag(), and cache invalidation
- Total skills: 320 → 321

Source: https://github.com/vercel/next.js/tree/canary/.claude-plugin

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## 🚨 常见问题

### Q: 如果 SKILL.md 格式不标准怎么办？

**A**: 需要手动转换：
1. 提取核心内容
2. 添加标准 frontmatter
3. 调整 Markdown 格式
4. 确保有 name 和 description

### Q: 如果一个仓库有多个 skills 怎么办？

**A**:
1. 为每个 skill 创建独立的 slug
2. 在数据库中分别添加
3. 在 SKILL_SOURCES.md 中注明 skill 数量

### Q: 如何处理包含多个文件的 skill？

**A**:
1. 下载所有相关文件
2. 合并到一个完整的 body 中
3. 使用分隔符（如 `---`）区分不同部分
4. 保持原始文件结构在 external/ 目录

### Q: 如果构建失败怎么办？

**A**:
1. 检查 JSON 格式是否正确
2. 验证 Markdown 内容没有特殊字符
3. 查看构建错误日志
4. 回滚更改，修复后重试

---

## 🔧 辅助脚本

### 创建 `scripts/add-single-skill.js`

```javascript
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
  process.exit(1);
}

const [sourceName, sourceUrl] = args;
const skillPath = path.join('external', sourceName, 'SKILL.md');

if (!fs.existsSync(skillPath)) {
  console.error(`Error: ${skillPath} not found`);
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
  console.warn(`Warning: Skill '${slug}' already exists. Overwriting...`);
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
console.log('  Description:', description.substring(0, 100) + '...');
console.log('Total skills:', Object.keys(existingSkills).length);
```

---

## 📚 相关文档

- [SKILL_SOURCES.md](../SKILL_SOURCES.md) - 技能源追踪文件
- [CONTRIBUTING.md](../CONTRIBUTING.md) - 贡献指南（待创建）
- [README.md](../README.md) - 项目说明

---

## 🎓 学习资源

- [Claude Skills 官方文档](https://docs.anthropic.com/claude/docs/skills)
- [SKILL.md 格式规范](https://github.com/anthropics/skills)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

最后更新：2026-01-20
