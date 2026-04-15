---
layout: single
title: "Harness Engineering 07. Turning Principles into Enforceable Rules"
lang: en
translation_key: from-principles-to-enforcement
date: 2026-04-16 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, enforcement]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/from-principles-to-enforcement/
---

Why do teams keep missing good rules even after those rules are written down clearly? That question appears quickly once you start thinking in harness-engineering terms. Principles written in documentation still matter, but both humans and agents can miss them in practice. That is why this post looks at the difference between writing a good rule in prose and making that rule actually enforceable.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## The Limit of Prose-Only Rules

Rules like "update the docs," "leave a handoff," or "track progress" are still useful as starting points. The problem is that prose-only rules describe direction, but they do not automatically prevent violations.
Interpretation: this section draws on my operating experience about why prose-only rules are easy to miss. The official docs expose hooks, approvals, permissions, and sandboxing precisely as layers that constrain or redirect execution([OpenAI hooks](https://developers.openai.com/codex/hooks), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

Take "update the docs" as an example. It is a good principle. But it still leaves open which changes require which docs, when an update is mandatory, and how omission will be detected. The more important question is not how many good rules exist, but whether those rules can be checked automatically.

## What Enforcement Means

Enforcement is the layer that lifts principles into system rules. It takes expectations written as sentences and turns them into hooks, lint rules, CI checks, or validation steps that run inside the actual workflow. Good documentation explains the standard. Enforcement makes the system stop, fail, or warn when that standard is missed.
Documented fact: OpenAI and Anthropic both document mechanisms that can block actions, require approval, or limit execution scope through hooks, approvals, permissions, and sandboxing([OpenAI hooks](https://developers.openai.com/codex/hooks), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

That is also the moment when a harness becomes stronger. Not when it accumulates more rules, but when those rules become automatically checkable. A principle that exists only in documentation is weaker than a principle that is validated during execution.

## What Kinds of Rules Can Move into Enforcement?

One representative example is a docs freshness check. If all you have is the natural-language rule "update the docs," omissions are easy. But if CI checks whether a change in a certain code path requires a corresponding documentation update, stale docs become a detectable failure instead of a vague operating issue.
Documented fact: OpenAI's agent safety guide discusses guardrails and policy checks, while Anthropic documents hooks, permissions, and sandboxing as concrete control points around execution([Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety), [OpenAI hooks](https://developers.openai.com/codex/hooks), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

A changed-path ownership check is another example in the same category. If some paths are supposed to be modified only by a certain team or role, that rule does not need to remain just a written expectation. It can become a check that compares changed files against ownership mapping. Then ownership-boundary violations show up in the system before they depend on reviewer intuition.

Handoff schema validation and missing-progress-field detection also fit this pattern. If a handoff must contain certain fields, the system can verify their presence. Instead of merely saying "track progress," the system can require a `status` or `progress` field in a work artifact and fail when it is missing.

These are not a standardized vendor taxonomy so much as representative ways to turn natural-language principles into detectable rules.

The point is not to automate everything at once. The point is to notice which rules are repeatedly missed and selectively promote those rules into enforceable system behavior.

## The Difference Between Documents and Systems That I Felt Directly

For a while, I also believed that if enough good rules were written down, agents would mostly follow them. "Leave a handoff," "update the docs," and "manage progress" were all reasonable rules, and they were necessary as operating principles. But later it became much clearer that they were still only principles. They were not mechanisms that automatically prevented failure.
Interpretation: this section is my own account of separating documentation from enforcement layers. The factual anchor is that hooks, approvals, permissions, and sandboxing are documented as separate execution-boundary mechanisms([OpenAI hooks](https://developers.openai.com/codex/hooks), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions))

That experience did not mean documents were useless. It meant documents and systems have different roles. Documents explain the direction. Enforcement makes deviations visible when the direction is missed.

## Wrap-up

Writing good principles in documentation is only the starting point. Agent systems can still miss prose-only rules in practice. That is why harness engineering should care less about the sheer number of rules and more about automatic checkability. The rules that matter repeatedly need to move into enforcement layers such as hooks, lint, CI, and validation.

The next post will go one step further. Instead of focusing only on what result came out, it will look at why the trace of how that result was produced often matters even more.

## One-Sentence Summary

Good principles start in documentation, but they become reliable only when they are lifted into enforcement layers like hooks, lint, CI, and validation.

## Preview of the Next Post

The next post will explore why trace matters more than the result alone. Two runs can produce the same output while reaching it through very different paths and decisions. In harness engineering, that traceability increasingly becomes central to debugging, evaluation, and improvement. So the next step is to look at why trace becomes a core asset rather than a side detail. Once principles move into enforcement, you need a way to see how that enforcement actually behaved in practice.

## Sources and references

- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Permissions](https://code.claude.com/docs/en/permissions)
- Anthropic, [Sandboxing](https://code.claude.com/docs/en/sandboxing)
