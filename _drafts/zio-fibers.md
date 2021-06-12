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

1. Background and Setup

We live in a wonderful world, in which Scala 3 is the actual major release of our loved programming
language. So, we will use Scala 3 through the article. Moreover, we will need the dependency from
the ZIO library:

```sbt
libraryDependencies += "dev.zio" %% "zio" % "1.0.8"
```

Nothing else will be required.