const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CONTENT_PATH = path.join(ROOT, "data", "skills-content.json");
const CATEGORIES_PATH = path.join(ROOT, "data", "categories.json");
const META_PATH = path.join(ROOT, "data", "skills-meta.json");

function readJsonMaybe(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function getAllSkills() {
  const contentMap = readJsonMaybe(CONTENT_PATH, {});
  const categoriesMap = readJsonMaybe(CATEGORIES_PATH, {});
  const metaMap = readJsonMaybe(META_PATH, {});

  const skills = [];

  for (const [slug, content] of Object.entries(contentMap)) {
    const meta = metaMap[slug] || {};

    skills.push({
      slug,
      name: content.name || slug,
      nameZh: meta.nameZh || "",
      nameDe: meta.nameDe || "",
      nameHi: meta.nameHi || "",
      description: content.description || "",
      descriptionZh: meta.descriptionZh || "",
      descriptionDe: meta.descriptionDe || "",
      descriptionHi: meta.descriptionHi || "",
      body: content.body || "",
      path: `data/skills-content.json#${slug}`,
      category: meta.category || categoriesMap[slug] || "General",
      useCases: meta.useCases || [],
      useCasesZh: meta.useCasesZh || [],
      tags: meta.tags || [],
      sourceLabel: content.sourceLabel || "Community",
      sourceUrl: content.sourceUrl || "",
      license: content.license || "MIT"
    });
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
    nameDe: skill.nameDe,
    nameHi: skill.nameHi,
    description: skill.description,
    descriptionZh: skill.descriptionZh,
    descriptionDe: skill.descriptionDe,
    descriptionHi: skill.descriptionHi,
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
