import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "Check the source label",
    desc: "Skill pages show a source label that indicates origin."
  },
  {
    step: "02",
    title: "Open the repo link",
    desc: "The source URL points to the original repository."
  },
  {
    step: "03",
    title: "Review the structure",
    desc: "Official skills typically include SKILL.md and resources."
  }
];

const FAQ = [
  {
    q: "What are Anthropic official skills?",
    a: "Skills maintained by Anthropic's official repositories."
  },
  {
    q: "How do I identify official skills?",
    a: "Check the source label and repository link on the skill page."
  },
  {
    q: "Can I use official skills directly?",
    a: "Yes. Copy SKILL.md and load resources as needed."
  }
];

export default function AnthropicOfficialSkillsLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Official Skills",
      description: "How to identify and use Anthropic official skills.",
      url: `${site.domain}/en/landing/anthropic-official-skills`,
      inLanguage: "en",
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
        description="How to identify and use Anthropic official skills."
        path="/en/landing/anthropic-official-skills"
        keywords="anthropic official skills"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Official Skills</p>
          <h1>Anthropic Official Skills</h1>
          <p>Verify official sources and use Claude skills with confidence.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Open directory</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>How to identify official skills</h2>
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
        <h2>Start with official skills</h2>
        <p>Filter by source and pick official Claude skills.</p>
        <a className="btn btn--primary" href="/en/skills">Browse Skills</a>
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
