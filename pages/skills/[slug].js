import { useState } from "react";
import { useRouter } from "next/router";
import SeoHead from "../../components/SeoHead";
import { getAllSkills, getSkillBySlug } from "../../lib/skills";
import { markdownToHtml } from "../../lib/markdown";
import { t } from "../../lib/i18n";
import { getLocaleFromPath } from "../../lib/paths";

export default function SkillDetail({ skill, html, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `# ${skill.name}\n\n${skill.description}\n\n${skill.body}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <SeoHead
        title={skill.name}
        description={skill.description}
        path={locale === "zh" ? `/skills/${skill.slug}` : `/en/skills/${skill.slug}`}
      />
      <section className="detail-hero">
        <div>
          <p className="eyebrow">{skill.category}</p>
          <h1>{skill.name}</h1>
          <p className="lead">{skill.description}</p>
          <div className="detail-actions">
            <button className="btn" type="button" onClick={handleCopy}>
              {copied ? t(locale, "detailCopied") : t(locale, "detailCopy")}
            </button>
            <span className="detail-path">{skill.path}</span>
          </div>
        </div>
      </section>

      <section className="section detail-body">
        {skill.useCases.length > 0 && (
          <div className="use-cases">
            <h2>{t(locale, "detailUseCases")}</h2>
            <ul>
              {skill.useCases.map((useCase) => (
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
