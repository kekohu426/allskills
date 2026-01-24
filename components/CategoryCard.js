import Link from "next/link";
import { useRouter } from "next/router";
import { getLocaleFromPath, withLocale, toAnchorId } from "../lib/paths";

export default function CategoryCard({ category }) {
  const router = useRouter();
  const locale = getLocaleFromPath(router.pathname || "/");
  const isDe = locale === "de";
  const isHi = locale === "hi";

  return (
    <Link
      className="category-card"
      href={withLocale(`/collections#${toAnchorId(category.name)}`, locale)}
    >
      <div className="category-card__title">{category.name}</div>
      <div className="category-card__count">
        {locale === "zh"
          ? `${category.items.length} 个 Skills`
          : isDe
            ? `${category.items.length} Skills`
            : isHi
              ? `${category.items.length} स्किल्स`
              : `${category.items.length} skills`}
      </div>
    </Link>
  );
}
