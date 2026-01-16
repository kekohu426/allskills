import SeoHead from "../../../components/SeoHead";
import SkillCard from "../../../components/SkillCard";
import { getAllSkills } from "../../../lib/skills";
import site from "../../../data/site.json";

const FEATURED_SLUGS = [
  "planning-with-files",
  "superpowers-writing-plans",
  "superpowers-executing-plans",
  "superpowers-finishing-a-development-branch",
  "superpowers-verification-before-completion",
  "superpowers-requesting-code-review"
];

const HIGHLIGHTS = [
  { label: "Core files", value: "3" },
  { label: "Best for", value: "Multi-phase" },
  { label: "Outcome", value: "Traceable" }
];

const FILES = [
  {
    name: "task_plan.md",
    title: "Task blueprint",
    desc: "Lock goals, scope, and milestones so the work stays aligned.",
    bullets: ["Goals & success criteria", "Milestones", "Risks & dependencies"],
    sample: ["# Goal", "- Ship onboarding v1", "# Milestones", "- M1: Requirements"]
  },
  {
    name: "findings.md",
    title: "Research log",
    desc: "Capture evidence, trade-offs, and alternatives.",
    bullets: ["Key findings", "Decision rationale", "Alternative options"],
    sample: ["# Findings", "- Option A is cheaper", "- Option B scales better"]
  },
  {
    name: "progress.md",
    title: "Execution log",
    desc: "Track what is done, what is blocked, and what is next.",
    bullets: ["Completed work", "Blockers & risks", "Next steps"],
    sample: ["# Today", "- Finished API wiring", "# Next", "- Update docs"]
  }
];

const FLOW = [
  { title: "Initialize the files", desc: "Create the three files with the minimum useful content." },
  { title: "Write before you do", desc: "Update the files first, then execute the step." },
  { title: "Record every change", desc: "Log scope shifts, risks, and decisions immediately." },
  { title: "Review & reuse", desc: "Wrap up the task and reuse the files as templates." }
];

const SUITABLE = [
  "Complex tasks with multiple stakeholders",
  "Multi-file or multi-feature development",
  "Projects that require audit trails",
  "Work with staged acceptance"
];

const NOT_SUITABLE = ["Tiny one-off tweaks", "Quick bugfixes", "Throwaway experiments"];

const FAQ = [
  {
    q: "What is Planning with Files?",
    a: "A workflow that keeps task_plan.md, findings.md, and progress.md in your repo to preserve context, decisions, and progress."
  },
  {
    q: "When should I use it?",
    a: "Use it for complex, multi-step work or anything that needs checkpoints and clear handoffs."
  },
  {
    q: "How do I start?",
    a: "Copy the Skill prompt, create the three files at the project root, and update them as you execute."
  }
];

export default function PlanningWithFilesLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Planning with Files",
      description:
        "A file-first planning workflow with task plans, research logs, and progress updates for complex, multi-step work.",
      inLanguage: "en",
      mainEntityOfPage: `${site.domain}/en/landing/planning-with-files`,
      url: `${site.domain}/en/landing/planning-with-files`,
      keywords: ["planning with files", "task_plan", "progress tracking", "research log"]
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
      "@type": "ItemList",
      itemListElement: featured.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: skill.name,
        url: `${site.domain}/en/skills/${skill.slug}`
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Planning with Files"
        description="A file-first planning workflow with task plans, research logs, and progress updates for complex, multi-step work."
        path="/en/landing/planning-with-files"
        keywords="planning with files, task_plan, progress tracking, research log"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="pwf-hero">
        <div className="pwf-hero__content">
          <span className="pwf-badge">Workflow</span>
          <h1>Planning with Files</h1>
          <p className="pwf-subtitle">Keep complex work anchored in real files.</p>
          <p className="pwf-lead">
            Capture goals, findings, and progress in three files so your team never loses context.
            Perfect for multi-step tasks, complex development, and long-running projects.
          </p>
          <div className="pwf-cta">
            <a className="btn btn--primary" href="/en/skills/planning-with-files/">
              View the Skill
            </a>
            <a className="btn btn--secondary" href="#workflow">
              See the workflow
            </a>
          </div>
          <div className="pwf-metrics">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="pwf-metric">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="pwf-hero__art">
          {FILES.map((file) => (
            <div key={file.name} className="pwf-mini-card">
              <div className="pwf-mini-card__title">
                <span>{file.name}</span>
                <strong>{file.title}</strong>
              </div>
              <p>{file.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="section pwf-section">
        <h2>Four steps to stay aligned</h2>
        <p className="lead">Make progress visible, decisions explainable, and scope stable.</p>
        <div className="pwf-flow">
          {FLOW.map((step, index) => (
            <div key={step.title} className="pwf-flow-card">
              <div className="pwf-flow-card__index">0{index + 1}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section pwf-section">
        <h2>The three files</h2>
        <p className="lead">Define the work, the evidence, and the execution trail.</p>
        <div className="pwf-file-grid">
          {FILES.map((file) => (
            <div key={file.name} className="pwf-file-card">
              <div className="pwf-file-card__header">
                <code>{file.name}</code>
                <span>{file.title}</span>
              </div>
              <p className="pwf-file-card__desc">{file.desc}</p>
              <ul>
                {file.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <pre className="pwf-file-card__sample">{file.sample.join("\n")}</pre>
            </div>
          ))}
        </div>
      </section>

      <section className="section pwf-section">
        <h2>Is it right for you?</h2>
        <div className="pwf-split">
          <div className="pwf-panel pwf-panel--good">
            <h3>✅ Recommended</h3>
            <ul>
              {SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="pwf-panel pwf-panel--avoid">
            <h3>❌ Skip for</h3>
            <ul>
              {NOT_SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section pwf-section">
        <div className="section__header">
          <h2>Related planning skills</h2>
          <a className="btn btn--secondary" href="/en/skills/planning-with-files/">
            View main skill
          </a>
        </div>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} forcedLocale="en" />
          ))}
        </div>
      </section>

      <section className="section pwf-section">
        <div className="pwf-cta-panel">
          <div>
            <h2>Ready to plan with files?</h2>
            <p>Copy the Skill prompt and start with task_plan, findings, and progress today.</p>
          </div>
          <div className="pwf-cta-panel__actions">
            <a className="btn btn--primary" href="/en/skills/planning-with-files/">
              Get started
            </a>
            <a className="btn btn--secondary" href="/en/skills/">
              Browse all skills
            </a>
          </div>
        </div>
      </section>

      <section className="section pwf-section">
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
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const slugMap = new Map(skills.map((s) => [s.slug, s]));
  const featured = FEATURED_SLUGS.map((slug) => slugMap.get(slug)).filter(Boolean);
  return { props: { featured } };
}
