---
title: Module, Package and Project
date: 2024-07-13
categories: python-basic
---

# Module & Package 개요

1. Module

- 어떤 대상의 부분 혹은 조각
  - 레고 블록
- 작은 프로그램 조각들
- 모듈들을 모아서 하나의 큰 프로그램을 개발함
- 프로그램을 모듈화 시키면 다른 프로그램이 사용하기 쉬움

2. Package

- 모듈을 모아놓은 단위, 하나의 프로그램

---

## Module

- 파이썬의 Module : py 파일을 의미
- 같은 폴더에 Module에 해당하는 .py파일과 사용하는 .py를 저장한 후
- import 문을 사용해서 module을 호출
- 같은 디렉토리에 있어야 함

```python
# fah_converter.py
def convert_c_to_f(celcius_value):
    return celcius_value * 9.0 / 5 + 32

# module_ex.py
import fah_converter # 모듈 fah_converter의 모든 코드가 메모리 로딩이 일어남

print("Enter a celsius value: ")
celsius = float(input())
fahrenheit = fah_converter.convert_c_to_f(celcius_value)
print("Fahrenheit: ", fahrenheit)
```

### namespace

- 모듈을 호출할 때 범위를 정할 수 있음
- 모듈 안에는 함수와 클래스 등이 존재 가능
- 필요한 내용만 골라서 호출 가능
- 모든 코드가 메모리 로딩되는 것을 방지하기 위해 사용
- **from**과 **import** 키워드 사용

```pytho됨
# Alias 설정
import fah_converter as fah
print(fah.convert_c_to_f(41.6)) # convert_c_to_f가 어디에서 왔는지 명확히 알 수 있는 장점

# 모듈에서 특정 함수 또는 클래스만 호출
from fah_converter import convert_c_to_f
print(convert_c_to_f(41.6))

# 모듈에서 모든 함수 또는 클래스 호출
from fah_converter import *
print(convert_c_to_f(41.6))
```

### Built-in Modules

- 파이썬이 기본 제공하는 라이브러리
- 문자 처리, 웹, 수학 등 다양한 모듈이 제공됨
- 별다른 조치없이 import 문으로 활용 가능
- random(난수), time(시간), urllib.request(웹)

## Package

- 하나의 대형 프로젝트를 만드는 코드의 묶음
- 다양한 모듈들의 합, **폴더**로 연결됨
- **init**, **main** 등 키워드 파일명이 사용됨
- 다양한 오픈 소스들이 모두 패키지로 관리됨
- 폴더 별로 **init**.py 구성하기
  - 현재 폴더가 패키지임을 알리는 초기화 프로젝트
  - 없을 경우 패키지로 간주하지 않음(3.3+ 부터는 X)
  - 하위 폴더와 py파일(모듈)을 모두 포함함
  - import와 **all**keyword 사용

> 참고 Package namespace
> Package 내에서 다른 폴더의 모듈을 부를 때는 **상대 참조**로 호출

```python
from game.graphic.render import render_test()

from .render import render_test

from ..sound.echo import echo_test
```

## 오픈 소스 라이브러리 사용하기

- 웹과 데이터 분석 패키지를 둘 다 설치하면 가끔 두 패키지끼리 충돌이 날 때가 있음

### 가상환경 설정(Virtual Environment)

- 특정 프로젝트에 필요한 패키지와 라이브러리를 독립적으로 관리할 수 있도록 도와주는 도구
- 프로젝트 진행 시 필요한 패키지만 설치하는 환경
- 다양한 **패키지 관리 도구**가 있음
  - virtualenv
    - 가장 대표적인 가상환경 관리 도구
    - 레퍼런스 + 패키지 개수
  - conda
    - 사용 가상환경 관리 도구
    - miniconda 기본 도구
    - 설치의 용이성

```
# conda 가상환경 만들기
conda create -n my_project python=3.8
  conda create : 가상환경 새로 만들기
  -n : 이름
  python=3.8 : 파이썬 버전

conda activate my_project

conda deactivate

conda install matplotlib

conda install tqdm

conda install jupyter
```
