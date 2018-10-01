---
title: Managing Python Version in Conda
key: 20181001
tags: conda python
excerpt: ""
---

Conda 를 통해서 파이썬 버전을 관리함

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

![Alt][conda-search]

# 참조
[Conda 정의][1]
[Conda 파이선 버전 관리][1]

<!-- Reference Links -->

[1]: https://conda.io/docs/index.html "Conda"
[2]: https://conda.io/docs/user-guide/tasks/manage-python.html "Conda manage python"


<!-- Images Reference Links -->
[conda-search]: assets\img\2018-10-01-Anaconda-Managing-Python\conda-search.png



<!-- End of Documents -->
---

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
