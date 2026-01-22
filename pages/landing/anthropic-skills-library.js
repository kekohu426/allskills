import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const HIGHLIGHTS = [
  {
    title: "集中收录",
    desc: "汇聚官方与社区 Claude Skills，形成统一的 skills library。"
  },
  {
    title: "易于发现",
    desc: "按分类、标签与关键词搜索，快速找到合适技能。"
  },
  {
    title: "可复用",
    desc: "每个技能提供结构化 SKILL.md，方便复制使用。"
  }
];

const FAQ = [
  {
    q: "Anthropic Skills Library 是什么？",
    a: "一个聚合 Claude Skills 的技能库，用于发现与复用。"
  },
  {
    q: "Skills Library 和普通列表有什么区别？",
    a: "它强调结构化与来源标识，便于筛选与复用。"
  },
  {
    q: "可以直接使用技能吗？",
    a: "可以，通常复制 SKILL.md 即可开始使用。"
  }
];

export default function AnthropicSkillsLibraryLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Skills Library",
      description: "Anthropic Skills Library：聚合 Claude Skills 的技能库。",
      url: `${site.domain}/landing/anthropic-skills-library`,
      inLanguage: "zh-CN",
      keywords: ["anthropic skills library"]
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
        title="Anthropic Skills Library"
        description="Anthropic Skills Library：聚合 Claude Skills 的技能库。"
        path="/landing/anthropic-skills-library"
        keywords="anthropic skills library"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Skills Library</p>
          <h1>Anthropic Skills Library</h1>
          <p>一个面向 Claude 的技能库，集中发现与复用工作流。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">浏览技能库</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>为什么需要 Skills Library？</h2>
        <div className="features-grid">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
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
        <h2>开始使用 Anthropic Skills Library</h2>
        <p>从这里找到你的下一个 Claude Skill。</p>
        <a className="btn btn--primary" href="/skills">打开技能库</a>
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
