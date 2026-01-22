import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const POINTS = [
  {
    title: "Skills are usually free",
    desc: "Most skills are templates and do not have a separate fee."
  },
  {
    title: "Costs come from usage",
    desc: "Your cost depends on your Claude plan or API usage."
  },
  {
    title: "Check official pricing",
    desc: "Refer to the official pricing page for the latest details."
  }
];

const FAQ = [
  {
    q: "Claude skills pricing: how much does it cost?",
    a: "Skills are typically free; costs depend on your plan or API usage."
  },
  {
    q: "Do skills add extra fees?",
    a: "Usually no, unless you use paid models or services."
  },
  {
    q: "Where can I see official pricing?",
    a: "Check the official Claude pricing page for up-to-date info."
  }
];

export default function ClaudeSkillsPricingLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Claude skills pricing",
      description: "Claude skills pricing overview: skills are free; costs depend on usage.",
      url: `${site.domain}/en/landing/claude-skills-pricing`,
      inLanguage: "en",
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
        description="Claude skills pricing overview: skills are free; costs depend on usage."
        path="/en/landing/claude-skills-pricing"
        keywords="claude skills pricing"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude skills pricing</p>
          <h1>Claude skills pricing</h1>
          <p>Understand pricing: skills are free templates, costs come from usage.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Browse Skills</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Pricing basics</h2>
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
        <h2>Start with Claude skills</h2>
        <p>Try free skill templates first.</p>
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
