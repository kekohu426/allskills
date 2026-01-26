#!/usr/bin/env node
/**
 * Add hot skills to skills-content.json
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CONTENT_PATH = path.join(ROOT, "data", "skills-content.json");

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

const skills = [
  {
    slug: "ai-sdk",
    path: "_tmp_repo_scan/vercel-ai/skills/use-ai-sdk/SKILL.md",
    sourceLabel: "vercel/ai",
    sourceUrl: "https://github.com/vercel/ai"
  },
  {
    slug: "python-performance-optimization",
    path: "_tmp_repo_scan/agents/plugins/python-development/skills/python-performance-optimization/SKILL.md",
    sourceLabel: "wshobson/agents",
    sourceUrl: "https://github.com/wshobson/agents"
  },
  {
    slug: "api-design-principles",
    path: "_tmp_repo_scan/agents/plugins/backend-development/skills/api-design-principles/SKILL.md",
    sourceLabel: "wshobson/agents",
    sourceUrl: "https://github.com/wshobson/agents"
  },
  {
    slug: "email-best-practices",
    path: "_tmp_repo_scan/email-best-practices/SKILL.md",
    sourceLabel: "resend/email-best-practices",
    sourceUrl: "https://github.com/resend/email-best-practices"
  },
  {
    slug: "web-component-design",
    path: "_tmp_repo_scan/agents/plugins/ui-design/skills/web-component-design/SKILL.md",
    sourceLabel: "wshobson/agents",
    sourceUrl: "https://github.com/wshobson/agents"
  },
  {
    slug: "rag-implementation",
    path: "_tmp_repo_scan/agents/plugins/llm-application-dev/skills/rag-implementation/SKILL.md",
    sourceLabel: "wshobson/agents",
    sourceUrl: "https://github.com/wshobson/agents"
  },
  {
    slug: "omnicaptions-translate",
    path: "_tmp_repo_scan/omni-captions-skills/skills/omnicaptions-translate/SKILL.md",
    sourceLabel: "lattifai/omni-captions-skills",
    sourceUrl: "https://github.com/lattifai/omni-captions-skills"
  },
  {
    slug: "omnicaptions-laicut",
    path: "_tmp_repo_scan/omni-captions-skills/skills/omnicaptions-LaiCut/SKILL.md",
    sourceLabel: "lattifai/omni-captions-skills",
    sourceUrl: "https://github.com/lattifai/omni-captions-skills"
  },
  {
    slug: "omnicaptions-convert",
    path: "_tmp_repo_scan/omni-captions-skills/skills/omnicaptions-convert/SKILL.md",
    sourceLabel: "lattifai/omni-captions-skills",
    sourceUrl: "https://github.com/lattifai/omni-captions-skills"
  },
  {
    slug: "omnicaptions-download",
    path: "_tmp_repo_scan/omni-captions-skills/skills/omnicaptions-download/SKILL.md",
    sourceLabel: "lattifai/omni-captions-skills",
    sourceUrl: "https://github.com/lattifai/omni-captions-skills"
  },
  {
    slug: "omnicaptions-transcribe",
    path: "_tmp_repo_scan/omni-captions-skills/skills/omnicaptions-transcribe/SKILL.md",
    sourceLabel: "lattifai/omni-captions-skills",
    sourceUrl: "https://github.com/lattifai/omni-captions-skills"
  }
];

function main() {
  const contentMap = JSON.parse(fs.readFileSync(CONTENT_PATH, "utf8"));

  let added = 0;
  let skipped = 0;

  for (const skill of skills) {
    if (contentMap[skill.slug]) {
      console.log(`Skipped (exists): ${skill.slug}`);
      skipped++;
      continue;
    }

    const fullPath = path.join(ROOT, skill.path);
    if (!fs.existsSync(fullPath)) {
      console.log(`Skipped (not found): ${skill.slug} - ${fullPath}`);
      skipped++;
      continue;
    }

    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = parseFrontmatter(raw);

    contentMap[skill.slug] = {
      name: parsed.data.name || skill.slug,
      description: parsed.data.description || "",
      body: parsed.content.trim(),
      sourceLabel: skill.sourceLabel,
      sourceUrl: skill.sourceUrl,
      license: "MIT"
    };

    console.log(`Added: ${skill.slug}`);
    added++;
  }

  fs.writeFileSync(CONTENT_PATH, JSON.stringify(contentMap, null, 2), "utf8");

  console.log(`\nSummary: added=${added}, skipped=${skipped}`);
}

main();
