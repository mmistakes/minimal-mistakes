---
layout: single
title: Download
sidebar: 
  nav: "docs"
---

Using our Maven **[repository](http://bigiot-cd.westeurope.cloudapp.azure.com:18081/nexus/content/repositories/releases/)**, you can easily download the API and incorporate it into your project:

### Core Lib

The basic functionality of the BIG IoT API for providers and consumers. This lib is Java 7 compliant.

```xml
<dependency>
  <groupId>org.bigiot.lib</groupId>
  <artifactId>bigiot-lib-core-0.7.0</artifactId>
  <version>0.7.0</version>
</dependency>
```

### Advanced Lib

This lib extends the *Core Lib* and contains advanced features. It is Java 8 compliant and supports language elements such as CompletableFutures and lambdas.

```xml
<dependency>
  <groupId>org.bigiot.lib</groupId>
  <artifactId>bigiot-lib-advanced-0.7.0</artifactId>
  <version>0.7.0</version>
</dependency>
```

### Embedded Spark

This lib extends the *Advanced Lib* and embedds a lightweight Web server ([Spark](http://sparkjava.com/)). Particularly, if you want to provide IoT offerings this can be the basis for building a gateway to your platform or service.

```xml
<dependency>
  <groupId>org.bigiot.lib</groupId>
  <artifactId>bigiot-lib-embeddedspark-0.7.0</artifactId>
  <version>0.7.0</version>
</dependency>
```
