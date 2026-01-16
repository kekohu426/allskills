import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";

const VALUE_PROPS = [
  { icon: "📊", text: "Excel/Sheets 公式生成" },
  { icon: "🔧", text: "公式调试和修复" },
  { icon: "🔄", text: "跨平台公式转换" }
];

const PAIN_POINTS = [
  {
    problem: "Excel 公式太复杂不会写？",
    solution: "描述需求，自动生成正确的公式，包含详细解释"
  },
  {
    problem: "公式报错不知道哪里错了？",
    solution: "分析公式逻辑，定位错误原因，提供修复方案"
  },
  {
    problem: "Google Sheets 和 Excel 公式不兼容？",
    solution: "自动转换公式语法，处理分隔符和函数差异"
  },
  {
    problem: "数组公式和动态数组搞不懂？",
    solution: "根据场景推荐最佳方案，优先使用现代动态数组"
  }
];

const QUICK_STEPS = [
  { step: 1, title: "描述需求", desc: "说明要计算什么，提供示例数据" },
  { step: 2, title: "确认平台", desc: "指定 Excel 或 Google Sheets" },
  { step: 3, title: "生成公式", desc: "AI 生成公式并解释原理" },
  { step: 4, title: "验证测试", desc: "用示例数据验证结果" },
  { step: 5, title: "处理边缘", desc: "添加错误处理和边界检查" }
];

const FEATURES = [
  { icon: "📝", title: "公式生成", desc: "根据自然语言描述生成 Excel/Sheets 公式" },
  { icon: "🔍", title: "公式调试", desc: "分析公式错误，提供修复建议" },
  { icon: "🔄", title: "方言转换", desc: "Excel 和 Google Sheets 公式互转" },
  { icon: "📊", title: "数据透视表", desc: "帮助设计和优化数据透视表" },
  { icon: "⚡", title: "动态数组", desc: "优先使用 FILTER、UNIQUE 等现代函数" },
  { icon: "🛡️", title: "错误处理", desc: "添加 IFERROR、LET 等防护措施" }
];

const FAQ = [
  { q: "支持哪些电子表格平台？", a: "支持 Microsoft Excel 和 Google Sheets，会根据平台差异调整公式语法。" },
  { q: "如何处理不同地区的分隔符？", a: "会询问你的区域设置（逗号或分号分隔），生成对应格式的公式。" },
  { q: "能处理复杂的嵌套公式吗？", a: "可以。会使用 LET 函数提高可读性，并逐步解释公式逻辑。" },
  { q: "如何验证公式正确性？", a: "建议提供小样本数据和预期结果，Skill 会验证公式输出是否匹配。" }
];

export default function SpreadsheetLanding({ skill }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "电子表格公式助手 - Codex Skill", description: "生成和调试 Excel/Google Sheets 公式，支持跨平台转换", applicationCategory: "ProductivityApplication" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];

  return (
    <>
      <SeoHead
        title="电子表格公式助手 | Excel/Sheets 公式生成器 - Codex Skill"
        description="Excel 公式太复杂不会写？这个 Codex Skill 根据自然语言生成公式，支持调试修复、跨平台转换。适用于 Excel 和 Google Sheets。"
        path="/landing/spreadsheet-formula-helper"
        keywords="Excel公式,Google Sheets公式,电子表格公式,公式生成器,VLOOKUP,SUMIF,数组公式,Codex Skill"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · 效率工具</span>
          <h1>电子表格公式助手：Excel/Sheets 公式生成</h1>
          <p className="ddd-subtitle">自然语言描述需求，自动生成正确公式</p>
          <div className="ddd-value-props">
            {VALUE_PROPS.map((prop) => (<div key={prop.text} className="ddd-prop"><span className="ddd-prop__icon">{prop.icon}</span><span>{prop.text}</span></div>))}
          </div>
          <div className="ddd-cta">
            <button className="btn btn--primary" onClick={handleCopy}>{copied ? "已复制!" : "复制 Skill"}</button>
            <a className="btn btn--secondary" href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer">GitHub 源码</a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>你是否也有这些困扰？</h2>
        <p className="lead">这个 Codex Skill 帮你轻松搞定电子表格公式</p>
        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (<div key={item.problem} className="ddd-doc-card"><h4 style={{ color: "var(--accent)" }}>{item.problem}</h4><p>{item.solution}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>核心功能</h2>
        <p className="lead">全方位的电子表格公式支持</p>
        <div className="ddd-docs-grid">
          {FEATURES.map((feature) => (<div key={feature.title} className="ddd-doc-card"><div className="ddd-doc-card__header"><span style={{ fontSize: "1.5rem" }}>{feature.icon}</span></div><h4>{feature.title}</h4><p>{feature.desc}</p></div>))}
        </div>
      </section>

      <section id="quick-start" className="section ddd-section">
        <h2>5 步生成公式</h2>
        <div className="ddd-steps">
          {QUICK_STEPS.map((item) => (<div key={item.step} className="ddd-step"><div className="ddd-step__num">{item.step}</div><div className="ddd-step__content"><h4>{item.title}</h4><p>{item.desc}</p></div></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>常见问题</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (<li key={item.q}><strong>{item.q}</strong><p>{item.a}</p></li>))}
        </ul>
      </section>

      <section className="section ddd-section">
        <h2>相关资源</h2>
        <div className="ddd-resources">
          <a href="/skills/codex-spreadsheet-formula-helper" className="ddd-resource-card"><span className="ddd-resource-card__icon">📄</span><h4>完整 SKILL.md</h4><p>查看完整定义</p></a>
          <a href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card"><span className="ddd-resource-card__icon">💻</span><h4>GitHub 源码</h4><p>查看源码</p></a>
          <a href="/skills" className="ddd-resource-card"><span className="ddd-resource-card__icon">🔍</span><h4>浏览全部 Skills</h4><p>发现更多工具</p></a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-spreadsheet-formula-helper");
  return { props: { skill: { name: skill?.name || "spreadsheet-formula-helper", description: skill?.description || "", body: skill?.body || "" } } };
}
