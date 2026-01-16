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

const HIGHLIGHTS = [
  { label: "核心文件", value: "3 份" },
  { label: "适配场景", value: "复杂/多阶段" },
  { label: "复用价值", value: "可追溯" }
];

const FILES = [
  {
    name: "task_plan.md",
    title: "任务蓝图",
    desc: "锁定目标、范围与阶段，避免临时改方向。",
    bullets: ["目标与成功标准", "阶段里程碑", "风险与依赖"],
    sample: ["# 目标", "- 用户旅程完成", "# 里程碑", "- M1: 收集需求"]
  },
  {
    name: "findings.md",
    title: "研究与发现",
    desc: "记录关键证据、选择原因和替代方案。",
    bullets: ["调研结论", "决策依据", "替代方案对比"],
    sample: ["# 发现", "- 方案 A 成本更低", "- 方案 B 维护更易"]
  },
  {
    name: "progress.md",
    title: "进度日志",
    desc: "持续写下当前状态、阻塞与下一步。",
    bullets: ["完成事项", "阻塞与风险", "下一步行动"],
    sample: ["# 今日", "- 完成 API 接口", "# 下一步", "- 补齐文档"]
  }
];

const FLOW = [
  { title: "初始化三份文件", desc: "在项目根目录创建，并写入最低可用内容。" },
  { title: "先写后做", desc: "每个阶段先更新文件，再推进执行。" },
  { title: "变更即时记录", desc: "范围变化、风险与决策都写进文件。" },
  { title: "复盘与复用", desc: "任务结束后回顾，沉淀为模板。" }
];

const SUITABLE = [
  "需要多次沟通的复杂任务",
  "跨文件/跨功能的协作项目",
  "需要留痕复盘的流程型工作",
  "需要阶段验收的开发任务"
];

const NOT_SUITABLE = ["一次性小改动", "即时修 Bug", "快速实验原型"];

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

      <section className="pwf-hero">
        <div className="pwf-hero__content">
          <span className="pwf-badge">规划工作流</span>
          <h1>Planning with Files</h1>
          <p className="pwf-subtitle">把复杂任务写进文件，做事不再丢上下文。</p>
          <p className="pwf-lead">
            用三份文件锁定目标、研究与进度，让协作和复盘都可追溯。适合多阶段任务、复杂开发或持续迭代项目。
          </p>
          <div className="pwf-cta">
            <a className="btn btn--primary" href="/skills/planning-with-files/">
              查看技能
            </a>
            <a className="btn btn--secondary" href="#workflow">
              查看流程
            </a>
          </div>
          <div className="pwf-metrics">
            {HIGHLIGHTS.map((item) => (
              <div key={item.label} className="pwf-metric">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="pwf-hero__art">
          {FILES.map((file) => (
            <div key={file.name} className="pwf-mini-card">
              <div className="pwf-mini-card__title">
                <span>{file.name}</span>
                <strong>{file.title}</strong>
              </div>
              <p>{file.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="section pwf-section">
        <h2>四步流程，让规划真正落地</h2>
        <p className="lead">让任务推进有节奏，有记录，有依据。</p>
        <div className="pwf-flow">
          {FLOW.map((step, index) => (
            <div key={step.title} className="pwf-flow-card">
              <div className="pwf-flow-card__index">0{index + 1}</div>
              <div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section pwf-section">
        <h2>三份文件，各司其职</h2>
        <p className="lead">写清楚要做什么、为什么做、现在进度到哪一步。</p>
        <div className="pwf-file-grid">
          {FILES.map((file) => (
            <div key={file.name} className="pwf-file-card">
              <div className="pwf-file-card__header">
                <code>{file.name}</code>
                <span>{file.title}</span>
              </div>
              <p className="pwf-file-card__desc">{file.desc}</p>
              <ul>
                {file.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <pre className="pwf-file-card__sample">{file.sample.join("\n")}</pre>
            </div>
          ))}
        </div>
      </section>

      <section className="section pwf-section">
        <h2>适合你吗？</h2>
        <div className="pwf-split">
          <div className="pwf-panel pwf-panel--good">
            <h3>✅ 推荐使用</h3>
            <ul>
              {SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="pwf-panel pwf-panel--avoid">
            <h3>❌ 可以省略</h3>
            <ul>
              {NOT_SUITABLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section pwf-section">
        <div className="section__header">
          <h2>规划与执行相关技能</h2>
          <a className="btn btn--secondary" href="/skills/planning-with-files/">
            查看主技能
          </a>
        </div>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </section>

      <section className="section pwf-section">
        <div className="pwf-cta-panel">
          <div>
            <h2>准备把任务写进文件了吗？</h2>
            <p>复制技能提示词，马上在项目里建立 task_plan、findings、progress 三份文件。</p>
          </div>
          <div className="pwf-cta-panel__actions">
            <a className="btn btn--primary" href="/skills/planning-with-files/">
              立即开始
            </a>
            <a className="btn btn--secondary" href="/skills/">
              浏览全部技能
            </a>
          </div>
        </div>
      </section>

      <section className="section pwf-section">
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
