import Link from "next/link";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale } from "../lib/paths";
import { getCategoryLabel } from "../lib/categories";

export default function SkillCard({ skill }) {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");
  const isZh = locale === "zh";

  const displayName = isZh && skill.nameZh ? skill.nameZh : skill.name;
  const displayDesc = isZh && skill.descriptionZh ? skill.descriptionZh : skill.description;
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
