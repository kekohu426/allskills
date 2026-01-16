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
    skillsTitle: "Claude Skills 完整目录 | 90+ AI 技能一键复制",
    skillsSubtitle: "浏览 90+ 个 Claude AI 官方技能，覆盖设计、开发、写作、创意等场景。支持搜索筛选，一键复制，免费使用。",
    skillsH1: "全部 Claude Skills",
    collectionsTitle: "Claude Skills 分类目录 | 按类别浏览 AI 技能",
    collectionsSubtitle: "按分类浏览 Claude AI 技能库。包含设计、开发、写作、创意等 8 大类别，90+ 个 Skills，快速找到所需技能。",
    collectionsH1: "Skills 分类目录",
    detailUseCases: "应用场景",
    detailCopy: "复制 Skill 内容",
    detailCopied: "已复制",
    blogTitle: "Claude Skills 教程与指南 | AI 技能使用攻略",
    blogSubtitle: "Claude AI Skills 使用教程、最佳实践和行业观察。学习如何高效使用 AI 技能提升工作效率。",
    blogH1: "教程与指南",
    aboutTitle: "关于 AllSkills | Claude Skills 中文导航站",
    aboutSubtitle: "AllSkills.cn 是专注于 Claude AI Skills 的中文导航站，提供 90+ 个官方技能的浏览、搜索和一键复制服务。",
    aboutH1: "关于 AllSkills.cn",
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
    skillsTitle: "Claude Skills Directory | 90+ AI Skills Ready to Copy",
    skillsSubtitle: "Browse 90+ official Claude AI skills for design, development, writing, and creative work. Search, filter, and copy with one click.",
    skillsH1: "All Claude Skills",
    collectionsTitle: "Claude Skills by Category | Browse AI Skills by Type",
    collectionsSubtitle: "Browse Claude AI skills by category. 8 categories including Design, Dev Tools, Writing, Creative and more. Find the right skill fast.",
    collectionsH1: "Skills by Category",
    detailUseCases: "Use cases",
    detailCopy: "Copy Skill",
    detailCopied: "Copied",
    blogTitle: "Claude Skills Tutorials & Guides | AI Skill Tips",
    blogSubtitle: "Learn how to use Claude AI Skills effectively. Tutorials, best practices, and industry insights for AI-powered productivity.",
    blogH1: "Tutorials & Guides",
    aboutTitle: "About AllSkills | Claude Skills Directory",
    aboutSubtitle: "AllSkills.cn is a curated directory for Claude AI Skills, offering 90+ official skills with search, browse, and one-click copy.",
    aboutH1: "About AllSkills.cn",
    footerTagline: "AllSkills.cn - the skills directory"
  }
};

function t(locale, key) {
  const lang = messages[locale] ? locale : "zh";
  return messages[lang][key] || key;
}

module.exports = { t };
