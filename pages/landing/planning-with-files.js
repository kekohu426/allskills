import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills } from "../../lib/skills";
import site from "../../data/site.json";

const FEATURED_SLUGS = [
  "planning-with-files",
  "superpowers-writing-plans",
  "superpowers-executing-plans",
  "superpowers-finishing-a-development-branch",
  "superpowers-verification-before-completion",
  "superpowers-requesting-code-review"
];

const FAQ = [
  {
    q: "文件化规划是什么？",
    a: "在项目目录中使用 task_plan.md、findings.md、progress.md 记录目标、研究、进展，保持上下文持久和可追踪。"
  },
  {
    q: "适用哪些任务？",
    a: "复杂多步任务、需要多次工具调用的开发/研究、以及需要阶段检查点的项目。"
  },
  {
    q: "如何开始？",
    a: "复制技能提示，在项目根目录初始化三个文件，按阶段更新，遇到错误及时记录。"
  }
];

export default function PlanningWithFilesLanding({ featured }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "文件化规划技能 | Planning with Files",
      description: "Manus 风格文件化规划提示词，含任务计划、研究记录、进度日志，适用于复杂多步任务与开发流程。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/planning-with-files`,
      url: `${site.domain}/landing/planning-with-files`,
      keywords: ["文件化规划", "task_plan", "planning with files", "进度追踪"]
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
        title="文件化规划技能 | Planning with Files"
        description="Manus 风格文件化规划提示词，含任务计划、研究记录、进度日志，适用于复杂多步任务与开发流程。"
        path="/landing/planning-with-files"
        keywords="文件化规划, task_plan, planning with files, 进度追踪"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Landing</p>
          <h1>文件化规划提示词</h1>
          <p>用 task_plan.md / findings.md / progress.md 管理复杂任务，保证目标、进展、错误都有记录可追溯。</p>
        </div>
      </section>

      <section className="section">
        <h2>规划与执行技能</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/skills/planning-with-files/">
            查看文件化规划技能
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
