# Overview

In this Spring Framework tutorial, we'll demonstrate how to use annotations related to dependency injection, namely the _@Resource_, _@Inject_, and _@Autowired_ annotations. These annotations provide classes with a declarative way to resolve dependencies:

```java
@Autowired 
ArbitraryClass arbObject;
```

As opposed to instantiating them directly (the imperative way):

```java
ArbitraryClass arbObject = new ArbitraryClass();
```

Two of the three annotations belong to the Java extension package: _javax.annotation.Resource_ and _javax.inject.Inject_. The _@Autowired_ annotation belongs to the _org.springframework.beans.factory.annotation_ package.

Each of these annotations can resolve dependencies either by field injection or by setter injection. We'll use a simplified, but practical example to demonstrate the distinction between the three annotations, based on the execution paths taken by each annotation.

The examples will focus on how to use the three injection annotations during integration testing. The dependency required by the test can either be an arbitrary file or an arbitrary class.
