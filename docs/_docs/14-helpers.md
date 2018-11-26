---
title: "Helpers"
permalink: /docs/helpers/
excerpt: "Jekyll `_includes` and other helpers to use as shortcuts for creating archives, galleries, table of contents, and more."
gallery:
  - url: /assets/images/unsplash-gallery-image-1.jpg
    image_path: /assets/images/unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Image 1 title caption"
  - url: /assets/images/unsplash-gallery-image-2.jpg
    image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Image 2 title caption"
  - url: /assets/images/unsplash-gallery-image-3.jpg
    image_path: /assets/images/unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
    title: "Image 3 title caption"
feature_row:
  - image_path: /assets/images/unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Placeholder 1"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder 2"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
  - image_path: /assets/images/unsplash-gallery-image-3-th.jpg
    title: "Placeholder 3"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
last_modified_at: 2018-11-25T20:47:01-05:00
toc: true
toc_label: "Helpers"
toc_icon: "cogs"
---

You can think of these Jekyll helpers as little shortcuts. Since GitHub Pages doesn't allow most plugins --- [custom tags](https://jekyllrb.com/docs/plugins/#tags) are out. Instead the theme leverages [**includes**](https://jekyllrb.com/docs/templates/#includes) to do something similar.

## Group by array

[Jekyll Group-By-Array](https://github.com/mushishi78/jekyll-group-by-array) by Max White.

A liquid include file for Jekyll that allows an object to be grouped by an array.

## Figure

Generate a `<figure>` element with a single image and caption.

| Include Parameter | Required     | Description                                                                                          |
| ----------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| **image_path**    | **Required** | Full path to image eg: `/assets/images/filename.jpg`. Use absolute URLS for those hosted externally. |
| **alt**           | Optional     | Alternate text for image.                                                                            |
| **caption**       | Optional     | Figure caption text. Markdown is allowed.                                                            |

Using the `figure` include like so:

```liquid
{% raw %}{% include figure image_path="/assets/images/unsplash-image-10.jpg" alt="this is a placeholder image" caption="This is a figure caption." %}{% endraw %}
```

Will output the following:

{% include figure image_path="/assets/images/unsplash-image-10.jpg" alt="this is a placeholder image" caption="This is a figure caption." %}

```html
<figure>
  <img src="/assets/images/unsplash-image-10.jpg" alt="this is a placeholder image">
  <figcaption>This is a figure caption.</figcaption>
</figure>
```

## Gallery

Generate a `<figure>` element with optional caption of arrays with two or more images.

To place a gallery add the necessary YAML Front Matter.

| Name           | Required     | Description                                                                                                           |
| -------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| **url**        | Optional     | URL to link gallery image to (eg. a larger detail image).                                                             |
| **image_path** | **Required** | Full path to image eg: `/assets/images/filename.jpg`. Use absolute URLS for those hosted externally.                  |
| **alt**        | Optional     | Alternate text for image.                                                                                             |
| **title**      | Optional     | Title text for image. Will display as a caption in a Magnific Popup overlay when linked to a larger image with `url`. |

```yaml
gallery:
  - url: /assets/images/unsplash-gallery-image-1.jpg
    image_path: /assets/images/unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Image 1 title caption"
  - url: /assets/images/unsplash-gallery-image-2.jpg
    image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Image 2 title caption"
  - url: /assets/images/unsplash-gallery-image-3.jpg
    image_path: /assets/images/unsplash-gallery-image-3-th.jpg
    alt: "placeholder image 3"
    title: "Image 3 title caption"
```

And then drop-in the gallery include in the body where you'd like it to appear.

| Include Parameter | Required | Description                                                                                                                                                       | Default                                                                      |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **id**            | Optional | To add multiple galleries to a document uniquely name them in the YAML Front Matter and reference in `{% raw %}{% include gallery id="gallery_id" %}{% endraw %}` | `gallery`                                                                    |
| **layout**        | Optional | Layout type. 2 column: `half`, 3 column: `third`, single column: `''` (blank)                                                                                     | Determined by gallery size. Two items: `half`, three or more items: `third`. |
| **class**         | Optional | Use to add a `class` attribute to the surrounding `<figure>` element for additional styling needs.                                                                |                                                                              |
| **caption**       | Optional | Gallery caption description. Markdown is allowed.                                                                                                                 |                                                                              |

```liquid
{% raw %}{% include gallery caption="This is a sample gallery with **Markdown support**." %}{% endraw %}
```

**Gallery example with caption:**

{% include gallery caption="This is a sample gallery with **Markdown support**." %}

**More Gallery Goodness:** A few more examples and [source code](https://github.com/{{ site.repository }}/blob/master/docs/\_posts/2010-09-09-post-gallery.md) can be seen in [this sample gallery post]({{ "" | relative_url }}{% post_url 2010-09-09-post-gallery %}).
{: .notice--info}

## Feature row

Designed to compliment the [`splash`]({{ "/docs/layouts/#splash-page-layout" | relative_url }}) page layout as a way of arranging and aligning "feature blocks" containing text or image.

To add a feature row containing three content blocks with text and image, add the following YAML Front Matter

| Name              | Required     | Description                                                                                          | Default                            |
| ----------------- | ------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **image_path**    | **Required** | Full path to image eg: `/assets/images/filename.jpg`. Use absolute URLS for those hosted externally. |                                    |
| **image_caption** | Optional     | Caption for image, Markdown is supported eg: `"Image from [Unsplash](https://unsplash.com)"          |
| **alt**           | Optional     | Alternate text for image.                                                                            |                                    |
| **title**         | Optional     | Content block title.                                                                                 |                                    |
| **excerpt**       | Optional     | Content block excerpt text. Markdown is allowed.                                                     |                                    |
| **url**           | Optional     | URL that the button should link to.                                                                  |                                    |
| **btn_label**     | Optional     | Button text label.                                                                                   | `more_label` in UI Text data file. |
| **btn_class**     | Optional     | Button style. See [utility classes]({{ "/docs/utility-classes/#buttons"                              | relative_url }}) for options.      | `btn` |

```yaml
feature_row:
  - image_path: /assets/images/unsplash-gallery-image-1-th.jpg
    alt: "placeholder image 1"
    title: "Placeholder 1"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
  - image_path: /assets/images/unsplash-gallery-image-2-th.jpg
    alt: "placeholder image 2"
    title: "Placeholder 2"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
    url: "#test-link"
    btn_label: "Read More"
    btn_class: "btn--inverse"
  - image_path: /assets/images/unsplash-gallery-image-3-th.jpg
    title: "Placeholder 3"
    excerpt: "This is some sample content that goes here with **Markdown** formatting."
```

And then drop-in the feature row include in the body where you'd like it to appear.

| Include Parameter | Required | Description                                                                                                                                                | Default       |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **id**            | Optional | To add multiple rows to a document uniquely name them in the YAML Front Matter and reference in `{% raw %}{% include feature_row id="row2" %}{% endraw %}` | `feature_row` |
| **type**          | Optional | Alignment of the featured blocks in the row. Options include: `left`, `center`, or `right` aligned.                                                        |               |

```liquid
{% raw %}{% include feature_row %}{% endraw %}
```

{% include feature_row %}

**More Feature Row Goodness:** A [few more examples]({{ "/splash-page/" | relative_url }}) and [source code](https://github.com/{{ site.repository }}/blob/master/docs/\_pages/splash-page.md) can be seen in the demo site.
{: .notice--info}

## Responsive video embed

Embed a video from YouTube, Vimeo, or Google Drive that responsively sizes to fit the width of its parent. To help with GDPR compliance, the theme is using the privacy enhanced version of YouTube and Vimeo providers out of the box.

| Parameter  | Required     | Description                                                |
| ---------- | ------------ | ---------------------------------------------------------- |
| `id`       | **Required** | ID of the video                                            |
| `provider` | **Required** | Hosting provider of the video: `youtube`, vimeo`, or `google-drive` |

### YouTube

To embed the following YouTube video at url `https://www.youtube.com/watch?v=XsxDH4HcOWA` (long version) or `https://youtu.be/XsxDH4HcOWA` (short version) into a post or page's main content you'd use:

```liquid
{% raw %}{% include video id="XsxDH4HcOWA" provider="youtube" %}{% endraw %}
```

{% include video id="XsxDH4HcOWA" provider="youtube" %}

To embed it as a video header you'd use the following YAML Front Matter

```yaml
header:
  video:
    id: XsxDH4HcOWA
    provider: youtube
```

### Vimeo

To embed the following Vimeo video at url `https://vimeo.com/212731897` into a post or page's main content you'd use:

```liquid
{% raw %}{% include video id="212731897" provider="vimeo" %}{% endraw %}
```

{% include video id="212731897" provider="vimeo" %}

To embed it as a video header you'd use the following YAML Front Matter

```yaml
header:
  video:
    id: 212731897
    provider: vimeo
```

### Google Drive

To embed the following Google Drive video at url `https://drive.google.com/file/d/1u41lIbMLbV53PvMbyYc9HzvBug5lNWaO/preview` into a post or page's main content you'd use:

```liquid
{% raw %}{% include video id="1u41lIbMLbV53PvMbyYc9HzvBug5lNWaO" provider="google-drive" %}{% endraw %}
```

{% include video id="1u41lIbMLbV53PvMbyYc9HzvBug5lNWaO" provider="google-drive" %}

To embed it as a video header you'd use the following YAML Front Matter

```yaml
header:
  video:
    id: 212731897
    provider: google-drive
```

## Table of contents

Auto-generated table of contents list for your posts and pages can be enabled using two methods.

![table of contents example]({{ "/assets/images/mm-toc-helper-example.jpg" | relative_url }})

### Enabled via YAML Front Matter

Add `toc: true` to the YAML Front Matter of any post or page.

| Parameter      | Required | Description                                                 | Default                                                                                                                                                       |
| -------------- | -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **toc**        | Optional | Show table of contents. (boolean)                           | `false`                                                                                                                                                       |
| **toc_label**  | Optional | Table of contents title. (string)                           | `toc_label` in UI Text data file.                                                                                                                             |
| **toc_icon**   | Optional | Table of contents icon, displays before the title. (string) | [Font Awesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) <i class="fas fa-file-alt"></i> **file-alt** icon. Other FA icons can be used instead. |
| **toc_sticky** | Optional | Stick table of contents to top of screen.                   | `false`                                                                                                                                                       |

**TOC example with custom title and icon**

```yaml
toc: true
toc_label: "My Table of Contents"
toc_icon: "cog"
---

```

**Note:** using both methods will have unintended results. Be sure to remove `{% raw %}{% include toc %}{% endraw %}` placed table of contents from your content when using `toc: true`.
{: .notice--warning }

### Enabled via `toc` include (deprecated)

To include a Kramdown [auto-generated table of contents](https://kramdown.gettalong.org/converter/html.html#toc) for posts and pages, add the following helper to your content.

```liquid
{% raw %}{% include toc %}{% endraw %}
```

**Note:** this method only works with Markdown files.
{: .notice--warning}

**Deprecated:** `toc` helper will be removed in the next major version of the theme. It is encouraged that you migrate to the YAML Front Matter method above.
{: .notice--danger}

| Parameter | Required | Description                                                 | Default                                                                                                                                                       |
| --------- | -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **title** | Optional | Table of contents title. (string)                           | `toc_label` in UI Text data file.                                                                                                                             |
| **icon**  | Optional | Table of contents icon, displays before the title. (string) | [Font Awesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) <i class="fas fa-file-alt"></i> **file-alt** icon. Other FA icons can be used instead. |

**TOC example with custom title and icon**

```liquid
{% raw %}{% include toc icon="cog" title="My Table of Contents" %}{% endraw %}
```

## Navigation list

Include an unordered list of links to be used as sidebar navigation with the `nav_list` helper.

**1.** Start by adding a set of titles and URLs to `_data/navigation.yml` in the same way the [`main` navigation]({{ "/docs/navigation/" | relative_url }}) is built.

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

The theme's documentation is built with the `nav_list` helper so if you'd like an example to dissect take a look at `navigation.yml`, `_config.yml` and `_doc` collection in the [`/docs/` folder](https://github.com/{{ site.repository }}/tree/master/docs/) of this repo.

To add a navigation list to a post or page's main content instead of the sidebar use the include this way:

```liquid
{% raw %}{% include nav_list nav="foo" %}{% endraw %}
```

{% include nav_list nav="foo" %}

| Parameter | Required     | Description                                              |
| --------- | ------------ | -------------------------------------------------------- |
| items     | **Required** | Name of the links array found in `_data/navigation.yml`. |
