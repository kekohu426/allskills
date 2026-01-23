import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

export default function ClaudeSkillsExplainedDe() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Claude Skills Explained",
    description:
      "Erfahre, was Claude Skills sind, wie Anthropic Skills funktionieren, wie man sie praktisch nutzt und wie sie sich von MCP unterscheiden.",
    url: `${site.domain}/de/landing/claude-skills-explained`,
    inLanguage: "de"
  };

  return (
    <>
      <SeoHead
        title="Claude Skills Explained: Funktionsweise, Nutzung und MCP-Vergleich"
        description="Erfahre, was Claude Skills sind, wie Anthropic Skills funktionieren, wie man sie praktisch nutzt und wie sie sich in realen Anwendungen von MCP unterscheiden."
        path="/de/landing/claude-skills-explained"
        keywords="Claude skills, Anthropic skills, Skills vs MCP, Claude Skills nutzen"
        jsonLd={jsonLd}
        ogType="website"
      />

      <div className="content-landing">
        <section className="page-hero">
          <div>
            <p className="eyebrow">Claude Skills Explained</p>
            <h1>Claude Skills Explained</h1>
            <p>
              Eine klare, praktische Erklärung von Claude Skills, Anthropic Skills und ihrem Vergleich mit MCP.
            </p>
          </div>
        </section>

        <section className="section">
          <p className="lead">
            Claude Skills sind ein zentraler Teil des Anthropic-Ökosystems und machen Interaktionen mit Claude strukturierter,
            wiederverwendbar und zuverlässiger.
          </p>
          <p className="lead">
            Viele Entwickler sind jedoch verwirrt durch Begriffe wie "Anthropic skills", "Claude skills" und die Abgrenzung zu MCP.
            Offizielle Dokumentation ist oft fragmentiert, während Community-Beispiele über Repositories, Demos und Diskussionen verteilt sind.
          </p>
          <p className="lead">
            Diese Seite erklärt, was Claude Skills sind, wie sie funktionieren, wann man sie einsetzt und wie sie sich von MCP unterscheiden -
            mit praktischen Erklärungen statt Marketing-Sprache.
          </p>
        </section>

        <section className="section">
          <h2>What Are Claude Skills?</h2>
          <p>
            Claude Skills sind strukturierte Fähigkeiten, die festlegen, wie Claude in Anwendungen und Workflows eingesetzt wird.
          </p>
          <p>
            Ein Skill steht typischerweise für ein wiederverwendbares Verhalten, Tool oder Workflow-Muster, das Claude beim Lösen von Aufgaben
            aufrufen kann. Statt ad-hoc Prompts ermöglichen Skills klarere Grenzen, Eingaben und erwartete Ergebnisse.
          </p>
          <p>
            In der Praxis machen Claude Skills AI-Systeme berechenbarer, leichter wartbar und einfacher skalierbar.
          </p>
        </section>

        <section className="section">
          <h2>What Are Anthropic Skills?</h2>
          <p>
            "Anthropic skills" bezieht sich meist auf Claude Skills, die im Anthropic-Ökosystem erstellt oder beschrieben werden.
          </p>
          <p>
            Dazu gehören offizielle Beispiele, empfohlene Muster oder Community-Implementierungen, die mit Anthropics Ansatz zu Sicherheit,
            Reasoning und strukturierten Interaktionen übereinstimmen.
          </p>
          <p>
            Es handelt sich nicht um ein einzelnes Standardformat, sondern um ein wachsendes Set an Patterns und Praktiken für reale Anwendungen.
          </p>
        </section>

        <section className="section">
          <h2>Anthropic Skills vs MCP</h2>
          <p>Anthropic Skills und MCP adressieren unterschiedliche Ebenen im AI-Systemdesign.</p>
          <p>
            Anthropic Skills definieren wiederverwendbare Fähigkeiten auf Interaktions- und Workflow-Ebene. Im Fokus steht, was Claude leisten soll,
            wie es über Aufgaben nachdenkt und wie Verhaltensmuster in Apps wiederverwendet werden.
          </p>
          <p>
            MCP konzentriert sich stärker auf Protokoll-Koordination und Message-Handling zwischen Komponenten in komplexen AI-Systemen.
            Es wird typischerweise in Infrastruktur-lastigen oder Multi-Agent-Umgebungen eingesetzt.
          </p>
          <p>
            Für die meisten Application-Developer sind Claude Skills schneller nutzbar und liefern früheren Mehrwert, während MCP eher für
            System-Orchestrierung auf höherer Komplexität geeignet ist.
          </p>
        </section>

        <section className="section">
          <h2>How to Use Claude Skills</h2>
          <p>Die Nutzung von Claude Skills erfolgt typischerweise in drei Schritten:</p>
          <ol className="step-list">
            <li>Zweck des Skills und das zu lösende Problem definieren</li>
            <li>Eingaben, Ausgaben und Constraints festlegen</li>
            <li>Den Skill in eine Anwendung, einen Workflow oder ein Tool integrieren</li>
          </ol>
          <p>
            Viele Entwickler starten mit bestehenden Skills und bauen später eigene. Reale Beispiele helfen zu verstehen, wie Skills strukturiert sind
            und wie sie Claudes Reasoning beeinflussen.
          </p>
        </section>

        <section className="section">
          <h2>Common Use Cases for Claude Skills</h2>
          <p>Claude Skills werden häufig in folgenden Szenarien eingesetzt:</p>
          <ul className="step-list">
            <li>Strukturierte Datenextraktion und Transformation</li>
            <li>Mehrstufige Reasoning-Workflows</li>
            <li>Tool-Nutzung und Funktionsaufrufe</li>
            <li>Domänenspezifische Assistenten mit konsistentem Verhalten</li>
            <li>Wiederverwendbare Automationsmuster in Anwendungen</li>
          </ul>
          <p>
            Durch die Kapselung dieser Verhaltensweisen in Skills sinkt die Prompt-Komplexität und die Zuverlässigkeit steigt.
          </p>
        </section>

        <section className="section">
          <h2>Explore the Anthropic Skills Library</h2>
          <p>
            Um den Einstieg zu erleichtern, pflegen wir eine kuratierte Anthropic Skills Library mit realen Beispielen, experimentellen Tools
            und Community-Beiträgen.
          </p>
          <p>
            Jeder Skill ist nach Use Case, Komplexität und Integrationsmuster organisiert - so findest du schneller passende Beispiele.
          </p>
          <div className="cta-row">
            <a className="btn btn--primary" href="/de/skills">Anthropic Skills Directory durchsuchen</a>
            <a className="btn btn--ghost" href="/de">Zur Startseite</a>
          </div>
        </section>

        <section className="section cta-section">
          <h2>Starte mit dem Anthropic Skills Directory</h2>
          <p>
            Ein frühes Verständnis von Claude Skills spart Entwicklungszeit und reduziert Trial-and-Error.
          </p>
          <p>
            Wenn du das Anthropic-Ökosystem erkundest, bietet das Anthropic Skills Directory einen praktischen Einstieg, um Beispiele zu finden,
            Ansätze zu vergleichen und strukturierte AI-Workflows zu bauen.
          </p>
          <a className="btn btn--primary" href="/de/skills">Anthropic Skills Directory durchsuchen</a>
        </section>
      </div>
    </>
  );
}
