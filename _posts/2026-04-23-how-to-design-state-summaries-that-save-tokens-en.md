---
layout: single
description: "Explains how to replace full history with a short working-state summary that directly controls the current task."
title: "Token Management 04. How to Design State Summaries That Save Tokens"
lang: en
translation_key: how-to-design-state-summaries-that-save-tokens
date: 2026-04-23 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, state-summary, working-state]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/how-to-design-state-summaries-that-save-tokens/
---

## Summary

The earlier posts in this series pointed to the same conclusion. Tokens are not only wasted by long rule documents; they are also consumed by growing logs, plans, memory files, and prior conversation history. That leads to the next practical question: if we do not keep the full conversation and full logs live, what should an agent actually retain to keep working on the current task?

This post answers that question from a practical angle. The core idea is not to write a longer `history summary`, but to design a short `working state` that directly controls the current task. A good state summary is not a document that remembers more of the past. It is a document that makes the next action easier to choose.

## Document Information

- Written: 2026-04-17
- Verified as of: 2026-04-17
- Document type: analysis
- Test environment: no direct execution test; structural analysis based on OpenAI and Anthropic official docs
- Test version: OpenAI Codex / API docs checked on 2026-04-17, Anthropic Claude Code docs checked on 2026-04-17

## Problem Definition

In practice, the most common response to context growth is to keep as much history as possible. Teams retain previous conversation turns, full build logs, evolving plans, and intermediate decisions. At first, that feels safe. If nothing is removed, nothing important seems likely to be lost. It also feels easier to debug later.

But that structure often makes ongoing work harder rather than easier. Once logs, plans, memory, and prior discussion all stay live together, the agent must reconstruct the present from accumulated past material instead of reading a clear current state. That is why the real need is not a shorter version of the entire history, but a separate state representation for the current task. This post looks at why state summaries are necessary, what they should include and exclude, and what a practical working-state template can look like in real use.

## Confirmed Facts

Documented fact: OpenAI’s `Custom instructions with AGENTS.md` guide says Codex reads `AGENTS.md` files “before doing any work,” and stops adding instruction files once the combined size reaches the `project_doc_max_bytes` limit, which is 32 KiB by default([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)). This shows that startup context is a bounded budget and that teams must distinguish between always-visible information and information that should only be loaded when needed.

Documented fact: OpenAI’s `Unrolling the Codex agent loop` explains that when you send a new message in an existing conversation, the conversation history is included again in the prompt for the next turn, including previous messages and tool calls. The same article says that as the conversation grows, so does the prompt, and that many tool calls within a turn can exhaust the context window([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). This means full history retention immediately turns into a token-budget issue.

Documented fact: The same OpenAI article explains that Codex compacts conversations once token usage exceeds a threshold, replacing the previous `input` with a smaller list of items. It says Codex now uses `/responses/compact` automatically([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). This is official evidence that long histories are meant to be transformed into smaller state representations rather than carried forward unchanged.

Documented fact: Anthropic’s `How Claude remembers your project` says `CLAUDE.md` and auto memory are both loaded at the start of every conversation, and that Claude treats them as context rather than enforced configuration. The same page says, “The more specific and concise your instructions, the more consistently Claude follows them,” and explains that auto memory loads the first 200 lines or 25KB each session([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). That means persistent memory layers also benefit from being short and precise.

Documented fact: The same Anthropic page recommends keeping in `CLAUDE.md` only facts Claude should hold in every session, and moving multi-step procedures or one-area rules into skills or path-scoped rules. It also advises targeting under 200 lines because longer files consume more context and reduce adherence([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). This supports a separation between entrypoint guidance, task-specific instructions, and working state.

Documented fact: OpenAI’s `Prompt caching` guide says cache hits are only possible for exact prefix matches, and recommends placing static content at the beginning of the prompt and variable content at the end([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)). This suggests that stable operating rules and changing task state should not be treated as the same kind of prompt content.

## Directly Reproduced Results

No direct reproduction: this is not a benchmark article measuring the token or quality differences between multiple state-summary formats under the same task. As of 2026-04-17, I did not run repeated experiments across the same repository and task comparing `history summary` style prompts with `working state` style prompts in `Codex`, `Claude Code`, or other tools.

So the templates and examples in this post are not copied product prompts. They are practical patterns derived from the documented context, memory, compaction, and prompt-structuring behavior in the cited official sources. The factual layer is limited to instruction loading, conversation growth, compaction, memory loading, and prompt-caching behavior. The design guidance built on top of those facts is separated in the next section as interpretation.

## Interpretation / Opinion

My view is that state summaries become necessary not simply because history gets too long, but because history cannot substitute for state. History is good at showing what happened. But to choose the next action, an agent first needs to know what is currently valid. That is why the first misconception to discard is the idea that a `history summary` is enough if written more briefly. A good state summary should not be an abridged past. It should be a `working state` that directly controls the current task.

From that perspective, the distinction between what to include and what to exclude becomes clearer. Keep the current goal, the current work scope, already-decided constraints, changed files or affected areas, remaining work, validation status, prohibitions or cautions, and blockers. All of those items directly affect the next turn. On the other hand, long background explanation, verbose descriptions of already completed past work, full raw logs, and detailed descriptions of discarded approaches usually do not belong in the live state summary. They may still matter as records, but they do not need to remain in live context.

In practice, a minimal working-state template can look like this:

```md
## Working State

- Current goal:
- Current work scope:
- Decisions already made:
- Changed files or affected areas:
- Remaining work:
- Validation status:
- Prohibitions or cautions:
- Blocker:
```

The advantage of this template is its simplicity. It can be used in a human-facing operating document, or pasted as a state block into an agent prompt. The important point is not to fill each field with a lot of prose, but to keep each field short and immediately actionable.

A bad state summary often looks like this:

```md
Today we first reviewed the entire auth flow, and in the middle we also suspected the session storage path.
Then we ran several tests and considered the possibility of fixture differences.
After that, auth.ts seemed like the most likely area, but we are still not completely sure.
Overall, it feels like the cause is mostly narrowed down, and we will investigate further next.
```

This is weak because it still does not make the current task immediately obvious. It is understandable as a narrative, but state and next action are not clearly separated.

The same situation written as working state looks different:

```md
## Working State

- Current goal: fix failing auth test
- Current work scope: modify only `src/auth.ts` and `tests/auth.test.ts`
- Decisions already made: no DB schema change, preserve public API
- Changed files or affected areas: `src/auth.ts`, `tests/auth.test.ts`
- Remaining work: patch null guard, rerun tests, verify regression
- Validation status: failure reproduced, pre-fix test failure confirmed
- Prohibitions or cautions: do not modify `migrations/`
- Blocker: fixture difference still needs confirmation
```

This is stronger not because it explains more of the past, but because it controls the present more directly. A human reader can see the next step immediately, and a model can act inside a clearly defined scope.

The conditions for a good state summary follow from that. It should be short. It should be directly tied to the current task. It should be written so the model can act on it immediately, rather than as a reflective note for humans. And it should not spend space retelling completed history. If a state summary fails these tests, it gradually turns back into history and starts bloating again.

This also connects naturally to document structure. `AGENTS.md` should usually act as an entrypoint for core constraints and reference paths, not as a long-lived status document. `docs/plan.md` is better when kept focused on the current phase and remaining work instead of becoming a narrative log. `docs/status.md` can serve as the home of the working-state template above. Raw logs, long retrospectives, and detailed descriptions of discarded approaches can then move into `logs/` or archive documents. That structure makes it easier to keep operating rules as static prefix content while keeping only a small task-state block as variable content.

In my opinion, the key question in state-summary design is not “how much should we remember?” but “what should remain alive?” The purpose of memory should be control of the current task, not replay of the whole past. A state summary only works when it stops trying to summarize everything and instead keeps only what is still valid now.

## Limits and Exceptions

This post is not claiming that every task can be reduced to the same eight fields. Large refactors or multi-agent workflows may need separate state blocks per subtask, and long research tasks may need separate documents for hypotheses and counterexamples. The point is not the exact number of fields. The point is that a state summary should always make the current valid state visible.

It is also possible to compress too aggressively. If validation status is reduced so much that reproduction and regression checks become indistinguishable, or if decisions and hypotheses are mixed together, a short summary can still become misleading. So a good state summary is not just any short summary. It is a short summary that still preserves the control information needed to act correctly.

Finally, tools differ in their memory structure, instruction loading, and compaction behavior. Some systems explicitly load state files; others rely more on summaries embedded in the conversation. This post is limited to common principles documented in public sources as of 2026-04-17 plus my interpretation of their operating consequences. In a real environment, the most useful fields still need to be tuned through direct observation.

That leads to the next question. If state summaries matter, what should actually be preserved during compression, and what can safely be dropped? Some information can be shortened. Some must remain intact. Some can disappear entirely. The next post will therefore focus on `Good Compression and Bad Compression: What to Keep and What to Drop`, looking more concretely at how much information loss a useful state summary can tolerate.

## References

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
