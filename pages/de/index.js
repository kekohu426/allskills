import Home, { getStaticProps } from "../index";

export { getStaticProps };

export default function DeHome(props) {
  return <Home {...props} forcedLocale="de" />;
}
