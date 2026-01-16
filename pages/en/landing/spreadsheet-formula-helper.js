import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";

const VALUE_PROPS = [
  { icon: "📊", text: "Excel/Sheets formula generation" },
  { icon: "🔧", text: "Formula debugging and fixing" },
  { icon: "🔄", text: "Cross-platform conversion" }
];

const PAIN_POINTS = [
  { problem: "Excel formulas too complex to write?", solution: "Describe your needs, auto-generate correct formulas with explanations" },
  { problem: "Formula errors but don't know why?", solution: "Analyze formula logic, locate errors, provide fix solutions" },
  { problem: "Google Sheets and Excel formulas incompatible?", solution: "Auto-convert formula syntax, handle separator and function differences" },
  { problem: "Array formulas confusing?", solution: "Recommend best approach, prefer modern dynamic arrays" }
];

const FEATURES = [
  { icon: "📝", title: "Formula Generation", desc: "Generate Excel/Sheets formulas from natural language" },
  { icon: "🔍", title: "Formula Debugging", desc: "Analyze formula errors, provide fix suggestions" },
  { icon: "🔄", title: "Dialect Conversion", desc: "Convert between Excel and Google Sheets formulas" },
  { icon: "📊", title: "Pivot Tables", desc: "Help design and optimize pivot tables" },
  { icon: "⚡", title: "Dynamic Arrays", desc: "Prefer modern functions like FILTER, UNIQUE" },
  { icon: "🛡️", title: "Error Handling", desc: "Add IFERROR, LET and other safeguards" }
];

const FAQ = [
  { q: "Which spreadsheet platforms are supported?", a: "Supports Microsoft Excel and Google Sheets, adjusts formula syntax based on platform differences." },
  { q: "How does it handle regional separators?", a: "Will ask your locale settings (comma or semicolon), generate formulas in corresponding format." },
  { q: "Can it handle complex nested formulas?", a: "Yes. Uses LET function for readability and explains formula logic step by step." },
  { q: "How to verify formula correctness?", a: "Suggest providing sample data and expected results, Skill will verify if formula output matches." }
];

export default function SpreadsheetLandingEn({ skill }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Spreadsheet Formula Helper - Codex Skill", description: "Generate and debug Excel/Google Sheets formulas, support cross-platform conversion", applicationCategory: "ProductivityApplication", inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];

  return (
    <>
      <SeoHead
        title="Spreadsheet Formula Helper | Excel/Sheets Formula Generator - Codex Skill"
        description="Excel formulas too complex? This Codex Skill generates formulas from natural language, supports debugging, cross-platform conversion. Works with Excel and Google Sheets."
        path="/en/landing/spreadsheet-formula-helper"
        keywords="Excel formula,Google Sheets formula,spreadsheet formula,formula generator,VLOOKUP,SUMIF,array formula,Codex Skill"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · Productivity</span>
          <h1>Spreadsheet Formula Helper: Excel/Sheets Formula Generation</h1>
          <p className="ddd-subtitle">Describe your needs in natural language, auto-generate correct formulas</p>
          <div className="ddd-value-props">
            {VALUE_PROPS.map((prop) => (<div key={prop.text} className="ddd-prop"><span className="ddd-prop__icon">{prop.icon}</span><span>{prop.text}</span></div>))}
          </div>
          <div className="ddd-cta">
            <button className="btn btn--primary" onClick={handleCopy}>{copied ? "Copied!" : "Copy Skill"}</button>
            <a className="btn btn--secondary" href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer">GitHub Source</a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Do You Have These Problems?</h2>
        <p className="lead">This Codex Skill helps you master spreadsheet formulas</p>
        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (<div key={item.problem} className="ddd-doc-card"><h4 style={{ color: "var(--accent)" }}>{item.problem}</h4><p>{item.solution}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Core Features</h2>
        <p className="lead">Comprehensive spreadsheet formula support</p>
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
          <a href="/en/skills/codex-spreadsheet-formula-helper" className="ddd-resource-card"><span className="ddd-resource-card__icon">📄</span><h4>Full SKILL.md</h4><p>View complete definition</p></a>
          <a href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card"><span className="ddd-resource-card__icon">💻</span><h4>GitHub Source</h4><p>View source</p></a>
          <a href="/en/skills" className="ddd-resource-card"><span className="ddd-resource-card__icon">🔍</span><h4>Browse All Skills</h4><p>Discover more tools</p></a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-spreadsheet-formula-helper");
  return { props: { skill: { name: skill?.name || "spreadsheet-formula-helper", description: skill?.description || "", body: skill?.body || "" }, forcedLocale: "en" } };
}
