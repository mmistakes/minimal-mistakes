---
title: "Zio Kafka: A Practical Example of Zio Streams"
date: 2021-07-24
header:
  image: "/images/blog cover.jpg"
tags: []
excerpt: ""
---

Modern distributed applications need a communication system between their components that must be reliable, scalable, and efficient. Synchronous communication based on HTTP is not a choice in such application, due to latency problems, poor resources' management, etc... Hence, we need an asynchronous messaging system, capable of easily scaling, robust to errors, and with low latency.

Apache Kafka is a message broker that in the last years proved to have the above features. What's the best way to interact with such a message broker, if not with ZIO?
