---
permalink: /about/
title: "About"
excerpt: "Minimal Mistakes is a flexible two-column Jekyll theme."
layouts_gallery:
  - url: mm-layout-splash.png
    image_path: mm-layout-splash.png
    alt: "splash layout example"
  - url: mm-layout-single-meta.png
    image_path: mm-layout-single-meta.png
    alt: "single layout with comments and related posts"
  - url: mm-layout-archive.png
    image_path: mm-layout-archive.png
    alt: "archive layout example"
modified: 2016-04-14T10:26:26-04:00
---

{% include base_path %}

Minimal Mistakes is a flexible two-column Jekyll theme. Perfect for hosting your personal site, blog, or portfolio on GitHub or self-hosting on your own server. As the name implies --- styling is purposely minimalistic to be enhanced and customized by you :smile:.

The theme includes responsive layouts (`single`, `archive`, and `splash` pages) that look great on mobile and desktop browsers.

{% include gallery id="layouts_gallery" caption="Examples of included layouts `splash`, `single`, and `archive`." %}

[Install the Theme]({{ base_path }}/docs/quick-start-guide/){: .btn .btn--success .btn--large}

## Notable Features

- Compatible with GitHub Pages
- SEO optimized with support for [Twitter Cards](https://dev.twitter.com/cards/overview) and [Open Graph](http://ogp.me/) data
- Optional header images, sidebars, table of contents, galleries, related posts, breadcrumb links, and more.
- Optional comments ([Disqus](https://disqus.com/), [Facebook](https://developers.facebook.com/docs/plugins/comments), Google+, and custom)
- Optional analytics ([Google Analytics](https://www.google.com/analytics/) and custom)

## Demo Pages

| Name                                        | Description                                           |
| ------------------------------------------- | ----------------------------------------------------- |
| [Post with Header Image][header-image-post] | A post with a large header image. |
| [HTML Tags and Formatting Post][html-tags-post] | A variety of common markup showing how the theme styles them. |
| [Syntax Highlighting Post][syntax-post] | Post displaying highlighted code. |
| [Post with a Gallery][gallery-post] | A post showing several images wrapped in `<figure>` elements. |
| [Sample Collection Page][sample-collection] | Single page from a collection. |
| [Categories Archive][categories-archive] | Posts grouped by category. |
| [Tags Archive][tags-archive] | Posts grouped by tags. |

For even more demo pages check the [posts archive][year-archive].

[header-image-post]: {{ base_path }}{% post_url 2012-03-15-layout-header-image-text-readability %}
[gallery-post]: {{ base_path }}{% post_url 2010-09-09-post-gallery %}
[html-tags-post]: {{ base_path }}{% post_url 2013-01-11-markup-html-tags-and-formatting %}
[syntax-post]: {{ base_path }}{% post_url 2013-08-16-markup-syntax-highlighting %}
[sample-collection]: {{ base_path }}/recipes/chocolate-chip-cookies/
[categories-archive]: {{ base_path }}/categories/
[tags-archive]: {{ base_path }}/tags/
[year-archive]: {{ base_path }}/year-archive/