import Link from "next/link";
import { useRouter } from "next/router";
import LocaleSwitch from "./LocaleSwitch";
import { t } from "../lib/i18n";
import { getLocaleFromPath, withLocale } from "../lib/paths";

export default function Nav() {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");

  return (
    <nav className="nav">
      <div className="nav__logo">
        <Link href={withLocale("/", locale)}>AllSkills</Link>
      </div>
      <div className="nav__links">
        <Link href={withLocale("/", locale)}>{t(locale, "navHome")}</Link>
        <Link href={withLocale("/skills", locale)}>{t(locale, "navSkills")}</Link>
        <Link href={withLocale("/collections", locale)}>{t(locale, "navCollections")}</Link>
        <Link href={withLocale("/blog", locale)}>{t(locale, "navBlog")}</Link>
      </div>
      <LocaleSwitch />
    </nav>
  );
}
