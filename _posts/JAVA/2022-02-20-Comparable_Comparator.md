---
layout: single
title:  "Comparable & Comparator"
categories: 
    - JAVA
tags: 
    - [2022-02, JAVA, STUDY]
sidebar:
    nav: "docs"

---

# <a style="color:#00adb5">Comparable & Comparator</a> 
Comparable 과 Comparator 는 모두 <a style="color:red"><b>객체를 비교할 수 있게 해주는 Interface</b></a> 이다.<br>
그래서 Comparable 이나 Comparator 를 사용하고자 한다면 인터페이스 내에 선언된 메서드를 <a style="color:red"><b>반드시 구현</b></a>해야 한다 !
<br><br>
우리는 Primitive 타입의 실수 변수(byte, int ,double 등등)의 경우는 부등호를 가지고 쉽게 비교할 수 있다.<br>
그러나 객체를 만들어 비교한다고 생각해보자. 객체에 나이와 이름과 주소가 있다. 그럼 다른 객체와 어떻게 비교할 것인가?<br>
객체는 기준을 정해주지 않는 이상 어떤 객체가 더 높은 우선순위를 갖는지 판단할 수 없다.<br>
이러한 문제점을 해결하기 위해 Comparable 이나 Comparator를 사용하는 것이다.<br>
여기서 두가지의 차이점은 <a style="color:red"><b>본질적으로 비교하는 것 자체는 같지만 비교 대상이 다르다</b></a>는 것이다.<br>
자세한 내용은 밑에서 각각 다뤄보겠다.

## <a style="color:#00adb5">Comparable</a> 

### <a style="color:#00adb5">Comparable</a> 이란 무엇일까?
<a style="color:red"><b>Comparable은 자기자신과 매개변수 객체를 비교</b></a>한다.<br>
Comparable에서 사용할 메서드는 <a style="color:red"><b>compareTo()</b></a> 이다.<br>
이 메서드가 우리가 객체를 비교할 기준을 정의해주는 부분이 된다. <br>
자기자신과 매개변수 객체를 비교한다.



### <a style="color:#00adb5">Comparable</a> 의 기본 구조
```java
public class ClassName implements Camparable<Type>{

//  구현

    @Override
    public int compareTo(Type o){

    //  비교 구현

    }
}

```

### <a style="color:#00adb5">Comparable</a> 실습해보즈아!
```java
public class ComparableTest {
	public static void main(String[] args) {
		Student s1 = new Student(15, "jisoo");
		Student s2 = new Student(16, "hoho");
		
		int value = s1.compareTo(s2);   // s1 자기자신과 s2 를 비교한다
		
		if(value > 0) {
			System.out.println("s1객체가  s2객체보다 더 큽니다.");
		}
		else if(value == 0) {
			System.out.println("s1객체와 s2객체가 같습니다.");
		}
		else {
			System.out.println("s1객체가 s2객체보다 더 작습니다.");
		}
	}
}

class Student implements Comparable<Student>{
	int age;
	String name;
	
	
	Student(int age, String name) {
		this.age = age;
		this.name = name;
	}
	
	@Override
	public int compareTo(Student o) {
		return this.age - o.age;
	}		
}
```

<hr>

#### 실행결과

```java
s1객체가 s2객체보다 더 작습니다.
```

<hr>

#### 코드 구조 설명
'값'을 비교하여 int값을 반환하도록 하였다.<br>
자기자신의 나이와 비교할 객체의 나이를 빼서 그것이 양수,0,음수 일 때마다 다르게 출력하도록 하였다.<br>
즉, Comparable은 자기 자신을 기준으로 삼아 대소관계를 파악한다.<br>
s1의 나이가 15이고 s2의 나이가 16인데 ' int value = s1.compareTo(s2); ' 에서 s1에서 s2를 비교한 결과를 value라는 int형 변수에 저장해주었다.<br>
그 결과 -1이므로 value는 0보다 작아서 's1객체가 s2객체보다 더 작습니다.'라는 문구를 출력해주는 것이다.<br>
여기서 무엇을 출력하느냐 그것은 마음대로이다. 그냥 두 비교대상의 차이를 반환해도 된다.<br>
그리고 만약 나이를 기준으로 안하고 이름을 기준으로 하고 싶다면 compartTo() 메서드에서 return 값을 this.name - o.name 이라고 하면 된다.<br>
여기서 <a style="color:red"><b>this는 s1 객체 자신을 의미하고 o는 s2 객체를 의미</b></a>한다.

<hr>


## <a style="color:#00adb5">Comparator</a> 

### <a style="color:#00adb5">Comparator</a> 이란 무엇일까?
<a style="color:red"><b>Comparator은 두 매개변수 객체를 비교</b></a>한다.<br>
Comparator에서 사용할 메서드는 <a style="color:red"><b>compare()</b></a> 이다.<br>
이 메서드가 우리가 객체를 비교할 기준을 정의해주는 부분이 된다. <br>
두 매개변수를 비교한다.<br>
Comparator은 <a style="color:red"><b>'import java.util.Comparator'</b></a> 가 꼭 있어야 한다 !


### <a style="color:#00adb5">Comparable</a> 의 기본 구조
```java
import java.util.Comparator             //import 필요
public class ClassName implements Comparator<Type>{

// 구현


    // 필수 구현 부분
    @Override
    public int compare(Type o1, Type o2){

        // 비교 구현

    }
}
```

### <a style="color:#00adb5">Comparable</a> 실습해보즈아!

```java
import java.util.Comparator;

public class ComparatorTest {
	public static void main(String[] args) {
		Students s1 = new Students(19, "jisoo");
		Students s2 = new Students(17, "susu");

		int values = s1.compare(s1, s2);

		if (values > 0) {
			System.out.println("s1객체가 s2객체보다 큽니다");
		} else if (values == 0) {
			System.out.println("두 객체의 크기가 같습니다.");
		} else {
			System.out.println("s1객체가 s2객체보다 작습니다.");
		}
	}
}

class Students implements Comparator<Students> {
	int age;
	String name;

	public Students(int age, String name) {
		this.age = age;
		this.name = name;
	}

	@Override
	public int compare(Students o1, Students o2) {
		return o1.age - o2.age;
	}
}

```

<hr>

#### 실행결과

```java
s1객체가 s2객체보다 큽니다
```

<hr>

#### 코드 구조 설명
Comparable과 구조는 거의 비슷하다.<br>
그러나 Comparator은 compare() 메서드에서 매개변수끼리 비교를 하여 값을 반환해준다.<br>
그리고 'int values = s1.compare(s1, s2);' 이 부분에서 compare() 메서드를 불러주는 객체는 아무거나 사용해도 된다.<br>

<hr>

## <a style="color:#00adb5">Comparable & Comparator</a> 와 정렬과의 관계
a style="color:red"><b>JAVA에서의 정렬은 특별한 정의가 되어 있지 않는 한 '오름 차순' 기준</b></a>으로 한다.<br>
두 수의 비교 결과가
- 음수일 경우 : 두 원소의 위치를 교환 안 함
- 양수일 경우 : 두 원소의 위치를 교환 함

'내림 차순' 으로 하고 싶다면 부호를 반대로 해주면 된다 .<br>
그리고 좀 더 쉽게 이해를 하려면 선행 원소의 값은 작다고 가정하고 후행 원소의 값은 크다고 가정하고 음수, 양수 관계를 이해하면 된다. 





## <a style="color:#00adb5">Comparable & Comparator</a> 마무리



<br><br><br><br>
참조<br>
<a href="https://st-lab.tistory.com/243" target=_blank>https://st-lab.tistory.com/243</a><br>
