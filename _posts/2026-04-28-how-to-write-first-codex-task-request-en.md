---
layout: single
description: "Shows how to write a first Codex task request with goal, scope, constraints, completion criteria, and verification."
title: "Practical Codex 03. How to Write Your First Codex Task Request"
lang: en
translation_key: how-to-write-first-codex-task-request
date: 2026-04-28 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, prompt, task-request, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/how-to-write-first-codex-task-request/
---

## Summary

A first Codex request does not need to be long. But if it lacks goal, context, constraints, and completion criteria, Codex has to infer important boundaries while reading the repository.

A good first request does not only say what to do. It says what to do, within which scope, under which constraints, and with which verification.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: tutorial
- Test environment: No execution test. This is a request-writing procedure based on official OpenAI Codex documentation and repository work patterns.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

If the first request is vague, Codex may explore too broadly, edit files that should remain unchanged, or finish without useful verification. In larger repositories, "figure it out" increases guesswork more than quality.

This post defines the minimum fields to include when assigning a first Codex task.

## Verified Facts

According to Codex best practices, a useful first prompt includes `Goal`, `Context`, `Constraints`, and `Done when`. Source: [OpenAI, Codex best practices](https://developers.openai.com/codex/learn/best-practices)

According to the Codex CLI documentation, Codex can inspect a repository, edit files, and run commands in the selected directory. Source: [OpenAI, Codex CLI](https://developers.openai.com/codex/cli)

According to Codex security documentation, sandbox mode and approval policy separately control what Codex can technically do and when it must ask before acting. Source: [OpenAI, Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

## Directly Reproduced Results

No direct reproduction was performed. This post does not compare success rates across prompt variants. It turns the official recommended structure and practical review criteria into a reusable request template.

## Interpretation / Opinion

### Tutorial Application Criteria

- Prerequisites: You have a repository Codex can access and one task to delegate.
- Reproduction steps: Fill in the template below, send it as the first request, and check the resulting change scope and verification report.
- Success criteria: The request includes `Goal`, `Context`, `Scope`, `Constraints`, `Verification`, and `Report`, and Codex leaves a reviewable result.
- Failure conditions: If the scope or verification command is unclear, do not ask for immediate implementation. Split the work into read-only investigation or a plan-first request.

My default first-request template is:

```md
## Goal

State in one sentence what should change or be checked.

## Context

List relevant files, error messages, docs, or similar implementations.

## Scope

Separate editable files from files that should not change.

## Constraints

State style, compatibility, security, performance, and documentation rules.

## Verification

List tests, builds, lint checks, or manual checks to run.

## Report

State how the final result should be reported.
```

Example:

```md
## Goal

Fix the wrong error message shown when login fails.

## Context

- Relevant files: `src/auth/login.ts`, `src/auth/errors.ts`, `tests/auth/login.test.ts`
- Reproduction: inactive accounts show "unknown error"

## Scope

- Editable: `src/auth/*`, `tests/auth/*`
- Do not edit: DB schema, public API response shape

## Constraints

- Keep existing error code names
- Add regression tests if missing

## Verification

- `npm test -- auth`
- Self-review the related diff

## Report

- Cause
- Changed files
- Verification run
- Remaining risk
```

Opinion: this structure helps Codex reason about "how far may I go?" as much as "what should I do?" `Scope` and `Verification` are especially important for reviewability.

## Limits and Exceptions

For exploratory tasks, the edit scope may not be clear at the start. In that case, ask Codex to investigate in read-only mode first, propose a plan, and wait for approval before changing files.

Some checks may be slow or depend on external services. If Codex cannot run a check, ask it to report why and what substitute evidence exists.

## References

- OpenAI, [Codex best practices](https://developers.openai.com/codex/learn/best-practices)
- OpenAI, [Codex CLI](https://developers.openai.com/codex/cli)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
