import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";

const VALUE_PROPS = [
  { icon: "🛠️", text: "标准化 Skill 结构" },
  { icon: "📦", text: "模块化资源管理" },
  { icon: "🚀", text: "一键打包分发" }
];

const PAIN_POINTS = [
  {
    problem: "如何创建自定义 Codex Skill？",
    solution: "遵循标准结构：SKILL.md + scripts/ + references/ + assets/"
  },
  {
    problem: "Skill 应该包含什么内容？",
    solution: "专业工作流、工具集成、领域知识、可复用脚本和资源"
  },
  {
    problem: "如何让 Skill 高效触发？",
    solution: "在 description 中清晰描述功能和触发场景，这是主要触发机制"
  },
  {
    problem: "如何管理大型 Skill 的上下文？",
    solution: "使用渐进式加载：元数据 → SKILL.md → 按需加载 references"
  }
];

const FEATURES = [
  {
    icon: "📝",
    title: "SKILL.md 模板",
    desc: "标准化的 YAML frontmatter + Markdown 指令结构"
  },
  {
    icon: "📂",
    title: "资源目录规范",
    desc: "scripts/ 脚本、references/ 文档、assets/ 资源文件"
  },
  {
    icon: "🎯",
    title: "触发机制设计",
    desc: "通过 description 字段精确控制 Skill 何时被激活"
  },
  {
    icon: "📊",
    title: "渐进式加载",
    desc: "三级加载系统：元数据 → 主体 → 按需资源"
  },
  {
    icon: "✅",
    title: "验证与打包",
    desc: "自动验证结构和命名规范，生成 .skill 分发包"
  },
  {
    icon: "🔄",
    title: "迭代优化",
    desc: "基于实际使用反馈持续改进 Skill"
  }
];

const FAQ = [
  {
    q: "Skill 的核心原则是什么？",
    a: "简洁是关键。上下文窗口是公共资源，只添加 Codex 不知道的信息。挑战每条内容：'Codex 真的需要这个解释吗？'"
  },
  {
    q: "什么时候使用脚本 vs 指令？",
    a: "高自由度任务用文本指令，中等自由度用伪代码，低自由度（易错操作）用具体脚本。"
  },
  {
    q: "如何组织大型 Skill？",
    a: "SKILL.md 保持精简（<500行），详细内容拆分到 references/ 目录，按需加载。"
  },
  {
    q: "Skill 命名有什么规范？",
    a: "只用小写字母、数字和连字符，动词开头，工具前缀（如 gh-、notion-）。"
  }
];

export default function SkillCreatorLanding({ skill }) {
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
      name: "Skill 创建器 - OpenAI Codex Skill",
      description: "创建自定义 Codex Skill 的官方指南，包含结构规范、资源管理和打包分发",
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
        title="Skill 创建器 | 创建自定义 Codex Skill 指南 - OpenAI"
        description="如何创建自定义 Codex Skill？这个 OpenAI 官方 Skill 提供完整的创建指南，包含 SKILL.md 结构、资源目录规范、触发机制设计和打包分发流程。"
        path="/landing/skill-creator"
        keywords="Codex Skill,创建Skill,OpenAI,Skill开发,自定义Skill,SKILL.md,Codex扩展"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">OpenAI Skill · 开发工具</span>
          <h1>Skill 创建器：创建自定义 Codex Skill</h1>
          <p className="ddd-subtitle">OpenAI 官方指南，标准化 Skill 开发流程</p>

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
              href="https://github.com/openai/skills"
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
        <p className="lead">这个 OpenAI 官方 Skill 帮你规范化 Skill 开发</p>

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
        <h2>核心功能</h2>
        <p className="lead">完整的 Skill 开发工具链</p>

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
        <h2>Skill 结构规范</h2>
        <p className="lead">标准化的目录结构</p>

        <div style={{ marginTop: "2rem", background: "var(--bg-secondary)", padding: "1.5rem", borderRadius: "8px" }}>
          <pre style={{ background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
{`skill-name/
├── SKILL.md (必需)
│   ├── YAML frontmatter
│   │   ├── name: (必需)
│   │   └── description: (必需)
│   └── Markdown 指令
└── Bundled Resources (可选)
    ├── scripts/      - 可执行脚本
    ├── references/   - 参考文档
    └── assets/       - 输出资源`}
          </pre>
        </div>
      </section>

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

      <section className="section ddd-section">
        <h2>相关资源</h2>
        <div className="ddd-resources">
          <a href="/skills/openai-skill-creator" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">📄</span>
            <h4>完整 SKILL.md</h4>
            <p>查看完整定义</p>
          </a>
          <a href="https://github.com/openai/skills" target="_blank" rel="noopener noreferrer" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub 源码</h4>
            <p>OpenAI 官方仓库</p>
          </a>
          <a href="/skills/openai-skill-installer" className="ddd-resource-card">
            <span className="ddd-resource-card__icon">📦</span>
            <h4>Skill 安装器</h4>
            <p>安装和管理 Skills</p>
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
  const skill = getSkillBySlug("openai-skill-creator");
  return {
    props: {
      skill: {
        name: skill?.name || "skill-creator",
        description: skill?.description || "",
        body: skill?.body || ""
      }
    }
  };
}
