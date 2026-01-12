import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "brand-guidelines",
  "awesome-brand-guidelines",
  "skills-main-brand-guidelines",
  "awesome-theme-factory",
  "theme-factory",
  "awesome-canvas-design"
];

const FAQ = [
  {
    q: "这个页面适合什么人？",
    a: "设计师、品牌/市场运营、需要统一配色与字体的团队，可以直接复制提示词批量应用。"
  },
  {
    q: "支持哪些场景？",
    a: "品牌色套用、字体/字号/层级设定、幻灯片与文档主题、海报/视觉稿快速成型。"
  },
  {
    q: "如何使用？",
    a: "打开技能详情，点击复制，将系统提示粘贴到 Claude 对话或 Project System Prompt。"
  }
];

export default function BrandGuidelinesLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "品牌指南提示词 | Anthropic 品牌色与主题",
      description: "品牌指南/主题工厂/设计配色提示词合集，统一配色、字体、主题，适用于幻灯片、文档和海报。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/brand-guidelines`,
      url: `${site.domain}/landing/brand-guidelines`,
      keywords: ["品牌指南", "品牌配色", "主题工厂", "设计提示词"]
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
        title="品牌指南提示词 | Anthropic 品牌色与主题"
        description="品牌指南/主题工厂/设计配色提示词合集，统一配色、字体、主题，适用于幻灯片、文档和海报。"
        path="/landing/brand-guidelines"
        keywords="品牌指南, 品牌配色, 主题工厂, 设计提示词"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>品牌指南 & 主题提示词</h1>
          <p>统一品牌配色、字体与版式，用于幻灯片、文档和视觉稿，直接复制即可使用。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选品牌与主题技能</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills/brand-guidelines/">
            查看品牌指南技能
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
