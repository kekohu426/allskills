const fs = require("fs");
const path = require("path");
const { getAllSkills } = require("../lib/skills");
const { getAllPosts } = require("../lib/blog");
const site = require("../data/site.json");

const outPath = path.join(process.cwd(), "public", "sitemap.xml");

function urlEntry(loc) {
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

function build() {
  const base = site.domain.replace(/\/$/, "");
  const pages = ["/", "/skills", "/collections", "/blog", "/about"];

  const skills = getAllSkills().map((skill) => `/skills/${skill.slug}`);
  const posts = getAllPosts().map((post) => `/blog/${post.slug}`);

  const allPaths = [...pages, ...skills, ...posts];
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
