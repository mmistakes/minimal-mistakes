---
title: "Helpers"
permalink: /docs/helpers/
excerpt: "Jekyll `_includes` and other helpers to use as shortcuts for creating archives, galleries, table of contents, and more."
gallery:
  - url: unsplash-gallery-image-1.jpg
    image_path: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Image 1 title caption"
  - url: unsplash-gallery-image-2.jpg
    image_path: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Image 2 title caption"
  - url: unsplash-gallery-image-3.jpg
    image_path: unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
    title: "Image 3 title caption"
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
modified: 2016-06-01
---

{% include base_path %}
{% include toc icon="gears" title="Helpers" %}

You can think of these Jekyll helpers as little shortcuts. Since GitHub Pages doesn't allow most plugins --- [custom tags](https://jekyllrb.com/docs/plugins/#tags) are out. Instead the theme leverages [**includes**](https://jekyllrb.com/docs/templates/#includes) to do something similar.

## Base Path

Instead of repeating `{% raw %}{{ site.url }}{{ site.baseurl }}{% endraw %}` over and over again to create absolute URLs, you can use `{% raw %}{{ base_path }}{% endraw %}` instead. Simply add `{% raw %}{% include base_path %}{% endraw %}` to layouts, posts, pages, collections, or other includes and you're good to go.

**ProTip:** It's a good practice to prepend all assets links (especially post images) with `{% raw %}{{ base_path }}{% endraw %}` so they correctly resolve in the site's XML feeds.
{: .notice--info}

## Group by Array

[Jekyll Group-By-Array](https://github.com/mushishi78/jekyll-group-by-array) by Max White.

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

To place a gallery add the necessary YAML Front Matter.

| Name           | Required     | Description |
| ----           | --------     | ----------- |
| **url**        | Optional     | URL to link gallery image to (eg. a larger detail image). |
| **image_path** | **Required** | For images placed in the `/images/` directory just add the filename and extension. Use absolute URLS for those hosted externally. |
| **alt**        | Optional     | Alternate text for image. |
| **title**      | Optional     | Title text for image. Will display as a caption in a Magnific Popup overlay when linked to a larger image with `url`. |

```yaml
gallery:
  - url: unsplash-gallery-image-1.jpg
    image_path: unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Image 1 title caption"
  - url: unsplash-gallery-image-2.jpg
    image_path: unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Image 2 title caption"
  - url: unsplash-gallery-image-3.jpg
    image_path: unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
    title: "Image 3 title caption"
```

And then drop-in the gallery include in the body where you'd like it to appear. 

| Include Parameter | Required    | Description | Default |
| ----------------- | --------    | ----------- | ------- | 
| **id**            | Optional    | To add multiple galleries to a document uniquely name them in the YAML Front Matter and reference in `{% raw %}{% include gallery id="gallery_id" %}{% endraw %}` | `gallery` |
| **class**         | Optional    | Use to add a `class` attribute to the surrounding `<figure>` element for additional styling needs. | |
| **caption**       | Optional    | Gallery caption description. Markdown is allowed. | |

```liquid
{% raw %}{% include gallery caption="This is a sample gallery with **Markdown support**." %}{% endraw %}
```

**Gallery example with caption:**

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

**More Gallery Goodness:** A few more examples and [source code]({{ site.gh_repo }}/gh-pages/_posts/2010-09-09-post-gallery.md) can be seen in [this sample gallery post]({{ base_path }}{% post_url 2010-09-09-post-gallery %}).
{: .notice--info}

## Feature Row

Designed to compliment the [`splash`]({{ base_path }}/docs/layouts/#splash-page-layout) page layout as a way of arranging and aligning "feature blocks" containing text or image.

To add a feature row containing three content blocks with text and image, add the following YAML Front Matter

| Name           | Required     | Description | Default |
| ----           | -----------  | ----------- | ------- |
| **image_path** | **Required** | For images placed in the `/images/` directory just add the filename and extension. Use absolute URLS for those hosted externally. | |
| **alt**        | Optional     | Alternate text for image. | |
| **title**      | Optional     | Content block title. | |
| **excerpt**    | Optional     | Content block excerpt text. Markdown is allowed. | |
| **url**        | Optional     | URL that the button should link to. | |
| **btn_label**  | Optional     | Button text label. | `more_label` in UI Text data file. |
| **btn_class**  | Optional     | Button style. See [utility classes]({{ base_path }}/docs/utility-classes/#buttons) for options. | `btn` |

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

| Include Parameter   | Required | Description | Default |
| -----------------   | -------- | ----------- | ------- |
| **id**              | Optional | To add multiple rows to a document uniquely name them in the YAML Front Matter and reference in `{% raw %}{% include feature_row id="row2" %}{% endraw %}` | `feature_row` |
| **type**            | Optional | Alignment of the featured blocks in the row. Options include: `left`, `center`, or `right` aligned. | |

```liquid
{% raw %}{% include feature_row %}{% endraw %}
```

{% include feature_row %}

**More Feature Row Goodness:** A [few more examples]({{ base_path }}/splash-page/) and [source code]({{ site.gh_repo }}/gh-pages/_pages/splash-page.md) can be seen in the demo site.
{: .notice--info}

## Table of Contents

To include an [auto-generated table of contents](http://kramdown.rubyforge.org/converter/html.html#toc) for posts and pages, add the following helper before any actual content in your post or page.

```liquid
{% raw %}{% include toc %}{% endraw %}
```

![table of contents example]({{ base_path }}/images/mm-toc-helper-example.jpg)

| Parameter   | Required | Description | Default |
| ---------   | -------- | ----------- | ------- |
| **title**   | Optional | Table of contents title. | `toc_label` in UI Text data file. |
| **icon**    | Optional | Table of contents icon (shows before the title). | [Font Awesome](https://fortawesome.github.io/Font-Awesome/icons/) <i class="fa fa-file-text"></i> **file-text** icon. Any other FA icon can be used instead. |

**TOC example with custom title and icon**

```liquid
{% raw %}{% include toc icon="gears" title="My Table of Contents" %}{% endraw %}
```

## Navigation List

Include an unordered list of links to be used as sidebar navigation with the `nav_list` helper.

**1.** Start by adding a set of titles and URLs to `_data/navigation.yml` in the same way the [`main` navigation]({{ base_path }}/docs/navigation/) is built.

`foo` navigation example:

```yaml
# _data/navigation.yml
foo:
  - title: "Link 1 Title"
    url: /link-1-page-url/

  - title: "Link 2 Title"
    url: http://external-link.com

  - title: "Link 3 Title"
    url: /link-3-page-url/

  - title: "Link 4 Title"
    url: /link-4-page-url/
```

For a navigation list that has child pages you'd structure the YAML like this:

```yaml
# _data/navigation.yml
foo:
  - title: "Parent Link 1"
    url: /parent-1-page-url/
    children:
      - title: "Child Link 1"
        url: /child-1-page-url/
      - title: "Child Link 2"
        url: /child-2-page-url/

  - title: "Parent Link 2"
    url: /parent-2-page-url/
    children:
      - title: "Child Link 1"
        url: /child-1-page-url/
      - title: "Child Link 2"
        url: /child-2-page-url/
      - title: "Child Link 3"
        url: /child-3-page-url/
```

**2:** On the page(s) you'd like the `foo` sidebar nav add the following YAML Front Matter, referencing the same key name.

```yaml
sidebar:
  nav: "foo"
```

**ProTip:** If you're applying the same navigation list to several pages setting it as a [Front Matter default](https://jekyllrb.com/docs/configuration/#front-matter-defaults) is the better option.
{: .notice--info}

The theme's documentation is built with the `nav_list` helper so if you'd like an example to dissect take a look at `navigation.yml`, `_config.yml` and `_doc/` in the [`gh-pages` branch]({{ site.gh_repo }}/gh-pages/) of this repo.

To add a navigation list to a post or page's main content instead of the sidebar use the include this way:

```liquid
{% raw %}{% include nav_list nav="foo" %}{% endraw %}
```

{% include nav_list nav="foo" %}

| Parameter | Required     | Description |
| --------- | --------     | ----------- |
| items     | **Required** | Name of the links array found in `_data/navigation.yml`. |