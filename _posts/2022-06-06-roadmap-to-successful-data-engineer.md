---
title: "Roadmap to a Successful Data Engineer"
date: 2022-06-06
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,h_300,w_1200/vlfjqjardopi8yq2hjtd"
tags: [scala, beginners]
excerpt: "One of the most prominent Rock the JVM students shares his insights to a successful career in Data Engineering."
---

_This article is brought to you by [Anirban Goswami](https://www.linkedin.com/in/anigos/) a.k.a. Ani, one of the earliest Rock the JVM students and fans, now a big data architect. Here, Ani shares his stories and tips for aspiring data engineers. Ani is mega-passionate about what he's doing, which is reflected in the slightly different, more conversational style of this article._

> “Data! Data! Data! I can’t make bricks without clay!” - Arthur Conan Doyle

Everything in this world starts from a purpose, a motivation which drives us to become better in any field. You can be an artist, a guitar player, a swimmer, a carpenter or an engineer who is working towards your success. Being a data engineer for more than a decade, I want to share my realization, thinking that it might help other aspirants to get some boost and acceleration to become the best version of themselves.

## What is Data Engineering?

I believe there will be a lot of people who are reading this article who are not 100% sure what a data engineer means. 10 years back, there was no such thing as "data engineer". Let us go back in history and see the revolution.

First, not every coder is a Data Engineer! When someone graduates from college learning programming, packaging and deployment of applications, they are trained as software engineers; but you cannot become a data engineer coming out of college with the same path as an architect in software engineering. A Data Engineering mind gets built up over time. There is no shortcut to it but there are processes, there are principles and methodologies to become one &mdash; a true Data Engineer!

Data and its importance became relevant to organizations around the world in the early 90s and since then organizations like Oracle, IBM, Microsoft, Teradata etc. invested a significant amount of resources &mdash; both financial and scientists &mdash; to create beautiful products for data consumers. Oracle DB, IBM DB2, Microsoft SQL Server, Teradata DB were the pioneers in that sector, and they are still relevant. Most of the time, language developers or analysts interact with these systems with Structured Query Language a.k.a. SQL. Most of the engineering work was already done by the vendor companies. Kudos to Oracle, MS, IBM for their tremendous optimization work, tooling and accelerators they have built for programming communities. These databases have been backing countless web applications, analytics and decision-making systems for 3+ decades now. Invaluable contribution, isn’t it?

The above paragraph explained how the databases came about and how they revolutionized the data world. With all the good things they brought to the table, they introduced the most difficult problem to tackle - “Hunger for more”! Success is very addictive in nature, especially in engineering. Starting from the discovery to fire, wheel, motor and spaceship it has never stopped, only accelerated. The same is true for the data space.

## Core Aspects of Big Data: Volume, Velocity, Variety

There was a point in time &mdash; for example, when we needed tens of databases in an organization &mdash; when it was obvious that data volume would increase and that happened quickly. Big data is about **volume**. Volumes of data that can reach unprecedented heights. It’s estimated that _10 quintillion_ bytes of data is created each day, and as a result, there will be _180 zettabytes_ of data created by 2025 – which highlights an increase of 1000 times from 2005. As a result, it is now not uncommon for large companies to have Terabytes – and even Petabytes – of data in storage devices and on servers. This data helps to shape the future of a company and its actions, all while tracking progress.

The growth of data, and the resulting importance of it, has changed the way we see data. There once was a time when we couldn't see the importance of data in the corporate world, but with the change of how we gather it, we’ve come to rely on it day to day. **Velocity** measures how fast the data is coming in. Some data will come in real-time, whereas others will come in fits and starts, sent to us in batches. And as not all platforms will experience the incoming data at the same pace, it’s important not to generalize, discount, or jump to conclusions without having all the facts and figures.

**Data formats** are changing every day. Once there was a time when data format was flat file, say CSV, then we saw excel, TSVs, JSON, XML, AVRO, Parquet, ORC etc. Data is not just structured ones, today we generate more unstructured data than structured ones.

Tackling the 3Vs of Big Data involved the first use case of the conventional data systems or the _Relational databases_. The architecture of such RDBMS systems is following one trend that tightly couples storage and compute systems. Use cases around the globe were never similar in practice, e.g. that you will add 100TB storage and that 100TB hardware will be used all the time for compute. Hadoop came in the late 90s to manage big data at scale, and they made the storage and compute _separate_. Since then Hadoop managed it with style, and we got several services such as MapReduce, Pig, Hive, Spark and mode. Today there is no better compute framework than Spark, which is cheap and efficient.

All these technologies around big data require varied skill sets which are not restricted to just writing SQLs or scripting. There are multiple arguments that can come to support the likes of cloud DWs (data warehouses) where just knowing a few admin commands and writing SQLs will help you survive in this competitive market but that requires a tremendous amount of money to support them, and you are locked-in with their features. A data engineer is a technologist who is a blend of many skill-sets borrowed from different streams. A real data engineer is a software engineer to the core, a programmer at heart, an excellent SQL developer, a hardware optimizer and more. Let us explore and understand what we really need to excel at, so we can be hailed as a Data Engineer!

## The Core strengths of a Data Engineer

A data engineer’s life is not easy. When a web application fails to render data due to slowness in the back end database, a data engineer gets a call at night. If a business user is stuck getting data from a streaming system and waiting for the queue to get cleared up, they look for a data engineer. An ETL job overrunning and crossing SLAs (service level agreements), someone will wake up the data engineer from a good sleep. Collectively a data engineer should possess some of the best virtues of a solid engineering mind.

**Problem solving**: Problems should excite a data engineer, be it performance issues, governance issues, access issues, memory leaks or even data modeling. We get them every day, and we should enjoy them and take them as a challenge, instead of running away from them. Problems and their solutions will mold you into a different breed. The more you live in this mindset, the richer your solutions will be and people will see that coming out of you when you speak, when you suggest, when you design.

**Optimization**: Systems are built by humans. For ages, we've been creating systems which pretended to be optimal in nature but every time they failed us. This is so true even with all the modern day data engineering frameworks and platforms. They are optimal to some extent, but in the end they need a data engineer to push their limits. There's no better example than Apache Spark. It does so many things on its own but not everything. When it surrenders to the limitation, then the job of a great data engineer starts.

**Anticipation**: When you design a solution, you should also try to anticipate the good (strengths) and the bad (limitations). It gives you confidence, it builds your design thinking. Think one step further: what can ruin the dream? What could crash this solution?

**Balance - Tech or Functional**: At the end of the day we are implementing functionality (in terms of business) and all the functionalities are possible with technical abilities (raw programming skills). Understand the problem first and become a good listener to win. The more you understand the problem statement, the better you can balance.

**Simplification**: Whatever it may take to sacrifice, do not over-engineer a process. Simplicity is the policy. The more you overcomplicate your system, the harder it will bite you in the future. Visualizing the future is a great skill to practice.

**Learning**: Self-development never ends, and it needs to be consistent. Do not become a rabbit! Keep being the tortoise. This is a very cruel and changing world. Anytime you become over-confident and think of resting, you are gone. Try to read, try to assimilate that every day for at least 1 hour. Make it a habit. Stay relevant in the market.

**Breadth and Depth**: Every problem in the data engineering world is unique in nature and needs special attention. The more you try to generalize it, you will lose on the resourcing and optimization. Understand what is required where. You don’t need Spark always, you don’t need SQL always. Understand all tools, but use the best one for the job.

## What Should I Learn to Become a Data Engineer?

As we saw above, a data engineer is a programmer, so the first thing that we need to be solid at is “Programming”. The fundamentals of programming concepts such as data modeling, OOP, basic packaging, organizing code and understanding programming paradigms is so important. Now questions can arise about what language to learn. You should learn a few basic ones (we'll talk shortly), then you can go above and beyond.

### SQL & Data Modeling

The most common skill that all data engineers should possess is obviously SQL, but it is the least important one from the engineering point of view. In a few years SQL will be taught in schools. This supports the largest variety of applications in the entire world for ad-hoc usage, dashboards, analytics etc. If you say you don’t know SQL then you will be in trouble. On the other hand, you have to understand data systems in depth. Understanding of data warehousing concepts and data modeling is important. SQL has no value unless you know how to model your data.

### A JVM language

A Java virtual machine (JVM) is a virtual machine that enables a computer to run Java programs as well as programs written in other languages that are also compiled to Java bytecode. The JVM is detailed by a specification that formally describes what is required in a JVM implementation. Let us see the advantages of JVM.

- Platform independence: Java is meant for “write once, run anywhere”. Native languages like C/C++ compiled to match the specific platform, while Java code is compiled into bytecode. JVMs can interpret bytecode instructions into the native language for the specific platform.
- Common API: the other massive benefit of using JVM is a common API to work with platform-specific resources. You don't need to worry about how to handle File Input/Output (I/O) on every possible platform when JVM will do it for you; same thing with other resources like memory, networking, input-output devices, etc. A plethora of Java libraries including common ones that are available in JRE, JVM programming language has access to all of them as if they were part of their own language.
- Memory management: when you are on a JVM, then there is no need to reserve memory for a newly created array or to manipulate with pointers trying to simply work with arrays. The Java Virtual Machine will handle memory management. It will allocate the required memory for variables and objects. Then the memory access is tracked and the JVM subsystem Garbage Collector (GC) can reclaim unused memory when it's time. GC is not perfect and along with its usefulness it introduces slight performance degradation. The main benefit of JVM memory management is that when developing software, there is no need to think when to allocate memory and when to release it. The most popular problem with unmanaged languages like C is a memory leak that was introduced by a program itself.
- Many languages: Java is not the only programming language that runs on the JVM. There are more advantages of using JVM than disadvantages. A lot of modern popular languages are designed specifically for the JVM, such as Scala, Groovy, Closure, and Kotlin.

### The two champions - Java and Scala

Java is an excellent start. Java is admired and acknowledged around the world for its versatile framework support, adoption and ease of use. Java adds value to your resume for the same reason. Once you learn Java programming basics, the OOP semantics gives you an edge compared others to rise to the next level. Learning Java is not just about the language itself, but it helps you understand the _programming paradigm_. If you are asked to create a customer object and orders object, how are you going to design their relationship? What are the parameters a customer could have, and what can you keep in common between a customer and an order? How can the quality of a customer or an order can be used as interfaces? Or a product categorized into child products? These skills are vital and once you master them, behavioral engineering design will come naturally in your solutions.

Scala is the most serious investment that you could make in your lifetime. If you have ever worked with Java it will be very easy for you to pick up Scala, but even if you don’t, then also it will be quite a good friend to you. Scala has so much importance in the big data world. The best rated ETL framework (Spark) is written in Scala, the best messaging framework (Kafka) is written in Scala, and many more to name. The functional programming in Scala adds modularity in your code. Moreover, with Scala you can write your program concise. All the applications in big data today (or in the recent past) has in some way or another used Scala as backbone. Assume you create some type-safe API over Kafka Streams, no better choice than Scala. You want to tweak or extend some Spark features or want to use Datasets for creating some nice app, you need to be skilled with Scala. It is never late to invest in learning. So hurry up!

### Hadoop Basics & Distributed Computing

Hadoop is just like learning the alphabet! Hadoop brought life into big data. It is old, but it is gold. You might think, "this is 2022, why is Ani emphasizing learning Hadoop?!" Well, there are a lot of people who think we can avoid it. The truth is, without knowing a true sense distributed system which supports scalable storage and compute services, one can not become a data engineer in reality. Learn Hadoop basics with some serious dedication, learn how it stores files, how it retrieves them. How the partitioning works, how even it looks up to a file chunk so efficiently, what is the best way to store the metadata and how to govern it. Once you learn Hadoop in depth the rest of the path becomes very easy and interesting.

### Spark

Today in the big data world there is no escape from Spark. Spark is everywhere. You want to read data from Amazon S3 and load it to Cassandra at scale, use Spark. You want to read from Apache Kafka and run some transformation on it and store it to Mongo DB, use Spark. You want to create a streaming app on top of message queues, you use Spark there too. The cheapest, the smartest distributed computing framework ever created. The most important part of Spark that we have to learn is [Spark](https://rockthejvm.com/p/spark) core, Spark SQL, [Structured Streaming](https://rockthejvm.com/p/spark-streaming), [Spark Optimization](https://rockthejvm.com/p/spark-optimization). The knowledge of tuning a Spark cluster and resources push you to become the best rated data engineer.

### Kafka

There are and will be a lot of streaming/messaging systems but Kafka is just the best in the lot, in a similar place as Spark in computing engines. You can learn any distributed message queues and understand others. Considering the community support and live applications in the entire world no one can beat Kafka at this moment. Bag it!

### Scripting

A scripting language like Unix shell or Python will be good enough to get basic operations such as file handling, calling APIs etc. Suppose you want to run a Spark job on AWS EMR with a spark-submit. You can do it by a Python shell with boto3 libraries. Scripts can achieve many things: avoid repetitive work by automations, backups, monitoring, "firefighting" in case of a disaster, and more.

## Non-Technical Skills of Data Engineers

We have enough to read about the technical acumen you need to become a data engineer. Now there are few other important qualities to become a “Successful” engineer. Yeah, it needs a lot of behavioral qualities as well.

Do we have enough of them?

Even possessing a plethora of technical skills, these days a data engineer in true sense is just like witnessing a unicorn outside your courtyard. Let’s talk about some key non-technical skill sets a data engineer should possess before even thinking about a career shift.

- Have some “peace of mind”: Emerging professionals around the world, be it software engineers or data engineers, are restless and running after quick success and collecting fame with shortcuts. There’s no shortcut to success. Peace of mind is such a nice quality to grow within, which can help anyone to be firm in critical situations and keep the path steady.
- Be a listener first: Most of the time we make mistakes just because we do not wait to understand the problem holistically. We don’t listen but we propose opinions. 50% of the job is done when we listen to the problem statement and then think.
- Take it slow and steady: Being first/fast doesn't make you optimal. Look into your solution 5 times more to validate with a 360 degree view. You miss it, and someone will have to correct you, which wastes everyone's time and your growth will suffer.
- Read regularly: Reading “anything” of your interest at least 1 hour every day will give you such value that you can not even imagine. Take some idea that sparked your interest, read about it, live it and dream about it.
- Remember you don’t know everything: Be a humble student, that makes 100% of the job. You are not an authority of anything but your character, your true self.
- Ask for help: Ask for help from colleagues and professionals, no question is a bad question. Often, a question for one is a question for all, and everybody can learn.

## Conclusion

_This is Daniel again &mdash; I hope this article gave you some insight and inspiration of what a Data Engineer means, what kind of skills you need to be a successful one like Ani, and what you should learn and focus on. Ani writes on his own [Medium blog](https://thedatafreak.medium.com) and you can find him on [LinkedIn](https://www.linkedin.com/in/anigos/) and in the Rock the JVM private room on Slack, where he helps everyone interested in Data Engineering._
