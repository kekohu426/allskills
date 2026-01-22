import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const HIGHLIGHTS = [
  {
    title: "Curated library",
    desc: "A centralized Anthropic skills library with official and community sources."
  },
  {
    title: "Easy discovery",
    desc: "Search by category, tags, and keywords."
  },
  {
    title: "Reusable structure",
    desc: "Each skill includes a structured SKILL.md for quick reuse."
  }
];

const FAQ = [
  {
    q: "What is the Anthropic skills library?",
    a: "A centralized library to discover and reuse Claude skills."
  },
  {
    q: "Why a library instead of a list?",
    a: "It focuses on structure and sources so skills are easier to trust and reuse."
  },
  {
    q: "Can I use skills directly?",
    a: "Yes—most skills can be copied and used as-is."
  }
];

export default function AnthropicSkillsLibraryLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Skills Library",
      description: "Anthropic skills library for discovering and reusing Claude skills.",
      url: `${site.domain}/en/landing/anthropic-skills-library`,
      inLanguage: "en",
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
        description="Anthropic skills library for discovering and reusing Claude skills."
        path="/en/landing/anthropic-skills-library"
        keywords="anthropic skills library"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Skills Library</p>
          <h1>Anthropic Skills Library</h1>
          <p>A single library to find and reuse Claude skills.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Browse the library</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Why this skills library</h2>
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
        <h2>Start with the Anthropic skills library</h2>
        <p>Find a skill and use it right away.</p>
        <a className="btn btn--primary" href="/en/skills">Open the library</a>
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
