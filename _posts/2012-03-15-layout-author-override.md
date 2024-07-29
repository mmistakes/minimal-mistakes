---
title: "Layout: Author Override"
author: Billy Rick
excerpt: "A post to test author overrides using a data file."
---

Sites that may have content authored from various individuals can be accommodated by using [data files](https://jekyllrb.com/docs/datafiles/).

To attribute an author to a post or page that is different from the site author specified in `_config.yml`:

**Step 1.** Create `_data/authors.yml` and add authors using the following format. Anything variables found under `author` in `_config.yml` can be used (e.g. `name`, `bio`, `avatar`, author `links`, etc.).

```yaml
# /_data/authors.yml

Billy Rick:
  name        : "Billy Rick"
  bio         : "What do you want, jewels? I am a very extravagant man."
  avatar      : "/assets/images/bio-photo-2.jpg"
  links:
    - label: "Email"
      icon: "fas fa-fw fa-envelope-square"
      url: "mailto:billyrick@rick.com"
    - label: "Website"
      icon: "fas fa-fw fa-link"
      url: "https://thewhip.com"
    - label: "Twitter"
      icon: "fab fa-fw fa-twitter-square"
      url: "https://twitter.com/extravagantman"

Cornelius Fiddlebone:
  name        : "Cornelius Fiddlebone"
  bio         : "I ordered what?"
  avatar      : "/assets/images/bio-photo.jpg"
  links:
    - label: "Email"
      icon: "fas fa-fw fa-envelope-square"
      url: "mailto:cornelius@thewhip.com"
    - label: "Twitter"
      icon: "fab fa-fw fa-twitter-square"
      url: "https://twitter.com/rhymeswithsackit"
```

**Step 2.** Assign one of the authors in `authors.yml` to a post or page you wish to override the `site.author` with. 

Example: To assign `Billy Rick` as an author for a post the following YAML Front Matter would be applied:

```yaml
author: Billy Rick
```