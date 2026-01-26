import Link from "next/link";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";
import { withLocale } from "../../lib/paths";
import trendingData from "../../data/trending-skills.json";
import site from "../../data/site.json";

const content = {
  title: "Trending Claude Skills | Beliebteste KI-Skills heute - AllSkills",
  description: "Entdecke die heißesten Claude AI Skills von heute. Echtzeit-Trends mit AI SDK, Python-Optimierung, RAG-Implementierung, API-Design und mehr.",
  h1: "🔥 Trending Skills",
  subtitle: "Verfolge die beliebtesten Claude AI Skills in Echtzeit",
  updated: "Zuletzt aktualisiert",
  rank: "Rang",
  skill: "Skill Name",
  views: "Beliebtheit",
  change: "Änderung",
  source: "Quelle",
  copyTip: "Klicke auf den Skill-Namen für Details",
  whyTrending: "Warum sind diese Skills im Trend?",
  whyContent: "Diese Skills werden basierend auf Echtzeit-Community-Daten gerankt und zeigen, was Entwickler gerade am meisten interessiert.",
  categories: [
    { icon: "🤖", label: "KI-Entwicklung", desc: "AI SDK, RAG, LLM" },
    { icon: "⚡", label: "Performance", desc: "Python, API-Muster" },
    { icon: "🎬", label: "Multimedia", desc: "Untertitel, Übersetzung" },
    { icon: "📧", label: "Best Practices", desc: "E-Mail, Komponenten" }
  ]
};

export default function DeTrendingPage({ skills, date }) {
  const locale = "de";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.h1,
      description: content.description,
      url: `${site.domain}/de/trending`,
      dateModified: date
    }
  ];

  return (
    <>
      <SeoHead
        title={content.title}
        description={content.description}
        path="/de/trending"
        keywords="trending skills, beliebte skills, KI skills ranking"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Trending Skills</p>
          <h1>{content.h1}</h1>
          <p>{content.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="trending-meta">
          <span className="trending-date">📅 {content.updated}: {date}</span>
          <span className="trending-tip">💡 {content.copyTip}</span>
        </div>

        <div className="trending-table-wrapper">
          <table className="trending-table">
            <thead>
              <tr>
                <th>{content.rank}</th>
                <th>{content.skill}</th>
                <th>{content.views}</th>
                <th>{content.change}</th>
                <th>{content.source}</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((item) => (
                <tr key={item.slug} className="trending-row">
                  <td className="trending-rank">
                    {item.rank <= 3 ? (
                      <span className="rank-badge">{item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : "🥉"}</span>
                    ) : (
                      <span className="rank-number">{item.rank}</span>
                    )}
                  </td>
                  <td className="trending-name">
                    <Link href={withLocale(`/skills/${item.slug}`, locale)}>{item.skill?.name || item.slug}</Link>
                    {item.skill?.description && <p className="trending-desc">{item.skill.description.slice(0, 80)}...</p>}
                  </td>
                  <td className="trending-views"><span className="views-count">{item.oneHourViews}</span></td>
                  <td className="trending-change"><span className={`change-badge ${item.change > 0 ? "up" : ""}`}>{item.change > 0 ? `↑${item.change}` : item.change}</span></td>
                  <td className="trending-source"><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.sourceLabel}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section trending-why">
        <h2>{content.whyTrending}</h2>
        <p>{content.whyContent}</p>
        <div className="trending-categories">
          {content.categories.map((cat, idx) => (
            <div key={idx} className="category-card">
              <span className="category-icon">{cat.icon}</span>
              <strong>{cat.label}</strong>
              <span>{cat.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .trending-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding: 1rem; background: var(--color-surface); border-radius: 8px; flex-wrap: wrap; gap: 0.5rem; }
        .trending-date { font-weight: 500; }
        .trending-tip { color: var(--color-text-muted); font-size: 0.9rem; }
        .trending-table-wrapper { overflow-x: auto; }
        .trending-table { width: 100%; border-collapse: collapse; }
        .trending-table th, .trending-table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--color-border); }
        .trending-table th { background: var(--color-surface); font-weight: 600; }
        .trending-row:hover { background: var(--color-surface); }
        .rank-badge { font-size: 1.5rem; }
        .rank-number { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: var(--color-surface); border-radius: 50%; font-weight: 600; }
        .trending-name a { font-weight: 600; color: var(--color-primary); }
        .trending-name a:hover { text-decoration: underline; }
        .trending-desc { margin: 0.25rem 0 0; font-size: 0.85rem; color: var(--color-text-muted); }
        .views-count { font-weight: 600; }
        .change-badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85rem; font-weight: 500; }
        .change-badge.up { background: #d4edda; color: #155724; }
        .trending-why { margin-top: 3rem; padding: 2rem; background: var(--color-surface); border-radius: 12px; }
        .trending-why h2 { margin-bottom: 1rem; }
        .trending-why p { color: var(--color-text-muted); margin-bottom: 1.5rem; }
        .trending-categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
        .category-card { display: flex; flex-direction: column; gap: 0.25rem; padding: 1rem; background: var(--color-bg); border-radius: 8px; border: 1px solid var(--color-border); }
        .category-icon { font-size: 1.5rem; }
        @media (max-width: 768px) { .trending-table th:nth-child(5), .trending-table td:nth-child(5) { display: none; } }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const skills = trendingData.skills.map((item) => {
    const skill = getSkillBySlug(item.slug);
    return { ...item, skill: skill ? { name: skill.name, description: skill.description } : null };
  });
  return { props: { skills, date: trendingData.date } };
}
