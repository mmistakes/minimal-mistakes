---
layout: single
title: Python 버전 관리 - pyenv
categories: Other Tips
tags:
  - Tips
  - Linux
  - Python
---

파이썬을 종종 사용하는 경우가 생기는데, 필요한 파이썬 버전이 다를때가 많다.

이러한 경우 pyenv를 이용하여 원하는 버전을 설치하고 관리할 수 있다.

ex) A : python 3.7 사용/ B : python 3.11 사용

[https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)

```bash
pyenv update

# 설치 가능한 파이썬 버전 리스트
pyenv install --list

# 원하는 버전 설치
pyenv install {python version}

# 설치한 파이썬 리스트
pyenv versions

# 선택한 위치에서만 해당 버전 사용
pyenv local {python version}

# 전체 위치에서 해당 버전 사용
pynev global {python version}
```
