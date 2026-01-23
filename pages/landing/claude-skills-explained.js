import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

export default function ClaudeSkillsExplained() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Claude Skills Explained",
    description:
      "了解 Claude skills 是什么、Anthropic skills 如何工作、如何在实践中使用，以及它们与 MCP 的对比。",
    url: `${site.domain}/landing/claude-skills-explained`,
    inLanguage: "zh-CN"
  };

  return (
    <>
      <SeoHead
        title="Claude Skills Explained：工作方式、使用方法与 MCP 对比"
        description="了解 Claude skills 是什么、Anthropic skills 如何工作、如何在实践中使用，以及它们与 MCP 的对比。"
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
          Claude skills 是 Anthropic 生态的核心能力，用于让与 Claude 的交互更结构化、可复用、更可靠。
        </p>
        <p className="lead">
          但很多开发者对 "Anthropic skills"、"Claude skills" 以及它们与 MCP 的关系感到困惑。官方说明往往分散，社区示例分布在仓库、Demo 与讨论中，缺乏系统化整理。
        </p>
        <p className="lead">
          本页将用更清晰的语言解释 Claude skills 是什么、如何工作、何时使用，以及它们与 MCP 的区别，避免营销话术。
        </p>
      </section>

      <section className="section">
        <h2>What Are Claude Skills?</h2>
        <p>
          Claude skills 是扩展 Claude 在应用与工作流中使用方式的结构化能力。
        </p>
        <p>
          一个 skill 往往代表可复用的行为、工具或工作流模式，让 Claude 在解决任务时可以直接调用。相比临时拼接提示词，skills 可以定义更清晰的边界、输入与期望行为。
        </p>
        <p>
          在实践中，Claude skills 让 AI 系统更可预测、更易维护，也更容易在不同场景中规模化复用。
        </p>
      </section>

      <section className="section">
        <h2>What Are Anthropic Skills?</h2>
        <p>
          "Anthropic skills" 通常指在 Anthropic 生态中构建或描述的 Claude skills。
        </p>
        <p>
          这些 skills 可能来自官方示例、推荐模式或社区实现，符合 Anthropic 对安全性、推理与结构化交互的实践方式。
        </p>
        <p>
          它不是单一的标准格式，而是一个不断增长的实践集合，用于在真实应用中扩展 Claude 的能力。
        </p>
      </section>

      <section className="section">
        <h2>Anthropic Skills vs MCP</h2>
        <p>Anthropic skills 与 MCP 覆盖 AI 系统设计的不同层级。</p>
        <p>
          Anthropic skills 关注交互层与工作流层的可复用能力，强调 Claude 能做什么、如何推理，以及如何跨应用复用特定行为。
        </p>
        <p>
          MCP 更偏向协议层的协调与消息处理，常用于基础设施较重或多智能体协作的系统中。
        </p>
        <p>
          对多数应用开发者而言，Claude skills 更容易落地且价值更快体现；MCP 更适合复杂的系统级编排。
        </p>
      </section>

      <section className="section">
        <h2>How to Use Claude Skills</h2>
        <p>使用 Claude skills 通常包含三步：</p>
        <ol className="step-list">
          <li>定义 skill 的目的与它解决的问题</li>
          <li>明确输入、输出与约束条件</li>
          <li>集成到应用、工作流或工具中</li>
        </ol>
        <p>
          许多开发者会先从已有技能开始探索，再逐步创建自己的版本。真实案例能帮助理解 skills 的结构与它们如何影响 Claude 的推理过程。
        </p>
      </section>

      <section className="section">
        <h2>Common Use Cases for Claude Skills</h2>
        <p>Claude skills 常见于以下场景：</p>
        <ul className="step-list">
          <li>结构化数据抽取与转换</li>
          <li>多步骤推理工作流</li>
          <li>工具使用与函数调用</li>
          <li>具备一致行为的垂直领域助手</li>
          <li>跨应用复用的自动化模式</li>
        </ul>
        <p>
          将这些行为封装为 skills，可降低提示词复杂度并提升可靠性。
        </p>
      </section>

      <section className="section">
        <h2>Explore the Anthropic Skills Library</h2>
        <p>
          为了帮助开发者快速上手，我们维护了一个精选的 Anthropic Skills Library，包含真实案例、实验性工具与社区贡献。
        </p>
        <p>
          每个 skill 按场景、复杂度与集成模式整理，便于找到相关示例并快速学习。
        </p>
        <div className="cta-row">
          <a className="btn btn--primary" href="/skills">Browse the Anthropic Skills Directory</a>
          <a className="btn btn--ghost" href="/">返回首页</a>
        </div>
      </section>

      <section className="section cta-section">
        <h2>从 Anthropic Skills Directory 开始</h2>
        <p>
          及早理解 Claude skills 能显著节省开发时间并减少试错成本。
        </p>
        <p>
          如果你正在探索 Anthropic 生态，Anthropic Skills Directory 提供一个实用的起点，帮助你发现示例、比较方法，并开始构建结构化的 AI 工作流。
        </p>
        <a className="btn btn--primary" href="/skills">Browse the Anthropic Skills Directory</a>
      </section>
    </>
  );
}
