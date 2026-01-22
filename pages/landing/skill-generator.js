import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "skill-creator",
  "openai-skill-installer",
  "agent-development",
  "prompt-engineering-patterns"
];

const FEATURES = [
  {
    title: "结构化输出",
    desc: "自动生成合规的 SKILL.md 结构，包含标题、描述、步骤与示例。"
  },
  {
    title: "质量评分",
    desc: "输出自带质量分数，便于快速评估可用性。"
  },
  {
    title: "一键下载",
    desc: "生成后直接下载 SKILL.md，放入技能目录即可使用。"
  }
];

const USE_CASES = [
  {
    title: "团队技能模板",
    desc: "把内部流程沉淀为可复用的技能，提升协作效率。"
  },
  {
    title: "私有工具封装",
    desc: "把常用操作封装为 Skill，降低上手成本。"
  },
  {
    title: "技能市场上架",
    desc: "为 Skills Marketplace 提前准备标准化输出。"
  }
];

const STEPS = [
  {
    step: "01",
    title: "描述需求",
    desc: "用自然语言说明你的技能要解决什么问题。"
  },
  {
    step: "02",
    title: "生成 Skill",
    desc: "AI 输出完整 SKILL.md，并给出质量评分。"
  },
  {
    step: "03",
    title: "直接使用",
    desc: "下载并放入技能目录，或提交到技能市场。"
  }
];

const FAQ = [
  {
    q: "生成的 SKILL.md 可以直接使用吗？",
    a: "可以直接作为初稿使用。建议根据你的业务流程做少量修改，以提升触发精准度。"
  },
  {
    q: "支持中英文描述吗？",
    a: "支持。你可以使用中文或英文描述需求，模型会生成对应风格的 Skill 内容。"
  },
  {
    q: "这个工具适合哪些人？",
    a: "适合需要快速创建技能模板的开发者、运营、产品与团队负责人。"
  },
  {
    q: "如何让 Skill 更容易触发？",
    a: "在 description 中写清楚触发场景与关键词，这决定了 Skill 是否被调用。"
  }
];

export default function SkillGeneratorLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Skill 生成器 | 一键生成 SKILL.md",
      description: "免费在线生成 Claude Code SKILL.md 文件。支持质量评分、一键下载，快速创建可复用技能。",
      url: `${site.domain}/landing/skill-generator`,
      inLanguage: "zh-CN",
      keywords: ["skills", "skill generate", "skill marketplace", "Skill 生成器", "SKILL.md", "Claude Code", "Codex Skill"]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Skill 生成器",
      description: "在线生成 Claude Code SKILL.md 的工具，支持质量评分与一键下载。",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: `${site.domain}/tools/skill-generator`,
      offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" }
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
        title="Skill 生成器 | 一键生成 SKILL.md"
        description="免费在线生成 Claude Code SKILL.md 文件。描述需求即可生成完整技能，支持质量评分与一键下载。"
        path="/landing/skill-generator"
        keywords="skills, skill generate, skill marketplace, Skill 生成器, SKILL.md, Claude Code"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skill Generator</p>
          <h1>Skill 生成器：一键生成标准化 SKILL.md</h1>
          <p>面向技能市场与团队协作的快速生成工具。描述需求，AI 生成可直接使用的 Skill 文件。</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/tools/skill-generator">立即生成</a>
            <a className="btn btn--secondary" href="/landing/skills-marketplace">浏览 Skills Marketplace</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>为什么要用 Skill 生成器？</h2>
        <div className="features-grid">
          {FEATURES.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>适用场景</h2>
        <div className="features-grid">
          {USE_CASES.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>使用步骤</h2>
        <div className="steps-grid">
          {STEPS.map((item) => (
            <div key={item.step} className="step-card">
              <span className="step-num">{item.step}</span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>相关技能推荐</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills">浏览全部 Skills</a>
        </div>
      </section>

      <section className="section">
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

      <section className="section cta-section">
        <h2>开始生成你的 Skill</h2>
        <p>把想法变成结构化技能，直接投入使用或发布到技能市场。</p>
        <a className="btn btn--primary" href="/tools/skill-generator">进入 Skill 生成器</a>
      </section>

      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .feature-item h3 {
          margin-bottom: 0.5rem;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .step-card {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
        }
        .step-num {
          display: inline-block;
          font-family: "Rajdhani", sans-serif;
          color: var(--accent);
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }
        .cta-section {
          text-align: center;
          padding: 3rem 1rem;
          background: var(--bg-secondary, #0f1422);
          border-radius: 12px;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const slugMap = new Map(skills.map((s) => [s.slug, s]));
  const featured = FEATURED_SLUGS.map((slug) => slugMap.get(slug)).filter(Boolean);
  return { props: { featured } };
}
