/**
 * 提取所有 SKILL.md 内容到 skills-content.json
 * 运行: node scripts/extract-skills.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const OUTPUT_PATH = path.join(ROOT, "data", "skills-content.json");

// 所有 skill 源目录
const SOURCES = [
  { root: path.join(ROOT, "external", "anthropic-skills", "skills"), prefix: "", sourceLabel: "anthropic-skills", sourceUrl: "https://github.com/anthropics/skills" },
  { root: path.join(ROOT, "external", "awesome-claude-skills-master"), prefix: "awesome", sourceLabel: "awesome-claude-skills", sourceUrl: "https://github.com/anthropics/awesome-claude-skills" },
  { root: path.join(ROOT, "external", "skills-main", "skills"), prefix: "skills-main", sourceLabel: "skills-main", sourceUrl: "https://github.com/anthropics/skills" },
  { root: path.join(ROOT, "external", "superpowers-main", "skills"), prefix: "superpowers", sourceLabel: "superpowers", sourceUrl: "https://github.com/codeium/superpowers" },
  { root: path.join(ROOT, "planning-with-files-master", "skills"), prefix: "", sourceLabel: "planning-with-files", sourceUrl: "https://github.com/OthmanAdi/planning-with-files" },
  { root: path.join(ROOT, "obsidian-skills-main", "skills"), prefix: "", sourceLabel: "obsidian-skills", sourceUrl: "https://github.com/kepano/obsidian-skills" },
  { root: path.join(ROOT, "document-driven-development-main", "skills"), prefix: "", sourceLabel: "document-driven-development", sourceUrl: "https://github.com/s87343472/document-driven-development" }
];

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }

  const frontmatter = match[1];
  const body = match[2];
  const data = {};

  // 简单解析 YAML frontmatter
  const lines = frontmatter.split("\n");
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // 去掉引号
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
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findSkillFiles(fullPath, out);
      continue;
    }
    if (entry.isFile() && entry.name === "SKILL.md") {
      out.push(fullPath);
    }
  }
}

function getSlug(skillPath, prefix) {
  const base = path.basename(path.dirname(skillPath));
  return prefix ? `${prefix}-${base}` : base;
}

function extractSkills() {
  const skills = {};

  for (const source of SOURCES) {
    const skillFiles = [];
    findSkillFiles(source.root, skillFiles);

    for (const filePath of skillFiles) {
      // 跳过模板
      if (filePath.includes(`${path.sep}template-skill${path.sep}`)) continue;
      if (filePath.includes(`${path.sep}template${path.sep}`)) continue;

      try {
        const raw = fs.readFileSync(filePath, "utf8");
        const parsed = parseFrontmatter(raw);
        const slug = getSlug(filePath, source.prefix);

        skills[slug] = {
          name: parsed.data.name || slug,
          description: parsed.data.description || "",
          body: parsed.content.trim(),
          sourceLabel: source.sourceLabel,
          sourceUrl: source.sourceUrl,
          license: "MIT"
        };

        console.log(`✓ ${slug}`);
      } catch (err) {
        console.error(`✗ ${filePath}: ${err.message}`);
      }
    }
  }

  // 写入 JSON
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(skills, null, 2), "utf8");
  console.log(`\n已提取 ${Object.keys(skills).length} 个 skills 到 ${OUTPUT_PATH}`);
}

extractSkills();
