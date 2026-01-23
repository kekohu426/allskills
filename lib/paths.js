function getLocaleFromPath(pathname) {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/de")) return "de";
  return "zh";
}

function withLocale(pathname, locale) {
  if (locale === "en") {
    if (pathname === "/") return "/en";
    return `/en${pathname}`;
  }
  if (locale === "de") {
    if (pathname === "/") return "/de";
    return `/de${pathname}`;
  }
  return pathname;
}

function stripLocale(pathname) {
  if (pathname.startsWith("/en") || pathname.startsWith("/de")) {
    const stripped = pathname.replace(/^\/(en|de)/, "");
    return stripped === "" ? "/" : stripped;
  }
  return pathname;
}

function toAnchorId(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

module.exports = {
  getLocaleFromPath,
  withLocale,
  stripLocale,
  toAnchorId
};
