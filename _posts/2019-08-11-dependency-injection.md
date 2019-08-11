---
title: "Spring Dependency Injection"
date: 2019-08-11
categories: web, spring
comments: true
---
> Spring Dependency Injection

### 의존성이란?
- 한 클래스가 다른 클래스의 메서드를 사용할 때, 의존이라 표현한다.
- 아래 코드를 보자.
```java
public class StudentService {
	private StudentDao studentDao = new StudentDao();
	
	public Student getStudent(final int id) {
		studentDao.getStudent(id);
	}
}
```
- StudentService는 내부적으로 studentDao 객체를 생성하여 studentDao.getStudent 메서드를 실행하고 있다.
- 즉, StudentService 클래스는 StudentDao 클래스에 의존한다.

### 의존성 주입이란?
- 의존 객체를 직접 생성하지 않고 외부에 의존 객체를 전달받는 방식이다.
- 아래 코드를 보자.
```java
public class StudentService {
	private StudentDao studentDao;	
	
	public StudentService(final StudentDao studentDao) {
		this.studentDao = studentDao;
	}
	
	public Student getStudent(final int id) {
		studentDao.getStudent(id);
	}
}
```
```java
StudentDao studentDao = new StudentDao();
StudentService studentService = new StudentService(studentDao);
```
- 외부에서 생성한 studentDao객체를 StudentService 객체를 생성할 때, 생성자로 전달하여 의존 객체를 주입한다.

### 의존 객체 생성 vs 의존 객체 주입
- 왜? 의존 객체를 생성자로 주입받아서 사용하는 것일까?
- 의존 객체의 **변경에 민감하지 않게** 되며, 자연스레 **종속성이 감소**되고 **유지보수성**이 높아진다.

#### 먼저 의존 객체 생성 방식을 사용할 때, 문제점을 알아보자.
```java
public class StudentService {
	private StudentDao studentDao = new StudentDao();
	...
}
```
```java
public class SchoolService {
	private StudentDao studentDao = new StudentDao();
	...
}
```
StudentDao를 상속받아 사용할 일이 생겨 아래와 같은 StudentCachedDao 생성했다.
```java
public class StudentCachedDao extends StudentDao {
	...
}
```
이전에 생성한 StudentService, SchoolService를 모두 수정해야 한다.
```java
public class StudentService {
	private StudentDao studentDao = new StudentCachedDao();
}
public class SchoolService {
	private StudentDao studentDao = new StudentCachedDao();
}
```
위와 같이 의존 객체가 수정될 때마다 의존 객체를 생성하는 **모든 클래스를 뒤져 수정**해주어야 한다.

#### 의존 객체 주입 방식을 사용할 때
```java
public class StudentService {
	private StudentDao studentDao;
	public StudentService(final StudentDao studentDao) {
		this.studentDao = studentDao;
	}
	...
}
```
```java
public class SchoolService {
	public SchoolService(final StudentDao studentDao) {
		this.studentDao = studentDao;
	}
	...
}
```
```java
StudentDao studentDao = new StudentDao();
StudentService studentService = new StudentService(studentDao);
SchoolService schoolService = new SchoolService(studentDao);
```

StudentCachedDao를 사용하기 위해 수정되는 코드는 **각 클래스가 아닌 의존 객체를 주입하는 시점**이다.
```java
StudentDao studentDao = new StudentCachedDao(); // 해당 라인만 수정
StudentService studentService = new StudentService(studentDao);
SchoolService schoolService = new SchoolService(studentDao);
```

### 결론
- 의존 주입 방식(DI)을 사용하면 의존 객체를 사용하는 클래스가 여러 개더라도 변경되는 곳은 의존 객체를 주입하는 코드 라인만 수정하면 된다.