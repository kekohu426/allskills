import SeoHead from "../../components/SeoHead";
import site from "../../data/site.json";

const VALUE_PROPS = [
  {
    title: "📦 扩展能力",
    desc: "Cowork 开箱即用，但 Skills 让它从“通用工具”变成“领域专家”。装上 pdf skill，它就是文档专家；装上 data-viz，它就是数据分析师。"
  },
  {
    title: "⚡ 提升效率",
    desc: "配置 5-6 个常用 Skills，处理复杂任务（如月报、报销）的速度可提升 3 倍以上。告别繁琐的手动操作。"
  },
  {
    title: "🎯 一次配置，永久复用",
    desc: "Skills 安装后会自动驻留在你的 Claude 环境中。无需每次重复输入冗长的 Prompt，只需说出需求，Claude 自动调用对应能力。"
  }
];

const SKILL_SECTIONS = [
  {
    id: "office-suite",
    title: "1. 📄 文档处理 Skills (Office Suite)",
    desc: "处理日常办公文档，告别手动复制粘贴与排版苦恼。",
    skills: [
      {
        name: "PDF Processor",
        desc: "提取表格数据、合并/拆分文档、填写表单",
        scene: "财务报表提取、合同整理",
        command: "/plugin install pdf",
        query: "pdf"
      },
      {
        name: "Excel Automation",
        desc: "创建复杂表格、编写公式、生成透视表",
        scene: "销售数据汇总、库存管理",
        command: "/plugin install xlsx",
        query: "xlsx"
      },
      {
        name: "Word Creator",
        desc: "根据大纲生成结构化文档、自动排版",
        scene: "项目周报、合同起草",
        command: "/plugin install docx",
        query: "docx"
      },
      {
        name: "PowerPoint Builder",
        desc: "自动生成演示文稿、智能布局",
        scene: "会议汇报、方案演示",
        command: "/plugin install pptx",
        query: "pptx"
      }
    ]
  },
  {
    id: "file-management",
    title: "2. 🗂️ 文件管理 Skills (File Management)",
    desc: "拯救你的“下载”文件夹，让文件井井有条。",
    skills: [
      {
        name: "File Organizer",
        desc: "智能识别文件内容，按日期/类型/项目自动归档",
        scene: "整理下载文件夹、素材库",
        command: "/plugin install file-organizer",
        query: "file-organizer"
      },
      {
        name: "Duplicate Finder",
        desc: "扫描并清理重复文件，释放空间",
        scene: "硬盘清理、版本去重",
        command: "/plugin install duplicate-finder",
        query: "duplicate-finder"
      },
      {
        name: "Media Manager",
        desc: "整理照片/视频，按拍摄时间或地点重命名",
        scene: "摄影素材整理",
        command: "/plugin install media-manager",
        query: "media-manager"
      }
    ]
  },
  {
    id: "data-analytics",
    title: "3. 📊 数据分析 Skills (Data & Analytics)",
    desc: "不懂 Python 也能做专业的数据分析。",
    skills: [
      {
        name: "Data Visualizer",
        desc: "自动推荐图表类型，生成高质量统计图 (PNG/SVG)",
        scene: "趋势分析、数据汇报",
        command: "/plugin install data-viz",
        query: "data-viz"
      },
      {
        name: "CSV Analyzer",
        desc: "快速清洗、筛选、聚合 CSV 数据",
        scene: "大数据预处理、日志分析",
        command: "/plugin install csv-tools",
        query: "csv-tools"
      },
      {
        name: "Report Generator",
        desc: "综合分析数据，生成包含见解的文字报告",
        scene: "市场调研、竞品分析",
        command: "/plugin install report-gen",
        query: "report-gen"
      }
    ]
  },
  {
    id: "productivity",
    title: "4. 💼 办公效率 Skills (Productivity)",
    desc: "把琐碎的行政工作交给 AI，专注于更有价值的事。",
    skills: [
      {
        name: "Receipt Analyzer",
        desc: "OCR 识别发票/收据，自动生成报销表格",
        scene: "差旅报销、家庭记账",
        command: "/plugin install receipt-analyzer",
        query: "receipt-analyzer"
      },
      {
        name: "Meeting Notes",
        desc: "从录音转录稿中提取决议、待办事项",
        scene: "会议纪要整理",
        command: "/plugin install meeting-minutes",
        query: "meeting-minutes"
      },
      {
        name: "Email Manager",
        desc: "批量生成个性化邮件草稿、提取邮件关键信息",
        scene: "客户联络、活动邀请",
        command: "/plugin install email-drafter",
        query: "email-drafter"
      }
    ]
  },
  {
    id: "content-creation",
    title: "5. ✍️ 内容创作 Skills (Content Creation)",
    desc: "灵感枯竭时的最佳帮手。",
    skills: [
      {
        name: "Content Writer",
        desc: "生成多维度大纲、SEO 优化、风格模仿",
        scene: "博客写作、公众号运营",
        command: "/plugin install content-strategist",
        query: "content-strategist"
      },
      {
        name: "Social Manager",
        desc: "将长文转换为推文、LinkedIn 帖子",
        scene: "社交媒体分发",
        command: "/plugin install social-media",
        query: "social-media"
      }
    ]
  }
];

const QUICK_STEPS = [
  {
    step: 1,
    title: "确认权限",
    desc: "确保你已订阅 Claude Max 计划（目前仅限 macOS 桌面版）。"
  },
  {
    step: 2,
    title: "选择新手组合",
    desc: "推荐先安装这三个，覆盖 80% 的日常需求：",
    items: ["pdf (文档处理)", "xlsx (表格处理)", "file-organizer (文件整理)"]
  },
  {
    step: 3,
    title: "安装 Skills",
    desc: "打开 Claude Desktop，切换到 Cowork 模式，直接在对话框输入：",
    code: ["/plugin install pdf", "/plugin install xlsx", "/plugin install file-organizer"]
  },
  {
    step: 4,
    title: "授权文件夹",
    desc: "点击输入框上方的文件夹图标，选择一个你想要处理的文件夹（建议先用一个测试文件夹）。"
  },
  {
    step: 5,
    title: "开始使用",
    desc: "直接用自然语言下达指令：",
    example: "\"@pdf 帮我提取这个 PDF 第 5 页的表格数据，保存为 CSV。\""
  }
];

const CASE_STUDY = {
  title: "💡 真实案例：一键搞定月度报告",
  scenario: "场景：作为市场部经理，你每月要生成一份包含数据分析、趋势图表和文字总结的月报。",
  traditional: {
    title: "传统流程 😫：",
    steps: [
      "手动从各个文件中复制数据（30 分钟）",
      "在 Excel 里做透视表和图表（40 分钟）",
      "把图表截图贴到 Word 里（20 分钟）",
      "写文字分析（50 分钟）"
    ],
    total: "总耗时：2 小时 20 分钟"
  },
  cowork: {
    title: "使用 Cowork + Skills 😎：",
    steps: ["对 Claude 说：“读取 /data 文件夹，生成 Q1 市场分析报告”"],
    auto: ["xlsx Skill 处理数据", "data-viz Skill 生成图表", "docx Skill 组织成报告"],
    total: "总耗时：8 分钟（你只需要最后审阅一下）",
    gain: "效率提升：1650%"
  }
};

const FAQ = [
  {
    q: "这些 Skills 都是免费的吗？",
    a: "是的。大部分是开源的（Apache 2.0），部分 Anthropic 官方 Skills（如 pdf/xlsx/docx）是 Source-available（可用但不可商用）。你可以在 AllSkills.cn 免费获取。"
  },
  {
    q: "可以同时使用多个 Skills 吗？",
    a: "可以！Cowork 的强大之处就在于它能自动协调多个 Skills。例如，它可以用 pdf 提取数据，然后传给 xlsx 做表，最后用 email 发送。"
  },
  {
    q: "Skills 会消耗更多 Token 吗？",
    a: "会占用少量 Token 用于加载 Skill 定义，但 Anthropic 使用了“渐进式加载”技术，只有当 Skill 真正被调用时才会消耗较多 Token，整体影响可控。"
  },
  {
    q: "安装后如何激活 Skill？",
    a: "完全自动。当你的任务描述匹配某个 Skill 的功能时，Claude 会自动决定使用它。如果你想确保它使用某个 Skill，也可以用 @skill-name 显式调用。"
  },
  {
    q: "在哪里找到更多 Skills？",
    a: "AllSkills.cn 收集了目前最全的 Skills 目录，并且每周持续更新。"
  }
];

const READING_LIST = [
  {
    title: "📖 Cowork 必装的 10 个 Skills：让 AI 办公效率提升 3 倍 - 深度解析本文推荐的 Skills",
    href: "/blog"
  },
  {
    title: "📖 Document-Driven Development 完全指南 - 进阶用户的开发工作流",
    href: "/blog/document-driven-development"
  },
  {
    title: "📖 Claude Skills 完全指南 - 从入门到精通",
    href: "/blog"
  }
];

export default function CoworkSkillsLanding() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Cowork 必备技能库：从新手到高手的完整工具箱",
      description:
        "精选 20+ 个最适合 Cowork 的 Skills，覆盖文档处理、数据分析、文件整理与内容创作，让 AI 成为真正的数字同事。",
      inLanguage: "zh-CN",
      mainEntityOfPage: `${site.domain}/landing/cowork-skills`,
      url: `${site.domain}/landing/cowork-skills`,
      keywords: ["Cowork", "Skills", "Claude", "AI 助手", "办公效率", "技能库"]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Cowork Skills 5 分钟快速上手",
      step: QUICK_STEPS.map((step) => ({
        "@type": "HowToStep",
        name: step.title,
        text: step.desc
      }))
    }
  ];

  return (
    <>
      <SeoHead
        title="Cowork 必备技能库：从新手到高手的完整工具箱"
        description="精选 20+ 个最适合 Cowork 的 Skills，覆盖文档处理、数据分析、文件整理与内容创作，让 AI 成为真正的数字同事。"
        path="/landing/cowork-skills"
        keywords="Cowork, Skills, Claude, 数字同事, 办公效率, 技能库"
        jsonLd={jsonLd}
        ogType="article"
      />

      <section className="cowork-hero">
        <div className="cowork-hero__inner">
          <div className="cowork-hero__content">
            <p className="eyebrow">Landing</p>
            <h1>Cowork 必备技能库：从新手到高手的完整工具箱</h1>
            <p className="cowork-hero__lead">Cowork 刚发布 2 天，你可能还在摸索它到底能做什么。</p>
            <p className="cowork-hero__lead">
              这个页面精选了 20+ 个最适合 Cowork 的 Skills，帮你快速上手。从文档处理到数据分析，从文件整理到内容创作，这些技能包能让 AI 真正成为你的“数字同事”，而非仅仅是一个聊天机器人。
            </p>
            <div className="cowork-hero__actions">
              <a className="btn btn--primary" href="/skills/">
                浏览所有 Skills
              </a>
              <a className="btn btn--secondary" href="/blog/">
                阅读 Cowork 教程
              </a>
            </div>
          </div>
          <div className="cowork-hero__panel">
            <div className="cowork-hero__panel-inner">
              <div className="cowork-hero__metric">
                <span>精选</span>
                <strong>20+ Skills</strong>
              </div>
              <div className="cowork-hero__metric">
                <span>覆盖</span>
                <strong>5 大场景</strong>
              </div>
              <div className="cowork-hero__metric">
                <span>组合建议</span>
                <strong>5-6 个常用 Skills</strong>
              </div>
              <div className="pill-row">
                <span className="pill">文档处理</span>
                <span className="pill">文件管理</span>
                <span className="pill">数据分析</span>
                <span className="pill">办公效率</span>
                <span className="pill">内容创作</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section cowork-section">
        <h2>为什么需要 Skills？</h2>
        <div className="cowork-feature-grid">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className="cowork-feature-card">
              <h3>{prop.title}</h3>
              <p>{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section cowork-section" id="skills">
        {SKILL_SECTIONS.map((section) => (
          <div key={section.id} className="cowork-skill-section">
            <div className="cowork-skill-section__header">
              <h3>{section.title}</h3>
              <p>{section.desc}</p>
            </div>
            <div className="cowork-table">
              <table>
                <thead>
                  <tr>
                    <th>Skill 名称</th>
                    <th>功能描述</th>
                    <th>适用场景</th>
                    <th>安装命令</th>
                    <th>详情</th>
                  </tr>
                </thead>
                <tbody>
                  {section.skills.map((skill) => (
                    <tr key={skill.name}>
                      <td>
                        <strong>{skill.name}</strong>
                      </td>
                      <td>{skill.desc}</td>
                      <td>{skill.scene}</td>
                      <td>
                        <code>{skill.command}</code>
                      </td>
                      <td>
                        <a href={`/skills/?q=${encodeURIComponent(skill.query)}`}>查看</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      <section className="section cowork-section" id="quick-start">
        <h2>🚀 5 分钟快速上手</h2>
        <div className="cowork-steps">
          {QUICK_STEPS.map((step) => (
            <div key={step.step} className="cowork-step">
              <div className="cowork-step__num">Step {step.step}</div>
              <div className="cowork-step__content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {step.items && (
                  <ul>
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {step.code && (
                  <div className="cowork-code">
                    <pre>
                      <code>{step.code.join("\n")}</code>
                    </pre>
                  </div>
                )}
                {step.example && (
                  <div className="cowork-quote">
                    <span>{step.example}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section cowork-section cowork-case">
        <h2>{CASE_STUDY.title}</h2>
        <p className="cowork-case__intro">{CASE_STUDY.scenario}</p>
        <div className="cowork-case__grid">
          <div className="cowork-case__card">
            <h3>{CASE_STUDY.traditional.title}</h3>
            <ul>
              {CASE_STUDY.traditional.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <p className="cowork-case__total">{CASE_STUDY.traditional.total}</p>
          </div>
          <div className="cowork-case__card cowork-case__card--highlight">
            <h3>{CASE_STUDY.cowork.title}</h3>
            <ul>
              {CASE_STUDY.cowork.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            <div className="cowork-case__auto">
              <p>Cowork 自动调用：</p>
              <ul>
                {CASE_STUDY.cowork.auto.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <p className="cowork-case__total">{CASE_STUDY.cowork.total}</p>
            <p className="cowork-case__gain">{CASE_STUDY.cowork.gain}</p>
          </div>
        </div>
      </section>

      <section className="section cowork-section">
        <h2>常见问题 (FAQ)</h2>
        <ul className="faq-list">
          {FAQ.map((item) => (
            <li key={item.q}>
              <strong>{item.q}</strong>
              <p>{item.a}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section cowork-section">
        <h2>📚 延伸阅读</h2>
        <div className="cowork-reading">
          {READING_LIST.map((item) => (
            <a key={item.title} className="cowork-reading__card" href={item.href}>
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section cowork-section">
        <div className="cowork-cta">
          <h2>🎯 开始打造你的 AI 工作流</h2>
          <p>Cowork + 合适的 Skills = 办公效率革命。不要让你的 Claude 只是一个聊天机器人。</p>
          <div className="cowork-cta__actions">
            <a className="btn btn--primary" href="/skills/">
              👉 浏览所有 Skills 目录
            </a>
            <a className="btn btn--secondary" href="/blog/">
              👉 查看 Cowork 深度教程
            </a>
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="about-content">
          <h2>关于 AllSkills</h2>
          <p>
            我们致力于收集和整理高质量的 Claude Skills，帮助你构建最强大的 AI 助手。每周更新 |
            中文文档 | 社区驱动
          </p>
        </div>
      </section>
    </>
  );
}
