const { marked } = require("marked");

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
  if (lines[0] !== "---") return { data: {}, content };
  let end = -1;
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === "---") {
      end = i;
      break;
    }
  }
  if (end === -1) return { data: {}, content };

  const frontmatterLines = lines.slice(1, end);
  const data = {};
  for (const line of frontmatterLines) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    data[match[1]] = stripQuotes(match[2]);
  }

  return {
    data,
    content: lines.slice(end + 1).join("\n").trim()
  };
}

function markdownToHtml(markdown) {
  return marked.parse(markdown || "");
}

module.exports = {
  parseFrontmatter,
  markdownToHtml
};
