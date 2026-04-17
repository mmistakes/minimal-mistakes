---
layout: single
description: "Explains how token-management strategy should be adjusted to the different context-consumption patterns of Codex and Claude Code while keeping the same harness-engineering principles."
title: "Token Management 06. How Token Management Strategies Differ Between Codex and Claude Code"
lang: en
translation_key: how-token-management-strategies-differ-between-codex-and-claude-code
date: 2026-04-25 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, context, agents]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/how-token-management-strategies-differ-between-codex-and-claude-code/
---

## Summary

Token management cannot be solved with a single strategy just because the tools are both agents. The core principles still hold across tools: keep only minimal state, remove duplicated instructions, and center context around execution. But `Codex` and `Claude Code` appear to consume, retain, and reduce context differently enough that the operational strategy should be adjusted as well.

This post is not a product-ranking review. Instead, it compares the two tools from a harness-engineering perspective by looking at context retention, plan expression, document loading, codebase exploration, and tool-output consumption, then explains what those tendencies imply for token-management design.

## Document Information

- Written: 2026-04-17
- Verified as of: 2026-04-17
- Document type: comparison, analysis
- Test environment: no direct execution test; comparison based on OpenAI and Anthropic official documentation and public guidance
- Test version: OpenAI Codex-related docs checked on 2026-04-17, Anthropic Claude Code and Claude API context docs checked on 2026-04-17

## Problem Definition

By the end of this token-management series, one question naturally remains: if the principles are the same, do different agentic coding tools still burn tokens in different ways? That question matters because harness engineering is not mainly about raw model capability. It is about deciding what context the agent reads, what it keeps carrying forward, and where the signal starts getting diluted.

In practice, even when `Codex` and `Claude Code` are used for similar coding tasks, context pressure can appear in different places. In one environment, the first problem may be long conversation history and accumulated tool calls. In another, the first problem may be the amount of project instructions and memory loaded at session start. That is why advice like “just shorten the documents” or “just trim history” is not enough.

The scope of this post is not to reverse-engineer private internals and present them as settled fact. Instead, it first summarizes what is explicitly documented in public official sources as of 2026-04-17, then builds a practical interpretation around the patterns that teams commonly feel in operation. The central claim is simple: the principles are shared, but the strategy should be adjusted per tool.

## Confirmed Facts

Documented fact: OpenAI’s `Custom instructions with AGENTS.md` guide says Codex reads `AGENTS.md` files “before doing any work.” The same guide explains that Codex builds an instruction chain from the project root down to the current working directory and stops adding files once the combined size reaches the `project_doc_max_bytes` limit, which is 32 KiB by default([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)). In other words, the startup document stack in `Codex` is explicitly part of the token budget.

Documented fact: OpenAI’s `Unrolling the Codex agent loop` explains that when you send a new message in an existing conversation, previous messages and tool calls are included again in the next turn’s prompt. The same article says prompt length grows with the conversation and that many tool calls can exhaust the context window([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). It also says Codex compacts a conversation once token usage exceeds a threshold by replacing the previous `input` with a smaller list of items. So in `Codex`, execution-time history and tool-output growth clearly require active management.

Documented fact: The same OpenAI article says prompt caching depends on exact prefix matches, and that changing the available `tools`, `model`, sandbox configuration, approval mode, or current working directory during a conversation can cause cache misses([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/); [OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)). That means frequent runtime changes in a `Codex` harness can affect not only cost but also latency and context efficiency.

Documented fact: OpenAI’s `Harness engineering` article says the team tried the “one big `AGENTS.md`” approach and found it ineffective, then moved to a short `AGENTS.md` that acts as a table of contents while the actual knowledge base lives in structured `docs/` content([OpenAI, Harness engineering](https://openai.com/index/harness-engineering/)). This is a public example supporting a map-style instruction document instead of a monolithic manual for `Codex`.

Documented fact: Anthropic’s `How Claude remembers your project` says `CLAUDE.md` and auto memory are loaded at conversation start, that Claude treats them as context rather than enforced configuration, and that “The more specific and concise your instructions, the more consistently Claude follows them.” The same page recommends targeting under 200 lines per `CLAUDE.md` file and says longer files consume more context and reduce adherence([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). So in `Claude Code`, the density and organization of startup instructions are directly tied to execution quality.

Documented fact: The same Anthropic page explains that `CLAUDE.md` files are loaded hierarchically and that ancestor `CLAUDE.md` and `CLAUDE.local.md` files are concatenated at launch. It also recommends moving multi-step procedures or rules that apply only to part of the codebase into path-scoped rules or skills instead of leaving them in a large global `CLAUDE.md`([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). This shows that document separation and scoping matter in `Claude Code` as well.

Documented fact: Anthropic’s `Settings` page says `includeGitInstructions` defaults to `true` and adds built-in commit and pull request workflow instructions plus a git status snapshot to Claude’s system prompt([Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)). This suggests that teams can accidentally duplicate the same kind of operational guidance if they also embed long git workflow rules elsewhere.

Documented fact: Anthropic’s `Connect Claude Code to tools via MCP` guide says Claude Code can connect directly to external tools and data sources through MCP, allowing Claude to work from connected systems instead of whatever a user pastes into chat([Anthropic, Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)). Separately, Anthropic’s context-window guide describes context as the model’s working memory, says more context is not automatically better, and recommends server-side compaction as the primary strategy for long-running agentic workflows, with finer-grained context editing such as tool-result clearing available for specialized cases([Anthropic, Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)). So long-context preservation is not automatically beneficial in the Claude ecosystem either.

## Directly Reproduced Results

No direct reproduction: this post is not a controlled benchmark where the same repository and the same task were repeatedly run through `Codex` and `Claude Code` under matched conditions to compare token usage and failure patterns. As of 2026-04-17, I did not perform a direct quantitative experiment controlling conversation length, document size, and tool-output volume across the two tools.

Because of that, the interpretation below should not be read as a definitive description of private internal behavior. It is an operational frame built on documented instruction loading, conversation growth, memory loading, prompt caching, compaction, and context-management behavior. Statements marked as tendencies, common operational patterns, or practical judgment belong to interpretation rather than fact.

## Interpretation / Opinion

### The principles are shared, but the strategy is not

My view is that the first bad assumption to drop is: “they are both coding agents, so the same harness should work equally well.” The shared principles remain valid. Minimal working state, removal of duplicated guidance, execution-centered context, and logs that can be summarized all matter in both `Codex` and `Claude Code`. But the place where token pressure appears first often feels different in practice.

In `Codex`, long threads and repeated tool-call accumulation tend to become visible problems earlier. OpenAI’s public documentation explicitly describes how previous messages and tool calls re-enter later prompts, and how configuration changes can affect cache efficiency. In `Claude Code`, the density and role separation of what gets loaded at session start often matter earlier: `CLAUDE.md`, local project instructions, auto memory, and configuration layers can all influence what the model sees before it even starts working. That is why Anthropic repeatedly recommends concise instructions, path-scoped rules, and skills.

So the principle is common, but the emphasis shifts. In `Codex`, it is often more important to control what accumulates during execution. In `Claude Code`, it is often more important to decompose what gets injected at startup and separate it by role and scope.

### The useful comparison is about harness design, not product specs

The table below is not a feature or benchmark table. It is a harness-design comparison that highlights where token-management strategy may need to change.

| Dimension | Codex tendency | Claude Code tendency | Harness implication |
| --- | --- | --- | --- |
| Context retention | Official docs show previous conversation and tool calls continue into later turns, with compaction applied when the thread grows too large. | Official docs show `CLAUDE.md` and auto memory are loaded at session start, while longer conversations depend on separate context-management strategies. | `Codex` benefits from stronger control over thread growth, while `Claude Code` benefits from stronger control over startup-context density and memory scope. |
| Plan expression | In long tasks, repeated plan updates and status narration can accumulate inside the thread and become expensive quickly. | In many workflows, the bigger risk is not the plan text itself but the amount of startup instruction and memory already occupying attention. | In `Codex`, it often helps to keep plans out of the live thread unless they still change action. In `Claude Code`, it often helps more to separate startup rules by scope and role. |
| Document reference structure | `AGENTS.md` is layered from root to current directory under an explicit byte cap, which favors short map-like guidance. | `CLAUDE.md` is layered hierarchically too, but Anthropic explicitly recommends moving larger or narrower rules into `.claude/rules/`, imports, or skills. | Both tools benefit from layered docs, but `Codex` often wants a navigation map while `Claude Code` often wants a cleaner startup instruction stack. |
| Codebase and external context access | Public OpenAI guidance emphasizes making repository knowledge legible and discoverable in-repo. | Public Anthropic guidance emphasizes connected tools and MCP so Claude can fetch external context directly instead of relying on pasted chat content. | `Codex` benefits from strong repo-local discoverability. `Claude Code` often benefits from replacing pasted external context with connected access patterns. |
| Tool calls and intermediate output | Tool outputs and environment changes affect thread growth and cache behavior directly. Long raw outputs tend to remain expensive in later turns. | Startup-system instructions, connected tools, and long-running context strategies matter more, and Anthropic explicitly documents compaction and tool-result clearing patterns in the broader Claude context model. | In `Codex`, stabilize the tool set and summarize tool outputs aggressively. In `Claude Code`, reduce startup duplication and prefer direct tool access over pasted raw output. |

What matters here is not which tool is “better.” It is that the same 5,000 tokens can create a very different kind of pressure depending on whether they are being spent on growing thread history or on an overloaded startup instruction stack.

### Token-management points that need more attention in Codex

In my opinion, the first thing to inspect in a `Codex` harness is what keeps getting reintroduced into the thread. OpenAI’s documentation makes clear that prior conversation and tool calls become part of later prompts. That means full build logs, repeated raw error dumps, and long plan restatements become context cost faster than many teams expect. For `Codex`, it often works better to retain only the current state in live context while moving raw logs to file references or archives.

The second point is runtime stability. OpenAI documents that changing the tool list, current working directory, approval mode, or sandbox configuration can affect cache behavior. So a harness that constantly changes its tool availability or execution boundary in the middle of one task may work against `Codex` rather than with it. In practical terms, keeping the tool set and task boundary stable during one unit of work often helps both latency and consistency.

The third point is document structure. In `Codex`, `AGENTS.md` is safer as a map than as an encyclopedia. OpenAI’s own harness-engineering write-up describes moving away from a single giant instruction file toward a short table-of-contents document and structured knowledge elsewhere in the repo. That suggests a practical pattern: let the root instruction file explain where to look, and let deeper rules live in nearby docs, task-state files, or subdirectory-specific instruction layers.

### Token-management points that need more attention in Claude Code

For `Claude Code`, I think it usually makes more sense to inspect the startup context layers first. `CLAUDE.md`, `CLAUDE.local.md`, auto memory, and configuration layers can all shape what the session starts with. Anthropic’s docs recommend concise `CLAUDE.md` files and moving long procedures or path-specific rules into `.claude/rules/` files or skills. A common practical failure mode is that project philosophy, prohibitions, coding style, and subsystem-specific procedures all get packed into one startup document until the constraints that matter for the current task become hard to see.

The next issue is duplicated instructions. Anthropic documents that Claude does not read `AGENTS.md` directly, but `CLAUDE.md` can import it. Combined with the default `includeGitInstructions` setting, this means teams can easily load multiple overlapping versions of the same workflow guidance if they are not careful. In those cases, the fix is not to delete documentation altogether. It is to separate which layer is the shared source of truth and which layer exists only for Claude-specific additions.

External context handling also matters. Claude Code’s MCP documentation explicitly frames direct tool connections as an alternative to copying data into chat. From a token-management perspective, that is not just a convenience feature. It changes where the context lives. Instead of pasting issue descriptions, monitoring snapshots, or long operational notes into the live conversation, the harness can be designed so those systems are queried only when needed.

### The shared harness principles still matter most

Emphasizing tool-specific differences does not mean the common rules disappear. If anything, the differences make the shared rules clearer.

First, keep only minimal working state in live context. The current goal, work scope, core constraints, validation status, remaining tasks, and current blockers are the kinds of information that directly change what the agent should do next. That rule remains valid in both tools.

Second, remove duplicated guidance. When the same instruction appears in root docs, nested docs, system prompts, status summaries, and operational memory, the problem is not only length. Priority gets blurred as well. One rule should have one clear source of truth, and other layers should point to it instead of rewriting it.

Third, prefer execution-centered context over explanatory context. Background that helps humans understand organizational intent is not automatically the same thing as context the model needs right now to act correctly. If those two are not separated, the critical task state gets buried in both environments.

Fourth, treat logs and intermediate output as compressible artifacts. Keep raw material in archives or files when necessary, but keep only the failure cause, affected files, next action, and recurrence-prevention note in live context. That principle travels well across both ecosystems.

The broader conclusion of the whole series stays the same. Token management is not a trick for writing shorter prompts. It is a systems-design problem about what the agent carries forward, what it is allowed to forget, and how clearly the current task state stays visible. `Codex` and `Claude Code` differ in where that pressure tends to surface, but the better harness in both cases is the one that preserves the clearest state and the sharpest constraints with the least duplication.

## Limitations and Exceptions

This article is a comparison analysis based on public documentation and public guidance available as of 2026-04-17. It does not make definitive claims about private internal implementations. Actual product behavior may vary by version, settings, account tier, organizational policy, and connected tool configuration. So the differences described here should be read as documented structures plus commonly observed operational tendencies, not as immutable product truths.

Also, the Claude API context-management documentation should not automatically be treated as a one-to-one description of every `Claude Code` behavior. Likewise, OpenAI’s Codex articles describe the system at a specific point in time, and implementation details may evolve. The purpose of this post is narrower: to identify which variables a harness designer should watch and tune.

Finally, which issue feels larger in practice depends on the team’s workflow. Teams with many short independent tasks may feel startup instruction bloat more sharply. Teams with long task threads and repeated tool calls may feel thread growth more sharply. That is why the conclusion is not to choose a winner, but to keep adapting the harness to the tool actually being used.

## References

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp)
- Anthropic, [Context windows](https://platform.claude.com/docs/en/build-with-claude/context-windows)
