import SkillDetail, { getStaticPaths, getStaticProps } from "../../skills/[slug]";

export { getStaticPaths, getStaticProps };

export default function HiSkillDetail(props) {
  return <SkillDetail {...props} forcedLocale="hi" />;
}
