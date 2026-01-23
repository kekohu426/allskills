import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURES = [
  {
    title: "营销增长全链路",
    desc: "覆盖 CRO、文案、SEO、投放、增长等关键环节。"
  },
  {
    title: "可复用模板",
    desc: "每个技能都提供结构化 SKILL.md，易复制与调整。"
  },
  {
    title: "面向实战",
    desc: "聚焦可落地的增长策略、转化优化与内容产出。"
  }
];

const USE_CASES = [
  {
    title: "转化优化",
    desc: "落地页、弹窗、注册流程、付费升级等场景优化。"
  },
  {
    title: "营销内容",
    desc: "文案撰写、邮件序列、社媒内容与营销创意。"
  },
  {
    title: "SEO 与增长",
    desc: "技术 SEO、程序化 SEO、结构化数据与增长策略。"
  }
];

const FAQ = [
  {
    q: "这些营销技能来自哪里？",
    a: "来自 coreyhaines31/marketingskills 仓库，面向技术型营销与增长实践。"
  },
  {
    q: "可以直接使用吗？",
    a: "可以，复制 SKILL.md 后即可在 Claude Code 中使用。"
  },
  {
    q: "是否适合团队协作？",
    a: "适合。技能结构统一，便于标准化与复用。"
  }
];

export default function MarketingSkillsLanding({ skills }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Marketing Skills for Claude Code",
      description: "覆盖 CRO、文案、SEO 与增长的 Claude Marketing Skills。",
      url: `${site.domain}/landing/marketing-skills`,
      inLanguage: "zh-CN",
      keywords: ["marketing skills", "CRO", "copywriting", "SEO", "growth"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Marketing Skills for Claude Code | AllSkills"
        description="覆盖 CRO、文案、SEO 与增长的 Claude Marketing Skills，适合技术型营销与增长实践。"
        path="/landing/marketing-skills"
        keywords="marketing skills, CRO, copywriting, SEO, growth"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Marketing Skills</p>
          <h1>Claude Marketing Skills 专区</h1>
          <p>聚合营销增长技能库，帮助你系统化提升转化、内容与增长效率。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">浏览 Skills</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>核心优势</h2>
        <div className="features-grid">
          {FEATURES.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>适用场景</h2>
        <div className="features-grid">
          {USE_CASES.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>精选 Marketing Skills</h2>
        <div className="grid">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
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

      <section className="section cta-section">
        <h2>开始使用 Marketing Skills</h2>
        <p>从转化优化到增长策略，一次性补齐营销工作流。</p>
        <a className="btn btn--primary" href="/skills">打开 Skills 目录</a>
      </section>

      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .feature-item h3 {
          margin-bottom: 0.5rem;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .cta-section {
          text-align: center;
          padding: 3rem 1rem;
          background: var(--bg-secondary, #0f1422);
          border-radius: 12px;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills().filter((skill) => skill.slug.startsWith("marketingskills-"));
  return { props: { skills } };
}
