import Home, { getStaticProps } from "../index";

export { getStaticProps };

export default function HiHome(props) {
  return <Home {...props} forcedLocale="hi" />;
}
