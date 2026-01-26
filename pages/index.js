import Link from "next/link";
import { useRouter } from "next/router";
import SeoHead from "../components/SeoHead";
import { compactSkill, getAllSkills, getCategories } from "../lib/skills";
import { t } from "../lib/i18n";
import { getLocaleFromPath, toAnchorId, withLocale } from "../lib/paths";

export default function Home({ skills, categories, skillCount, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const isZh = locale === "zh";
  const isDe = locale === "de";
  const isHi = locale === "hi";
  const localePrefix = isZh ? "" : `/${locale}`;
  const getLocalizedName = (skill) =>
    isZh && skill.nameZh
      ? skill.nameZh
      : isDe && skill.nameDe
        ? skill.nameDe
        : isHi && skill.nameHi
          ? skill.nameHi
          : skill.name;
  const getLocalizedDescription = (skill) =>
    isZh && skill.descriptionZh
      ? skill.descriptionZh
      : isDe && skill.descriptionDe
        ? skill.descriptionDe
        : isHi && skill.descriptionHi
          ? skill.descriptionHi
          : skill.description;
  const getLocalizedUseCases = (skill) =>
    isZh && skill.useCasesZh && skill.useCasesZh.length > 0
      ? skill.useCasesZh
      : (skill.useCases || []);
  const seoTitle = isZh
    ? "Anthropic Skills Directory - 发现、浏览与创建 Claude Skills"
    : isDe
      ? "Anthropic Skills Directory - Entdecken, durchsuchen & Claude Skills erstellen"
      : isHi
        ? "Anthropic Skills Directory - Claude Skills खोजें, ब्राउज़ करें और बनाएं"
      : "Anthropic Skills Directory - Discover, Browse & Create Claude Skills";
  const seoDescription = isZh
    ? "精选的 Anthropic Skills directory，帮助你发现、浏览并创建 Claude skills。探索真实案例、社区工具与实用指南。"
    : isDe
      ? "Ein kuratiertes Anthropic Skills Verzeichnis, um Claude Skills zu entdecken, zu durchsuchen und zu erstellen. Entdecke Praxisbeispiele, Community-Werkzeuge und Leitfäden."
      : isHi
        ? "एक क्यूरेटेड Anthropic Skills डायरेक्टरी जहाँ आप Claude Skills खोज, ब्राउज़ और बना सकते हैं। वास्तविक उदाहरण, कम्युनिटी टूल्स और व्यावहारिक गाइड्स देखें।"
      : "A curated Anthropic Skills directory to discover, browse, and create Claude skills. Explore real-world examples, community tools, and practical guides.";
  const keywordList =
    "Anthropic Skills Directory, Anthropic Skills Library, Claude Skills, Claude Skills Directory, Claude Skills Library, Anthropic Skills, Claude AI, AI Skills, Prompt Engineering, Skills vs MCP, how to use Claude Skills, Anthropic Skills 目录, Claude Skills 目录, Claude Skills Library";

  // Fixed display count for marketing purposes
  // Actual count: 291 (as of 2026-01-19)
  const skillCountDisplay = 500;

  const seoJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AllSkills.cn",
    description: seoDescription,
    url: "https://allskills.cn",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://allskills.cn/skills?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: skills.slice(0, 50).map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: getLocalizedName(skill),
      url: `https://allskills.cn/skills/${skill.slug}`
    }))
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Anthropic Skills 是免费的吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "是的！大部分 Skills 基于 Apache 2.0 或 source-available 协议，可免费使用与学习。"
        }
      },
      {
        "@type": "Question",
        name: "我需要注册 Claude 账号吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "浏览不需要注册，使用时需要 Claude 账号。"
        }
      },
      {
        "@type": "Question",
        name: "怎么把 Skill 变成 System Prompt？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "复制 Skill 指令后，在 Claude 的系统提示或 Project 中粘贴即可。"
        }
      },
      {
        "@type": "Question",
        name: "这些 Skill 支持 GPT-4 吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "主要针对 Claude 优化，但逻辑结构可迁移到其他模型。"
        }
      }
    ]
  };

  const featuredSlugs = [
    "canvas-design",
    "algorithmic-art",
    "brand-guidelines",
    "doc-coauthoring",
    "frontend-design",
    "mcp-builder",
    "webapp-testing",
    "pdf",
    "slack-gif-creator",
    "internal-comms"
  ];

  const featuredSkills = featuredSlugs
    .map((slug) => skills.find((skill) => skill.slug === slug))
    .filter(Boolean);

  const categoryOrderZh = [
    { key: "Design Ops", label: "设计", desc: "海报、品牌、UI设计" },
    { key: "Dev Tools", label: "开发", desc: "代码测试、Git日志" },
    { key: "Docs & Writing", label: "写作", desc: "技术文档、协作写作" },
    { key: "Creative Coding", label: "创意", desc: "p5.js、生成艺术" },
    { key: "General", label: "通用", desc: "分析、研究、效率" },
    { key: "Comms", label: "通讯", desc: "邮件、沟通辅助" },
    { key: "Testing", label: "测试", desc: "自动化测试方案" },
    { key: "Media", label: "媒体", desc: "图片处理、元数据" }
  ];

  const categoryOrderEn = [
    { key: "Design Ops", label: "Design", desc: "Posters, branding, UI design" },
    { key: "Dev Tools", label: "Dev Tools", desc: "Code testing, Git logs" },
    { key: "Docs & Writing", label: "Writing", desc: "Technical docs, collaboration" },
    { key: "Creative Coding", label: "Creative", desc: "p5.js, generative art" },
    { key: "General", label: "General", desc: "Analysis, research, productivity" },
    { key: "Comms", label: "Comms", desc: "Email, communication" },
    { key: "Testing", label: "Testing", desc: "Automated testing" },
    { key: "Media", label: "Media", desc: "Image processing, metadata" }
  ];

  const categoryOrderDe = [
    { key: "Design Ops", label: "Design", desc: "Poster, Branding, UI-Design" },
    { key: "Dev Tools", label: "Entwicklung", desc: "Code-Tests, Git-Logs" },
    { key: "Docs & Writing", label: "Schreiben", desc: "Technische Doku, Zusammenarbeit" },
    { key: "Creative Coding", label: "Kreativ", desc: "p5.js, Generative Art" },
    { key: "General", label: "Allgemein", desc: "Analyse, Forschung, Produktivität" },
    { key: "Comms", label: "Kommunikation", desc: "E-Mail, Kommunikation" },
    { key: "Testing", label: "Testing", desc: "Automatisiertes Testing" },
    { key: "Media", label: "Medien", desc: "Bildverarbeitung, Metadaten" }
  ];

  const categoryOrderHi = [
    { key: "Design Ops", label: "डिज़ाइन", desc: "पोस्टर, ब्रांडिंग, UI डिज़ाइन" },
    { key: "Dev Tools", label: "डेवलपमेंट", desc: "कोड टेस्टिंग, Git लॉग्स" },
    { key: "Docs & Writing", label: "लेखन", desc: "टेक डॉक्स, सहयोग" },
    { key: "Creative Coding", label: "क्रिएटिव", desc: "p5.js, जनरेटिव आर्ट" },
    { key: "General", label: "सामान्य", desc: "विश्लेषण, रिसर्च, उत्पादकता" },
    { key: "Comms", label: "संचार", desc: "ईमेल, कम्युनिकेशन" },
    { key: "Testing", label: "टेस्टिंग", desc: "ऑटोमेटेड टेस्टिंग" },
    { key: "Media", label: "मीडिया", desc: "इमेज प्रोसेसिंग, मेटाडेटा" }
  ];

  const categoryOrder = isZh ? categoryOrderZh : (isDe ? categoryOrderDe : (isHi ? categoryOrderHi : categoryOrderEn));
  const categoryMap = new Map(categories.map((category) => [category.name, category]));
  const heroDescriptionParts = t(locale, "heroDescription").split("\n\n");

  const coreBlocks = isZh
    ? [
        {
          title: "发现 Claude Skills",
          desc: "浏览持续增长的 Anthropic Skills 集合，包括社区示例、官方参考与实验工具。"
        },
        {
          title: "理解 Claude Skills 的工作方式",
          desc: "了解 Anthropic skills 是什么、与 MCP 的差异，以及在实际项目中如何选择。"
        },
        {
          title: "构建并使用 Claude Skills",
          desc: "从入门到进阶的创建与使用指南，帮助你快速落地工作流。"
        }
      ]
    : isDe
      ? [
          {
            title: "Claude Skills entdecken",
            desc: "Entdecke eine wachsende Sammlung von Anthropic Skills mit Community-Beispielen, offiziellen Referenzen und Experimenten."
          },
          {
            title: "Verstehen, wie Claude Skills funktionieren",
            desc: "Lerne, was Anthropic Skills sind, wie sie sich von MCP unterscheiden und wann welche Option sinnvoll ist."
          },
          {
            title: "Claude Skills bauen und nutzen",
            desc: "Schritt-für-Schritt-Anleitungen zum Erstellen, Konfigurieren und Anwenden von Claude Skills - vom Einstieg bis zu fortgeschrittenen Workflows."
          }
        ]
      : isHi
        ? [
            {
              title: "Claude Skills खोजें",
              desc: "Anthropic Skills का बढ़ता संग्रह देखें — कम्युनिटी उदाहरण, आधिकारिक संदर्भ और प्रयोगात्मक टूल्स सहित।"
            },
            {
              title: "Claude Skills कैसे काम करते हैं समझें",
              desc: "जानें Anthropic Skills क्या हैं, MCP से कैसे अलग हैं, और कब किसे चुनना चाहिए।"
            },
            {
              title: "Claude Skills बनाएं और उपयोग करें",
              desc: "शुरुआत से एडवांस तक बनाने, कॉन्फ़िगर करने और उपयोग करने के स्टेप-बाय-स्टेप गाइड।"
            }
          ]
        : [
          {
            title: "Discover Claude Skills",
            desc: "Browse a growing collection of Anthropic skills, including community-built examples, official references, and experimental tools."
          },
          {
            title: "Understand How Claude Skills Work",
            desc: "Learn what Anthropic skills are, how they differ from MCP, and when to use each in practice."
          },
          {
            title: "Build and Use Claude Skills",
            desc: "Step-by-step guides on how to create, configure, and use Claude skills - from simple examples to advanced workflows."
          }
        ];

  const coreLinks = isZh
    ? [
        {
          label: "Skills vs MCP：有什么区别？",
          href: "/landing/skills-vs-mcp"
        },
        {
          label: "如何使用 Claude Skills",
          href: "/landing/how-to-use-claude-skills"
        },
        {
          label: "探索 Anthropic Skills Library",
          href: "/landing/anthropic-skills-library"
        }
      ]
    : isDe
      ? [
          {
            label: "Skills vs MCP: Was ist der Unterschied?",
            href: "/de/landing/skills-vs-mcp"
          },
          {
            label: "Claude Skills nutzen",
            href: "/de/landing/how-to-use-claude-skills"
          },
          {
            label: "Anthropic Skills Bibliothek entdecken",
            href: "/de/landing/anthropic-skills-library"
          }
        ]
      : isHi
        ? [
            {
              label: "Skills vs MCP: क्या अंतर है?",
              href: "/hi/landing/skills-vs-mcp"
            },
            {
              label: "Claude Skills कैसे उपयोग करें",
              href: "/hi/landing/how-to-use-claude-skills"
            },
            {
              label: "Anthropic Skills लाइब्रेरी देखें",
              href: "/hi/landing/anthropic-skills-library"
            }
          ]
        : [
          {
            label: "Skills vs MCP: What's the Difference?",
            href: "/en/landing/skills-vs-mcp"
          },
          {
            label: "How to Use Claude Skills",
            href: "/en/landing/how-to-use-claude-skills"
          },
          {
            label: "Explore the Anthropic Skills Library",
            href: "/en/landing/anthropic-skills-library"
          }
        ];

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path={localePrefix || "/"}
        keywords={isZh ? keywordList : undefined}
        jsonLd={isZh ? [seoJsonLd, itemListJsonLd, faqJsonLd] : undefined}
      />

      <div className="home-page">
        <section className="home-hero">
          <div className="home-shell">
            <div className="home-hero__inner">
              <h1>{t(locale, "heroTitle")}</h1>
              <p className="home-hero__subtitle">{t(locale, "heroSubtitle")}</p>
              {heroDescriptionParts.map((text) => (
                <p key={text} className="home-hero__desc">{text}</p>
              ))}
              <div className="home-hero__stats">
              <div className="stat-card">
                  <strong>{skillCountDisplay}+</strong>
                  <span>{isZh ? "官方 Skills" : (isDe ? "Offizielle Skills" : (isHi ? "आधिकारिक स्किल्स" : "Official Skills"))}</span>
                </div>
                <div className="stat-card">
                  <strong>8</strong>
                  <span>{isZh ? "分类" : (isDe ? "Kategorien" : (isHi ? "श्रेणियाँ" : "Categories"))}</span>
                </div>
                <div className="stat-card">
                  <strong>100%</strong>
                  <span>{isZh ? "免费开源" : (isDe ? "Kostenlos & Open" : (isHi ? "मुफ़्त और ओपन" : "Free & Open"))}</span>
                </div>
              </div>
              <div className="home-hero__cta">
                <Link href={withLocale("/skills", locale)} className="btn btn--primary">
                  {isZh ? "浏览全部 Skills" : (isDe ? "Alle Skills ansehen" : (isHi ? "सभी स्किल्स देखें" : "Browse All Skills"))}
                </Link>
                <Link href={withLocale("/collections", locale)} className="btn btn--ghost">
                  {isZh ? "按分类浏览" : (isDe ? "Nach Kategorie" : (isHi ? "श्रेणी से देखें" : "Browse by Category"))}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="home-shell">
          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "核心功能" : (isDe ? "Kernfunktionen" : (isHi ? "मुख्य फीचर्स" : "Core Features"))}</h2>
            </div>
            <div className="scenario-grid">
              {coreBlocks.map((item) => (
                <div key={item.title} className="scenario-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="home-hero__cta">
              {coreLinks.map((item) => (
                <Link key={item.href} href={item.href} className="btn btn--ghost">
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="section doc-section">
            <div className="section__header">
              <h2>{isZh ? "什么是 Anthropic Skills？" : (isDe ? "Was sind Anthropic Skills?" : (isHi ? "Anthropic Skills क्या हैं?" : "What are Anthropic Skills?"))}</h2>
            </div>
            <div className="doc-columns">
              <div className="doc-card">
                {isZh ? (
                  <>
                    <p>
                      Anthropic Skills 是 Claude AI 的官方技能库，包含 {skillCountDisplay}+ 个提示词模板和系统指令。
                      每个 Skill 是一个专业的能力单元，让 Claude 在特定领域发挥更好的效果。
                    </p>
                    <p>
                      这些 Skills 由 Anthropic 官方团队开发维护，基于用户反馈和实践经验。
                      相比普通提示词，它们结构更完整，输出更稳定。
                    </p>
                    <p>
                      设计师：生成艺术、品牌视觉、UI 组件
                      <br />
                      开发者：代码生成、自动化测试、文档编写
                      <br />
                      创作者：博客写作、SEO 优化、文案润色
                    </p>
                    <Link href={withLocale("/blog", locale)}>了解更多关于 Prompt Engineering</Link>
                  </>
                ) : isDe ? (
                  <>
                    <p>
                      Anthropic Skills ist die offizielle Skill-Bibliothek für Claude AI mit {skillCountDisplay}+ Prompt-Vorlagen und System-Instruktionen.
                      Jeder Skill ist eine spezialisierte Fähigkeit, damit Claude in bestimmten Domänen bessere Ergebnisse liefert.
                    </p>
                    <p>
                      Diese Skills werden vom Anthropic-Team gepflegt und basieren auf Nutzerfeedback und Praxis.
                      Im Vergleich zu einfachen Prompts sind sie strukturierter und liefern konsistentere Ergebnisse.
                    </p>
                    <p>
                      Designer: Generative Art, Brand-Visuals, UI-Komponenten
                      <br />
                      Entwickler: Code-Generierung, automatisiertes Testing, Dokumentation
                      <br />
                      Creator:innen: Blog-Artikel, SEO, Werbetexte
                    </p>
                    <Link href={withLocale("/blog", locale)}>Mehr zu Prompt Engineering</Link>
                  </>
                ) : isHi ? (
                  <>
                    <p>
                      Anthropic Skills, Claude AI की आधिकारिक स्किल लाइब्रेरी है, जिसमें {skillCountDisplay}+ प्रॉम्प्ट टेम्पलेट्स और सिस्टम निर्देश हैं।
                      हर Skill एक विशेष क्षमता यूनिट है जो Claude को खास डोमेन में बेहतर प्रदर्शन करने में मदद करती है।
                    </p>
                    <p>
                      ये Skills Anthropic टीम द्वारा विकसित और मेंटेन किए जाते हैं, और यूज़र फीडबैक व प्रैक्टिकल अनुभव पर आधारित हैं।
                      सामान्य प्रॉम्प्ट्स की तुलना में इनकी संरचना अधिक स्पष्ट होती है और आउटपुट अधिक स्थिर रहता है।
                    </p>
                    <p>
                      डिजाइनर्स: जनरेटिव आर्ट, ब्रांड विज़ुअल्स, UI कंपोनेंट्स
                      <br />
                      डेवलपर्स: कोड जनरेशन, ऑटोमेटेड टेस्टिंग, डॉक्यूमेंटेशन
                      <br />
                      क्रिएटर्स: ब्लॉग लेखन, SEO, कॉपीराइटिंग
                    </p>
                    <Link href={withLocale("/blog", locale)}>Prompt Engineering के बारे में और जानें</Link>
                  </>
                ) : (
                  <>
                    <p>
                      Anthropic Skills is the official skill library for Claude AI, containing {skillCountDisplay}+ prompt templates and system instructions.
                      Each Skill is a specialized capability unit that helps Claude perform better in specific domains.
                    </p>
                    <p>
                      These Skills are developed and maintained by the Anthropic team, based on user feedback and practical experience.
                      Compared to regular prompts, they have more complete structures and produce more consistent outputs.
                    </p>
                    <p>
                      Designers: generative art, brand visuals, UI components
                      <br />
                      Developers: code generation, automated testing, documentation
                      <br />
                      Creators: blog writing, SEO optimization, copywriting
                    </p>
                    <Link href={withLocale("/blog", locale)}>Learn more about Prompt Engineering</Link>
                  </>
                )}
              </div>
              <div className="doc-card doc-card--grid">
                {(isZh
                  ? ["设计", "开发", "写作", "创意", "分析", "通讯", "测试", "媒体"]
                  : isDe
                    ? ["Design", "Dev", "Schreiben", "Kreativ", "Analyse", "Comms", "Testing", "Medien"]
                    : isHi
                      ? ["डिज़ाइन", "डेव", "लेखन", "क्रिएटिव", "विश्लेषण", "संचार", "टेस्टिंग", "मीडिया"]
                      : ["Design", "Dev", "Writing", "Creative", "Analysis", "Comms", "Testing", "Media"]
                ).map((label) => (
                  <div className="icon-tile" key={label}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "Skills 能做什么？" : (isDe ? "Was können Skills?" : (isHi ? "Skills क्या कर सकती हैं?" : "What can Skills do?"))}</h2>
            </div>
            <div className="scenario-grid">
              <div className="scenario-card">
                <p className="eyebrow">{isZh ? "设计" : (isDe ? "DESIGN" : (isHi ? "डिज़ाइन" : "DESIGN"))}</p>
                <h3>{isZh ? "设计辅助" : (isDe ? "Design-Assistent" : (isHi ? "डिज़ाइन सहायक" : "Design Assistant"))}</h3>
                <p>{isZh ? "生成配色方案、Logo 灵感和宣传海报。" : (isDe ? "Erstelle Farbschemata, Logo-Ideen und Werbeplakate." : (isHi ? "कलर स्कीम, लोगो आइडिया और प्रमोशनल पोस्टर बनाएं।" : "Generate color schemes, logo ideas, and promotional posters."))}</p>
                <div>{isZh ? "推荐 Skills：" : (isDe ? "Empfohlen:" : (isHi ? "सुझाए गए स्किल्स:" : "Recommended:"))}</div>
                <div>
                  <Link href={withLocale("/skills/canvas-design", locale)}>Canvas Design</Link> ·{" "}
                  <Link href={withLocale("/skills/brand-guidelines", locale)}>Brand Guidelines</Link>
                </div>
              </div>
              <div className="scenario-card">
                <p className="eyebrow">{isZh ? "开发" : (isDe ? "ENTWICKLUNG" : (isHi ? "डेवलपमेंट" : "DEV"))}</p>
                <h3>{isZh ? "开发工具" : (isDe ? "Dev-Tools" : (isHi ? "डेव टूल्स" : "Dev Tools"))}</h3>
                <p>{isZh ? "代码审查、生成测试用例和发布日志。" : (isDe ? "Code-Review, Testfall-Generierung und Release Notes." : (isHi ? "कोड रिव्यू, टेस्ट केस जनरेशन और रिलीज़ नोट्स।" : "Code review, test case generation, and release notes."))}</p>
                <div>{isZh ? "推荐 Skills：" : (isDe ? "Empfohlen:" : (isHi ? "सुझाए गए स्किल्स:" : "Recommended:"))}</div>
                <div>
                  <Link href={withLocale("/skills/awesome-changelog-generator", locale)}>
                    Changelog Generator
                  </Link>{" "}
                  · <Link href={withLocale("/skills/webapp-testing", locale)}>Web Testing</Link>
                </div>
              </div>
              <div className="scenario-card">
                <p className="eyebrow">{isZh ? "写作" : (isDe ? "WRITING" : (isHi ? "लेखन" : "WRITING"))}</p>
                <h3>{isZh ? "内容创作" : (isDe ? "Content-Erstellung" : (isHi ? "कंटेंट क्रिएशन" : "Content Creation"))}</h3>
                <p>{isZh ? "调研、文章润色和 SEO 结构优化。" : (isDe ? "Recherche, Text-Editing und SEO-Struktur-Optimierung." : (isHi ? "रिसर्च, आर्टिकल एडिटिंग और SEO स्ट्रक्चर ऑप्टिमाइज़ेशन।" : "Research, article editing, and SEO structure optimization."))}</p>
                <div>{isZh ? "推荐 Skills：" : (isDe ? "Empfohlen:" : (isHi ? "सुझाए गए स्किल्स:" : "Recommended:"))}</div>
                <div>
                  <Link href={withLocale("/skills/awesome-content-research-writer", locale)}>
                    Content Researcher
                  </Link>{" "}
                  · <Link href={withLocale("/skills/doc-coauthoring", locale)}>Docs Authoring</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-muted">
            <div className="section__header">
              <h2>{isZh ? "如何使用？" : (isDe ? "So nutzt du Skills" : (isHi ? "कैसे उपयोग करें?" : "How to use?"))}</h2>
            </div>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">1</div>
                <h3>{isZh ? "选择 Skill" : (isDe ? "Skill auswählen" : (isHi ? "स्किल चुनें" : "Choose a Skill"))}</h3>
                <p>{isZh ? `浏览 ${skillCountDisplay}+ 官方 Skills，通过分类或搜索找到适合的技能。` : (isDe ? `Durchsuche ${skillCountDisplay}+ offizielle Skills per Kategorie oder Suche.` : (isHi ? `${skillCountDisplay}+ आधिकारिक स्किल्स को श्रेणी या खोज के ज़रिए देखें।` : `Browse ${skillCountDisplay}+ official Skills, find what you need by category or search.`))}</p>
              </div>
              <div className="step-card">
                <div className="step-num">2</div>
                <h3>{isZh ? "一键复制" : (isDe ? "Kopieren" : (isHi ? "कॉपी करें" : "Copy"))}</h3>
                <p>{isZh ? "打开 Skill 详情，点击复制按钮，系统指令会复制到剪贴板。" : (isDe ? "Öffne den Skill, klicke Kopieren - der Prompt ist in der Zwischenablage." : (isHi ? "स्किल डिटेल खोलें, कॉपी पर क्लिक करें — निर्देश क्लिपबोर्ड में आ जाएगा।" : "Open Skill details, click copy, and the system prompt is in your clipboard."))}</p>
              </div>
              <div className="step-card">
                <div className="step-num">3</div>
                <h3>{isZh ? "在 Claude 中使用" : (isDe ? "In Claude nutzen" : (isHi ? "Claude में उपयोग करें" : "Use in Claude"))}</h3>
                <p>{isZh ? "在 Claude.ai 粘贴指令到对话框或 Project System Prompt。" : (isDe ? "Füge den Prompt in Claude.ai oder Project System Prompt ein." : (isHi ? "Claude.ai चैट या Project System Prompt में पेस्ट करें।" : "Paste the prompt into Claude.ai chat or Project System Prompt."))}</p>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "为什么选择 AllSkills.cn？" : (isDe ? "Warum AllSkills.cn?" : (isHi ? "AllSkills.cn क्यों?" : "Why AllSkills.cn?"))}</h2>
            </div>
            <div className="value-grid">
              <div className="value-card">
                <strong>{isZh ? "中文优化" : (isDe ? "Mehrsprachig" : (isHi ? "बहुभाषी" : "Chinese Optimized"))}</strong>
                <div>{isZh ? "完整的中文翻译和使用说明。" : (isDe ? "Strukturierte Übersetzungen und klare Nutzungshinweise." : (isHi ? "स्पष्ट अनुवाद और उपयोग गाइड्स।" : "Full Chinese translation and usage guides."))}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "搜索" : (isDe ? "Suche" : (isHi ? "खोज" : "Search"))}</strong>
                <div>{isZh ? "按名称、场景、关键词查找。" : (isDe ? "Finde Skills per Name, Szenario oder Keyword." : (isHi ? "नाम, परिदृश्य या कीवर्ड से खोजें।" : "Find by name, scenario, or keyword."))}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "移动端适配" : (isDe ? "Mobile Friendly" : (isHi ? "मोबाइल फ्रेंडली" : "Mobile Friendly"))}</strong>
                <div>{isZh ? "手机上也能查找和复制 Prompt。" : (isDe ? "Prompts auch mobil bequem finden und kopieren." : (isHi ? "मोबाइल पर भी आसानी से खोजें और कॉपी करें।" : "Browse and copy prompts on mobile."))}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "一键复制" : (isDe ? "1-Klick-Kopie" : (isHi ? "1-क्लिक कॉपी" : "One-Click Copy"))}</strong>
                <div>{isZh ? "无需注册，点击即用。" : (isDe ? "Ohne Registrierung - direkt kopieren." : (isHi ? "बिना साइनअप के, क्लिक करके उपयोग करें।" : "No signup required, click to use."))}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "同步更新" : (isDe ? "Aktuelle Updates" : (isHi ? "अपडेटेड" : "Synced Updates"))}</strong>
                <div>{isZh ? "跟进 Anthropic 官方仓库更新。" : (isDe ? "Synchronisiert mit offiziellen Repos." : (isHi ? "ऑफिशियल रिपो के साथ सिंक।" : "Synced with official Anthropic repo."))}</div>
              </div>
              <div className="value-card">
                <strong>{isZh ? "免费" : (isDe ? "Kostenlos" : (isHi ? "मुफ़्त" : "Free"))}</strong>
                <div>{isZh ? "基于开源协议免费开放。" : (isDe ? "Kostenlos unter Open-Source-Lizenzen." : (isHi ? "ओपन-सोर्स लाइसेंस के तहत मुफ़्त।" : "Free under open source license."))}</div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "按分类浏览" : (isDe ? "Nach Kategorie" : (isHi ? "श्रेणी के अनुसार देखें" : "Browse by Category"))}</h2>
            </div>
            <div className="category-grid">
              {categoryOrder.map((entry) => {
                const category = categoryMap.get(entry.key);
                if (!category) return null;
                const count = category.items.length;
                const countLabel = count === 1 ? (isHi ? "1 स्किल" : "1 Skill") : (isHi ? `${count} स्किल्स` : `${count} Skills`);
                return (
                  <Link
                    key={entry.key}
                    href={withLocale(`/collections#${toAnchorId(entry.key)}`, locale)}
                    className="category-card-doc"
                  >
                    <div className="category-card-doc__title">
                      {entry.label}（{entry.key}）
                    </div>
                    <div className="category-card-doc__desc">{countLabel}</div>
                    <div className="category-card-doc__desc">{entry.desc}</div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>{isZh ? "热门 Skills" : (isDe ? "Beliebte Skills" : (isHi ? "लोकप्रिय स्किल्स" : "Popular Skills"))}</h2>
              <Link href={withLocale("/skills", locale)}>{isZh ? "查看更多" : (isDe ? "Alle ansehen" : (isHi ? "सभी देखें" : "View all"))}</Link>
            </div>
            <div className="featured-grid">
              {featuredSkills.map((skill) => {
                const displayName = getLocalizedName(skill);
                const displayDesc = getLocalizedDescription(skill);
                const displayUseCases = getLocalizedUseCases(skill);
                return (
                  <div key={skill.slug} className="featured-card">
                    <div className="featured-card__title">
                      <h3>{displayName}</h3>
                      <span className="badge">{isZh ? "开源" : (isHi ? "ओपन सोर्स" : "Open Source")}</span>
                    </div>
                    <p>{displayDesc}</p>
                    <div className="featured-card__uses">
                      <strong>{isZh ? "适用场景：" : (isDe ? "Einsatzfälle:" : (isHi ? "उपयोग के मामले:" : "Use cases:"))}</strong>
                      {displayUseCases.slice(0, 3).map((useCase) => (
                        <span key={useCase}>{useCase}</span>
                      ))}
                    </div>
                    <div className="featured-card__actions">
                      <Link href={withLocale(`/skills/${skill.slug}`, locale)}>
                        {isZh ? "查看详情" : (isDe ? "Details" : (isHi ? "विवरण" : "Details"))}
                      </Link>
                      <Link href={withLocale(`/skills/${skill.slug}`, locale)}>
                        {isZh ? "复制" : (isDe ? "Kopieren" : (isHi ? "कॉपी" : "Copy"))}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allSkills = getAllSkills();
  const skills = allSkills.map(compactSkill);
  const categories = getCategories(skills);
  const skillCount = skills.length;

  return {
    props: {
      skills,
      categories,
      skillCount
    }
  };
}
