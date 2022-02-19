---
layout: single
title:  "Singleton 디자인 패턴"
categories: 
    - JAVA
tags: 
    - [2022-02, JAVA, STUDY]
sidebar:
    nav: "docs"

---

# <a style="color:#00adb5">Singleton Pattern</a> 

## <a style="color:#00adb5">Singleton Pattern</a> 이란 무엇일까?
<a style="color:red"><b>애플리케이션이 시작될 때 어떤 클래스가 최초 한번만 메모리를 할당하고(static) 그 메모리에 인스턴스를 만들어 사용하는 디자인패턴.</b></a><br>
생성자가 여러 차례 호출되더라도 실제로 생성되는 객체는 하나고 최초 생성 이후에 호출된 생성자는 최초에 생성한 객체를 반환한다. ( 자바에서는 생성자를 private로 선언하여 생성 불가하게 하고 getInstance()로 받아쓰기도 한다. )<br>
<a style="color:red"><b>싱글톤 패턴은 단 하나의 인스턴스를 생성해 사용하는 디자인 패턴이다.</b></a><br>
-> 인스턴스가 필요 할 때 똑같은 인스턴스를 만들어 내는 것이 아니라, 동일(기존) 인스턴스를 사용하게 함.

- 외부에서 생성자에 접근 금지 -> 생성자의 접근 제한자를 private로 설정
- 내부에서는 private에 접근 가능하므로 직접 객체 생성 -> 멤버 변수이므로 private 설정
- 외부에서 private member에 접근 가능한 getter 생성 -> setter는 불필요
- 객체 없이 외부에서 접근할 수 있도록 getter와 변수에 static 추가
- 외부에서는 언제나 getter를 통해서 객체를 참조하므로 <a style="color:red"><b>하나의 객체 재사용</b></a>


## <a style="color:#00adb5">Singleton Pattern</a> 을 사용하는 이유
- 고정된 메모리 영역을 얻으면서 한번의 new로 인스턴스를 사용하기 때문에 <a style="color:red"><b>메모리 낭비를 방지</b></a>할 수 있음
- 싱글톤으로 만들어진 클래스의 인스턴스는 전역 인스턴스이기 때문에 다른 클래스의 인스턴스들이 <a style="color:red"><b>데이터를 공유</b></a>하기 쉽다.
- DBCP ( DataBase Connection Pool ) 처럼 공통된 객체를 여러개 생성해서 사용해야하는 상황에서 많이 사용한다.
- <a style="color:red"><b>인스턴스가 절대적으로 한개만 존재하는 것을 보증하고 싶을 경우 사용</b></a>
- 두 번째 이용시부터는 객체 로딩 시간이 현저하게 줄어들어 성능이 좋아지는 장점이 있다.

## <a style="color:#00adb5">Singleton Pattern</a> 의 문제점
- 싱글톤 인스턴스가 너무 많은 일을 하거나 많은 데이터를 공유시킬 경우 다른 클래스의 인스턴스들 간에 결합도가 높아져 " 개방 - 폐쇄 원칙 " 을 위반하게 된다 => 객체 지향 설계 원칙에 어긋난다.
- 수정이 어려워지고 테스트가 어려워진다.
- 멀티쓰레드 환경에서 동기화 처리를 안하면 인스턴스가 두개가 생성되는 경우가 발생할 수 있다.

## <a style="color:#00adb5">Singleton Pattern</a> 실습해보즈아!

```java
class SingletonClass{
    // 고정된 메모리 영역을 얻으면서 한번의 new로 인스턴스를 사용
    private static SingletonClass instance = new SingletonClass();

    // default 생성자
    private SingletonClass(){}

    // 객체 없이 외부에서 접근할 수 있도록 만들어준다 ( getter 생성 )
    public static SingletonClass getInstance(){
        return instance;
    }

    public void sayHello(){
        System.out.println("HELLO");
    }
}


public class SingletonTest {
    public static void main(String[] args) {

        // new로 인스턴스를 생성할 필요가 없다
        SingletonClass sc1 = SingletonClass.getInstance();
        SingletonClass sc2 = SingletonClass.getInstance();

        // 하나의 인스턴스를 같이 사용한다
        System.out.printf("두 객체는 같나 ?  %b%n", sc1 == sc2);
        sc1.sayHello();

    }
}
```

<hr>

실행결과<br>

```java
두 객체는 같나 ?  true
HELLO
```

<hr>




## <a style="color:#00adb5">Singleton Pattern</a> 마무리
객체의 생성을 제한해야 하는 경우에 이용할 수 있는 Singleton Pattern에 대해 공부해 보았다.<br>
제대로 공부하기 전까진 마냥 어렵게만 보였는데 한 단계씩 봐가며 공부하니 간단했다.<br>
고정된 메모리 영역을 얻어 인스턴스를 생성해 두고 private로 제한해두면서 다른 인스턴스 없이 외부에서는 접근할 수 있게 getter를 만들어준다.<br>
그리고 인스턴스를 필요해서 사용할 때 새로운 것을 만드는 것이 아니라 기존의 인스턴스를 사용한다.<br>
Singleton 패턴을 사용함으로서 메모리 낭비 방지와 데이터를 공유하기 쉬운 장점, 두번째 이용부터 성능이 좋아지는 장점 등 여러 장점들이 있다.<br>
여러 디자인 패턴들이 존재하는데 잘 배워놓으면 유용하게 쓰일 것 같다.<br>



<br><br><br><br>
참조<br>
<a href="https://jeong-pro.tistory.com/86" target=_blank>https://jeong-pro.tistory.com/86</a><br>
