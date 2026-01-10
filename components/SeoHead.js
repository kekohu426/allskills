import Head from "next/head";
import site from "../data/site.json";

export default function SeoHead({ title, description, path, keywords, jsonLd, ogType }) {
  const pageTitle = title ? `${title} | ${site.siteName}` : site.siteName;
  const pageDescription = description || site.description;
  const url = path ? `${site.domain}${path}` : site.domain;
  const isEn = path && path.startsWith("/en");
  const zhPath = isEn ? path.replace(/^\/en/, "") || "/" : path || "/";
  const enPath = isEn ? path : path === "/" ? "/en" : `/en${path || ""}`;
  const zhUrl = `${site.domain}${zhPath}`;
  const enUrl = `${site.domain}${enPath}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="zh" href={zhUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.twitter} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
