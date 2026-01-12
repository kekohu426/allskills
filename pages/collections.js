import React from "react";
import fs from "fs";
import path from "path";
import SeoHead from "../components/SeoHead";
import SkillCard from "../components/SkillCard";
import { compactSkill, getAllSkills, getCategories } from "../lib/skills";
import { useRouter } from "next/router";
import { t } from "../lib/i18n";
import { getLocaleFromPath, toAnchorId } from "../lib/paths";
import site from "../data/site.json";

export default function CollectionsPage({ categories, forcedLocale, totalCount }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const sorted = [...categories].sort((a, b) => b.items.length - a.items.length);
  const INITIAL_VISIBLE = 12;
  const [visible, setVisible] = React.useState(INITIAL_VISIBLE);

  const keywordSet = new Set();
  sorted.forEach((category) => {
    keywordSet.add(category.name);
    category.items.forEach((skill) => (skill.tags || []).forEach((tag) => keywordSet.add(tag)));
  });
  const keywords = Array.from(keywordSet).join(", ");

  const basePath = locale === "zh" ? "/collections" : "/en/collections";
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sorted.slice(0, 50).map((category, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: category.name,
      url: `${site.domain}${basePath}#${toAnchorId(category.name)}`
    }))
  };

  return (
    <>
      <SeoHead
        title={t(locale, "collectionsTitle")}
        description={t(locale, "collectionsSubtitle")}
        path={locale === "zh" ? "/collections" : "/en/collections"}
        keywords={keywords}
        jsonLd={itemListJsonLd}
      />
      <section className="page-hero">
        <div>
          <h1>{t(locale, "collectionsTitle")}</h1>
          <p>{t(locale, "collectionsSubtitle")}</p>
        </div>
      </section>
      <section className="section">
        {sorted.slice(0, visible).map((category) => (
          <div key={category.name} className="collection" id={toAnchorId(category.name)}>
            <div className="collection__header">
              <h2>{category.name}</h2>
              <span>{category.items.length} skills</span>
            </div>
            <div className="grid">
              {category.items.map((skill) => (
                <SkillCard key={skill.slug} skill={skill} />
              ))}
            </div>
          </div>
        ))}
        {visible < sorted.length && (
          <div className="load-more">
            <button className="btn" type="button" onClick={() => setVisible(sorted.length)}>
              {locale === "zh" ? "加载更多分类" : "Show more categories"}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export async function getStaticProps() {
  const allSkills = getAllSkills();
  const skills = allSkills.map(compactSkill);
  const categories = getCategories(skills);

  const publicPath = path.join(process.cwd(), "public", "skills-compact.json");
  if (!fs.existsSync(publicPath)) {
    fs.writeFileSync(publicPath, JSON.stringify(skills), "utf8");
  }

  return {
    props: {
      categories,
      totalCount: skills.length
    }
  };
}
