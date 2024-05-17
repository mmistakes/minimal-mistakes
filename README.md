# The official repository of the Rock the JVM blog

The [Rock the JVM blog](https://blog.rockthejvm.com) is a place for in-depth coverage of topics in the Scala ecosystem, including features and tricks related to the Scala language, Akka, functional programming libraries like Cats, effect systems (Cats Effect, ZIO), data engineering with Apache Spark and Flink, streaming with Pulsar, Kafka and more.

## Setup

This repository is built on Jekyll with the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) theme. It requires a Ruby installation on your machine.

- clone the repository
- run `bundle exec jekyll serve --trace`
- open `localhost:4000` in your browser

The bundler will automatically update as you modify content.

## How to write

All articles are in the `_posts` directory. To add a new article, create a new file with the name `yyyy-mm-dd-title-of-the-article.md`. Jekyll will use the date in the filename and the front matter (described shortly) to automatically sort articles and search by date.

All files are Markdown, with a header that looks like this (example from one of the articles):

```
---
title: "Akka Typed: Actor Discovery"
date: 2022-03-22
header:
    image: "https://res.cloudinary.com/dkoypjlgr/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,fl_progressive/v1715952116/blog_cover_large_phe6ch.jpg"
tags: [akka]
excerpt: "A common pattern in Akka Typed: how to find actors that are not explicitly passed around."
---
```

This is the "front matter" of each article, and the fields are automatically parsed by Jekyll to correctly display titles, banner image (watch the indentation) and subtitle (excerpt), plus give search functionality (by title or tags).

Under the front matter, the structure of an article should look like this:

```
# The title of my awesome article

Some prologue of what we're going to talk about in the article.

## 1. First topic

In this first topic we're going to talk about the first topic.

### 1.1. Subtopic if necessary
### 1.2. Subtopic if necessary

## 2. Second topic
## 3. Third topic
## n. Conclusion
```

For **images**, they sit in the `images/` directory, and you can reference them in Markdown as `![Alt text](../images/myimage.png "Caption")`.

To embed **YouTube videos**, include a line of this form:

```
{% include video id="MY_VIDEO_ID" provider="youtube" %}
```

## How to contribute

Submit a PR with your article in the `_posts` or in the `_drafts` directory! We can carry the review/article discussion in the PR code review.
