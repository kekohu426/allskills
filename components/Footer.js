import Link from "next/link";
import site from "../data/site.json";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale } from "../lib/paths";

export default function Footer() {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");
  const isZh = locale === "zh";
  const isDe = locale === "de";
  const isHi = locale === "hi";

  const navLinksZh = [
    { label: "首页", href: withLocale("/", locale) },
    { label: "全部 Skills", href: withLocale("/skills", locale) },
    { label: "分类索引", href: withLocale("/collections", locale) },
    { label: "Blog", href: withLocale("/blog", locale) }
  ];

  const navLinksEn = [
    { label: "Home", href: withLocale("/", locale) },
    { label: "All Skills", href: withLocale("/skills", locale) },
    { label: "Categories", href: withLocale("/collections", locale) },
    { label: "Blog", href: withLocale("/blog", locale) }
  ];

  const navLinksDe = [
    { label: "Start", href: withLocale("/", locale) },
    { label: "Alle Skills", href: withLocale("/skills", locale) },
    { label: "Kategorien", href: withLocale("/collections", locale) },
    { label: "Blog", href: withLocale("/blog", locale) }
  ];

  const navLinksHi = [
    { label: "होम", href: withLocale("/", locale) },
    { label: "सभी स्किल्स", href: withLocale("/skills", locale) },
    { label: "श्रेणियाँ", href: withLocale("/collections", locale) },
    { label: "ब्लॉग", href: withLocale("/blog", locale) }
  ];

  const navLinks = isZh ? navLinksZh : (isDe ? navLinksDe : (isHi ? navLinksHi : navLinksEn));

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__column">
            <div className="footer__title">
              {isZh ? "快速导航" : (isDe ? "Navigation" : (isHi ? "नेविगेशन" : "Navigation"))}
            </div>
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="footer__link">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer__column">
            <div className="footer__title">
              {isZh ? "友情链接" : (isDe ? "Links" : (isHi ? "लिंक्स" : "Links"))}
            </div>
            <a
              href="https://www.anthropic.com/"
              target="_blank"
              rel="noopener"
              className="footer__link"
            >
              {isZh ? "Anthropic 官网" : "Anthropic"}
            </a>
            <a href="https://claude.ai" target="_blank" rel="noopener" className="footer__link">
              Claude.ai
            </a>
            <a
              href="https://github.com/kekohu426/allskills"
              target="_blank"
              rel="noopener"
              className="footer__link"
            >
              GitHub
            </a>
          </div>
          <div className="footer__column">
            <div className="footer__title">
              {isZh ? "数据声明" : (isDe ? "Datenhinweis" : (isHi ? "डेटा सूचना" : "Data Notice"))}
            </div>
            <div className="footer__meta">
              {isZh
                ? "内容整理自 GitHub 开源仓库。"
                : isDe
                  ? "Inhalte stammen aus Open-Source-Repositories auf GitHub."
                  : isHi
                    ? "सामग्री GitHub ओपन-सोर्स रिपॉज़िटरीज़ से संकलित है।"
                    : "Content curated from GitHub open source repos."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
