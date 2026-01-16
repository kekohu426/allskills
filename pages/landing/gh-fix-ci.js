import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";

const VALUE_PROPS = [
  { icon: "🔧", text: "一键诊断 CI 失败原因" },
  { icon: "📋", text: "自动生成修复计划" },
  { icon: "⚡", text: "快速定位 GitHub Actions 错误" }
];

const PAIN_POINTS = [
  {
    problem: "GitHub Actions CI 失败怎么修？",
    solution: "自动拉取失败日志，分析错误上下文，生成修复方案"
  },
  {
    problem: "PR 检查不通过如何快速定位？",
    solution: "使用 gh CLI 检查所有 PR checks，精准定位失败项"
  },
  {
    problem: "CI/CD 报错日志太长看不懂？",
    solution: "智能提取关键错误信息，总结失败原因和修复建议"
  },
  {
    problem: "如何自动化修复 CI 问题？",
    solution: "生成修复计划后，经用户确认即可自动实施修复"
  }
];

const QUICK_STEPS = [
  { step: 1, title: "认证 gh CLI", desc: "运行 gh auth login 完成认证" },
  { step: 2, title: "检查 PR 状态", desc: "自动获取当前分支的 PR checks" },
  { step: 3, title: "拉取失败日志", desc: "获取 GitHub Actions 失败日志" },
  { step: 4, title: "分析错误原因", desc: "智能总结失败上下文" },
  { step: 5, title: "生成修复计划", desc: "创建可执行的修复方案" }
];

const FEATURES = [
  {
    icon: "🔍",
    title: "智能日志分析",
    desc: "自动从 GitHub Actions 拉取失败日志，提取关键错误信息"
  },
  {
    icon: "📊",
    title: "PR Checks 检查",
    desc: "使用 gh CLI 检查所有 PR 检查项状态，快速定位失败项"
  },
  {
    icon: "📝",
    title: "修复计划生成",
    desc: "基于错误分析生成结构化修复计划，包含具体步骤"
  },
  {
    icon: "✅",
    title: "用户确认后实施",
    desc: "修复方案需用户批准后才执行，确保安全可控"
  },
  {
    icon: "🔗",
    title: "与 plan skill 集成",
    desc: "依赖 plan skill 生成标准化的修复计划文档"
  },
  {
    icon: "⚙️",
    title: "支持外部 CI",
    desc: "对于 Buildkite 等外部 CI，提供详情链接供手动处理"
  }
];

const FAQ = [
  {
    q: "这个 Skill 需要什么前置条件？",
    a: "需要安装并认证 gh CLI。运行 gh auth login 完成认证，确保有 workflow/repo 权限。"
  },
  {
    q: "支持哪些 CI/CD 平台？",
    a: "主要支持 GitHub Actions。对于 Buildkite 等外部 CI，会提供详情 URL 供手动查看。"
  },
  {
    q: "修复会自动执行吗？",
    a: "不会。Skill 会生成修复计划，但需要用户明确批准后才会实施修改。"
  },
  {
    q: "如何处理复杂的 CI 失败？",
    a: "Skill 会分析日志上下文，提取关键错误信息，并生成分步骤的修复方案。"
  }
];

export default function GhFixCiLanding({ skill }) {
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
      name: "GitHub CI 修复助手 - Codex Skill",
      description: "自动诊断 GitHub Actions CI 失败，分析错误日志，生成修复计划",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      keywords: "GitHub Actions,CI修复,GitHub CI,PR检查,自动化修复"
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
      name: "如何使用 Codex Skill 修复 GitHub CI 失败",
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
        title="GitHub CI 修复助手 | 自动诊断 GitHub Actions 失败 - Codex Skill"
        description="GitHub Actions CI 失败怎么修？这个 Codex Skill 自动拉取失败日志，智能分析错误原因，生成修复计划。支持 PR checks 检查，快速定位 CI/CD 问题。"
        path="/landing/gh-fix-ci"
        keywords="GitHub Actions,CI修复,GitHub CI失败,PR检查不通过,GitHub Actions报错,CI/CD调试,gh CLI,自动化修复"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Codex Skill · 开发工具</span>
          <h1>GitHub CI 修复助手：自动诊断 Actions 失败</h1>
          <p className="ddd-subtitle">一键分析 CI 失败日志，智能生成修复方案</p>

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
        <p className="lead">这个 Codex Skill 帮你快速解决 CI/CD 问题</p>

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
        <p className="lead">全自动化的 GitHub CI 诊断和修复</p>

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
        <h2>5 步快速修复 CI 失败</h2>
        <p className="lead">从诊断到修复的完整流程</p>

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
          <h4 style={{ marginBottom: "1rem" }}>使用示例</h4>
          <pre style={{ background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
{`# 1. 确保 gh CLI 已认证
gh auth status

# 2. 在项目目录中使用 Codex
# Codex 会自动检测当前分支的 PR 并分析 CI 状态

# 3. 查看修复计划并确认执行`}
          </pre>
        </div>
      </section>

      <section className="section ddd-section">
        <h2>GitHub CI 修复常见问题</h2>
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
          <a href="/skills/codex-gh-fix-ci" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">📄</span>
            <h4>完整 SKILL.md</h4>
            <p>查看完整的 Skill 定义和详细说明</p>
          </a>

          <a
            href="https://github.com/ComposioHQ/awesome-codex-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub 源码</h4>
            <p>查看源码、提交 Issue 或贡献代码</p>
          </a>

          <a href="/skills?category=Dev%20Tools" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔧</span>
            <h4>更多开发工具</h4>
            <p>探索其他开发相关的 Skills</p>
          </a>

          <a href="/skills" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">🔍</span>
            <h4>浏览全部 Skills</h4>
            <p>发现更多实用的 Codex Skills</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("codex-gh-fix-ci");

  return {
    props: {
      skill: {
        name: skill?.name || "gh-fix-ci",
        description: skill?.description || "",
        body: skill?.body || ""
      }
    }
  };
}
