import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

export default function ClaudeSkillsExplainedEn() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Claude Skills Explained",
    description:
      "Learn what Claude skills are, how Anthropic skills work, how to use them in practice, and how they compare to MCP in real-world applications.",
    url: `${site.domain}/en/landing/claude-skills-explained`,
    inLanguage: "en"
  };

  return (
    <>
      <SeoHead
        title="Claude Skills Explained: How They Work, How to Use Them, and MCP Comparison"
        description="Learn what Claude skills are, how Anthropic skills work, how to use them in practice, and how they compare to MCP in real-world applications."
        path="/en/landing/claude-skills-explained"
        keywords="Claude skills, Anthropic skills, skills vs MCP, how to use Claude skills"
        jsonLd={jsonLd}
        ogType="website"
      />

      <div className="content-landing">
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
            Claude skills are a core part of the Anthropic ecosystem, designed to make interactions with Claude more structured,
            reusable, and reliable.
          </p>
          <p className="lead">
            However, many developers are confused by terms such as "Anthropic skills", "Claude skills", and how they differ
            from concepts like MCP. Official documentation is often fragmented, while community examples are scattered across
            repositories, demos, and discussions.
          </p>
          <p className="lead">
            This page explains what Claude skills are, how they work, when to use them, and how they compare to MCP - using
            practical explanations instead of marketing language.
          </p>
        </section>

        <section className="section">
          <h2>What Are Claude Skills?</h2>
          <p>
            Claude skills are structured capabilities that extend how Claude can be used in applications and workflows.
          </p>
          <p>
            A skill typically represents a reusable behavior, tool, or workflow pattern that Claude can invoke when solving tasks.
            Instead of relying on ad-hoc prompts, skills allow developers to define clearer boundaries, inputs, and expected behaviors.
          </p>
          <p>
            In practice, Claude skills help make AI systems more predictable, easier to maintain, and easier to scale across different use cases.
          </p>
        </section>

        <section className="section">
          <h2>What Are Anthropic Skills?</h2>
          <p>
            "Anthropic skills" usually refers to Claude skills built or described within the Anthropic ecosystem.
          </p>
          <p>
            These skills may include official examples, recommended patterns, or community-built implementations that align with
            Anthropic's approach to safety, reasoning, and structured interactions.
          </p>
          <p>
            Rather than being a single standardized format, Anthropic skills represent a growing set of patterns and practices for
            extending Claude in real-world applications.
          </p>
        </section>

        <section className="section">
          <h2>Anthropic Skills vs MCP</h2>
          <p>
            Anthropic skills and MCP address different layers of AI system design.
          </p>
          <p>
            Anthropic skills focus on defining reusable capabilities at the interaction and workflow level. They are primarily
            concerned with what Claude can do, how it reasons about tasks, and how specific behaviors can be reused across applications.
          </p>
          <p>
            MCP, on the other hand, focuses more on protocol-level coordination and message handling between components in an AI system.
            It is typically used in infrastructure-heavy or multi-agent environments.
          </p>
          <p>
            For most application developers, Claude skills are easier to adopt and provide faster value, while MCP is better suited for
            complex system-level orchestration.
          </p>
        </section>

        <section className="section">
          <h2>How to Use Claude Skills</h2>
          <p>Using Claude skills generally involves three steps:</p>
          <ol className="step-list">
            <li>Defining the purpose of the skill and the problem it solves</li>
            <li>Specifying inputs, outputs, and constraints for the skill</li>
            <li>Integrating the skill into an application, workflow, or tool</li>
          </ol>
          <p>
            Many developers start by exploring existing skills before creating their own. Reviewing real-world examples helps
            clarify how skills are structured and how they interact with Claude's reasoning process.
          </p>
        </section>

        <section className="section">
          <h2>Common Use Cases for Claude Skills</h2>
          <p>Claude skills are commonly used in scenarios such as:</p>
          <ul className="step-list">
            <li>Structured data extraction and transformation</li>
            <li>Multi-step reasoning workflows</li>
            <li>Tool usage and function invocation</li>
            <li>Domain-specific assistants with consistent behavior</li>
            <li>Reusable automation patterns across applications</li>
          </ul>
          <p>
            By encapsulating these behaviors into skills, teams can reduce prompt complexity and improve reliability.
          </p>
        </section>

        <section className="section">
          <h2>Explore the Anthropic Skills Library</h2>
          <p>
            To help developers get started faster, we maintain a curated Anthropic Skills library that includes real-world examples,
            experimental tools, and community contributions.
          </p>
          <p>
            Each skill is organized by use case, complexity, and integration pattern, making it easier to find relevant examples and
            learn from existing implementations.
          </p>
          <div className="cta-row">
            <a className="btn btn--primary" href="/en/skills">Browse the Anthropic Skills Directory</a>
            <a className="btn btn--ghost" href="/en">Back to Homepage</a>
          </div>
        </section>

        <section className="section cta-section">
          <h2>Start with the Anthropic Skills Directory</h2>
          <p>
            Understanding Claude skills early can save significant development time and reduce trial and error.
          </p>
          <p>
            If you are exploring the Anthropic ecosystem, the Anthropic Skills Directory provides a practical starting point to
            discover examples, compare approaches, and begin building structured AI workflows.
          </p>
          <a className="btn btn--primary" href="/en/skills">Browse the Anthropic Skills Directory</a>
        </section>
      </div>
    </>
  );
}
