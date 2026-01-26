import Link from "next/link";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale } from "../lib/paths";
import { getCategoryLabel } from "../lib/categories";

export default function SkillCard({ skill }) {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");

  const displayName =
    locale === "zh" && skill.nameZh
      ? skill.nameZh
      : locale === "de" && skill.nameDe
        ? skill.nameDe
        : locale === "hi" && skill.nameHi
          ? skill.nameHi
          : skill.name;
  const displayDesc =
    locale === "zh" && skill.descriptionZh
      ? skill.descriptionZh
      : locale === "de" && skill.descriptionDe
        ? skill.descriptionDe
        : locale === "hi" && skill.descriptionHi
          ? skill.descriptionHi
          : skill.description;
  const displayCategory = getCategoryLabel(skill.category, locale);

  return (
    <Link className="card" href={withLocale(`/skills/${skill.slug}`, locale)}>
      <div className="card__header">
        <span className="card__title">{displayName}</span>
        <span className="card__pill">{displayCategory}</span>
      </div>
      <p className="card__desc">{displayDesc}</p>
      {skill.tags && skill.tags.length > 0 && (
        <div className="card__tags">
          {skill.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </Link>
  );
}
