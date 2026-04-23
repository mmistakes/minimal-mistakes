---
layout: single
description: "Explains why reliable Codex work needs project rules, permissions, and verification, not only better prompts."
title: "Practical Codex 02. Why Codex Needs a Harness"
lang: en
translation_key: why-codex-needs-a-harness
date: 2026-04-27 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, harness-engineering, agents-md, verification]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/why-codex-needs-a-harness/
---

## Summary

Using Codex reliably requires more than a better prompt. Each project has its own rules, permissions, validation commands, and repeated workflows.

In this post, a harness means the execution structure around Codex: `AGENTS.md`, config, sandboxing and approvals, tests and review, and skills. The point is to help Codex work against the same standards each time.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: analysis
- Test environment: No execution test. This is a structure analysis based on official OpenAI Codex documentation.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

The same request can produce different results depending on project state, loaded instructions, permission settings, and validation commands. Asking Codex in more detail helps, but it does not by itself create repeatability.

This post breaks the Codex harness into natural-language guidance, execution settings, verification procedures, and reusable workflows.

## Verified Facts

According to official documentation, Codex reads `AGENTS.md` before doing work and combines global and project guidance. Source: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

According to official documentation, Codex reads configuration from layers such as `~/.codex/config.toml` and repository `.codex/config.toml`, including model, approval, sandbox, and MCP settings. Source: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

According to official documentation, Codex security controls include sandbox mode and approval policy, and the documentation describes network access as off by default in relevant modes. Source: [OpenAI, Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

According to Codex best practices, you should ask Codex to write tests when needed, run relevant checks, confirm results, and review the diff. Source: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

## Directly Reproduced Results

No direct reproduction was performed. This post does not compare projects with and without a harness. It interprets documented Codex components as an operating structure.

## Interpretation / Opinion

My view is that a Codex harness has at least four layers:

- Guidance: persistent project rules and priorities, usually in `AGENTS.md`.
- Execution: config, sandbox, approval, and network access.
- Verification: tests, linting, type checks, builds, and diff review.
- Reuse: skills or scripts for repeated procedures.

The important part is not to put all four layers into one file. `AGENTS.md` can say which validation matters, but exact defaults for network access, approval policy, and repeated release workflows belong in config, CI, or skills.

A practical split looks like this:

```md
- AGENTS.md: repository purpose, edit boundaries, review standards
- .codex/config.toml: model, sandbox, approval, MCP defaults
- package.json / Makefile: verification commands
- skills/: repeatable writing, review, and release workflows
- CI: final automated verification
```

Opinion: a harness is not a sign that Codex cannot be trusted. It is a way to keep project knowledge in the project so the human does not have to repeat it every time.

## Limits and Exceptions

Not every project needs the same harness. A personal experiment may only need a prompt and manual review. A production service, security-sensitive codebase, or team repository needs stronger separation between rules, permissions, and verification.

Codex settings and defaults may change. This post treats only the official documentation checked on 2026-04-23 as verified fact.

## References

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
