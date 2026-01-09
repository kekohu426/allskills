const fs = require("fs");
const path = require("path");
const { getAllSkills } = require("../lib/skills");

const outPath = path.join(process.cwd(), "data", "skills-meta.md");

function formatList(items) {
  if (!items || items.length === 0) return "-";
  return items.map((item) => `- ${item}`).join("\n");
}

function build() {
  const skills = getAllSkills();
  const lines = [
    "# Skills Metadata",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Index",
    "",
    ...skills.map((skill) => `- ${skill.slug}`),
    ""
  ];

  for (const skill of skills) {
    lines.push(`## ${skill.slug}`);
    lines.push("");
    lines.push(`- name: ${skill.name}`);
    lines.push(`- category: ${skill.category}`);
    lines.push(`- path: ${skill.path}`);
    lines.push(`- description: ${skill.description || "-"}`);
    lines.push(`- tags:\n${formatList(skill.tags)}`);
    lines.push(`- useCases:\n${formatList(skill.useCases)}`);
    lines.push("");
  }

  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Skills metadata written to ${outPath}`);
}

build();
