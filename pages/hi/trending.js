import Link from "next/link";
import SeoHead from "../../components/SeoHead";
import { getSkillBySlug } from "../../lib/skills";
import { withLocale } from "../../lib/paths";
import trendingData from "../../data/trending-skills.json";
import site from "../../data/site.json";

const content = {
  title: "ट्रेंडिंग Claude Skills | आज के सबसे लोकप्रिय AI स्किल्स - AllSkills",
  description: "आज के सबसे हॉट Claude AI Skills खोजें। AI SDK, Python ऑप्टिमाइज़ेशन, RAG इम्प्लीमेंटेशन और अधिक के साथ रियल-टाइम ट्रेंडिंग चार्ट्स।",
  h1: "🔥 ट्रेंडिंग स्किल्स",
  subtitle: "रियल-टाइम में सबसे लोकप्रिय Claude AI स्किल्स को ट्रैक करें",
  updated: "अंतिम अपडेट",
  rank: "रैंक",
  skill: "स्किल का नाम",
  views: "लोकप्रियता",
  change: "बदलाव",
  source: "स्रोत",
  copyTip: "विवरण देखने के लिए स्किल नाम पर क्लिक करें",
  whyTrending: "ये स्किल्स क्यों ट्रेंड कर रहे हैं?",
  whyContent: "ये स्किल्स रियल-टाइम कम्युनिटी उपयोग डेटा पर आधारित हैं।",
  categories: [
    { icon: "🤖", label: "AI डेवलपमेंट", desc: "AI SDK, RAG, LLM" },
    { icon: "⚡", label: "परफॉर्मेंस", desc: "Python, API पैटर्न" },
    { icon: "🎬", label: "मल्टीमीडिया", desc: "कैप्शन, अनुवाद" },
    { icon: "📧", label: "बेस्ट प्रैक्टिस", desc: "ईमेल, कंपोनेंट्स" }
  ]
};

export default function HiTrendingPage({ skills, date }) {
  const locale = "hi";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.h1,
      description: content.description,
      url: `${site.domain}/hi/trending`,
      dateModified: date
    }
  ];

  return (
    <>
      <SeoHead
        title={content.title}
        description={content.description}
        path="/hi/trending"
        keywords="trending skills, लोकप्रिय skills, AI skills ranking"
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
