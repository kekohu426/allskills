import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const COMPARISON = [
  {
    title: "Skills",
    items: [
      "定位：定义行为与任务流程",
      "形式：SKILL.md + 资源目录",
      "适合：可复用提示模板与结构化输出"
    ]
  },
  {
    title: "MCP",
    items: [
      "定位：连接外部工具与服务",
      "形式：协议 + Server 接口",
      "适合：工具调用、数据访问与系统集成"
    ]
  }
];

const FAQ = [
  {
    q: "Skills vs MCP 的核心区别？",
    a: "Skills 关注“怎么做”，MCP 关注“怎么连”。"
  },
  {
    q: "什么时候用 Skills？",
    a: "需要稳定流程、模板化输出或可复制实践时使用 Skills。"
  },
  {
    q: "什么时候用 MCP？",
    a: "需要调用外部系统或实时数据时选择 MCP。"
  }
];

export default function SkillsVsMcpLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Skills vs MCP",
      description: "Skills vs MCP：理解 Claude Skills 与 MCP 的区别与适用场景。",
      url: `${site.domain}/landing/skills-vs-mcp`,
      inLanguage: "zh-CN",
      keywords: ["skills vs mcp"]
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
        title="Skills vs MCP"
        description="Skills vs MCP：理解 Claude Skills 与 MCP 的区别与适用场景。"
        path="/landing/skills-vs-mcp"
        keywords="skills vs mcp"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skills vs MCP</p>
          <h1>Skills vs MCP</h1>
          <p>一页看懂 Skills 与 MCP 的定位、形式与适用场景。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">浏览 Skills</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>对比概览</h2>
        <div className="compare-grid">
          {COMPARISON.map((block) => (
            <div key={block.title} className="compare-card">
              <h3>{block.title}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
        <p>如果你需要稳定的流程与模板化输出，选择 Skills。</p>
        <a className="btn btn--primary" href="/skills">打开 Skills Directory</a>
      </section>

      <style jsx>{`
        .compare-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .compare-card {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
        }
        .compare-card ul {
          margin: 0.75rem 0 0;
          padding-left: 1.1rem;
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
