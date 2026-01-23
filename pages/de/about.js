import About, { getStaticProps } from "../about";

export { getStaticProps };

export default function DeAbout(props) {
  return <About {...props} forcedLocale="de" />;
}
