---
layout: single
description: "Explains that token savings are not about deleting as much as possible, but about preserving control information while raising information density and priority."
title: "Token Management 05. Good Compression and Bad Compression: What to Keep and What to Drop"
lang: en
translation_key: good-compression-vs-bad-compression-what-to-keep-and-what-to-drop
date: 2026-04-24 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, compression, context]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/good-compression-vs-bad-compression-what-to-keep-and-what-to-drop/
---

## Summary

When teams talk about saving tokens, it is easy to slide into the idea that “shorter is always better.” But in real agent operation, the goal is not to delete as much as possible. The goal is to preserve the information that still controls the current task while increasing information density and priority. That is why compression and deletion are not the same thing.

This post explains the difference between good compression and bad compression, and offers a practical frame for deciding what must remain visible and what can be shortened or dropped. The point is not to make text smaller for its own sake, but to make the critical constraints and state more visible.

## Document Information

- Written: 2026-04-17
- Verified as of: 2026-04-17
- Document type: analysis
- Test environment: no direct execution test; structural analysis based on OpenAI and Anthropic official docs
- Test version: OpenAI Codex / API docs checked on 2026-04-17, Anthropic Claude Code docs checked on 2026-04-17

## Problem Definition

In the previous post, I argued that working state matters more than preserving full history. The next practical question is what to keep and what to drop when logs, plans, and task history need to be reduced. At this point many teams make a subtle mistake: they optimize for making the text shorter instead of making the task state clearer. So they trim long explanations, merge fields together, and remove details that look verbose.

But that often produces bad compression. If validation criteria, work boundaries, or important failure lessons disappear along with the extra wording, the text may be shorter while execution quality becomes worse. Token saving is therefore not the same thing as indiscriminate deletion. It is closer to preserving the information that still controls the task while increasing information density and priority. This post examines the difference between good compression and bad compression, what must remain, what can be shortened or dropped, and which practical questions can guide the decision.

## Confirmed Facts

Documented fact: OpenAI’s `Custom instructions with AGENTS.md` guide says Codex reads `AGENTS.md` files “before doing any work,” and stops adding to the instruction chain once the combined size reaches the `project_doc_max_bytes` limit, which is 32 KiB by default([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)). This means startup context is bounded, so teams must distinguish between information that deserves persistent visibility and information that does not.

Documented fact: OpenAI’s `Unrolling the Codex agent loop` explains that when you send a new message in an existing conversation, previous conversation history and tool calls are included again in the next turn’s prompt. The same article says that as the conversation grows, so does the prompt, and that large numbers of tool calls can exhaust the context window([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). This shows that preserving raw history unchanged quickly becomes a token-budget issue.

Documented fact: The same OpenAI article says Codex compacts a conversation once token usage exceeds a threshold, replacing the previous `input` with a smaller list of items. It explains that Codex now uses `/responses/compact` automatically([OpenAI, Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)). This is direct evidence that long records are expected to be transformed into smaller forms rather than simply preserved intact.

Documented fact: Anthropic’s `How Claude remembers your project` says `CLAUDE.md` and auto memory are loaded at conversation start, that Claude treats them as context rather than enforced configuration, and that “The more specific and concise your instructions, the more consistently Claude follows them.” The same page also says longer files consume more context and reduce adherence([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). This means retaining more text does not automatically improve execution quality.

Documented fact: OpenAI’s `Prompt caching` guide says cache hits are only possible for exact prefix matches, and recommends placing static content first and variable content later([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)). At the fact level, that means stable rules, current task state, and long-changing logs are not equally suitable as prompt content.

## Directly Reproduced Results

No direct reproduction: this is not a benchmark article comparing multiple compression styles on the same task and measuring how often quality drops when specific information is removed. As of 2026-04-17, I did not run repeated controlled tests across `Codex`, `Claude Code`, or other tools to quantify how different compression choices affect accuracy, latency, or failure rate.

So the examples and decision questions in this post are not copied from product internals. They are practical patterns built on top of the documented behavior of instruction loading, history growth, compaction, memory loading, and prompt structure in the cited official sources. The factual layer is limited to those documented behaviors. The criteria for deciding what to keep and what to drop are interpretation and guidance in the next section.

## Interpretation / Opinion

My view is that the biggest difference between good compression and bad compression is not length but priority. Good compression keeps the information that still controls the current task. The current goal, core constraints, validation criteria, failure lessons that prevent recurrence, and the current work scope should remain visible even if they are only one line each. By contrast, long background explanation, the detailed process of already-finished discussion, repeated operational phrasing, full raw logs, and completed history that is already reflected elsewhere can often be shortened or removed from live context. Those materials may still belong in an archive, but they do not necessarily belong in the prompt.

The difference becomes clearer through a simple example. Suppose you are fixing an auth-module failure. Bad compression often looks like this:

```md
We are working on an auth-related problem and have narrowed down the cause through multiple discussions.
There was a similar issue before, so we should proceed carefully.
Testing matters, so validation will be needed after the fix.
```

This is short, but it retains almost nothing that directly controls execution. It does not state the exact goal, the work boundary, the validation criteria, or what prior failure must not be repeated. By contrast, good compression might look like this:

```md
- Current goal: fix failing auth test
- Current work scope: modify only `src/auth.ts` and `tests/auth.test.ts`
- Core constraints: no DB schema change, preserve public API
- Validation criteria: pass `tests/auth.test.ts`, rerun related regression tests
- Recurrence-prevention note: previous attempt missed a fixture mismatch and inferred the wrong cause
```

This version is better not because it is shorter, but because it preserves the information that directly changes the next action. Good compression increases the density of control information. Bad compression reduces length by removing control information along with everything else.

This also explains what goes wrong when compression fails. First, core constraints disappear. If “do not change the public API” drops out, an agent may drift toward an easier but invalid interface change. Second, bad retries happen. If the one lesson that prevented a previous mistake disappears, the same wrong path can be tried again. Third, repeated failures become more likely. If validation criteria vanish, work may be declared complete while regressions remain. Fourth, task boundaries collapse. Once the active scope disappears, edits can spread beyond the intended area.

That is why compression should be distinguished from deletion. Deletion is just removing text. Compression is changing the form while preserving what still matters. Turning a full build log into a short failure summary, affected file list, and next action can be good compression. But if the error type or reproduction condition disappears in the process, it becomes bad compression. Dropping a long completed discussion is often fine. Dropping the final constraint that came out of that discussion is not. The practical question is whether the missing information could cause the current task to be performed incorrectly.

In practice, I find that a few questions work better than a long rulebook:

- If this information disappears, is there a real chance the current task will be done incorrectly?
- Does this information directly affect the current goal or work scope?
- Is this information a validation criterion or a prohibition that must still be enforced?
- Does this information prevent repetition of a known failure?
- Is this information only a repetition of work already reflected in code or state documents?
- Is the full raw text necessary, or would a short factual summary be enough?
- Is this useful for human understanding but not directly necessary for the model’s next action?

Those questions make the keep-or-drop decision more concrete. Current goal, core constraints, validation criteria, important recurrence-prevention notes, and work scope usually deserve to stay visible. Long background explanations, detailed steps of already-closed discussion, repeated operational phrases, full logs, and completed history that is already represented elsewhere are much more likely to be shortened or archived.

In my opinion, good compression is not the skill of keeping less. It is the skill of keeping the right things at the front. If the text becomes lighter but the system becomes easier to mislead, that was not savings; it was loss. If the critical state and constraints remain intact while explanation and repetition are reduced, that compression is much closer to real quality improvement.

## Limits and Exceptions

This post does not claim that exactly the same information should always remain in every workflow. In security-sensitive or regulated environments, validation detail and failure history may need to stay more explicit. In multi-agent work, task boundaries and handoff-related facts may deserve more space. So the keep list depends on the domain and task type.

Also, some information that is usually safe to shorten may occasionally need to remain in raw form. A complex production incident or flaky test investigation may require full logs at a certain moment. The key point is not that raw text should never exist, but that it should not automatically remain in live context forever when a smaller state representation would do.

Finally, tools differ in their compaction and memory behavior. Some systems summarize more aggressively; others keep more history live. This post is limited to shared principles documented in public sources as of 2026-04-17 plus my interpretation of their operational implications. In a real environment, teams still need to observe directly how far compression can go before quality starts to slip.

That leads naturally to the next question. Even if the general principles are the same, do token-management strategies look different across tools? For example, `Codex` makes its instruction chain and compaction behavior fairly visible, while `Claude Code` exposes a different structure through memory and project instruction loading. The next post will look at `How Token Management Strategies Differ Between Codex and Claude Code`, focusing on how the same harness principles lead to different operational choices in each environment.

## References

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
