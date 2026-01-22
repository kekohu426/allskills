import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "Open the skill page",
    desc: "Start with the algorithmic-art skill detail page."
  },
  {
    step: "02",
    title: "Visit the source repo",
    desc: "Use the source link to check for a package.json."
  },
  {
    step: "03",
    title: "Review dependencies",
    desc: "Confirm JavaScript dependencies and any scripts."
  }
];

const FAQ = [
  {
    q: "What if there is no package.json?",
    a: "Some skills only provide SKILL.md and may not include JS dependencies."
  },
  {
    q: "Where is the algorithmic-art skill?",
    a: "Search for algorithmic-art in the skills directory."
  },
  {
    q: "Do I need to install dependencies?",
    a: "Follow the source repository instructions if dependencies are listed."
  }
];

export default function AlgorithmicArtPackageJsonLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "anthropic skills algorithmic-art javascript library package.json",
      description:
        "How to find JavaScript dependencies and package.json for the algorithmic-art skill.",
      url: `${site.domain}/en/landing/anthropic-skills-algorithmic-art-javascript-library-package-json`,
      inLanguage: "en",
      keywords: ["anthropic skills algorithmic-art javascript library package.json"]
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
        title="anthropic skills algorithmic-art javascript library package.json"
        description="How to find JavaScript dependencies and package.json for the algorithmic-art skill."
        path="/en/landing/anthropic-skills-algorithmic-art-javascript-library-package-json"
        keywords="anthropic skills algorithmic-art javascript library package.json"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Algorithmic-Art Skill</p>
          <h1>anthropic skills algorithmic-art javascript library package.json</h1>
          <p>Find the JavaScript dependencies for the algorithmic-art skill.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills/algorithmic-art">Open algorithmic-art</a>
            <a className="btn btn--secondary" href="/en/skills">Browse all Skills</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Steps</h2>
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
        <h2>Explore more skills</h2>
        <p>Search the directory for other skills and workflows.</p>
        <a className="btn btn--primary" href="/en/skills">Open Skills Directory</a>
      </section>

      <style jsx>{`
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
