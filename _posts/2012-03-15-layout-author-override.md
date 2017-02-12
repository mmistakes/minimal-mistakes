---
title: "Layout: Author Override"
author: Billy Rick
excerpt: "A post to test author overrides using a data file."
---

Sites that may have content authored from various individuals can be accommodated by using [data files](https://jekyllrb.com/docs/datafiles/).

To attribute an author to a post or page that is different from the site author specified in `_config.yml`:

**Step 1.** Create `_data/authors.yml` and add authors using the following format. Anything variables found under `author` in `_config.yml` can be used (e.g. `name`, `avatar`, `uri`, social media profiles, etc.).

```yaml
# /_data/authors.yml

Billy Rick:
  name: "Billy Rick"
  uri: "http://thewhip.com"
  email: "billy@rick.com"
  bio: "What do you want, jewels? I am a very extravagant man."
  avatar: "bio-photo-2.jpg"
  twitter: "extravagantman"

Cornelius Fiddlebone:
  name: "Cornelius Fiddlebone"
  email: "cornelius@thewhip.com"
  bio: "I ordered what?"
  avatar: "bio-photo.jpg"
  twitter: "rhymeswithsackit"
```

**Step 2.** Assign one of the authors in `authors.yml` to a post or page you wish to override the `site.author` with. 

Example: To assign `Billy Rick` as an author for a post the following YAML Front Matter would be applied:

```yaml
author: Billy Rick
```