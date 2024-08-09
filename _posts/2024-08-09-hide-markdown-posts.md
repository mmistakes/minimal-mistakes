---
layout: single
title: "How to hide or unpublish markdown posts in Jekyll?"
date: 2024-08-09 17:24:00 +0530
excerpt: "Previously, when I was using the Chirpy theme for my website, I was able to *draft* posts until I was ready to publish them by storing them in the `_drafts` folder"
seo_title: "How to hide or unpublish markdown posts in Jekyll?"
seo_description: "This post shows you how to hide or unpublish posts in Jekyll. This is also useful if you just want to create draft posts."
categories:
  - Web
tags:
  - Web
  - Markdown
  - Jekyll
  - Minimal Mistakes
--- 

Previously, when I was using the [Chirpy](https://chirpy.cotes.page/) theme for my website, I was able to *draft* posts until I was ready to publish them by storing them in the `_drafts` folder. Having switched to the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) theme however, it didn't come with a `_drafts` folder. While I could create one, I wanted to avoid the pain of doing so, then adding the draft posts to it and then moving them to the `_posts` folder for `Jekyll` to publish them once I was ready.
Turns out, you can simply keep a post from being published (*wink wink*) without having them in a `_drafts` folder. All you need to do is update the `YML` front matter of the post to include a `published` property.

For example:
```
---
layout: single
title: "Latest in Programming"
published: false
date: 2024-08-02 02:01:00
---
Post content...
```

Adding `published: false` will keep the post from being published to your website. Once you're ready to publish it, simply remove that field and the post will show up as any other post.
I hope this tip was useful !

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey). Leave a comment if you have any questions. 

Share this article if you found it useful !
