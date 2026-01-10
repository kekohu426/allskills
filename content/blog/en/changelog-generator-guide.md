---
title: "Auto-Generate Release Notes with Changelog Generator Skill"
date: "2026-01-11"
description: "The shortest path from Git commits to structured release notes."
---

If you release frequently, writing Release Notes is one of the most time-consuming tasks. Changelog Generator Skill can automatically output structured release notes from commit records.

## Use Cases

- Weekly/monthly product releases
- Open source project version iterations
- Internal system update announcements

## Workflow

### Step 1: Copy the Skill Instructions

Find Changelog Generator on AllSkills.cn and copy the complete instructions.

### Step 2: Prepare Input

You can provide:

- Recent git log
- Merge request titles
- Issue list with labels

Example input:

```
Here are the git commits from the past 2 weeks, please generate release notes:
- feat: add export button for reports
- fix: handle null values in dashboard
- chore: update dependencies
- feat: support en locale
```

### Step 3: Specify Output Format

You can request:

- Standard version format (Added / Changed / Fixed)
- User-friendly tone
- Include risk notes and rollback suggestions

## Suggested Output Template

```
## Highlights
- ...

## Added
- ...

## Changed
- ...

## Fixed
- ...
```

## Summary

Changelog Generator is perfect for teams with regular release cycles, making Release Notes repeatable and standardized.
