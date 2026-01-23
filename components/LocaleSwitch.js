import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale, stripLocale } from "../lib/paths";

export default function LocaleSwitch() {
  const router = useRouter();
  const { pathname, asPath } = router;
  const locale = getLocaleFromPath(pathname);
  const locales = ["zh", "en", "de"];
  const labels = { zh: "中文", en: "EN", de: "DE" };
  const currentIndex = Math.max(0, locales.indexOf(locale));
  const nextLocale = locales[(currentIndex + 1) % locales.length];
  const basePath = stripLocale(asPath.split("?")[0]);

  return (
    <button
      className="locale-switch"
      type="button"
      onClick={() => router.push(withLocale(basePath, nextLocale))}
    >
      {labels[nextLocale]}
    </button>
  );
}
