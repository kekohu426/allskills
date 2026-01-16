import { useRouter } from "next/router";
import SeoHead from "../../components/SeoHead";
import { getAllPosts, getPostBySlug } from "../../lib/blog";
import { markdownToHtml } from "../../lib/markdown";
import { getLocaleFromPath } from "../../lib/paths";
import site from "../../data/site.json";

export default function BlogDetail({ post, html, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");
  const isZh = locale === "zh";
  const canonicalPath = isZh ? `/blog/${post.slug}` : `/en/blog/${post.slug}`;
  const canonicalUrl = `${site.domain}${canonicalPath}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: isZh ? "zh-CN" : "en",
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      author: {
        "@type": "Organization",
        name: "AllSkills",
        url: site.domain
      },
      publisher: {
        "@type": "Organization",
        name: "AllSkills",
        url: site.domain
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isZh ? "首页" : "Home",
          item: site.domain
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isZh ? "博客" : "Blog",
          item: `${site.domain}${isZh ? "/blog" : "/en/blog"}`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: canonicalUrl
        }
      ]
    }
  ];

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.description}
        path={canonicalPath}
        ogType="article"
        jsonLd={jsonLd}
      />
      <section className="detail-hero">
        <div>
          <p className="eyebrow">{post.date}</p>
          <h1>{post.title}</h1>
          <p className="lead">{post.description}</p>
        </div>
      </section>
      <section className="section detail-body">
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, "zh");
  const html = markdownToHtml(post.body);

  return {
    props: {
      post,
      html
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts("zh");
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: false
  };
}
