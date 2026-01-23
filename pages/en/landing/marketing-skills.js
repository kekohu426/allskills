import SeoHead from "../../../components/SeoHead";
import SkillCard from "../../../components/SkillCard";
import { getAllSkills } from "../../../lib/skills";
import site from "../../../data/site.json";

const FEATURES = [
  {
    title: "Full-funnel marketing",
    desc: "CRO, copywriting, SEO, paid ads, analytics, and growth workflows."
  },
  {
    title: "Reusable templates",
    desc: "Each skill ships as a structured SKILL.md for quick reuse."
  },
  {
    title: "Execution-ready",
    desc: "Built for practical marketing execution, not just theory."
  }
];

const USE_CASES = [
  {
    title: "Conversion optimization",
    desc: "Landing pages, onboarding, paywall upgrades, and popups."
  },
  {
    title: "Marketing content",
    desc: "Copywriting, email sequences, and social content."
  },
  {
    title: "SEO & growth",
    desc: "Technical SEO, programmatic SEO, and growth strategy."
  }
];

const FAQ = [
  {
    q: "Where do these marketing skills come from?",
    a: "They come from coreyhaines31/marketingskills, a practical marketing skill library."
  },
  {
    q: "Can I use them directly?",
    a: "Yes. Copy the SKILL.md and use it in Claude Code."
  },
  {
    q: "Are they team-friendly?",
    a: "Yes. The structure is consistent and easy to standardize."
  }
];

const NEXT_STEPS = [
  {
    title: "How to use Claude skills",
    desc: "Learn the structure and workflow for using skills effectively.",
    href: "/en/landing/how-to-use-claude-skills"
  },
  {
    title: "Skills vs MCP",
    desc: "Decide when to use skills and when to use MCP.",
    href: "/en/landing/skills-vs-mcp"
  },
  {
    title: "Generate your own skill",
    desc: "Create a custom skill in minutes with the generator.",
    href: "/en/tools/skill-generator"
  }
];

export default function MarketingSkillsLandingEn({ skills }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Marketing Skills for Claude Code",
      description: "Claude marketing skills covering CRO, copywriting, SEO, and growth.",
      url: `${site.domain}/en/landing/marketing-skills`,
      inLanguage: "en",
      keywords: ["marketing skills", "CRO", "copywriting", "SEO", "growth"]
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
        title="Marketing Skills for Claude Code | AllSkills"
        description="Claude marketing skills covering CRO, copywriting, SEO, and growth."
        path="/en/landing/marketing-skills"
        keywords="marketing skills, CRO, copywriting, SEO, growth"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Marketing Skills</p>
          <h1>Claude Marketing Skills</h1>
          <p>A focused skill library for marketing execution and growth.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/en/skills">Browse Skills</a>
            <a className="btn btn--secondary" href="/en/tools/skill-generator">Generate a Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Why these marketing skills</h2>
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
        <h2>Featured marketing skills</h2>
        <div className="grid">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Next steps</h2>
        <div className="features-grid">
          {NEXT_STEPS.map((item) => (
            <a key={item.title} className="feature-item feature-link" href={item.href}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </a>
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
        <h2>Start with marketing skills</h2>
        <p>Improve CRO, copy, and growth workflows in one place.</p>
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
        .feature-link {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .feature-link:hover {
          border-color: rgba(92, 125, 180, 0.6);
          transform: translateY(-2px);
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

export async function getStaticProps() {
  const skills = getAllSkills().filter((skill) => skill.slug.startsWith("marketingskills-"));
  return { props: { skills } };
}
