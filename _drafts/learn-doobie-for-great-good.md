---
title: "Learn Doobie for Great Good"
date: 2021-11-25
header:
image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

The vast majority of applications in the world today connect with some form of persistent layer, and, sooner or later, every developer faces the challenge of connecting to a database. If we need to connect to SQL databases, in the JVM ecosystem we rely on the JDBC specification. However, JDBC is not a good fit if we are using functional programming, since the library performs a lot of side effects. Fortunately, there is a library called [Doobie](https://tpolecat.github.io/doobie/), which provides a higher-level API on top of JDBC, using an effectful style through the Cats and Cats Effect libraries.