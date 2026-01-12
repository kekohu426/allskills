import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "awesome-content-research-writer",
  "doc-coauthoring",
  "awesome-internal-comms",
  "awesome-meeting-insights-analyzer",
  "awesome-lead-research-assistant",
  "awesome-changelog-generator"
];

const FAQ = [
  {
    q: "适合哪些写作场景？",
    a: "长文调研、结构化大纲、润色、引用补充、内部简报、会议纪要和更新日志等。"
  },
  {
    q: "是否能提供引用和事实核查？",
    a: "内容调研写作技能包含引用补充和检查步骤，可结合会议分析/线索研究技能。"
  },
  {
    q: "团队协作怎么做？",
    a: "文档协作技能支持多人编辑与批注，内部沟通技能提供模板与格式。"
  }
];

export default function ContentWritingLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "AI 内容写作提示词 | 调研、润色、纪要与简报",
      description: "内容调研写作、文档协作、内部沟通与会议纪要等提示词合集，适合长文与团队协作场景。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/content-writing`,
      url: `${site.domain}/landing/content-writing`,
      keywords: ["AI 写作提示词", "内容调研", "会议纪要", "内部沟通", "更新日志"]
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
        title="AI 内容写作提示词 | 调研、润色、纪要与简报"
        description="内容调研写作、文档协作、内部沟通与会议纪要等提示词合集，适合长文与团队协作场景。"
        path="/landing/content-writing"
        keywords="AI 写作提示词, 内容调研, 会议纪要, 内部沟通, 更新日志"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>AI 内容写作提示词</h1>
          <p>覆盖调研、写作、润色、纪要与内部沟通，附引用与格式模板，快速生成可用稿件。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选写作技能</h2>
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
