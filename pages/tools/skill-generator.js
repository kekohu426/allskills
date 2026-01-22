import { useState } from "react";
import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

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

export default function SkillGenerator() {
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
      setError(`每日免费额度已用完（${DAILY_LIMIT}次）。请输入您的 DeepSeek API Key 继续使用。`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: input.trim(), apiKey: apiKey || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "生成失败");
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
    name: "Claude Code Skill 生成器",
    description: "免费在线生成 Claude Code SKILL.md 文件，支持质量评分和一键下载。",
    url: `${site.domain}/tools/skill-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
  };

  return (
    <>
      <SeoHead
        title="Skill 生成器 - 免费生成 Claude Code Skills"
        description="免费在线生成 Claude Code SKILL.md 文件。描述你的需求，AI 自动生成完整技能文件，支持质量评分和一键下载。"
        path="/tools/skill-generator"
        keywords="Skill生成器, Claude Code, SKILL.md, AI技能生成, 提示词生成器"
        jsonLd={jsonLd}
      />

      <section className="page-hero">
        <div>
          <p className="eyebrow">免费工具</p>
          <h1>Skill 生成器</h1>
          <p>描述你想要的技能，AI 自动生成完整的 SKILL.md 文件。</p>
        </div>
      </section>

      <section className="section">
        <div className="generator-card">
          <div className="generator-card__header">
            <h2>描述你的 Skill</h2>
            <p>告诉我们这个 skill 应该帮助 Claude 做什么？尽量具体描述专业领域和工作流程。</p>
          </div>

          <textarea
            className="generator-input"
            placeholder="例如：一个帮助开发者编写 API 文档的 skill，包括端点描述、请求/响应示例、错误码和认证说明..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
          />

          {showApiKey && (
            <div className="api-key-section">
              <label>DeepSeek API Key（可选，无限使用）</label>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <a href="https://platform.deepseek.com/" target="_blank" rel="noopener noreferrer">
                获取 API Key
              </a>
            </div>
          )}

          {error && <div className="generator-error">{error}</div>}

          <div className="generator-actions">
            <span className="generator-hint">
              {!apiKey && `今日剩余：${Math.max(0, DAILY_LIMIT - getUsageToday().count)} / ${DAILY_LIMIT} 次`}
            </span>
            <button className="btn btn--primary" onClick={handleGenerate} disabled={loading || !input.trim()}>
              {loading ? "生成中..." : "生成 Skill"}
            </button>
          </div>
        </div>

        {result && (
          <div className="generator-result">
            <div className="generator-result__header">
              <h3>生成结果</h3>
              {score !== null && (
                <div className="generator-score">
                  质量评分：<strong>{score}</strong>/100
                </div>
              )}
            </div>
            <pre className="generator-output">{result}</pre>
            <div className="generator-result__actions">
              <button className="btn" onClick={handleCopy}>复制</button>
              <button className="btn btn--ghost" onClick={handleDownload}>下载 SKILL.md</button>
            </div>
          </div>
        )}

        <div className="generator-how">
          <h2>使用方法</h2>
          <div className="generator-steps">
            <div className="generator-step">
              <span className="generator-step__num">01</span>
              <h4>描述</h4>
              <p>用自然语言描述你想要的 skill 功能。</p>
            </div>
            <div className="generator-step">
              <span className="generator-step__num">02</span>
              <h4>生成</h4>
              <p>AI 自动生成完整的 SKILL.md 文件。</p>
            </div>
            <div className="generator-step">
              <span className="generator-step__num">03</span>
              <h4>使用</h4>
              <p>下载文件，放入 .claude/skills/ 目录即可。</p>
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
