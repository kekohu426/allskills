import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const FEATURES = [
  {
    title: "Claude Skills 专区",
    desc: "专注 Claude Skills 的目录入口，覆盖多场景。"
  },
  {
    title: "清晰分类",
    desc: "按主题与领域分类，快速定位适配技能。"
  },
  {
    title: "可复用模板",
    desc: "技能结构统一，便于复制与二次编辑。"
  }
];

const FAQ = [
  {
    q: "什么是 anthropic claude skills directory？",
    a: "一个面向 Claude Skills 的目录，便于集中查找。"
  },
  {
    q: "目录里包含官方技能吗？",
    a: "包含官方与社区来源，并在详情页标注来源。"
  },
  {
    q: "如何开始使用目录中的技能？",
    a: "进入技能详情页复制 SKILL.md 即可。"
  }
];

export default function AnthropicClaudeSkillsDirectoryLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Claude Skills Directory",
      description: "Anthropic Claude Skills Directory：集中浏览 Claude Skills。",
      url: `${site.domain}/landing/anthropic-claude-skills-directory`,
      inLanguage: "zh-CN",
      keywords: ["anthropic claude skills directory"]
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
        title="Anthropic Claude Skills Directory"
        description="Anthropic Claude Skills Directory：集中浏览 Claude Skills。"
        path="/landing/anthropic-claude-skills-directory"
        keywords="anthropic claude skills directory"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude Skills Directory</p>
          <h1>Anthropic Claude Skills Directory</h1>
          <p>面向 Claude 的技能目录，帮助你快速发现与复用技能。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">打开目录</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>目录特点</h2>
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
        <h2>开始浏览 Claude Skills</h2>
        <p>在目录中发现最适合你的 Claude 技能。</p>
        <a className="btn btn--primary" href="/skills">浏览 Skills</a>
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
