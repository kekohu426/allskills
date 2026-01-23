import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "Skill auswählen",
    desc: "Wähle einen Claude Skill, der zu deiner Aufgabe passt."
  },
  {
    step: "02",
    title: "SKILL.md kopieren",
    desc: "Kopiere die Skill-Datei in deinen Arbeitsbereich."
  },
  {
    step: "03",
    title: "Ressourcen laden",
    desc: "Lade Referenzen oder Skripte, wenn der Skill sie benötigt."
  },
  {
    step: "04",
    title: "Nutzen & anpassen",
    desc: "Setze den Skill ein und passe ihn an deinen Workflow an."
  }
];

const FAQ = [
  {
    q: "Wie nutzt man Claude Skills?",
    a: "Skill auswählen, SKILL.md kopieren und erforderliche Ressourcen laden."
  },
  {
    q: "Brauche ich zusätzliche Werkzeuge?",
    a: "Meist nicht, außer ein Quell-Repo nennt Abhängigkeiten."
  },
  {
    q: "Kann ich einen Skill anpassen?",
    a: "Ja. Du kannst Beschreibungen und Beispiele auf deinen Anwendungsfall zuschneiden."
  }
];

export default function HowToUseClaudeSkillsLandingDe() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Claude Skills nutzen",
      description: "So nutzt du Claude Skills: eine einfache Schritt-für-Schritt-Anleitung.",
      url: `${site.domain}/de/landing/how-to-use-claude-skills`,
      inLanguage: "de",
      keywords: ["claude skills nutzen"]
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
        title="Claude Skills nutzen"
        description="So nutzt du Claude Skills: eine einfache Schritt-für-Schritt-Anleitung."
        path="/de/landing/how-to-use-claude-skills"
        keywords="claude skills nutzen"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude Skills nutzen</p>
          <h1>Claude Skills nutzen</h1>
          <p>Mit diesen Schritten startest du schnell mit Claude Skills.</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/de/skills">Skills durchsuchen</a>
            <a className="btn btn--secondary" href="/de/tools/skill-generator">Skill erstellen</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Schritte</h2>
        <div className="steps-grid">
          {STEPS.map((item) => (
            <div key={item.step} className="step-card">
              <span className="step-num">{item.step}</span>
              <h4>{item.title}</h4>
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
        <h2>Jetzt mit Claude Skills starten</h2>
        <p>Wähle einen Skill und setze ihn direkt ein.</p>
        <a className="btn btn--primary" href="/de/skills">Skills-Verzeichnis öffnen</a>
      </section>

      <style jsx>{`
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .step-card {
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 1.25rem;
          background: var(--bg-secondary, #0f1422);
        }
        .step-num {
          display: inline-block;
          font-family: "Rajdhani", sans-serif;
          color: var(--accent);
          letter-spacing: 1px;
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
