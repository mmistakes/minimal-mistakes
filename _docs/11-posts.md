---
title: "Working with Posts"
permalink: /docs/posts/
excerpt: "Suggestions and Front Matter defaults for working with posts."
modified: 2016-11-03T11:12:40-04:00
---

Posts are stored in the `_posts` directory and named according to the `YEAR-MONTH-DAY-title.MARKUP` format as per [the usual](https://jekyllrb.com/docs/posts/).

Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit numbers, and `MARKUP` is the file extension representing the format used in the file. For example, the following are examples of valid post filenames:

```
2016-07-20-writing-jekyll-posts.md
2015-01-03-static-site-generators.markdown
```

**Recommended Front Matter Defaults:**

```yaml
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
```

Adding the above to `_config.yml` will assign the `single` layout and enable: *author profile*, *reading time*, *comments*, [*social sharing links*]({{ "/docs/layouts/#social-sharing-links" | absolute_url }}), and *related posts*, for all posts.

**ProTip:** Remember to write unique `excerpt` descriptions for each post for improved SEO and archive listings.
{: .notice--info}