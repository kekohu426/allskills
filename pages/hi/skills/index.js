import SkillsPage, { getStaticProps } from "../../skills/index";

export { getStaticProps };

export default function HiSkills(props) {
  return <SkillsPage {...props} forcedLocale="hi" />;
}
