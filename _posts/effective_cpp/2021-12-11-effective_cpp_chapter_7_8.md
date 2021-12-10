---
published: true
layout: single
title: "[Effective C++] 48. 템플릿 메타프로그래밍, 하지 않겠는가?"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

TMP(Template Meta)에는 엄청난 강점이 두개나 있습니다. 첫째, TMP를 쓰면 다른 방법으로는 
까다롭거나 불가능한 일을 굉장히 쉽게 할 수 있습니다. 둘째, 템플릿 메타프로그램은 C++ 컴파일이 
진행되는 동안 실행되기 때문에, 기존 작업을 런타임 영역에서 컴파일 타임 영역으로 전환할 수 있습니다.
  
이러한 강점 덕분에 두가지 재미를 맛볼 수 있습니다. 하나는 일반적으로 프로그램 실행 도중에 잡혀 왔던 
몇몇 에러들을 컴파일 도중에 찾을 수 있다는 점입니다. 또 하나는 TMP를 써서 만든 C++ 프로그램이 확실히 
모든 면에서 효율적일 여지가 많다는 것입니다.

TMP가 실력 발휘하는 예를 들어보면 크게 세 군데 입니다.

#### 치수 단위의 정확성 확인
* * *
과학 기술 분야의 응용 프로그램을 만들 때는 무엇보다도 치수 단위가 똑바로 조합되어야 하는 것이 최우선 입니다. 
예를 들면, 속도를 나타내는 변수에 질량을 나타내는 변수를 대입하면 에러 입니다. 
하지만 거리 변수를 시간 변수로 나누고 그 결과를 속도 변수에 대입하는 것은 맞습니다. 
이러한 모든 치수 단위의 조합이 제대로 됐는지를 컴파일하는 동안에 확인할 수 있습니다.

#### 행렬 연산의 최적화
* * *
operator* 등의 어떤 연산자 함수는 연산 결과를 새로운 객체에 담아 반환해야 합니다. 아래와 같은 코드를 보실까요?
```c++
SquareMaxtrix<double, 10000> BigMatrix;
BigMatrix m1, m2, m3 ...;
BigMatrix result = m1 * m2 * m3 ...;
```
보통의 방법으로 계산하려면 BigMatrix 변수의 개수 만큼 임시 행렬이 생겨나야 할 것 입니다. 
operator*을 한번 호출할 때마다 반환되는 결과로 생기는 것이죠. 
TMP의 표현식 템플릿(expression template)을 사용하면 덩치 큰 임시 객체를 없애는 것은 물론이고 
루프까지 합쳐버릴 수 있습니다.

### 맞춤식 디자인 패턴 구현의 생성
* * *
Strategy 패턴, Observer 패턴, Visitor 패턴 등의 디자인 패턴은 그 구현 방법이 여러 가지일 수 있습니다. 
TMP를 사용한 프로그래밍 기술인 policy-based design이라는 것을 사용하면 따로따로 마련된 설계상의 선택을 나타내는 템플릿을 만들어낼 수 있게 됩니다. 


#### ***End Note***
***
- 템플릿 메타프로그래밍은 기존 작업을 런타임에서 컴파일 타임으로 전화하는 효과를 냅니다.
 따라서 TMP를 쓰면 선행 에러 탐지와 높은 런타임 효율을 손에 거머쥘 수 있습니다.
- TMP는 정책 선택의 조합에 기반하여 사용자 정의 코드를 생성하는 데 쓸 수 있으며, 또한 특정 
타입에 대해 부적절한 코드가 만들어지는 것을 막는 데도 쓸 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>