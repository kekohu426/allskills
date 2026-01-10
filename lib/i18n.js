const messages = {
  zh: {
    navHome: "首页",
    navSkills: "全部 Skills",
    navCollections: "分类浏览",
    navBlog: "Blog / 教程",
    heroTitle: "探索全部 Anthropic Skills",
    heroSubtitle: "聚合官方与社区技能库，让 AI 成为你的设计师、开发助手、内容创作者。",
    heroCta: "浏览全部 Skills",
    sectionFeatured: "精选技能",
    sectionCategories: "热门分类",
    sectionLatest: "最新更新",
    skillsTitle: "全部 Skills",
    skillsSubtitle: "浏览全部技能，点开查看详细用法与应用场景。",
    collectionsTitle: "分类",
    collectionsSubtitle: "按主题分类所有技能，便于检索与运营。",
    detailUseCases: "应用场景",
    detailCopy: "复制 Skill 内容",
    detailCopied: "已复制",
    blogTitle: "Blog",
    blogSubtitle: "发布用法教程、技能动态与行业观察。",
    footerTagline: "AllSkills.cn - Skill 的聚合目录"
  },
  en: {
    navHome: "Home",
    navSkills: "All Skills",
    navCollections: "Categories",
    navBlog: "Blog / Guides",
    heroTitle: "Explore Anthropic Skills",
    heroSubtitle: "Discover and organize skills with clear usage so they are easy to copy and reuse.",
    heroCta: "Browse all Skills",
    sectionFeatured: "Featured Skills",
    sectionCategories: "Popular Categories",
    sectionLatest: "Latest Updates",
    skillsTitle: "All Skills",
    skillsSubtitle: "Browse every skill and open the detail page for usage and scenarios.",
    collectionsTitle: "Categories",
    collectionsSubtitle: "Browse skills by category for faster discovery.",
    detailUseCases: "Use cases",
    detailCopy: "Copy Skill",
    detailCopied: "Copied",
    blogTitle: "Blog",
    blogSubtitle: "Publish usage guides, skill news, and SEO content.",
    footerTagline: "AllSkills.cn - the skills directory"
  }
};

function t(locale, key) {
  const lang = messages[locale] ? locale : "zh";
  return messages[lang][key] || key;
}

module.exports = { t };
