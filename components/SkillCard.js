import Link from "next/link";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale } from "../lib/paths";

export default function SkillCard({ skill }) {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");

  return (
    <Link className="card" href={withLocale(`/skills/${skill.slug}`, locale)}>
      <div className="card__header">
        <span className="card__title">{skill.name}</span>
        <span className="card__pill">{skill.category}</span>
      </div>
      <p className="card__desc">{skill.description}</p>
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
