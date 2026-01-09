import SkillsPage, { getStaticProps } from "../../skills/index";

export { getStaticProps };

export default function EnSkills(props) {
  return <SkillsPage {...props} forcedLocale="en" />;
}
