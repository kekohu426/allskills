import BlogDetail, { getStaticProps, getStaticPaths } from "../../blog/[slug]";

export { getStaticProps, getStaticPaths };

export default function EnBlogDetail(props) {
  return <BlogDetail {...props} forcedLocale="en" />;
}
