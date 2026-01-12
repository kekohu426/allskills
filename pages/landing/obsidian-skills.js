import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = ["obsidian-markdown", "obsidian-bases", "json-canvas"];

const FAQ = [
  {
    q: "支持哪些 Obsidian 文件类型？",
    a: "包含 Markdown（维基链接/属性/嵌入）、Bases（.base 数据视图）、JSON Canvas（三种节点/连线/分组）。"
  },
  {
    q: "适合什么场景？",
    a: "日记与知识库写作、数据表/卡片视图配置、思维导图或流程图建模。"
  },
  {
    q: "如何使用？",
    a: "复制对应技能提示词，在 Claude 中粘贴并提供你的需求或文件，按技能指引编写。"
  }
];

export default function ObsidianSkillsLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Obsidian 提示词 | Markdown / Bases / JSON Canvas",
      description: "Obsidian 专用提示词合集，覆盖 Markdown 语法、Bases 数据视图和 JSON Canvas 可视化。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/obsidian-skills`,
      url: `${site.domain}/landing/obsidian-skills`,
      keywords: ["Obsidian 提示词", "Obsidian Markdown", "Obsidian Bases", "JSON Canvas"]
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
        title="Obsidian 提示词 | Markdown / Bases / JSON Canvas"
        description="Obsidian 专用提示词合集，覆盖 Markdown 语法、Bases 数据视图和 JSON Canvas 可视化。"
        path="/landing/obsidian-skills"
        keywords="Obsidian 提示词, Obsidian Markdown, Obsidian Bases, JSON Canvas"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>Obsidian 技能合集</h1>
          <p>为 Obsidian 写 Markdown、配置 Bases 视图、绘制 JSON Canvas 的专用提示词，直接复制即可使用。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选 Obsidian 技能</h2>
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
