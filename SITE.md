# AllSkills.cn site

## Local dev

```bash
npm install
npm run dev
```

## Build static export

```bash
npm run sitemap
npm run build
npm run export
```

The static output will be in `out/`.

## Add new skills

1. Drop new skill folders under `external/anthropic-skills/skills/` with a `SKILL.md` frontmatter.
2. Optional: update `data/categories.json` and `data/skills-meta.json`.
3. Re-run the build.

English pages are generated automatically under `/en`.
