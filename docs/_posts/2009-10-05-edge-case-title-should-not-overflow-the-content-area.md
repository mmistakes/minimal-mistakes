---
title: "Antidisestablishmentarianism"
categories:
  - Edge Case
tags:
  - content
  - css
  - edge case
  - html
  - layout
  - title
---

## Title should not overflow the content area

A few things to check for:

  * Non-breaking text in the title, content, and comments should have no adverse effects on layout or functionality.
  * Check the browser window / tab title.
  * If you are a theme developer, check that this text does not break anything.

The following CSS properties will help you support non-breaking text.

```css
-ms-word-wrap: break-word;
word-wrap: break-word;
```