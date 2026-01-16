import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";

const VALUE_PROPS = [
  { icon: "📄", text: "智能分析职位描述" },
  { icon: "✨", text: "突出相关经验技能" },
  { icon: "🎯", text: "最大化面试机会" }
];

const PAIN_POINTS = [
  {
    problem: "如何针对不同职位定制简历？",
    solution: "分析职位描述，自动提取关键要求，匹配你的经验"
  },
  {
    problem: "简历如何通过 ATS 筛选？",
    solution: "优化关键词密度，确保简历被招聘系统正确解析"
  },
  {
    problem: "转行时如何突出可迁移技能？",
    solution: "识别跨领域通用能力，重新包装相关经验"
  },
  {
    problem: "如何让简历更有针对性？",
    solution: "根据职位优先级重排经验顺序，突出最相关成就"
  }
];

const QUICK_STEPS = [
  { step: 1, title: "输入职位描述", desc: "粘贴目标职位的 JD" },
  { step: 2, title: "提供基础简历", desc: "上传或粘贴现有简历" },
  { step: 3, title: "分析匹配度", desc: "AI 分析技能和经验匹配" },
  { step: 4, title: "生成定制简历", desc: "输出针对性优化的简历" },
  { step: 5, title: "下载使用", desc: "导出并投递申请" }
];

const FEATURES = [
  {
    icon: "🔍",
    title: "职位描述分析",
    desc: "提取关键要求、技能、资质和关键词"
  },
  {
    icon: "🎯",
    title: "优先级识别",
    desc: "根据 JD 语言和结构判断雇主最看重什么"
  },
  {
    icon: "✨",
    title: "经验匹配",
    desc: "将你的经历与职位要求智能匹配"
  },
  {
    icon: "📊",
    title: "ATS 优化",
    desc: "优化关键词和格式，提高系统筛选通过率"
  },
  {
    icon: "🔄",
    title: "多版本生成",
    desc: "为不同职位创建多个定制版本"
  },
  {
    icon: "💡",
    title: "成就量化",
    desc: "帮助量化工作成果，增强说服力"
  }
];

const FAQ = [
  {
    q: "这个 Skill 适合什么场景？",
    a: "适合求职者针对特定职位定制简历，尤其是需要投递多个不同岗位时。"
  },
  {
    q: "需要提供什么信息？",
    a: "需要目标职位的 JD（职位描述）和你的基础简历或工作经历。"
  },
  {
    q: "如何处理转行求职？",
    a: "Skill 会识别可迁移技能，帮助重新包装经验以匹配新领域要求。"
  },
  {
    q: "生成的简历格式是什么？",
    a: "输出结构化的简历内容，可以导出为多种格式使用。"
  }
];

export default function ResumeLanding({ skill }) {
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
      "@type": "SoftwareApplication",
      name: "定制简历生成器 - Codex Skill",
      description: "分析职位描述，生成针对性简历，突出相关经验和技能",
      applicationCategory: "ProductivityApplication"
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
        title="定制简历生成器 | AI 分析职位匹配简历 - Codex Skill"
        description="如何针对不同职位定制简历？这个 Codex Skill 智能分析职位描述，提取关键要求，生成针对性简历。支持 ATS 优化，最大化面试机会。"
        path="/landing/tailored-resume-generator"
        keywords="简历生成器,定制简历,AI简历,职位匹配,ATS优化,求职简历,简历优化,Codex Skill"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · 求职工具</span>
          <h1>定制简历生成器：AI 智能匹配职位</h1>
          <p className="ddd-subtitle">分析 JD，突出相关经验，最大化面试机会</p>

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
            <a className="btn btn--secondary" href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer">
              GitHub 源码
            </a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>你是否也有这些困扰？</h2>
        <p className="lead">这个 Codex Skill 帮你打造针对性简历</p>

        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (
            <div key={item.problem} className="ddd-doc-card">
              <h4 style={{ color: "var(--accent)" }}>{item.problem}</h4>
              <p>{item.solution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section ddd-section">
        <h2>Codex Skill 核心功能</h2>
        <p className="lead">全自动化的简历定制优化</p>

        <div className="ddd-docs-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="ddd-doc-card">
              <div className="ddd-doc-card__header">
                <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span>
              </div>
              <h4>{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="quick-start" className="section ddd-section">
        <h2>5 步生成定制简历</h2>
        <p className="lead">从职位描述到针对性简历</p>

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

      <section className="section ddd-section">
        <h2>简历生成常见问题</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (
            <li key={item.q}>
              <strong>{item.q}</strong>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section ddd-section">
        <h2>相关资源</h2>
        <div className="ddd-resources">
          <a href="/skills/codex-tailored-resume-generator" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">📄</span>
            <h4>完整 SKILL.md</h4>
            <p>查看完整定义</p>
          </a>
          <a href="https://github.com/ComposioHQ/awesome-codex-skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub 源码</h4>
            <p>查看源码</p>
          </a>
          <a href="/skills" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔍</span>
            <h4>浏览全部 Skills</h4>
            <p>发现更多工具</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-tailored-resume-generator");
  return {
    props: {
      skill: {
        name: skill?.name || "tailored-resume-generator",
        description: skill?.description || "",
        body: skill?.body || ""
      }
    }
  };
}
