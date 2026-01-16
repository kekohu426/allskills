import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";

const VALUE_PROPS = [
  { icon: "🔧", text: "One-click CI failure diagnosis" },
  { icon: "📋", text: "Auto-generate fix plans" },
  { icon: "⚡", text: "Quick GitHub Actions debugging" }
];

const PAIN_POINTS = [
  {
    problem: "How to fix GitHub Actions CI failures?",
    solution: "Auto-fetch failure logs, analyze error context, generate fix plans"
  },
  {
    problem: "PR checks failing - how to locate issues?",
    solution: "Use gh CLI to check all PR checks, pinpoint failing items"
  },
  {
    problem: "CI/CD error logs too long to read?",
    solution: "Smart extraction of key errors, summarize causes and fixes"
  },
  {
    problem: "How to automate CI problem fixes?",
    solution: "Generate fix plan, implement after user approval"
  }
];

const QUICK_STEPS = [
  { step: 1, title: "Authenticate gh CLI", desc: "Run gh auth login" },
  { step: 2, title: "Check PR Status", desc: "Auto-fetch current branch PR checks" },
  { step: 3, title: "Pull Failure Logs", desc: "Get GitHub Actions failure logs" },
  { step: 4, title: "Analyze Errors", desc: "Smart summarize failure context" },
  { step: 5, title: "Generate Fix Plan", desc: "Create actionable fix plan" }
];

const FEATURES = [
  {
    icon: "🔍",
    title: "Smart Log Analysis",
    desc: "Auto-fetch GitHub Actions failure logs, extract key error info"
  },
  {
    icon: "📊",
    title: "PR Checks Inspection",
    desc: "Use gh CLI to check all PR check statuses, quickly locate failures"
  },
  {
    icon: "📝",
    title: "Fix Plan Generation",
    desc: "Generate structured fix plans based on error analysis"
  },
  {
    icon: "✅",
    title: "User Approval Required",
    desc: "Fix plans require user approval before execution"
  },
  {
    icon: "🔗",
    title: "Plan Skill Integration",
    desc: "Depends on plan skill for standardized fix documentation"
  },
  {
    icon: "⚙️",
    title: "External CI Support",
    desc: "For Buildkite etc., provides detail URLs for manual handling"
  }
];

const FAQ = [
  {
    q: "What prerequisites does this Skill need?",
    a: "Requires gh CLI installed and authenticated. Run gh auth login with workflow/repo scopes."
  },
  {
    q: "Which CI/CD platforms are supported?",
    a: "Primarily GitHub Actions. For external CI like Buildkite, provides detail URLs."
  },
  {
    q: "Will fixes be auto-executed?",
    a: "No. The Skill generates fix plans but requires explicit user approval before implementation."
  },
  {
    q: "How does it handle complex CI failures?",
    a: "Analyzes log context, extracts key errors, generates step-by-step fix plans."
  }
];

export default function GhFixCiLandingEn({ skill }) {
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
      name: "GitHub CI Fix Assistant - Codex Skill",
      description: "Auto-diagnose GitHub Actions CI failures, analyze error logs, generate fix plans",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
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
        title="GitHub CI Fix Assistant | Auto-Diagnose Actions Failures - Codex Skill"
        description="How to fix GitHub Actions CI failures? This Codex Skill auto-fetches failure logs, analyzes errors, generates fix plans. Supports PR checks inspection, quick CI/CD debugging."
        path="/en/landing/gh-fix-ci"
        keywords="GitHub Actions,CI fix,GitHub CI failure,PR checks failing,GitHub Actions error,CI/CD debugging,gh CLI,automated fix"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · Dev Tools</span>
          <h1>GitHub CI Fix Assistant: Auto-Diagnose Actions Failures</h1>
          <p className="ddd-subtitle">One-click CI failure analysis, smart fix plan generation</p>

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
        <p className="lead">This Codex Skill helps you quickly solve CI/CD issues</p>

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
        <p className="lead">Fully automated GitHub CI diagnosis and fix</p>

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
        <h2>5 Steps to Fix CI Failures</h2>
        <p className="lead">Complete workflow from diagnosis to fix</p>

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
        <h2>GitHub CI Fix FAQ</h2>
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
          <a href="/en/skills/codex-gh-fix-ci" className="ddd-resource-card">
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
            <p>View source, submit issues or contribute</p>
          </a>

          <a href="/en/skills?category=Dev%20Tools" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔧</span>
            <h4>More Dev Tools</h4>
            <p>Explore other development Skills</p>
          </a>

          <a href="/en/skills" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔍</span>
            <h4>Browse All Skills</h4>
            <p>Discover more useful Codex Skills</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-gh-fix-ci");

  return {
    props: {
      skill: {
        name: skill?.name || "gh-fix-ci",
        description: skill?.description || "",
        body: skill?.body || ""
      },
      forcedLocale: "en"
    }
  };
}
