# Beans 이 뭐지?

스프링 Core container 에는 크게 Beans, Core, SpEL, Context 가 있다.

우선 Bean에 대해서 공부를 해보자.

![Spring - IoC-페이지-3.drawio.png](../images/2023-03-16-Spring%20Framework%20Overview/00ec64aaa5d8e5fc0f87b61956d3153239e642f7.png)

## Beans 이란?

우리가 자주 사용할 **Bean을 지원**하는 모듈이다.  
앞에서 배웠던 **의존성 주입을 얘가 담당**한다.

### 1. Bean 이란?

스프링은 자바 **프로그램의 제어권을 자신이 갖기 위해(IoC) 자바 객체를 자신만의 형태**로 바꾸는데, 그것을 **Bean**이라고 한다.

즉 스프링 안에서는 **"Bean = 객체"**라고 생각하면 된다.

이 객체가 **Bean으로 등록되는 순간 스프링이 관리**하게 되며,  
DI라던가 AOP라던가 등 **여러가지 이점을 맛볼 수 있다.**

#### 1) Bean Definition

Here's a definition of beans in [the Spring Framework documentation](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-introduction):

_In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container._

This definition is concise and gets to the point **but fails to elaborate on an important element: the Spring IoC container.** Let's take a closer look to see what it is and the benefits it brings in.

Spring IoC contanier 에서 관리되는 객체를 Bean 이라고 불린다.
이 컨테이너에 등록되는 빈들은 기본적으로 싱글톤 스코프로 등록됨

-> 싱글톤 : 한 개 
-> 프로토타입 : 매번 다른 객체

#### 2) Inversion of Control

Simply put, [I](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring)[nversion of Control](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring) (IoC) is **a process in which an object defines its dependencies without creating them.** This object delegates the job of constructing such dependencies to an IoC container.

의존성을 없앤다는 말인데

```java
class A {
    new b = new B()
}

class B {

}
```

이럴 경우 클래스 A가 클래스 B 를 직접 만드는 게 아니라 외부에 있는 class B 를 사용하기 때문에
A는 B에 의존적이고 의존성 주입이라고 한다.

![Pasted image 20230314003331.png](../images/2023-03-16-Spring%20Framework%20Overview/312f067587563f97d5575ff5f7ba0ef61a800223.png)

Class A가 Class B를 직접 참조하고 생성했던 것을
중간에 매개체를 통해서 사용하면 제어가 역전된다

```java
class AAA {

    Member m1 = new Member();    <- 에러 발생

}

class BBB (Member m){
    # 이미 만들어져 있는 걸 받는것 뿐이니
    # 에러 발생이 없음
    Member m2 = m;
}

class Member {

    String name;

    private Member(){} 
}
```

Let's start with the declaration of a couple of domain classes before diving into IoC.

#### 3.1) Domain Classes

Assume we have a class declaration:

```java
public class Company {
    private Address address;

    public Company(Address address) {
        this.address = address;
    }

    // getter, setter and other properties
}
```

This class needs a collaborator of type _Address_:

```java
public class Address {
    private String street;
    private int number;

    public Address(String street, int number) {
        this.street = street;
        this.number = number;
    }

    // getters and setters
}
```

#### 3.2) Traditional Approach

Normally, we create objects with their classes' constructors:

```java
Address address = new Address("High Street", 1000);
Company company = new Company(address);
```

There's nothing wrong with this approach, but wouldn't it be nice to manage the dependencies in a better way?

Imagine an application with dozens or even hundreds of classes. Sometimes we want to share a single instance of a class across the whole application, other times we need a separate object for each use case, and so on.

Managing such a number of objects is nothing short of a nightmare. **This is where inversion of control comes to the rescue.**

Instead of constructing dependencies by itself, an object can retrieve its dependencies from an IoC container. **All we need to do is to provide the container with appropriate configuration metadata.**

**각 오브젝트을 개발자가 따로따로 관리하는게 아니라 IoC container에 넘겨주는 것**

#### 3.3) Bean Configuration

First off, let's decorate the _Company_ class with the _@Component_ annotation:

```java
@Component
public class Company {
    // this body is the same as before
}
```

Here's a configuration class supplying bean metadata to an IoC container:

```java
@Configuration
@ComponentScan(basePackageClasses = Company.class)
public class Config {
    @Bean
    public Address getAddress() {
        return new Address("High Street", 1000);
    }
}
```

The configuration class produces a bean of type _Address_. It also carries the _@ComponentScan_ annotation, which instructs the container to look for beans in the package containing the _Company_ class.

**When a Spring IoC container constructs objects of those types, all the objects are called Spring beans, as they are managed by the IoC container.**

#### 3.4) IoC in Action

Since we defined beans in a configuration class, **we'll need an instance of the _AnnotationConfigApplicationContext_ class to build up a container**:

```java
ApplicationContext context = new AnnotationConfigApplicationContext(Config.class);
```

A quick test verifies the existence and the property values of our beans:

```java
Company company = context.getBean("company", Company.class);
assertEquals("High Street", company.getAddress().getStreet());
assertEquals(1000, company.getAddress().getNumber());
```

The result proves that the IoC container has created and initialized beans correctly.

#### 4. Conclusion

This article gave a brief description of Spring beans and their relationship with an IoC container.

### 2. Beans 관련

Beans와 관련해서 **중요한 부분은 BeansFactory**가 있다.

> - **org.springframework.beans.BeanFactory**  
>   : **beans 패키지의 중심**이다. **Bean 기능을 제공**한다.  
>   (의존성 주입이나 객체를 Bean으로 등록한다던지 등)

해당 인터페이스로 **Bean의 각종 설정**을 하거나 **Bean을 가져올 수 있다.**

### 3. Beans 작성법

위에서 말했듯 **Bean은 자바 객체와 동일**하기 때문에,  
구조도 다를 것이 없다. **다만 작성법이 조금 다를 뿐**이다.

이러한 작성법은 **Bean과 객체를 비교**하며 알아보자.  
우선 **대상이 되는 클래스**는 다음과 같다.

```java
/* 자바 클래스 */
class User {
private int id;
private String name;
private String Team;

// 생성자
public User(int id, String name) {
   this.id = id;
   this.name = name;
}

/* setter/getter 메소드들 */
}

class Team {
/* 여러 설정들 */
}
```

---

##### 1. Bean 생성

Class 방식과 XML 방식이 있는데, XML부터 알아보자.

우리가 객체를 생성할 때, **어떤 클래스**를 **어떤 이름**으로 **객체화할 것인지**를 코딩하였다.

Bean은 이것을 각각**class와 id**로 설정해준다.

```java
/* 객체 방식 */
// 이름이 teamA인 Team 객체 생성
Team teamA = new Team();
User user = new User();


<!-- xml 방식 -->
// "id가 teamA"이고 "class가 Team"인 객체 생성
<bean id="teamA" class="Team"/>
<bean id="user" class="User"/>
```

---

##### 2. 속성 정의

속성을 정의할 때 **보통 set**을 쓰지만, **Bean은 property**로 설정한다.

```java
/* 객체 */
// id 속성을 1로 설정
user.setId(1);
user.setName("개발자");



/* Bean 객체 */
<bean id="user" class="User">
   // name(id) 속성을 value(1)로 설정
   <property name="id" value="1"/>
   <property name="name" value="개발자"/>
</bean>
```

---

##### 3. DI 정의

User의 **setTeam()은 의존성 주입**이다.  
이럴땐 value 대신 **참조한다는 의미로 ref**를 써준다.

```java
/* 객체 */
Team teamA = new Team();

// teamA를 주입
user.setTeam(teamA);



/* Bean 객체 */
<bean id="teamA" class="Team"/>

<bean id="user" class="User">
   // name(team) 속성에 ref(teamA)를 주입
   <property name="team" ref="teamA"/>
</bean>
```

이때 주의할 점은 **setTeam()**에서도 **객체 이름인 teamA**를 써줬듯이,  
**Bean의 ref**에도 **객체 id인 teamA**를 써줘야 한다!!  
꼭 명심!

> ref엔 해당하는 Bean의 id를 적어주자!

---

##### 3. 생성자

또한 각 클래스마다 생성자를 설정해줘야 할 때가 있다.  
**이럴땐 constructor-arg를 사용**한다. **단, 순서대로 설정해야 한다.**  
나머지는 동일하다.

```null
/* 객체 */
Team teamA = new Team();
// 순서대로 각각 "1, 개발자, teamA"
User user =new User(1, "개발자", teamA);



/* Bean 객체 */
<bean id="teamA" class="Team"/>

<bean id="user" class="User">
   // 마찬가지로 순서대로 설정함
   <constructor-arg>
      <value="1"/>
      <value="개발자"/>
      <ref="teamA"/>
</bean>
```

---

#### 4. 요약

위의 내용을 요약하자면, 다음과 같다.

> - **Bean을 생성** --> **bean id="" class=""**  
> 
> - **속성을 설정** --> **property name=""**
> 
> - **생성자를 설정** --> **constructor-arg**  
> 
> - 생성자건 속성이건 **값을 설정** --> **value=""**
> 
> - **DI를 사용** --> **ref=""**

#### 

출처 유데미 & https://www.baeldung.com/spring-bean & https://velog.io/@seculoper235/Spring-Core-Container
