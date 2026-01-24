import SeoHead from "../components/SeoHead";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale } from "../lib/paths";
import { t } from "../lib/i18n";

export default function About({ forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const isDe = locale === "de";
  const isHi = locale === "hi";

  return (
    <>
      <SeoHead
        title={t(locale, "aboutTitle")}
        description={t(locale, "aboutSubtitle")}
        path={withLocale("/about", locale)}
      />
      <section className="page-hero">
        <div>
          <h1>{t(locale, "aboutH1")}</h1>
          <p>{t(locale, "aboutSubtitle")}</p>
        </div>
      </section>
      <section className="section about-section">
        {locale === "zh" ? (
          <div className="about-content">
            <p>
              <strong>AllSkills.cn</strong> 是一个专注于 Anthropic Skills 的中文导航站，
              致力于为中文用户提供便捷的 AI Skills 浏览和使用体验。
            </p>

            <h2>我们做了什么？</h2>
            <ul>
              <li>从官方与社区仓库同步最新 Skills</li>
              <li>提供中文翻译与使用说明</li>
              <li>按分类整理，支持搜索与筛选</li>
              <li>优化移动端体验，随时随地访问</li>
              <li>编写教程和案例，降低使用门槛</li>
            </ul>

            <h2>版权与协议</h2>
            <p>
              Skills 的原始内容来自官方与社区仓库，
              遵循各 Skill 标注的开源协议（Apache 2.0 或 Source-available）。
            </p>
            <p>
              我们严格遵守开源协议条款，不修改原始内容，仅提供展示与翻译服务。
              如您是版权方且对本站内容有疑问，请随时联系
              <a href="mailto:contact@allskills.cn"> contact@allskills.cn</a>。
            </p>

            <h2>有用的链接</h2>
            <ul>
              <li>
                <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener">
                  Anthropic Skills 官方仓库
                </a>
              </li>
              <li>社区镜像/衍生仓库（不同来源）</li>
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
        ) : isDe ? (
          <div className="about-content">
            <p>
              <strong>AllSkills.cn</strong> ist ein kuratiertes Verzeichnis für Anthropic/Claude Skills,
              das internationale Nutzer beim Finden, Verstehen und Nutzen von Skills unterstützt.
            </p>

            <h2>Was wir bieten</h2>
            <ul>
              <li>Synchronisierte Skills aus offiziellen und Community-Repos</li>
              <li>Mehrsprachige UI mit klaren Nutzungshinweisen</li>
              <li>Struktur nach Kategorien, Suche und Filter</li>
              <li>Mobile-optimierte Oberfläche</li>
              <li>Guides und Beispiele für schnellen Einstieg</li>
            </ul>

            <h2>Lizenzen</h2>
            <p>
              Skills stammen aus offiziellen und Community-Repositories und folgen den jeweils angegebenen
              Open-Source-Lizenzen (z. B. Apache 2.0 oder Source-available).
            </p>
            <p>
              Wir respektieren die Lizenzbedingungen und bieten ausschließlich Anzeige und Übersetzung an.
              Bei Fragen kontaktiere uns unter
              <a href="mailto:contact@allskills.cn"> contact@allskills.cn</a>.
            </p>

            <h2>Nützliche Links</h2>
            <ul>
              <li>
                <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener">
                  Anthropic Skills Repository
                </a>
              </li>
              <li>Community-Mirrors / Forks</li>
              <li>
                <a href="https://www.anthropic.com" target="_blank" rel="noopener">
                  Anthropic
                </a>
              </li>
              <li>
                <a href="https://claude.ai" target="_blank" rel="noopener">
                  Claude AI
                </a>
              </li>
            </ul>
          </div>
        ) : isHi ? (
          <div className="about-content">
            <p>
              <strong>AllSkills.cn</strong> Claude/Anthropic Skills के लिए एक क्यूरेटेड डायरेक्टरी है,
              जो स्किल्स खोजने, समझने और उपयोग करने में मदद करती है।
            </p>

            <h2>हम क्या करते हैं</h2>
            <ul>
              <li>ऑफिशियल और कम्युनिटी रिपॉज़िटरीज़ से स्किल्स सिंक करते हैं</li>
              <li>स्पष्ट उपयोग निर्देश और बहुभाषी UI</li>
              <li>श्रेणियों के अनुसार व्यवस्थित सर्च और फ़िल्टर</li>
              <li>मोबाइल-फ्रेंडली अनुभव</li>
              <li>गाइड्स और उदाहरण ताकि शुरुआत आसान हो</li>
            </ul>

            <h2>लाइसेंस</h2>
            <p>
              Skills ऑफिशियल और कम्युनिटी रिपॉज़िटरीज़ से लिए जाते हैं और उनके घोषित
              ओपन-सोर्स लाइसेंस (जैसे Apache 2.0 या Source-available) का पालन करते हैं।
            </p>
            <p>
              हम लाइसेंस शर्तों का सम्मान करते हैं और केवल प्रदर्शन/अनुवाद प्रदान करते हैं।
              किसी प्रश्न के लिए संपर्क करें:
              <a href="mailto:contact@allskills.cn"> contact@allskills.cn</a>.
            </p>

            <h2>उपयोगी लिंक</h2>
            <ul>
              <li>
                <a href="https://github.com/anthropics/skills" target="_blank" rel="noopener">
                  Anthropic Skills रिपॉज़िटरी
                </a>
              </li>
              <li>Community मिरर / फोर्क्स</li>
              <li>
                <a href="https://www.anthropic.com" target="_blank" rel="noopener">
                  Anthropic
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
              Skills are sourced from official and community repositories and follow the declared
              licenses in each skill.
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
