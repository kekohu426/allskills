import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";
import site from "../../../data/site.json";

const VALUE_PROPS = [
  { icon: "🎯", text: "Avoid requirement drift" },
  { icon: "⚡", text: "Reduce 40% rework time" },
  { icon: "✨", text: "Improve code quality" }
];

const QUICK_STEPS = [
  { step: 1, title: "Create /docs folder", desc: "Create a docs directory in your project root" },
  { step: 2, title: "Write intent.md", desc: "Define WHY and FOR WHOM" },
  { step: 3, title: "Write spec.md", desc: "Define WHAT to build and user journeys" },
  { step: 4, title: "Write plan.md", desc: "Plan technical approach and HOW to build" },
  { step: 5, title: "Generate code", desc: "Let Claude generate code based on documents" }
];

const SUITABLE = [
  "New projects with unclear requirements (0 to 1)",
  "Feature development requiring iteration",
  "Team collaboration (docs as specs)",
  "Complex SaaS applications"
];

const NOT_SUITABLE = [
  "Quick bug fixes (just fix it)",
  "Prototype validation (still exploring)",
  "One-off scripts (use and discard)"
];

const FAQ = [
  {
    q: "How is Document-Driven Development different from traditional documentation?",
    a: "Traditional docs are 'write docs after code'. DDD is 'write docs before generating code'. Documentation is the source of truth, not an afterthought."
  },
  {
    q: "Is this method suitable for solo developers?",
    a: "Absolutely. Solo developers are more prone to 'coding as you think'. DDD helps maintain clear thinking and avoid rework."
  },
  {
    q: "Do I need to write all three documents?",
    a: "Recommended, but can be simplified. For small projects, a few lines each is enough. The key is the thinking process, not document length."
  },
  {
    q: "How to use with Claude Code?",
    a: "Add this Skill to Claude Code, and it will automatically guide you to create documentation before generating code."
  }
];

const DOCS = [
  {
    name: "intent.md",
    purpose: "Intent Layer",
    answers: "WHY & FOR WHOM",
    stability: "Most Stable",
    content: ["Project Vision", "Target Users", "Core Problem", "Success Criteria", "Non-Goals"]
  },
  {
    name: "spec.md",
    purpose: "Specification Layer",
    answers: "WHAT",
    stability: "Moderately Stable",
    content: ["Feature List", "User Journey", "Acceptance Criteria", "Non-Functional Requirements"]
  },
  {
    name: "plan.md",
    purpose: "Plan Layer",
    answers: "HOW",
    stability: "Most Flexible",
    content: ["Tech Stack", "Architecture", "Data Model", "Implementation Details"]
  }
];

export default function DDDLandingEn({ skill }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Document-Driven Development",
      description: "A methodology to make AI coding go from 'out of control' to 'in control'. Use intent.md, spec.md, plan.md three-layer documentation system for high-quality AI-assisted development.",
      inLanguage: "en",
      mainEntityOfPage: `${site.domain}/en/landing/document-driven-development`,
      url: `${site.domain}/en/landing/document-driven-development`,
      keywords: ["Document-Driven Development", "DDD", "AI coding", "Claude", "documentation"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to use Document-Driven Development",
      step: QUICK_STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.desc
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Document-Driven Development"
        description="A methodology to make AI coding go from 'out of control' to 'in control'. Reduce 40% rework time and improve code quality with three-layer documentation."
        path="/en/landing/document-driven-development"
        keywords="Document-Driven Development, DDD, AI coding, Claude, documentation, intent.md, spec.md, plan.md"
        jsonLd={jsonLd}
        ogType="article"
      />

      {/* Hero Section */}
      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Development Workflow</span>
          <h1>Document-Driven Development</h1>
          <p className="ddd-subtitle">Make AI coding go from &quot;out of control&quot; to &quot;in control&quot;</p>

          <div className="ddd-value-props">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.text} className="ddd-prop">
                <span className="ddd-prop__icon">{prop.icon}</span>
                <span>{prop.text}</span>
              </div>
            ))}
          </div>

          <div className="ddd-cta">
            <button className="btn btn--primary" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Skill"}
            </button>
            <a className="btn btn--secondary" href="#quick-start">
              Quick Start
            </a>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="section ddd-section">
        <h2>5 Steps to Get Started</h2>
        <p className="lead">From zero to mastering document-driven development in 5 minutes</p>

        <div className="ddd-steps">
          {QUICK_STEPS.map((item) => (
            <div key={item.step} className="ddd-step">
              <div className="ddd-step__num">{item.step}</div>
              <div className="ddd-step__content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Documents */}
      <section className="section ddd-section">
        <h2>Three-Layer Documentation System</h2>
        <p className="lead">Documentation is the source of code, not an afterthought</p>

        <div className="ddd-docs-grid">
          {DOCS.map((doc) => (
            <div key={doc.name} className="ddd-doc-card">
              <div className="ddd-doc-card__header">
                <code>{doc.name}</code>
                <span className="ddd-doc-card__badge">{doc.stability}</span>
              </div>
              <h4>{doc.purpose}</h4>
              <p className="ddd-doc-card__answers">Answers: {doc.answers}</p>
              <ul>
                {doc.content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="section ddd-section">
        <h2>Is This For You?</h2>

        <div className="ddd-use-cases">
          <div className="ddd-use-case ddd-use-case--suitable">
            <h3>✅ Highly Recommended</h3>
            <ul>
              {SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ddd-use-case ddd-use-case--not">
            <h3>❌ Can Skip</h3>
            <ul>
              {NOT_SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section ddd-section">
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

      {/* Resources */}
      <section className="section ddd-section">
        <h2>Resources</h2>

        <div className="ddd-resources">
          <a
            href="/en/skills/document-driven-development"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📄</span>
            <h4>Full SKILL.md</h4>
            <p>View complete skill definition and detailed instructions</p>
          </a>

          <a
            href="https://github.com/s87343472/document-driven-development"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub Source</h4>
            <p>View source code, submit issues or contribute</p>
          </a>

          <a
            href="/en/skills?category=Development"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🔧</span>
            <h4>More Dev Skills</h4>
            <p>Explore other development-related Claude Skills</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("document-driven-development");

  return {
    props: {
      skill: {
        name: skill.name,
        description: skill.description,
        body: skill.body
      },
      forcedLocale: "en"
    }
  };
}
