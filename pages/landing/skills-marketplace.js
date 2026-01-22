import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "brand-guidelines",
  "canvas-design",
  "planning-with-files",
  "doc-coauthoring",
  "webapp-testing",
  "awesome-content-research-writer",
  "awesome-changelog-generator",
  "skill-creator",
  "tailored-resume-generator"
];

const FAQ = [
  {
    q: "什么是技能市场（Skills Marketplace）？",
    a: "技能市场是一个发现、分享和使用预构建 AI 智能体技能的平台。这些技能是可复用的提示词和工作流，帮助 AI 助手更高效地完成特定任务。"
  },
  {
    q: "如何使用市场中的技能？",
    a: "浏览技能列表，点击需要的技能，复制提示词。将其粘贴到 Claude、ChatGPT 或任何 AI 助手中作为系统提示词即可激活。"
  },
  {
    q: "这些技能免费吗？",
    a: "是的，大多数技能都是开源免费的。具体许可信息请查看各技能详情页。"
  },
  {
    q: "我可以提交自己的技能吗？",
    a: "当然可以！我们欢迎社区贡献。您可以通过 GitHub 仓库提交技能，或直接联系我们。"
  },
  {
    q: "有哪些类型的技能？",
    a: "我们提供 500+ 技能，涵盖编程、写作、设计、规划、测试、文档处理等多种专业工作流。"
  }
];

export default function SkillsMarketplaceLanding({ featured, totalCount }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "技能市场 - AI 智能体技能目录",
      description: "发现 500+ 即用型 AI 智能体技能。最大的开放式 Claude、ChatGPT 和 AI 助手提示词与工作流市场。",
      url: `${site.domain}/landing/skills-marketplace`,
      inLanguage: "zh-CN",
      keywords: ["技能市场", "Skills Marketplace", "AI技能", "智能体技能", "Claude技能", "ChatGPT提示词"]
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
        title="技能市场 Skills Marketplace - 500+ AI 智能体技能 | AllSkills"
        description="发现 500+ 即用型 AI 智能体技能。最大的开放式技能市场，支持 Claude、ChatGPT 等 AI 助手。复制即用，提升效率。"
        path="/landing/skills-marketplace"
        keywords="技能市场, Skills Marketplace, AI技能, 智能体技能, Claude技能, ChatGPT提示词, AI工作流"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skills Marketplace 技能市场</p>
          <h1>开放的 AI 智能体技能市场</h1>
          <p>发现 {totalCount}+ 精选技能，适用于 Claude、ChatGPT 等 AI 助手。即复即用，提升工作效率。</p>
        </div>
      </section>

      <section className="section">
        <h2>为什么使用技能市场？</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>节省时间</h3>
            <p>跳过提示词工程，直接使用专家和社区创建的成熟技能。</p>
          </div>
          <div className="feature-item">
            <h3>效果更好</h3>
            <p>结构化技能比临时提示词产出更稳定、更高质量的结果。</p>
          </div>
          <div className="feature-item">
            <h3>开源免费</h3>
            <p>大多数技能开源。可商用、可修改、可分享。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>精选技能</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} lang="zh" />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills/">
            浏览全部 {totalCount}+ 技能
          </a>
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
        <h2>立即开始使用</h2>
        <p>加入数千用户，用技能市场提升 AI 生产力。</p>
        <a className="btn btn-primary" href="/skills/">探索技能</a>
      </section>

      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 1.5rem;
        }
        .feature-item h3 {
          margin-bottom: 0.5rem;
        }
        .cta-section {
          text-align: center;
          padding: 3rem 1rem;
          background: var(--bg-secondary, #f5f5f5);
          border-radius: 8px;
        }
        .cta-section p {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const slugMap = new Map(skills.map((s) => [s.slug, s]));
  const featured = FEATURED_SLUGS.map((slug) => slugMap.get(slug)).filter(Boolean);
  return { props: { featured, totalCount: skills.length } };
}
