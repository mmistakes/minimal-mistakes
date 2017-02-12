---
title: "Helpers"
permalink: /docs/helpers/
excerpt:
sidebar:
  title: "v3.0"
  nav: docs
gallery:
  - url: unsplash-gallery-image-1.jpg
    image_path: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
  - url: unsplash-gallery-image-2.jpg
    image_path: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
  - url: unsplash-gallery-image-3.jpg
    image_path: unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
feature_row:
  - image_path: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Placeholder 1"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
  - image_path: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder 2"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
  - image_path: unsplash-gallery-image-3-th.jpg
    title: "Placeholder 3"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
---

{% include base_path %}
{% include toc icon="gears" title="Helpers" %}

You can think of these Jekyll helpers as little shortcuts. Since GitHub Pages doesn't allow most plugins --- [custom tags](https://jekyllrb.com/docs/plugins/#tags) are out. Instead the theme leverages [**includes**](https://jekyllrb.com/docs/templates/#includes) to do something similar.

## Base Path

Instead of repeating `{% raw %}{{ site.url }}{{ site.baseurl }}{% endraw %}` over and over again to create absolute URLs, you can use `{% raw %}{{ base_path }}{% endraw %}` instead. Simply add `{% raw %}{% include base_path %}{% endraw %}` to layouts, posts, pages, collections, or other includes and you're good to go.

**ProTip:** It's a good practice to prepend all assets links (especially post images) with `{% raw %}{{ base_path }}{% endraw %}` so they correctly resolve in the site's XML feeds.
{: .notice--info}

## Group by Array

[Jekyll Group-By-Array](https://github.com/mushishi78/jekyll-group-by-array) by [Max White](mushishi78@gmail.com).

  A liquid include file for Jekyll that allows an object to be grouped by an array.

The Liquid based taxonomy archives found amongst the demo pages rely on this helper.

| Description                   |                          |                             |
| -----------                   | ------------------------ | --------------------------- |
| All posts grouped by category | [Source][category-array] | [Demo][category-array-demo] |
| All posts grouped by tags     | [Source][tag-array]      | [Demo][tag-array-demo]      |

[category-array]: {{ site.gh_repo }}/gh-pages/_pages/category-archive.html
[category-array-demo]: {{ base_path }}/categories/
[tag-array]: {{ site.gh_repo }}/gh-pages/_pages/tag-archive.html
[tag-array-demo]: {{ base_path }}/tags/

## Gallery

Generate a `<figure>` element with optional caption of arrays with two or more images.

| Include Parameter | Description |
| ----------------- | ----------- | 
| `id`              | *(optional)* Default is `gallery`. To add multiple galleries to a document uniquely name them in the YAML Front Matter and reference in `{% raw %}{% include gallery id="gallery_id" %}{% endraw %}` |
| `class`           | *(optional)* Use to add a `class` attribute to the surrounding `<figure>` element for additional styling needs. |
| `caption`         | *(optional)* Gallery caption description. Markdown is allowed. |

To place a gallery add the necessary YAML Front Matter.

```yaml
gallery:
  - url: unsplash-gallery-image-1.jpg
    image_path: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
  - url: unsplash-gallery-image-2.jpg
    image_path: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
  - url: unsplash-gallery-image-3.jpg
    image_path: unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
```

And then drop-in the gallery include in the body where you'd like it to appear. 

| YAML variable | Description |
| ------------- | ----------- |
| `url`         | *(optional)* URL to link gallery image to (eg. a larger detail image). |
| `image_path`  | For images placed in the `/images/` directory just add the filename and extension. Use absolute URLS for those hosted externally. |
| `alt`         | *(optional)* alternate text for image |


```liquid
{% raw %}{% include gallery caption="This is a sample gallery with **Markdown support**." %}{% endraw %}
```

**Gallery example with caption:**

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

**Moar Gallery Goodness:** A [few more examples]({{ base_path }}{% post_url 2010-09-09-post-gallery %}) and [source code]({{ site.gh_repo }}/gh-pages/_posts/2010-09-09-post-gallery.md) can be seen in the demo site.
{: .notice--info}

## Feature Row

Designed to compliment the [`splash`]({{ base_path }}/docs/layouts/#splash-page-layout) page layout as a way of arranging and aligning "feature blocks" containing text or image.

| Include Parameter | Description |
| ----------------- | ----------- |
| `id`              | *(optional)* Default is `feature_row`. To add multiple rows to a document uniquely name them in the YAML Front Matter and reference in `{% raw %}{% include feature_row id="row2" %}{% endraw %}` |
| `type`            | *(optional)* Alignment of the featured blocks in the row. Options include: `left`, `center`, or `right` aligned. |

To add a feature row containing three content blocks with text and image, add the following YAML Front Matter

```yaml
feature_row:
  - image_path: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Placeholder 1"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
  - image_path: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder 2"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
  - image_path: unsplash-gallery-image-3-th.jpg
    title: "Placeholder 3"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
```

And then drop-in the feature row include in the body where you'd like it to appear.

```liquid
{% raw %}{% include feature_row %}{% endraw %}
```

{% include feature_row %}

| YAML variable | Description |
| ------------- | ----------- |
| `image_path`  | For images placed in the `/images/` directory just add the filename and extension. Use absolute URLS for those hosted externally. |
| `alt`         | *(optional)* alternate text for image |
| `title`       | Content block title |
| `excerpt`     | *(optional)* Content block excerpt text. Markdown is allowed. |
| `url`         | *(optional)* URL that the button should link to. |
| `btn_label`   | *(optional)* Default value is used from `more_label` in UI Text data file. |
| `btn_class`   | *(optional)* Button style. See [utility classes]({{ base_path }}/docs/utility-classes/#buttons) for options.

**Moar Feature Goodness:** A [few more examples]({{ base_path }}/splash-page/) and [source code]({{ site.gh_repo }}/gh-pages/_pages/splash-page.md) can be seen in the demo site.
{: .notice--info}

## Table of Contents

To include an [auto-generated table of contents](http://kramdown.rubyforge.org/converter/html.html#toc) for posts and pages, add the following helper before any actual content in your post or page.

```liquid
{% raw %}{% include toc %}{% endraw %}
```

![table of contents example]({{ base_path }}/images/mm-toc-helper-example.jpg)

| Parameter | Description |
| --------- | ----------- |
| `title`   | *(optional) Default value is used from `toc_label` in UI Text data file. |
| `icon`    | *(optional) Default is the [Font Awesome](https://fortawesome.github.io/Font-Awesome/icons/) `file-text` icon. Any other FA icon can be used instead. |

**TOC example with custom title and icon**

```liquid
{% raw %}{% include toc icon="gears" title="My Table of Contents" %}{% endraw %}
```