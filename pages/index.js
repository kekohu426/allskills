import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "../components/SeoHead";
import SkillCard from "../components/SkillCard";
import CategoryCard from "../components/CategoryCard";
import { getAllSkills, getCategories } from "../lib/skills";
import { getAllPosts } from "../lib/blog";
import { t } from "../lib/i18n";
import { getLocaleFromPath, withLocale } from "../lib/paths";

export default function Home({ skills, categories, posts, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const keywordList =
    "Anthropic Skills, Claude Skills, AI Skills, Claude AI, 提示词模板, AI 技能库, Claude 教程";
  const seoJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AllSkills.cn",
    description: "发现最好用最全的 AI Skills",
    url: "https://allskills.cn",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://allskills.cn/skills?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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
            "是的！大部分 Skills 基于 Apache 2.0 开源协议，部分为 source-available，但均可免费使用与学习。"
        }
      },
      {
        "@type": "Question",
        name: "我需要注册账号才能使用吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "无需注册即可浏览与复制 Skill 指令，但你需要 Claude 账号才能在 Claude 中运行这些 Skills。"
        }
      },
      {
        "@type": "Question",
        name: "Skills 和普通提示词有什么区别？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Skills 是 Anthropic 官方团队整理的系统化指令集，相比普通提示词更稳定、更专业，复用成本更低。"
        }
      },
      {
        "@type": "Question",
        name: "如何在 Claude API 中使用这些 Skills？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "将 Skill 指令作为 system prompt 传入 Claude API，然后添加你的具体需求即可。"
        }
      }
    ]
  };
  const featuredSlugs = [
    "algorithmic-art",
    "canvas-design",
    "awesome-content-research-writer",
    "brand-guidelines",
    "awesome-changelog-generator",
    "awesome-competitive-ads-extractor"
  ];
  const featuredSkills = featuredSlugs
    .map((slug) => skills.find((skill) => skill.slug === slug))
    .filter(Boolean);

  return (
    <>
      <SeoHead
        title={locale === "zh" ? "AI Skills 目录" : "Skill Directory"}
        description={
          locale === "zh"
            ? "发现最好用最全的 AI Skills，提供分类、用法与可复制内容，持续更新。"
            : "A curated skill directory with categories, usage, and copy-ready content."
        }
        path={locale === "zh" ? "/" : "/en"}
        keywords={locale === "zh" ? keywordList : undefined}
        jsonLd={locale === "zh" ? [seoJsonLd, faqJsonLd] : undefined}
      />

      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">AllSkills.cn</p>
          <h1>{t(locale, "heroTitle")}</h1>
          <p className="hero__subtitle">
            {locale === "zh"
              ? "发现最好用最全的 AI Skills，探索开源与社区精品，让 Claude 成为你的设计师、开发助手、内容创作者。"
              : t(locale, "heroSubtitle")}
          </p>
          <form
            className="search"
            onSubmit={(event) => {
              event.preventDefault();
              const query = event.currentTarget.query.value.trim();
              if (query) {
                router.push(withLocale(`/skills?q=${encodeURIComponent(query)}`, locale));
              }
            }}
          >
            <input name="query" placeholder="搜索 Skills…" />
            <button type="submit">搜索</button>
          </form>
          <div className="hero__actions">
            <Link className="btn" href={withLocale("/skills", locale)}>
              {t(locale, "heroCta")}
            </Link>
            <Link className="btn btn--ghost" href={withLocale("/blog", locale)}>
              Blog
            </Link>
          </div>
        </div>
        <div className="hero__panel">
          <div className="hero__panel-inner">
            <div className="hero__metric">
              <span>Skills</span>
              <strong>{skills.length}</strong>
            </div>
            <div className="hero__metric">
              <span>Categories</span>
              <strong>{categories.length}</strong>
            </div>
            <div className="hero__metric">
              <span>Open</span>
              <strong>100%</strong>
            </div>
          </div>
          <div className="hero__glass" />
        </div>
      </section>

      {locale === "zh" && (
        <section className="section seo-section">
          <div className="section__header">
            <h2>什么是 AI Skills？</h2>
            <Link href={withLocale("/skills", locale)}>查看技能库</Link>
          </div>
          <div className="seo-grid">
            <div className="seo-card">
              <p>
                AI Skills 是 Claude 等智能助手的技能库，包含一系列精心设计的提示词模板和指令集。
                每个 Skill 都是一个专业的 AI 能力单元，让 Claude 在特定领域表现出专家级水平。
                这些 Skills 覆盖创意设计、软件开发、内容创作、数据分析和生产力工具等方向。
              </p>
              <ul>
                <li>创意设计：生成艺术、品牌设计、UI/UX 视觉风格</li>
                <li>软件开发：代码生成、测试、文档编写、工具自动化</li>
                <li>内容创作：博客写作、广告文案、变更日志</li>
                <li>数据分析：竞品分析、增长研究、行业洞察</li>
                <li>生产力工具：文档协作、会议洞察、项目管理</li>
              </ul>
            </div>
            <div className="seo-card">
              <h3>为什么使用 Anthropic Skills？</h3>
              <p>
                传统 AI 对话需要反复调试提示词，而 Anthropic Skills 已将最佳实践写入指令，让你更快获得稳定、高质量输出。
              </p>
              <ul>
                <li>节省 80% 的提示词调试时间</li>
                <li>输出更一致、更专业</li>
                <li>学习顶级 AI 工程师的提示词结构</li>
                <li>直接复制粘贴，无需配置</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {locale === "zh" && (
        <section className="section">
          <div className="section__header">
            <h2>按分类浏览 Skills</h2>
            <Link href={withLocale("/collections", locale)}>查看全部分类</Link>
          </div>
          <div className="grid grid--dense">
            {categories.slice(0, 9).map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
          <div className="section__footer">
            <Link className="btn" href={withLocale("/skills", locale)}>
              浏览全部 {skills.length}+ Skills →
            </Link>
          </div>
        </section>
      )}

      {locale === "zh" && (
        <section className="section highlight-section">
          <div className="section__header">
            <h2>最受欢迎的 AI Skills</h2>
            <Link href={withLocale("/skills", locale)}>查看更多</Link>
          </div>
          <div className="highlight-grid">
            {featuredSkills.map((skill) => (
              <div key={skill.slug} className="highlight-card">
                <div className="highlight-card__title">
                  <span>{skill.name}</span>
                  <span className="badge">开源</span>
                </div>
                <p>{skill.description}</p>
                <div className="highlight-card__actions">
                  <Link href={withLocale(`/skills/${skill.slug}`, locale)}>查看详情</Link>
                  <Link href={withLocale(`/skills/${skill.slug}`, locale)}>复制 Skill</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {locale === "zh" && (
        <section className="section steps-section">
          <div className="section__header">
            <h2>如何使用 Anthropic Skills？</h2>
            <Link href={withLocale("/blog", locale)}>查看完整使用教程 →</Link>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <h3>第 1 步：选择 Skill</h3>
              <p>在 AllSkills.cn 浏览 25+ 个 Skills，按分类或搜索找到适合你场景的技能。</p>
              <span>提示：先从“通用”分类开始。</span>
            </div>
            <div className="step-card">
              <h3>第 2 步：复制 Skill 指令</h3>
              <p>进入详情页点击“复制”，完整指令会自动复制到剪贴板。</p>
              <span>提示：建议完整复制，不要删改原始指令。</span>
            </div>
            <div className="step-card">
              <h3>第 3 步：在 Claude 中使用</h3>
              <p>打开 Claude.ai 或 API，将 Skill 指令作为 system prompt，再补充具体需求。</p>
              <span>提示：可将常用 Skill 收藏在 Claude Projects。</span>
            </div>
          </div>
        </section>
      )}

      {locale === "zh" && (
        <section className="section value-section">
          <div className="section__header">
            <h2>为什么选择 AllSkills.cn？</h2>
          </div>
          <div className="value-grid">
            <div className="value-card">🇨🇳 中文优化：完整中文说明与使用场景</div>
            <div className="value-card">🔍 快速检索：搜索 + 分类矩阵</div>
            <div className="value-card">📱 移动友好：随时随地快速复制</div>
            <div className="value-card">📋 一键复制：无需注册直接使用</div>
            <div className="value-card">🆓 完全免费：开源技能可自由学习</div>
            <div className="value-card">🔄 持续更新：跟进官方最新发布</div>
          </div>
        </section>
      )}

      {locale === "zh" && (
        <section className="section scenario-section">
          <div className="section__header">
            <h2>Anthropic Skills 能做什么？</h2>
          </div>
          <div className="scenario-grid">
            <div className="scenario-card">
              <h3>🎨 设计师的 AI 助手</h3>
              <ul>
                <li>使用 Canvas Design 创建海报和品牌物料</li>
                <li>用 Brand Guidelines 保持品牌一致性</li>
                <li>通过 Algorithmic Art 探索生成艺术</li>
              </ul>
              <Link href={withLocale("/skills/canvas-design", locale)}>推荐 Skills →</Link>
            </div>
            <div className="scenario-card">
              <h3>💻 开发者的生产力工具</h3>
              <ul>
                <li>自动生成 Git Changelog，节省发布时间</li>
                <li>用 Doc Coauthoring 编写技术文档</li>
                <li>通过 Developer Growth Analysis 提升技能</li>
              </ul>
              <Link href={withLocale("/skills/awesome-changelog-generator", locale)}>
                推荐 Skills →
              </Link>
            </div>
            <div className="scenario-card">
              <h3>✍️ 内容创作者的写作伙伴</h3>
              <ul>
                <li>Content Researcher Writer 辅助研究和写作</li>
                <li>分析竞品广告，优化营销文案</li>
                <li>快速生成博客大纲和初稿</li>
              </ul>
              <Link href={withLocale("/skills/awesome-content-research-writer", locale)}>
                推荐 Skills →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="section__header">
          <h2>{t(locale, "sectionFeatured")}</h2>
          <Link href={withLocale("/skills", locale)}>All skills</Link>
        </div>
        <div className="grid">
          {skills.slice(0, 6).map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>{t(locale, "sectionCategories")}</h2>
          <Link href={withLocale("/collections", locale)}>View collections</Link>
        </div>
        <div className="grid grid--dense">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="section__header">
          <h2>{t(locale, "sectionLatest")}</h2>
          <Link href={withLocale("/blog", locale)}>Blog</Link>
        </div>
        <div className="blog-grid">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={withLocale(`/blog/${post.slug}`, locale)} className="blog-card">
              <p className="blog-card__eyebrow">{post.date}</p>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {locale === "zh" && (
        <section className="section faq-section">
          <div className="section__header">
            <h2>常见问题</h2>
          </div>
          <div className="faq-grid">
            <details>
              <summary>Anthropic Skills 是免费的吗？</summary>
              <p>是的！大部分 Skills 基于 Apache 2.0 开源协议，部分为 source-available。</p>
            </details>
            <details>
              <summary>我需要注册账号才能使用吗？</summary>
              <p>无需注册即可浏览与复制技能，但需要 Claude 账号才能运行。</p>
            </details>
            <details>
              <summary>Skills 和普通提示词有什么区别？</summary>
              <p>Skills 是官方优化过的系统化指令集，输出更稳定、复用更高效。</p>
            </details>
            <details>
              <summary>如何在 Claude API 中使用这些 Skills？</summary>
              <p>将 Skill 指令作为 system prompt 传入 API，再补充具体需求即可。</p>
            </details>
          </div>
        </section>
      )}

      {locale === "zh" && (
        <section className="section cta-section">
          <div className="cta-card">
            <h2>开始探索 Anthropic Skills</h2>
            <p>立即浏览 25+ 个专业 AI 技能，让 Claude 成为你的设计师、开发助手、内容创作者。</p>
            <Link className="btn" href={withLocale("/skills", locale)}>
              浏览全部 Skills →
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const categories = getCategories(skills);
  const posts = getAllPosts();

  return {
    props: {
      skills,
      categories,
      posts
    }
  };
}
