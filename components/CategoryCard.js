import Link from "next/link";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale, toAnchorId } from "../lib/paths";

export default function CategoryCard({ category }) {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");

  return (
    <Link
      className="category-card"
      href={withLocale(`/collections#${toAnchorId(category.name)}`, locale)}
    >
      <div className="category-card__title">{category.name}</div>
      <div className="category-card__count">{category.items.length} skills</div>
    </Link>
  );
}
