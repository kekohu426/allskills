import { useState } from "react";
import { useRouter } from "next/router";
import SeoHead from "../../components/SeoHead";
import { getAllSkills, getSkillBySlug } from "../../lib/skills";
import { markdownToHtml } from "../../lib/markdown";
import { t } from "../../lib/i18n";
import { getLocaleFromPath } from "../../lib/paths";
import site from "../../data/site.json";

export default function SkillDetail({ skill, html, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const [copied, setCopied] = useState(false);
  const isZh = locale === "zh";
  const isDe = locale === "de";

  const displayName = isZh && skill.nameZh ? skill.nameZh : skill.name;
  const displayDesc = isZh && skill.descriptionZh ? skill.descriptionZh : skill.description;
  const displayUseCases = isZh && skill.useCasesZh && skill.useCasesZh.length > 0
    ? skill.useCasesZh
    : skill.useCases;
  const canonicalPath = isZh ? `/skills/${skill.slug}` : (isDe ? `/de/skills/${skill.slug}` : `/en/skills/${skill.slug}`);
  const canonicalUrl = `${site.domain}${canonicalPath}`;
  const keywords = Array.from(
    new Set([skill.category, ...(skill.tags || [])].filter(Boolean))
  ).join(", ");

  const rawJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: displayName,
      description: displayDesc,
      applicationCategory: "AIApplication",
      operatingSystem: "Web",
      inLanguage: isZh ? "zh-CN" : (isDe ? "de-DE" : "en"),
      keywords,
      url: canonicalUrl,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      },
      publisher: {
        "@type": "Organization",
        name: "AllSkills",
        url: site.domain
      },
      sameAs: skill.sourceUrl ? [skill.sourceUrl] : undefined
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isZh ? "首页" : (isDe ? "Start" : "Home"),
          item: `${site.domain}${isZh ? "/" : (isDe ? "/de" : "/en")}`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Skills",
          item: `${site.domain}${isZh ? "/skills" : (isDe ? "/de/skills" : "/en/skills")}`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: displayName,
          item: canonicalUrl
        }
      ]
    }
  ];
  const jsonLd = JSON.parse(JSON.stringify(rawJsonLd));

  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <SeoHead
        title={displayName}
        description={displayDesc}
        path={canonicalPath}
        keywords={keywords}
        jsonLd={jsonLd}
        ogType="article"
      />
      <section className="detail-hero">
        <div>
          <p className="eyebrow">{skill.category}</p>
          <h1>{displayName}</h1>
          <p className="lead">{displayDesc}</p>
          <div className="detail-actions">
            <button className="btn" type="button" onClick={handleCopy}>
              {copied ? t(locale, "detailCopied") : t(locale, "detailCopy")}
            </button>
            <span className="detail-path">{skill.path}</span>
          </div>
        </div>
      </section>

      <section className="section detail-body">
        {displayUseCases.length > 0 && (
          <div className="use-cases">
            <h2>{t(locale, "detailUseCases")}</h2>
            <ul>
              {displayUseCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
        <details className="skill-raw" open>
          <summary>Raw SKILL.md</summary>
          <pre>{`---\nname: ${skill.name}\ndescription: ${skill.description}\n---\n\n${skill.body}`}</pre>
        </details>
        <div className="source-note">
          Source:{" "}
          {skill.sourceUrl ? (
            <a href={skill.sourceUrl} target="_blank" rel="noopener">
              {skill.sourceLabel}
            </a>
          ) : (
            <span>{skill.sourceLabel}</span>
          )}{" "}
          | License: {skill.license}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const skill = getSkillBySlug(params.slug);
  const html = markdownToHtml(skill.body);

  return {
    props: {
      skill,
      html
    }
  };
}

export async function getStaticPaths() {
  const skills = getAllSkills();
  const paths = skills.map((skill) => ({ params: { slug: skill.slug } }));

  return {
    paths,
    fallback: false
  };
}
