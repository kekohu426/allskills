import Head from "next/head";
import site from "../data/site.json";

export default function SeoHead({ title, description, path, keywords, jsonLd, ogType, ogImage }) {
  const pageTitle = title ? `${title} | ${site.siteName}` : site.siteName;
  const pageDescription = description || site.description;
  const url = path ? `${site.domain}${path}` : site.domain;
  const basePath = path ? path.replace(/^\/(en|de)/, "") || "/" : "/";
  const zhPath = basePath;
  const enPath = basePath === "/" ? "/en" : `/en${basePath}`;
  const dePath = basePath === "/" ? "/de" : `/de${basePath}`;
  const zhUrl = `${site.domain}${zhPath}`;
  const enUrl = `${site.domain}${enPath}`;
  const deUrl = `${site.domain}${dePath}`;
  const imageUrl = ogImage || `${site.domain}/og-default.png`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/allskills-logo.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/assets/allskills-logo-240.png" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="zh" href={zhUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="x-default" href={zhUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content={ogType || "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={site.siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
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
