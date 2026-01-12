import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "canvas-design",
  "awesome-canvas-design",
  "skills-main-canvas-design",
  "algorithmic-art",
  "skills-main-algorithmic-art",
  "awesome-theme-factory"
];

const FAQ = [
  {
    q: "适合哪些设计场景？",
    a: "海报、KV、插画、静态视觉稿、主题色定制等都可以用本页技能快速生成草稿。"
  },
  {
    q: "如何导出？",
    a: "大部分技能支持生成 PNG/PDF，Canvas 相关可直接输出画布文件或截屏。"
  },
  {
    q: "能否控制风格与配色？",
    a: "可以，通过提示词中的主题/配色参数或搭配主题工厂技能实现。"
  }
];

export default function CanvasDesignLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "AI 海报/视觉设计提示词 | Canvas Design",
      description: "海报、视觉稿、Canvas 设计提示词精选，支持主题、配色与导出。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/canvas-design`,
      url: `${site.domain}/landing/canvas-design`,
      keywords: ["AI 海报设计", "Canvas Design", "视觉设计提示词", "主题配色"]
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
        title="AI 海报/视觉设计提示词 | Canvas Design"
        description="海报、视觉稿、Canvas 设计提示词精选，支持主题、配色与导出。"
        path="/landing/canvas-design"
        keywords="AI 海报设计, Canvas Design, 视觉设计提示词, 主题配色"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>AI 视觉设计提示词</h1>
          <p>生成海报、KV、插画和主题化视觉稿，支持 Canvas/主题/配色一键应用。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选视觉设计技能</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills/canvas-design/">
            查看 Canvas 设计技能
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
