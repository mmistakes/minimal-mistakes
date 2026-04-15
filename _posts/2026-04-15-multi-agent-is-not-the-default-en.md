---
layout: single
title: "Harness Engineering 06. Multi-Agent Is Not the Default"
lang: en
translation_key: multi-agent-is-not-the-default
date: 2026-04-15 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, multi-agent]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/multi-agent-is-not-the-default/
---

It is easy to assume that more agents automatically make the system smarter. A planner can plan, an executor can implement, a verifier can review, and a doc-writer can update documentation. On paper, that looks disciplined and efficient. In practice, though, that division of labor is not always a win. That is why this post argues that multi-agent should not be treated as the default, but as a conditional strategy.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## Why Multi-Agent Looks Attractive

Multi-agent systems look organized. If roles are separated, responsibility seems clearer. If several agents can work at once, throughput seems likely to increase. The idea also feels intuitive because it resembles the structure of a human team.
Documented fact: both OpenAI and Anthropic officially document subagent support([OpenAI subagents](https://developers.openai.com/codex/subagents), [Claude Code subagents](https://code.claude.com/docs/en/sub-agents))

There are cases where that intuition is valid. For a large feature addition, real context separation can exist. A new payments feature, for example, may involve domain logic, frontend integration, validation scenarios, and documentation updates that are meaningfully different enough to separate. In those cases, role separation can line up with context separation and create real value.

## But What Costs Are Hidden Inside?

The problem appears when that structure becomes the default even for small tasks. Imagine a single-file change that still gets a planner, executor, verifier, and doc-writer attached to it. It looks systematic, but in practice it mostly increases orchestration cost. Every step now needs handoff, which means every step also creates another chance for handoff mistakes.
Interpretation: coordination cost, evaluation complexity, and trace difficulty are my operating observations. The official eval guide supports the general direction by saying that architecture choices themselves should be evaluated([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading))

Tracing becomes harder too. With a single agent, the reasoning path is mostly linear. In a multi-agent setup, you have to reconstruct which decision was made by whom. Quality ownership also becomes blurry. Was the planner wrong, did the executor cross scope, did the verifier miss something, or did the doc-writer leave stale docs behind? That ambiguity has a cost.

So multi-agent is not automatically a structure that reduces uncertainty. Used badly, it can increase uncertainty. If you route even small tasks through sub-agents by default, coordination starts to outweigh speed and the system becomes more complicated than it needs to be.

## When Is Multi-Agent Actually Justified?

That is why multi-agent should be a conditional strategy, not the default. At least three conditions should be present. First, the work should be large enough for parallelism to create a real advantage. Second, the context should be meaningfully separable, so each agent benefits from handling a different information set. Third, there should be an eval-backed reason to believe the decomposition helps. In other words, you should have evidence that quality or throughput is actually better than with a single-agent flow.
Documented fact: subagents are official features, but the question of whether a given architecture is better still has to be validated through evaluation([OpenAI subagents](https://developers.openai.com/codex/subagents), [Claude Code subagents](https://code.claude.com/docs/en/sub-agents), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))
Interpretation: the claim that multi-agent is “not the default” is my operating conclusion.

Without those conditions, multi-agent easily becomes a structure that only looks sophisticated. From a harness engineering perspective, the goal is not to add features to the system, but to choose structures that reduce failure. Multi-agent should be justified by that standard too.

## The Temptation and the Limit I Saw Myself

I also had moments where a multi-agent structure simply looked more disciplined and more impressive. If roles were separated, it seemed like the workflow should become safer and more specialized. In practice, though, even small tasks started accumulating handoff cost and trace overhead, and more complexity showed up in orchestration than I expected.

The lesson was not that multi-agent is wrong. The real lesson was that deciding when to decompose is the important design question. Multi-agent is less a default posture than a strategy you reach for when eval shows that the extra structure is worth it.

## Wrap-up

Multi-agent systems look collaborative and sophisticated, but in actual operation they can also introduce orchestration cost, handoff mistakes, tracing difficulty, and blurred quality ownership. That is why it is better not to treat them as the default. They are most useful when the task is large enough, the context really is separable, and eval shows a real advantage. In harness engineering, what matters is not having more agents, but having a more predictable system.

The next post will take this one level deeper. Once you know the conditions under which multi-agent is worth using, the next question is how to lift principles out of prose and into enforcement.

## One-Sentence Summary

Multi-agent should not become the default just because it looks more systematic; it should be used only when its real benefits are justified by eval.

## Preview of the Next Post

The next post will explore how to move from principles to enforcement. Writing good rules into documentation is not enough to make agents follow them consistently. Some rules can remain as natural-language guidance, but others need to be lifted into lint rules, schema checks, hooks, or CI gates. So the next step is to look at how sentences turn into enforceable system rules. Once you define when multi-agent should be used, you also have to define how that decision is actually enforced.

## Sources and references

- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
