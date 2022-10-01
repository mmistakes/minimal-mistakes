---
published: true
layout: single
title: "[CMake] CMake Platform 구분하는 법
category: cmake
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

아래 예제 코드로 설명을 대체 합니다.

## 1. Platform Variables

- UNIX : is TRUE on all UNIX-like OS's, including Apple OS X and CygWin
- WIN32 : is TRUE on Windows. Prior to 2.8.4 this included CygWin
- APPLE : is TRUE on Apple systems. Note this does not imply the
- system is Mac OS X, only that APPLE is #defined in C/C++ header files.
- MINGW : is TRUE when using the MinGW compiler in Windows
- MSYS : is TRUE when using the MSYS developer environment in Windows
- CYGWIN : is TRUE on Windows when using the CygWin version of cmake

**CMakeLists.txt 예제**
```cmake
if (UNIX)
    # do something
elseif(WIN32)
    # do something
elseif(APPLE)
    # do something
endif()
```

## 2. CMake System

- Windows : Windows (Visual Studio, MinGW GCC)
- Darwin : macOS/OS X (Clang, GCC)
- Linux : Linux (GCC, Intel, PGI)
- Android : Android NDK (GCC, Clang)
- FreeBSD : FreeBSD
- CrayLinuxEnvironment : Cray supercomputers (Cray compiler)
- MSYS : Windows (MSYS2 shell native GCC)

**CMakeLists.txt 예제**
```cmake
if (CMAKE_SYSTEM_NAME MATCHES "Windows")
    # do something
elseif(CMAKE_SYSTEM_NAME MATCHES "Linux")
    # do something
elseif(CMAKE_SYSTEM_NAME MATCHES "Darwin")
    # do something
elseif(CMAKE_SYSTEM_NAME MATCHES "Android")
    # do something
endif()
```