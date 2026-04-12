---
layout: single
title: "AI 05. Build and Test Are Not Enough to Validate an Agent"
lang: en
translation_key: build-and-test-are-not-enough-to-validate-an-agent
date: 2026-04-14 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, eval]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/build-and-test-are-not-enough-to-validate-an-agent/
---

It is possible for all tests to pass while the overall operation still feels unstable. In agent systems, that is not a contradiction. Build, test, lint, and audit can all come back green without proving that the work was routed correctly, handed off clearly, or documented properly. That is why this post separates product validation from agent validation.

## What Product Tests Actually Validate

Build, test, lint, and audit still matter. They tell you whether code compiles, interfaces still work, static rules are respected, and known vulnerabilities are caught. In other words, they are core safeguards against product regressions.

The limitation is that they mostly validate the artifact. They focus on whether the API works, whether the UI renders, whether type errors are gone, and whether lint rules pass. They do not automatically tell you whether the task was carried out in the way your harness expected.

## How Agent Systems Fail Differently

Agent systems can fail in ways that are not simple code failures. One example is wrong-owner routing. Imagine a task that should have stayed inside an authentication-oriented boundary, but was routed to an agent working from a frontend perspective that ended up modifying core auth files. The tests may still pass. Even so, the ownership boundary has been broken and the maintenance cost of later work goes up.

Incomplete handoff is another example. The code and tests pass, but the next step does not receive the remaining risks or required follow-up checks. Stale docs are similar. The implementation changed, but the design or operating documents did not. Build and test rarely catch that. Bad tool choice or unnecessary sub-agent usage can also hide behind successful output. The result may be correct by accident while the orchestration is still poor.

For example, a team might change behavior that requires a documentation update but only modify the code. The application can still work. A separate eval, however, can check whether that code path requires linked documentation to be updated and catch the omission. That is less a product failure than an operating failure.

## Why Agent-Specific Eval Is Necessary

This is where agent-specific eval becomes important. If product tests ask, "What was produced?" agent eval asks, "How was it produced?" Harness engineering is not only about validating the output. It also has to include orchestration validation.

That distinction matters because agent-system failures do not always appear as broken code. Some failures show up as poor routing, incomplete handoff, stale documentation, bad tool choice, or unnecessary sub-agent usage. The product may pass, but the system has learned nothing and the next run becomes unstable in the same way.

## What Kinds of Eval Are Possible?

There are many ways to design agent-specific eval:

- handoff completeness eval
- wrong-owner routing eval
- scope violation eval
- stale-doc detection
- tool-choice trace grading
- orchestration trace review

These checks are not meant to replace build or test. They fill the blind spots that product validation leaves behind.

## The Blind Spot I Missed

At first, I also tended to think that a solid bundle of build, test, and lint checks would be enough. If the code was not broken and the tests passed, it was easy to assume the system itself was healthy. Later, it became much clearer that failures like stale documentation, bad routing, and incomplete handoff were almost invisible to that bundle.

The important lesson was not simply that more validation was needed. It was that different things were being validated. A correct product and a correctly operating agent are related, but they are not the same claim.

## Wrap-up

Build, test, lint, and audit are essential for validating product regressions. But agent systems can fail in orchestration even when the code is correct. That is why harness engineering needs agent-specific eval in addition to ordinary product validation.

The next post will take this into the multi-agent question. Many people imagine multi-agent systems as the default, but in practice that assumption deserves much more scrutiny.

## One-Sentence Summary

Passing product tests does not prove that an agent system is working well; to catch orchestration failures, you need agent-specific eval.

## Preview of the Next Post

The next post will explore why multi-agent is not the default. Splitting work across several agents can look like an obviously better structure, but it can also increase complexity and create more failure points. In some cases a single agent is more stable, while decomposition only pays off in narrower situations. That is why the next step is to look at multi-agent design not as a feature, but as a tradeoff in cost and control. Once you start validating orchestration, you also have to decide when decomposition helps and when it simply adds noise.
