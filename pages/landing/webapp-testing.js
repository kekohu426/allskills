import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "webapp-testing",
  "awesome-webapp-testing",
  "superpowers-test-driven-development",
  "superpowers-systematic-debugging",
  "superpowers-requesting-code-review",
  "awesome-changelog-generator"
];

const FAQ = [
  {
    q: "适用哪些测试场景？",
    a: "本地 Web 应用的功能验证、端到端流程检查、截图与日志采集、回归验证。"
  },
  {
    q: "需要什么工具？",
    a: "技能内推荐 Playwright；可搭配 TDD、调试、代码评审相关技能提高质量。"
  },
  {
    q: "如何开始？",
    a: "复制测试技能的提示词，按决策树选择静态或动态页面流程，运行或编写 Playwright 脚本。"
  }
];

export default function WebappTestingLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Web 应用测试提示词 | Playwright + TDD",
      description: "Web 应用测试技能集合，包含 Playwright 端到端、TDD、系统化调试与评审提示词。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/webapp-testing`,
      url: `${site.domain}/landing/webapp-testing`,
      keywords: ["Web 应用测试", "Playwright", "TDD 提示词", "自动化测试"]
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
      "@type": "ItemList",
      itemListElement: featured.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: skill.nameZh || skill.name,
        url: `${site.domain}/skills/${skill.slug}`
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Web 应用测试提示词 | Playwright + TDD"
        description="Web 应用测试技能集合，包含 Playwright 端到端、TDD、系统化调试与评审提示词。"
        path="/landing/webapp-testing"
        keywords="Web 应用测试, Playwright, TDD 提示词, 自动化测试"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>Web 测试提示词合集</h1>
          <p>端到端测试、TDD、调试和代码评审技能合集，帮助快速验证 Web 应用质量。</p>
        </div>
      </section>

      <section className="section">
        <h2>精选测试技能</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills/webapp-testing/">
            查看测试技能
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
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const slugMap = new Map(skills.map((s) => [s.slug, s]));
  const featured = FEATURED_SLUGS.map((slug) => slugMap.get(slug)).filter(Boolean);
  return { props: { featured } };
}
