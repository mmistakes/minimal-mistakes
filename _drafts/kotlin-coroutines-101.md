---
title: "Kotlin Coroutines 101"
date: 2022-12-14
header:
  image: "/images/blog cover.jpg"
tags: [kotlin, coroutines, concurrency]
excerpt: ""
---

This article introduces Kotlin coroutines, a powerful tool for asynchronous programming. Kotlin's coroutines fall under the umbrella of structured concurrency, and, basically, they implement a model of concurrency that is similar to Java virtual threads, Cats Effect and ZIO fibers.

The article requires a minimum knowledge of the Kotlin language, but if you came from a Scala background, you should be fine.

## 1. Background and Setup

All the examples we'll present requires at least version 1.7.20 of the Kotlin compiler and version 1.6.4 of the Kotlin Coroutines library. In fact, whereas the basic building blocks of coroutines are available in the standard library, the full implementation of the structured concurrency model is available in an extension library, called `kotlinx-coroutines-core`.

We'll use the following Maven file to resolve dependency and build the code.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.rockthejvm</groupId>
    <artifactId>kactor-coroutines-playground</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <kotlin.version>1.7.20</kotlin.version>
        <kotlinx-coroutines.version>1.6.4</kotlinx-coroutines.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlinx</groupId>
            <artifactId>kotlinx-coroutines-core</artifactId>
            <version>${kotlinx-coroutines.version}</version>
        </dependency>
    </dependencies>

    <build>
        <sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
        <testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>

        <plugins>
            <plugin>
                <groupId>org.jetbrains.kotlin</groupId>
                <artifactId>kotlin-maven-plugin</artifactId>
                <version>${kotlin.version}</version>

                <executions>
                    <execution>
                        <id>compile</id>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>

                    <execution>
                        <id>test-compile</id>
                        <goals>
                            <goal>test-compile</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

Clearly, it's possible to create a similar building file for Gradle, but we'll stick to Maven for the sake of simplicity.

