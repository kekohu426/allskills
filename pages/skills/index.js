import fs from "fs";
import path from "path";
import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { compactSkill, getAllSkills, getCategories } from "../../lib/skills";
import { useRouter } from "next/router";
import { t } from "../../lib/i18n";
import { getLocaleFromPath } from "../../lib/paths";
import { getCategoryLabel } from "../../lib/categories";
import { useMemo, useEffect, useState } from "react";
import site from "../../data/site.json";

export default function SkillsPage({ skills, categories, forcedLocale, totalCount }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const INITIAL_VISIBLE = 24;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [allSkills, setAllSkills] = useState(skills);
  const [loaded, setLoaded] = useState(false);
  const query = typeof router.query.q === "string" ? router.query.q.trim() : "";

  useEffect(() => {
    if (loaded || query) return;
    fetch("/skills-compact.json")
      .then((res) => res.json())
      .then((data) => {
        setAllSkills(data);
        setLoaded(true);
      })
      .catch(() => {});
  }, [loaded, query]);
  const filtered = useMemo(() => {
    if (!query) return allSkills;
    const lower = query.toLowerCase();
    return allSkills.filter((skill) => {
      const haystack = [
        skill.name,
        skill.description,
        skill.category,
        ...(skill.tags || [])
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(lower);
    });
  }, [query, allSkills]);

  useEffect(() => {
    setVisibleCount(query ? filtered.length : INITIAL_VISIBLE);
  }, [query, filtered, INITIAL_VISIBLE]);

  const visibleSkills = query ? filtered : filtered.slice(0, visibleCount);
  const hasMore = !query && visibleCount < filtered.length;

  const keywordSet = new Set();
  visibleSkills.forEach((skill) => {
    if (skill.category) keywordSet.add(skill.category);
    (skill.tags || []).forEach((tag) => keywordSet.add(tag));
  });
  const keywords = Array.from(keywordSet).join(", ");

  const basePath = locale === "zh" ? "/skills" : "/en/skills";
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.slice(0, 50).map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: locale === "zh" && skill.nameZh ? skill.nameZh : skill.name,
      url: `${site.domain}${basePath}/${skill.slug}`
    }))
  };

  return (
    <>
      <SeoHead
        title={t(locale, "skillsTitle")}
        description={t(locale, "skillsSubtitle")}
        path={locale === "zh" ? "/skills" : "/en/skills"}
        keywords={keywords}
        jsonLd={itemListJsonLd}
      />
      <section className="page-hero">
        <div>
          <h1>{t(locale, "skillsTitle")}</h1>
          <p>{t(locale, "skillsSubtitle")}</p>
        </div>
        {query && (
          <div className="search-result">
            搜索关键词 “{query}” 共 {filtered.length} 个结果
          </div>
        )}
        <div className="pill-row">
          {categories.map((category) => {
            const displayName = getCategoryLabel(category.name, locale);
            return (
              <span key={category.name} className="pill">
                {displayName} · {category.items.length}
              </span>
            );
          })}
        </div>
      </section>
      <section className="section">
        <div className="grid">
          {visibleSkills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
        {hasMore && (
          <div className="load-more">
            <button className="btn" type="button" onClick={() => setVisibleCount(filtered.length)}>
              {locale === "zh" ? "加载更多" : "Show more"}
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
  fs.writeFileSync(publicPath, JSON.stringify(skills), "utf8");

  return {
    props: {
      skills,
      categories,
      totalCount: skills.length
    }
  };
}
