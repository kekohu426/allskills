import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "brand-guidelines",
  "awesome-brand-guidelines",
  "canvas-design",
  "awesome-canvas-design",
  "doc-coauthoring",
  "awesome-content-research-writer",
  "awesome-changelog-generator",
  "planning-with-files",
  "webapp-testing"
];

const FAQ = [
  {
    q: "Claude 提示词和技能有什么区别？",
    a: "技能是结构化的系统提示，包含用途说明和步骤，直接复制即可稳定复用；普通提示词更零散，效果不固定。"
  },
  {
    q: "如何在 Claude 中使用这些提示词？",
    a: "打开技能详情，点击“复制”，粘贴到 Claude 对话或 Project System Prompt，即可调用。"
  },
  {
    q: "适合哪些场景？",
    a: "品牌设计、海报创作、文档写作、代码发布日志、规划与测试等高频需求。"
  },
  {
    q: "可以商用吗？",
    a: "大部分技能基于开源或宽松协议，需遵守对应仓库的 License 说明。"
  }
];

export default function ClaudePromptsLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Claude 提示词大全 | 系统提示词精选",
      description: "Claude 提示词/系统提示词精选，覆盖品牌设计、海报、文档写作、规划与测试，一键复制即可使用。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/claude-prompts`,
      url: `${site.domain}/landing/claude-prompts`,
      keywords: ["Claude 提示词", "系统提示词", "Claude Skills", "Anthropic Skills"]
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
        title="Claude 提示词大全 | 系统提示词精选"
        description="Claude 提示词/系统提示词精选，覆盖品牌设计、海报、文档写作、规划与测试，一键复制即可使用。"
        path="/landing/claude-prompts"
        keywords="Claude 提示词, 系统提示词, Claude Skills, Anthropic Skills"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>Claude 提示词精选</h1>
          <p>官方与社区的系统提示词，直接复制，覆盖品牌、设计、写作、规划与测试等高频场景。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选提示词</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills/">
            浏览全部 Skills
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
  return { props: { featured } };
}
