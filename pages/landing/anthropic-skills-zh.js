import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills, getCategories } from "../../lib/skills";
import { getCategoryLabel } from "../../lib/categories";
import site from "../../data/site.json";

const FAQ = [
  {
    q: "Anthropic Skills 是什么？",
    a: "Anthropic Skills 是 Claude 官方技能库，包含系统提示词和最佳实践，帮助在特定领域得到更稳定、结构化的输出。"
  },
  {
    q: "这些技能可以免费使用吗？",
    a: "可以。大部分基于开源或 source-available 协议，可直接查看、复制使用。"
  },
  {
    q: "如何在 Claude 中使用？",
    a: "打开技能详情页，点击“复制”，在 Claude 对话或 Project System Prompt 中粘贴即可。"
  },
  {
    q: "是否有中文翻译？",
    a: "本页聚合了中文翻译与用法说明，支持按分类和标签快速筛选。"
  }
];

const FEATURED_SLUGS = [
  "awesome-brand-guidelines",
  "awesome-canvas-design",
  "awesome-changelog-generator",
  "planning-with-files",
  "awesome-content-research-writer",
  "awesome-pdf",
  "awesome-webapp-testing",
  "awesome-mcp-builder",
  "awesome-image-enhancer",
  "awesome-internal-comms",
  "awesome-developer-growth-analysis",
  "awesome-theme-factory"
];

export default function AnthropicSkillsZhLanding({ featured, categoriesLimited }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Anthropic Skills 中文大全",
      description: "Anthropic Skills / Claude Skills 中文翻译与用法大全，按分类和标签筛选，一键复制系统提示词。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/anthropic-skills-zh`,
      url: `${site.domain}/landing/anthropic-skills-zh`,
      keywords: ["Anthropic Skills", "Claude Skills", "中文", "提示词", "系统提示"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: featured.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: skill.nameZh || skill.name,
        url: `${site.domain}/skills/${skill.slug}`
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Anthropic Skills 中文大全"
        description="Anthropic Skills / Claude Skills 中文翻译与用法大全，按分类和标签筛选，一键复制系统提示词。"
        path="/landing/anthropic-skills-zh"
        keywords="Anthropic Skills, Claude Skills, 中文, 提示词, 系统提示"
        jsonLd={jsonLd}
        ogType="article"
      />
      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>Anthropic Skills 中文大全</h1>
          <p>
            官方与社区技能的中文翻译与用法集合，支持分类浏览与标签筛选，一键复制到 Claude。
          </p>
          <div className="pill-row">
            {categoriesLimited.map((category) => (
              <span key={category.name} className="pill">
                {getCategoryLabel(category.name, "zh")} · {category.items.length}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>精选技能</h2>
        <p className="lead">
          覆盖设计、开发、测试、写作等高频场景，直接复制系统提示词使用。
        </p>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>按分类推荐</h2>
        {categoriesLimited.map((category) => (
          <div key={category.name} className="collection">
            <div className="collection__header">
              <h3>{getCategoryLabel(category.name, "zh")}</h3>
              <span>{category.items.length} 个推荐</span>
            </div>
            <div className="grid grid--dense">
              {category.items.map((skill) => (
                <SkillCard key={skill.slug} skill={skill} />
              ))}
            </div>
          </div>
        ))}
        <div className="load-more">
          <a className="btn" href="/skills/">
            查看全部 Skills
          </a>
        </div>
      </section>

      <section className="section">
        <h2>常见问题</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (
            <li key={item.q}>
              <strong>{item.q}</strong>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const slugMap = new Map(skills.map((s) => [s.slug, s]));
  const featured = FEATURED_SLUGS.map((slug) => slugMap.get(slug)).filter(Boolean);

  const categories = getCategories(skills).map((category) => ({
    ...category,
    items: category.items.slice(0, 3)
  }));

  return { props: { featured, categoriesLimited: categories } };
}
