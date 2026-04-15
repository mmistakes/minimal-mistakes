---
layout: single
title: "Harness Engineering 08. Results Alone Are Not Enough; You Need Trace"
lang: en
translation_key: why-trace-matters-more-than-results
date: 2026-04-17 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, trace]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/why-trace-matters-more-than-the-result/
---

The result is preserved, but no one knows why the system acted that way. In harness engineering, that situation becomes a real problem surprisingly often. The code output is there and the execution log exists, but the reasoning is missing: why this team was chosen as the owner, why this tool was selected, why the task was delegated to a sub-agent, or where a handoff actually failed. That is why this post focuses on the difference between result logs and the decision-relevant layer inside a trace, and why trace is what makes real improvement possible.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## Result Logs and the Decision-Relevant Layer of Trace

Result logs usually record what happened. They show whether tests passed, which files changed, which commands were run, and what the final artifact looked like. That is useful and necessary.
Documented fact: OpenAI's Agents SDK guide explicitly talks about keeping a “full trace of what happened,” and the trace grading guide treats traces as evaluation inputs([Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading))

What I mean here by the decision-relevant layer of trace is not a formal vendor term, but a descriptive way to point at the parts of a trace that preserve decision context: why the platform team was chosen instead of the auth team, why a certain analysis tool was used instead of a simpler one, why a sub-agent was introduced, or why a handoff happened at that specific point. Storing the result and preserving that decision context may look similar, but they serve different purposes.

## What Goes Wrong When Trace Is Missing

When trace is weak, teams are forced to guess from the output alone. Imagine a case where the final code exists, but the work was routed to the wrong owner. Looking at the result may tell you who ended up touching the code, but not why that routing decision happened. That means the next fix often becomes guesswork rather than a real improvement to the harness.
Interpretation: this section explains the operational problem of reconstructing failures from outputs alone. The factual anchor is that trace is meant to carry more than the final artifact, including intermediate decisions and tool use([Trace grading](https://developers.openai.com/api/docs/guides/trace-grading))

Tool choice works the same way. An execution log may show which tool was used, but not why it was chosen. Without that reason, the same poor choice can repeat while the harness team still lacks a clear place to intervene. Handoff failure is similar. The result may show that information was missing, but only trace can show which step failed to pass it along.

## What Kinds of Reasoning Should Be Preserved?

This does not mean recording every thought in exhaustive detail. It means preserving the minimum reasoning needed for improvement. At a minimum, it helps to capture why an owner was selected, why a tool was chosen, whether a sub-agent was used and why, when the handoff happened, and whether scope was narrowed or expanded.
Interpretation: the specific minimum fields listed here are my recommendation. The official direction behind them is that trace grading evaluates reasoning process and tool path, not just the final answer([Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Subagents](https://developers.openai.com/codex/subagents))

With that kind of trace, teams can later see decisions like "this change touches both `payments/` and `docs/payments.md`, so the payments owner should handle it" or "a sub-agent was used not for parallelism, but because a distinct domain context was required." At that point, trace stops being a debugging note and starts becoming harness-improvement data.

## How Trace Connects to Eval

Trace is the raw material for eval. If a wrong-owner routing eval fails, trace helps distinguish whether the issue came from a bad ownership decision, stale ownership mapping, or a missing routing rule. Tool-choice eval works the same way. Looking only at the output makes it hard to tell the difference between a lucky success and a well-justified success. Trace makes that difference visible.
Documented fact: OpenAI officially documents trace grading as an evaluation technique([Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))

Imagine a task that ended successfully, but the trace shows that a sub-agent was unnecessary, handoff leaked information twice, and documentation updates were delayed. The product result may still be acceptable, but the orchestration quality was weak. Trace is what reveals that gap.

## The Lack of Trace I Felt Directly

For a while, I also assumed that execution results and logs would be enough. If I knew what ran and what the final result was, it seemed like I should be able to reconstruct what mattered. Later, it became clear that the more important question was whether the reasoning behind the decisions had been preserved at all. Without that, harness improvement kept collapsing back into guesswork from the outcome.

The real lesson was not just that trace is convenient. It was that trace is what makes structural improvement possible.

## Wrap-up

Storing outputs and execution logs still matters. But that alone is not enough to understand an agent system well. Harness engineering includes not only the result, but also the observability of the reasoning process. That is why trace becomes a core asset for debugging, evaluation, and improvement.

The next post will connect this to approval and guardrails. Once you can observe the decision path, the next question is which kinds of decisions should be constrained or escalated before they happen.

## One-Sentence Summary

Outputs and execution logs are not enough to improve a harness; you also need trace that preserves why the system made the choices it made.

## Preview of the Next Post

The next post will explore why agent systems become unstable when approval and guardrails are missing. Some decisions are not enough to observe after the fact; they need to be blocked, limited, or escalated up front. That is especially true for risky tool use, edits outside intended boundaries, and actions that require stronger permissions. So the next step is to look at how approval and guardrails contribute to stability inside the harness. If trace creates observability, guardrails define the allowed space in which those decisions can happen.

## Sources and references

- OpenAI, [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
