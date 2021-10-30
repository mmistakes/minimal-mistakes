---
published: true
layout: single
title: "[Effective C++] 44. 매개변수에 독립적인 코드는 템플릿으로부터 분리시키자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

템플릿은 코드 비대화라는 단점을 가지고 있습니다. 그러므로 템플릿으로 인해 이진 코드가 불어터지는 불상사를 미연에 방지할 방법을 알아둬야 합니다. 


#### 공통성 및 가변성 분석 (Commonality and Variability Analysis)
* * *
우선적으로 써볼 수 있는 방법은 공통성 및 가변석 분석 방법이 있습니다. 용어가 어려워 보이지만 전혀 어렵지 않습니다. 
사람들은 코드를 작성할 때 비슷한 공통 부분을 예측하여 별도의 새로운 클래스에 옮긴 후, 클래스 상속 혹은 객체 합성을 
사용해서 원래의 클래스들이 공통 부분을 공유하도록 구현하곤 합니다. 템플릿을 작성할 경우에도 똑같은 분석을 하고 
똑같은 방법으로 코드 중복을 막으면 됩니다.  

단, 템플릿의 경우 코드 중복이 암시적이기 때문에 감각만으로 알아채야 합니다. 연습이 필수적이지요. 그러면 이제 예제를 통해 알아봅시다.

```c++
template<typename T, std::size_t n>
class SquareMatrix
{
public:
  ...
  void invert(); // 주어진 행렬을 역행렬로 만듭니다.
};

...
...

SquareMatrix<double, 5> sml;
...
sml1.invert(); // SquareMatrix<double, 5>::invert를 호출합니다.

SquareMatrix<double, 10> sml;
...
sml2.invert(); // SquareMatrix<double, 10>::invert를 호출합니다.
```

예제를 보면 invert의 사본 2개가 각각 자동으로 생성 됩니다. 템플릿 정의는 하나인데 말이지요. 이 경우
값을 매개변수로 받는 별도의 함수로 만들고 5와 10을 매개변수로 넘겨서 호출하게 만들 수 있습니다.

```c++
template<typename T>
class SquareMatrixBase
{
protected:
  ...
  void invert(std::size_t matrixsize);
  ...
};

template<typename T, std::size_t n>
class SquareMatrix : private SquareMatrixBase<T>  // private 상속인 것 유의.
{
private:
  using SquareMatrixBase<T>::invert;

public:
  ...
  void invert() { this->invert(n); } // 멤버 함수 이름이 기본 클래스의 함수명으로 인해
                                     // 파생 클래스에서 가려지는 문제를 방지하기 위해 this 사용
};

...
...

SquareMatrix<double, 5> sm1;
sm1.invert();

SquareMatrix<double, 10> sm2;
sm2.invert();
```

이렇게 구현하면 공통된 MatrixBase 클래스를 공유하도록 만들어서 코드 비대화를 방지할 수 있습니다. 
여기서 주의할 점은 invert 함수가 Base 함수에서 protected 멤버로 되어 있다는 것 입니다.


#### 기본 클래스에서 T의 type을 아는 방법
* * *

위의 코드를 보면 invert에서는 T Type을 사용하지 않습니다. 즉, 기본 클래스의 invert에서는 
위의 코드로는 T의 Type을 알수가 없다는 의미이지요. 그렇다면 어떻게 구현해야 기본 클래스의 invert에서 T Type을 알 수 있을까요?  

바로, 행렬 값을 담는 메모리에 대한 포인터를 SquareMatrixBase가 저장하게 하는 것 입니다. 
이렇게 파생 클래스를 만들면 동적 메모리 할당이 필요 없는 객체가 되지만, 객체 자체의 크기가 좀 커질 수 있습니다. 이 방법이 마음에 들지 않으면 각 행렬의 
데이터를 힙에 두는 다른 방법도 가능합니다.

```c++
template<typename T>
class SquareMatrixBase
{
protected:
  SquareMatrixBase(std::size_t n, T *pMem) 
    : size(n), pData(pMem) {}              

  void setDataPtr(T *ptr) { pData = ptr; }
  ...
private:
  std::size_t size;
  T *pData;
};

template<typename T, std::size_t n>
class SquareMatrix : private SquareMatrixBase<T>
{
public:
  SquareMatrix()
  : SquareMatrixBase<T>(n, data) { } // 기본 클래스 초기화 하고
  ...                                // 파생 클래스 초기화 함.

private:
  T data[n*n];
}
```

```c++
// 힙 영역 사용한 구현 방법
template<typename T, std::size_t n>
class SquareMatrix : private SquareMatrixBase<T>
{
public:
  SquareMatrix()
  : SquareMatrix<T>(n, 0),
    pData(new T[n*n])
    { this->setDataPtr(pData.get()); } // 기본 클래스의 setDataPtr 함수 사용해서
                                       // 포인터의 사본을 올려 보냄.
  ...
  ...
private:
  boost::scoped_array<T> pData;
};
```

어느 메모리에 데이터를 저장하느냐에 따라 설계가 다소 달라지지만, 코드 비대화의 측면에서 
아주 중요한 성과를 쥘 수 있는 점은 같습니다. 중요한 성과란 바로, 
SquareMatrix에 속해 있는 멤버 함수 중 상당수가 기본 클래스 버전을 호출하는 단순 인라인 함수가 될 수 있으며 똑같은 타입의 
데이터를 원소로 갖는 모든 정방행렬들이 행렬 크기에 상관 없이 이 기본 클래스 버전의 사본 하나를 공유한다는 것 입니다.

#### ***End Note***
***
- 템플릿을 사용하면 비슷비스한 클래스와 함수가 여러 벌 만들어집니다. 따라서 템플릿 매개 변수에 종속되지 않은 템플릿 코드는 비대화의 원인이 됩니다.
- 비타입 템플릿 매개변수로 생기는 코드 비대화의 경우, 테플릿 매개변수를 함수 매개변수 혹은 클래스 데이터 멤버로 대체함으로써 비대화를 종종 없앨 수 있습니다.
- 타입 매개변수로 생기는 코드 비대화의 경우, 동일한 이진 표현구조를 가지고 인스턴스화되는 타입들이 한 가지 함수 구현을 공유하게 만듦으로써 비대화를 감소시킬 수 있습니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>
