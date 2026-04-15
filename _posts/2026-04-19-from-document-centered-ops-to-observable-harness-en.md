---
layout: single
title: "Harness Engineering 10. From Documents to an Observable Harness"
lang: en
translation_key: from-document-centered-ops-to-observable-harness
date: 2026-04-19 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, harness-engineering, roadmap, eval, trace, guardrail]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/from-document-centered-ops-to-an-observable-harness/
---

Writing longer documents is not the solution. That is where the entire series eventually lands. Files like `AGENTS.md` or `CLAUDE.md` can be useful starting points, but making them denser does not magically create a harness. In this final post, I want to gather the discussion into a practical roadmap for moving from document-centered operations to a harness that is observable and verifiable.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## If You Compress the Problem into One Sentence

The real issue was never that there were too few documents. It was that too much of the harness still lived only inside documents. When good principles remain only as prose, they are easy to miss. Handoffs drift, eval looks only at artifacts, and trace and guardrails remain too thin to stabilize the system.
Interpretation: this section is my own one-sentence summary of the series. The factual anchor is that the official docs already separate instruction files, hooks, eval, trace, and approvals into distinct operating layers. Source: [OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions)

## Core Principles of the Transition

The direction of change is actually straightforward. Responsibilities that were overloaded into documentation have to be redistributed across multiple layers.
Documented fact: the official docs already expose instruction, automation/hooks, evaluation, trace, and approval or permission as separate layers. Source: [OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions)
Interpretation: the transition principles in this post are my recommendation for turning those layers into an operating design.

1. Keep the project instruction file light and treat it as an entrypoint.
2. Split detailed operating documents into separate locations.
3. Structure handoff as schema.
4. Add agent workflow eval alongside product tests.
5. Lift repeated document rules into CI, hooks, or validation.
6. Preserve trace, not just outputs.
7. Define approval boundaries and guardrails.

If a team keeps solving problems by adding more prose, the result is more sentences like "update the docs," "leave a handoff," or "respect ownership." If the team instead separates roles and adds automatic checks, the instruction file gets shorter while outer layers emerge: docs freshness checks, handoff schema validation, changed-path ownership checks, and trace review. The difference is not document length. It is where the harness actually lives.

Taken together, the official documentation and case studies point to a broadly similar transition order across tools. Whether the example is Codex, Claude Code, or another agentic coding environment, the path still moves toward a lighter entrypoint and stronger outer layers for schema, enforcement, eval, trace, and guardrails.

## A Realistic Order of Adoption

In practice, this is easier to do as a gradual reconstruction than as one massive rewrite.
Interpretation: the adoption order here is my staged rollout recommendation. The official docs do not prescribe this exact sequence.

1. Lighten the project instruction file first. Leave only core expectations and reference paths.
2. Split detailed operating procedures into separate documents so explanation and system rules stop competing in the same place.
3. Introduce a handoff schema, even if it starts with only a few required fields.
4. Add at least one agent workflow eval such as wrong-owner routing, handoff completeness, or stale-doc detection.
5. Move repeatedly missed rules into CI or hook-based enforcement.
6. Define approval boundaries and guardrails as part of the execution model rather than as an afterthought.

## How Small Projects Can Start

Small projects can begin even more simply. A practical four-week transition plan might look like this.
Interpretation: the four-week plan is my proposal. The factual basis is simply that instruction, hooks, eval, trace, and approvals already exist as separate documented layers. Source: [OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)

1. Week 1: cut the instruction file in half and move detailed procedures into separate docs.
2. Week 2: introduce one handoff schema and one docs freshness check.
3. Week 3: add one agent workflow eval such as wrong-owner routing or stale-doc detection.
4. Week 4: define a minimal set of trace fields and approval boundaries.

The point is not to build a perfect system immediately. Smaller projects are often more tempted to pile everything into one control-plane document. In reality, they benefit even more from starting with a few small schemas, checks, and trace fields.

## How I Used to See the Problem, and How I See It Now

At first, I also tried to solve the problem by writing a better `AGENTS.md`. It seemed like better rules, more detailed role definitions, and more careful handoff and documentation guidance should make the system more stable. Over time, though, it became much clearer that the core issue was not adding more documentation, but redesigning the operating structure itself.

That shift is less about reflection and more about design. Writing documents still matters, but a harness only becomes a system once schema, enforcement, eval, trace, and guardrails enter the picture.

## Wrap-up

The main argument of the series is simple. Agent-system quality does not become stable because of a single prompt or a longer operating document. Instruction files should become lightweight entrypoints, while detailed operating behavior becomes testable and observable through schema, eval, enforcement, trace, and guardrails. The shift from document-centered operations to an observable harness is less a massive one-time redesign than a gradual reconstruction that keeps moving repeated failure points out of prose and into outer layers.

If I had to leave one final sentence, it would be this: do not start by writing more documentation; start by deciding what needs to become visible and checkable outside the document.

## One-Sentence Summary of the Series

Harness engineering is not about writing more guidance; it is about moving operating principles out of prose and into schema, eval, enforcement, trace, and guardrails so the system becomes observable and verifiable.

## Closing Thoughts

The best place to start is not by extending the instruction file, but by checking whether that file is carrying too many responsibilities already. After that, pick one rule that is repeatedly missed and turn it into a schema or a check. Even one structured handoff, one docs freshness check, or a few trace fields can noticeably change how stable the system feels. In a small project, it is usually better to move one shaky area into an outer layer than to attempt a total redesign. In that sense, the end of this series is closer to a starting line than a conclusion. What matters now is not more documentation, but an operating structure that is easier to observe and easier to verify.

## Sources and references

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Permissions](https://code.claude.com/docs/en/permissions)
