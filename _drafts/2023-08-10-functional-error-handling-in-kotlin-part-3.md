---
title: "Functional Error Handling in Kotlin, Part 3: The Raise DSL"
date: 2023-08-10
header:
    image: "/images/blog cover.jpg"
tags: [kotlin]
excerpt: ""
toc: true
toc_label: "In this article"
---

_By [Riccardo Cardin](https://github.com/rcardin)_

It's time to end our journey on functional error handling in Kotlin with the new features introduced by the Arrow library in version 1.2.0, which are a preview of the big rewrite we'll have in version 2.0.0. We'll mainly focus on the `Raise` DSL, a new way to handle typed error using [Kotlin contexts](https://blog.rockthejvm.com/kotlin-context-receivers/). This article is part of a series: We can always reference the previous parts using this links:

* [Functional Error Handling in Kotlin, Part 1: Absent values, Nullables, Options](https://blog.rockthejvm.com/functional-error-handling-in-kotlin/)
* [Functional Error Handling in Kotlin, Part 2: Result and Either](https://blog.rockthejvm.com/functional-error-handling-in-kotlin-part-2/)

Without further ado, let's start!

## 1. Setup

We'll use version 1.9.0 of Kotlin and version 1.2.0 of the Arrow library. In fact, the Raise DSL is not available in previous versions of Arrow.

Since the context receivers are still an experimental feature, we need to enable them explicitly. In the article [Kotlin contexts](https://blog.rockthejvm.com/kotlin-context-receivers/), we saw how to enable context receivers using Gradle. This time, we see how to do it in Maven. We need to pass the property `-Xcontext-receivers` to the `kotlin-maven-plugin`, using the appropriate `configuration` element:

```xml
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
    <configuration>
        <args>
            <arg>-Xcontext-receivers</arg>
        </args>
    </configuration>
</plugin>
```

As usual, we'll put a copy of the `pom.xml` file we use at the end of the article.

## 2. The Domain

We'll use extensively the domain model we introduced in the first two articles of the series. We want to create an application that manages a job board. The main types of the domain are:

```kotlin
data class Job(val id: JobId, val company: Company, val role: Role, val salary: Salary)

@JvmInline
value class JobId(val value: Long)

@JvmInline
value class Company(val name: String)

@JvmInline
value class Role(val name: String)

@JvmInline
value class Salary(val value: Double) {
    operator fun compareTo(other: Salary): Int = value.compareTo(other.value)
}
```

Moreover, we'll simulate a database of jobs using a `Map<JobId, Job>`:

```kotlin
val JOBS_DATABASE: Map<JobId, Job> = mapOf(
    JobId(1) to Job(
        JobId(1),
        Company("Apple, Inc."),
        Role("Software Engineer"),
        Salary(70_000.00),
    ),
    JobId(2) to Job(
        JobId(2),
        Company("Microsoft"),
        Role("Software Engineer"),
        Salary(80_000.00),
    ),
    JobId(3) to Job(
        JobId(3),
        Company("Google"),
        Role("Software Engineer"),
        Salary(90_000.00),
    ),
)
```

A `Jobs` module will handle the integration with the database:

```kotlin
interface Jobs
```

Now that we have defined the domain model and the module that will contain the algebra to access it, it's time to start to show how the new Raise DSL works.

## X. Appendix: Maven Configuration

As promised, here is the full Maven configuration we used in this article:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>in.rcard</groupId>
    <artifactId>functional-error-handling-in-kotlin</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <properties>
        <kotlin.version>1.9.0</kotlin.version>
        <arrow-core.version>1.2.0</arrow-core.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
        <dependency>
            <groupId>io.arrow-kt</groupId>
            <artifactId>arrow-core</artifactId>
            <version>${arrow-core.version}</version>
            <type>pom</type>
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
                <configuration>
                    <args>
                        <arg>-Xcontext-receivers</arg>
                    </args>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>7</source>
                    <target>7</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```