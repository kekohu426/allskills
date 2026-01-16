#!/usr/bin/env node
/**
 * 上架 Skill 脚本
 *
 * 用法:
 *   node scripts/add-skill.js <github-url> [options]
 *
 * 示例:
 *   node scripts/add-skill.js https://github.com/zhuyansen/ai-hotspot-dailyreport-skill
 *   node scripts/add-skill.js https://github.com/user/repo --slug my-skill --name "My Skill"
 *
 * 选项:
 *   --slug <slug>       自定义 slug（默认从仓库名生成）
 *   --name <name>       自定义名称
 *   --name-zh <name>    中文名称
 *   --desc-zh <desc>    中文描述
 *   --category <cat>    分类
 *   --path <path>       SKILL.md 路径（默认: skill/SKILL.md 或 SKILL.md）
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = process.cwd();
const CONTENT_PATH = path.join(ROOT, "data", "skills-content.json");
const META_PATH = path.join(ROOT, "data", "skills-meta.json");

// 解析命令行参数
function parseArgs(args) {
  const result = { url: null, options: {} };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = args[++i];
      result.options[key] = value;
    } else if (!result.url) {
      result.url = arg;
    }
  }

  return result;
}

// 从 GitHub URL 解析信息
function parseGitHubUrl(url) {
  // 支持格式:
  // https://github.com/user/repo
  // https://github.com/user/repo/tree/main/path
  // https://github.com/user/repo/blob/main/SKILL.md

  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error("无效的 GitHub URL");
  }

  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ""),
    branch: "main"
  };
}

// 获取 raw 文件 URL
function getRawUrl(owner, repo, branch, filePath) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
}

// HTTP GET 请求
function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }

      if (res.statusCode === 404) {
        return reject(new Error(`文件不存在: ${url}`));
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
      }

      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

// 解析 frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }

  const frontmatter = match[1];
  const body = match[2];
  const data = {};

  const lines = frontmatter.split("\n");
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

// 读取 JSON 文件
function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

// 写入 JSON 文件
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

// 主函数
async function addSkill() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
用法: node scripts/add-skill.js <github-url> [options]

示例:
  node scripts/add-skill.js https://github.com/zhuyansen/ai-hotspot-dailyreport-skill
  node scripts/add-skill.js https://github.com/user/repo --slug my-skill --name-zh "我的技能"

选项:
  --slug <slug>       自定义 slug（默认从仓库名生成）
  --name <name>       自定义英文名称
  --name-zh <name>    中文名称
  --desc-zh <desc>    中文描述
  --category <cat>    分类（默认: General）
  --path <path>       SKILL.md 路径（默认自动检测）
`);
    return;
  }

  const { url, options } = parseArgs(args);

  if (!url) {
    console.error("错误: 请提供 GitHub URL");
    process.exit(1);
  }

  console.log(`\n正在处理: ${url}\n`);

  // 解析 GitHub URL
  const { owner, repo, branch } = parseGitHubUrl(url);
  console.log(`仓库: ${owner}/${repo}`);

  // 尝试多个可能的 SKILL.md 路径
  const possiblePaths = options.path
    ? [options.path]
    : [
        "skill/SKILL.md",
        "skills/SKILL.md",
        "SKILL.md",
        `skills/${repo}/SKILL.md`
      ];

  let skillContent = null;
  let foundPath = null;

  for (const p of possiblePaths) {
    try {
      const rawUrl = getRawUrl(owner, repo, branch, p);
      console.log(`尝试: ${p}`);
      skillContent = await httpGet(rawUrl);
      foundPath = p;
      console.log(`✓ 找到 SKILL.md: ${p}`);
      break;
    } catch (err) {
      // 继续尝试下一个路径
    }
  }

  if (!skillContent) {
    console.error("\n✗ 未找到 SKILL.md 文件");
    console.error("请使用 --path 参数指定路径");
    process.exit(1);
  }

  // 解析 SKILL.md
  const parsed = parseFrontmatter(skillContent);

  // 生成 slug
  const slug = options.slug || repo.replace(/[^a-z0-9-]/gi, "-").toLowerCase();

  // 读取现有数据
  const contentData = readJson(CONTENT_PATH);
  const metaData = readJson(META_PATH);

  // 检查是否已存在
  if (contentData[slug]) {
    console.log(`\n⚠ Skill "${slug}" 已存在，将被覆盖`);
  }

  // 添加到 skills-content.json
  contentData[slug] = {
    name: options.name || parsed.data.name || repo,
    description: parsed.data.description || "",
    body: parsed.content.trim(),
    sourceLabel: `${owner}/${repo}`,
    sourceUrl: url,
    license: "MIT"
  };

  // 添加到 skills-meta.json（如果有中文信息）
  if (options["name-zh"] || options["desc-zh"] || options.category) {
    metaData[slug] = metaData[slug] || {};
    if (options["name-zh"]) metaData[slug].nameZh = options["name-zh"];
    if (options["desc-zh"]) metaData[slug].descriptionZh = options["desc-zh"];
    if (options.category) metaData[slug].category = options.category;
    metaData[slug].tags = metaData[slug].tags || [];
  }

  // 保存
  writeJson(CONTENT_PATH, contentData);
  writeJson(META_PATH, metaData);

  console.log(`
✓ 上架成功!

Slug: ${slug}
名称: ${contentData[slug].name}
来源: ${url}

下一步:
1. 编辑 data/skills-meta.json 添加中文翻译
2. 运行 npm run build 构建
3. 运行 git add . && git commit -m "feat: add ${slug} skill" && git push
`);
}

addSkill().catch(err => {
  console.error("错误:", err.message);
  process.exit(1);
});
