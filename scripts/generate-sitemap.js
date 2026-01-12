const fs = require("fs");
const path = require("path");
const { getAllSkills } = require("../lib/skills");
const { getAllPosts } = require("../lib/blog");
const site = require("../data/site.json");

const outPath = path.join(process.cwd(), "public", "sitemap.xml");
const LANDING_PAGES = [
  "/landing/anthropic-skills-zh",
  "/landing/claude-prompts",
  "/landing/brand-guidelines",
  "/landing/canvas-design",
  "/landing/planning-with-files",
  "/landing/webapp-testing",
  "/landing/pdf-toolkit",
  "/landing/office-docs",
  "/landing/content-writing",
  "/landing/obsidian-skills"
];

function urlEntry(loc) {
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

function build() {
  const base = site.domain.replace(/\/$/, "");
  const pages = ["/", "/skills", "/collections", "/blog", "/about"];

  const skills = getAllSkills().map((skill) => `/skills/${skill.slug}`);
  const posts = getAllPosts().map((post) => `/blog/${post.slug}`);

  const allPaths = [...pages, ...skills, ...posts, ...LANDING_PAGES];
  const localized = allPaths.flatMap((pathName) => [
    pathName,
    pathName === "/" ? "/en" : `/en${pathName}`
  ]);

  const urls = localized
    .map((pathName) => urlEntry(`${base}${pathName}`))
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  fs.writeFileSync(outPath, xml, "utf8");
  console.log(`Sitemap generated: ${outPath}`);
}

build();
