import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const VALUE_PROPS = [
  {
    title: "Anthropic Skills Library",
    desc: "聚合官方与社区来源的 Claude Skills，统一目录与搜索入口。"
  },
  {
    title: "Official Skills 标识",
    desc: "在技能详情页展示来源与仓库链接，帮助你识别官方发布。"
  },
  {
    title: "Skills vs MCP",
    desc: "清晰解释技能与 MCP 的区别与适用场景。"
  },
  {
    title: "How to use Claude Skills",
    desc: "从发现、安装到使用的完整流程指导。"
  }
];

const HOW_STEPS = [
  {
    step: "01",
    title: "发现 Skills",
    desc: "浏览目录或搜索关键词，定位适合的 Claude Skills。"
  },
  {
    step: "02",
    title: "查看来源",
    desc: "在技能详情页确认 source 标识与仓库链接。"
  },
  {
    step: "03",
    title: "复制与使用",
    desc: "复制 SKILL.md，按需加载 references 或脚本资源。"
  }
];

const COMPARISON = [
  {
    topic: "Skills",
    when: "用于定义行为、提示结构与工作流",
    form: "SKILL.md + 资源目录",
    bestFor: "可复用的任务模板、标准化输出"
  },
  {
    topic: "MCP",
    when: "用于连接外部工具/服务",
    form: "协议与服务器接口",
    bestFor: "工具调用、数据访问、实时系统集成"
  }
];

const FAQ = [
  {
    q: "What is the Anthropic Skills Library?",
    a: "AllSkills 提供 Anthropic Claude Skills directory，聚合官方与社区资源并统一检索。"
  },
  {
    q: "Anthropic official skills 在哪里查看？",
    a: "技能详情页会展示 source 标识与仓库链接，可用于确认官方来源。"
  },
  {
    q: "Skills vs MCP：有什么区别？",
    a: "Skills 更像标准化提示模板；MCP 用于工具与服务的协议连接。"
  },
  {
    q: "How to use Claude skills？",
    a: "从目录选择技能，复制 SKILL.md，按需加载 resources 即可使用。"
  },
  {
    q: "Claude skills pricing 是多少？",
    a: "Skills 本身通常不收费，实际成本取决于你使用的 Claude 计划或 API 计费。"
  },
  {
    q: "找不到 anthropic skills algorithmic-art javascript library package.json？",
    a: "部分技能会在源仓库中包含 package.json 或脚本依赖，详情页的 source 链接可直接查看。"
  }
];

export default function AnthropicSkillsDirectoryLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Claude Skills Directory | Anthropic Skills Library",
      description:
        "Anthropic Claude skills directory with official and community skills, skills vs MCP comparison, how to use Claude skills, and pricing guidance.",
      url: `${site.domain}/landing/anthropic-skills-directory`,
      inLanguage: "zh-CN",
      keywords: [
        "anthropic skills library",
        "anthropic skills directory",
        "anthropic claude skills directory",
        "anthropic official skills",
        "skills vs mcp",
        "how to use claude skills",
        "claude skills pricing",
        "anthropic skills algorithmic-art javascript library package.json"
      ]
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
        title="Anthropic Claude Skills Directory | Anthropic Skills Library"
        description="Anthropic Claude skills directory：官方与社区技能库，解释 Skills vs MCP，提供 how to use Claude skills 与 pricing 指引。"
        path="/landing/anthropic-skills-directory"
        keywords="anthropic skills library, anthropic skills directory, anthropic claude skills directory, anthropic official skills, skills vs mcp, how to use claude skills, claude skills pricing"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Skills Library</p>
          <h1>Anthropic Claude Skills Directory</h1>
          <p>
            聚合官方与社区 Claude Skills，提供目录、对比与使用指南。
            包含 “skills vs mcp” 与 “how to use Claude skills” 实用说明。
          </p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">浏览 Skills Directory</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>为什么选择 AllSkills 目录？</h2>
        <div className="features-grid">
          {VALUE_PROPS.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Skills vs MCP</h2>
        <p className="lead">
          Skills 关注提示与任务结构；MCP 关注工具连接与服务集成。
        </p>
        <div className="compare-grid">
          {COMPARISON.map((item) => (
            <div key={item.topic} className="compare-card">
              <h3>{item.topic}</h3>
              <ul>
                <li><strong>定位：</strong>{item.when}</li>
                <li><strong>形式：</strong>{item.form}</li>
                <li><strong>适合：</strong>{item.bestFor}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>How to use Claude Skills</h2>
        <div className="steps-grid">
          {HOW_STEPS.map((item) => (
            <div key={item.step} className="step-card">
              <span className="step-num">{item.step}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Claude Skills Pricing</h2>
        <p className="lead">
          Skills 本身通常不收费，成本主要来自你使用的 Claude 计划或 API 调用。
          如果需要正式定价，请以官方页面为准。
        </p>
      </section>

      <section className="section">
        <h2>Algorithmic-Art 技能说明</h2>
        <p className="lead">
          搜索 “anthropic skills algorithmic-art javascript library package.json” 的用户，
          可在算法艺术技能详情页查看 source 链接，进一步定位 package.json 或依赖信息。
        </p>
        <div className="resource-links">
          <a className="btn btn--ghost" href="/skills/algorithmic-art">查看 algorithmic-art Skill</a>
        </div>
      </section>

      <section className="section">
        <h2>常见问题</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (
            <li key={item.q}>
              <strong>{item.q}</strong>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section cta-section">
        <h2>开始使用 Anthropic Claude Skills Directory</h2>
        <p>发现、比较、复制并使用你需要的 Claude Skills。</p>
        <a className="btn btn--primary" href="/skills">打开 Skills Library</a>
      </section>

      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .feature-item h3 {
          margin-bottom: 0.5rem;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .step-card {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
        }
        .step-num {
          display: inline-block;
          font-family: "Rajdhani", sans-serif;
          color: var(--accent);
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        .compare-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .compare-card {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
        }
        .compare-card ul {
          margin: 0.75rem 0 0;
          padding-left: 1.1rem;
        }
        .resource-links {
          margin-top: 1rem;
        }
        .cta-section {
          text-align: center;
          padding: 3rem 1rem;
          background: var(--bg-secondary, #0f1422);
          border-radius: 12px;
        }
      `}</style>
    </>
  );
}
