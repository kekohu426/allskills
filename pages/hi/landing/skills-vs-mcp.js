import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const COMPARISON = [
  {
    title: "Skills",
    items: [
      "उद्देश्य: व्यवहार और वर्कफ़्लो परिभाषित करना",
      "फ़ॉर्मेट: SKILL.md + संसाधन",
      "उपयुक्त: पुन: उपयोग योग्य टेम्पलेट्स और संरचित आउटपुट"
    ]
  },
  {
    title: "MCP",
    items: [
      "उद्देश्य: बाहरी टूल्स और सर्विसेज से जुड़ना",
      "फ़ॉर्मेट: प्रोटोकॉल + सर्वर इंटरफ़ेस",
      "उपयुक्त: टूल कॉलिंग और सिस्टम इंटीग्रेशन"
    ]
  }
];

const FAQ = [
  {
    q: "Skills vs MCP: मुख्य अंतर क्या है?",
    a: "Skills यह तय करती हैं कि काम कैसे होगा; MCP टूल्स और सर्विसेज से जोड़ता है।"
  },
  {
    q: "Skills कब उपयोग करें?",
    a: "जब वर्कफ़्लो दोहराने योग्य हों और आउटपुट स्थिर चाहिए।"
  },
  {
    q: "MCP कब उपयोग करें?",
    a: "जब बाहरी टूल्स या रियल-टाइम डेटा चाहिए।"
  }
];

export default function SkillsVsMcpLandingHi() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Skills vs MCP",
      description: "Skills vs MCP: अंतर समझें और सही विकल्प चुनें।",
      url: `${site.domain}/hi/landing/skills-vs-mcp`,
      inLanguage: "hi",
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
        description="Skills vs MCP: अंतर समझें और सही विकल्प चुनें।"
        path="/hi/landing/skills-vs-mcp"
        keywords="skills vs mcp"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Skills vs MCP</p>
          <h1>Skills vs MCP</h1>
          <p>कब Skills और कब MCP — इसका आसान गाइड।</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/hi/skills">Skills देखें</a>
            <a className="btn btn--secondary" href="/hi/tools/skill-generator">Skill बनाएं</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>तुलना</h2>
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
        <h2>Skills से शुरुआत करें</h2>
        <p>यदि आपको दोहराने योग्य वर्कफ़्लो चाहिए, तो Skills से शुरू करें।</p>
        <a className="btn btn--primary" href="/hi/skills">Skills डायरेक्टरी खोलें</a>
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
