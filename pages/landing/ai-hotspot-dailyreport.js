import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";
import site from "../../data/site.json";

const VALUE_PROPS = [
  { icon: "🚀", text: "15 分钟自动生成 AI 日报" },
  { icon: "📊", text: "200+ Reddit/YouTube AI 热点" },
  { icon: "🎨", text: "10 张 8K 专业配图" }
];

// 痛点场景 - 融入长尾词
const PAIN_POINTS = [
  {
    problem: "如何自动收集 AI 新闻？",
    solution: "一键从 15 个 Reddit 子版块和 YouTube 频道采集，无需手动浏览"
  },
  {
    problem: "Reddit AI 热点汇总太耗时？",
    solution: "自动抓取 r/MachineLearning、r/LocalLLaMA 等热门社区，Claude 智能分析"
  },
  {
    problem: "AI 资讯自动整理有什么工具？",
    solution: "这个 Claude Skill 自动分类、生成摘要、输出 Obsidian 格式日报"
  },
  {
    problem: "每日 AI 新闻汇总怎么做？",
    solution: "2 条命令完成全流程：数据采集 + 配图生成，100% 自动化"
  }
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
    title: "Reddit/YouTube AI 热点采集",
    desc: "自动从 r/MachineLearning、r/LocalLLaMA 等 15 个 AI 社区收集热点新闻"
  },
  {
    icon: "🤖",
    title: "Claude 智能分析生成日报",
    desc: "AI 自动生成中文摘要、关键要点提取、情感分析，告别手动整理"
  },
  {
    icon: "📝",
    title: "Obsidian AI 笔记格式",
    desc: "输出结构化 Markdown 日报，完美适配 Obsidian 知识库管理"
  },
  {
    icon: "🖼️",
    title: "AI 配图自动生成",
    desc: "智能提示词生成器 v2.0，输出 8K 质量 16:9 专业配图"
  },
  {
    icon: "⚡",
    title: "AI 行业动态追踪自动化",
    desc: "2 条命令完成全流程，每日 AI 新闻汇总无需手动干预"
  },
  {
    icon: "✅",
    title: "Claude Skill 开箱即用",
    desc: "TDD 测试覆盖，100% 行为验证，稳定可靠的自动化工具"
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
    q: "这个 AI 热点分析工具需要哪些 API Key？",
    a: "需要 Anthropic API Key（用于 Claude 生成日报）和 ModelScope API Key（用于 AI 配图生成）。两个都可以免费获取。"
  },
  {
    q: "自动收集 AI 新闻每次运行花费多少？",
    a: "约 $0.15-0.30 美元，主要是 Claude API 调用费用。图片生成使用 ModelScope 免费额度。"
  },
  {
    q: "可以自定义 Reddit AI 热点汇总的数据源吗？",
    a: "可以。编辑 config/config.yaml 添加更多 Reddit 子版块或 YouTube 频道，灵活配置 AI 资讯自动整理范围。"
  },
  {
    q: "这个 Claude Skill 支持哪些输出格式？",
    a: "默认输出 Obsidian 兼容的 Markdown 格式，包含完整日报、Top10 总结和配图报告，完美适配 Obsidian AI 笔记工作流。"
  },
  {
    q: "AI 配图生成质量如何？",
    a: "使用智能提示词生成器 v2.0，输出 8K 质量、16:9 比例的专业配图，支持中英双语标题，适合社交媒体分享。"
  },
  {
    q: "如何实现每日 AI 新闻汇总自动化？",
    a: "配合 cron 定时任务，可以实现完全自动化的 AI 行业动态追踪，每天定时生成日报到 Obsidian Vault。"
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
      name: "AI 热点日报生成器 - Claude Skill",
      description: "自动收集 Reddit/YouTube AI 热点新闻，Claude 智能分析生成中文日报和专业配图的自动化工具",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      keywords: "AI热点,AI新闻,日报生成,Claude Skill,Reddit AI,自动化,Obsidian",
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
      name: "如何使用 Claude Skill 自动收集 AI 新闻生成日报",
      description: "5 步快速上手 AI 热点日报生成器，实现 Reddit/YouTube AI 资讯自动整理",
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
        title="AI 热点日报生成器 | 自动收集 Reddit/YouTube AI 新闻 - Claude Skill"
        description="如何自动收集 AI 新闻？这个 Claude Skill 15 分钟从 Reddit/YouTube 采集 200+ AI 热点，智能生成中文日报和 10 张专业配图。支持 Obsidian AI 笔记，实现每日 AI 新闻汇总自动化。"
        path="/landing/ai-hotspot-dailyreport"
        keywords="AI热点,AI新闻,日报生成,Claude Skill,Reddit AI热点汇总,自动收集AI新闻,AI资讯自动整理,Obsidian AI笔记,每日AI新闻汇总,AI行业动态追踪,AI热点分析工具,Claude生成日报"
        jsonLd={jsonLd}
        ogType="article"
      />

      {/* Hero Section */}
      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Claude Skill · 自动化工具</span>
          <h1>AI 热点日报生成器：自动收集 AI 新闻</h1>
          <p className="ddd-subtitle">15 分钟，从 Reddit/YouTube 200+ AI 热点到专业中文日报</p>

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

      {/* Pain Points - 长尾词场景 */}
      <section className="section ddd-section">
        <h2>你是否也有这些困扰？</h2>
        <p className="lead">这个 Claude Skill 帮你解决 AI 资讯追踪难题</p>

        <div className="ddd-docs-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {PAIN_POINTS.map((item) => (
            <div key={item.problem} className="ddd-doc-card">
              <h4 style={{ color: "var(--accent)" }}>{item.problem}</h4>
              <p>{item.solution}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section ddd-section">
        <h2>Claude Skill 核心功能</h2>
        <p className="lead">全自动化的 AI 热点追踪和日报生成</p>

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
        <h2>5 步快速上手 AI 日报生成</h2>
        <p className="lead">从安装到生成第一份 AI 热点日报</p>

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
        <h2>Reddit/YouTube AI 热点数据源</h2>
        <p className="lead">覆盖主流 AI 社区，自动收集 AI 新闻</p>

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
        <h2>Obsidian AI 笔记输出</h2>
        <p className="lead">自动生成结构化日报到 Obsidian Vault</p>

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
        <h2>AI 热点日报生成器常见问题</h2>
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
        <h2>相关 Claude Skills 资源</h2>

        <div className="ddd-resources">
          <a
            href="/skills/ai-hotspot-dailyreport-skill"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📄</span>
            <h4>完整 SKILL.md</h4>
            <p>查看完整的 Claude Skill 定义和详细说明</p>
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

          <a
            href="/skills"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🔍</span>
            <h4>浏览全部 Skills</h4>
            <p>发现更多实用的 Claude Skills 工具</p>
          </a>

          <a
            href="/blog"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📚</span>
            <h4>技术博客</h4>
            <p>了解 Claude Skills 开发技巧和最佳实践</p>
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
