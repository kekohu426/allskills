import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";

const VALUE_PROPS = [
  { icon: "📋", text: "结构化编码计划" },
  { icon: "✅", text: "可执行的行动清单" },
  { icon: "🎯", text: "明确范围边界" }
];

const PAIN_POINTS = [
  {
    problem: "编码前如何制定计划？",
    solution: "扫描项目上下文，生成包含范围、步骤、风险的结构化计划"
  },
  {
    problem: "任务太大不知道从哪开始？",
    solution: "自动拆解为 6-10 个原子化、有序的行动项"
  },
  {
    problem: "如何避免编码时遗漏重要步骤？",
    solution: "计划模板强制包含测试验证和边缘情况处理"
  },
  {
    problem: "团队协作时如何对齐理解？",
    solution: "标准化计划格式，明确 In/Out scope，减少沟通成本"
  }
];

const QUICK_STEPS = [
  { step: 1, title: "扫描上下文", desc: "读取 README、docs、相关文件" },
  { step: 2, title: "识别约束", desc: "确定语言、框架、CI/测试命令" },
  { step: 3, title: "澄清问题", desc: "最多问 1-2 个阻塞性问题" },
  { step: 4, title: "生成计划", desc: "输出标准化计划文档" },
  { step: 5, title: "开始执行", desc: "按清单逐项完成任务" }
];

const FEATURES = [
  {
    icon: "📖",
    title: "智能上下文扫描",
    desc: "自动读取 README、CONTRIBUTING、ARCHITECTURE 等文档"
  },
  {
    icon: "🎯",
    title: "范围边界定义",
    desc: "明确 In scope 和 Out scope，避免范围蔓延"
  },
  {
    icon: "📝",
    title: "原子化行动项",
    desc: "6-10 个具体步骤，动词开头，包含文件/命令"
  },
  {
    icon: "✅",
    title: "测试验证项",
    desc: "强制包含测试和边缘情况处理步骤"
  },
  {
    icon: "❓",
    title: "开放问题追踪",
    desc: "记录最多 3 个待确认的未知项"
  },
  {
    icon: "🔒",
    title: "只读模式",
    desc: "计划阶段不修改文件，确保安全"
  }
];

const FAQ = [
  {
    q: "这个 Skill 什么时候使用？",
    a: "当用户明确要求制定编码任务计划时使用。适合复杂任务的前期规划。"
  },
  {
    q: "计划会自动执行吗？",
    a: "不会。Skill 在只读模式下运行，只生成计划文档，不修改任何文件。"
  },
  {
    q: "行动项应该多详细？",
    a: "每个步骤应该是原子化的具体行动，包含可能涉及的文件路径或命令。"
  },
  {
    q: "如何处理不确定的需求？",
    a: "Skill 会在 Open questions 部分列出最多 3 个待确认问题。"
  }
];

export default function CreatePlanLanding({ skill }) {
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
      name: "编码计划生成器 - Codex Skill",
      description: "将编码任务转换为结构化计划，包含范围定义、行动清单和风险追踪",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows"
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
        title="编码计划生成器 | 结构化任务规划 - Codex Skill"
        description="编码前如何制定计划？这个 Codex Skill 自动扫描项目上下文，生成包含范围定义、行动清单、测试验证的结构化计划。适合复杂编码任务的前期规划。"
        path="/landing/create-plan"
        keywords="编码计划,任务规划,项目计划,开发计划,Codex Skill,编程规划,任务拆解,行动清单"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · 开发工具</span>
          <h1>编码计划生成器：结构化任务规划</h1>
          <p className="ddd-subtitle">将复杂任务转换为可执行的行动清单</p>

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
            <a
              className="btn btn--secondary"
              href="https://github.com/ComposioHQ/awesome-codex-skills"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 源码
            </a>
          </div>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>你是否也有这些困扰？</h2>
        <p className="lead">这个 Codex Skill 帮你系统化规划编码任务</p>

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
        <p className="lead">全自动化的编码任务规划</p>

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
        <h2>5 步生成编码计划</h2>
        <p className="lead">从需求到可执行计划</p>

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

        <div style={{ marginTop: "2rem", background: "var(--bg-secondary)", padding: "1.5rem", borderRadius: "8px" }}>
          <h4 style={{ marginBottom: "1rem" }}>计划模板示例</h4>
          <pre style={{ background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
{`# Plan

实现用户认证功能，使用 JWT token 方案。

## Scope
- In: 登录、注册、token 刷新
- Out: 第三方 OAuth、密码重置

## Action items
[ ] 添加 auth 路由到 src/routes/
[ ] 创建 User model 在 src/models/
[ ] 实现 JWT 工具函数
[ ] 添加认证中间件
[ ] 编写单元测试
[ ] 更新 API 文档

## Open questions
- 是否需要 refresh token？
- token 过期时间多长？`}
          </pre>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>编码计划常见问题</h2>
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
        <h2>相关 Codex Skills 资源</h2>

        <div className="ddd-resources">
          <a href="/skills/codex-create-plan" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">📄</span>
            <h4>完整 SKILL.md</h4>
            <p>查看完整的 Skill 定义</p>
          </a>

          <a
            href="https://github.com/ComposioHQ/awesome-codex-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub 源码</h4>
            <p>查看源码或贡献代码</p>
          </a>

          <a href="/skills?category=Dev%20Tools" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔧</span>
            <h4>更多开发工具</h4>
            <p>探索其他开发相关 Skills</p>
          </a>

          <a href="/skills" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔍</span>
            <h4>浏览全部 Skills</h4>
            <p>发现更多实用 Skills</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-create-plan");

  return {
    props: {
      skill: {
        name: skill?.name || "create-plan",
        description: skill?.description || "",
        body: skill?.body || ""
      }
    }
  };
}
