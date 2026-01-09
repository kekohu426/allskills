import Home, { getStaticProps } from "../index";

export { getStaticProps };

export default function EnHome(props) {
  return <Home {...props} forcedLocale="en" />;
}
