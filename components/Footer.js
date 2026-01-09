import site from "../data/site.json";
import { useRouter } from "next/router";
import { t } from "../lib/i18n";
import { getLocaleFromPath, withLocale } from "../lib/paths";

export default function Footer() {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">{site.siteName}</div>
        <div className="footer__tagline">{t(locale, "footerTagline")}</div>
        <div className="footer__meta">{site.domain}</div>
        <div className="footer__meta">
          Data source: Anthropic Skills Repository (Apache 2.0)
        </div>
        <div className="footer__meta">Curated and translated by AllSkills.cn</div>
        <div className="footer__links">
          <a href={withLocale("/about", locale)}>关于</a>
        </div>
      </div>
    </footer>
  );
}
