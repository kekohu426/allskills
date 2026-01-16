import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";

const VALUE_PROPS = [
  { icon: "✉️", text: "智能邮件起草" },
  { icon: "✨", text: "语气风格调整" },
  { icon: "📏", text: "长度精准控制" }
];

const PAIN_POINTS = [
  { problem: "商务邮件不知道怎么写？", solution: "根据目标、受众、语气自动生成专业邮件" },
  { problem: "邮件太长读者没耐心看？", solution: "智能精简内容，突出重点，控制篇幅" },
  { problem: "回复邮件不知道如何措辞？", solution: "分析原邮件语境，生成得体的回复" },
  { problem: "冷启动邮件转化率低？", solution: "优化开头吸引力，明确 CTA，提高回复率" }
];

const FEATURES = [
  { icon: "🎯", title: "目标导向", desc: "根据邮件目的（告知、说服、道歉、升级）调整内容" },
  { icon: "👥", title: "受众适配", desc: "根据收件人身份调整正式程度和用词" },
  { icon: "🎨", title: "语气控制", desc: "支持温暖、正式、直接等多种语气风格" },
  { icon: "📏", title: "长度控制", desc: "精确控制邮件长度，避免冗长" },
  { icon: "🔄", title: "多版本生成", desc: "提供 2-3 个不同风格的版本供选择" },
  { icon: "✅", title: "质量检查", desc: "检查措辞、链接、姓名等细节" }
];

const FAQ = [
  { q: "支持哪些类型的邮件？", a: "支持冷启动外联、回复、状态更新、升级邮件等各种商务邮件场景。" },
  { q: "如何控制邮件语气？", a: "可以指定温暖、正式、直接等语气，Skill 会相应调整用词和表达方式。" },
  { q: "回复邮件需要提供什么？", a: "需要提供原邮件内容，以及是否需要引用或转述原文。" },
  { q: "如何避免邮件过于模板化？", a: "Skill 会根据具体场景定制内容，并提供多个版本供选择。" }
];

export default function EmailLanding({ skill }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "邮件起草润色助手 - Codex Skill", description: "智能起草和润色商务邮件，支持语气和长度控制", applicationCategory: "ProductivityApplication" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }
  ];

  return (
    <>
      <SeoHead
        title="邮件起草润色助手 | AI 商务邮件生成 - Codex Skill"
        description="商务邮件不知道怎么写？这个 Codex Skill 根据目标、受众、语气智能生成专业邮件。支持冷启动外联、回复、状态更新等场景。"
        path="/landing/email-draft-polish"
        keywords="邮件写作,商务邮件,邮件模板,邮件润色,冷启动邮件,邮件回复,Codex Skill,AI写邮件"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · 沟通工具</span>
          <h1>邮件起草润色助手：AI 智能写邮件</h1>
          <p className="ddd-subtitle">根据目标和受众，生成专业得体的商务邮件</p>
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
        <p className="lead">这个 Codex Skill 帮你写出专业邮件</p>
        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (<div key={item.problem} className="ddd-doc-card"><h4 style={{ color: "var(--accent)" }}>{item.problem}</h4><p>{item.solution}</p></div>))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>核心功能</h2>
        <p className="lead">全方位的邮件写作支持</p>
        <div className="ddd-docs-grid">
          {FEATURES.map((feature) => (<div key={feature.title} className="ddd-doc-card"><div className="ddd-doc-card__header"><span style={{ fontSize: "1.5rem" }}>{feature.icon}</span></div><h4>{feature.title}</h4><p>{feature.desc}</p></div>))}
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
          <a href="/skills/codex-email-draft-polish" className="ddd-resource-card"><span className="ddd-resource-card__icon">📄</span><h4>完整 SKILL.md</h4><p>查看完整定义</p></a>
          <a href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card"><span className="ddd-resource-card__icon">💻</span><h4>GitHub 源码</h4><p>查看源码</p></a>
          <a href="/skills" className="ddd-resource-card"><span className="ddd-resource-card__icon">🔍</span><h4>浏览全部 Skills</h4><p>发现更多工具</p></a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-email-draft-polish");
  return { props: { skill: { name: skill?.name || "email-draft-polish", description: skill?.description || "", body: skill?.body || "" } } };
}
