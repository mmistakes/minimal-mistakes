---
title: colortool for wsl
key: 20180903
tags: colortool ms wsl
---

Microsoft WSL 에서 colortool 을 이용하여 간편하게 color template 을 변경하고 그 결과 WSL 쉘에서 제대로 식별되지 않는 blue color font 문제를 해결 할 수 있다.

<!--more-->

**참조 링크**
- [Tistory, 터미널(CMD, WSL) 컬러셋 변경 - WSL)](http://webdir.tistory.com/546)

WSL 은 Windows Subsystem for Linux 의 약자로 윈도우에서 리눅스 환경을 제공해주어 편리하다.

그러나 터미널의 폰트가 가시적이지 않은 문제로 인해서 파란색 글자의 식별이 어려운 문제가 있어 이를 Microsoft 에서 제공해주는 colortool 을 이용하여 간단하게 해결 할 수 있다.

아래의 경로에서 colortool 배포본을 다운받는다.

- [Microsoft Colortool Download in Github.com](https://github.com/Microsoft/console/releases)

다운로드 후에 아래의 명령어를 입력하면 color template 이 변경되어 가독성이 좋아진다.

```
colortool.exe -b solarized_dark
```

![Alt][img1]

[img1]: /assets/images/2018-09-03-colortool-for-wsl/colortool-change-color-template.png

---

If you like the post, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
