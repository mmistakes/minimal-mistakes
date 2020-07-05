---
toc: true
title: "Private Pypi 서버 구성하기"
date: 2019-05-31
categories: python
---

Python 용 Package Index 를 비공개 형태로 배포하는 방법을 설명합니다.

## 배경지식

- Pypi란?
  - Python package index ([pypi.org](https://pypi.org))
  - Find, install and publish Python packages with the Python Package Index
- htpasswd
  - htpasswd는 HTTP 사용자의 기본 인증을 위해 사용자 이름 및 비밀번호를 저장하는 데 사용되는 플랫 파일을 작성하고 업데이트하는 곳에 사용됩니다.
  - htpasswd 를 활용해서 upload 할 때 인증과정을 거칩니다.
  cf. Public Pypi 서버도 같은 방식으로 인증을 합니다. ([Link](https://medium.com/@joel.barmettler/how-to-upload-your-python-package-to-pypi-65edc5fe9c56))

## Pypi 서버 띄우기

Docker 가 설치된 상태에서 Pypi 를 띄우는 명령어를 소개합니다. 그리고 아래의 명령어에 대해 설명드리도록 하겠습니다.

```bash
docker run -p 8080:8080 -v ~/Documents/pypi/.htpasswd:/data/.htpasswd -v ~/Documents/pypi/packages:/data/packages pypiserver/pypiserver:latest -P .htpasswd packages
```

### 볼륨

#### .htpasswd

user/password 정보를 담고 있는 파일이고 아래는 예시입니다.

```
urunimi:$apr1$PLHBMUpG$VIxuqUApzltSih7RAA.du1
```

위 파일을 미리 생성 해서 mount 해줘야 하는데요. Htpasswd 가 필요합니다.
[Htpasswd Generator](http://www.htaccesstools.com/htpasswd-generator/) 에서 하나 생성하세요.

#### packages

서비스 할 package 리스트를 저장할 볼륨입니다.

### 이미지

Dockerhub 에서 Pypi 용 서버 이미지가 공개되어 있습니다. 여기서는 latest tag 를 받아서 사용하도록 하겠습니다.

- pypiserver/pypiserver:latest

### 배포

위에서 마운트한 두 볼륨에 해당하는 파일들과 함께 배포해야 합니다.

- htpasswd file
- packages directory

## Pypi Server에 업로드 하기

### Prepare credential

~/.pypirc

```
[distutils]
index-servers =
  pypi
  local
[pypi]
username:
password:
[local]
repository: http://127.0.0.1:8080
username: urunimi
password: pypi
```

- index server 이름을 정해야합니다. 여기서는 local 이라고 하겠습니다.
- 위에 .htpasswd 에서 사용한 username / password 를 입력해 두면 업로드할 때 인증을 합니다.

```bash
# docker logs -f {{pypi-server}}
172.17.0.1 - - [15/May/2019 06:50:23] "POST / HTTP/1.1" 200 0  # 업로드 성공
172.17.0.1 - - [15/May/2019 06:50:06] "POST / HTTP/1.1" 403 702 # 인증 실패
```

### Project tree

```bash
├── LICENSE   # Optional
├── README.md # Optional
├── setup.cfg
├── setup.py
└── toy
    └── __init__.py
```

setup.cfg

```
[metadata]
description-file = README.md
```

setup.py

```python
from setuptools import setup, find_packages

setup (
    name             = 'toy', 
    packages         = find_packages(exclude=["*.tests", "*.tests.*", "tests.*", "tests"]),  # 이렇게 해서 test 패키지를 제외할 수 있음
    version          = '1.0.0',
    #install_requires=[
    #    'markdown',
    #],  # 이렇게 해서 dependency 추가 가능
    author           = 'ben',
    author_email     = 'ben.yoo@buzzvil.com',
    description      = 'Desc',
    url              = "http://dev.buzzvil.com/",
)
```

cf. [https://setuptools.readthedocs.io/en/latest/setuptools.html](https://setuptools.readthedocs.io/en/latest/setuptools.html)

### Commands

```bash
python setup.py sdist upload -r local
```

- **sdist**
    1. root 하위에 있는 package 들을 모아서
    2. dist 폴더 안에 toy-1.0.0.tar.gz 파일을 생성
- **upload** -r local
    1. tar.gz 업로드

Pypi server file tree

```bash
.
├── .htpasswd
└── packages
    ├── .DS_Store
    └── toy-1.0.0.tar.gz

# toy-1.0.0.tar.gz 압축을 풀어보면
.
├── toy-1.0.0
    │   ├── PKG-INFO
    │   ├── README.md
    │   ├── setup.cfg
    │   ├── setup.py
    │   ├── toy    # 이렇게 package가 include 됨
    │   │   └── __init__.py
    │   └── toy.egg-info
    │       ├── PKG-INFO
    │       ├── SOURCES.txt
    │       ├── dependency_links.txt
    │       └── top_level.txt
```

## Pypi 에서 Package 다운로드 하기

### Update requirements.txt

```bash
# ...
toy==1.0.0
```

### Package install 실행

```bash
> pip install -r requirements.txt
...
Collecting toy==1.0.0 (from -r requirements.txt (line 35))
  ERROR: Could not find a version that satisfies the requirement toy==1.0.0 (from -r requirements.txt (line 35)) (from versions: none)
ERROR: No matching distribution found for toy==1.0.0 (from -r requirements.txt (line 35))
```

위와 같이 원래는 알수없는 distribution 이라고 에러를 리턴합니다. 이를 해결하기 위해 extra index url 을 추가해줘야 합니다.

### extra-index-url 추가

```bash
> pip install -r requirements.txt --extra-index-url http://localhost:8080/simple/
# 추가한 Index를 로그에 표시함
Looking in indexes: https://pypi.org/simple, http://localhost:8080/simple/ 
...
Collecting toy==1.0.0 (from -r requirements.txt (line 35))
  Downloading http://localhost:8080/packages/toy-1.0.0.tar.gz
```
