const fs = require("fs");
const path = require("path");

const SOURCE_DIR = path.join("external", "marketingskills", "skills");
const OUTPUT_PATH = path.join("data", "skills-content.json");
const SOURCE_LABEL = "coreyhaines31/marketingskills";
const SOURCE_URL = "https://github.com/coreyhaines31/marketingskills";
const PREFIX = "marketingskills";

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content };

  const frontmatter = match[1];
  const body = match[2];
  const data = {};

  const lines = frontmatter.split(/\r?\n/);
  for (const line of lines) {
    const colonIndex = line.indexOf(":");
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

function readJsonMaybe(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function main() {
  const existingSkills = readJsonMaybe(OUTPUT_PATH, {});

  const skillFiles = [];
  findSkillFiles(SOURCE_DIR, skillFiles);

  let added = 0;
  let skipped = 0;

  for (const filePath of skillFiles) {
    const normalized = filePath.split(path.sep).join("/");
    if (normalized.includes("/template-skill/") || normalized.includes("/template/")) continue;

    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = parseFrontmatter(raw);
      const base = path.basename(path.dirname(filePath));
      const slug = `${PREFIX}-${base}`;

      const existing = existingSkills[slug];
      const shouldUpdate = existing
        ? (!existing.description || existing.body.startsWith("---"))
        : true;

      if (shouldUpdate) {
        existingSkills[slug] = {
          name: parsed.data.name || base,
          description: parsed.data.description || "",
          body: parsed.content.trim(),
          sourceLabel: SOURCE_LABEL,
          sourceUrl: SOURCE_URL,
          license: "MIT"
        };
        if (existing) {
          console.log(`↻ Updated: ${slug}`);
        } else {
          console.log(`✓ Added: ${slug}`);
        }
        added++;
      } else {
        skipped++;
        console.log(`• Skipped (exists): ${slug}`);
      }
    } catch (err) {
      console.error(`✗ Error: ${filePath} ${err.message}`);
    }
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(existingSkills, null, 2), "utf8");
  console.log(`\nTotal skills: ${Object.keys(existingSkills).length}`);
  console.log(`Added: ${added}`);
  console.log(`Skipped: ${skipped}`);
}

main();
