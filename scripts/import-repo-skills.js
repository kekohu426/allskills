#!/usr/bin/env node
/**
 * Import skills from local repo clones into data/skills-content.json
 * and mirror skill folders into external/<source>.
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CONTENT_PATH = path.join(ROOT, "data", "skills-content.json");
const EXTERNAL_ROOT = path.join(ROOT, "external");

const SOURCES = [
  {
    key: "claude-code",
    root: path.join(ROOT, "_tmp_repo_scan", "claude-code"),
    prefix: "claude-code",
    sourceLabel: "anthropics/claude-code",
    sourceUrl: "https://github.com/anthropics/claude-code"
  },
  {
    key: "claude-cookbooks",
    root: path.join(ROOT, "_tmp_repo_scan", "claude-cookbooks"),
    prefix: "claude-cookbooks",
    sourceLabel: "anthropics/claude-cookbooks",
    sourceUrl: "https://github.com/anthropics/claude-cookbooks"
  },
  {
    key: "agents",
    root: path.join(ROOT, "_tmp_repo_scan", "agents"),
    prefix: "agents",
    sourceLabel: "wshobson/agents",
    sourceUrl: "https://github.com/wshobson/agents"
  }
];

function readJsonMaybe(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };
  const frontmatter = match[1];
  const body = match[2];
  const data = {};
  for (const line of frontmatter.split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let value = line.slice(idx + 1).trim();
      if ((value.startsWith("\"") && value.endsWith("\"")) ||
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
  } catch {
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

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function importSource(source, contentMap) {
  const skillFiles = [];
  findSkillFiles(source.root, skillFiles);

  const added = [];
  const skipped = [];
  const copied = [];

  for (const filePath of skillFiles) {
    const skillDir = path.dirname(filePath);
    const base = path.basename(skillDir);
    const slug = slugify(`${source.prefix}-${base}`);

    if (contentMap[slug]) {
      skipped.push(slug);
      continue;
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(raw);

    contentMap[slug] = {
      name: parsed.data.name || base,
      description: parsed.data.description || "",
      body: parsed.content.trim(),
      sourceLabel: source.sourceLabel,
      sourceUrl: source.sourceUrl,
      license: "MIT"
    };

    added.push(slug);

    const relativeDir = path.relative(source.root, skillDir);
    const destDir = path.join(EXTERNAL_ROOT, source.key, relativeDir);
    ensureDir(path.dirname(destDir));
    fs.cpSync(skillDir, destDir, { recursive: true });
    copied.push(destDir);
  }

  return { added, skipped, total: skillFiles.length };
}

function main() {
  const contentMap = readJsonMaybe(CONTENT_PATH, {});

  const summary = [];
  for (const source of SOURCES) {
    const result = importSource(source, contentMap);
    summary.push({ source: source.key, ...result });
  }

  fs.writeFileSync(CONTENT_PATH, JSON.stringify(contentMap, null, 2), "utf8");

  for (const item of summary) {
    console.log(`${item.source}: total=${item.total}, added=${item.added.length}, skipped=${item.skipped.length}`);
  }
}

main();
