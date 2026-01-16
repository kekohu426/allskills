import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";

const VALUE_PROPS = [
  { icon: "🛠️", text: "Standardized Skill structure" },
  { icon: "📦", text: "Modular resource management" },
  { icon: "🚀", text: "One-click packaging" }
];

const PAIN_POINTS = [
  { problem: "How to create custom Codex Skills?", solution: "Follow standard structure: SKILL.md + scripts/ + references/ + assets/" },
  { problem: "What should a Skill contain?", solution: "Specialized workflows, tool integrations, domain knowledge, reusable scripts and resources" },
  { problem: "How to make Skills trigger efficiently?", solution: "Clearly describe functionality and trigger scenarios in description - it's the primary trigger mechanism" },
  { problem: "How to manage context for large Skills?", solution: "Use progressive loading: metadata → SKILL.md → load references on demand" }
];

const FEATURES = [
  { icon: "📝", title: "SKILL.md Template", desc: "Standardized YAML frontmatter + Markdown instruction structure" },
  { icon: "📂", title: "Resource Directory Spec", desc: "scripts/ for code, references/ for docs, assets/ for resources" },
  { icon: "🎯", title: "Trigger Mechanism Design", desc: "Precisely control when Skill activates via description field" },
  { icon: "📊", title: "Progressive Loading", desc: "Three-level loading: metadata → body → on-demand resources" },
  { icon: "✅", title: "Validation & Packaging", desc: "Auto-validate structure and naming, generate .skill distribution package" },
  { icon: "🔄", title: "Iterative Improvement", desc: "Continuously improve Skills based on real usage feedback" }
];

const FAQ = [
  { q: "What are the core principles for Skills?", a: "Concise is key. Context window is a public good - only add info Codex doesn't have. Challenge each piece: 'Does Codex really need this?'" },
  { q: "When to use scripts vs instructions?", a: "High freedom tasks use text instructions, medium freedom uses pseudocode, low freedom (error-prone ops) uses specific scripts." },
  { q: "How to organize large Skills?", a: "Keep SKILL.md lean (<500 lines), split detailed content to references/ directory, load on demand." },
  { q: "What are the naming conventions?", a: "Use only lowercase letters, digits, and hyphens. Verb-led phrases, tool prefixes (e.g., gh-, notion-)." }
];

export default function SkillCreatorLandingEn({ skill }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Skill Creator - OpenAI Codex Skill", description: "Official guide for creating custom Codex Skills, including structure specs, resource management, and packaging", applicationCategory: "DeveloperApplication", inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];

  return (
    <>
      <SeoHead
        title="Skill Creator | Create Custom Codex Skills Guide - OpenAI"
        description="How to create custom Codex Skills? This official OpenAI Skill provides complete creation guide including SKILL.md structure, resource directory specs, trigger mechanism design, and packaging workflow."
        path="/en/landing/skill-creator"
        keywords="Codex Skill,create Skill,OpenAI,Skill development,custom Skill,SKILL.md,Codex extension"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">OpenAI Skill · Dev Tools</span>
          <h1>Skill Creator: Create Custom Codex Skills</h1>
          <p className="ddd-subtitle">Official OpenAI guide for standardized Skill development</p>
          <div className="ddd-value-props">
            {VALUE_PROPS.map((prop) => (<div key={prop.text} className="ddd-prop"><span className="ddd-prop__icon">{prop.icon}</span><span>{prop.text}</span></div>))}
          </div>
          <div className="ddd-cta">
            <button className="btn btn--primary" onClick={handleCopy}>{copied ? "Copied!" : "Copy Skill"}</button>
            <a className="btn btn--secondary" href="https://github.com/openai/skills" target="_blank" rel="noopener noreferrer">GitHub Source</a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Do You Have These Problems?</h2>
        <p className="lead">This official OpenAI Skill helps standardize Skill development</p>
        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (<div key={item.problem} className="ddd-doc-card"><h4 style={{ color: "var(--accent)" }}>{item.problem}</h4><p>{item.solution}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Core Features</h2>
        <p className="lead">Complete Skill development toolchain</p>
        <div className="ddd-docs-grid">
          {FEATURES.map((feature) => (<div key={feature.title} className="ddd-doc-card"><div className="ddd-doc-card__header"><span style={{ fontSize: "1.5rem" }}>{feature.icon}</span></div><h4>{feature.title}</h4><p>{feature.desc}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>FAQ</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (<li key={item.q}><strong>{item.q}</strong><p>{item.a}</p></li>))}
        </ul>
      </section>

      <section className="section ddd-section">
        <h2>Resources</h2>
        <div className="ddd-resources">
          <a href="/en/skills/openai-skill-creator" className="ddd-resource-card"><span className="ddd-resource-card__icon">📄</span><h4>Full SKILL.md</h4><p>View complete definition</p></a>
          <a href="https://github.com/openai/skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card"><span className="ddd-resource-card__icon">💻</span><h4>GitHub Source</h4><p>OpenAI official repo</p></a>
          <a href="/en/skills/openai-skill-installer" className="ddd-resource-card"><span className="ddd-resource-card__icon">📦</span><h4>Skill Installer</h4><p>Install and manage Skills</p></a>
          <a href="/en/skills" className="ddd-resource-card"><span className="ddd-resource-card__icon">🔍</span><h4>Browse All Skills</h4><p>Discover more tools</p></a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("openai-skill-creator");
  return { props: { skill: { name: skill?.name || "skill-creator", description: skill?.description || "", body: skill?.body || "" }, forcedLocale: "en" } };
}
