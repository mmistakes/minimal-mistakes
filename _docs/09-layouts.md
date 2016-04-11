---
title: "Layouts"
permalink: /docs/layouts/
excerpt:
sidebar:
  title: "v3.0"
  nav: docs
---

{% include base_path %}
{% include toc icon="columns" title="Included Layouts" %}

The bread and butter of any theme. Below you'll find the layouts included with Minimal Mistakes, what they look like and the type of content they've been built for.

## Default

The base layout all other layouts inherit from. There's not much to this layout apart from pulling in several `_includes`:

* `<head>` elements
* masthead navigation links
* {% raw %}`{{ content }}`{% endraw %}
* page footer
* scripts

**Note:** You won't ever assign this layout directly to a post or page. Instead all other layouts will build off of it by setting `layout: default` in their YAML Front Matter.
{: .notice--warning}

## Compress

A Jekyll layout that compresses HTML in pure Liquid.

* [Documentation](http://jch.penibelst.de/)

## Single

The layout you'll likely use the most --- thin sidebar on the left, main content on the right.

To enable add `layout: single` or better yet apply as a [Front Matter default]({{ base_path }}/docs/configuration/#front-matter-defaults) in `_config.yml`.

### Header

To add some visual punch to a post or page, a large full-width header image can be included.

**Note:** Be sure to resize your header images. `~1280px` is a good medium if you aren't [responsively serving up images](http://alistapart.com/article/responsive-images-in-practice). Through the magic of CSS they will scale up or down to fill the container. If you go with something too small it will look like garbage when upscaled, and something too large will hurt performance.
{: .notice--warning}

![single layout header image example]({{ base_path }}/images/mm-single-header-example.jpg)

Place your images in the `/images/` folder and add the following YAML Front Matter:

```yaml
header:
  image: image-filename.jpg
```

For externally hosted images include the full image path instead of just the filename:

```yaml
header:
  image: http://some-site.com/image.jpg
```

To include a caption or attribution for the image:

```yaml
header:
  image: unsplash-image-1.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
```

**ProTip:** Captions written in Markdown are supported, so feel free to add links, or style text. Just be sure to wrap it in quotes.
{: .notice--info}

### Header Overlay

To overlay text on top of a header image you have a few more options:

* `overlay_image` --- header image you'd like to overlay. Same rules as `header.image` from above.
* `excerpt` --- auto-generated page excerpt is added to the overlay text or can be overridden.
* `cta_label` --- call to action button text label (default is `more_label` in UI Text data file)
* `cta_url` --- call to action button URL

With this YAML Front Matter:

```yaml
excerpt: "This post should display a **header with an overlay image**, if the theme supports it."
header:
  overlay_image: unsplash-image-1.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  cta_label: "More Info"
  cta_url: "https://unsplash.com"
```

You should get an header image overlaid with text and a call to action button.

![single layout header overlay example]({{ base_path }}/images/mm-single-header-overlay-example.jpg)

You also have the option of specifying a solid background-color to use instead of an image.

![single layout header overlay with background fill]({{ base_path }}/images/mm-single-header-overlay-fill-example.jpg)

```yaml
excerpt: "This post should display a **header with a solid background color**, if the theme supports it."
header:
  overlay_color: "#333"
```

### Custom Sidebar

![single layout example]({{ base_path }}/images/mm-layout-single.png)

![single layout with header example]({{ base_path }}/images/mm-layout-single-header.png)

![single layout with comments and related posts]({{ base_path }}/images/mm-layout-single-meta.png)

## Archive

![archive layout example]({{ base_path }}/images/mm-layout-archive.png)

### Taxonomy Archive

![archive taxonomy layout example]({{ base_path }}/images/mm-layout-archive-taxonomy.png)

## Splash Page

![splash page layout example]({{ base_path }}/images/mm-layout-splash.png)