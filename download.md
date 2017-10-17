---
layout: single
title: Download
sidebar: 
  nav: "docs"
---

Using our Maven **[repository](https://nexus.big-iot.org/content/repositories/releases/)**, you can import the BIG IoT Lib into your software project:

### Core Lib

The basic functionality of the BIG IoT Lib for providers and consumers. This lib is Java 7 compliant.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.eclipse.bigiot.lib</groupId>
  <artifactId>bigiot-lib-core</artifactId>
  <version>0.9.5</version>
</dependency>
```

Import as Gradle dependency: 
```xml
compile 'org.eclipse.bigiot.lib:bigiot-lib-core:0.9.5'
```

### Advanced Lib

This lib extends the *Core Lib* and contains advanced features. It is Java 8 compliant and supports language elements such as CompletableFutures and functional interfaces.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.eclipse.bigiot.lib</groupId>
  <artifactId>bigiot-lib-advanced</artifactId>
  <version>0.9.5</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.eclipse.bigiot.lib:bigiot-lib-advanced:0.9.5'
```

### Embedded Spark

This lib extends the *Advanced Lib* and embedds a lightweight Web server ([Spark](http://sparkjava.com/)). Particularly, if you want to provide IoT offerings this can be the basis for building a gateway to your platform or service.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.eclipse.bigiot.lib</groupId>
  <artifactId>bigiot-lib-embeddedspark</artifactId>
  <version>0.9.5</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.eclipse.bigiot.lib:bigiot-lib-embeddedspark:0.9.5'
```

### Android

This lib extends the *Core Lib* and adds Android-specific features. This is your choise of lib, if you want to develop an Android app as a consumer of BIG IoT platforms, or even if you develop a provider based on the Android system.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.bigiot.lib.android</groupId>
  <artifactId>bigiotlib</artifactId>
  <version>0.7.2</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.bigiot.lib.android:bigiotlib:0.7.2'
```

