import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const HIGHLIGHTS = [
  {
    title: "Kuratiertes Verzeichnis",
    desc: "Eine zentrale Anthropic Skills Bibliothek mit offiziellen und Community-Quellen."
  },
  {
    title: "Einfaches Entdecken",
    desc: "Suche nach Kategorien, Tags und Keywords."
  },
  {
    title: "Wiederverwendbare Struktur",
    desc: "Jeder Skill enthält eine strukturierte SKILL.md für schnelle Wiederverwendung."
  }
];

const FAQ = [
  {
    q: "Was ist die Anthropic Skills Bibliothek?",
    a: "Eine zentrale Bibliothek zum Entdecken und Wiederverwenden von Claude Skills."
  },
  {
    q: "Warum eine Bibliothek statt einer Liste?",
    a: "Sie betont Struktur und Quellen, damit Skills vertrauenswürdiger und leichter wiederverwendbar sind."
  },
  {
    q: "Kann ich Skills direkt nutzen?",
    a: "Ja - die meisten Skills lassen sich direkt kopieren und einsetzen."
  }
];

export default function AnthropicSkillsLibraryLandingDe() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Skills Bibliothek",
      description: "Anthropic Skills Bibliothek zum Entdecken und Wiederverwenden von Claude Skills.",
      url: `${site.domain}/de/landing/anthropic-skills-library`,
      inLanguage: "de",
      keywords: ["anthropic skills library", "anthropic skills bibliothek"]
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
        title="Anthropic Skills Bibliothek"
        description="Anthropic Skills Bibliothek zum Entdecken und Wiederverwenden von Claude Skills."
        path="/de/landing/anthropic-skills-library"
        keywords="anthropic skills library, anthropic skills bibliothek"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Skills Bibliothek</p>
          <h1>Anthropic Skills Bibliothek</h1>
          <p>Eine zentrale Bibliothek, um Claude Skills zu finden und wiederzuverwenden.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/de/skills">Bibliothek durchsuchen</a>
            <a className="btn btn--secondary" href="/de/tools/skill-generator">Skill erstellen</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Warum diese Skills-Bibliothek</h2>
        <div className="features-grid">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="feature-item">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>FAQ</h2>
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
        <h2>Starte mit der Anthropic Skills Bibliothek</h2>
        <p>Finde einen Skill und nutze ihn direkt.</p>
        <a className="btn btn--primary" href="/de/skills">Bibliothek öffnen</a>
      </section>

      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .feature-item h3 {
          margin-bottom: 0.5rem;
        }
        .hero-cta {
          display: flex;
          gap: 12px;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .cta-section {
          text-align: center;
          padding: 3rem 1rem;
          background: var(--bg-secondary, #0f1422);
          border-radius: 12px;
        }
      `}</style>
    </>
  );
}
