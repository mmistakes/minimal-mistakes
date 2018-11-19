---
title: Managing Python Version in Conda
key: 20181001
tags: conda python
excerpt: "Conda 를 통한 파이썬 버전 관리"
---

# Summary

Conda 를 통해서 파이썬 버전을 관리함

# 과제

Docker 와 어떻게 상화 작용할까?

<!-- more -->

# Conda 란?

Conda 는 오픈소스 패키지 관리 시스템으로 `Windows`, `macOS`, `Linux` 에서 동작한다.
콘다의 기능은 아래와 같다.

-  패키지(packages) 및 종속성(dependencies)에 대한 설치(install), 동작(run), 업데이트(update)

여기서는 Conda 를 통해 Python 버전을 검색 및 설치 후 사용해 보겠다.


## Conda 파이썬 패키지 검색

Anaconda Prompt 를 통해서 Conda 명령어를 실행하여
Python 버전 리스트를 확인한다.

```
conda search python
```

명령어를 실행하면 아래와 같이 설치가능한 python 버전이 출력된다.

![Conda Search 명령어][conda-search]

## Conda Python 3.5 버전 설치

### 새로운 환경 생성하기

아래의 명령을 입력하면 새로운 환경이 만들어진다. 그리고 conda env list 를 통해서 생성된 환경을 확인할 수 있다.
```
conda create -n py35 python=3.5 anaconda

#
# To activate this environment, use
#
#     $ conda activate py35
#
# To deactivate an active environment, use
#
#     $ conda deactivate
```

명령 실행 화면은 아래와 같다.

![Conda Create 명령어][conda-create]

### py35 환경 확인하기

아래의 명령어를 통해 현재 생성된 환경을 확인할 수 있다.

```
conda env list
```

생성된 환경을 확인할 수 있다.
![Conda Env List 명령어][conda-env-list]

### py35 활성화 하기

생성된 환경을 활성화 한다.

```
# Ex. activate [env_name]
activate py35
```

생성한 환경이 shell 에 설정됨을 확인할 수 있다.

![activate 명령어][activate-py35]

# 참조
- [Conda 정의][1]
- [Conda 파이선 버전 관리][2]
- [Conda Env 활성화][3]

<!-- Reference Links -->

[1]: https://conda.io/docs/index.html "Conda"
[2]: https://conda.io/docs/user-guide/tasks/manage-python.html "Conda manage python"
[3]: https://conda.io/docs/user-guide/tasks/manage-environments.html#activate-env "Activate Env"


<!-- Images Reference Links -->
[conda-search]: /assets/img/2018-10-01-Anaconda-Managing-Python/conda-search.png
[conda-create]: /assets/img/2018-10-01-Anaconda-Managing-Python/conda-create.png
[conda-env-list]: /assets/img/2018-10-01-Anaconda-Managing-Python/conda-env-list.png
[activate-py35]: /assets/img/2018-10-01-Anaconda-Managing-Python/activate-py35.png



<!-- End of Documents -->
---

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
