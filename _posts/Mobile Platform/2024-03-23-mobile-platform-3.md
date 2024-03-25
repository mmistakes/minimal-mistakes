---
title: "다트 언어의 객체지향 프로그래밍"
excerpt: "다트 언어의 객체지향 프로그래밍"
categories: ['Mobile Platform']
# Cpp / Algorithm / Computer Network / A.I / Database / Mobile Platform / Probability & Statistics
tags: 

toc: true
toc_sticky: true
use_math: true

date: 2024-03-23
last_modified_at: 2024-03-24

---
## 클래스

```dart
class Person {
  String name = '사람 A';

  void sayName() {
    print("저는 ${this.name}입니다.");
    print("저는 $name입니다.");
  }
}

void main() {
  Person p1 = Person();
  p1.sayName();
}
```
```
저는 사람 A입니다. // this를 사용한 출력
저는 사람 A입니다. // this를 사용하지 않은 출력
```
&nbsp;&nbsp;Introduce 클래스를 정의했다. Introduce 클래스 안에 종속된 변수로는 `name`이 함수로는 `sayName()`이 있다. 클래스에 종속된 변수를 **멤버 변수**, 종속된 함수를 **메서드**라고 한다. 클래스에 종속되어 있는 변수를 지칭하는데 **this** 키워드를 사용한다. 위에서 `this.name`은 현재 클래스(Introduce 클래스)의 name을 지칭한다. 만약 함수 내부에 같은 이름의 변수가 있다면 **this** 키워드를 사용하여야 한다.

&nbsp;&nbsp;변수 타입을 Introduce라고 지정하고 Introduce의 인스턴트를 생성한다. 인스턴트를 생성할 때는 함수를 실행하는 것처럼 인스턴스화하고 싶은 클래스명 뒤에 `()`를 붙여준다.

### 생성자

```dart
class Person {
  final String name;

  Person(String name) : this.name = name;

  void sayName() {
    print("저는 ${this.name}입니다.");
  }
}

void main() {
  Person p1 = Person("사람 A");
  p1.sayName();

  Person p2 = Person("사람 B");
  p2.sayName();
}
```
```
저는 사람 A입니다.
저는 사람 B입니다.
```
&nbsp;&nbsp;생성자는 클래스의 인스턴트를 생성하는 메서드이다. 생성자에서 입력 받은 변수를 일반적으로 `final`로 선언한다. 인스턴트화한 다음에 변수의 값을 변경하는 실수를 방지하기 위함이다.

&nbsp;&nbsp;클래스 생성자 코드를 보자. 클래스와 같은 이름을 사용해야 한다. 이름 뒤에 `()`를 붙이고 원하는 매개변수를 지정해준다. `:` 기호 뒤에 입력받은 매개변수가 저장될 클래스 변수를 지정해준다.

### 네임드 생성자

```dart
class Person {
  final String name;
  final int age;

  // 1
  Person(String name, int age)
      : this.name = name,
        this.age = age;

  // 2
  Person.testMap(Map<String, dynamic> map)
      : this.name = map['name'],
        this.age = map['age'];

  void sayName() {
    print("저는 ${this.name}이고 나이는 ${this.age}입니다.");
  }
}

void main() {
  Person p1 = Person("사람 A", 20);
  p1.sayName();

  Person p2 = Person.testMap({
    'name': '사람 B',
    'age': 30,
  });
  p2.sayName();
}
```
```
저는 사람 A이고 나이는 20입니다.
저는 사람 B이고 나이는 30입니다.
```
&nbsp;&nbsp;네임드 생성자는 네임드 파라미터와 비슷한 개념이다. 일반적으로 클래스를 생성하는 여러 방법을 명시하고 싶을 때 사용한다.
&nbsp;&nbsp;1을 보자. 생성자에서 매개변수 2개를 입력 받는다. `,` 기호를 사용하면 하나 이상의 매개변수를 처리할 수 있다.
&nbsp;&nbsp;2를 보자. 네임드 생성자는 **클래스명.네임드 생성자명** 형식으로 지정한다.

### 프라이빗 변수

```dart
class Person {
  String _name;

  Person(this._name);
}

void main() {
  Person p = Person('사람 A');
  print(p._name);
}

```
```
사람 A
```
&nbsp;&nbsp;프라이빗 변수는 변수명을 `_` 기호로 시작해 선언한다. 같은 파일 내에서만 접근이 가능하고 다른 파일에서는 접근 불가능하다.

### 게터/세터

```dart
class Person {
  String _name;

  Person(this._name);

  String get name {
    return this._name;
  }

  set name(String name) {
    this._name = name;
  }
}

void main() {
  Person p = Person('사람 A');
  print(p.name);

  p.name = '사람 B';
  print(p.name);
}
```
```
사람 A
사람 B
```

&nbsp;&nbsp;게터(getter)는 값을 가져올 때, 세터(setter)는 값을 지정할 때 사용된다. 게터와 세터를 사용하면 어떤 값이 어떤 형태로 노출될지, 어떤 변수를 변경 가능하게 할지 유연하게 정할 수 있다.

&nbsp;&nbsp;Introduce 클래스의 name 변수는 프라이빗으로 선언되어 있기 때문에 다른 파일에서 접근 할 수 없다. 이때 name 게터를 선언하면 외부에서도 간접적으로 _name 변수에 접근 할 수 있다.

### 상속

```dart
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);

  void sayName() {
    print("저는 ${this.name}입니다.");
  }

  void sayAge() {
    print("${this.name}의 나이는 ${this.age}세 입니다.");
  }
}

class Student extends Person {
  Student(
    String name,
    int age,
  ) : super(
          name,
          age,
        );

  void sayStudent() {
    print("저는 학생입니다.");
  }
}

void main() {
  Student s = Student('사람 A', 20);

  s.sayName();
  s.sayAge();
  s.sayStudent();
}
```
```
저는 사람 A입니다.
사람 A의 나이는 20세 입니다.
저는 학생입니다.
```
&nbsp;&nbsp;`extends` 키워드를 사용해 상속 받는다. `class 자식 클래스명 extends 부모 클래스명` 순으로 선언하면 된다. 자식 클래스는 부모 클래스의 모든 기능을 상속 받는다. `super` 키워드는 현재 클래스를 지칭하는 `this`와 달리 상속한 부모 클래스를 지칭한다. 부모 클래스에서 상속 받은 생성자를 자식 클래스에서 다시 선언해야 한다. 또한 상속 받지 않은 메서드나 변수를 새로 추가할 수 있다.

### 오버라이드

```dart
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);

  void sayName() {
    print("저는 ${this.name}입니다.");
  }

  void sayAge() {
    print("${this.name}의 나이는 ${this.age}세 입니다.");
  }
}

class Student extends Person {
  Student(
    super.name,
    super.age,
  );

  @override
  void sayName() {
    print("저는 학생 ${this.name}입니다.");
  }
}

void main() {
  Student s = Student('사람 A', 20);
  s.sayName();

  s.sayAge();
}
```
```
저는 학생 사람 A입니다.
사람 A의 나이는 20세 입니다.
```
&nbsp;&nbsp;오버라이드는 부모 클래스 또는 인터페이스에 정의된 메서드를 재정의할 때 사용한다. `@override` 키워드를 사용하여 오버라이드를 구현한다.

### 인터페이스

```dart
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);

  void sayName() {
    print("저는 ${this.name}입니다.");
  }

  void sayAge() {
    print("${this.name}의 나이는 ${this.age}세 입니다.");
  }
}

class Student implements Person {
  final String name;
  final int age;

  Student(
    this.name,
    this.age,
  );

  void sayName() {
    print("재정의 하면 저는 학생 ${this.name}입니다.");
  }

  void sayAge() {
    print("재정의 하면 ${this.name}의 나이는 ${this.age}세 입니다.");
  }
}

void main() {
  Student s = Student('사람 A', 20);

  s.sayName();
  s.sayAge();
}
```
```
재정의 하면 저는 학생 사람 A입니다.
재정의 하면 사람 A의 나이는 20세 입니다.
```
&nbsp;&nbsp;인터페이스는 공통으로 필요한 기능을 정의만 하는 역할을 한다. 다트에서는 인터페이스를 지정하는 키워드가 따로 없다. 상속은 단 하나의 클래스만 할 수 있지만 인터페이스는 적용 개수에 제한이 없다. 여러 인터페이스는 적용하고 싶으면 `,` 기호를 사용하여 인터페이스를 나열하면 된다.

&nbsp;&nbsp;상속은 부모 클래스의 모든 기능이 상속되므로 메서드를 재정의 할 필요 없다. 하지만 인터페이스는 반드시 모든 메서드를 재정의 해줘야 한다. 반드시 재정의할 필요가 있는 기능을 정의하는 용도가 인터페이스이다.

### 믹스인
```dart
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);
}

mixin Introduce on Person {
  void said() {
    print("${this.name}가 자기소개를 합니다.");
  }
}

class Student extends Person with Introduce {
  Student(
    super.name,
    super.age,
  );
}

void main() {
  Student s = Student('사람 A', 20);
  s.said();
} 
```
```
사람 A가 자기소개를 합니다.
```
&nbsp;&nbsp;믹스인은 특정 클래스에 원하는 기능들만 골라 넣을 수 있는 기능이다. 특정 클래스를 지정하여 속성들을 정의할 수 있으며 지정한 클래스를 상속하는 클래스에서도 사용할 수 있다. 인터페이스처럼 한 개의 클래스에 여러 개의 믹스인을 적용할 수도 있다.

### 추상
```dart
abstract class Person {
  final String name;
  final int age;

  Person(this.name, this.age);

  void sayName();
  void sayAge();
}

class Student implements Person {
  final String name;
  final int age;

  Student(
    this.name,
    this.age,
  );

  void sayName() {
    print("저는 학생 ${this.name}입니다.");
  }

  void sayAge() {
    print("${this.name}의 나이는 ${this.age}세 입니다.");
  }
}

void main() {
  Student s = Student('사람 A', 20);
  s.sayName();
  s.sayAge();
}
```
```
저는 학생 사람 A입니다.
사람 A의 나이는 20세 입니다.
```
&nbsp;&nbsp;추상은 상속이나 인터페이스로 사용하는 데 필요한 속성만 정의하고 인스턴스화 할 수 없도록 하는 기능이다. 즉 인스턴스화가 필요 없는 공통 부모 클래스를 만들 때 사용한다.

### 제네릭
```dart
// 인트턴스화 할 때 입력받을 타입르 T로 지정
class Cache<T> {
  // data의 타입을 추후 입력될 T 타입으로 지정
  final T data;

  Cache({
    required this.data,
  });
}

void main() {
  // T 타입을 List<int>로 입력
  final cache = Cache<List<int>>(
    data: [1, 2, 3],
  );

  // 제네릭에 입력된 값을 통해 data 변수의 타입이 자동으로 유추
  print(cache.data.reduce(
    (value, element) => value + element,
  ));
}
```
```
6
```
&nbsp;&nbsp;특정 변수의 타입을 하나의 타입으로 제한하고 싶지 않을 때 자주 사용한다. 

![image](https://github.com/Bogamie/bogamie2.github.io/assets/162293185/d3fafd10-3d8c-4705-92cd-3e88b2499492){: width="50%" height="50%"}

### 스태틱
```dart
class Counter {
  static int i = 0;

  Counter() {
    i++;
    print(i);
  }
}

void main() {
  Counter count1 = Counter();
  Counter count2 = Counter();
  Counter count3 = Counter();
}
```
```
1
2
3
```
&nbsp;&nbsp;변수와 메서드 등에 `static` 키워드를 사용하면 클래스 자체에 귀속된다. static 변수는 클래스에 직접 귀속되기 때문에 생성자에서 static 값을 지정하지 못한다. 따라서 `static` 키워드는 인스턴스끼리 공유해야 하는 정보에 지정하자.

### 캐스케이드 연산자
```dart
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);

  void sayName() {
    print("저는 ${this.name}입니다.");
  }

  void sayAge() {
    print("${this.name}의 나이는 ${this.age}세 입니다.");
  }
}

class Student extends Person {
  Student(
    String name,
    int age,
  ) : super(
          name,
          age,
        );

  void sayStudent() {
    print("저는 학생입니다.");
  }
}

void main() {
  Student s = Student('사람 A', 20)
    ..sayName()
    ..sayAge()
    ..sayStudent();
}
```
```
저는 사람 A입니다.
사람 A의 나이는 20세 입니다.
저는 학생입니다.
```
&nbsp;&nbsp;캐스케이드 연산자는 인스턴스에서 해당 인스턴스의 속성이나 멤버 함수를 연속해서 사용하는 기능이다. 캐스케이드 연산자는 `..` 기호를 사용한다. 이 연산자를 사용하면 더 간결한 코드를 작성할 수 있다.