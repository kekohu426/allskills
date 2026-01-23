const fs = require("fs");
const path = require("path");
const { getAllSkills } = require("../lib/skills");
const { getAllPosts } = require("../lib/blog");
const site = require("../data/site.json");

const outPath = path.join(process.cwd(), "public", "sitemap.xml");
const today = new Date().toISOString().split("T")[0];

const LANDING_PAGES = [
  "/landing/anthropic-skills-zh",
  "/landing/anthropic-skills-library",
  "/landing/anthropic-skills-directory",
  "/landing/anthropic-claude-skills-directory",
  "/landing/anthropic-official-skills",
  "/landing/skills-vs-mcp",
  "/landing/how-to-use-claude-skills",
  "/landing/claude-skills-pricing",
  "/landing/marketing-skills",
  "/landing/claude-prompts",
  "/landing/brand-guidelines",
  "/landing/canvas-design",
  "/landing/planning-with-files",
  "/landing/webapp-testing",
  "/landing/pdf-toolkit",
  "/landing/office-docs",
  "/landing/content-writing",
  "/landing/obsidian-skills",
  "/landing/document-driven-development",
  "/landing/ai-hotspot-dailyreport",
  "/landing/gh-fix-ci",
  "/landing/create-plan",
  "/landing/tailored-resume-generator",
  "/landing/spreadsheet-formula-helper",
  "/landing/email-draft-polish",
  "/landing/skill-creator",
  "/landing/skill-generator",
  "/landing/anthropic-skills-algorithmic-art-javascript-library-package-json"
];

const TOOL_PAGES = ["/tools/skill-generator"];

// Priority config
const PRIORITY = {
  home: "1.0",
  skills: "0.9",
  collections: "0.8",
  landing: "0.8",
  tools: "0.8",
  skillDetail: "0.7",
  blog: "0.7",
  blogPost: "0.6",
  about: "0.5"
};

function urlEntry(loc, priority = "0.5", changefreq = "weekly") {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function build() {
  const base = site.domain.replace(/\/$/, "");
  const urls = [];

  // Home pages
  urls.push(urlEntry(`${base}/`, PRIORITY.home, "daily"));
  urls.push(urlEntry(`${base}/en`, PRIORITY.home, "daily"));

  // Skills list
  urls.push(urlEntry(`${base}/skills`, PRIORITY.skills, "daily"));
  urls.push(urlEntry(`${base}/en/skills`, PRIORITY.skills, "daily"));

  // Collections
  urls.push(urlEntry(`${base}/collections`, PRIORITY.collections, "weekly"));
  urls.push(urlEntry(`${base}/en/collections`, PRIORITY.collections, "weekly"));

  // Blog index
  urls.push(urlEntry(`${base}/blog`, PRIORITY.blog, "weekly"));
  urls.push(urlEntry(`${base}/en/blog`, PRIORITY.blog, "weekly"));

  // About
  urls.push(urlEntry(`${base}/about`, PRIORITY.about, "monthly"));
  urls.push(urlEntry(`${base}/en/about`, PRIORITY.about, "monthly"));

  // Landing pages
  LANDING_PAGES.forEach((p) => {
    urls.push(urlEntry(`${base}${p}`, PRIORITY.landing, "weekly"));
    urls.push(urlEntry(`${base}/en${p}`, PRIORITY.landing, "weekly"));
  });

  // Tool pages
  TOOL_PAGES.forEach((p) => {
    urls.push(urlEntry(`${base}${p}`, PRIORITY.tools, "weekly"));
    urls.push(urlEntry(`${base}/en${p}`, PRIORITY.tools, "weekly"));
  });

  // Skill detail pages
  const skills = getAllSkills();
  skills.forEach((skill) => {
    urls.push(urlEntry(`${base}/skills/${skill.slug}`, PRIORITY.skillDetail, "weekly"));
    urls.push(urlEntry(`${base}/en/skills/${skill.slug}`, PRIORITY.skillDetail, "weekly"));
  });

  // Blog posts
  const postsZh = getAllPosts("zh");
  const postsEn = getAllPosts("en");
  postsZh.forEach((post) => {
    urls.push(urlEntry(`${base}/blog/${post.slug}`, PRIORITY.blogPost, "monthly"));
  });
  postsEn.forEach((post) => {
    urls.push(urlEntry(`${base}/en/blog/${post.slug}`, PRIORITY.blogPost, "monthly"));
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  fs.writeFileSync(outPath, xml, "utf8");
  console.log(`Sitemap generated: ${outPath} (${urls.length} URLs)`);
}

build();
