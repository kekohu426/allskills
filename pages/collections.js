import SeoHead from "../components/SeoHead";
import SkillCard from "../components/SkillCard";
import { getAllSkills, getCategories } from "../lib/skills";
import { useRouter } from "next/router";
import { t } from "../lib/i18n";
import { getLocaleFromPath, toAnchorId } from "../lib/paths";

export default function CollectionsPage({ categories, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const sorted = [...categories].sort((a, b) => b.items.length - a.items.length);

  return (
    <>
      <SeoHead
        title={t(locale, "collectionsTitle")}
        description={t(locale, "collectionsSubtitle")}
        path={locale === "zh" ? "/collections" : "/en/collections"}
      />
      <section className="page-hero">
        <div>
          <h1>{t(locale, "collectionsTitle")}</h1>
          <p>{t(locale, "collectionsSubtitle")}</p>
        </div>
      </section>
      <section className="section">
        {sorted.map((category) => (
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
      </section>
    </>
  );
}

export async function getStaticProps() {
  const skills = getAllSkills();
  const categories = getCategories(skills);

  return {
    props: {
      categories
    }
  };
}
