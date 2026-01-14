---
title: "Document-Driven Development: From Chaos to Control in AI Coding"
date: "2026-01-14"
description: "Use a three-layer document system (intent.md, spec.md, plan.md) to reduce rework by 40% and generate high-quality code with Claude."
---

When coding with Claude, have you encountered these problems?

- Generated code is far from expectations
- Multiple iterations still don't get it right
- Larger projects become harder to control

The root cause: **You're not giving AI enough context**.

## What is Document-Driven Development

Document-Driven Development (DDD) is a methodology where you write documentation first, then generate code. Through a three-layer document system, AI understands your intent, specifications, and plan, producing code that matches your expectations.

## The Three-Layer Document System

### 1. intent.md - Intent Layer

Answers **WHY & FOR WHOM**

```markdown
# Project Intent

## Vision
One sentence describing what problem this solves

## Target Users
Who will use this product

## Core Problem
What pain points users currently face

## Success Criteria
How do we measure success

## Non-Goals
What we explicitly won't do
```

### 2. spec.md - Specification Layer

Answers **WHAT**

```markdown
# Product Specification

## Feature List
- Feature A: Description
- Feature B: Description

## User Journey
How users interact with the product

## Acceptance Criteria
Completion standards for each feature

## Non-Functional Requirements
Performance, security, availability requirements
```

### 3. plan.md - Plan Layer

Answers **HOW**

```markdown
# Technical Plan

## Tech Stack
Technologies to use

## Architecture Design
How the system is organized

## Data Model
Data structure design

## Implementation Steps
Phased implementation plan
```

## 5 Steps to Get Started

1. **Create /docs folder** - Create a documentation directory at project root
2. **Write intent.md** - Clarify why and for whom
3. **Write spec.md** - Define what and how users interact
4. **Write plan.md** - Plan the technical approach
5. **Generate code** - Let Claude generate code based on documentation

## When to Use DDD

**Highly Recommended:**
- New projects with unclear requirements (0 to 1)
- Feature development requiring iteration
- Team collaboration projects (docs as specs)
- Complex SaaS applications

**Can Skip:**
- Quick bug fixes (just fix it directly)
- Prototype validation (not sure what to build yet)
- One-off scripts (use and discard)

## Real Results

After using DDD:
- 40% reduction in rework time
- Significantly improved code quality
- Requirements no longer drift

## Get Started

Visit [Document-Driven Development Skill](/en/skills/document-driven-development) to get the complete Skill definition. Copy it to Claude and start using it.
