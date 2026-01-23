import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale, stripLocale } from "../lib/paths";

export default function LocaleSwitch() {
  const router = useRouter();
  const { pathname, asPath } = router;
  const locale = getLocaleFromPath(pathname);
  const locales = ["zh", "en", "de"];
  const labels = { zh: "中文", en: "English", de: "Deutsch" };
  const basePath = stripLocale(asPath.split("?")[0]);

  return (
    <div className="locale-switch">
      <select
        value={locales.includes(locale) ? locale : "zh"}
        onChange={(event) => router.push(withLocale(basePath, event.target.value))}
        aria-label="Language"
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {labels[code]}
          </option>
        ))}
      </select>
    </div>
  );
}
