import SeoHead from "../../../components/SeoHead";
import { getAllSkills } from "../../../lib/skills";
import site from "../../../data/site.json";

const FEATURED_SLUGS = [
  "agents-prompt-engineering-patterns",
  "agents-rag-implementation",
  "agents-k8s-manifest-generator",
  "agents-github-actions-templates",
  "agents-terraform-module-library",
  "agents-data-storytelling",
  "agents-incident-runbook-templates",
  "agents-visual-design-foundations",
  "agents-stripe-integration",
  "claude-code-skill-development",
  "claude-code-mcp-integration",
  "claude-cookbooks-applying-brand-guidelines"
];

const VALUE_PROPS = [
  { icon: "⚡", text: "143 newly added skills" },
  { icon: "🧭", text: "Covers engineering, DevOps, design, and business" },
  { icon: "📚", text: "Curated examples to get started fast" }
];

const CATEGORIES = [
  { title: "Engineering & Architecture", desc: "API design, microservices, CQRS, migrations, and performance" },
  { title: "DevOps & Cloud", desc: "GitHub Actions, K8s, Terraform, SLOs, observability" },
  { title: "Data & AI", desc: "RAG, vector search, evaluations, data quality frameworks" },
  { title: "Design & Product", desc: "Visual foundations, design systems, mobile, accessibility" },
  { title: "Business & Compliance", desc: "Financial modeling, market sizing, privacy and compliance" }
];

export default function NewSkillsLandingEn({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "DevOps & Engineering Skills Collection - AllSkills",
      description: "Curated DevOps and engineering skills covering CI/CD, Kubernetes, Terraform, and reliability.",
      url: `${site.domain}/en/landing/devops-engineering-skills`
    }
  ];

  return (
    <>
      <SeoHead
        title="DevOps & Engineering Skills Collection | AllSkills"
        description="DevOps & engineering skills collection covering CI/CD, Kubernetes, Terraform, observability, and best practices."
        path="/en/landing/devops-engineering-skills"
        keywords="DevOps,engineering,CI/CD,Kubernetes,Terraform,observability,best practices,Claude Skills,AllSkills"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">AllSkills · New Skills Collection</span>
          <h1>DevOps & Engineering Skills Collection</h1>
          <p className="ddd-subtitle">Representative skills across CI/CD, Kubernetes, Terraform, and reliability</p>

          <div className="ddd-value-props">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.text} className="ddd-prop">
                <span className="ddd-prop__icon">{prop.icon}</span>
                <span>{prop.text}</span>
              </div>
            ))}
          </div>

          <div className="ddd-cta">
            <a className="btn btn--primary" href="/en/skills">
              Browse All Skills
            </a>
            <a className="btn btn--secondary" href="/en/collections">
              View Collections
            </a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Key Areas Covered</h2>
        <p className="lead">End-to-end capability coverage from engineering to business</p>

        <div className="ddd-docs-grid">
          {CATEGORIES.map((item) => (
            <div key={item.title} className="ddd-doc-card">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Featured Skills (Representative)</h2>
        <p className="lead">Start with these to cover the most common scenarios</p>

        <div className="ddd-docs-grid">
          {featured.map((skill) => (
            <a key={skill.slug} className="ddd-resource-card" href={`/en/skills/${skill.slug}`}>
              <span className="ddd-resource-card__icon">✨</span>
              <h4>{skill.name}</h4>
              <p>{skill.description}</p>
              <small style={{ color: "var(--text-secondary)" }}>{skill.category}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>New Source Repositories</h2>
        <div className="ddd-resources">
          <a
            href="https://github.com/wshobson/agents"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🧩</span>
            <h4>wshobson/agents</h4>
            <p>Multi-domain skills across engineering, data, design, and business</p>
          </a>
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🛠️</span>
            <h4>anthropics/claude-code</h4>
            <p>Claude Code plugin development and migration skills</p>
          </a>
          <a
            href="https://github.com/anthropics/claude-cookbooks"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📘</span>
            <h4>anthropics/claude-cookbooks</h4>
            <p>Official cookbook-based skill examples</p>
          </a>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>How to Use This Batch</h2>
        <div className="ddd-use-cases">
          <div className="ddd-use-case ddd-use-case--suitable" style={{ flex: 1 }}>
            <h3>✅ Recommended</h3>
            <ul>
              <li>Pick one track (DevOps, AI, Design, etc.)</li>
              <li>Start with featured skills to validate workflows</li>
              <li>Build a personal shortlist for recurring tasks</li>
            </ul>
          </div>
          <div className="ddd-use-case ddd-use-case--not" style={{ flex: 1 }}>
            <h3>❌ Not Recommended</h3>
            <ul>
              <li>Trying to read everything at once</li>
              <li>Applying skills without a concrete use case</li>
              <li>Skipping category filters and tags</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const featured = FEATURED_SLUGS
    .map((slug) => skills.find((skill) => skill.slug === slug))
    .filter(Boolean)
    .map((skill) => ({
      slug: skill.slug,
      name: skill.name,
      description: skill.description,
      category: skill.category
    }));

  return {
    props: {
      featured,
      forcedLocale: "en"
    }
  };
}
