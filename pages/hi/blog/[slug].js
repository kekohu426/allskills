import { useRouter } from "next/router";
import SeoHead from "../../../components/SeoHead";
import { getAllPosts, getPostBySlug } from "../../../lib/blog";
import { markdownToHtml } from "../../../lib/markdown";
import { getLocaleFromPath } from "../../../lib/paths";

export default function BlogDetail({ post, html, forcedLocale }) {
  const router = useRouter();
  const locale = forcedLocale || getLocaleFromPath(router.pathname || "/");

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.description}
        path={`/hi/blog/${post.slug}`}
        ogType="article"
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
  const post = getPostBySlug(params.slug, "en");
  const html = markdownToHtml(post.body);

  return {
    props: {
      post,
      html,
      forcedLocale: "hi"
    }
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts("en");
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: false
  };
}
