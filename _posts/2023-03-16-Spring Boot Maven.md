# Maven 이란?

대세 + 장단점 모두 Gradle이 좋으며 점점 Gradle로 넘어가고 있다고 한다.

Maven을 아직도 쓰는 이유는 아직 많은 개발자들이 XML에 더 익숙하기도 하고
아직 Gradle을 잘 사용하는 개발자들이 상대적으로 적어서라고 한다.

당연히 나도 이왕 하는거 Gradle로 배우고 싶지만 강의가 Maven으로 가르킨다. ㅜ
뭐 배우고 Gradle로 다시 구현해보는 방식으로 해봐야겠다.

![Pasted image 20230315001034.png](../images/2023-03-16-Spring%20Boot%20Maven/719ad3cc62fb15beca4ff64d3785917282136207.png)

작동 방식은 Maven을 이용해서 구성 파일을 먼저 읽은 다음 컴퓨터에 있는 Maven Local Repository를 확인한다.
Local Repository에 파일이 없으면 Maven은 인터넷에서 파일을 가져온다.
Dependency 라던가 클래스 경로등 알아서 처리해준다.

심부름꾼 비슷하다.

## Maven Key Concepts

- POM file - pom.xml

- Project Coordinates

### POM file - pom.xml

- Project Object Model file - 프로젝트 객체 모델 파일

- Configuration file for the project  - Basically the "shopping list" for Maven

### pom.xml

![](../images/2023-03-16-Spring%20Boot%20Maven/2023-03-17-13-21-44-image.png)

```java
<project....>
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0-SNAPSHOT</version>

  <properties>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

<!-- add plugins for customization -->
// JUnit test repots etc..
</project>
```

## Project Coordinates

- Project Coordinates uniquely identify a project

- Similar to GPS coordinates for your house: latitude / longtitude

- Precise information for finding your house (city, street, house #)
  
  ```java
    <groupId>com.mycompany.app</groupId>  --> City
    <artifactId>my-app</artifactId> --> Street
    <version>1.0-SNAPSHOT</version> --> House Number
  ```

### Project Coordinates - Elements

Group ID -> Name of company, group, or organization
                    Convention is to use reverse domain name: **com.mycompany.app**

Artifact ID -> Name for this project : **my-app**

Version ->  A specific release version like : 1.0 , 1.6 ....

                    if project is under active development then : 1.0 - snapshot

### Example of project coordinates

```java
  <groupId>com.mycompany.app</groupId>  --> City
  <artifactId>my-app</artifactId> --> Street
  <version>1.0-SNAPSHOT</version> --> House Number

  <groupId>org.springframework</groupId>  --> City
  <artifactId>spring-context</artifactId> --> Street
  <version>6.0.0</version> --> House Number

  <groupId>org.hibernate.com</groupId>  --> City
  <artifactId>hibernate-core</artifactId> --> Street
  <version>6.1.4.Final</version> --> House Number
```

## Adding Dependencies

```java
<project....>
...

  <dependencies>

   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.0.0</version>
    </dependency>

   <dependency>
      <groupId>org.hibernate.orm</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>6.1.4.Final</version>
    </dependency>

  </dependencies>


....
</project>
```

## Dependency Coordinates

- To add given dependency project, we need
  
  - Group ID, Articat ID
  
  - Version is optional ...
    
    - Best practice is to include the version( repeatable builds ) -devops-

- May see this referred to as GAV:
  
  - Group ID, Artifact ID and Version

## How to find dependency coordinates

- Option 1  : Visit the project page ( spring.io , hibernate.org etc )

- Option 2 : Visit http:// search.maven.org( easiest approach )

- 현실적으로 Option 2 가 적절함 
