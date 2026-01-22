import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "查看来源标签",
    desc: "详情页会显示 sourceLabel，用于识别官方或社区来源。"
  },
  {
    step: "02",
    title: "打开仓库链接",
    desc: "sourceUrl 指向原始仓库，可进一步确认发布方。"
  },
  {
    step: "03",
    title: "核对结构",
    desc: "官方技能通常有完整的 SKILL.md 与配套资源目录。"
  }
];

const FAQ = [
  {
    q: "什么是 anthropic official skills？",
    a: "指由 Anthropic 官方仓库维护的 Claude Skills。"
  },
  {
    q: "如何在目录中识别官方技能？",
    a: "查看详情页的 sourceLabel 与 sourceUrl。"
  },
  {
    q: "官方技能可以直接使用吗？",
    a: "可以，复制 SKILL.md 并按需加载资源即可。"
  }
];

export default function AnthropicOfficialSkillsLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Official Skills",
      description: "如何识别与使用 Anthropic 官方 Skills。",
      url: `${site.domain}/landing/anthropic-official-skills`,
      inLanguage: "zh-CN",
      keywords: ["anthropic official skills"]
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
        title="Anthropic Official Skills"
        description="如何识别与使用 Anthropic 官方 Skills。"
        path="/landing/anthropic-official-skills"
        keywords="anthropic official skills"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Official Skills</p>
          <h1>Anthropic Official Skills</h1>
          <p>快速识别官方技能来源，并正确使用 Claude Skills。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">查看技能目录</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>如何识别官方技能</h2>
        <div className="steps-grid">
          {STEPS.map((item) => (
            <div key={item.step} className="step-card">
              <span className="step-num">{item.step}</span>
              <h4>{item.title}</h4>
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
        <h2>开始使用官方 Skills</h2>
        <p>从技能目录中筛选官方来源的 Claude Skills。</p>
        <a className="btn btn--primary" href="/skills">浏览 Skills</a>
      </section>

      <style jsx>{`
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .step-card {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
        }
        .step-num {
          display: inline-block;
          font-family: "Rajdhani", sans-serif;
          color: var(--accent);
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
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
