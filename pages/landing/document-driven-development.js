import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";
import site from "../../data/site.json";

const VALUE_PROPS = [
  { icon: "🎯", text: "避免需求漂移" },
  { icon: "⚡", text: "减少 40% 返工时间" },
  { icon: "✨", text: "提升代码质量" }
];

const QUICK_STEPS = [
  { step: 1, title: "创建 /docs 文件夹", desc: "在项目根目录创建文档目录" },
  { step: 2, title: "写 intent.md", desc: "明确为什么做、为谁做" },
  { step: 3, title: "写 spec.md", desc: "定义做什么、用户如何使用" },
  { step: 4, title: "写 plan.md", desc: "规划技术方案、怎么做" },
  { step: 5, title: "生成代码", desc: "让 Claude 根据文档生成代码" }
];

const SUITABLE = [
  "需求不明确的新项目（0 到 1）",
  "需要迭代的功能开发",
  "团队协作项目（文档即规范）",
  "复杂的 SaaS 应用"
];

const NOT_SUITABLE = [
  "快速修 Bug（直接改就行）",
  "原型验证（还不确定要做什么）",
  "一次性脚本（用完就扔）"
];

const FAQ = [
  {
    q: "Document-Driven Development 和传统文档有什么区别？",
    a: "传统文档是「写完代码后补文档」，DDD 是「先写文档再生成代码」。文档是代码的源头，不是附属品。"
  },
  {
    q: "这个方法适合个人开发者吗？",
    a: "非常适合。个人开发者更容易「想到哪写到哪」，DDD 帮你保持清晰的思路，避免返工。"
  },
  {
    q: "三个文档都必须写吗？",
    a: "建议都写，但可以简化。小项目每个文档几行就够，关键是思考过程，不是文档长度。"
  },
  {
    q: "如何和 Claude Code 配合使用？",
    a: "把这个 Skill 添加到 Claude Code，它会自动引导你先创建文档，再生成代码。"
  }
];

const DOCS = [
  {
    name: "intent.md",
    purpose: "意图层",
    answers: "WHY & FOR WHOM",
    stability: "最稳定",
    content: ["项目愿景", "目标用户", "核心问题", "成功标准", "非目标"]
  },
  {
    name: "spec.md",
    purpose: "规格层",
    answers: "WHAT",
    stability: "中等稳定",
    content: ["功能列表", "用户旅程", "验收标准", "非功能需求"]
  },
  {
    name: "plan.md",
    purpose: "计划层",
    answers: "HOW",
    stability: "最灵活",
    content: ["技术栈", "架构设计", "数据模型", "实现细节"]
  }
];

export default function DDDLanding({ skill }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Document-Driven Development - 文档驱动开发",
      description: "让 AI 编程从「失控」到「可控」的方法论。通过 intent.md、spec.md、plan.md 三层文档系统，实现高质量的 AI 辅助开发。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/document-driven-development`,
      url: `${site.domain}/landing/document-driven-development`,
      keywords: ["Document-Driven Development", "DDD", "AI编程", "Claude", "文档驱动"]
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
      "@type": "HowTo",
      name: "如何使用 Document-Driven Development",
      step: QUICK_STEPS.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.desc
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Document-Driven Development - 文档驱动开发"
        description="让 AI 编程从「失控」到「可控」的方法论。通过三层文档系统，减少 40% 返工时间，提升代码质量。"
        path="/landing/document-driven-development"
        keywords="Document-Driven Development, DDD, AI编程, Claude, 文档驱动, intent.md, spec.md, plan.md"
        jsonLd={jsonLd}
        ogType="article"
      />

      {/* Hero Section */}
      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">开发工作流</span>
          <h1>Document-Driven Development</h1>
          <p className="ddd-subtitle">让 AI 编程从「失控」到「可控」</p>

          <div className="ddd-value-props">
            {VALUE_PROPS.map((prop) => (
              <div key={prop.text} className="ddd-prop">
                <span className="ddd-prop__icon">{prop.icon}</span>
                <span>{prop.text}</span>
              </div>
            ))}
          </div>

          <div className="ddd-cta">
            <button className="btn btn--primary" onClick={handleCopy}>
              {copied ? "已复制!" : "复制 Skill"}
            </button>
            <a className="btn btn--secondary" href="#quick-start">
              快速开始
            </a>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section id="quick-start" className="section ddd-section">
        <h2>5 步快速上手</h2>
        <p className="lead">从零开始，5 分钟掌握文档驱动开发</p>

        <div className="ddd-steps">
          {QUICK_STEPS.map((item) => (
            <div key={item.step} className="ddd-step">
              <div className="ddd-step__num">{item.step}</div>
              <div className="ddd-step__content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Three Documents */}
      <section className="section ddd-section">
        <h2>三层文档系统</h2>
        <p className="lead">文档是代码的源头，不是附属品</p>

        <div className="ddd-docs-grid">
          {DOCS.map((doc) => (
            <div key={doc.name} className="ddd-doc-card">
              <div className="ddd-doc-card__header">
                <code>{doc.name}</code>
                <span className="ddd-doc-card__badge">{doc.stability}</span>
              </div>
              <h4>{doc.purpose}</h4>
              <p className="ddd-doc-card__answers">回答: {doc.answers}</p>
              <ul>
                {doc.content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="section ddd-section">
        <h2>适合你吗?</h2>

        <div className="ddd-use-cases">
          <div className="ddd-use-case ddd-use-case--suitable">
            <h3>✅ 强烈推荐</h3>
            <ul>
              {SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="ddd-use-case ddd-use-case--not">
            <h3>❌ 可以跳过</h3>
            <ul>
              {NOT_SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section ddd-section">
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

      {/* Resources */}
      <section className="section ddd-section">
        <h2>相关资源</h2>

        <div className="ddd-resources">
          <a
            href="/skills/document-driven-development"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📄</span>
            <h4>完整 SKILL.md</h4>
            <p>查看完整的技能定义和详细说明</p>
          </a>

          <a
            href="https://github.com/s87343472/document-driven-development"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub 源码</h4>
            <p>查看源码、提交 Issue 或贡献代码</p>
          </a>

          <a
            href="/skills?category=Development"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🔧</span>
            <h4>更多开发 Skills</h4>
            <p>探索其他开发相关的 Claude Skills</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("document-driven-development");

  return {
    props: {
      skill: {
        name: skill.name,
        description: skill.description,
        body: skill.body
      }
    }
  };
}
