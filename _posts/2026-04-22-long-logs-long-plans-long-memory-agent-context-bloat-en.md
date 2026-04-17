---
layout: single
description: "Explains why logs, plans, memory, and prior conversation history often bloat agent context and weaken execution quality."
title: "Token Management 03. Long Logs, Long Plans, Long Memory: Why Agent Context Keeps Growing"
lang: en
translation_key: long-logs-long-plans-long-memory-agent-context-bloat
date: 2026-04-22 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, logs, memory, state]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/long-logs-long-plans-long-memory-agent-context-bloat/
---

## Summary

Token waste does not come only from static documents such as `AGENTS.md`, `CLAUDE.md`, or system prompts. In real operation, build logs, raw error output, verbose plans, previous conversations, state records, and progress reports often grow context even faster. That is why many teams underestimate the problem: they try to shorten the system prompt, while the larger bottleneck often comes from context generated during execution.

The core point is simple. More records do not automatically produce better execution quality. If a system cannot distinguish what should remain as live state, what should be summarized, and what should be discarded, the amount of retained text grows while the current task becomes less clear.

## Document Information

- Written: 2026-04-16
- Verified as of: 2026-04-16
- Document type: analysis
- Test environment: no direct execution test; structural analysis based on OpenAI and Anthropic official docs
- Test version: OpenAI Codex / API docs checked on 2026-04-16, Anthropic Claude Code / Claude API docs checked on 2026-04-16

## Problem Definition

When teams talk about token problems, they often start with system prompts or project instruction files. Those layers do matter. But in actual agent operation, context generated during the task often grows faster than static instructions do. Full build logs get appended, raw error outputs are repeated, plans are re-explained at every step, and previous conversations plus state notes remain attached without being compressed. A session becomes heavy more quickly than many teams expect.

This is easy to miss because execution-time context usually looks like “safe” information to keep. Logs feel more traceable. Detailed plans feel more controlled. Long conversation history feels more complete. But the amount of retained record and the quality of execution do not scale together. When current state and background record are not separated, the agent stops reading the present task directly and instead has to reconstruct it from accumulated history. This post focuses on why logs, plans, memory, and prior conversation history bloat so easily, and why that structure often lowers action quality.

## Confirmed Facts

Documented fact: OpenAI’s `Unrolling the Codex agent loop` explains that when you send a new message in an existing conversation, the conversation history is included again in the prompt for the new turn, including messages and tool calls from previous turns. The same article adds that as the conversation grows, the prompt grows too, and that hundreds of tool calls in a single turn can exhaust the context window([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). This means execution-time tool results and conversation history begin consuming context budget immediately in later turns.

Documented fact: The same OpenAI article says Codex manages context by compacting the conversation once token usage exceeds a threshold. It replaces the previous `input` with a smaller list of items that still represents the conversation, and now uses `/responses/compact` automatically([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). This is official evidence that long conversation history and tool history are operational resources that must be actively managed.

Documented fact: Anthropic’s `How Claude remembers your project` says each Claude Code session begins with a fresh context window and that both `CLAUDE.md` and auto memory are loaded at the start of every conversation. The same page explains that auto memory is stored in `MEMORY.md` and topic files, and that the first 200 lines or first 25KB of `MEMORY.md` are loaded at conversation start([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). That shows memory is not merely stored for later reference; it directly shapes startup context in future sessions.

Documented fact: The same Anthropic page explains that Claude reads and writes memory files during a session, and that when the interface shows `Writing memory` or `Recalled memory`, Claude is actively reading or updating files under `~/.claude/projects/<project>/memory/`([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). In other words, memory is not a static configuration layer. It is a dynamic context asset that can keep accumulating over time.

Documented fact: Anthropic’s `Context windows` guide describes the context window as the model’s “working memory” and explicitly says that more context is not automatically better. It further says that as token count grows, accuracy and recall degrade through `context rot`([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)). This supports the idea that keeping more record does not automatically improve execution quality.

Documented fact: OpenAI’s `Prompt caching` guide says cache hits are only possible for exact prefix matches and recommends putting static content first and variable content later([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)). At the fact level, this means stable repeated prefixes are structurally different from the constantly changing logs, plans, and state updates generated during execution.

## Directly Reproduced Results

No direct reproduction: this is not a benchmark article measuring how latency or adherence changes when log length, plan length, or memory retention strategy is varied under the same task. As of 2026-04-16, I did not run repeated controlled tests across the same repository and task to quantify how much dynamic context growth changes quality across `Codex`, `Claude Code`, or other tools.

The examples in this post are therefore practical patterns rather than copied internal prompts or direct transcripts from vendor tools. The factual layer is limited to conversation history inclusion, tool-call history, compaction, memory loading, and context-rot behavior documented in the cited official sources. The operational conclusions built on top of those facts are separated in the next section as interpretation.

## Interpretation / Opinion

My view is that many teams assume shortening the system prompt will solve token problems, but the faster-growing part of context is often the material created during execution. Static documents are visible and can be edited as files. Logs, plans, memory, and prior conversation history grow gradually inside the session, and their accumulation is easy to justify at each step. Text that was kept “just in case” becomes, a few turns later, larger than the current task itself.

Logs bloat because teams often fail to separate archival record from live execution context. In many failed builds, what matters for the next action is only the error type, the relevant file, the reproduction command, and maybe the immediate next check. Yet in practice, teams often paste the entire output back into the conversation:

```text
npm test
...
PASS src/a.test.ts
PASS src/b.test.ts
...
FAIL src/auth.test.ts
TypeError: Cannot read properties of undefined
...
[hundreds of lines follow]
```

This pattern is problematic because preserving a raw log and injecting it into the model’s live working memory are not the same thing. Full build-log injection, repeated raw error output, and reinserting tool results without cleanup all share the same failure mode: one piece of evidence becomes recurring context cost across multiple turns.

Plans bloat for a similar reason. A plan should help control the next action. But in practice it often turns into a running narrative. What may be needed is something like “1. reproduce failing test, 2. inspect cause, 3. patch, 4. re-validate.” Instead, many sessions keep restating the same plan in longer and longer prose, retain completed steps indefinitely, and explain the reasoning for each step in detail every time. At that point the plan stops being an execution tool and becomes a report. A plan that keeps all completed steps alive may preserve memory, but it no longer keeps the current action especially clear.

Memory and previous conversation history bloat because many teams are reluctant to let anything go. They fear that omitting old context will remove a useful clue later. But when there is no compact state summary, continued dependence on raw conversation history forces the agent to reconstruct the present from the past over and over again. Early ideas that were rejected, concerns that were already resolved, and plans that are no longer active remain mixed with current state. In that structure, memory serves recall more than control. But the purpose of memory in an agent system should be current-task control, not maximum replay of prior discussion.

This is why execution quality drops. Current constraints and obsolete context remain in the same working memory at the same density. If a few hundred lines of old logs stay more visible than the one line that describes the current failure cause, or if long explanations of previous plan steps occupy more space than the next action, the agent must work harder to infer what still matters. Many teams keep more information for safety. But unstructured retention often reduces clarity instead of increasing reliability.

That is why the important question is not “how much should we keep?” but “what form should kept information take?” In my opinion, raw logs should stay in an archive or file reference while live context keeps only the failure summary and next action. Plans should keep only the current stage, remaining blockers, approval needs, and immediate next step; long explanations of completed work do not need to remain live. Memory should preserve active decisions, unresolved risks, and constraints that directly shape the next turn, not the entire history of how the team arrived there. Some information should be compressed. Some should be deleted. Only some should remain alive as state. Without that distinction, context becomes a warehouse of records, and the agent must repeatedly search the warehouse before acting.

## Limits and Exceptions

This post is not claiming that raw logs or long records are never needed. Complex compiler failures, difficult production incidents, and regulated environments may require full logs and full traces to be preserved. The important distinction is between archive and live context. The fact that a record must exist does not mean its full text should be re-injected into the prompt on every turn.

Also, compaction behavior, memory structure, history retention policy, and tool-output handling differ across products and versions. Some systems summarize more aggressively or let you move outputs behind file references more easily than others. This post is limited to common properties documented in official sources as of 2026-04-16 plus my interpretation of their operational consequences. The exact point at which dynamic context growth begins to hurt a specific workflow still requires direct measurement in that environment.

The next question follows naturally from here: if some information should remain as state, some should be summarized, and some should disappear, what should that state actually look like? The core problem is not whether to keep records, but how to design summaries that keep control information alive without dragging along raw history. The next post will therefore focus on `How to Design State Summaries That Save Tokens`, looking more concretely at what fields and rules make a short state representation actually useful.

## References

- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
