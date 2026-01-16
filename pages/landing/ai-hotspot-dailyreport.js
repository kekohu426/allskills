import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";
import site from "../../data/site.json";

const VALUE_PROPS = [
  { icon: "🚀", text: "15 分钟生成日报" },
  { icon: "📊", text: "241+ AI 热点自动收集" },
  { icon: "🎨", text: "10 张专业配图" }
];

const QUICK_STEPS = [
  { step: 1, title: "克隆仓库", desc: "git clone 并运行 setup.sh" },
  { step: 2, title: "配置 API", desc: "添加 Anthropic 和 ModelScope API Key" },
  { step: 3, title: "运行收集", desc: "python3 main.py --hours 24" },
  { step: 4, title: "生成配图", desc: "python3 generate_enhanced_top10.py" },
  { step: 5, title: "查看日报", desc: "在 Obsidian 中打开生成的 Markdown" }
];

const FEATURES = [
  {
    icon: "📡",
    title: "多源数据采集",
    desc: "自动从 15 个 AI 相关 Reddit 子版块和 YouTube 频道收集热点"
  },
  {
    icon: "🤖",
    title: "Claude AI 分析",
    desc: "智能生成中文摘要、关键要点和情感分析"
  },
  {
    icon: "📝",
    title: "Obsidian 格式",
    desc: "自动分类、结构化的 Markdown 日报，完美适配 Obsidian"
  },
  {
    icon: "🖼️",
    title: "专业配图生成",
    desc: "使用智能提示词生成器 v2.0，输出 8K 质量 16:9 配图"
  },
  {
    icon: "⚡",
    title: "100% 自动化",
    desc: "2 条命令完成全流程，无需手动干预"
  },
  {
    icon: "✅",
    title: "TDD 测试覆盖",
    desc: "100% 行为改进验证，稳定可靠"
  }
];

const DATA_SOURCES = [
  "r/MachineLearning",
  "r/artificial",
  "r/OpenAI",
  "r/LocalLLaMA",
  "r/ClaudeAI",
  "r/ChatGPT",
  "r/StableDiffusion",
  "r/singularity",
  "YouTube AI 频道"
];

const FAQ = [
  {
    q: "需要哪些 API Key？",
    a: "需要 Anthropic API Key（用于 Claude 分析）和 ModelScope API Key（用于图片生成）。两个都可以免费获取。"
  },
  {
    q: "每次运行大概花费多少？",
    a: "约 $0.15-0.30 美元，主要是 Claude API 调用费用。图片生成使用 ModelScope 免费额度。"
  },
  {
    q: "可以自定义数据源吗？",
    a: "可以。编辑 config/config.yaml 添加更多 Reddit 子版块或 YouTube 频道。"
  },
  {
    q: "支持哪些输出格式？",
    a: "默认输出 Obsidian 兼容的 Markdown 格式，包含完整日报、Top10 总结和配图报告。"
  },
  {
    q: "图片质量如何？",
    a: "使用智能提示词生成器 v2.0，输出 8K 质量、16:9 比例的专业配图，支持中英双语标题。"
  }
];

const OUTPUT_FILES = [
  { name: "2026-01-16.md", desc: "完整日报（241 条热点）" },
  { name: "2026-01-16-Top10总结.md", desc: "Top 10 精选摘要" },
  { name: "🎨-增强版图片生成报告.md", desc: "配图生成报告" },
  { name: "images/top01_*.jpg", desc: "10 张专业配图" }
];

export default function AIHotspotLanding({ skill }) {
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
      name: "AI Hotspot Daily Report Skill",
      description: "自动收集 Reddit/YouTube AI 热点，生成中文日报和专业配图的 Claude Skill",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
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
      name: "如何使用 AI Hotspot Daily Report",
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
        title="AI 热点日报生成器 - 自动收集分析 AI 新闻"
        description="15 分钟自动收集 200+ AI 热点，Claude 智能分析生成中文日报，配套 10 张专业配图。支持 Reddit、YouTube 多源采集。"
        path="/landing/ai-hotspot-dailyreport"
        keywords="AI热点, 日报生成, Claude, Reddit, YouTube, Obsidian, AI新闻, 自动化"
        jsonLd={jsonLd}
        ogType="article"
      />

      {/* Hero Section */}
      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">自动化工具</span>
          <h1>AI 热点日报生成器</h1>
          <p className="ddd-subtitle">15 分钟，从 200+ 热点到专业日报</p>

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
              href="https://github.com/zhuyansen/ai-hotspot-dailyreport-skill"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 源码
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section ddd-section">
        <h2>核心功能</h2>
        <p className="lead">全自动化的 AI 热点追踪和内容生成</p>

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

      {/* Quick Start */}
      <section id="quick-start" className="section ddd-section">
        <h2>5 步快速上手</h2>
        <p className="lead">从安装到生成第一份日报</p>

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
          <h4 style={{ marginBottom: "1rem" }}>安装命令</h4>
          <pre style={{ background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
{`# 1. 克隆仓库
git clone https://github.com/zhuyansen/ai-hotspot-dailyreport-skill.git
cd ai-hotspot-dailyreport-skill

# 2. 运行安装脚本
./setup.sh

# 3. 配置 API Key
nano config/.env
# ANTHROPIC_API_KEY=sk-ant-api03-...
# MODELSCOPE_API_KEY=...

# 4. 生成日报
source venv/bin/activate
python3 main.py --hours 24
python3 generate_enhanced_top10.py`}
          </pre>
        </div>
      </section>

      {/* Data Sources */}
      <section className="section ddd-section">
        <h2>数据来源</h2>
        <p className="lead">覆盖主流 AI 社区和内容平台</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {DATA_SOURCES.map((source) => (
            <span
              key={source}
              style={{
                background: "var(--bg-secondary)",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                fontSize: "0.9rem"
              }}
            >
              {source}
            </span>
          ))}
        </div>
      </section>

      {/* Output */}
      <section className="section ddd-section">
        <h2>输出文件</h2>
        <p className="lead">自动生成到 Obsidian Vault</p>

        <div className="ddd-use-cases">
          <div className="ddd-use-case ddd-use-case--suitable" style={{ flex: 1 }}>
            <h3>📁 输出目录结构</h3>
            <ul>
              {OUTPUT_FILES.map((file) => (
                <li key={file.name}>
                  <code>{file.name}</code>
                  <br />
                  <small style={{ color: "var(--text-secondary)" }}>{file.desc}</small>
                </li>
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
            href="/skills/ai-hotspot-dailyreport-skill"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📄</span>
            <h4>完整 SKILL.md</h4>
            <p>查看完整的技能定义和详细说明</p>
          </a>

          <a
            href="https://github.com/zhuyansen/ai-hotspot-dailyreport-skill"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub 源码</h4>
            <p>查看源码、提交 Issue 或贡献代码</p>
          </a>

          <a
            href="/skills?category=Automation"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">⚡</span>
            <h4>更多自动化 Skills</h4>
            <p>探索其他自动化相关的 Claude Skills</p>
          </a>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skill = getSkillBySlug("ai-hotspot-dailyreport-skill");

  return {
    props: {
      skill: {
        name: skill?.name || "AI Hotspot Daily Report",
        description: skill?.description || "",
        body: skill?.body || ""
      }
    }
  };
}
