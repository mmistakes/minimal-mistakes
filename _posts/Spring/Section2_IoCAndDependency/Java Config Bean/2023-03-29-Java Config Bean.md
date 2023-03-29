---
layout: single
title: "What is Java Config Bean?"
categories: Spring
tag: [Java,IoC,Inversion of Control,Java Config Bean,"@Bean","@Configuration"]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---

# Java Config Bean 코드로 이해하기

## Development Process
1. Create @Configuration class
2. Define @Bean method to configure the bean
3. Inject the bean into our controller

### Step 1: Create a Java class and annotate as @Configuration

```java
import org.springframework.context.annotation.Configuration;  
  
@Configuration  
public class SportConfig {  
  

}
```

### Step 2: Define @Bean method to configure the bean

```java
import 
import org.springframework.context.annotation.Bean;org.springframework.context.annotation.Configuration;  
  
@Configuration  
public class SportConfig {  
  
    @Bean()  // The bean id defaults to the method name
    public Coach swimCoach(){  
        return new SwimCoach();  
    }  
}
```

### Step 3: Injeact the bean into our controller

```java

@RestController  
public class DemoController {  
  
    private Coach myCoach;  
  
    @Autowired  
    public DemoController(  
		    //Inject the bean using the bean Id
            @Qualifier("swimCoach") Coach theCoach){  
        System.out.println("In constructor: " + getClass().getSimpleName());  
        myCoach = theCoach;  
    }  
  
  
    }

```

## Use case for @Bean
- You may wonder...
	- *Using the "new" keyword ... is that it??*
	- *Why not just annotate the class with @Component?*
- Make an existing third-party class available to Spring framework
- You may not have access to the source code of third-party class
- However, you would like to use the third-party class as a Spring bean

## Real-World Project Example
- Our project used Amazon web service(AWS) to store documents
- We wanted to use the AWS S3 client as a Spring Bean in our app
- The AWS S3 client code is part of AWS SDK
	- We can't modify the AWS SDK source code
	- We can't just add @Component
- However, we can configure it as a Spring bean using @Bean

## Configure AWS S3 Client using @Bean

```java
@Configuration
public class DocumentConfig{

	@Bean
	public S3client remoteClient(){
	//create an S3 client to connect to AWS S3
	ProfileCredentialsProvider credentialsProvider =   
	ProfileCredentialsProvider.create();
	Region region = Region.US_EAST_1;
	S3Client s3Client = S3Client.builder()
	.region(region)
	.credentialsProvider(credentialsProvider)
	.build();
return s3Client;
	
	}

}
```

## Inject the S3Client as a bean

```java
@Component
public class DocumentsService{
	private S3ClientService {
	@Autowired
	public DocumentsService(S3Client theS3client){
		s3Client = theS3client;
	}
	}
}
```
- You have this private S3 client, and then you can auto-wire in this ~~~

## Store our documents in S3

```java
@Component
public class DocumentsService {

	private S3Client s3Client;

	@Autowired
	public DocumentsService(S3Client theS3Client){
		s3Client = theS3Client;
	}
	public void processDocument(Document theDocument){
		// get the document input stream and file size
		// Store document in AWS S3
		// Create a put request for the object
		PutObjectRequest putObjectRequest = PutObjectRequest.builder()
			.bucket(bucketName)
			.key(subDirectory + "/" +fileName)
			.acl(ObjectCannedACL.BUCKET_OWNER_FULL_CONTROL).build();
		// perform the putObject operation to AWS S3 .. using our autowired bean
		s3Client.putObject(putObjectRequest, RequestBody, formInputStream(fileInputStream, contentLength));
	}


}
```

### 간단히
```java
package com.luv2code.springcoredemo.config;  
  
import com.luv2code.springcoredemo.common.Coach;  
import com.luv2code.springcoredemo.common.SwimCoach;  
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Configuration;  
  
@Configuration  
public class SportConfig {  
  
    @Bean("aquatic")  
    public Coach swimCoach(){  
        return new SwimCoach();  
    }  
}
```

```java
package com.luv2code.springcoredemo.rest;  
  
import com.luv2code.springcoredemo.common.Coach;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.beans.factory.annotation.Qualifier;  
import org.springframework.web.bind.annotation.GetMapping;  
import org.springframework.web.bind.annotation.RestController;  
  
@RestController  
public class DemoController {  

    private Coach myCoach;  

    @Autowired  
    public DemoController(  
            @Qualifier("aquatic") Coach theCoach){  
        System.out.println("In constructor: " + getClass().getSimpleName());  
        myCoach = theCoach;  
    }  
  
    @GetMapping("/dailyworkout")  
    public String getDailyWorkout(){  
        return myCoach.getDailyWorkout();  
    }  
  
  
    }

```
- bean id 디폴트 값은 메소드 이름

## Wrap up
- We could use the Amazon S3 Client in our Spring application
- The Amazon S3 Client class was not originally annotated with @Component
- However, we configured the S3 Client as a Spring Bean using @Bean
- It is now a spring Bean and we can inject it into other services of our application
- *Make an existing third-party class available to Spring framework*