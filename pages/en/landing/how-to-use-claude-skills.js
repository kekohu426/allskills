import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "Pick a skill",
    desc: "Choose a Claude skill that matches your task."
  },
  {
    step: "02",
    title: "Copy SKILL.md",
    desc: "Copy the skill file into your workspace."
  },
  {
    step: "03",
    title: "Load resources",
    desc: "Load references or scripts if required by the skill."
  },
  {
    step: "04",
    title: "Use and refine",
    desc: "Use the skill and tune it to your workflow."
  }
];

const FAQ = [
  {
    q: "How to use Claude skills?",
    a: "Pick a skill, copy SKILL.md, and load any required resources."
  },
  {
    q: "Do I need extra tools?",
    a: "Most skills need no tools unless a source repo specifies dependencies."
  },
  {
    q: "Can I edit a skill?",
    a: "Yes. You can tailor descriptions and examples to your use case."
  }
];

export default function HowToUseClaudeSkillsLandingEn() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "How to use Claude skills",
      description: "How to use Claude skills: a simple step-by-step guide.",
      url: `${site.domain}/en/landing/how-to-use-claude-skills`,
      inLanguage: "en",
      keywords: ["how to use claude skills"]
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
        title="How to use Claude skills"
        description="How to use Claude skills: a simple step-by-step guide."
        path="/en/landing/how-to-use-claude-skills"
        keywords="how to use claude skills"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">How to use Claude skills</p>
          <h1>How to use Claude skills</h1>
          <p>Follow these steps to start using Claude skills.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Browse Skills</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
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
        <h2>Start using Claude skills</h2>
        <p>Pick a skill and put it into practice.</p>
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
