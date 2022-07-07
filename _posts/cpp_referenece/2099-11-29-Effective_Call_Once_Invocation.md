---
published: true
layout: single
title: "[C++] call_once, once_flag를 활용한 Sigletone Pattern 구현"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

설명은 아래 예제 코드로 대체 합니다.

```c++
#ifndef SNOWTHREAD_SINGLETON_H
#define SNOWTHREAD_SINGLETON_H

#include <cstdio>
#include <mutex>
#include <memory>

using namespace std;

class Singleton {
 public:
  static Singleton &getInstance() {
    call_once(Singleton::mOnceFlag, []() {
      printf("Singleton Instance is created\n");
      mInstance.reset(new Singleton);
    });

    return *(mInstance.get());
  }

  void log() {
    printf("hello\n");
  }


 private:
  static unique_ptr<Singleton> mInstance;
  static once_flag mOnceFlag;

  Singleton() = default;
  Singleton(const Singleton &) = delete;
  Singleton &operator=(const Singleton &) = delete;
};

unique_ptr<Singleton> Singleton::mInstance;
once_flag Singleton::mOnceFlag;
```

#### Reference 
***
- ***<https://snowdeer.github.io/c++/2017/08/18/singleton-using-call_once/>***