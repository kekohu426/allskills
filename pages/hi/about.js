import About, { getStaticProps } from "../about";

export { getStaticProps };

export default function HiAbout(props) {
  return <About {...props} forcedLocale="hi" />;
}
