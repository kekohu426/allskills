import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";

const VALUE_PROPS = [
  { icon: "✉️", text: "Smart email drafting" },
  { icon: "✨", text: "Tone adjustment" },
  { icon: "📏", text: "Precise length control" }
];

const PAIN_POINTS = [
  { problem: "Don't know how to write business emails?", solution: "Auto-generate professional emails based on goal, audience, tone" },
  { problem: "Emails too long, readers lose patience?", solution: "Smart condensing, highlight key points, control length" },
  { problem: "Don't know how to phrase email replies?", solution: "Analyze original email context, generate appropriate replies" },
  { problem: "Cold outreach emails have low conversion?", solution: "Optimize opening appeal, clear CTA, improve response rate" }
];

const FEATURES = [
  { icon: "🎯", title: "Goal-Oriented", desc: "Adjust content based on email purpose (inform, persuade, apologize, escalate)" },
  { icon: "👥", title: "Audience Adaptation", desc: "Adjust formality and wording based on recipient" },
  { icon: "🎨", title: "Tone Control", desc: "Support warm, formal, direct and other tone styles" },
  { icon: "📏", title: "Length Control", desc: "Precisely control email length, avoid verbosity" },
  { icon: "🔄", title: "Multi-Version Generation", desc: "Provide 2-3 different style versions to choose from" },
  { icon: "✅", title: "Quality Check", desc: "Check wording, links, names and other details" }
];

const FAQ = [
  { q: "What types of emails are supported?", a: "Supports cold outreach, replies, status updates, escalation emails and various business email scenarios." },
  { q: "How to control email tone?", a: "Can specify warm, formal, direct tones, Skill will adjust wording and expression accordingly." },
  { q: "What's needed for email replies?", a: "Need to provide original email content, and whether to quote or paraphrase." },
  { q: "How to avoid templated emails?", a: "Skill customizes content for specific scenarios and provides multiple versions to choose from." }
];

export default function EmailLandingEn({ skill }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Email Draft & Polish Assistant - Codex Skill", description: "Smart drafting and polishing business emails, support tone and length control", applicationCategory: "ProductivityApplication", inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];

  return (
    <>
      <SeoHead
        title="Email Draft & Polish Assistant | AI Business Email Generator - Codex Skill"
        description="Don't know how to write business emails? This Codex Skill generates professional emails based on goal, audience, tone. Supports cold outreach, replies, status updates."
        path="/en/landing/email-draft-polish"
        keywords="email writing,business email,email template,email polish,cold email,email reply,Codex Skill,AI email"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · Communication</span>
          <h1>Email Draft & Polish Assistant: AI Smart Email Writing</h1>
          <p className="ddd-subtitle">Generate professional business emails based on goal and audience</p>
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
        <p className="lead">This Codex Skill helps you write professional emails</p>
        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (<div key={item.problem} className="ddd-doc-card"><h4 style={{ color: "var(--accent)" }}>{item.problem}</h4><p>{item.solution}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Core Features</h2>
        <p className="lead">Comprehensive email writing support</p>
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
          <a href="/en/skills/codex-email-draft-polish" className="ddd-resource-card"><span className="ddd-resource-card__icon">📄</span><h4>Full SKILL.md</h4><p>View complete definition</p></a>
          <a href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card"><span className="ddd-resource-card__icon">💻</span><h4>GitHub Source</h4><p>View source</p></a>
          <a href="/en/skills" className="ddd-resource-card"><span className="ddd-resource-card__icon">🔍</span><h4>Browse All Skills</h4><p>Discover more tools</p></a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-email-draft-polish");
  return { props: { skill: { name: skill?.name || "email-draft-polish", description: skill?.description || "", body: skill?.body || "" }, forcedLocale: "en" } };
}
