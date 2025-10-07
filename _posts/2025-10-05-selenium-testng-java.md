---
title: "Build Framework Selenium TestNG Java from Scratch"
categories:
  - Selenium
  - TestNG
  - Java
tags:
  - Selenium
  - TestNG
  - Java
---
How to build automation framework by Selenium TestNG Java from scratch, for beginner.

### Prerequisite
* Java latest: 24
* Selenium latest
* TestNG latest
* Allure report
* Log4j2

### Framework structure
```
framework/
├── src
│   ├── main
│   │   └── java
│   │       ├── constants
│   │       │   ├── FrameworkConstants.java
│   │       ├── driver
│   │       │   └── DriverManager.java
│   │       ├── reports
│   │       │   └── AllureManager.java
│   │       └── utils
│   │           ├── LogUtils.java
│   │           └── BasePage.java
│   └── test
│       ├── java
│       │   ├── common
│       │   │   ├── BaseTest.java
│       │   ├── listeners
│       │   │   ├── Retry.java
│       │   │   └── TestListener.java
│       │   ├── pageAction
│       │   │   ├── SwagLabHomePageAction.java
│       │   ├── pageUI
│       │   │   └── SwagLabHomePageUI.java
│       │   └── testCase
│       │        ├── AddToCart.java
│       ├── resources
│       │   ├── config
│       │   │   ├── config.properties
│       │   │   └── log4j2.xml
│       │   └── suites
│       │       ├── test.xml
├── pom.xml
└── target
```
