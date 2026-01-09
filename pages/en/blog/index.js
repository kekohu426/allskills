import BlogPage, { getStaticProps } from "../../blog/index";

export { getStaticProps };

export default function EnBlog(props) {
  return <BlogPage {...props} forcedLocale="en" />;
}
