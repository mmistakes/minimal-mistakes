---
title: "Layout: Header Video"
header:
  video:
    id: XsxDH4HcOWA
    provider: youtube
categories:
  - Layout
  - Uncategorized
tags:
  - video
  - layout
---

This post should display a **header with a reponsive video**, if the theme supports it.

## Settings

|---
| Parameter | Required | Description |
|-|-
| `id` | **Required** | ID of the video
| `provider` | **Required** | Hosting provider of the video, either 'youtube' or 'vimeo'
|---

## YouTube

Here is a YouTube example for the video at url `https://www.youtube.com/watch?v=XsxDH4HcOWA` (long version) or `https://youtu.be/XsxDH4HcOWA` (short version):

```yaml
header:
  video:
    id: XsxDH4HcOWA
    provider: youtube
```

{% include responsive_video id="XsxDH4HcOWA" provider="youtube" %}

## Vimeo

Here is a Vimeo example for the video at url `https://vimeo.com/97649261`:

```yaml
header:
  video:
    id: 97649261
    provider: vimeo
```

{% include responsive_video id="97649261" provider="vimeo" %}

