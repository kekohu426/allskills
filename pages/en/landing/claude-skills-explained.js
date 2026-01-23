import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

export default function ClaudeSkillsExplainedEn() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Claude Skills Explained",
    description:
      "Learn what Claude skills are, how Anthropic skills work, how they compare to MCP, and how to use them in real-world applications.",
    url: `${site.domain}/en/landing/claude-skills-explained`,
    inLanguage: "en"
  };

  return (
    <>
      <SeoHead
        title="Claude Skills Explained: How They Work, How to Use Them, and When to Choose Them"
        description="Learn what Claude skills are, how Anthropic skills work, how they compare to MCP, and how to use them in real-world applications."
        path="/en/landing/claude-skills-explained"
        keywords="Claude skills, Anthropic skills, skills vs MCP, how to use Claude skills"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude Skills Explained</p>
          <h1>Claude Skills Explained</h1>
          <p>
            A clear, practical explanation of Claude skills, Anthropic skills, and how they compare to MCP.
          </p>
        </div>
      </section>

      <section className="section">
        <p className="lead">
          Claude skills are a core part of the Anthropic ecosystem, enabling structured, reusable capabilities
          that extend how Claude can be used in real-world workflows.
        </p>
        <p className="lead">
          However, many developers are confused by terms like "Anthropic skills", "Claude skills", and how they
          differ from concepts such as MCP. Official documentation is often fragmented, while community examples
          are scattered across repositories and discussions.
        </p>
        <p className="lead">
          This page explains what Claude skills are, how they work, when to use them, and how they compare to other
          approaches - with practical explanations instead of marketing language.
        </p>
      </section>

      <section className="section">
        <h2>What Are Claude Skills?</h2>
        <p>
          Claude skills are structured capabilities designed to extend Claude's functionality in a reusable and
          composable way. They allow developers to define specific behaviors, tools, or workflows that Claude can
          invoke when solving tasks - making interactions more consistent, controllable, and scalable.
        </p>
      </section>

      <section className="section">
        <h2>Anthropic Skills vs MCP</h2>
        <p>
          Both Anthropic skills and MCP aim to make AI systems more structured and reliable, but they serve different
          purposes. Anthropic skills focus on defining reusable capabilities at the interaction and workflow level,
          while MCP is more concerned with protocol-level coordination and message handling.
        </p>
        <p>
          In practice, Claude skills are easier to adopt for application-level development, while MCP is better suited
          for infrastructure-level systems.
        </p>
      </section>

      <section className="section">
        <h2>How to Use Claude Skills</h2>
        <p>Using Claude skills typically involves three steps:</p>
        <ol className="step-list">
          <li>Defining the skill's purpose and inputs</li>
          <li>Connecting the skill to Claude's reasoning or tool usage</li>
          <li>Integrating the skill into an application or workflow</li>
        </ol>
        <p>
          Most developers start by experimenting with existing skills before creating their own. A curated skills
          library can significantly reduce trial and error.
        </p>
      </section>

      <section className="section">
        <h2>Explore the Anthropic Skills Library</h2>
        <p>
          To help developers get started faster, we maintain a growing Anthropic Skills library that includes real-world
          examples, experimental tools, and community contributions. Each skill is categorized by use case, complexity,
          and integration pattern.
        </p>
        <div className="cta-row">
          <a className="btn btn--primary" href="/en">Back to Homepage</a>
          <a className="btn btn--ghost" href="/en/skills">Browse All Skills</a>
        </div>
      </section>

      <section className="section cta-section">
        <h2>Start with the Anthropic Skills Directory</h2>
        <p>
          Understanding Claude skills early can save significant development time. Browse the directory to discover
          examples, compare approaches, and start building.
        </p>
        <a className="btn btn--primary" href="/en">Explore the Directory</a>
      </section>
    </>
  );
}
