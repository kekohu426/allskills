import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const VALUE_PROPS = [
  {
    title: "Anthropic Skills Library",
    desc: "A curated Claude skills directory with official and community sources."
  },
  {
    title: "Official Skills Sources",
    desc: "Skill detail pages show source labels and repository links."
  },
  {
    title: "Skills vs MCP",
    desc: "A clear comparison of when to use skills and when to use MCP."
  },
  {
    title: "How to Use Claude Skills",
    desc: "Step-by-step guidance from discovery to usage."
  }
];

const HOW_STEPS = [
  {
    step: "01",
    title: "Find skills",
    desc: "Search the directory and filter by category and tags."
  },
  {
    step: "02",
    title: "Check sources",
    desc: "Open the skill detail page to verify official or community source."
  },
  {
    step: "03",
    title: "Use the skill",
    desc: "Copy SKILL.md and load any references or scripts as needed."
  }
];

const COMPARISON = [
  {
    topic: "Skills",
    when: "Define behavior, prompts, and workflows",
    form: "SKILL.md + optional resources",
    bestFor: "Reusable task templates and structured outputs"
  },
  {
    topic: "MCP",
    when: "Connect external tools and services",
    form: "Protocol + server interface",
    bestFor: "Tool calling, data access, and system integrations"
  }
];

const FAQ = [
  {
    q: "What is the Anthropic Skills Library?",
    a: "AllSkills is an Anthropic Claude skills directory that indexes official and community skills."
  },
  {
    q: "Where can I find Anthropic official skills?",
    a: "Each skill detail page includes a source label and repository link to verify official sources."
  },
  {
    q: "Skills vs MCP: what is the difference?",
    a: "Skills are reusable prompt templates; MCP connects tools and services via a protocol."
  },
  {
    q: "How to use Claude skills?",
    a: "Pick a skill, copy the SKILL.md, and load any referenced resources or scripts."
  },
  {
    q: "Claude skills pricing: do skills cost money?",
    a: "Skills are typically free templates; costs depend on your Claude plan or API usage."
  },
  {
    q: "Looking for anthropic skills algorithmic-art javascript library package.json?",
    a: "If a skill ships a package.json or JS dependencies, check the source repository linked on the skill detail page."
  }
];

export default function AnthropicSkillsDirectoryLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Claude Skills Directory | Anthropic Skills Library",
      description:
        "Anthropic Claude skills directory with official and community skills, skills vs MCP comparison, how to use Claude skills, and pricing guidance.",
      url: `${site.domain}/en/landing/anthropic-skills-directory`,
      inLanguage: "en",
      keywords: [
        "anthropic skills library",
        "anthropic skills directory",
        "anthropic claude skills directory",
        "anthropic official skills",
        "skills vs mcp",
        "how to use claude skills",
        "claude skills pricing",
        "anthropic skills algorithmic-art javascript library package.json"
      ]
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
        title="Anthropic Claude Skills Directory | Anthropic Skills Library"
        description="Anthropic Claude skills directory with official and community skills, skills vs MCP comparison, how to use Claude skills, and pricing guidance."
        path="/en/landing/anthropic-skills-directory"
        keywords="anthropic skills library, anthropic skills directory, anthropic claude skills directory, anthropic official skills, skills vs mcp, how to use claude skills, claude skills pricing"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Skills Library</p>
          <h1>Anthropic Claude Skills Directory</h1>
          <p>
            Discover official and community Claude skills. Compare skills vs MCP,
            learn how to use Claude skills, and understand pricing basics.
          </p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Browse Skills Directory</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Why this Anthropic skills directory?</h2>
        <div className="features-grid">
          {VALUE_PROPS.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Skills vs MCP</h2>
        <p className="lead">
          Skills focus on structured prompts and workflows. MCP focuses on tool connections.
        </p>
        <div className="compare-grid">
          {COMPARISON.map((item) => (
            <div key={item.topic} className="compare-card">
              <h3>{item.topic}</h3>
              <ul>
                <li><strong>Purpose:</strong> {item.when}</li>
                <li><strong>Format:</strong> {item.form}</li>
                <li><strong>Best for:</strong> {item.bestFor}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>How to use Claude skills</h2>
        <div className="steps-grid">
          {HOW_STEPS.map((item) => (
            <div key={item.step} className="step-card">
              <span className="step-num">{item.step}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Claude skills pricing</h2>
        <p className="lead">
          Skills are usually free templates; pricing depends on your Claude plan or API usage.
        </p>
      </section>

      <section className="section">
        <h2>Algorithmic-art skill resources</h2>
        <p className="lead">
          Searching for “anthropic skills algorithmic-art javascript library package.json”?
          Open the algorithmic-art skill page to reach the source repository and dependencies.
        </p>
        <div className="resource-links">
          <a className="btn btn--ghost" href="/en/skills/algorithmic-art">Open algorithmic-art skill</a>
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
        <h2>Start with the Anthropic Skills Library</h2>
        <p>Browse, compare, and use Claude skills in one place.</p>
        <a className="btn btn--primary" href="/en/skills">Open Skills Directory</a>
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
        .resource-links {
          margin-top: 1rem;
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
