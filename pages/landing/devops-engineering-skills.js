import SeoHead from "../../components/SeoHead";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

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
  { icon: "⚡", text: "143 个新技能批量上线" },
  { icon: "🧭", text: "覆盖开发、运维、设计、商业分析" },
  { icon: "📚", text: "精选典型案例，快速上手" }
];

const CATEGORIES = [
  { title: "工程与架构", desc: "从 API 设计、微服务、CQRS 到系统迁移与性能优化" },
  { title: "DevOps 与云基础设施", desc: "GitHub Actions、K8s、Terraform、SLO 与可观测性" },
  { title: "数据与 AI", desc: "RAG、向量检索、评估与数据质量框架" },
  { title: "设计与产品", desc: "视觉基础、设计系统、移动与无障碍设计" },
  { title: "业务与合规", desc: "财务建模、市场分析、隐私与合规" }
];

export default function NewSkillsLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "DevOps 与工程效能技能合集 - AllSkills",
      description: "覆盖 DevOps 与工程效能的高频技能合集，精选代表性案例快速上手。",
      url: `${site.domain}/landing/devops-engineering-skills`
    }
  ];

  return (
    <>
      <SeoHead
        title="DevOps 与工程效能技能合集｜AllSkills"
        description="DevOps 与工程效能技能合集：覆盖 CI/CD、K8s、Terraform、可观测性与工程最佳实践，精选典型技能快速上手。"
        path="/landing/devops-engineering-skills"
        keywords="DevOps,工程效能,CI/CD,K8s,Terraform,可观测性,工程最佳实践,Claude Skills,AllSkills"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">AllSkills · 新增技能合集</span>
          <h1>DevOps 与工程效能技能合集</h1>
          <p className="ddd-subtitle">覆盖 CI/CD、K8s、Terraform 与工程最佳实践的代表性技能</p>

          <div className="ddd-value-props">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.text} className="ddd-prop">
                <span className="ddd-prop__icon">{prop.icon}</span>
                <span>{prop.text}</span>
              </div>
            ))}
          </div>

          <div className="ddd-cta">
            <a className="btn btn--primary" href="/skills">
              浏览全部 Skills
            </a>
            <a className="btn btn--secondary" href="/collections">
              查看分类合集
            </a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>覆盖的核心方向</h2>
        <p className="lead">从工程到业务的全链路能力补齐</p>

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
        <h2>精选典型技能（代表性示例）</h2>
        <p className="lead">先从这些入门，覆盖关键场景</p>

        <div className="ddd-docs-grid">
          {featured.map((skill) => (
            <a key={skill.slug} className="ddd-resource-card" href={`/skills/${skill.slug}`}>
              <span className="ddd-resource-card__icon">✨</span>
              <h4>{skill.nameZh || skill.name}</h4>
              <p>{skill.descriptionZh || skill.description}</p>
              <small style={{ color: "var(--text-secondary)" }}>{skill.category}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>本次新增来源</h2>
        <div className="ddd-resources">
          <a
            href="https://github.com/wshobson/agents"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🧩</span>
            <h4>wshobson/agents</h4>
            <p>多领域技能库，覆盖工程、数据、设计与业务</p>
          </a>
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🛠️</span>
            <h4>anthropics/claude-code</h4>
            <p>Claude Code 插件开发与迁移相关技能</p>
          </a>
          <a
            href="https://github.com/anthropics/claude-cookbooks"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📘</span>
            <h4>anthropics/claude-cookbooks</h4>
            <p>官方 Cookbook 中的实战技能示例</p>
          </a>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>下一步怎么用？</h2>
        <div className="ddd-use-cases">
          <div className="ddd-use-case ddd-use-case--suitable" style={{ flex: 1 }}>
            <h3>✅ 推荐做法</h3>
            <ul>
              <li>先选一个方向（比如 DevOps 或 AI 应用）</li>
              <li>从典型技能开始跑通完整流程</li>
              <li>把高频需求整理为自己的技能清单</li>
            </ul>
          </div>
          <div className="ddd-use-case ddd-use-case--not" style={{ flex: 1 }}>
            <h3>❌ 不推荐</h3>
            <ul>
              <li>一次性刷完所有技能</li>
              <li>没有业务场景就盲目套用</li>
              <li>忽略分类与标签的筛选效率</li>
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
      nameZh: skill.nameZh,
      description: skill.description,
      descriptionZh: skill.descriptionZh,
      category: skill.category
    }));

  return {
    props: {
      featured
    }
  };
}
