---
published: true
layout: single
title: "[Effective C++] 13. 자원 관리에는 객체가 그만! - 2"
category: none
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
*Effective C++ 제 3판 - Chapter 3 - 1*
* * *


#### shared_ptr\<T>
***

unique_ptr에 이어서 shared_ptr에 대해 알아봅시다. shared_ptr은 특정 객체를 참조하는 스마트 포인터의 개수를 count 합니다.   

그리고 count를 참조 회수(reference count)라고 합니다. 가장 중요한 부분은 reference count가 0이 되면 delete 키워드를 사용하여 메모리를 자동으로 해제합니다.  

몇 가지 예제를 통해 shared_ptr의 사용법을 알아보도록 합시다.

#### 1) 선언 방법
- **하나의 원시 포인터를 2개의 shared_ptr에 각각 넣을 경우 2개의 shared_ptr은 한개의 원시 포인터에 대해 메모리 할당 해제를 각각 실행하게 됩니다.**
- 하지만 다른 두개의 shared_ptr이 하나의 포인터를 공유해선 안된다는 의미는 아닙니다. 적절한 custom deleter를 구현하면 문제 없이 동작하는 프로그램을 만들 수 있지요.

```c++
...
// 1
std::shared_ptr<int> s_num = std::make_shared<int>(10);
std::cout << s_num.use_count() << std::endl; // 1
...
---------------------------------------------------------
...
// 2
int* num = new int(10);
std::shared_ptr<int> s_num(num);
std::shared_ptr<int> s_num2(num);
// free(): double free detected in tcache 2
// 에러 발생, 이중 free() 발생하므로 아래와 같이 사용해야 합니다.
...
return 0;
...
---------------------------------------------------------
...
// 3
std::shared_ptr<int> s_num(new int(10));
std::shared_ptr<int> s_num2(s_num);
std::cout << s_num.use_count() << std::endl; // 2
...
```

#### 2) reset()
- 다른 포인터로 초기화 할 시에 사용 가능
- nullptr 초기화시에 사용 가능

```c++
std::shared_ptr<int> s_num(new int(20));
s_num.reset();

std::shared_ptr<int> s_num2;
s_num2.reset(new int(30));
```


#### 3) get()
- 원시 포인터 반환

```c++
std::shared_ptr<int> s_num(new int(20));
int* ptr = s_num.get();
std::cout << *ptr << std::endl; // 20

std::shared_ptr<int> s_num2 = std::make_unique<int>(10);
int* ptr2 = s_num2.get();
std::cout << *ptr2 << std::endl; // 10
```


#### 4) owner_before(const shared_ptr<T>& other)
owner_before는 두 포인터가 소유권을 공유하거나, 둘 다 비어있는 경우에만 동등하게 되는  

```c++

```

자 이러한 성질을 가지고, 간단한 도우미 함수를 만들 수 있습니다. 아래의 함수를 통해 2개의 shared_ptr이 

```c++
bool equivalent(p1, p2) 
{
  return !p1.owner_before(p2) && !p2.owner_before(p1);
}
```

#### 2개의 shared_ptr이 서로 다른 객체를 가리키는데 소유권은 공유하는 경우
```c++
asd
```
#### 2개의 shared_ptr이 동일한 객체를 가리키는데 소유권은 공유하지 않는 경우
```c++
asd
```

<br>
* * *
<br>
자 이번엔, unique_ptr 때 처럼 좀 더 다양한 예제들을 통해 사용법을 숙지해보도록 합시다.  
#### 1) 원시 포인터를 shared_ptr을 통해 관리할 때

```c++
std::string* p_integer = new std::string();
std::shared_ptr<std::string> s_string(p_integer);
std::shared_ptr<std::string> s_string2(s_string);
std::shared_ptr<std::string> s_string3(s_string);
std::cout << s_string2.use_count() << std::endl;
printf("%d\n", s_string2.use_count()); // 3
---------------------------------------------------------
std::string* p_integer = new std::string();
std::shared_ptr<std::string> s_string;
s_string.reset(p_integer);
std::cout << s_string.use_count() << std::endl; // 1
---------------------------------------------------------
std::string* p_integer = nullptr;
std::shared_ptr<std::string> s_string(new std::string());
p_integer = s_string.get();
std::cout << s_string.use_count() << std::endl; // 1
```

#### 2) 인자로 값을 받는 경우



#### 3) 인자로 참조를 받는 경우

#### 4) 인자로 RValue 참조(&&)를 받는 경우

#### weak_ptr\<T>
***

#### 순환 참조
***

#### Custom Deleter
***

#### ***End Note***
***

#### Reference 
***  
- ***Effective C++ (Scott Meyers)***
- ***<https://medium.com/pranayaggarwal25/custom-deleters-with-shared-ptr-and-unique-ptr-524bb7bd7262>***
- ***<https://stackoverflow.com/questions/21834131/stdshared-ptrowner-before-and-stdowner-less-what-exactly-is-meant-by-own>***
- ***<https://stackoverflow.com/questions/1403465/what-is-boosts-shared-ptrshared-ptry-const-r-t-p-used-for>***

<body translate="no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  <div id="mouse_no" oncontextmenu="return false" ondragstart="return false" onselectstart="return false">
  </div>
</body>