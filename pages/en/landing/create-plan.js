import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";

const VALUE_PROPS = [
  { icon: "📋", text: "Structured coding plans" },
  { icon: "✅", text: "Actionable checklists" },
  { icon: "🎯", text: "Clear scope boundaries" }
];

const PAIN_POINTS = [
  {
    problem: "How to plan before coding?",
    solution: "Scan project context, generate structured plans with scope, steps, risks"
  },
  {
    problem: "Task too big, where to start?",
    solution: "Auto-break into 6-10 atomic, ordered action items"
  },
  {
    problem: "How to avoid missing important steps?",
    solution: "Plan template enforces test validation and edge case handling"
  },
  {
    problem: "How to align team understanding?",
    solution: "Standardized plan format, clear In/Out scope, reduce communication cost"
  }
];

const QUICK_STEPS = [
  { step: 1, title: "Scan Context", desc: "Read README, docs, relevant files" },
  { step: 2, title: "Identify Constraints", desc: "Determine language, frameworks, CI/test commands" },
  { step: 3, title: "Clarify Questions", desc: "Ask at most 1-2 blocking questions" },
  { step: 4, title: "Generate Plan", desc: "Output standardized plan document" },
  { step: 5, title: "Start Execution", desc: "Complete tasks item by item" }
];

const FEATURES = [
  {
    icon: "📖",
    title: "Smart Context Scanning",
    desc: "Auto-read README, CONTRIBUTING, ARCHITECTURE docs"
  },
  {
    icon: "🎯",
    title: "Scope Boundary Definition",
    desc: "Clear In scope and Out scope, avoid scope creep"
  },
  {
    icon: "📝",
    title: "Atomic Action Items",
    desc: "6-10 specific steps, verb-first, include files/commands"
  },
  {
    icon: "✅",
    title: "Test Validation Items",
    desc: "Enforces test and edge case handling steps"
  },
  {
    icon: "❓",
    title: "Open Questions Tracking",
    desc: "Record up to 3 pending unknowns"
  },
  {
    icon: "🔒",
    title: "Read-Only Mode",
    desc: "Planning phase doesn't modify files, ensures safety"
  }
];

const FAQ = [
  {
    q: "When should I use this Skill?",
    a: "When user explicitly asks for a coding task plan. Suitable for complex task pre-planning."
  },
  {
    q: "Will the plan auto-execute?",
    a: "No. The Skill runs in read-only mode, only generates plan documents, doesn't modify files."
  },
  {
    q: "How detailed should action items be?",
    a: "Each step should be atomic concrete action, including relevant file paths or commands."
  },
  {
    q: "How to handle uncertain requirements?",
    a: "The Skill lists up to 3 pending questions in the Open questions section."
  }
];

export default function CreatePlanLandingEn({ skill }) {
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
      "@type": "SoftwareApplication",
      name: "Coding Plan Generator - Codex Skill",
      description: "Convert coding tasks into structured plans with scope definition, action checklists, and risk tracking",
      applicationCategory: "DeveloperApplication",
      inLanguage: "en"
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
        title="Coding Plan Generator | Structured Task Planning - Codex Skill"
        description="How to plan before coding? This Codex Skill auto-scans project context, generates structured plans with scope definition, action checklists, test validation. Perfect for complex coding task pre-planning."
        path="/en/landing/create-plan"
        keywords="coding plan,task planning,project plan,development plan,Codex Skill,programming planning,task breakdown,action checklist"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · Dev Tools</span>
          <h1>Coding Plan Generator: Structured Task Planning</h1>
          <p className="ddd-subtitle">Convert complex tasks into actionable checklists</p>

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
            <a
              className="btn btn--secondary"
              href="https://github.com/ComposioHQ/awesome-codex-skills"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Source
            </a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Do You Have These Problems?</h2>
        <p className="lead">This Codex Skill helps you systematically plan coding tasks</p>

        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (
            <div key={item.problem} className="ddd-doc-card">
              <h4 style={{ color: "var(--accent)" }}>{item.problem}</h4>
              <p>{item.solution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Codex Skill Core Features</h2>
        <p className="lead">Fully automated coding task planning</p>

        <div className="ddd-docs-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="ddd-doc-card">
              <div className="ddd-doc-card__header">
                <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span>
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quick-start" className="section ddd-section">
        <h2>5 Steps to Generate Coding Plan</h2>
        <p className="lead">From requirements to executable plan</p>

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

      <section className="section ddd-section">
        <h2>Coding Plan FAQ</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (
            <li key={item.q}>
              <strong>{item.q}</strong>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section ddd-section">
        <h2>Related Codex Skills Resources</h2>

        <div className="ddd-resources">
          <a href="/en/skills/codex-create-plan" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">📄</span>
            <h4>Full SKILL.md</h4>
            <p>View complete Skill definition</p>
          </a>

          <a
            href="https://github.com/ComposioHQ/awesome-codex-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub Source</h4>
            <p>View source or contribute</p>
          </a>

          <a href="/en/skills?category=Dev%20Tools" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔧</span>
            <h4>More Dev Tools</h4>
            <p>Explore other dev Skills</p>
          </a>

          <a href="/en/skills" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔍</span>
            <h4>Browse All Skills</h4>
            <p>Discover more useful Skills</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-create-plan");

  return {
    props: {
      skill: {
        name: skill?.name || "create-plan",
        description: skill?.description || "",
        body: skill?.body || ""
      },
      forcedLocale: "en"
    }
  };
}
