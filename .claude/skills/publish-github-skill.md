# Publish GitHub Skill to AllSkills

将 GitHub 上的 Claude Skill 上架到 AllSkills 网站的标准化流程。

## 触发条件

当用户说以下内容时使用此 Skill：
- "上架这个 skill"
- "发布这个 skill"
- "把这个 skill 添加到网站"
- "publish this skill"
- 提供一个包含 SKILL.md 的 GitHub 地址

## 输入

- GitHub 仓库地址（必须包含 SKILL.md 文件）

## 输出

- Skill 数据添加到网站
- 中英文落地页
- 代码提交并推送
- Sitemap 提交到搜索引擎

---

## 完整流程

### 第 1 步：获取元数据

1. **下载 SKILL.md**
   ```bash
   # 从 GitHub raw 地址获取
   curl -o /tmp/SKILL.md https://raw.githubusercontent.com/{owner}/{repo}/main/SKILL.md
   ```

2. **解析元数据**
   - name: Skill 名称
   - description: 简短描述
   - body: 完整内容
   - 生成 slug（如 `ai-hotspot-dailyreport-skill`）

3. **确定分类和标签**
   - category: Automation / Development / Content / Design / Productivity
   - tags: 3-5 个相关标签

### 第 2 步：添加 Skill 数据

1. **更新 `data/skills-content.json`**
   ```json
   {
     "{slug}": {
       "name": "Skill Name",
       "description": "Brief description",
       "body": "Full SKILL.md content",
       "sourceLabel": "github",
       "sourceUrl": "https://github.com/{owner}/{repo}",
       "license": "MIT"
     }
   }
   ```

2. **更新 `data/skills-meta.json`**
   ```json
   {
     "{slug}": {
       "nameZh": "中文名称",
       "descriptionZh": "中文描述",
       "useCasesZh": ["用例1", "用例2"],
       "tags": ["tag1", "tag2", "tag3"]
     }
   }
   ```

3. **更新 `data/categories.json`**
   ```json
   {
     "{slug}": "Category Name"
   }
   ```

4. **更新首页统计数据**（如果 Skill 总数跨越整十）

   文件：`pages/index.js`

   需要更新的位置（搜索 "50+" 或当前数字）：
   - 第 128 行：meta description 中文
   - 第 143-144 行：副标题
   - 第 148 行：统计数字显示
   - 第 194 行：FAQ 中文
   - 第 213 行：FAQ 英文
   - 第 294 行：使用说明

   **更新规则**：
   - 当 Skill 总数达到新的整十（如 60、70、80...），更新为 "60+"、"70+"、"80+"
   - 可通过 `Object.keys(require('./data/skills-content.json')).length` 获取当前总数

### 第 3 步：SEO 关键词研究

在创建落地页之前，必须进行关键词研究：

1. **确定核心关键词**（3-5 个）
   - 与 Skill 功能直接相关
   - 搜索量较高的词

2. **确定长尾词**（5-8 个）
   - 用户可能搜索的问题形式
   - 如"如何..."、"什么工具可以..."
   - 具体场景描述

3. **关键词部署位置**
   - Title: 核心词 + 品牌词
   - Description: 长尾词开头 + 核心功能
   - H1: 核心词
   - H2: 包含关键词的功能描述
   - 痛点场景: 长尾词作为问题

### 第 4 步：创建落地页

#### 4.1 中文落地页

文件路径：`pages/landing/{slug}.js`

必须包含的 SEO 要素：
- SeoHead 组件（title, description, keywords, jsonLd）
- H1 标题包含核心关键词
- H2 标题包含关键词
- 痛点场景部分（融入长尾词）
- FAQ 部分（问题包含长尾词）
- JSON-LD 结构化数据（SoftwareApplication, FAQPage, HowTo）
- 内部链接（/skills, /blog, 相关 skills）

页面结构：
```
1. Hero Section
   - Badge（Claude Skill · 分类）
   - H1 标题
   - 副标题
   - 价值主张（3 个亮点）
   - CTA 按钮

2. 痛点场景（Pain Points）
   - 4 个问答形式的痛点
   - 问题使用长尾词

3. 核心功能（Features）
   - 6 个功能卡片

4. 快速上手（Quick Start）
   - 5 步流程
   - 代码示例

5. 数据源/技术栈（可选）

6. 输出示例（可选）

7. FAQ
   - 5-6 个常见问题
   - 问题包含关键词

8. 相关资源
   - 完整 SKILL.md 链接
   - GitHub 源码
   - 更多相关 Skills
   - 浏览全部 Skills
   - 技术博客
```

#### 4.2 英文落地页

文件路径：`pages/en/landing/{slug}.js`

- 翻译所有内容为英文
- 调整关键词为英文搜索习惯
- 保持相同的页面结构
- 添加 `forcedLocale: "en"` 到 getStaticProps

### 第 5 步：验证构建

```bash
npm run build
```

确保没有构建错误。

### 第 6 步：提交代码

```bash
git add .
git commit -m "feat: add {skill-name} skill and landing pages

- Add skill data to skills-content.json and skills-meta.json
- Create Chinese landing page with SEO optimization
- Create English landing page

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

git push origin main
```

### 第 7 步：更新 Skill URL 文档

在导入技能后，更新全站 skill URL 清单：

```bash
node -e "const fs=require('fs');const data=JSON.parse(fs.readFileSync('data/skills-content.json','utf8'));const slugs=Object.keys(data).sort();const lines=['# AllSkills.cn Skill URLs','','Last Updated: 2026-01-22','',`Total Skills: ${slugs.length}`,'','## URLs','',...slugs.map(s=>`- https://allskills.cn/skills/${s}`)];fs.writeFileSync('docs/skill-urls.md',lines.join('\\n'),'utf8');console.log('Updated docs/skill-urls.md');"
```

> 说明：日期请更新为当天实际日期。

### 第 8 步：Sitemap 提交

部署完成后，提交新页面到搜索引擎：

1. **Google Search Console**
   - 访问 https://search.google.com/search-console
   - 选择站点
   - URL 检查 → 输入新页面 URL
   - 请求编入索引

2. **Bing Webmaster Tools**
   - 访问 https://www.bing.com/webmasters
   - 提交 URL

3. **提交的 URL**
   - `https://allskills.cn/landing/{slug}`
   - `https://allskills.cn/en/landing/{slug}`
   - `https://allskills.cn/skills/{slug}`
   - `https://allskills.cn/en/skills/{slug}`

---

## 检查清单

### 数据层
- [ ] skills-content.json 已更新
- [ ] skills-meta.json 已更新
- [ ] categories.json 已更新
- [ ] slug 命名规范（小写、连字符）
- [ ] 首页统计数据已检查（如需更新）

### SEO 层
- [ ] 核心关键词已确定
- [ ] 长尾词已确定
- [ ] Title 包含核心词和品牌词
- [ ] Description 以长尾词开头
- [ ] H1/H2 包含关键词
- [ ] 痛点场景融入长尾词
- [ ] FAQ 问题包含关键词
- [ ] JSON-LD 结构化数据完整

### 页面层
- [ ] 中文落地页已创建
- [ ] 英文落地页已创建
- [ ] 内部链接完整
- [ ] 页面结构完整

### 发布层
- [ ] npm run build 通过
- [ ] git commit & push 完成
- [ ] Sitemap 已提交

---

## 示例

### 输入
```
上架这个 skill: https://github.com/zhuyansen/ai-hotspot-dailyreport-skill
```

### 执行流程
1. 下载 SKILL.md
2. 解析：name="AI Hotspot Daily Report", slug="ai-hotspot-dailyreport-skill"
3. 分类：Automation, tags=["ai", "automation", "reddit", "obsidian"]
4. 关键词研究：
   - 核心词：AI热点、AI新闻、日报生成、Claude Skill
   - 长尾词：如何自动收集AI新闻、Reddit AI热点汇总、每日AI新闻汇总
5. 创建落地页
6. 构建验证
7. 提交代码
8. 提交 Sitemap

### 输出
- 中文落地页：https://allskills.cn/landing/ai-hotspot-dailyreport
- 英文落地页：https://allskills.cn/en/landing/ai-hotspot-dailyreport
- Skills 页面：https://allskills.cn/skills/ai-hotspot-dailyreport-skill
