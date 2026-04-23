---
layout: single
description: "Explains why Codex should be treated as a repository work agent, not just a code generator."
title: "Practical Codex 01. Treat Codex as a Work Execution Agent, Not a Code Generator"
lang: en
translation_key: codex-as-work-execution-agent
date: 2026-04-26 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, agent, harness-engineering, software-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/codex-as-work-execution-agent/
---

## Summary

The first mindset shift when using Codex in real projects is to stop treating it as a tool that only writes code snippets. Codex is more useful when you treat it as an agent that can read a repository, make changes, run checks, and leave reviewable work behind.

The conclusion is simple: do not ask only for a good answer. Define the goal, scope, constraints, and done criteria so Codex can perform work inside a clear boundary.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: analysis
- Test environment: No execution test. This is an operational interpretation based on official OpenAI Codex documentation.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

A common first use of AI tooling is to ask, "write this function" or "fix this bug." That can work for small examples. In a real repository, though, the more important questions are which files matter, what must not change, and which checks define completion.

This post separates the code-generator view from the work-agent view.

## Verified Facts

According to the official Code generation guide, Codex is a coding agent for software development that helps write, review, and debug code across IDE, CLI, web, mobile, and SDK-based CI/CD workflows. Source: [OpenAI, Code generation](https://developers.openai.com/api/docs/guides/code-generation)

According to the Codex CLI documentation, the CLI runs locally in a terminal and can read, change, and run code in the selected directory. Source: [OpenAI, Codex CLI](https://developers.openai.com/codex/cli)

According to the Codex web documentation, Codex cloud can work on background tasks in its own cloud environment and can run tasks in parallel. Source: [OpenAI, Codex web](https://developers.openai.com/codex/cloud)

According to Codex best practices, a good first prompt should include `Goal`, `Context`, `Constraints`, and `Done when`. Source: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

## Directly Reproduced Results

No direct reproduction was performed. This post does not measure Codex success rates on a specific repository. It connects the documented product capabilities with the harness engineering perspective used in this blog.

This post does not claim that Codex always produces a certain result. The reproducible target here is the operating structure for requesting project work.

## Interpretation / Opinion

My view is that treating Codex only as a code generator makes the request too thin. A generator centers on what text to output. A work execution agent also needs repository state, change boundaries, and validation.

A minimum Codex request should include the following:

```md
## Goal

What should change or be checked?

## Scope

Which files matter, which files may be edited, and which areas are off limits?

## Constraints

Which style, compatibility, security, performance, or documentation rules apply?

## Done when

Which tests, builds, or review conditions define completion?
```

Opinion: the human role is not merely to delegate lines of code. The human defines the meaning and boundary of the work. Codex then reads, changes, and verifies within that boundary.

In this series, a harness means the project-side operating structure Codex meets before it starts work. Durable rules live in `AGENTS.md`, execution defaults live in config, repeated procedures live in skills, and parallel delegation criteria guide subagent use. If harness engineering is new to you, start with [What Is Harness Engineering?](/en/ai/what-is-harness-engineering/) for the background.

This distinction also gives the rest of the series a place to stand. `AGENTS.md` stores repeated project guidance, config fixes execution defaults, skills reuse repeated procedures, and subagents are useful only when parallelism has a real payoff.

## Limits and Exceptions

For small algorithm examples or independent snippets, using Codex like a code generator may be enough. This post is aimed at live repositories, codebases with tests, and projects that lead into review and deployment.

Specific UI details, model defaults, and available interfaces may change. The factual claims in this post are limited to official documentation checked on 2026-04-23.

## References

- OpenAI, [Code generation](https://developers.openai.com/api/docs/guides/code-generation)
- OpenAI, [Codex CLI](https://developers.openai.com/codex/cli)
- OpenAI, [Codex web](https://developers.openai.com/codex/cloud)
- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
