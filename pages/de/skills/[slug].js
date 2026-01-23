import SkillDetail, { getStaticPaths, getStaticProps } from "../../skills/[slug]";

export { getStaticPaths, getStaticProps };

export default function DeSkillDetail(props) {
  return <SkillDetail {...props} forcedLocale="de" />;
}
