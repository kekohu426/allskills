import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "../components/SeoHead";
import { getSkillBySlug } from "../lib/skills";
import { getLocaleFromPath, withLocale } from "../lib/paths";
import trendingData from "../data/trending-skills.json";
import site from "../data/site.json";

const SEO_CONTENT = {
  zh: {
    title: "每日热门 Claude Skills | 今日最受欢迎的 AI 技能 - AllSkills",
    description: "发现今日最热门的 Claude AI Skills。实时更新的热度榜单，涵盖 AI SDK、Python 性能优化、RAG 实现、API 设计等开发者必备技能。",
    h1: "🔥 每日热门 Skills",
    subtitle: "实时追踪最受欢迎的 Claude AI 技能，发现开发者正在使用的热门工具",
    updated: "数据更新时间",
    rank: "排名",
    skill: "技能名称",
    views: "热度",
    change: "变化",
    source: "来源",
    copyTip: "点击技能名称查看详情并复制",
    whyTrending: "为什么这些技能正在流行？",
    whyContent: "这些技能基于社区使用数据实时统计，反映了开发者当前最关注的 AI 能力。无论是构建 AI 应用、优化代码性能，还是处理多媒体内容，这里都有最实用的解决方案。",
    categories: [
      { icon: "🤖", label: "AI 开发", desc: "AI SDK、RAG、LLM 应用" },
      { icon: "⚡", label: "性能优化", desc: "Python、API 设计模式" },
      { icon: "🎬", label: "多媒体", desc: "字幕处理、翻译、转录" },
      { icon: "📧", label: "最佳实践", desc: "邮件、组件设计" }
    ]
  },
  en: {
    title: "Trending Claude Skills | Most Popular AI Skills Today - AllSkills",
    description: "Discover today's hottest Claude AI Skills. Real-time trending charts covering AI SDK, Python optimization, RAG implementation, API design and more developer essentials.",
    h1: "🔥 Trending Skills",
    subtitle: "Track the most popular Claude AI skills in real-time and discover what developers are using",
    updated: "Last updated",
    rank: "Rank",
    skill: "Skill Name",
    views: "Popularity",
    change: "Change",
    source: "Source",
    copyTip: "Click skill name to view details and copy",
    whyTrending: "Why are these skills trending?",
    whyContent: "These skills are ranked based on real-time community usage data, reflecting what developers are most interested in right now. Whether you're building AI applications, optimizing code performance, or processing multimedia content, you'll find the most practical solutions here.",
    categories: [
      { icon: "🤖", label: "AI Development", desc: "AI SDK, RAG, LLM Apps" },
      { icon: "⚡", label: "Performance", desc: "Python, API Patterns" },
      { icon: "🎬", label: "Multimedia", desc: "Captions, Translation" },
      { icon: "📧", label: "Best Practices", desc: "Email, Components" }
    ]
  },
  de: {
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
  },
  hi: {
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
  }
};

export default function TrendingPage({ skills, date, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const content = SEO_CONTENT[locale] || SEO_CONTENT.en;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: content.h1,
      description: content.description,
      url: `${site.domain}/trending`,
      dateModified: date
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Trending Claude Skills",
      itemListElement: skills.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.skill?.name || item.slug,
        url: `${site.domain}/skills/${item.slug}`
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title={content.title}
        description={content.description}
        path="/trending"
        keywords="trending skills, hot skills, popular claude skills, AI skills ranking, 热门技能, 每日精选"
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
          <span className="trending-date">
            📅 {content.updated}: {date}
          </span>
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
                      <span className={`rank-badge rank-${item.rank}`}>
                        {item.rank === 1 ? "🥇" : item.rank === 2 ? "🥈" : "🥉"}
                      </span>
                    ) : (
                      <span className="rank-number">{item.rank}</span>
                    )}
                  </td>
                  <td className="trending-name">
                    <Link href={withLocale(`/skills/${item.slug}`, locale)}>
                      {item.skill?.name || item.slug}
                    </Link>
                    {item.skill?.description && (
                      <p className="trending-desc">
                        {item.skill.description.slice(0, 80)}...
                      </p>
                    )}
                  </td>
                  <td className="trending-views">
                    <span className="views-count">{item.oneHourViews}</span>
                  </td>
                  <td className="trending-change">
                    <span className={`change-badge ${item.change > 0 ? "up" : ""}`}>
                      {item.change > 0 ? `↑${item.change}` : item.change}
                    </span>
                  </td>
                  <td className="trending-source">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-link"
                    >
                      {item.sourceLabel}
                    </a>
                  </td>
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
        .trending-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--color-surface);
          border-radius: 8px;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .trending-date {
          font-weight: 500;
        }
        .trending-tip {
          color: var(--color-text-muted);
          font-size: 0.9rem;
        }
        .trending-table-wrapper {
          overflow-x: auto;
        }
        .trending-table {
          width: 100%;
          border-collapse: collapse;
        }
        .trending-table th,
        .trending-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--color-border);
        }
        .trending-table th {
          background: var(--color-surface);
          font-weight: 600;
        }
        .trending-row:hover {
          background: var(--color-surface);
        }
        .rank-badge {
          font-size: 1.5rem;
        }
        .rank-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: var(--color-surface);
          border-radius: 50%;
          font-weight: 600;
        }
        .trending-name a {
          font-weight: 600;
          color: var(--color-primary);
        }
        .trending-name a:hover {
          text-decoration: underline;
        }
        .trending-desc {
          margin: 0.25rem 0 0;
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .views-count {
          font-weight: 600;
          color: var(--color-text);
        }
        .change-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .change-badge.up {
          background: #d4edda;
          color: #155724;
        }
        .source-link {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }
        .source-link:hover {
          color: var(--color-primary);
        }
        .trending-why {
          margin-top: 3rem;
          padding: 2rem;
          background: var(--color-surface);
          border-radius: 12px;
        }
        .trending-why h2 {
          margin-bottom: 1rem;
        }
        .trending-why p {
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }
        .trending-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .category-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1rem;
          background: var(--color-bg);
          border-radius: 8px;
          border: 1px solid var(--color-border);
        }
        .category-icon {
          font-size: 1.5rem;
        }
        @media (max-width: 768px) {
          .trending-table th:nth-child(5),
          .trending-table td:nth-child(5) {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const skills = trendingData.skills.map((item) => {
    const skill = getSkillBySlug(item.slug);
    return {
      ...item,
      skill: skill
        ? { name: skill.name, description: skill.description }
        : null
    };
  });

  return {
    props: {
      skills,
      date: trendingData.date
    }
  };
}
