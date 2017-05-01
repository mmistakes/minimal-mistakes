---
layout: single
title: Download
sidebar: 
  nav: "docs"
---

Using our Maven **[repository](http://bigiot-cd.westeurope.cloudapp.azure.com:18081/nexus/content/repositories/releases/)**, you can easily download the API and incorporate it into your project:

### Core Lib

The basic functionality of the BIG IoT API for providers and consumers. This lib is Java 7 compliant.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.bigiot.lib</groupId>
  <artifactId>bigiot-lib-core-0.7.1</artifactId>
  <version>0.7.1</version>
</dependency>
```

Import as Gradle dependency: 
```xml
compile 'org.bigiot.lib:bigiot-lib-core:0.7.1'
```

### Advanced Lib

This lib extends the *Core Lib* and contains advanced features. It is Java 8 compliant and supports language elements such as CompletableFutures and lambdas.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.bigiot.lib</groupId>
  <artifactId>bigiot-lib-advanced-0.7.1</artifactId>
  <version>0.7.1</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.bigiot.lib:bigiot-lib-advanced:0.7.1'
```

### Embedded Spark

This lib extends the *Advanced Lib* and embedds a lightweight Web server ([Spark](http://sparkjava.com/)). Particularly, if you want to provide IoT offerings this can be the basis for building a gateway to your platform or service.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.bigiot.lib</groupId>
  <artifactId>bigiot-lib-embeddedspark-0.7.1</artifactId>
  <version>0.7.1</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.bigiot.lib:bigiot-lib-embeddedspark:0.7.1'
```

### Android

This lib extends the *Core Lib* and adds Android-specific features. This is your choise of lib, if you want to develop an Android app as a consumer of BIG IoT platforms, or even if you develop a provider based on the Android system.

Import as Maven dependency: 
```xml
<dependency>
  <groupId>org.bigiot.lib.android</groupId>
  <artifactId>bigiotlib-0.7.1</artifactId>
  <version>0.7.1</version>
</dependency>
```

Import as Gradle dependency:  
```xml
compile 'org.bigiot.lib.android:bigiotlib:0.7.1'
```

