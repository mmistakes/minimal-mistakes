---
layout: single
title: Download
sidebar: 
  nav: "docs"
---

**You'll find the most recent version number of the Big IoT Lib in the [Release Notes](/releaseNotes)**

Using our Maven **[repository](https://nexus.big-iot.org/content/repositories/releases/)**, you can import the BIG IoT Lib into your software project:

*Make sure you replace x.y.z with the correct version number*

### Core Lib

The basic functionality of the BIG IoT Lib for providers and consumers. This lib is Java 7 compliant.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.eclipse.bigiot.lib</groupId>
  <artifactId>bigiot-lib-core</artifactId>
  <version>x.y.z</version>
</dependency>
```

Import as Gradle dependency: 
```xml
compile 'org.eclipse.bigiot.lib:bigiot-lib-core:x.y.z'
```

### Advanced Lib

This lib extends the Core Lib and introduces lambda as well as asynchronous computation support via functional interfaces and *CompletableFuture*.  It requires Java 8+.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.eclipse.bigiot.lib</groupId>
  <artifactId>bigiot-lib-advanced</artifactId>
  <version>x.y.z</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.eclipse.bigiot.lib:bigiot-lib-advanced:x.y.z'
```

### Embedded Spark

This extends the Advanced Lib with an implementation for deploying your offering on the programmatic Web server ([Spark](http://sparkjava.com/)). You can use this lib, if you your BIG IoT Offering is provider side integrated on a gateway service.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.eclipse.bigiot.lib</groupId>
  <artifactId>bigiot-lib-embeddedspark</artifactId>
  <version>x.y.z</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.eclipse.bigiot.lib:bigiot-lib-embeddedspark:x.y.z'
```

### Android

This lib extends the *Core Lib* and adds Android-specific features. This is your choise of lib, if you want to develop an Android app as a consumer of BIG IoT platforms, or even if you develop a provider based on the Android system.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.bigiot.lib.android</groupId>
  <artifactId>bigiotlib</artifactId>
  <version>x.y.z</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.bigiot.lib.android:bigiotlib:x.y.z'
```

