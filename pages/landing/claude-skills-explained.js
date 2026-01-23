import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

export default function ClaudeSkillsExplained() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Claude Skills Explained",
    description:
      "了解 Claude skills 是什么、Anthropic skills 如何工作、与 MCP 的区别，以及如何在真实场景中使用。",
    url: `${site.domain}/landing/claude-skills-explained`,
    inLanguage: "zh-CN"
  };

  return (
    <>
      <SeoHead
        title="Claude Skills Explained - Claude Skills 详解、使用与选择"
        description="了解 Claude skills 是什么、Anthropic skills 如何工作、与 MCP 的区别，以及如何在真实场景中使用。"
        path="/landing/claude-skills-explained"
        keywords="Claude skills, Anthropic skills, skills vs MCP, how to use Claude skills, Claude Skills 详解"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude Skills Explained</p>
          <h1>Claude Skills Explained</h1>
          <p>
            面向开发者的权威解释页，帮助你理解 Claude skills、Anthropic skills 与 MCP 的差异，并快速找到实践路径。
          </p>
        </div>
      </section>

      <section className="section">
        <p className="lead">
          Claude skills 是 Anthropic 生态的核心能力，用于定义结构化、可复用的能力，让 Claude 可以在真实工作流中更稳定地完成任务。
        </p>
        <p className="lead">
          但很多开发者对 "Anthropic skills"、"Claude skills" 以及它们与 MCP 的关系感到困惑。官方说明往往分散，社区示例也缺乏系统化整理。
        </p>
        <p className="lead">
          本页将用更清晰的语言解释 Claude skills 是什么、如何工作、何时使用，以及它们与 MCP 的区别。
        </p>
      </section>

      <section className="section">
        <h2>什么是 Claude Skills？</h2>
        <p>
          Claude skills 是用于扩展 Claude 行为的结构化能力单元，可复用、可组合。它们帮助开发者定义特定工作流、工具调用或输出格式，使交互更一致、更可控、更易扩展。
        </p>
      </section>

      <section className="section">
        <h2>Anthropic Skills vs MCP</h2>
        <p>
          Anthropic skills 与 MCP 都试图让 AI 系统更结构化、更可靠，但定位不同。Skills 强调交互层与工作流层的复用能力，而 MCP 更关注协议层与工具连接。
        </p>
        <p>
          实际上，Claude skills 更容易被应用到业务层，而 MCP 更适合系统层与基础设施级别的集成。
        </p>
        <p>
          如果你正在构建应用功能，Skills 通常更快落地；如果你需要跨工具协作与系统编排，则考虑 MCP。
        </p>
      </section>

      <section className="section">
        <h2>如何使用 Claude Skills</h2>
        <p>使用 Claude skills 通常包含三步：</p>
        <ol className="step-list">
          <li>定义技能的目的与输入（目标、约束、上下文）</li>
          <li>连接到 Claude 的推理或工具调用流程</li>
          <li>集成到实际业务或产品工作流中</li>
        </ol>
        <p>
          多数开发者会先试用现成技能，再逐步创建自己的版本。一个结构化的技能库可以显著减少试错成本。
        </p>
      </section>

      <section className="section">
        <h2>浏览 Anthropic Skills Library</h2>
        <p>
          为了帮助开发者快速上手，我们维护了一个持续增长的 Anthropic Skills Library，
          包含真实案例、社区贡献与实验性工具，并按场景与复杂度分类。
        </p>
        <div className="cta-row">
          <a className="btn btn--primary" href="/">返回首页</a>
          <a className="btn btn--ghost" href="/skills">浏览全部 Skills</a>
        </div>
      </section>

      <section className="section cta-section">
        <h2>从 Anthropic Skills Directory 开始</h2>
        <p>
          先理解 Claude skills，能为后续开发节省大量时间。现在就浏览 Skills Directory，找到你的第一个可复用技能。
        </p>
        <a className="btn btn--primary" href="/">探索 Skills Directory</a>
      </section>
    </>
  );
}
