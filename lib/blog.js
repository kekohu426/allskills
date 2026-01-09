const fs = require("fs");
const path = require("path");
const { parseFrontmatter } = require("./markdown");

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content", "blog");

function getAllPosts() {
  let files = [];
  try {
    files = fs.readdirSync(BLOG_DIR);
  } catch (err) {
    return [];
  }

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(BLOG_DIR, file);
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

function getPostBySlug(slug) {
  return getAllPosts().find((post) => post.slug === slug);
}

module.exports = {
  getAllPosts,
  getPostBySlug
};
