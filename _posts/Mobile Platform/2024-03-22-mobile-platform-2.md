---
title: "다트 언어 총 정리"
excerpt: "다트 언어 총 정리"
categories: ['Mobile Platform']
# Cpp / Algorithm / Computer Network / A.I / Database / Mobile Platform / Probability & Statistics
tags: 

toc: true
toc_sticky: true
use_math: true

date: 2024-03-22
last_modified_at: 2024-03-22

---
## 1. 기초 문법

### 메인함수

```dart
void main() {
    
}
```
&nbsp;&nbsp;```void```는 아무 값도 반환하지 않는다는 뜻이고 ```main``` 뒤에 있는 괄호 ```()``` 안에 입력받을 매개변수를 지정할 수 있다.

### 주석

```dart
// 한 줄 주석

/*
* 여러 줄 주석
*/

/// 문서 주석
```

### print() 함수

```dart
print('Hello World');
```
&nbsp;&nbsp;```print()``` 함수는 문자열을 콘솔에 출력하는 함수이다.

### 변수 선언

#### var를 사용한 변수 선언

```dart
var name = 'Jhon'; // name은 String 타입으로 자동으로 컴파일 됨

name = 'Alex'; // 변숫값 변경 가능
// name = 10; 오류, name은 String 타입으로 컴파일 되었으므로 이외의 타입은 불가
```
&nbsp;&nbsp;**var 변수명 = 값;**의 형식으로 선언한다. 변수에 값이 들어가면 자동으로 타입을 추론하는 **타입 추론 기능**을 제공하므로 명시적으로 타입을 선언하지 않아도 된다. **타입을 한 번 유추하면 추론된 타입은 고정된다**.

#### dynamic을 사용한 변수 선언

```dart
dynamic name = 'Jhon'; // String으로 타입 지정
name = 1; // int로 타입 지정
```
&nbsp;&nbsp;dynamic 키워드는 변수의 타입이 고정되지 않는다. 런타임 시 타입을 정의한다.

#### final/const를 사용한 변수 선언

```dart
final name1 = 'Jhon';
const name2 = 'Alex';

name1 = 'Kim'; // 오류. 상수는 선언 후 값을 변경 할 수 없다.
name2 = 'Eric'; // 오류
```
&nbsp;&nbsp;final은 런타임, const는 빌드 타임 상수이다.

```dart
final DateTime now = DateTime.now();
```
&nbsp;&nbsp;DateTime.now() 함수는 실행되는 순간의 날짜와 시간을 반환한다. 따라서 런타임 함수이다. ```final``` 또한 런타임 상수이므로 문장 실행 시 ```now``` 값이 한번 저장되면 추후 변경 할 수 없다.

```dart
const DateTime now = DateTime.now();
```
&nbsp;&nbsp;반면에 const는 빌드 타임 상수이므로 오류가 발생한다.
**코드를 실행하지 않은 상태에서 값이 확정되면 const를, 실행될 때 확정되면 final을 사용하자.**

### 변수 타입

```dart
int isInt = 10;
double isDouble = 2.4;
String isString = 'Hello';
bool isBool = true;
```
&nbsp;&nbsp;다트의 변수는 int, double, String, bool 4가지가 전부이다.

## 2. 컬렉션

&nbsp;&nbsp;컬렉션은 여러 값을 하나의 변수에 저장할 수 있는 타입이다. **List**, **Map**, **Set**의 총 3가지가 있다. 컬렉션 타입은 서로의 타입으로 자유롭게 형변환이 가능하다.(List$\rightarrow$Set, Set$\rightarrow$Map, $\dotsb$)
* **List**: 여러 값을 순서대로 저장
* **Map**: 특정 키 값을 기반으로 빠르게 값을 검색
* **Set**: 중복된 데이터를 제거

### List 타입

```dart
void main() {
  List<String> stringList = ['He', 'Li', 'Cu', 'Ag'];

  print("1. $stringList");
  print("2. ${stringList[0]}");.
  print("3. ${stringList[3]}");

  print("4. ${stringList.length}");

  stringList[1] = 'Ti';
  print("5. $stringList");
}

```
```
1. [He, Li, Cu, Ag]
2. He
3. Ag
4. 4
5. [He, Ti, Cu, Ag]
```
&nbsp;&nbsp;리스트 타입은 여러 값을 순서대로 나열하여 하나의 변수에 저장할 때 사용된다. **리스트명[인덱스]** 형식으로 특정 원소에 접근할 수 있다. 원소의 개수가 $n$일 때 인덱스의 범위는 0 ~ $n-1$까지 이다.

#### add() 함수

```dart
void main() {
  List<String> newList = ['a', 'b', 'c', 'd'];

  newList.add('e');

  print(newList);
}
```
```
[a, b, c, d, e]
```
&nbsp;&nbsp;add() 함수는 List에 값을 추가할 때 사용되며 추가하고 싶은 값을 매개변수에 입력하면 된다.

#### where() 함수

```dart
void main() {
  List<String> sList = ['a', 'b', 'c', 'd'];

  final nList = sList.where(
    (word) => word == 'a' || word == 'c', // 'a' 또는 'c'이면 nList에 삽입
    //','는 자동으로 줄바꿈을 해준다.
  );

  print(nList);
  print(nList.toList()); // Iterable을 List로 변환할 때 .toList() 사용
}
```
```
(a, c)
[a, c]
```
&nbsp;&nbsp;where() 함수는 List에 있는 값들을 순서대로 순회하며 특정 조건에 맞는 값만 필터링 하는 데 사용한다. 매개변수에 함수를 입력해야 하고, 입력된 함수는 기존 값은 하나씩 매개변수로 입력받는다. 각 값별로 true를 반환하면 값을 유지하고, false를 반환화면 값을 버린다. 순회가 끝나면 유지된 값들로 만든 이터러블이 반환된다.

#### map() 함수

```dart
void main() {
  List<String> sList = ['a', 'b', 'c', 'd'];

  final nList = sList.map(
        (k) => 'alpha: $k',
      ).toList();

  print(nList);
}
```
```
[alpha: a, alpha: b, alpha: c, alpha: d]
```
&nbsp;&nbsp;map() 함수는 List에 있는 값들을 순서대로 순회하면서 값을 변경할 수 있다.

#### reduce() 함수

```dart
void main() {
  List<String> sList = ['a', 'b', 'c', 'd'];

  final allAlpha = sList.reduce(
    (value, element) => value + ', ' + element,
  );

  print(allAlpha);
}
```
```
a, b, c, d
```
&nbsp;&nbsp;reduce() 함수는 순회할 때마다 값을 쌓아간다. 또한 다른 함수와는 다르게 Iterable을 반환하지 않고 **List 멤버의 타입과 같은 타입을 반환**한다. 리스트를 구성하는 값들의 타입과 반환되는 리스트를 구성할 값들의 타입이 완전히 같아야 한다. fold() 함수와 다르게 시작값은 리스트의 첫번째 값이다.
1. 첫 번째 순회: value = 'a', element = 'b'
2. 두 번째 순회: value = 'a, b', element = 'c' 
3. 세 번째 순회: value = 'a, b, c', element =  'd'
4. 마지막 순회: value = 'a, b, c, d'

#### fold() 함수

```dart
void main() {
  List<int> intList = [1, 2, 3, 4, 5];

  var sumResult = intList.fold<int>(
    10,
    (value, element) => value + element,
  );
  print(sumResult);
}
```
```
25
```
&nbsp;&nbsp;reduce() 함수와 다르게 시작값을 지정할 수 있다. 위의 예시에서는 시작값을 10으로 설정하여 정수 리스트에 있는 원소를 더하며 순회하게 된다. 또한 리스트를 구성하는 값들의 타입과 반환되는 값의 타입이 달라도 상관 없다.

### Map 타입

```dart
void main() {
  Map<String, int> intMap = {
    'first': 1,
    'second': 2,
    'third': 3,
  };

  print(intMap);
  print(intMap['second']);
}
```
```
{first: 1, second: 2, third: 3}
2
```
&nbsp;&nbsp;Map 타입은 키와 값을 저장한다. 파이썬의 딕셔너리와 같은 개념이다. **Map<키 타입, 값 타입> 맵 이름** 형식으로 선언한다.

#### 키와 값 반환받기

```dart
void main() {
  Map<String, int> intMap = {
    'first': 1,
    'second': 2,
    'third': 3,
  };

  print(intMap.keys);
  print(intMap.values);
}
```
```
(first, second, third)
(1, 2, 3)
```
&nbsp;&nbsp;Map 타입은 키와 값을 반환 받을 수 있다. Map 타입 변수에 key와 value 게터를 실행하면 된다.

### Set 타입

```dart
void main() {
  Set<String> stringSet = {
    'Aa',
    'Bb',
    'Cc',
    'Dd',
    'Dd',
  };

  print(stringSet);
  print(stringSet.contains('Aa')); // 값이 있는지 확인
}
```
```
{Aa, Bb, Cc, Dd}
true
```
&nbsp;&nbsp;Set 타입은 중복을 허용하지 않는 집합이다. **Set<타입> 세트이름** 형식으로 선언한다. 중복값을 허용하지 않기 때문에 각 값의 유일함을 보장 받을 수 있다.

### 컬렉션 타입 변환

#### List $\rightarrow$ Set

```dart
List<int> myList = [1, 2, 3];
Set<int> mySet = myList.toSet();
```
```
[1, 2, 3]
{1, 2, 3}
```

#### List $\rightarrow$ Map

```dart
List<String> keyList = ['first', 'second', 'third'];
List<int> valueList = [1, 2, 3];

Map<String, int> myMap = 
            Map<String, int>.fromIterables(keyList, valueList);
```
```
{first: 1, second: 2, third: 3}
```

#### Map $\rightarrow$ List

```dart
void main() {
  Map<String, int> myMap = {
    'Aa': 1,
    'Bb': 2,
    'Cc': 3,
  };

  List<String> myList = myMap.keys.toList();
  List<int> intList = myMap.values.toList();
}
```
```
[Aa, Bb, Cc]
[1, 2, 3]
```

#### Map $\rightarrow$ Set

```dart
void main() {
  Map<String, int> myMap = {
    'Aa': 1,
    'Bb': 2,
    'Cc': 3,
  };

  Set<String> myList = myMap.keys.toSet();
  Set<int> intList = myMap.values.toSet();
}
```
```
{Aa, Bb, Cc}
{1, 2, 3}
```

#### Set $\rightarrow$ List

```dart
void main() {
  Set<String> stringSet = {'Aa', 'Bb', 'Cc'};

  List<String> myList = stringSet.toList();
}
```
```
{Aa, Bb, Cc, Dd}
[Aa, Bb, Cc, Dd]
```

#### Set $\rightarrow$ Map

```dart
void main() {
  Set<String> keys = {'Aa', 'Bb', 'Cc'};
  Set<int> values = {1, 2, 3};
  
  Map<String, int> myMap = Map.fromIterables(keys, values);
}
```
```
{Aa: 1, Bb: 2, Cc: 3}
```

### enum

```dart
enum Status {
  approved,
  pending,
  rejected,
}

void main() {
  Status status = Status.pending;
  print(status);
}
```
```
Status.pending
```
&nbsp;&nbsp;한 변수의 값을 몇 가지 조건으로 제한하는 기능으로 선택지가 제한적일 때 사용한다. String으로 대체 할 수 있지만 enum은 자동 완성이 지원되고 정확히 어떤 선택지가 존재하는지 정의할 수 있기 때문에 유용하다.

## 3. 연산자

### 기본 수치 연산자

```dart
+ 덧셈
- 뺄셈
* 곱셈
/ 나눗셈
% MOD

num++ 코드 실행 후 1 증가
++num 1 증가 후 코드 실행
num--
--num

print(number++); // 2 출력하고 1 증가하여 number == 3
print(++number); // 1 증가하여 number == 4, 출력
print(number--); // 4 출력하고 1 감소하여 number == 3
print(--number); // 1 감소하여 number == 2, 출력

print(number += 2); // 4
print(number -= 2); // 0
print(number *= 2); // 4
print(number /= 2); // 1
```

### null 관련 연산자

```dart
double? num1 = null;
// double num1 = null; 타입 뒤에 ?를 명시하지 않아 에러가 난다.
```

&nbsp;&nbsp;null은 아무 값도 없음을 뜻한다. 다트 언어에서는 변수 타입이 null값을 가지는지 여부를 직접 지정해줘야 한다. 타입 키워드를 그대로 사용하면 기본적으로 null값이 저장될 수 없다. 따라서 타입 뒤에 '?'를 추가해줘야 null값이 저장될 수 있다.

```dart
  double? num; // 자동으로 null값 지정
  print(num);

  num ??= 3; // ??를 사용하면 값이 null일 때만 저장된다.
  print(num);

  num ??= 4; // null이 아니므로 3이 유지된다.
  print(num);
```
```
null
3.0
3.0
```

&nbsp;&nbsp;타입 뒤에 ?를 추가하면 자동으로 null값이 저장된다. null을 가질 수 있는 변수에 새로운 값을 추가할 때 ??를 사용하면 null일 때만 값이 저장된다.

### 값 비교 연산자
```dart

```
