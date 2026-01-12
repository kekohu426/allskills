import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = ["pdf", "awesome-pdf", "skills-main-pdf", "awesome-docx", "awesome-pptx"];

const FAQ = [
  {
    q: "支持哪些 PDF 操作？",
    a: "文本/表格提取、合并拆分、表单填写、批量生成、格式保持等。"
  },
  {
    q: "是否兼容 Office 文档？",
    a: "这里也提供 DOCX/PPTX 的助手，方便跨格式转换或生成后导出为 PDF。"
  },
  {
    q: "如何使用？",
    a: "打开技能详情，复制提示词，根据需要粘贴到 Claude，对话或 Project Prompt 均可。"
  }
];

export default function PdfToolkitLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "PDF 处理提示词 | 提取、表单、批量生成",
      description: "PDF 处理技能合集，支持提取/合并/表单/批量生成，并附带 DOCX/PPTX 相关助手。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/pdf-toolkit`,
      url: `${site.domain}/landing/pdf-toolkit`,
      keywords: ["PDF 提示词", "PDF 表单", "PDF 提取", "PDF 合并", "文档转换"]
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
        title="PDF 处理提示词 | 提取、表单、批量生成"
        description="PDF 处理技能合集，支持提取/合并/表单/批量生成，并附带 DOCX/PPTX 相关助手。"
        path="/landing/pdf-toolkit"
        keywords="PDF 提示词, PDF 表单, PDF 提取, PDF 合并, 文档转换"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>PDF 处理提示词合集</h1>
          <p>提取、表单、合并拆分、批量生成，一键复制即可在 Claude 中处理 PDF。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选 PDF/文档技能</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills/pdf/">
            查看 PDF 技能
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
