import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const COMPARISON = [
  {
    title: "Skills",
    items: [
      "Zweck: Verhalten und Workflows definieren",
      "Format: SKILL.md + Ressourcen",
      "Geeignet für: wiederverwendbare Vorlagen und strukturierte Ergebnisse"
    ]
  },
  {
    title: "MCP",
    items: [
      "Zweck: externe Werkzeuge und Services verbinden",
      "Format: Protokoll + Server-Interface",
      "Geeignet für: Tool-Aufrufe und Systemintegrationen"
    ]
  }
];

const FAQ = [
  {
    q: "Skills vs MCP: Was ist der Kernunterschied?",
    a: "Skills definieren, wie Aufgaben erledigt werden; MCP verbindet Werkzeuge und Services."
  },
  {
    q: "Wann sollte ich Skills nutzen?",
    a: "Für wiederholbare Workflows und konsistente Ergebnisse."
  },
  {
    q: "Wann sollte ich MCP nutzen?",
    a: "Wenn du externe Werkzeuge oder Echtzeitdaten brauchst."
  }
];

export default function SkillsVsMcpLandingDe() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Skills vs MCP",
      description: "Skills vs MCP: Unterschiede verstehen und den richtigen Ansatz wählen.",
      url: `${site.domain}/de/landing/skills-vs-mcp`,
      inLanguage: "de",
      keywords: ["skills vs mcp"]
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
        title="Skills vs MCP"
        description="Skills vs MCP: Unterschiede verstehen und den richtigen Ansatz wählen."
        path="/de/landing/skills-vs-mcp"
        keywords="skills vs mcp"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skills vs MCP</p>
          <h1>Skills vs MCP</h1>
          <p>Ein kurzer Leitfaden, wann Skills oder MCP besser passen.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/de/skills">Skills durchsuchen</a>
            <a className="btn btn--secondary" href="/de/tools/skill-generator">Skill erstellen</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Vergleich</h2>
        <div className="compare-grid">
          {COMPARISON.map((block) => (
            <div key={block.title} className="compare-card">
              <h3>{block.title}</h3>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
        <h2>Mit Skills starten</h2>
        <p>Wenn du wiederholbare Workflows brauchst, starte mit Skills.</p>
        <a className="btn btn--primary" href="/de/skills">Skills-Verzeichnis öffnen</a>
      </section>

      <style jsx>{`
        .compare-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .compare-card {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
        }
        .compare-card ul {
          margin: 0.75rem 0 0;
          padding-left: 1.1rem;
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
