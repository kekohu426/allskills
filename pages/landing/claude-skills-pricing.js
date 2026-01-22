import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const POINTS = [
  {
    title: "Skills 通常免费",
    desc: "Claude Skills 多数是模板或提示结构，通常不单独收费。"
  },
  {
    title: "费用来自模型使用",
    desc: "成本取决于你使用的 Claude 计划或 API 调用。"
  },
  {
    title: "以官方为准",
    desc: "具体定价请以官方页面为准，本页面仅提供概览。"
  }
];

const FAQ = [
  {
    q: "claude skills pricing 是多少？",
    a: "Skills 本身通常免费，成本取决于 Claude 计划或 API 计费。"
  },
  {
    q: "使用 Skills 会额外收费吗？",
    a: "通常不会，除非你在使用收费的模型或服务。"
  },
  {
    q: "哪里查看官方定价？",
    a: "请查看 Claude 官方定价页面以获取最新信息。"
  }
];

export default function ClaudeSkillsPricingLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Claude skills pricing",
      description: "Claude skills pricing 概览：技能通常免费，成本取决于计划或 API。",
      url: `${site.domain}/landing/claude-skills-pricing`,
      inLanguage: "zh-CN",
      keywords: ["claude skills pricing"]
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
        title="Claude skills pricing"
        description="Claude skills pricing 概览：技能通常免费，成本取决于计划或 API。"
        path="/landing/claude-skills-pricing"
        keywords="claude skills pricing"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude skills pricing</p>
          <h1>Claude skills pricing</h1>
          <p>理解 Skills 的成本结构：模板免费，费用来自模型使用。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">浏览 Skills</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>定价要点</h2>
        <div className="features-grid">
          {POINTS.map((item) => (
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
        <h2>开始使用 Claude Skills</h2>
        <p>不确定是否收费？先从免费的技能模板开始。</p>
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
