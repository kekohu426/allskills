import SeoHead from "../../../components/SeoHead";
import SkillCard from "../../../components/SkillCard";
import { getAllSkills } from "../../../lib/skills";
import site from "../../../data/site.json";

const FEATURED_SLUGS = [
  "skill-creator",
  "openai-skill-installer",
  "agent-development",
  "prompt-engineering-patterns"
];

const FEATURES = [
  {
    title: "Structured output",
    desc: "Generates a compliant SKILL.md structure with title, description, steps, and examples."
  },
  {
    title: "Quality score",
    desc: "Outputs a score to help you quickly assess usefulness."
  },
  {
    title: "One-click download",
    desc: "Download the SKILL.md file and use it immediately."
  }
];

const USE_CASES = [
  {
    title: "Team skill templates",
    desc: "Turn internal workflows into reusable skills for faster onboarding."
  },
  {
    title: "Private tool wrapping",
    desc: "Package common operations into a Skill to reduce friction."
  },
  {
    title: "Skills Marketplace",
    desc: "Prepare standardized output before publishing to a marketplace."
  }
];

const STEPS = [
  {
    step: "01",
    title: "Describe your need",
    desc: "Explain what the skill should do and when it should trigger."
  },
  {
    step: "02",
    title: "Generate",
    desc: "AI outputs a complete SKILL.md with a quality score."
  },
  {
    step: "03",
    title: "Use or publish",
    desc: "Download and install, or share it in a skills marketplace."
  }
];

const FAQ = [
  {
    q: "Can I use the generated SKILL.md directly?",
    a: "Yes, it works as a solid draft. You can refine the description and triggers for higher precision."
  },
  {
    q: "Does it support English and Chinese input?",
    a: "Yes. You can describe your needs in either language, and the tool will generate accordingly."
  },
  {
    q: "Who is this tool for?",
    a: "Developers, product teams, and operators who need fast, standardized skill templates."
  },
  {
    q: "How do I improve skill triggering?",
    a: "Be specific in the description field with concrete trigger phrases and contexts."
  }
];

export default function SkillGeneratorLandingEn({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Skill Generator | Generate SKILL.md",
      description: "Generate Claude Code SKILL.md online. Quality score, one-click download, and reusable skill templates.",
      url: `${site.domain}/en/landing/skill-generator`,
      inLanguage: "en",
      keywords: ["skills", "skill generate", "skill marketplace", "skill generator", "SKILL.md", "Claude Code", "Codex Skill"]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Skill Generator",
      description: "Online generator for Claude Code SKILL.md with quality scoring and download.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: `${site.domain}/tools/skill-generator`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
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
        title="Skill Generator | Generate SKILL.md"
        description="Generate Claude Code SKILL.md online. Quality score, one-click download, and reusable skill templates."
        path="/en/landing/skill-generator"
        keywords="skills, skill generate, skill marketplace, skill generator, SKILL.md, Claude Code"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skill Generator</p>
          <h1>Generate a standardized SKILL.md in seconds</h1>
          <p>Built for teams and marketplaces. Describe your needs, get a ready-to-use Skill file.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/tools/skill-generator">Generate Now</a>
            <a className="btn btn--secondary" href="/en/landing/skills-marketplace">Browse Skills Marketplace</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Why use a Skill Generator?</h2>
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
        <h2>Use cases</h2>
        <div className="features-grid">
          {USE_CASES.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>How it works</h2>
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
        <h2>Related skills</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/en/skills">Browse all Skills</a>
        </div>
      </section>

      <section className="section">
        <h2>Frequently asked questions</h2>
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
        <h2>Start generating your skill</h2>
        <p>Turn your idea into a structured skill and ship it fast.</p>
        <a className="btn btn--primary" href="/tools/skill-generator">Open Skill Generator</a>
      </section>

      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .feature-item h3 {
          margin-bottom: 0.5rem;
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
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const slugMap = new Map(skills.map((s) => [s.slug, s]));
  const featured = FEATURED_SLUGS.map((slug) => slugMap.get(slug)).filter(Boolean);
  return { props: { featured } };
}
