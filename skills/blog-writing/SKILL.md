---
name: blog-writing
description: Draft or revise technical blog posts in this repository with a verifiable structure. Use when working on files under `_posts/`, when retrofitting older posts to separate facts, reproduced results, and interpretation, or when checking that dates, versions, limits, exceptions, and primary sources are explicitly recorded.
---

# Blog Writing

## Workflow

1. Read [`AGENTS.md`](../../AGENTS.md), [`_posts/AGENTS.md`](../../_posts/AGENTS.md), [`docs/blog-style.md`](../../docs/blog-style.md), and [`templates/post-template.md`](../../templates/post-template.md).
2. Start from the template headings unless the task explicitly requires a different structure.
3. Classify each important sentence before writing it:
   - sourced fact
   - directly reproduced result
   - interpretation or opinion
4. Keep sourced facts close to their evidence. Prefer official docs, standards, original repositories, and official announcements.
5. Record `검증 기준일`, `테스트 환경`, and `테스트 버전` whenever the claim depends on time, version, OS, tooling, or service behavior.
6. If direct reproduction was not performed, say so in `## 직접 재현한 결과` and explain why.
7. If a claim cannot be verified, either remove it or mark it as uncertain. Do not upgrade guesses into facts.
8. End with `## 한계와 예외` and `## 참고자료` so the scope and evidence remain reviewable.

## Repository Notes

- Keep new posts directly under `_posts`.
- Keep Korean and English mirrors aligned by `translation_key`.
- Add explicit `permalink` to English mirror posts.
- Preserve existing metadata and links unless a correction is required.
