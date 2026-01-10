import SeoHead from "../../components/SeoHead";
import { getAllPosts } from "../../lib/blog";
import Link from "next/link";
import { useRouter } from "next/router";
import { t } from "../../lib/i18n";
import { getLocaleFromPath, withLocale } from "../../lib/paths";

export default function BlogPage({ posts, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");

  return (
    <>
      <SeoHead
        title={t(locale, "blogTitle")}
        description={t(locale, "blogSubtitle")}
        path={locale === "zh" ? "/blog" : "/en/blog"}
      />
      <section className="page-hero">
        <div>
          <h1>{t(locale, "blogTitle")}</h1>
          <p>{t(locale, "blogSubtitle")}</p>
        </div>
      </section>
      <section className="section">
        <div className="blog-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={withLocale(`/blog/${post.slug}`, locale)} className="blog-card">
              <p className="blog-card__eyebrow">{post.date}</p>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts("zh");

  return {
    props: {
      posts
    }
  };
}
