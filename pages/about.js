import SeoHead from "../components/SeoHead";
import { useRouter } from "next/router";
import { getLocaleFromPath } from "../lib/paths";

export default function About({ forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");

  return (
    <>
      <SeoHead
        title={locale === "zh" ? "关于 AllSkills.cn" : "About AllSkills.cn"}
        description={
          locale === "zh"
            ? "了解 AllSkills.cn 的数据来源、整理流程与版权声明。"
            : "Learn about data sources, curation workflow, and licensing."
        }
        path={locale === "zh" ? "/about" : "/en/about"}
      />
      <section className="page-hero">
        <div>
          <h1>{locale === "zh" ? "关于 AllSkills.cn" : "About AllSkills.cn"}</h1>
          <p>
            {locale === "zh"
              ? "专注 Anthropic Skills 的中文导航站。"
              : "A curated directory for Anthropic Skills."}
          </p>
        </div>
      </section>
      <section className="section about-section">
        {locale === "zh" ? (
          <div className="about-content">
            <p>
              <strong>AllSkills.cn</strong> 是一个专注于 Anthropic Skills 的中文导航站，
              致力于为中文用户提供便捷的 AI Skills 浏览和使用体验。
            </p>

            <h2>📦 我们做了什么？</h2>
            <ul>
              <li>从 Anthropic 官方 GitHub 仓库同步最新 Skills</li>
              <li>提供中文翻译与使用说明</li>
              <li>按分类整理，支持搜索与筛选</li>
              <li>优化移动端体验，随时随地访问</li>
              <li>编写教程和案例，降低使用门槛</li>
            </ul>

            <h2>⚖️ 版权与协议</h2>
            <p>
              所有 Skills 的原始内容版权归 <strong>Anthropic</strong> 所有，
              遵循各 Skill 标注的开源协议（Apache 2.0 或 Source-available）。
            </p>
            <p>
              我们严格遵守开源协议条款，不修改原始内容，仅提供展示与翻译服务。
              如您是版权方且对本站内容有疑问，请随时联系
              <a href="mailto:contact@allskills.cn"> contact@allskills.cn</a>。
            </p>

            <h2>🔗 有用的链接</h2>
            <ul>
              <li>
                <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener">
                  Anthropic Skills 官方仓库
                </a>
              </li>
              <li>
                <a href="https://www.anthropic.com" target="_blank" rel="noopener">
                  Anthropic 官网
                </a>
              </li>
              <li>
                <a href="https://claude.ai" target="_blank" rel="noopener">
                  Claude AI
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="about-content">
            <p>
              <strong>AllSkills.cn</strong> curates Anthropic Skills for a Chinese-speaking audience,
              with structured categories and usage guidance.
            </p>
            <h2>Data Sources</h2>
            <p>
              The original skills are sourced from the official Anthropic Skills repository and
              follow their declared licenses.
            </p>
            <h2>Contact</h2>
            <p>
              For any copyright questions, reach us at
              <a href="mailto:contact@allskills.cn"> contact@allskills.cn</a>.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
