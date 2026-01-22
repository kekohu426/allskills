import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "打开技能详情页",
    desc: "先进入 algorithmic-art 技能详情页查看内容与来源。"
  },
  {
    step: "02",
    title: "访问源仓库",
    desc: "点击 sourceUrl 跳转到仓库，查看是否包含 package.json。"
  },
  {
    step: "03",
    title: "确认依赖与脚本",
    desc: "在仓库中定位 JavaScript 依赖与相关脚本说明。"
  }
];

const FAQ = [
  {
    q: "找不到 package.json 怎么办？",
    a: "部分技能仅提供 SKILL.md，不一定包含 JavaScript 依赖。"
  },
  {
    q: "algorithmic-art 技能在哪里？",
    a: "在技能目录中搜索 algorithmic-art 并进入详情页。"
  },
  {
    q: "这个技能需要安装依赖吗？",
    a: "是否需要依赖取决于源仓库说明，请以仓库为准。"
  }
];

export default function AlgorithmicArtPackageJsonLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "anthropic skills algorithmic-art javascript library package.json",
      description:
        "查找 algorithmic-art skill 的 JavaScript 依赖与 package.json 的方法。",
      url: `${site.domain}/landing/anthropic-skills-algorithmic-art-javascript-library-package-json`,
      inLanguage: "zh-CN",
      keywords: ["anthropic skills algorithmic-art javascript library package.json"]
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
        title="anthropic skills algorithmic-art javascript library package.json"
        description="查找 algorithmic-art skill 的 JavaScript 依赖与 package.json 的方法。"
        path="/landing/anthropic-skills-algorithmic-art-javascript-library-package-json"
        keywords="anthropic skills algorithmic-art javascript library package.json"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Algorithmic-Art Skill</p>
          <h1>anthropic skills algorithmic-art javascript library package.json</h1>
          <p>如何定位 algorithmic-art 技能的 JavaScript 依赖与 package.json。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/skills/algorithmic-art">打开 algorithmic-art</a>
            <a className="btn btn--secondary" href="/skills">浏览全部 Skills</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>查找步骤</h2>
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
        <h2>继续浏览更多技能</h2>
        <p>如果需要其他技能，也可以在目录中搜索。</p>
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
