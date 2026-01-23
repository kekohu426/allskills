import SkillsPage, { getStaticProps } from "../../skills/index";

export { getStaticProps };

export default function DeSkills(props) {
  return <SkillsPage {...props} forcedLocale="de" />;
}
