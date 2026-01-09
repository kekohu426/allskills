import SeoHead from "../../components/SeoHead";
import SkillCard from "../../components/SkillCard";
import { getAllSkills, getCategories } from "../../lib/skills";
import { useRouter } from "next/router";
import { t } from "../../lib/i18n";
import { getLocaleFromPath } from "../../lib/paths";
import { useMemo } from "react";

export default function SkillsPage({ skills, categories, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const query = typeof router.query.q === "string" ? router.query.q.trim() : "";
  const filtered = useMemo(() => {
    if (!query) return skills;
    const lower = query.toLowerCase();
    return skills.filter((skill) => {
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
  }, [query, skills]);

  return (
    <>
      <SeoHead
        title={t(locale, "skillsTitle")}
        description={t(locale, "skillsSubtitle")}
        path={locale === "zh" ? "/skills" : "/en/skills"}
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
          {categories.map((category) => (
            <span key={category.name} className="pill">
              {category.name} · {category.items.length}
            </span>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="grid">
          {filtered.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const categories = getCategories(skills);

  return {
    props: {
      skills,
      categories
    }
  };
}
