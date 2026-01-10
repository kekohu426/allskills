import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "../components/SeoHead";
import { getAllSkills, getCategories } from "../lib/skills";
import { t } from "../lib/i18n";
import { getLocaleFromPath, toAnchorId, withLocale } from "../lib/paths";

export default function Home({ skills, categories, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const keywordList =
    "Anthropic Skills, Claude AI, AI Skills, 提示词模板, Prompt Engineering";

  const seoJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AllSkills.cn",
    description: "探索全部 Anthropic Skills，中文聚合导航站",
    url: "https://allskills.cn",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://allskills.cn/skills?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: skills.slice(0, 50).map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: skill.name,
      url: `https://allskills.cn/skills/${skill.slug}`
    }))
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Anthropic Skills 是免费的吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "是的！大部分 Skills 基于 Apache 2.0 或 source-available 协议，可免费使用与学习。"
        }
      },
      {
        "@type": "Question",
        name: "我需要注册 Claude 账号吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "浏览不需要注册，使用时需要 Claude 账号。"
        }
      },
      {
        "@type": "Question",
        name: "怎么把 Skill 变成 System Prompt？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "复制 Skill 指令后，在 Claude 的系统提示或 Project 中粘贴即可。"
        }
      },
      {
        "@type": "Question",
        name: "这些 Skill 支持 GPT-4 吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "主要针对 Claude 优化，但逻辑结构可迁移到其他模型。"
        }
      }
    ]
  };

  const featuredSlugs = [
    "canvas-design",
    "algorithmic-art",
    "awesome-content-research-writer",
    "brand-guidelines",
    "doc-coauthoring"
  ];

  const featuredSkills = featuredSlugs
    .map((slug) => skills.find((skill) => skill.slug === slug))
    .filter(Boolean);

  const categoryOrderZh = [
    { key: "Design Ops", label: "设计", desc: "海报、品牌、UI设计" },
    { key: "Dev Tools", label: "开发", desc: "代码测试、Git日志" },
    { key: "Docs & Writing", label: "写作", desc: "技术文档、协作写作" },
    { key: "Creative Coding", label: "创意", desc: "p5.js、生成艺术" },
    { key: "General", label: "通用", desc: "分析、研究、效率" },
    { key: "Comms", label: "通讯", desc: "邮件、沟通辅助" },
    { key: "Testing", label: "测试", desc: "自动化测试方案" },
    { key: "Media", label: "媒体", desc: "图片处理、元数据" }
  ];

  const categoryOrderEn = [
    { key: "Design Ops", label: "Design", desc: "Posters, branding, UI design" },
    { key: "Dev Tools", label: "Dev Tools", desc: "Code testing, Git logs" },
    { key: "Docs & Writing", label: "Writing", desc: "Technical docs, collaboration" },
    { key: "Creative Coding", label: "Creative", desc: "p5.js, generative art" },
    { key: "General", label: "General", desc: "Analysis, research, productivity" },
    { key: "Comms", label: "Comms", desc: "Email, communication" },
    { key: "Testing", label: "Testing", desc: "Automated testing" },
    { key: "Media", label: "Media", desc: "Image processing, metadata" }
  ];

  const categoryOrder = locale === "zh" ? categoryOrderZh : categoryOrderEn;
  const categoryMap = new Map(categories.map((category) => [category.name, category]));

  const isZh = locale === "zh";

  return (
    <>
      <SeoHead
        title={isZh ? "Anthropic Skills 完整目录" : "Anthropic Skills Directory"}
        description={
          isZh
            ? "探索 50+ 个 Anthropic 官方 Claude Skills，覆盖设计、开发、内容创作。一键复制，免费使用。"
            : "Explore Anthropic Skills with categories, guides, and copy-ready prompts."
        }
        path={isZh ? "/" : "/en"}
        keywords={isZh ? keywordList : undefined}
        jsonLd={isZh ? [seoJsonLd, itemListJsonLd, faqJsonLd] : undefined}
      />

      <div className="home-page">
        <section className="home-hero">
          <div className="home-shell">
            <div className="home-hero__inner">
              <h1>{t(locale, "heroTitle")}</h1>
              <p className="home-hero__subtitle">
                {isZh
                  ? "50+ 个 Claude AI 官方技能，覆盖设计、开发、内容创作场景。"
                  : "50+ official Claude AI skills for design, development, and content creation."}
              </p>
              <div className="home-hero__stats">
                <div className="stat-card">
                  <strong>50+</strong>
                  <span>{isZh ? "官方 Skills" : "Official Skills"}</span>
                </div>
                <div className="stat-card">
                  <strong>8</strong>
                  <span>{isZh ? "分类" : "Categories"}</span>
                </div>
                <div className="stat-card">
                  <strong>100%</strong>
                  <span>{isZh ? "免费开源" : "Free & Open"}</span>
                </div>
              </div>
              <form
                className="home-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  const query = event.currentTarget.query.value.trim();
                  if (query) {
                    router.push(withLocale(`/skills?q=${encodeURIComponent(query)}`, locale));
                  }
                }}
              >
                <input
                  name="query"
                  placeholder={
                    isZh
                      ? "搜索 Skill 名称或用途"
                      : "Search skills by name or use case"
                  }
                />
                <button type="submit">{isZh ? "搜索" : "Search"}</button>
              </form>
            </div>
          </div>
        </section>

        <div className="home-shell">
          <section className="section doc-section">
            <div className="section__header">
              <h2>{isZh ? "什么是 Anthropic Skills？" : "What are Anthropic Skills?"}</h2>
            </div>
            <div className="doc-columns">
              <div className="doc-card">
                {isZh ? (
                  <>
                    <p>
                      Anthropic Skills 是 Claude AI 的官方技能库，包含 50+ 个提示词模板和系统指令。
                      每个 Skill 是一个专业的能力单元，让 Claude 在特定领域发挥更好的效果。
                    </p>
                    <p>
                      这些 Skills 由 Anthropic 官方团队开发维护，基于用户反馈和实践经验。
                      相比普通提示词，它们结构更完整，输出更稳定。
                    </p>
                    <p>
                      设计师：生成艺术、品牌视觉、UI 组件
                      <br />
                      开发者：代码生成、自动化测试、文档编写
                      <br />
                      创作者：博客写作、SEO 优化、文案润色
                    </p>
                    <Link href={withLocale("/blog", locale)}>了解更多关于 Prompt Engineering</Link>
                  </>
                ) : (
                  <>
                    <p>
                      Anthropic Skills is the official skill library for Claude AI, containing 50+ prompt templates and system instructions.
                      Each Skill is a specialized capability unit that helps Claude perform better in specific domains.
                    </p>
                    <p>
                      These Skills are developed and maintained by the Anthropic team, based on user feedback and practical experience.
                      Compared to regular prompts, they have more complete structures and produce more consistent outputs.
                    </p>
                    <p>
                      Designers: generative art, brand visuals, UI components
                      <br />
                      Developers: code generation, automated testing, documentation
                      <br />
                      Creators: blog writing, SEO optimization, copywriting
                    </p>
                    <Link href={withLocale("/blog", locale)}>Learn more about Prompt Engineering</Link>
                  </>
                )}
              </div>
              <div className="doc-card doc-card--grid">
                {(isZh
                  ? ["设计", "开发", "写作", "创意", "分析", "通讯", "测试", "媒体"]
                  : ["Design", "Dev", "Writing", "Creative", "Analysis", "Comms", "Testing", "Media"]
                ).map((label) => (
                  <div className="icon-tile" key={label}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "Skills 能做什么？" : "What can Skills do?"}</h2>
            </div>
            <div className="scenario-grid">
              <div className="scenario-card">
                <p className="eyebrow">{isZh ? "设计" : "DESIGN"}</p>
                <h3>{isZh ? "设计辅助" : "Design Assistant"}</h3>
                <p>{isZh ? "生成配色方案、Logo 灵感和宣传海报。" : "Generate color schemes, logo ideas, and promotional posters."}</p>
                <div>{isZh ? "推荐 Skills：" : "Recommended:"}</div>
                <div>
                  <Link href={withLocale("/skills/canvas-design", locale)}>Canvas Design</Link> ·{" "}
                  <Link href={withLocale("/skills/brand-guidelines", locale)}>Brand Guidelines</Link>
                </div>
              </div>
              <div className="scenario-card">
                <p className="eyebrow">{isZh ? "开发" : "DEV"}</p>
                <h3>{isZh ? "开发工具" : "Dev Tools"}</h3>
                <p>{isZh ? "代码审查、生成测试用例和发布日志。" : "Code review, test case generation, and release notes."}</p>
                <div>{isZh ? "推荐 Skills：" : "Recommended:"}</div>
                <div>
                  <Link href={withLocale("/skills/awesome-changelog-generator", locale)}>
                    Changelog Generator
                  </Link>{" "}
                  · <Link href={withLocale("/skills/webapp-testing", locale)}>Web Testing</Link>
                </div>
              </div>
              <div className="scenario-card">
                <p className="eyebrow">{isZh ? "写作" : "WRITING"}</p>
                <h3>{isZh ? "内容创作" : "Content Creation"}</h3>
                <p>{isZh ? "调研、文章润色和 SEO 结构优化。" : "Research, article editing, and SEO structure optimization."}</p>
                <div>{isZh ? "推荐 Skills：" : "Recommended:"}</div>
                <div>
                  <Link href={withLocale("/skills/awesome-content-research-writer", locale)}>
                    Content Researcher
                  </Link>{" "}
                  · <Link href={withLocale("/skills/doc-coauthoring", locale)}>Docs Authoring</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-muted">
            <div className="section__header">
              <h2>{isZh ? "如何使用？" : "How to use?"}</h2>
            </div>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">1</div>
                <h3>{isZh ? "选择 Skill" : "Choose a Skill"}</h3>
                <p>{isZh ? "浏览 50+ 官方 Skills，通过分类或搜索找到适合的技能。" : "Browse 50+ official Skills, find what you need by category or search."}</p>
              </div>
              <div className="step-card">
                <div className="step-num">2</div>
                <h3>{isZh ? "一键复制" : "Copy"}</h3>
                <p>{isZh ? "打开 Skill 详情，点击复制按钮，系统指令会复制到剪贴板。" : "Open Skill details, click copy, and the system prompt is in your clipboard."}</p>
              </div>
              <div className="step-card">
                <div className="step-num">3</div>
                <h3>{isZh ? "在 Claude 中使用" : "Use in Claude"}</h3>
                <p>{isZh ? "在 Claude.ai 粘贴指令到对话框或 Project System Prompt。" : "Paste the prompt into Claude.ai chat or Project System Prompt."}</p>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "为什么选择 AllSkills.cn？" : "Why AllSkills.cn?"}</h2>
            </div>
            <div className="value-grid">
              <div className="value-card">
                <strong>{isZh ? "中文优化" : "Chinese Optimized"}</strong>
                <div>{isZh ? "完整的中文翻译和使用说明。" : "Full Chinese translation and usage guides."}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "搜索" : "Search"}</strong>
                <div>{isZh ? "按名称、场景、关键词查找。" : "Find by name, scenario, or keyword."}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "移动端适配" : "Mobile Friendly"}</strong>
                <div>{isZh ? "手机上也能查找和复制 Prompt。" : "Browse and copy prompts on mobile."}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "一键复制" : "One-Click Copy"}</strong>
                <div>{isZh ? "无需注册，点击即用。" : "No signup required, click to use."}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "同步更新" : "Synced Updates"}</strong>
                <div>{isZh ? "跟进 Anthropic 官方仓库更新。" : "Synced with official Anthropic repo."}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "免费" : "Free"}</strong>
                <div>{isZh ? "基于开源协议免费开放。" : "Free under open source license."}</div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "按分类浏览" : "Browse by Category"}</h2>
            </div>
            <div className="category-grid">
              {categoryOrder.map((entry) => {
                const category = categoryMap.get(entry.key);
                if (!category) return null;
                const count = category.items.length;
                const countLabel = count === 1 ? "1 Skill" : `${count} Skills`;
                return (
                  <Link
                    key={entry.key}
                    href={withLocale(`/collections#${toAnchorId(entry.key)}`, locale)}
                    className="category-card-doc"
                  >
                    <div className="category-card-doc__title">
                      {entry.label}（{entry.key}）
                    </div>
                    <div className="category-card-doc__desc">{countLabel}</div>
                    <div className="category-card-doc__desc">{entry.desc}</div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "热门 Skills" : "Popular Skills"}</h2>
              <Link href={withLocale("/skills", locale)}>{isZh ? "查看更多" : "View all"}</Link>
            </div>
            <div className="featured-grid">
              {featuredSkills.map((skill) => (
                <div key={skill.slug} className="featured-card">
                  <div className="featured-card__title">
                    <h3>{skill.name}</h3>
                    <span className="badge">{isZh ? "开源" : "Open Source"}</span>
                  </div>
                  <p>{skill.description}</p>
                  <div className="featured-card__uses">
                    <strong>{isZh ? "适用场景：" : "Use cases:"}</strong>
                    {(skill.useCases || []).slice(0, 3).map((useCase) => (
                      <span key={useCase}>{useCase}</span>
                    ))}
                  </div>
                  <div className="featured-card__actions">
                    <Link href={withLocale(`/skills/${skill.slug}`, locale)}>{isZh ? "查看详情" : "Details"}</Link>
                    <Link href={withLocale(`/skills/${skill.slug}`, locale)}>{isZh ? "复制" : "Copy"}</Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const categories = getCategories(skills);

  return {
    props: {
      skills,
      categories
    }
  };
}
