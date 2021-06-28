---
title: \[Kotlin] 코틀린 Class 간단하게 이해하기

categories: kotlin

tags:
   - kotlin
   - class
   - constru

last_modified_at: 2021-06-28 

---

# 기본 클래스

```kotlin
// 1
class ClassObject{

}

// 2
class ClassObject2

fun main(args: Array<String>){
    val classObject = ClassObject()
    val classObject2 = ClassObject2()

    println(classObject)
    println(classObject2)
}
```

Java와 동일하게 `1번`처럼 Class 선언해도 되고, 아무것도 정의하지 않은 Class라면 `2번`처럼 선언해도 됩니다. 하지만, 일반적으로 아무것도 정의하지 않는 경우는 흔하지 않습니다.

# 생성자

```kotlin
class Constructor(val name: String, var age: Int){

}

class Constructor2(name: String){
    val name = name.toUpperCase()
}

fun main(args: Array<String>){
    val constructor = Constructor("Kakaopay", 9)
    println("constructor name is ${constructor.name} and age is ${constructor.age}")

    val constructor2 = Constructor2("Kakao")
    println("constructor2 name is ${constructor2.name}")

}

/*
* constructor name is Kakaopay and age is 9
* constructor2 name is KAKAO
*/
```

`val`, `var`를 통해 바로 초기화가 가능하고, 그냥 인자로 받아서 초기화하는 것도 가능합니다.
그냥 `val`, `var`를 붙이지 않고, 인자로만 받으면 해당 클래스의 변수로 가지고 있지 않습니다.

## 1개 이상의 생성자

```kotlin
class Contructor3(name: String){
    val name = name.toLowerCase()
    var age: Int = 0
    constructor(name: String, age: Int) : this(name) {
        this.age = age
    }
}

fun main(args: Array<String>){
    val contructor3 = Contructor3("Naver", 10)
    println("constructor3 name is ${contructor3.name} and age is ${contructor3.age}")
}

/* 
* constructor3 name is naver and age is 10
*/
```

기본적인 생성자의 경우 class 옆에 적어주면 되었습니다. 만약, 추가적인 생성자가 필요할 경우 `constructor` 메소드를 추가해주면 됩니다. 중복되는 필드에게는 기존 생성자를 태우고 싶은 경우 `this()`를 작성해주면 됩니다.

정확하게는 `contructor`로 생성되는 생성자는 기본 생성자를 상속받아야 합니다. (기본 생성자가 없는 경우가 아니라면)

### constructor 주의사항

constructor로 생성한 생성자는 기본 생성자가 아닙니다. 그래서 인자로 들어온 변수가 바로 클래스의 변수로 생성할 수 없습니다. 그렇기 때문에 생성자 영역에서 매개변수를 클래스변수에 할당을 해주도록 합니다.

!()[[https://miro.medium.com/max/1492/1*prXC7j0BAfIlI9ZhByEFGg.png](https://miro.medium.com/max/1492/1*prXC7j0BAfIlI9ZhByEFGg.png)]

## 초기화 영역 init

```kotlin
class Contructor4 {
    constructor() {
			println("Call constructor")
    }

    init {
			println("Call init")
    }
}

fun main(args: Array<String>){
	val contructor4 = Constructor4()
}

/*
* Call init
* Call constructor
*/
```

`init` 영역에서 초기화를 해줘도 됩니다. 순서는 `init` 이후에 `constructor`가 실행됩니다.

# 출처
- https://medium.com/@sket8993/kotlin-%EC%83%9D%EC%84%B1%EC%9E%90-%EC%B4%88%EA%B0%84%EB%8B%A8-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-b8a61df6fe6
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5NTgwMTM1Nl19
-->