import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";

const VALUE_PROPS = [
  { icon: "📄", text: "Smart JD analysis" },
  { icon: "✨", text: "Highlight relevant skills" },
  { icon: "🎯", text: "Maximize interview chances" }
];

const PAIN_POINTS = [
  {
    problem: "How to tailor resume for different jobs?",
    solution: "Analyze JD, auto-extract key requirements, match your experience"
  },
  {
    problem: "How to pass ATS screening?",
    solution: "Optimize keyword density, ensure resume is parsed correctly"
  },
  {
    problem: "How to highlight transferable skills?",
    solution: "Identify cross-domain abilities, repackage relevant experience"
  },
  {
    problem: "How to make resume more targeted?",
    solution: "Reorder experience by job priority, highlight most relevant achievements"
  }
];

const FEATURES = [
  { icon: "🔍", title: "JD Analysis", desc: "Extract key requirements, skills, qualifications and keywords" },
  { icon: "🎯", title: "Priority Identification", desc: "Determine what employers value most from JD language" },
  { icon: "✨", title: "Experience Matching", desc: "Smart match your experience with job requirements" },
  { icon: "📊", title: "ATS Optimization", desc: "Optimize keywords and format for better screening pass rate" },
  { icon: "🔄", title: "Multi-Version Generation", desc: "Create multiple tailored versions for different jobs" },
  { icon: "💡", title: "Achievement Quantification", desc: "Help quantify work results for stronger impact" }
];

const FAQ = [
  { q: "What scenarios is this Skill for?", a: "For job seekers tailoring resumes for specific positions, especially when applying to multiple different roles." },
  { q: "What information is needed?", a: "Target job description (JD) and your base resume or work experience." },
  { q: "How does it handle career transitions?", a: "The Skill identifies transferable skills and helps repackage experience for new fields." },
  { q: "What format is the output?", a: "Structured resume content that can be exported to various formats." }
];

export default function ResumeLandingEn({ skill }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Tailored Resume Generator - Codex Skill", description: "Analyze job descriptions, generate targeted resumes highlighting relevant experience and skills", applicationCategory: "ProductivityApplication", inLanguage: "en" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];

  return (
    <>
      <SeoHead
        title="Tailored Resume Generator | AI Job-Matching Resume - Codex Skill"
        description="How to tailor resume for different jobs? This Codex Skill analyzes job descriptions, extracts key requirements, generates targeted resumes. ATS optimized, maximize interview chances."
        path="/en/landing/tailored-resume-generator"
        keywords="resume generator,tailored resume,AI resume,job matching,ATS optimization,job resume,resume optimization,Codex Skill"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · Career Tools</span>
          <h1>Tailored Resume Generator: AI Job Matching</h1>
          <p className="ddd-subtitle">Analyze JD, highlight relevant experience, maximize interview chances</p>
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
        <p className="lead">This Codex Skill helps you create targeted resumes</p>
        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (<div key={item.problem} className="ddd-doc-card"><h4 style={{ color: "var(--accent)" }}>{item.problem}</h4><p>{item.solution}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Core Features</h2>
        <p className="lead">Fully automated resume customization</p>
        <div className="ddd-docs-grid">
          {FEATURES.map((feature) => (<div key={feature.title} className="ddd-doc-card"><div className="ddd-doc-card__header"><span style={{ fontSize: "1.5rem" }}>{feature.icon}</span></div><h4>{feature.title}</h4><p>{feature.desc}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Resume Generator FAQ</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (<li key={item.q}><strong>{item.q}</strong><p>{item.a}</p></li>))}
        </ul>
      </section>

      <section className="section ddd-section">
        <h2>Resources</h2>
        <div className="ddd-resources">
          <a href="/en/skills/codex-tailored-resume-generator" className="ddd-resource-card"><span className="ddd-resource-card__icon">📄</span><h4>Full SKILL.md</h4><p>View complete definition</p></a>
          <a href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card"><span className="ddd-resource-card__icon">💻</span><h4>GitHub Source</h4><p>View source</p></a>
          <a href="/en/skills" className="ddd-resource-card"><span className="ddd-resource-card__icon">🔍</span><h4>Browse All Skills</h4><p>Discover more tools</p></a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-tailored-resume-generator");
  return { props: { skill: { name: skill?.name || "tailored-resume-generator", description: skill?.description || "", body: skill?.body || "" }, forcedLocale: "en" } };
}
