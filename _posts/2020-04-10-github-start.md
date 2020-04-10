---
title: "Github 블로그 시작하기 허니팁 (1)"
categories:
  - Github Blog
tags:
  - HowToStart
# toc: true
# toc_sticky: true
---

본 글이 사실상 직접 제대로 작성하는 첫 번째 포스트인 것 같다. 그 동안 공부한 자료나 포트폴리오를 정리할 용도로 블로그를 시작하려 했는데, `github.io` 라는 도메인 탐나서 github 페이지를 이용하기로 마음 먹었다.

![head-image]({{ site.url }}{{ site.baseurl }}/assets/images/2020-01-09-las-vagas-origin.jpg)

애초에 웹페이지 개발을 하지 않을 뿐더러 `git` 을 사용하지도 않았던 터라 처음 페이지 구축까지 일주일 넘게 시간이 걸린 것 같다. 구글링을 조금만 해봐도 알겠지만, 이미 github 블로그를 시작하는 방법에 대해 정리한 사이트는 많이 있다. 하지만 대부분 `Jekyll` 이나 `git` 에 익숙하다는 전제하에 설명하는 경우가 많았고, 각자의 개발 환경을 위주로 설명하고 있는 경우가 많았다.

그래서 최대한 **비전공자**의 입장을 고려해서 처음 블로그를 시작할 때 유용한 팁이나 사이트를 정리해두려고 한다.

**Notice:** 본인은 이 분야의 전문가가 아니므로 잘못된 기재된 내용이 있을 수 있습니다.
{: .notice--warning}

## 시작하기 전에

`github.io` 도메인을 갖는 블로그 페이지는 [github](https://github.com) 사이트 내의 저장 공간을 이용해서 관리한다. [github](https://github.com) 사이트에 대해 모른다면, 일단은 각종 프로그램 소스를 관리하거나 공유하는 사이트 정도로 이해하고 넘어가도록 하자. github 블로그를 운영하기 위해서는 당연히 자신의 github 계정(구체적으로는 `github.io` 도메인으로 연동시킬 온라인 저장 공간)과 블로그를 수정하고 관리하는데 사용할 프로그램이 필요하다. 따라서, 아래의 링크를 통해 본격적으로 블로그를 운영하기에 앞서 [github](https://github.com) 사이트에서 본인 계정을 만들고, 관리하는데 필요한 프로그램을 설치하자.

* [Visual Studio Code](https://code.visualstudio.com)

* [Git](https://git-scm.com/downloads)