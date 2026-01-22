import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "选择技能",
    desc: "在技能目录中找到与任务匹配的 Claude Skill。"
  },
  {
    step: "02",
    title: "复制 SKILL.md",
    desc: "将技能文件复制到你的技能目录或工作区。"
  },
  {
    step: "03",
    title: "按需加载资源",
    desc: "根据说明加载 references 或 scripts 资源。"
  },
  {
    step: "04",
    title: "开始使用",
    desc: "在对话中使用技能并根据实际场景调整。"
  }
];

const FAQ = [
  {
    q: "how to use Claude skills？",
    a: "从目录选择技能，复制 SKILL.md，并按需加载资源即可。"
  },
  {
    q: "需要安装什么工具吗？",
    a: "大多数技能无需安装工具，除非源仓库说明需要脚本依赖。"
  },
  {
    q: "可以修改技能内容吗？",
    a: "可以，建议根据你的场景调整描述与示例。"
  }
];

export default function HowToUseClaudeSkillsLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "How to use Claude skills",
      description: "如何使用 Claude Skills：从选择到使用的完整流程。",
      url: `${site.domain}/landing/how-to-use-claude-skills`,
      inLanguage: "zh-CN",
      keywords: ["how to use claude skills"]
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
        title="How to use Claude skills"
        description="如何使用 Claude Skills：从选择到使用的完整流程。"
        path="/landing/how-to-use-claude-skills"
        keywords="how to use claude skills"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">How to use Claude skills</p>
          <h1>How to use Claude skills</h1>
          <p>用四步掌握 Claude Skills 的使用方法。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills">浏览 Skills</a>
            <a className="btn btn--secondary" href="/tools/skill-generator">生成 Skill</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>使用步骤</h2>
        <div className="steps-grid">
          {STEPS.map((item) => (
            <div key={item.step} className="step-card">
              <span className="step-num">{item.step}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
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
        <h2>立即开始使用 Claude Skills</h2>
        <p>从目录中挑选一个技能并投入使用。</p>
        <a className="btn btn--primary" href="/skills">打开 Skills 目录</a>
      </section>

      <style jsx>{`
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
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
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
