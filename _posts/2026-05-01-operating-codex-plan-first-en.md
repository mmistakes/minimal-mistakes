---
layout: single
description: "Explains how to run complex Codex tasks plan-first by clarifying scope, risk, and verification before edits."
title: "Practical Codex 06. Operating Codex Plan-First"
lang: en
translation_key: operating-codex-plan-first
date: 2026-05-01 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, planning, verification, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/operating-codex-plan-first/
---

## Summary

Codex does not need to edit immediately on every task. For broad or risky work, it is often better to ask for a plan first, review the scope and verification method, and only then move to implementation.

Plan-first operation is not about slowing everything down. It exposes goals, affected areas, risks, and checks before changes become expensive to unwind.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: tutorial
- Test environment: No execution test. This is a procedure based on official OpenAI Codex documentation and project operating patterns.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

Small edits can be done directly. Migrations, refactors, security changes, build-system changes, and deployment changes should often start with planning before file edits.

This post explains when plan-first is useful, what a plan should contain, and where human approval belongs.

## Verified Facts

According to Codex best practices, clear task context and structure are especially useful in large repositories or higher-stakes tasks. Source: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

According to the same guide, a first prompt should include goal, context, constraints, and completion criteria. Source: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

According to the same guide, Codex can be asked to create tests, run relevant checks, confirm results, and review the diff after making changes. Source: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

## Directly Reproduced Results

No direct reproduction was performed. This post does not compare plan-first prompts against immediate-edit prompts. It turns the documented request and validation loop into an operating procedure.

## Interpretation / Opinion

### Tutorial Application Criteria

- Prerequisites: You have a task goal, and the change may have broad or risky impact.
- Reproduction steps: Ask Codex not to edit yet, have it produce only a plan, then review the candidate files, exclusions, risks, and verification method. Move to implementation only after approval.
- Success criteria: Before files change, the goal, impact area, risky decisions, verification method, and human approval points are visible.
- Failure conditions: If the goal is vague or the human does not review the plan, plan-first can become just a longer answer rather than a control point.

My rule is to start plan-first when any of these are true:

- The change crosses several modules.
- Public APIs, database schema, auth, billing, or deployment configuration may be affected.
- Reverting a mistake would be expensive.
- Tests are weak and the impact area needs discovery.
- Several approaches require a decision.

Request example:

```md
Do not edit yet. Plan first.

Include:
- Restated goal
- Files to inspect
- Expected edit scope
- Risky change points
- Verification method
- Decisions that need human approval

After I approve the plan, proceed with implementation.
```

The plan should expose state, not become an essay:

```md
## Plan

- Goal:
- Candidate changes:
- Out of scope:
- Risks:
- Verification:
- Approval needed:
```

Opinion: the value of plan-first is not that it makes Codex passive. It separates human decisions from agent execution. Without that separation, Codex can make broad changes with good intent but weak boundaries.

## Limits and Exceptions

Plan-first for every task can slow down the workflow. Typos, small test additions, and single-file documentation edits can often be handled directly.

Plan-first does not guarantee safety. The plan itself must be reviewed, especially exclusions and verification.

## References

- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
