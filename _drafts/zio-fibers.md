---
title: "ZIO and the Fiber Model"
date: 2021-06-31 header:
image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

There are many libraries implementing the effect pattern in the Scala ecosystem: Cats Effect, Monix,
and ZIO just to list some. Every of these implements its own concurrency model. For example. Cats
Effect and ZIO both rely on _fibers_. In the
articles [Cats Effect 3 - Introduction to Fibers](https://blog.rockthejvm.com/cats-effect-fibers/)
and [Cats Effect 3 - Racing IOs](https://blog.rockthejvm.com/cats-effect-racing-fibers/), we
introduced the fiber model adopted by the Cats Effect library. Now, it's time to analyze the ZIO
libraries and its implementation of the fiber model.

