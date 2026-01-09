const messages = {
  zh: {
    navHome: "首页",
    navSkills: "Skills",
    navCollections: "聚合页",
    navBlog: "Blog",
    heroTitle: "发现最好用最全的 AI Skills",
    heroSubtitle: "聚合、分类、讲清用法，让 AI Skill 可被搜索、可被复制、可被复用。",
    heroCta: "浏览所有 Skills",
    sectionFeatured: "精选技能",
    sectionCategories: "热门分类",
    sectionLatest: "最新更新",
    skillsTitle: "全部 Skills",
    skillsSubtitle: "浏览全部技能，点开查看详细用法与应用场景。",
    collectionsTitle: "分类聚合",
    collectionsSubtitle: "按主题聚合所有技能，便于检索与运营。",
    detailUseCases: "应用场景",
    detailCopy: "复制 Skill 内容",
    detailCopied: "已复制",
    blogTitle: "Blog",
    blogSubtitle: "发布用法教程、技能动态与行业观察。",
    footerTagline: "AllSkills.cn - Skill 的聚合目录"
  },
  en: {
    navHome: "Home",
    navSkills: "Skills",
    navCollections: "Collections",
    navBlog: "Blog",
    heroTitle: "Turn Skills into search traffic",
    heroSubtitle: "Organize, categorize, and explain how each skill is used so it is discoverable and reusable.",
    heroCta: "Browse all Skills",
    sectionFeatured: "Featured Skills",
    sectionCategories: "Popular Categories",
    sectionLatest: "Latest Updates",
    skillsTitle: "All Skills",
    skillsSubtitle: "Browse every skill and open the detail page for usage and scenarios.",
    collectionsTitle: "Collections",
    collectionsSubtitle: "Aggregate skills by theme for faster discovery.",
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
