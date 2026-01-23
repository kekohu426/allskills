import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale, stripLocale } from "../lib/paths";

export default function LocaleSwitch() {
  const router = useRouter();
  const { pathname, asPath } = router;
  const locale = getLocaleFromPath(pathname);
  const locales = ["zh", "en", "de"];
  const labels = { zh: "中文", en: "English", de: "Deutsch" };
  const basePath = stripLocale(asPath.split("?")[0]);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const current = locales.includes(locale) ? locale : "zh";

  return (
    <div className={`locale-switch ${open ? "is-open" : ""}`}>
      <button
        ref={buttonRef}
        className="locale-switch__button"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {labels[current]}
        <span className="locale-switch__chevron">▾</span>
      </button>
      {open && (
        <div ref={menuRef} className="locale-switch__menu" role="listbox">
          {locales.map((code) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={code === current}
              className={`locale-switch__option ${code === current ? "is-active" : ""}`}
              onClick={() => {
                setOpen(false);
                router.push(withLocale(basePath, code));
              }}
            >
              {labels[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
