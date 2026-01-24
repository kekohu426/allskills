import CollectionsPage, { getStaticProps } from "../collections";

export { getStaticProps };

export default function HiCollections(props) {
  return <CollectionsPage {...props} forcedLocale="hi" />;
}
