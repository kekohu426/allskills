const fs = require("fs");
const path = require("path");
const { parseFrontmatter } = require("./markdown");

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content", "blog");

function getAllPosts(locale = "zh") {
  const dir = locale === "en" ? path.join(BLOG_DIR, "en") : BLOG_DIR;

  let files = [];
  try {
    files = fs.readdirSync(dir);
  } catch (err) {
    return [];
  }

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const parsed = parseFrontmatter(raw);
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: parsed.data.title || slug,
        date: parsed.data.date || "",
        description: parsed.data.description || "",
        body: parsed.content || ""
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function getPostBySlug(slug, locale = "zh") {
  return getAllPosts(locale).find((post) => post.slug === slug);
}

module.exports = {
  getAllPosts,
  getPostBySlug
};
