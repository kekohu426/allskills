const fs = require("fs");
const path = require("path");
const { parseFrontmatter } = require("./markdown");

const ROOT = process.cwd();
const SKILLS_DIR = path.join(ROOT, "external", "anthropic-skills", "skills");
const AWESOME_DIR = path.join(ROOT, "external", "awesome-claude-skills-master");
const SKILLS_MAIN_DIR = path.join(ROOT, "external", "skills-main", "skills");
const SUPERPOWERS_DIR = path.join(ROOT, "external", "superpowers-main", "skills");
const PLANNING_WITH_FILES_DIR = path.join(ROOT, "planning-with-files-master", "skills");
const OBSIDIAN_SKILLS_DIR = path.join(ROOT, "obsidian-skills-main", "skills");
const CATEGORIES_PATH = path.join(ROOT, "data", "categories.json");
const META_PATH = path.join(ROOT, "data", "skills-meta.json");

const SOURCES = [
  { root: SKILLS_DIR, prefix: "" },
  { root: AWESOME_DIR, prefix: "awesome" },
  { root: SKILLS_MAIN_DIR, prefix: "skills-main" },
  { root: SUPERPOWERS_DIR, prefix: "superpowers" },
  { root: PLANNING_WITH_FILES_DIR, prefix: "" },
  { root: OBSIDIAN_SKILLS_DIR, prefix: "" }
];

function getSourceInfo(skillPath) {
  if (skillPath.includes(`${path.sep}external${path.sep}anthropic-skills${path.sep}`)) {
    const repoPath = path.relative(
      path.join(ROOT, "external", "anthropic-skills"),
      path.dirname(skillPath)
    );
    return {
      sourceLabel: "anthropic-skills",
      sourceUrl: `https://github.com/anthropics/skills/tree/main/${repoPath.replace(/\\/g, "/")}`,
      license: "Apache 2.0"
    };
  }
  if (skillPath.includes(`${path.sep}external${path.sep}skills-main${path.sep}`)) {
    return {
      sourceLabel: "skills-main",
      sourceUrl: "",
      license: "See repository"
    };
  }
  if (skillPath.includes(`${path.sep}external${path.sep}awesome-claude-skills-master${path.sep}`)) {
    return {
      sourceLabel: "awesome-claude-skills-master",
      sourceUrl: "",
      license: "See repository"
    };
  }
  if (skillPath.includes(`${path.sep}external${path.sep}superpowers-main${path.sep}`)) {
    const repoPath = path.relative(
      path.join(ROOT, "external", "superpowers-main"),
      path.dirname(skillPath)
    );
    return {
      sourceLabel: "superpowers",
      sourceUrl: `https://github.com/codeium/superpowers/tree/main/${repoPath.replace(/\\/g, "/")}`,
      license: "MIT"
    };
  }
  if (skillPath.includes(`${path.sep}planning-with-files-master${path.sep}`)) {
    const repoPath = path.relative(
      path.join(ROOT, "planning-with-files-master"),
      path.dirname(skillPath)
    );
    return {
      sourceLabel: "planning-with-files",
      sourceUrl: `https://github.com/OthmanAdi/planning-with-files/tree/main/${repoPath.replace(/\\/g, "/")}`,
      license: "MIT"
    };
  }
  if (skillPath.includes(`${path.sep}obsidian-skills-main${path.sep}`)) {
    const repoPath = path.relative(
      path.join(ROOT, "obsidian-skills-main"),
      path.dirname(skillPath)
    );
    return {
      sourceLabel: "obsidian-skills",
      sourceUrl: `https://github.com/kepano/obsidian-skills/tree/main/${repoPath.replace(/\\/g, "/")}`,
      license: "MIT"
    };
  }
  return {
    sourceLabel: "Community repository",
    sourceUrl: "",
    license: "See repository"
  };
}

function readJsonMaybe(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
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

function getSlugFromPath(skillPath, prefix, sourceRoot) {
  // Use the immediate parent directory of SKILL.md as the base name
  const base = path.basename(path.dirname(skillPath));
  return prefix ? `${prefix}-${base}` : base;
}

function readSkill(skillPath, categoriesMap, metaMap, prefix) {
  const raw = fs.readFileSync(skillPath, "utf8");
  const parsed = parseFrontmatter(raw);
  const slug = getSlugFromPath(skillPath, prefix);
  const meta = metaMap[slug] || {};
  const source = getSourceInfo(skillPath);

  return {
    slug,
    name: parsed.data.name || slug,
    nameZh: meta.nameZh || "",
    description: parsed.data.description || "",
    descriptionZh: meta.descriptionZh || "",
    body: parsed.content || "",
    path: path.relative(ROOT, skillPath),
    category: meta.category || categoriesMap[slug] || "General",
    useCases: meta.useCases || [],
    useCasesZh: meta.useCasesZh || [],
    tags: meta.tags || [],
    sourceLabel: source.sourceLabel,
    sourceUrl: source.sourceUrl,
    license: source.license
  };
}

function getAllSkills() {
  const categoriesMap = readJsonMaybe(CATEGORIES_PATH, {});
  const metaMap = readJsonMaybe(META_PATH, {});

  const skills = [];
  for (const source of SOURCES) {
    const skillFiles = [];
    findSkillFiles(source.root, skillFiles);
    for (const filePath of skillFiles) {
      if (filePath.includes(`${path.sep}template-skill${path.sep}`)) continue;
      const skill = readSkill(filePath, categoriesMap, metaMap, source.prefix);
      skills.push(skill);
    }
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}

function getSkillBySlug(slug) {
  const skills = getAllSkills();
  return skills.find((skill) => skill.slug === slug);
}

function compactSkill(skill) {
  return {
    slug: skill.slug,
    name: skill.name,
    nameZh: skill.nameZh,
    description: skill.description,
    descriptionZh: skill.descriptionZh,
    category: skill.category,
    useCases: skill.useCases,
    useCasesZh: skill.useCasesZh,
    tags: skill.tags,
    sourceLabel: skill.sourceLabel,
    sourceUrl: skill.sourceUrl,
    license: skill.license,
    path: skill.path
  };
}

function getCategories(skills) {
  const groups = new Map();
  for (const skill of skills) {
    const name = skill.category || "General";
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(skill);
  }
  return Array.from(groups.entries())
    .map(([name, items]) => ({ name, items }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

module.exports = {
  getAllSkills,
  getSkillBySlug,
  getCategories,
  compactSkill
};
