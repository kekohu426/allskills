import { useState } from "react";
import SeoHead from "../../../components/SeoHead";
import site from "../../../data/site.json";

const DAILY_LIMIT = 3;
const STORAGE_KEY = "skill_gen_usage";

function getUsageToday() {
  if (typeof window === "undefined") return { count: 0, date: "" };
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { count: 0, date: "" };
  try {
    const data = JSON.parse(raw);
    const today = new Date().toDateString();
    if (data.date === today) return data;
    return { count: 0, date: today };
  } catch {
    return { count: 0, date: "" };
  }
}

function incrementUsage() {
  const today = new Date().toDateString();
  const usage = getUsageToday();
  const newUsage = { count: usage.count + 1, date: today };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsage));
  return newUsage;
}

export default function SkillGeneratorHi() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setError("");
    setResult("");
    setScore(null);

    const usage = getUsageToday();
    if (!apiKey && usage.count >= DAILY_LIMIT) {
      setShowApiKey(true);
      setError(
        `दैनिक सीमा पूरी हो गई (${DAILY_LIMIT}x). आगे बढ़ने के लिए अपना GLM API Key दें।`
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: input.trim(), apiKey: apiKey || undefined })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "बनाने में विफल।");
      setResult(data.skill);
      setScore(data.score);
      if (!apiKey) incrementUsage();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "SKILL.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Claude Code स्किल जनरेटर",
    description: "Claude Code SKILL.md बनाएँ - क्वालिटी स्कोर और वन-क्लिक डाउनलोड के साथ।",
    url: `${site.domain}/hi/tools/skill-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const remaining = Math.max(0, DAILY_LIMIT - getUsageToday().count);

  return (
    <>
      <SeoHead
        title="स्किल जनरेटर - Claude Code Skills बनाएँ"
        description="Claude Code SKILL.md ऑनलाइन बनाएँ। जरूरत बताइए, पूरी Skill फ़ाइल, क्वालिटी स्कोर और डाउनलोड पाएँ।"
        path="/hi/tools/skill-generator"
        keywords="Skill Generator, Claude Code, SKILL.md, AI skill, prompt"
        jsonLd={jsonLd}
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">मुफ़्त टूल</p>
          <h1>स्किल जनरेटर</h1>
          <p>अपने Skill का विवरण दें — AI पूरी SKILL.md फ़ाइल तैयार करेगा।</p>
        </div>
      </section>

      <section className="section">
        <div className="generator-card">
          <div className="generator-card__header">
            <h2>अपने Skill का विवरण दें</h2>
            <p>उद्देश्य, डोमेन और स्टेप्स लिखें ताकि आउटपुट प्रोडक्शन-रेडी हो।</p>
          </div>

          <textarea
            className="generator-input"
            placeholder="उदाहरण: ऐसा Skill जो API दस्तावेज़ लिखे — एंडपॉइंट्स, रिक्वेस्ट/रिस्पॉन्स, एरर कोड्स और ऑथ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />

          {showApiKey && (
            <div className="api-key-section">
              <label>GLM API Key (वैकल्पिक, अनलिमिटेड उपयोग)</label>
              <input
                type="password"
                placeholder="आपका-api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <a href="https://open.bigmodel.cn/" target="_blank" rel="noopener noreferrer">
                API Key प्राप्त करें
              </a>
            </div>
          )}

          {error && <div className="generator-error">{error}</div>}

          <div className="generator-actions">
            <span className="generator-hint">आज उपलब्ध: {remaining} / {DAILY_LIMIT}</span>
            <button className="btn btn--primary" onClick={handleGenerate} disabled={loading || !input.trim()}>
              {loading ? "तैयार हो रहा है..." : "Skill जनरेट करें"}
            </button>
          </div>
        </div>

        {result && (
          <div className="generator-result">
            <div className="generator-result__header">
              <h3>आउटपुट</h3>
              {score !== null && (
                <div className="generator-score">
                  क्वालिटी स्कोर: <strong>{score}</strong>/100
                </div>
              )}
            </div>
            <pre className="generator-output">{result}</pre>
            <div className="generator-result__actions">
              <button className="btn" onClick={handleCopy}>कॉपी</button>
              <button className="btn btn--ghost" onClick={handleDownload}>SKILL.md डाउनलोड करें</button>
            </div>
          </div>
        )}

        <div className="generator-how">
          <h2>यह कैसे काम करता है</h2>
          <div className="generator-steps">
            <div className="generator-step">
              <span className="generator-step__num">01</span>
              <h4>विवरण दें</h4>
              <p>Skill का उद्देश्य और ट्रिगर तय करें।</p>
            </div>
            <div className="generator-step">
              <span className="generator-step__num">02</span>
              <h4>जनरेट करें</h4>
              <p>AI एक पूरी SKILL.md क्वालिटी स्कोर के साथ बनाता है।</p>
            </div>
            <div className="generator-step">
              <span className="generator-step__num">03</span>
              <h4>उपयोग करें</h4>
              <p>डाउनलोड करके अपने Skills फ़ोल्डर में रखें।</p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .generator-card {
          background: linear-gradient(135deg, rgba(12, 16, 30, 0.92), rgba(10, 13, 26, 0.86));
          border: 1px solid rgba(92, 125, 180, 0.28);
          border-radius: var(--radius);
          padding: 24px;
          margin-bottom: 24px;
        }
        .generator-card__header h2 {
          margin: 0 0 8px;
          font-size: 1.2rem;
        }
        .generator-card__header p {
          margin: 0;
          color: var(--ink-soft);
          font-size: 0.9rem;
        }
        .generator-input {
          width: 100%;
          margin-top: 16px;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(92, 125, 180, 0.3);
          background: rgba(8, 12, 22, 0.85);
          color: var(--ink);
          font-size: 1rem;
          resize: vertical;
          min-height: 120px;
        }
        .generator-input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .api-key-section {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .api-key-section label {
          font-size: 0.9rem;
          color: var(--ink-soft);
        }
        .api-key-section input {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid rgba(92, 125, 180, 0.3);
          background: rgba(8, 12, 22, 0.85);
          color: var(--ink);
        }
        .api-key-section a {
          color: var(--accent);
          font-size: 0.85rem;
        }
        .generator-error {
          margin-top: 12px;
          padding: 12px;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          color: #fca5a5;
          font-size: 0.9rem;
        }
        .generator-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }
        .generator-hint {
          font-size: 0.85rem;
          color: var(--ink-soft);
        }
        .generator-result {
          background: linear-gradient(135deg, rgba(12, 16, 30, 0.92), rgba(10, 13, 26, 0.86));
          border: 1px solid rgba(17, 212, 255, 0.3);
          border-radius: var(--radius);
          padding: 24px;
          margin-bottom: 32px;
        }
        .generator-result__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .generator-result__header h3 {
          margin: 0;
        }
        .generator-score {
          background: rgba(17, 212, 255, 0.15);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
        .generator-score strong {
          color: var(--accent);
        }
        .generator-output {
          background: rgba(8, 12, 22, 0.85);
          border: 1px solid rgba(92, 125, 180, 0.25);
          border-radius: 12px;
          padding: 16px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
          font-size: 0.9rem;
          max-height: 400px;
          overflow-y: auto;
        }
        .generator-result__actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }
        .generator-how {
          margin-top: 48px;
        }
        .generator-how h2 {
          text-align: center;
          margin-bottom: 24px;
        }
        .generator-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .generator-step {
          background: linear-gradient(135deg, rgba(12, 16, 30, 0.92), rgba(10, 13, 26, 0.86));
          border: 1px solid rgba(92, 125, 180, 0.28);
          border-radius: var(--radius);
          padding: 20px;
        }
        .generator-step__num {
          font-family: "Rajdhani", sans-serif;
          font-size: 0.9rem;
          color: var(--accent);
          letter-spacing: 1px;
        }
        .generator-step h4 {
          margin: 8px 0;
        }
        .generator-step p {
          margin: 0;
          color: var(--ink-soft);
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}
