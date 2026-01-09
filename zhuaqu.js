const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SKILLS_DIR = path.join(ROOT, "external", "anthropic-skills", "skills");

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

function stripQuotes(value) {
  if (!value) return value;
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== "---") return null;
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) return null;

  const frontmatterLines = lines.slice(1, end);
  let name = "";
  let description = "";
  for (const line of frontmatterLines) {
    const nameMatch = line.match(/^name:\s*(.*)$/);
    if (nameMatch) {
      name = stripQuotes(nameMatch[1]);
      continue;
    }
    const descMatch = line.match(/^description:\s*(.*)$/);
    if (descMatch) {
      description = stripQuotes(descMatch[1]);
    }
  }

  return { name, description };
}

function readSkill(skillPath) {
  let content;
  try {
    content = fs.readFileSync(skillPath, "utf8");
  } catch (err) {
    return null;
  }

  const meta = parseFrontmatter(content);
  if (!meta) return null;
  const relPath = path.relative(ROOT, skillPath);
  return {
    name: meta.name,
    description: meta.description,
    path: relPath,
  };
}

function main() {
  const skillFiles = [];
  findSkillFiles(SKILLS_DIR, skillFiles);

  const skills = [];
  for (const skillPath of skillFiles) {
    const skill = readSkill(skillPath);
    if (skill) skills.push(skill);
  }

  console.log(JSON.stringify(skills, null, 2));
}

main();
