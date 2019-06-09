---
title: "'multipartResolver' 빈 생성 실패 오류"
date: 2019-06-09
categories: error
comments: true
---


> Error creating bean with name 'multipartResolver': Lookup method resolution failed

## ERROR  
스프링에서 Multipart 기능을 사용하기 위해 MultipartResolver를 등록해주어야 한다.  
MultipartResolver는 CommmnosMultipartResolver 클래스를 빈으로 등록하여 사용한다.

---
```
//dispatcher-servlet.xml
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <property name="defaultEncoding" value="utf-8"/>
    </bean>
```

위 코드처럼 dispatcher-servlet.xml 파일에 빈을 등록하고 서버를 실행하면 위 에러메시지 처럼 빈을 생성할 수 없다는 메세지가 나올 수도 있다.

CommmnsMultipartResolver클래스는 **CommonsFileUpload API**를 이용하는데, **CommonsFileUpload API를 찾을 수 없어서 발생**하는 오류이다.

## SOLUTION
pom.xml파일에 commons-fileupload 디펜더시를 등록한다.

[Download commons-fileupload 1.4](https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload/1.4) 

```
//pom.xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>
```

