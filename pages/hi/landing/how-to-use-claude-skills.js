import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const STEPS = [
  {
    step: "01",
    title: "Skill चुनें",
    desc: "अपनी ज़रूरत के अनुसार Claude Skill चुनें।"
  },
  {
    step: "02",
    title: "SKILL.md कॉपी करें",
    desc: "Skill फ़ाइल को अपने वर्कस्पेस में कॉपी करें।"
  },
  {
    step: "03",
    title: "संसाधन लोड करें",
    desc: "यदि Skill को रेफ़रेंस या स्क्रिप्ट चाहिए तो उन्हें लोड करें।"
  },
  {
    step: "04",
    title: "उपयोग और सुधार",
    desc: "Skill का उपयोग करें और अपने वर्कफ़्लो के अनुसार ट्यून करें।"
  }
];

const FAQ = [
  {
    q: "Claude Skills कैसे उपयोग करें?",
    a: "Skill चुनें, SKILL.md कॉपी करें और ज़रूरी संसाधन लोड करें।"
  },
  {
    q: "क्या मुझे अतिरिक्त टूल्स चाहिए?",
    a: "अधिकतर मामलों में नहीं, जब तक कि रिपॉज़िटरी में निर्भरता न दी गई हो।"
  },
  {
    q: "क्या मैं Skill को कस्टमाइज़ कर सकता हूँ?",
    a: "हाँ, आप विवरण और उदाहरण अपने उपयोग के अनुसार बदल सकते हैं।"
  }
];

export default function HowToUseClaudeSkillsLandingHi() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Claude Skills उपयोग कैसे करें",
      description: "Claude Skills उपयोग करने की आसान स्टेप-बाय-स्टेप गाइड।",
      url: `${site.domain}/hi/landing/how-to-use-claude-skills`,
      inLanguage: "hi",
      keywords: ["claude skills उपयोग"]
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
        title="Claude Skills उपयोग कैसे करें"
        description="Claude Skills उपयोग करने की आसान स्टेप-बाय-स्टेप गाइड।"
        path="/hi/landing/how-to-use-claude-skills"
        keywords="claude skills उपयोग"
        jsonLd={jsonLd}
        ogType="website"
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">Claude Skills उपयोग करें</p>
          <h1>Claude Skills उपयोग कैसे करें</h1>
          <p>इन चरणों के साथ जल्दी शुरुआत करें।</p>
          <div className="hero-cta">
            <a className="btn btn--primary" href="/hi/skills">Skills देखें</a>
            <a className="btn btn--secondary" href="/hi/tools/skill-generator">Skill बनाएं</a>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>चरण</h2>
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
        <h2>अब Claude Skills शुरू करें</h2>
        <p>एक Skill चुनें और उसे लागू करें।</p>
        <a className="btn btn--primary" href="/hi/skills">Skills डायरेक्टरी खोलें</a>
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
