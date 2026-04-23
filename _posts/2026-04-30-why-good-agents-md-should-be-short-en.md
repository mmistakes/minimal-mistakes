---
layout: single
description: "Explains why a long AGENTS.md increases token cost, duplicate instructions, and mixed responsibilities."
title: "Practical Codex 05. Why a Good AGENTS.md Should Be Short"
lang: en
translation_key: why-good-agents-md-should-be-short
date: 2026-04-30 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, agents-md, token-management, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/why-good-agents-md-should-be-short/
---

## Summary

Saying that `AGENTS.md` should be short is not minimalism for its own sake. If Codex reads it before each task, repeated and verbose material becomes context cost and can blur the rules that matter.

A good `AGENTS.md` keeps durable project rules in one place and moves detailed procedures to docs, config, skills, or CI. The point is not to remove information, but to separate responsibilities.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: analysis
- Test environment: No execution test. This is an operating-structure analysis based on official OpenAI Codex documentation.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

At first, a longer `AGENTS.md` feels safer. More rules seem like they should produce better adherence. But as the file grows, durable rules, one-time plans, procedure notes, tool settings, and review checklists mix together.

This post defines what should stay in `AGENTS.md` and what should move out.

## Verified Facts

According to official documentation, Codex reads `AGENTS.md` before doing work and stops adding instruction files once the combined size reaches `project_doc_max_bytes`, which defaults to 32 KiB. Source: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

According to official documentation, Codex config can set model, approval policy, sandbox settings, and MCP servers. Source: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

According to official documentation, Codex skills package reusable workflows with `SKILL.md`, scripts, references, and assets. Source: [OpenAI, Agent Skills](https://developers.openai.com/codex/skills)

## Directly Reproduced Results

No direct reproduction was performed. This post does not measure long versus short `AGENTS.md` behavior. It proposes responsibility boundaries from the documented instruction loading, config, and skill mechanisms.

## Interpretation / Opinion

My filter for keeping content in `AGENTS.md` is:

- Is it valid for almost every task?
- Does it change the first navigation or judgment?
- Is it an edit boundary or mandatory verification rule?
- Would it become clearer if moved to docs, config, or a skill?

Move these out when possible:

- One-off implementation plans
- Long tutorials and background explanations
- Frequently changing command options
- Repeated procedures such as release, review, or translation
- Full tool installation guides
- Historical decision logs

A useful split:

```md
- AGENTS.md: durable principles and boundaries
- docs/: detailed explanations and background
- .codex/config.toml: environment, model, sandbox, approval defaults
- skills/: repeatable procedures
- CI/scripts: automated checks and enforcement
```

Opinion: `AGENTS.md` should be closer to a project map and safety boundary than a complete handbook. It should help Codex find the right next document and work inside the right boundary.

## Limits and Exceptions

Regulated organizations or security-sensitive repositories may need more explicit root guidance. Even there, the key is separating mandatory rules from detailed procedures.

Over-compression can also remove important project context. "Short" means keeping durable rules that matter for live work, not chasing a fixed word count.

## References

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Agent Skills](https://developers.openai.com/codex/skills)
