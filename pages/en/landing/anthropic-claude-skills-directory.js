import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const FEATURES = [
  {
    title: "Claude-focused directory",
    desc: "A dedicated directory for Claude skills across workflows."
  },
  {
    title: "Clear categories",
    desc: "Browse by domain and tags to find relevant skills fast."
  },
  {
    title: "Reusable templates",
    desc: "Structured SKILL.md makes each skill easy to reuse."
  }
];

const FAQ = [
  {
    q: "What is the anthropic claude skills directory?",
    a: "A directory focused on Claude skills for quick discovery and reuse."
  },
  {
    q: "Does it include official skills?",
    a: "Yes. Official and community sources are labeled on each skill page."
  },
  {
    q: "How do I use a skill?",
    a: "Open a skill page and copy the SKILL.md."
  }
];

export default function AnthropicClaudeSkillsDirectoryLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Claude Skills Directory",
      description: "Anthropic Claude skills directory for browsing and reuse.",
      url: `${site.domain}/en/landing/anthropic-claude-skills-directory`,
      inLanguage: "en",
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
        description="Anthropic Claude skills directory for browsing and reuse."
        path="/en/landing/anthropic-claude-skills-directory"
        keywords="anthropic claude skills directory"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude Skills Directory</p>
          <h1>Anthropic Claude Skills Directory</h1>
          <p>Find Claude skills quickly and reuse them in your workflows.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Open directory</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Directory highlights</h2>
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
        <h2>Start browsing Claude skills</h2>
        <p>Pick a skill and put it to work.</p>
        <a className="btn btn--primary" href="/en/skills">Browse Skills</a>
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
