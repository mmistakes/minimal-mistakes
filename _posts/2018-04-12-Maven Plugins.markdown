---
title:            "Maven Plugins"
date:             2018-04-12 00:00:00 -0500
categories:       IT
tag:              [maven,java]
---

This is a list of maven plugins I have found useful. 

## Maven Plugins
1. maven-compiler-plugin
  - Compiles using the standard location Maven specifies e.g. /src/main/java and /src/main/resources.
  - Compiles using the JDK versions specified.
2. maven-surefire-plugin
  - The default plugin for running unit tests
  - surefire:test 
3. maven-dependency-plugin
  - To debug or understand a POM and how you get some dependency (transitively)
  - dependency:analyze
  - dependency:tree
4. maven-jar-plugin
  - Creates a Java Archive (JAR) file from the compiled project classes and resources.
  - Specifies the 'main class' to be executed.
  - Helps with composing a custom manifest file.
5. maven-jetty-plugin
  - Uses an embedded Jetty Servlet container to run your Java web application.
  - jetty:run  
6. maven-war-plugin
  - Creates a Web Archive (WAR) file from the compiled project classes, resources, and web.xml.
7. maven-deploy-plugin
  - Uploads the project artifacts (JAR, WAR, etc) to the internal remote repository.
8. maven-resource-plugin
  - Copies both the main and test resources to the output directory.
9. spring-boot-maven-plugin
  - Collects all the jars on the classpath and builds a single and runnable uber-jar.
  - Provides a built-in dependency resolver that sets the version number to match Spring Boot dependencies.
10. maven-enforcer-plugin
  - Controls certain environmental constraints such as Maven version, JDK version and OS family.
  - enforcer:enforce executes rules for each project in a multi-project build.
  - enforcer:display-info display the current information as detected by the built-in rules.
11. docker-maven-plugin
  - Used for building a Docker image in Maven.
12. cargo-maven2-plugin
  - Designed for configuring, starting, stopping, and deploying applications to a range of supported containers.
13. maven-assembly-plugin
  - allows you to create your project distribution in zip or tar format
  - assembly:single 
14. jdeb
  - Provides an Ant task and a Maven plugin to create Debian packages from Java builds in a truly cross platform manner.
15. jaxb2-maven-plugin
  - Generate Java classes from XML Schemas (and optionally binding files) and to create XML Schemas from annotated Java classes.
  - jaxb2:schemagen Creates XML Schema Definition (XSD) file(s) from annotated Java sources.
  - jaxb2:testSchemagen Creates XML Schema Definition (XSD) file(s) from annotated Java test sources.
  - jaxb2:xjc Generates Java sources from XML Schema(s).
  - jaxb2:testXjc Generates Java test sources from XML Schema(s).
16. maven-shade-plugin
  - Packages the artifact in an uber-jar, including its dependencies and to shade - i.e. rename - the packages of some of the dependencies.
  - shade:shade is bound to the package phase and is used to create a shaded jar.
