import SeoHead from "../../../components/SeoHead";
import SkillCard from "../../../components/SkillCard";
import { getAllSkills } from "../../../lib/skills";
import site from "../../../data/site.json";

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
    q: "What is a Skills Marketplace?",
    a: "A Skills Marketplace is a platform where you can discover, share, and use pre-built AI agent skills. These skills are reusable prompts and workflows that help AI assistants perform specific tasks more effectively."
  },
  {
    q: "How do I use skills from this marketplace?",
    a: "Simply browse the skills, click on one you need, and copy the prompt. Paste it into Claude, ChatGPT, or any AI assistant as a system prompt to activate the skill."
  },
  {
    q: "Are these skills free to use?",
    a: "Yes, most skills are open-source and free. Check individual skill pages for specific license information."
  },
  {
    q: "Can I submit my own skills?",
    a: "Absolutely! We welcome community contributions. You can submit skills through our GitHub repository or contact us directly."
  },
  {
    q: "What types of skills are available?",
    a: "We offer 500+ skills covering coding, writing, design, planning, testing, document processing, and many more professional workflows."
  }
];

export default function SkillsMarketplaceLanding({ featured, totalCount }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Skills Marketplace - AI Agent Skills Directory",
      description: "Discover 500+ ready-to-use AI agent skills. The largest open marketplace for Claude, ChatGPT, and AI assistant prompts and workflows.",
      url: `${site.domain}/en/landing/skills-marketplace`,
      inLanguage: "en",
      keywords: ["Skills Marketplace", "AI Skills", "Agent Skills", "Claude Skills", "ChatGPT Prompts", "AI Prompts Marketplace"]
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
      name: "Featured AI Skills",
      itemListElement: featured.map((skill, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: skill.name,
        url: `${site.domain}/en/skills/${skill.slug}`
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Skills Marketplace - 500+ AI Agent Skills | AllSkills"
        description="Discover 500+ ready-to-use AI agent skills. The largest open marketplace for Claude, ChatGPT, and AI assistant prompts and workflows. Copy and use instantly."
        path="/en/landing/skills-marketplace"
        keywords="Skills Marketplace, AI Skills, Agent Skills, Claude Skills, ChatGPT Prompts, AI Prompts Marketplace, AI Workflow"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skills Marketplace</p>
          <h1>The Open Skills Marketplace for AI Agents</h1>
          <p>Discover {totalCount}+ curated skills for Claude, ChatGPT, and AI assistants. Copy-ready prompts for real-world workflows.</p>
        </div>
      </section>

      <section className="section">
        <h2>Why Use a Skills Marketplace?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Save Time</h3>
            <p>Skip prompt engineering. Use battle-tested skills created by experts and the community.</p>
          </div>
          <div className="feature-item">
            <h3>Better Results</h3>
            <p>Structured skills produce more consistent, higher-quality outputs than ad-hoc prompts.</p>
          </div>
          <div className="feature-item">
            <h3>Open & Free</h3>
            <p>Most skills are open-source. Use them commercially, modify them, share them.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Featured Skills</h2>
        <div className="grid">
          {featured.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} lang="en" />
          ))}
        </div>
        <div className="load-more">
          <a className="btn" href="/en/skills/">
            Browse All {totalCount}+ Skills
          </a>
        </div>
      </section>

      <section className="section">
        <h2>Frequently Asked Questions</h2>
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
        <h2>Start Using Skills Today</h2>
        <p>Join thousands of users who boost their AI productivity with our skills marketplace.</p>
        <a className="btn btn-primary" href="/en/skills/">Explore Skills</a>
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
