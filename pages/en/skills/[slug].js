import SkillDetail, { getStaticProps, getStaticPaths } from "../../skills/[slug]";

export { getStaticProps, getStaticPaths };

export default function EnSkillDetail(props) {
  return <SkillDetail {...props} forcedLocale="en" />;
}
