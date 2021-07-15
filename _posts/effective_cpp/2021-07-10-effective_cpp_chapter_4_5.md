---
published: true
layout: single
title: "[Effective C++] 22. 데이터 멤버가 선언될 곳은 private 영역임을 명심하자"
category: effectcpp
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

데이터 멤버는 private에 선언하는 것을 다 아시리라 생각합니다. 너무도 당연한 말이지만 너무나도 중요해서 책에서도 길게 설명하고 있는 것이겠지요. 더 궁금하신 내용은 책을 통해 가볍게 읽도록 하시고 이 페이지에 대한 내용은 이만 넘어가겠습니다.  

아!, 그리고 책에서 아래 코드는 그래도 참고 할만한 것 같아서 올립니다.

#### 접근지정자를 통한 함수 권한 제한 구현 
*** 
```c++
class AccessLevels
{
public:
  int getReadOnly() const { return readOnly; }
  void setReadWrite(int value) { readWrite = value; }
  int getReadWrite() const { return readWrite; }
  void setWriteOnly(int value) { writeOnly = value }
private:
  int noAccess;  // 접근 불가
  int readOnly;  // 읽기 전용
  int readWrite; // 읽기 쓰기 접근
  int writeOnly; // 쓰기 전용
};
```

#### ***End Note***
***
- 데이터 멤버는 private 멤버로 선언합시다. 이를 통해 클래스 제작자는 문법적으로 일관성 있는 데이터 접근 통로를 제공할 수 있고, 필요에 따라서는 세밀한 접근 제어도 가능하며, 클래스의 불변속성을 강화할 수 있을 뿐 아니라, 내부 구현의 융통성도 발휘할 수 있습니다.
- protected는 public보다 더 많이 '보호'받고 있는 것이 절대 아닙니다.

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>