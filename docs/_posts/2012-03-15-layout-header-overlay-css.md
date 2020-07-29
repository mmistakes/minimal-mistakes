---
title: "Layout: Header Image Overlay with Custom CSS"
header:
  overlay_background: 'url("/minimal-mistakes/assets/images/unsplash-image-1.jpg") center / cover no-repeat fixed'
  actions:
    - label: "Learn more"
      url: "https://unsplash.com"
categories:
  - Layout
  - Uncategorized
tags:
  - edge case
  - image
  - layout
last_modified_at: 1970-01-01T00:00:00+00:00
---

This post should display a **header with an overlay image** using **custom CSS for fixed positioning**, if the theme supports it.

Non-square images can provide some unique styling issues.

This post tests overlay header images.

## Overlay CSS

If you're really crazy about CSS, you can go straight for a complete [`background` property](https://www.w3schools.com/cssref/css3_pr_background.asp):

```yaml
excerpt: "This post should [...]"
header:
  overlay_background: 'url("/assets/images/unsplash-image-1.jpg") no-repeat fixed center'
  actions:
    - label: "Download"
      url: "https://github.com"
```

<div class="notice--primary" markdown="1">
**Note**: Avoid using single quotes in your CSS because it's wrapped in the `style` attribute of the relevant HTML element, as demonstrated below:

```liquid
{% raw %}<div style='background: {{ YOUR STYLE HERE }};'>{% endraw %}
```
</div>
