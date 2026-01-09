import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale, stripLocale } from "../lib/paths";

export default function LocaleSwitch() {
  const router = useRouter();
  const { pathname, asPath } = router;
  const locale = getLocaleFromPath(pathname);
  const nextLocale = locale === "zh" ? "en" : "zh";
  const basePath = stripLocale(asPath.split("?")[0]);

  return (
    <button
      className="locale-switch"
      type="button"
      onClick={() => router.push(withLocale(basePath, nextLocale))}
    >
      {nextLocale === "zh" ? "中文" : "EN"}
    </button>
  );
}
