import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const COMPARISON = [
  {
    title: "Skills",
    items: [
      "Purpose: define behavior and workflows",
      "Format: SKILL.md + resources",
      "Best for: reusable templates and structured outputs"
    ]
  },
  {
    title: "MCP",
    items: [
      "Purpose: connect external tools and services",
      "Format: protocol + server interface",
      "Best for: tool calling and system integrations"
    ]
  }
];

const FAQ = [
  {
    q: "Skills vs MCP: what is the core difference?",
    a: "Skills define how work is done; MCP connects to tools and services."
  },
  {
    q: "When should I use skills?",
    a: "Use skills for repeatable workflows and consistent outputs."
  },
  {
    q: "When should I use MCP?",
    a: "Use MCP when you need external tools or real-time data."
  }
];

export default function SkillsVsMcpLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Skills vs MCP",
      description: "Skills vs MCP: understand the difference and when to use each.",
      url: `${site.domain}/en/landing/skills-vs-mcp`,
      inLanguage: "en",
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
        description="Skills vs MCP: understand the difference and when to use each."
        path="/en/landing/skills-vs-mcp"
        keywords="skills vs mcp"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skills vs MCP</p>
          <h1>Skills vs MCP</h1>
          <p>A simple guide to choose between skills and MCP.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Browse Skills</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Comparison</h2>
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
        <h2>FAQ</h2>
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
        <h2>Start with skills</h2>
        <p>If you need repeatable workflows, start with skills.</p>
        <a className="btn btn--primary" href="/en/skills">Open Skills Directory</a>
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
