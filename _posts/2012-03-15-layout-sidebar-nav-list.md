---
title: "Layout: Sidebar with Navigation List"
excerpt: "A post with a sidebar navigation list."
author_profile: false
sidebar:
  title: "Sample Title"
  nav: sidebar-sample
---

This post has a custom navigation list set in the post's YAML Front Matter.

```yaml
sidebar:
  title: "Sample Title"
  nav: sidebar-sample
```

Along with navigation elements set in `_data/navigation.yml`.

```yaml
sidebar-sample:
  - title: "Parent Page A"
    children:
      - title: "Child Page A1"
        url: /
      - title: "Child Page A2"
        url: /
      - title: "Child Page A3"
        url: /
      - title: "Child Page A4"
        url: /
  - title: "Parent Page B"
    children:
      - title: "Child Page B1"
        url: /
      - title: "Child Page B2"
        url: /
      - title: "Child Page B3"
        url: /
      - title: "Child Page B4"
        url: /
      - title: "Child Page B5"
        url: /
  - title: "Parent Page C"
    children:
      - title: "Child Page C1"
        url: /
      - title: "Child Page C2"
        url: /
      - title: "Child Page C3"
        url: /
      - title: "Child Page C4"
        url: /
      - title: "Child Page C5"
        url: /
  - title: "Parent Page D"
    children:
      - title: "Child Page D1"
        url: /
      - title: "Child Page D2"
        url: /
```