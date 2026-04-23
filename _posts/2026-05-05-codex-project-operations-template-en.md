---
layout: single
description: "A practical operating template that combines Codex task requests, AGENTS.md, config, skills, subagents, and verification."
title: "Practical Codex 10. A Project Operations Template for Codex"
lang: en
translation_key: codex-project-operations-template
date: 2026-05-05 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, operations-template, agents-md, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/codex-project-operations-template/
---

## Summary

Applying Codex to a project is not just about writing one good prompt. You need task requests, `AGENTS.md`, config, skills, subagent criteria, and a verification loop.

This post turns the previous nine posts into a minimum project operating template. The goal is not to create a huge rulebook, but to make repository work repeatable and reviewable.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: tutorial
- Test environment: No execution test. This is a template based on official OpenAI Codex documentation and the operating criteria from this series.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

Each part is manageable on its own: write `AGENTS.md`, configure defaults, create useful skills, and use subagents when needed. The difficulty starts when responsibilities overlap.

This post separates those responsibilities and provides a practical starting template.

## Verified Facts

According to Codex best practices, effective Codex use involves task context, `AGENTS.md`, configuration, MCP, skills, automation, validation, and review. Source: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

According to official documentation, `AGENTS.md` is a project guidance layer that Codex reads before work. Source: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

According to official documentation, Codex config can contain execution settings such as model, approval, sandbox, and MCP servers. Source: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

According to official documentation, skills package repeated procedures and references, while subagents can be explicitly requested for parallel workflows. Sources: [OpenAI, Agent Skills](https://developers.openai.com/codex/skills), [OpenAI, Subagents](https://developers.openai.com/codex/subagents)

## Directly Reproduced Results

No direct reproduction was performed. This post does not measure quality before and after applying the template to a real product repository. It is an application template derived from official documentation and the prior posts.

## Interpretation / Opinion

### Tutorial Application Criteria

- Prerequisites: The team or repository can define repeated task types, default checks, permission boundaries, and review criteria.
- Reproduction steps: Fill in the first task request template, minimal `AGENTS.md`, config candidates, skill candidates, subagent criteria, and completion report criteria, then remove overlapping responsibilities.
- Success criteria: You no longer need to repeat the same operating decisions in every prompt, and each rule has a clear home.
- Failure conditions: If you copy the template without adapting it to your CI, security policy, or deployment process, the template can drift away from the real working rules.

My minimum Codex project template is:

### 1. First Task Request Template

```md
## Goal

## Context

## Scope

## Constraints

## Verification

## Report
```

### 2. Minimal AGENTS.md

```md
# AGENTS.md

## Repository purpose

## First places to inspect

## Working rules

## Verification

## Review checklist
```

### 3. Config Candidates

```md
- Default model
- Sandbox mode
- Approval policy
- Network access
- MCP servers
- Project profile
```

### 4. Skill Candidates

```md
- Repeated writing workflow
- Repeated review workflow
- Release notes
- Migration checks
- Incident analysis reports
```

### 5. Subagent Criteria

```md
- Is the question independent?
- Can file ownership be split?
- Does parallelism actually save time?
- Is integration criteria clear?
- Is the token cost justified?
```

### 6. Completion Report

```md
- Change summary
- Changed files
- Verification run
- Verification not run, with reason
- Remaining risk
- Follow-up work
```

Opinion: this template is not a document for controlling Codex by adding more prose. It is a basic structure that prevents humans from repeating the same operating decisions every time. As projects grow, responsibility separation matters more than instruction volume.

## Limits and Exceptions

This template is only a starting point. Team security policy, CI structure, deployment process, and review culture should change the details.

Codex features, recommended models, and configuration methods may change. Recheck the official documentation before applying this after 2026-04-23.

## References

- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Agent Skills](https://developers.openai.com/codex/skills)
- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
