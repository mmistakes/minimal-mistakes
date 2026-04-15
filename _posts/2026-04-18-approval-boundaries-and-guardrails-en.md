---
layout: single
title: "Harness Engineering 09. Agent Systems Need Approval Boundaries and Guardrails"
lang: en
translation_key: approval-boundaries-and-guardrails
date: 2026-04-18 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, harness-engineering, guardrail, approval, mcp]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/approval-boundaries-and-guardrails/
---

If a system has many rules and still feels unsafe, the missing piece is often the boundary. A team may have role separation, verification rules, and good documentation principles, yet some actions still execute too easily and some inputs are trusted too quickly. That is why this post focuses on the difference between good operating documents and safe execution boundaries, and on why approval boundaries and guardrails need to be part of an agent system from the beginning.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## What Is an Approval Boundary?

An approval boundary defines where an agent may act on its own and where human approval becomes mandatory. This is more than a permission toggle. It is a design decision about where responsibility changes hands.
Documented fact: OpenAI documents agent approvals as a distinct security layer, and Anthropic documents permissions as the layer that defines what actions are allowed([Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Claude permissions](https://code.claude.com/docs/en/permissions))

The easiest examples are destructive actions. Deletion, deployment, and large-scale modification all have consequences that are hard to undo or broad in impact. A change that overwrites hundreds of files, deploys to production, or deletes existing data should usually require human approval before it proceeds. Writing "be careful" in documentation is not the same thing as making the system stop until a person approves the action.

## What Do Guardrails Prevent?

What I mean here by guardrails is a broad practical label rather than a perfectly standardized vendor term. Official documentation often breaks this down into more specific mechanisms such as permissions, hooks, input or output guardrails, and trust verification. But the shared idea is still the same: mechanisms that stop an agent before it goes too far in the wrong direction or that limit risky flows. If approval boundaries define where escalation is required, guardrails define what kinds of actions or flows are not freely allowed in the first place.
Documented fact: OpenAI explains guardrails, policy checks, and execution limits in its safety and sandboxing docs, while Anthropic explains control points through hooks, sandboxing, and security guidance([Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety), [OpenAI sandboxing](https://developers.openai.com/codex/concepts/sandboxing), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing), [Claude security](https://code.claude.com/docs/en/security))
Interpretation: in this post, `guardrail` is a practical umbrella term that groups those mechanisms together.

One clear example is preventing untrusted input from being treated as an executable instruction. External documents, issue bodies, web content, and data arriving through connectors or MCP can all be useful context. But they should not directly push agent behavior as if they were system instructions. A sentence found in an outside document should not immediately lead to deletion, deployment, or privilege expansion. External text can provide context, but it should not automatically inherit execution authority.

## Where Does This Matter Most?

Approval and guardrails matter especially in three areas.
Interpretation: the priority ordering in this section is my own operating judgment. The official docs still support the general direction by treating risky tool use, outside input, permission boundaries, and sandboxing as separate safety concerns([Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude sandboxing](https://code.claude.com/docs/en/sandboxing))

First, destructive action. Deletion, forceful overwrite, bulk editing, and deployment need clear approval boundaries. Second, external data and untrusted input. This is exactly why outside text should not be treated as direct execution guidance. It may be a factual claim or a suggestion, but it is not authority. Third, connector and MCP usage. In those cases, the system should at least record what was read, which tool was called, and how the result influenced the final decision.

For connector or MCP usage, a minimal log often helps: `source`, `tool_name`, `query_or_resource`, `timestamp`, and `decision_usage`. This is not a formal standard schema so much as a practical example of the minimum data that helps trace why external input led to a particular action. The important point is not merely that an external connector was used, but that its impact on the decision path remains visible.

## What I Came to See as More Important, Later

Early on, I spent more attention on role separation, verification, and documentation rules. Those questions were easier to see first: who should do what, which tests should exist, and which documents should be updated. Approval and guardrails felt more like optional additions that could be refined later.
Interpretation: this section describes how I came to rank approval boundaries and guardrails more highly. The factual anchor is that approvals, permissions, hooks, and sandboxing are all documented as separate operating layers([Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [OpenAI hooks](https://developers.openai.com/codex/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions), [Claude hooks](https://code.claude.com/docs/en/hooks))

Over time, it became much clearer that they were not optional at all. Even with good rules, risky actions can happen too easily if the approval boundary is empty. If guardrails are weak, outside input can end up carrying more weight than intended. A good operating document and a safe execution boundary are not the same thing.

## Wrap-up

Any agent-first operating document needs approval boundaries and guardrails alongside it. You have to define which tool calls require human approval, where destructive actions must stop, how untrusted text and outside input should be handled, and what needs to be recorded when connectors or MCP are used. In harness engineering, the goal is not just to write many rules, but to make sure those rules operate inside safe execution boundaries.

The next post will turn this into a practical transition roadmap. The question there is how to move from document-centered operations toward an observable harness in a realistic sequence.

## One-Sentence Summary

Good operating rules alone do not make an agent system safe; approval boundaries and guardrails must be designed as part of the execution boundary from the start.

## Preview of the Next Post

The next post will look at a practical roadmap for moving from document-centered operations to an observable harness. The problems in this series are not isolated issues; in practice they form a transition path that has to be handled step by step. So the next piece will focus on sequencing: what should move out of documents first, what should be lifted into schema and eval, and what should be strengthened through trace and guardrails. The goal is not to create a perfect harness all at once, but to move toward one realistically. That is where the series shifts from concept explanation into practical adoption order.

## Sources and references

- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- OpenAI, [Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety)
- Anthropic, [Permissions](https://code.claude.com/docs/en/permissions)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Sandboxing](https://code.claude.com/docs/en/sandboxing)
- Anthropic, [Security](https://code.claude.com/docs/en/security)
