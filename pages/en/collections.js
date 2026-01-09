import CollectionsPage, { getStaticProps } from "../collections";

export { getStaticProps };

export default function EnCollections(props) {
  return <CollectionsPage {...props} forcedLocale="en" />;
}
