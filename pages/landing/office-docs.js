import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "awesome-docx",
  "awesome-pptx",
  "awesome-xlsx",
  "docx",
  "pptx",
  "xlsx"
];

const FAQ = [
  {
    q: "支持哪些格式？",
    a: "DOCX、PPTX、XLSX/CSV 相关的创建、编辑、格式保持、批注、公式与布局调整。"
  },
  {
    q: "如何保证格式和批注？",
    a: "技能内的提示词强调格式保留与修订/批注处理，可直接复制到 Claude 执行。"
  },
  {
    q: "能否与 PDF 转换搭配？",
    a: "可以，结合 PDF 技能可实现生成/导出或批量转换流程。"
  }
];

export default function OfficeDocsLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Office 文档提示词 | DOCX / PPTX / XLSX",
      description: "Office 文档技能合集，支持格式保留、批注、公式、布局和数据处理，可与 PDF 转换搭配使用。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/office-docs`,
      url: `${site.domain}/landing/office-docs`,
      keywords: ["DOCX 提示词", "PPTX 提示词", "XLSX 提示词", "Office 文档"]
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
        title="Office 文档提示词 | DOCX / PPTX / XLSX"
        description="Office 文档技能合集，支持格式保留、批注、公式、布局和数据处理，可与 PDF 转换搭配使用。"
        path="/landing/office-docs"
        keywords="DOCX 提示词, PPTX 提示词, XLSX 提示词, Office 文档"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>Office 文档技能合集</h1>
          <p>处理 DOCX/PPTX/XLSX 的格式、批注、公式和布局，适合报告、幻灯和数据表制作。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选 Office 技能</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
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
  return { props: { featured } };
}
