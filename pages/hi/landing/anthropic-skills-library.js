import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const HIGHLIGHTS = [
  {
    title: "क्यूरेटेड लाइब्रेरी",
    desc: "एक केंद्रीय Anthropic Skills लाइब्रेरी जिसमें आधिकारिक और कम्युनिटी स्रोत शामिल हैं।"
  },
  {
    title: "आसान खोज",
    desc: "श्रेणी, टैग और कीवर्ड से खोजें।"
  },
  {
    title: "पुन: उपयोग योग्य संरचना",
    desc: "हर Skill में तेज़ उपयोग के लिए संरचित SKILL.md शामिल है।"
  }
];

const FAQ = [
  {
    q: "Anthropic Skills लाइब्रेरी क्या है?",
    a: "Claude Skills खोजने और पुन: उपयोग करने के लिए एक केंद्रीय लाइब्रेरी।"
  },
  {
    q: "लाइब्रेरी, सूची से बेहतर क्यों?",
    a: "यह संरचना और स्रोतों पर ध्यान देती है ताकि Skills भरोसेमंद और दोबारा उपयोग योग्य हों।"
  },
  {
    q: "क्या मैं Skills सीधे उपयोग कर सकता हूँ?",
    a: "हाँ — अधिकतर Skills को सीधे कॉपी करके उपयोग किया जा सकता है।"
  }
];

export default function AnthropicSkillsLibraryLandingHi() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Anthropic Skills लाइब्रेरी",
      description: "Claude Skills खोजने और पुन: उपयोग के लिए Anthropic Skills लाइब्रेरी।",
      url: `${site.domain}/hi/landing/anthropic-skills-library`,
      inLanguage: "hi",
      keywords: ["anthropic skills library"]
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
        title="Anthropic Skills लाइब्रेरी"
        description="Claude Skills खोजने और पुन: उपयोग के लिए Anthropic Skills लाइब्रेरी।"
        path="/hi/landing/anthropic-skills-library"
        keywords="anthropic skills library"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Anthropic Skills लाइब्रेरी</p>
          <h1>Anthropic Skills लाइब्रेरी</h1>
          <p>Claude Skills खोजने और उपयोग करने के लिए एक केंद्रीय लाइब्रेरी।</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/hi/skills">लाइब्रेरी देखें</a>
            <a className="btn btn--secondary" href="/hi/tools/skill-generator">Skill बनाएं</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>यह Skills लाइब्रेरी क्यों?</h2>
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
        <h2>Anthropic Skills लाइब्रेरी से शुरुआत करें</h2>
        <p>एक Skill चुनें और तुरंत उपयोग करें।</p>
        <a className="btn btn--primary" href="/hi/skills">लाइब्रेरी खोलें</a>
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
