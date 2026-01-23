const CATEGORY_LABELS_ZH = {
  "Analytics": "分析",
  "Comms": "通讯",
  "Community": "社区",
  "Content": "内容",
  "Creative Coding": "创意编程",
  "Design Ops": "设计运营",
  "Dev Tools": "开发工具",
  "Docs & Writing": "写作",
  "Finance": "财务",
  "General": "通用",
  "Marketing": "营销",
  "Media": "媒体",
  "Productivity": "效率",
  "Research": "研究",
  "Testing": "测试",
  "Utilities": "工具合集"
};

const CATEGORY_LABELS_DE = {
  "Analytics": "Analyse",
  "Comms": "Kommunikation",
  "Community": "Community",
  "Content": "Inhalte",
  "Creative Coding": "Creative Coding",
  "Design Ops": "Design",
  "Dev Tools": "Dev Tools",
  "Docs & Writing": "Schreiben",
  "Finance": "Finanzen",
  "General": "Allgemein",
  "Marketing": "Marketing",
  "Media": "Medien",
  "Productivity": "Produktivität",
  "Research": "Recherche",
  "Testing": "Testing",
  "Utilities": "Tools"
};

function getCategoryLabel(name, locale) {
  if (locale === "zh") {
    return CATEGORY_LABELS_ZH[name] || name;
  }
  if (locale === "de") {
    return CATEGORY_LABELS_DE[name] || name;
  }
  return name;
}

module.exports = {
  CATEGORY_LABELS_ZH,
  CATEGORY_LABELS_DE,
  getCategoryLabel
};
