function getLocaleFromPath(pathname) {
  return pathname.startsWith("/en") ? "en" : "zh";
}

function withLocale(pathname, locale) {
  if (locale === "en") {
    if (pathname === "/") return "/en";
    return `/en${pathname}`;
  }
  return pathname;
}

function stripLocale(pathname) {
  if (pathname.startsWith("/en")) {
    const stripped = pathname.replace(/^\/en/, "");
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
