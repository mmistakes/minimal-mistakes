---
layout: single
title: "How to set article dates for Jekyll sites"
date: 2024-08-02 23:50:00 +0530
excerpt: "If you happen to publish multiple posts in markdown on the same day, only to find that Jekyll displays the posts out of order, then this post is for you."
seo_title: "Markdown article date format for Jekyll sites"
seo_description: "Markdown article date format for Jekyll sites"
categories:
  - Web
tags:
  - Web
  - Markdown
  - Jekyll
---
This site is created with `Jekyll` and displays posts written in `Markdown`. If you happen to publish multiple posts in markdown on the same day, only to find that Jekyll displays the articles out of order, then this post is for you.

By default, Jekyll uses the date you specify in the post filename written in `YYYY-MM-DD` format. For example, if you want to publish a post on programming, you'd probably name the markdown file something like this: `2024-08-02-latest-in-programming.md`. The prefixed date is read by Jekyll and it uses it when displaying the post. If you later publish another post with a file name such as `2024-08-02-programming-trends.md`, you'd expect it to display as the most recent post on your website but it probably won't.

To fix this, your posts should also include a `date` field added in the YAML from matter like so:

```
---
layout: single
title: "Latest in Programming"
date: 2024-08-02 02:01:00
---
Post content...
```

The `date` value is written in `YYYY-MM-DD HH:MM:SS` format. Since Jekyll uses [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format for date & time,  you can further specify the date offset to the UTC timezone. For Mumbai, India which is 5.5 hours ahead of UTC you'd then enter a date/time value like this:

```
---
layout: single
title: "Programming Trends of 2024"
date: 2024-08-02 04:15:00 +0530
---
Post content...
```

This way you can fine tune the date values to ensure that posts written later on a given date are displayed in reverse chronological order. 

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey). Leave a comment if you have any questions. 

Share this article if you found it useful !
