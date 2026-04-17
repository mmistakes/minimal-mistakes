---
layout: single
description: "Explains token management as a stability, latency, and context-control problem in agent systems, not just a cost issue."
title: "Token Management 01. Why Token Management Matters in Harness Engineering"
lang: en
translation_key: why-token-management-matters-in-harness-engineering
date: 2026-04-20 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, context-window]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/why-token-management-matters-in-harness-engineering/
---

## Summary

Tokens may look like a billing unit, but inside an agent system they are much more than that. System prompts, `AGENTS.md`, state summaries, previous turns, tool output, and attached documents all compete inside the same context window. That makes token management less about shaving cost and more about deciding how stable, responsive, and consistent an agent can remain over time.

This also explains why longer context does not automatically produce better results. More context can help, but it can also dilute important instructions and let stale or irrelevant information interfere with the current task. In this post, I want to explain why token management is a core control variable in harness engineering rather than a minor prompt-tuning concern.

## Document Information

- Written: 2026-04-16
- Verified as of: 2026-04-16
- Document type: analysis
- Test environment: no direct execution test; structural analysis based on OpenAI docs, Anthropic docs, and an ACL Anthology paper
- Test version: OpenAI docs checked on 2026-04-16, Anthropic docs checked on 2026-04-16, `Lost in the Middle` paper from 2024

## Problem Definition

When people talk about saving tokens, the discussion often stops at "write shorter prompts." But in tools like `Codex`, `Claude Code`, and other agentic coding environments, the token budget for a single inference call is not made up of the user prompt alone. It also includes system instructions, repository instruction files, previous conversation turns, tool results, state summaries, reference documents, and sometimes structured output schemas. In other words, tokens determine not only how much you pay, but also what the agent can still see clearly while working.

That is why harness engineering should treat token management as a systems problem before treating it as a pricing problem. If token usage grows unnecessarily, cost obviously rises. But the more immediate operational problems are latency, instruction dilution, irrelevant context intrusion, and increased risk of losing track of state. In long-running agent sessions with repeated tool calls and summarization, the central question becomes: what should remain visible in context, and what should be moved out of it?

## Confirmed Facts

Documented fact: OpenAI’s `Unrolling the Codex agent loop` explains that when a user sends a new message in an existing conversation, previous messages and tool-call history are included again as part of the next turn’s prompt. The article also explains that as the conversation grows, the prompt grows too, and that the context window is a bounded resource that includes both input and output tokens([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). The same article says Codex uses conversation compaction once a token threshold is exceeded. This is enough to show that tokens are not just a billing metric; they are part of the execution budget that the agent loop itself must manage.

Documented fact: Anthropic’s `Context windows` guide describes the context window as the model’s "working memory" and explicitly says that more context is not automatically better. The same guide warns that as token count grows, accuracy and recall can degrade through what it calls `context rot`([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)). That directly challenges the idea that a longer prompt must produce a smarter result.

Documented fact: The same Anthropic guide says that newer Claude models, starting with Claude Sonnet 3.7, return a validation error when prompt and output tokens exceed the context window rather than silently truncating([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)). In other words, token overflow is not just a mild quality issue; it can become an outright request failure.

Documented fact: OpenAI’s `Prompt caching` guide says Prompt Caching can reduce latency by up to 80% and input token cost by up to 90% when prompts contain repetitive prefixes such as system prompts or shared instructions. The same guide recommends putting static content first and variable content later so exact-prefix matches can be reused([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)). This shows that token management is not only about reducing volume but also about controlling layout.

Documented fact: OpenAI’s `Latency optimization` guide explains that reducing input tokens can lower latency, but often not dramatically, and becomes especially relevant with truly massive contexts such as long documents or image-heavy inputs([OpenAI, Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization)). This matters because it shows that token management is not a simple equation like "half the prompt, half the latency." In large-context agent workflows, the structure of the context matters as much as the size.

Documented fact: OpenAI’s `Harness engineering: leveraging Codex in an agent-first world` describes why the team moved away from "one big `AGENTS.md`." The stated reasons include context scarcity, instruction dilution, stale rules, and difficulty of mechanical verification. The article says a giant instruction file can crowd out the task, the code, and the relevant docs, causing the agent to optimize for the wrong constraints([OpenAI, Harness engineering](https://openai.com/index/harness-engineering/)). That is a concrete official example of how too many tokens can weaken instruction quality rather than improve it.

Documented fact: Anthropic’s `Prompting best practices` guide says that for long-context inputs above roughly 20K tokens, placing longform data near the top and the query near the end can improve quality, with tests showing gains of up to 30% on complex multi-document inputs([Anthropic, Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting)). That means the arrangement of context matters, not just its total length.

Documented fact: Claude Code’s MCP documentation explains that large MCP outputs are managed with output warnings, token limits, deferred tool discovery, and file-reference fallbacks so tool context does not overwhelm the conversation([Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)). This shows that tool output management is itself a token-management problem.

Documented fact: The `Lost in the Middle` paper reports that performance can degrade when relevant information appears in the middle of long inputs, and that models often perform better when relevant information is near the beginning or end([Liu et al., 2024](https://aclanthology.org/2024.tacl-1.9/)). Even in research literature, long context by itself does not guarantee better use of information.

## Directly Reproduced Results

No direct reproduction: this post is not a benchmark article that compares token budgets across models under the same task. As of 2026-04-16, I did not run the same repository task repeatedly across `Codex`, `Claude Code`, and other tools to measure cost, latency, quality, and state retention side by side.

That does not mean the article is claiming more than it verified. The factual layer here is limited to what official documentation and the cited paper explicitly describe. Conversation history accumulation, compaction, prompt caching, tool-output limits, and long-context degradation risk are treated as facts. The system-design conclusions built on top of them are separated in the next section as interpretation.

## Interpretation / Opinion

My view is that token management in harness engineering is a control problem, not an optimization problem. Optimization usually sounds like making an already-defined structure slightly more efficient. But in a real agent system, you have to decide from the start which information belongs in context, which information should live behind a file reference or summary, and which information should expire after the turn. That choice defines the behavior envelope of the system itself. So token management is less about "use fewer tokens" and more about "decide what stays visible."

From that perspective, the problems that grow with token count are not reducible to cost alone. Yes, more input and output tokens increase spending. But the more immediate operational issues are latency and context quality. In long sessions, every turn asks the model to re-read more history and more tool output. If summarization or compaction arrives too late, stale context can become more prominent than the current instruction. If an instruction file becomes too long, the most important rules are easier to miss. If large logs or bulky analysis are pasted directly into the session, irrelevant context can interfere with the current task. The result is not necessarily a better-informed agent. Often it is an agent that must reason through noisier competing signals.

That is why the intuition "longer prompt equals smarter result" is often wrong in agent operations. More information can help, but only when the information is organized around the current task. If it is not, a long prompt can dilute critical instructions and make state tracking less reliable. Imagine a current task instruction of 1,500 tokens surrounded by old handoffs, duplicated operating rules, previous run logs, and already-resolved experiment notes. That is not a rich context in the useful sense. It is a mixed context competing for the model’s limited working memory.

This reasoning applies across `Codex`, `Claude Code`, and other agentic coding tools. The implementation details vary. One tool may compact more aggressively, another may defer tool schemas, and another may replace oversized results with file references. But the shared structure remains the same. System prompts, project rules, state, tool outputs, and conversation history all compete inside the same bounded working memory. That is why model quality alone does not solve the problem. Stability appears only when the harness decides which layer belongs in context, and when.

In my opinion, good token management is really a practice of context layering. The entrypoint should stay short. Detailed documents can be long, but they should be loaded on demand. The information that must persist is the current task state and the active constraints. The information that should not linger is stale logs, duplicated instructions, and expired operating notes. Without that separation, tokens are not just expensive; they make the system harder to control.

## Limits and Exceptions

This post is not arguing that shorter is always better. Some tasks genuinely need broad context, such as large-scale refactoring, long-spec review, or dependency analysis across many files. If you cut too aggressively, you can increase re-queries, additional tool calls, and wrong inferences. So the goal of token management is not blind reduction. It is to preserve necessary context while removing unnecessary context structurally.

Also, context-window size, compaction policy, caching behavior, and tool-output handling differ by vendor and model version. This post is limited to what was publicly documented as of 2026-04-16. It does not claim a universal threshold for when quality collapses in a specific repository, model, or session length. That still requires direct measurement.

At this point, the next question becomes natural: what burns the token budget fastest in real operation? In many teams, the answer is not the model itself, but overloaded `AGENTS.md`, `CLAUDE.md`, system prompts, and repeated state summaries that get reattached every turn. The next post will focus on exactly that layer: the common failure patterns in `AGENTS.md`, `CLAUDE.md`, and system prompts that quietly waste tokens while weakening instruction clarity.

## References

- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- OpenAI, [Latency optimization](https://developers.openai.com/api/docs/guides/latency-optimization)
- Anthropic, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
- Anthropic, [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#long-context-prompting)
- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- Liu et al., [Lost in the Middle: How Language Models Use Long Contexts](https://aclanthology.org/2024.tacl-1.9/)
