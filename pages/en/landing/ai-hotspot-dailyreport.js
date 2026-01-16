import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import { getSkillBySlug } from "../../../lib/skills";
import site from "../../../data/site.json";

const VALUE_PROPS = [
  { icon: "🚀", text: "15-min automated AI daily report" },
  { icon: "📊", text: "200+ Reddit/YouTube AI hotspots" },
  { icon: "🎨", text: "10 professional 8K images" }
];

// Pain points with long-tail keywords
const PAIN_POINTS = [
  {
    problem: "How to automatically collect AI news?",
    solution: "One-click collection from 15 Reddit subreddits and YouTube channels, no manual browsing"
  },
  {
    problem: "Reddit AI hotspot aggregation too time-consuming?",
    solution: "Auto-fetch from r/MachineLearning, r/LocalLLaMA and more, with Claude intelligent analysis"
  },
  {
    problem: "What tools for automatic AI news curation?",
    solution: "This Claude Skill auto-categorizes, generates summaries, outputs Obsidian-format daily reports"
  },
  {
    problem: "How to create daily AI news digest?",
    solution: "2 commands for the entire workflow: data collection + image generation, 100% automated"
  }
];

const QUICK_STEPS = [
  { step: 1, title: "Clone Repository", desc: "git clone and run setup.sh" },
  { step: 2, title: "Configure API", desc: "Add Anthropic and ModelScope API Keys" },
  { step: 3, title: "Run Collection", desc: "python3 main.py --hours 24" },
  { step: 4, title: "Generate Images", desc: "python3 generate_enhanced_top10.py" },
  { step: 5, title: "View Report", desc: "Open generated Markdown in Obsidian" }
];

const FEATURES = [
  {
    icon: "📡",
    title: "Reddit/YouTube AI Hotspot Collection",
    desc: "Auto-collect from r/MachineLearning, r/LocalLLaMA and 15 AI communities"
  },
  {
    icon: "🤖",
    title: "Claude AI Analysis & Report Generation",
    desc: "AI auto-generates Chinese summaries, key points extraction, sentiment analysis"
  },
  {
    icon: "📝",
    title: "Obsidian AI Notes Format",
    desc: "Structured Markdown output, perfectly compatible with Obsidian knowledge management"
  },
  {
    icon: "🖼️",
    title: "AI Image Auto-Generation",
    desc: "Smart prompt generator v2.0, outputs 8K quality 16:9 professional images"
  },
  {
    icon: "⚡",
    title: "AI Industry Tracking Automation",
    desc: "2 commands for full workflow, daily AI news digest without manual intervention"
  },
  {
    icon: "✅",
    title: "Claude Skill Ready-to-Use",
    desc: "TDD test coverage, 100% behavior verification, stable and reliable automation tool"
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
  "YouTube AI Channels"
];

const FAQ = [
  {
    q: "What API Keys does this AI hotspot analysis tool need?",
    a: "Requires Anthropic API Key (for Claude report generation) and ModelScope API Key (for AI image generation). Both can be obtained for free."
  },
  {
    q: "How much does each AI news collection run cost?",
    a: "About $0.15-0.30 USD, mainly Claude API call costs. Image generation uses ModelScope free quota."
  },
  {
    q: "Can I customize Reddit AI hotspot aggregation data sources?",
    a: "Yes. Edit config/config.yaml to add more Reddit subreddits or YouTube channels, flexibly configure AI news curation scope."
  },
  {
    q: "What output formats does this Claude Skill support?",
    a: "Defaults to Obsidian-compatible Markdown format, including full daily report, Top10 summary, and image report, perfectly fits Obsidian AI notes workflow."
  },
  {
    q: "What's the AI image generation quality?",
    a: "Uses smart prompt generator v2.0, outputs 8K quality, 16:9 ratio professional images, supports bilingual titles, suitable for social media sharing."
  },
  {
    q: "How to automate daily AI news digest?",
    a: "Combined with cron scheduled tasks, achieve fully automated AI industry tracking, generate daily reports to Obsidian Vault on schedule."
  }
];

const OUTPUT_FILES = [
  { name: "2026-01-16.md", desc: "Full daily report (241 hotspots)" },
  { name: "2026-01-16-Top10-Summary.md", desc: "Top 10 curated summary" },
  { name: "🎨-Enhanced-Image-Report.md", desc: "Image generation report" },
  { name: "images/top01_*.jpg", desc: "10 professional images" }
];

export default function AIHotspotLandingEn({ skill }) {
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
      name: "AI Hotspot Daily Report Generator - Claude Skill",
      description: "Automatically collect Reddit/YouTube AI hotspots, Claude intelligently analyzes and generates daily reports with professional images",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      inLanguage: "en",
      keywords: "AI hotspot,AI news,daily report generator,Claude Skill,Reddit AI,automation,Obsidian",
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
      name: "How to use Claude Skill to automatically collect AI news and generate daily reports",
      description: "5 steps to get started with AI Hotspot Daily Report Generator, automate Reddit/YouTube AI news curation",
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
        title="AI Hotspot Daily Report Generator | Auto-Collect Reddit/YouTube AI News - Claude Skill"
        description="How to automatically collect AI news? This Claude Skill collects 200+ AI hotspots from Reddit/YouTube in 15 minutes, intelligently generates daily reports with 10 professional images. Supports Obsidian AI notes, automates daily AI news digest."
        path="/en/landing/ai-hotspot-dailyreport"
        keywords="AI hotspot,AI news,daily report generator,Claude Skill,Reddit AI hotspot aggregation,auto collect AI news,AI news curation,Obsidian AI notes,daily AI news digest,AI industry tracking,AI hotspot analysis tool,Claude generate report"
        jsonLd={jsonLd}
        ogType="article"
      />

      {/* Hero Section */}
      <section className="ddd-hero">
        <div className="ddd-hero__inner">
          <span className="ddd-badge">Claude Skill · Automation Tool</span>
          <h1>AI Hotspot Daily Report Generator: Auto-Collect AI News</h1>
          <p className="ddd-subtitle">15 minutes, from 200+ Reddit/YouTube AI hotspots to professional daily report</p>

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
              {copied ? "Copied!" : "Copy Skill"}
            </button>
            <a
              className="btn btn--secondary"
              href="https://github.com/zhuyansen/ai-hotspot-dailyreport-skill"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Source
            </a>
          </div>
        </div>
      </section>

      {/* Pain Points - Long-tail keyword scenarios */}
      <section className="section ddd-section">
        <h2>Do You Have These Problems?</h2>
        <p className="lead">This Claude Skill solves your AI news tracking challenges</p>

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
        <h2>Claude Skill Core Features</h2>
        <p className="lead">Fully automated AI hotspot tracking and daily report generation</p>

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
        <h2>5 Steps to Get Started with AI Daily Report</h2>
        <p className="lead">From installation to your first AI hotspot daily report</p>

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
          <h4 style={{ marginBottom: "1rem" }}>Installation Commands</h4>
          <pre style={{ background: "var(--bg-tertiary)", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
{`# 1. Clone repository
git clone https://github.com/zhuyansen/ai-hotspot-dailyreport-skill.git
cd ai-hotspot-dailyreport-skill

# 2. Run setup script
./setup.sh

# 3. Configure API Keys
nano config/.env
# ANTHROPIC_API_KEY=sk-ant-api03-...
# MODELSCOPE_API_KEY=...

# 4. Generate daily report
source venv/bin/activate
python3 main.py --hours 24
python3 generate_enhanced_top10.py`}
          </pre>
        </div>
      </section>

      {/* Data Sources */}
      <section className="section ddd-section">
        <h2>Reddit/YouTube AI Hotspot Data Sources</h2>
        <p className="lead">Covering mainstream AI communities, auto-collect AI news</p>

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
        <h2>Obsidian AI Notes Output</h2>
        <p className="lead">Auto-generate structured daily reports to Obsidian Vault</p>

        <div className="ddd-use-cases">
          <div className="ddd-use-case ddd-use-case--suitable" style={{ flex: 1 }}>
            <h3>📁 Output Directory Structure</h3>
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
        <h2>AI Hotspot Daily Report Generator FAQ</h2>
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
        <h2>Related Claude Skills Resources</h2>

        <div className="ddd-resources">
          <a
            href="/en/skills/ai-hotspot-dailyreport-skill"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📄</span>
            <h4>Full SKILL.md</h4>
            <p>View complete Claude Skill definition and detailed instructions</p>
          </a>

          <a
            href="https://github.com/zhuyansen/ai-hotspot-dailyreport-skill"
            target="_blank"
            rel="noopener noreferrer"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">💻</span>
            <h4>GitHub Source</h4>
            <p>View source code, submit issues or contribute</p>
          </a>

          <a
            href="/en/skills?category=Automation"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">⚡</span>
            <h4>More Automation Skills</h4>
            <p>Explore other automation-related Claude Skills</p>
          </a>

          <a
            href="/en/skills"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">🔍</span>
            <h4>Browse All Skills</h4>
            <p>Discover more useful Claude Skills tools</p>
          </a>

          <a
            href="/en/blog"
            className="ddd-resource-card"
          >
            <span className="ddd-resource-card__icon">📚</span>
            <h4>Tech Blog</h4>
            <p>Learn Claude Skills development tips and best practices</p>
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
      },
      forcedLocale: "en"
    }
  };
}
