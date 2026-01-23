import CollectionsPage, { getStaticProps } from "../collections";

export { getStaticProps };

export default function DeCollections(props) {
  return <CollectionsPage {...props} forcedLocale="de" />;
}
