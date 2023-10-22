---
layout: single
title:  "JAVA - Object"
categories: Java
tag: [JAVA, Object]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆객체(object)

-객체는 변수, 함수, 자료 구조의 조합이 될 수 있는데, 특히 객체지향 프로그래밍에서 클래스를 기반으로 한 변수를 클래스의 인스턴스라고 지칭한다.<br/>-자바에서는 클래스에서 생성된 데이터를 객체로 정의한다.

<br/>







# ◆인스턴스(Instance)

설계도를 바탕으로 소프트웨어 세계에 구현된 구체적인 실체 즉, 객체를 소프트웨어에 실체화 하면 그것을 ‘인스턴스’라고 부른다.
실체화된 인스턴스는 메모리에 할당된다.

객체가 메모리에 할당되어 실제 사용될 때 ‘인스턴스’라고 부른다.

![인스턴스](https://github.com/pueser/pueser.github.io/assets/117990884/1b0ebff5-6818-4f1e-9b3e-c36d15df4a40)

<br>







# ◆메서드

-메소드는 객체 간데이터의 교류되는 프로그램화한 명령 메시지 단위이다. 동작처리내용을 말한다.(다른 언어에서는 함수(function)으로 불린다.)<br/>

-형식 : ``[접근제한자 ] [지정자(생략가능)] [리턴타입] [메소드명] [(매개변수)]{}``

![메서드 문법](https://github.com/pueser/pueser.github.io/assets/117990884/ca528169-fa7d-49d4-93a3-4daa32f12f82)

<br>





## 1)접근제한자

-접근제어자는 클래스의 멤버변수인 변수와 메소드의 접근 허용범위를 나타낸다.<br/>

**public > protected > default > private** 

|     종류      | 설명                                                         |
| :-----------: | ------------------------------------------------------------ |
|  **public**   | 접근 제한이 없습니다.                                        |
| **protected** | 동일한 패키지 내에 존재하거나, 파생 클래스에서만 접근이 가능합니다. |
|  **default**  | 아무런 접근 제한자를 명시하지 않으면 default 값이 되며, 동일한 패키지 내에서만 접근이 가능합니다. |
|  **private**  | 자기 자신의 클래스 내에서만 접근이 가능합니다.               |

<br>





## 2)리턴타입

-메서드가 실행 후 반환하는 값의 타입을 의미하는데 반환값이 있을 수도 있고 없을 수도 있다. <br/>-반환값이 없을 경우 : **void**<br/>-반환값이 있을 경우 : 메서드가 실행의 결과값을 반환할 때는 **return**값에 반환유형에 맞는 반환값을 입력해야한다.<br/>

```java
public class String a(){
    public static String a(){
        retrun "A";
    }
    public static int b(){
        return 1;
    }
    public ststic void main(String[] args){
        System.out.println(a());
        System.out.priintln(b());
    }
}
```

a메소드는 문자열 "A"를 return하기 때문에 public static String a( )에서 메소드 이름 앞에 String을 써준 것이다. b메소드는 정수형 1을 return하기 때문에 public static int b( )에서 메소드 이름 앞에 int를 써준 것이다.<br/>리턴 값이 없는 메소드는 리턴 타입에 void가 와야 한다.

<br/>





## 3) 지정자(static)

-Java에서 Static 키워드를 사용한다는 것은 메모리에 한번 할당되어 프로그램이 종료될 때 해제되는 것을 의미한다.
이를 정확히 이해하기 위해서는 메모리 영역에 대한 이해가 필요하다.



일반적으로 우리가 만든 Class는 Static 영역에 생성되고, new 연산을 통해 생성한 객체는 Heap영역에 생성된다.
객체의 생성시에 할당된 Heap영역의 메모리는 Garbage Collector를 통해 수시로 관리를 받는다.
하지만 Static 키워드를 통해 Static 영역에 할당된 메모리는 모든 객체가 공유하는 메모리라는 장점을 지니지만,
Garbage Collector의 관리 영역 밖에 존재하므로 Static을 자주 사용하면 프로그램의 종료시까지 메모리가 할당된 채로 존재하므로 자주 사용하게 되면 시스템의 퍼포먼스에 악영향을 주게 된다. 그러므로 static사용은 자제하자!

<br>





## 4)매개변수(parameter) & 인자(argument)

-**매개변수(parameter)**란 외부로부터 입력 값을 받기 위해 메소드의 괄호 안에 선언하는 변수이다.<br/>-**인자(argument)** : 메서드를 호출할 때 사용되는 값들을 인수이다.<br/>

```java
public class Main {
    public static int add (int a, int b) {
        return a + b;
    }
    public static void main(String[] args) {
     System.out.println(add(3,5));
    }
}
```

main 메소드가 먼저 실행이 되고 add메소드를 호출하는 add(3, 5)에서 3과5가 인자이다. add 메소드에서  3과 5값을 int형 변수 a, b로 받는다. 이때 ( )안에 있는 int a, int b가 매개변수이다.

<br/>







# ◆클래스(class)

-클래스는 객체를 만들기 위한 틀 혹은 설계도라 할 수 있다. 클래스는 **속성(멤버 변수) 및 기능(멤버 함수 or 메서드)**  나타내는 메소드로 구성된다.<br/>-지역변수는 메서드 안에서만 호출되는 변수이고, 전역변수는 class안에서 호출되는 변수이다.<br/>

```java
public class Book {
	// 속성(정보)
	public String title;
	public int price;    
	public String auth;  
    public String pub;
    
    // 기능(메서드) 
	pulic void print(){	
		 System.out.println("제목 : " + "\t" + title); 
		 System.out.println("가격 : " + "\t" + price); 
		 System.out.println("저자 : " + "\t" + auth);
		 System.out.println("출판사 : " + "\t" + pub);
	}
}
```

예를 들어 Book클래스를 만들었다. title, price, auth, pub는 Book클래스의 속성이다. 그리고 print메서드는 Book클래스가 수행할 기능을 말한다. 이때 메서드의 매개변수는 Main class에서 값을 받고 오기 때문에 매개변수를 따로 지정하지 않았다.

<br/>



```java
public class Main {
    public static void main (String[] args){
        //Book 클래스의 객체 생성
        Book b1 = new Book();
        Book b2 = new Book();
        
        //객체를 통해 Book 클래스의 속성에 값을 집어 넣는다.
		b1.title = "java";
		b1.price = 30000;
		b1.auth = "황혜진";
		b1.pub = "천사나라";

		b2.title = "jsp";
		b2.price = 32000;
		b2.auth = "혜진";
		b2.pub = "악마나라";
        
        //객체를 통해 Book 클래스의 메서드를 호출해 작동하도록 한다.
        b1.print();
		b2.print();
        
    }
}
```

<br>







# ◆변수

![변수종류](https://github.com/pueser/pueser.github.io/assets/117990884/3a3cc389-3e01-48bb-9757-43070e3c1396)

**이때 인스턴스변수는 멤버필드, 글로벌변수 등등 으로 불린다.**

<br/>




**변수 초기화**

-멤버변수에서는 선언을 하자마자 0으로 초기화 되어있고, 지역변수에는 아무것도 들어가 있지 않는다. 그렇기에 지역변수는 초기화를 시켜주어야 한다. 

<br/>







# ◆getter() & setter() 메소드

-변수명들은 private로 외부 클래스들의 접근을 막아놓고 getter() 와 setter() 메소드를 이용하여 객체의 값을 지정하거나 가져올 수 있다.<br/>- 즉, getter()메소드를 통해 멤버변수에 저장된 값을 참조할 수 있고  setter()메소드를 통해 멤버 변수에 원하는 값을 전달할 수 있다.<br/>

```java
public class PersonDTO {

	// 상태 정보
	private String name;
	private int age;
	private float height;
	private float weight;
	private char fm;
    
    //디폴트생성자
    public PersonDTO() {
	}
    
    // 매개변수를 활용한 생성자
	public PersonDTO(String name, int age, float height, float weight, char fm) {
		super();
		this.name = name;
		this.age = age;
		this.height = height;
		this.weight = weight;
		this.fm = fm;
	}
    
    // getter, setter 메서드
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public float getHeight() {
		return height;
	}

	public void setHeight(float height) {
		this.height = height;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}
}
```

5개의 변수 중 외부에 노출되는 정보를 제한하는데 4개의 정보(name, age, height, weight)의 변수 정보만 가져올 수 있도록 **getter()**를 이용하여 지정한다. 이로써, **변수들의 외부 노출을 제한하고, 노출 범위를 정해주는 것이다. **

<br>







# ◆생성자

-생성자는 객체가 생성될 때 **초기화 목적**으로 실행되는 메소드이며 객체가 생성되는 순간에 자동으로 호출된다.<br/>

**<생성자의 특징>**<br/>-생성자 이름 = 클래스 이름<br/>-생성자는 리턴 타입을 지정할 수 없다.

<br>





## 1)default 생성자

-생성자가 없는 클래스는 클래스 파일을 컴파일할 때 자바 컴파일러에서 자동으로 디폴트생성자를 만들어준다.<br/>-매개 변수 없고, 아무 작업 없이 단순 리턴하는 생성자이다.<br/>-디폴트 생성자는 객체를 생성할 때 파라미터에 원하는 속성값만 추가해서 객체를 생성할 수 있다.

```java
public class PersonDTO {

	// 상태 정보
	private String name;
	private int age;
	private float height;
	private float weight;
	private char fm;
    
    //디폴트생성자
    public PersonDTO() {
	}
}
```
<br>





## 2)매개변수를 활용한 생성자

-인스턴스가 생성됨과 동시에 멤버 변수의 값을 지정하고 인스턴스를 초기화하기 위해 직접 생성자를 구현할 수도 있다.<br/>

```java
public class PersonDTO {

	// 상태 정보
	private String name;
	private int age;
	private float height;
	private float weight;
	private char fm;
    
    //디폴트생성자
    public PersonDTO() {
	}
    
    // 매개변수를 활용한 생성자
	public PersonDTO(String name, int age, float height, float weight, char fm) {
		super();
		this.name = name;
		this.age = age;
		this.height = height;
		this.weight = weight;
		this.fm = fm;
	}
    
}
```

매개변수에 name, age, height, weight, fm의 값을 받고 이 값들은 this을 활용하여 멤버변수에 접근하여 사용하도록 한다.

<br>





**궁금한점...**

?? 그러면 default생성자가 자동으로 생성되기 때문에 default생성자를 생성하지 않고 바로 특정 파라미터를 포함하는 생성자를 오버로딩하였을 때 코드가 정상적으로 작동할까??

정답은 아니다... 그 이유는 **부모 클래스에 디폴트생성자가 선언되어있지 않기 때문**이다. 

이 말의 의미는 부모에 해당하는 디폴트 생성자가 자동으로 생성되어지지 않았기 때문에 힙 메모리에 부모의 객체가 올라가지 않아 컴파일 오류가 발생하기 때문이다. <br/>

때에 맞추어서 default 생성자를 만들어도 되고 인자값을 받아와야 하는 상황이면 매개변수생성자를 만들어야 한다.<br/>

<br/>









# ◆DTO(Data Transfer Object)

-DAO와 DB간의 데이터를 주고받는 클래스이다. DTO는 로직을 가지지 않는 순수한 데이터 객체(getter & setter만 가진 클래스)이다.<br/>



# ◆DAO(Data Access Object)

-데이터베이스의 데이터에 접근하기 위해 생성하는 객체이다.<br/>-간단하게, DB에 접속하여 데이터의 CRUD(생성, 읽기, 갱신, 삭제) 작업을 시행하는 클래스이다

<br>

