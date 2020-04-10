---
title: "Github 블로그 시작하기 허니팁 (1)"
categories:
  - Github Blog
tags:
  - HowToStart
# toc: true
# toc_sticky: true
---

본 글이 사실상 직접 제대로 작성하는 첫 번째 포스트인 것 같다. 그 동안 공부한 자료나 포트폴리오를 정리할 용도로 블로그를 시작하려 했는데, `github.io` 라는 도메인 탐나서 github 페이지를 이용하기로 마음 먹었다. (~~아래 사진은 그냥 넣어봄~~)

![head-image]({{ site.url }}{{ site.baseurl }}/assets/images/2020-01-09-las-vagas-origin.jpg)

애초에 웹페이지 개발을 하지 않을 뿐더러 `git` 을 사용하지도 않았던 터라 처음 페이지 구축까지 일주일 넘게 시간이 걸린 것 같다. 구글링을 조금만 해봐도 알겠지만, 이미 github 블로그를 시작하는 방법에 대해 정리한 사이트는 많이 있다. 하지만 대부분 `Jekyll` 이나 `git` 에 익숙하다는 전제하에 설명하는 경우가 많았고, 각자의 개발 환경을 위주로 설명하고 있는 경우가 많았다.

그래서 최대한 **비전공자**의 입장을 고려해서 처음 블로그를 시작할 때 유용한 팁이나 사이트를 정리해두려고 한다.

**Warning:** 본인은 이 분야의 전문가가 아니므로 잘못 기재된 내용이 있을 수 있습니다.
{: .notice--warning}

## 시작하기 전에

`github.io` 도메인을 갖는 블로그 페이지는 [github](https://github.com) 사이트 내의 저장 공간을 이용해서 관리한다. [github](https://github.com) 사이트에 대해 모른다면, 일단은 각종 프로그램 소스를 관리하거나 공유하는 사이트 정도로 이해하고 넘어가도록 하자. github 블로그를 운영하기 위해서는 당연히 자신의 github 계정(구체적으로는 `github.io` 도메인으로 연동시킬 온라인 저장 공간)과 블로그를 수정하고 관리하는데 사용할 프로그램이 필요하다. 따라서, 본격적으로 블로그를 운영하기에 앞서 [github](https://github.com) 사이트에서 본인 계정을 만들고, 아래의 링크를 통해 관리하는데 필요한 프로그램을 설치하자.

* [Visual Studio Code](https://code.visualstudio.com)

![visual-code-image]({{ site.url }}{{ site.baseurl }}/assets/images/visual-studio-code-download.png)

* [Git](https://git-scm.com/downloads)

![git-image]({{ site.url }}{{ site.baseurl }}/assets/images/git-download.png)

**Visual Studio Code (VS Code)**는 블로그에 올릴 포스트나 설정 파일들을 관리하는데 사용할 프로그램이고, **Git**을 설치하면서 함께 설치되는 **Git Bash**는 자신의 컴퓨터에서 작성한 포스트나 수정한 정보를 온라인 공간에 업데이트 하기 위해 사용한다. 예를 들면 블로그를 관리하고 업데이트하는 과정은 아래의 그림과 같이 **VS Code** 상에서 관련 파일을 작성한 뒤, **Git Bash**를 이용해 해당 정보를 반영하는 두 단계로 진행된다.

![visual-code-image]({{ site.url }}{{ site.baseurl }}/assets/images/vs-code-post-example.png)

```yaml
git add *
git commit -m "blog-testing"
git push
```

## Git 개념 이해하기 (권장)

자신이 컴퓨터 공학과 관련된 일을 하거나 공부를하고 있다면 `git`을 공부하고 반드시 사용하도록 하자. 본인의 경우 전자공학을 전공했고, 임베디드 시스템 프로그래밍을 주로 했었기 때문에 `git`의 필요성을 느끼지 못했었는데, 이번에 블로그 구축을 시작하면서 `git`이 얼마나 유용한 시스템인지 새삼 깨닫게 되었다. 

만약 본인이 `git`에 대해 아예 모른다면 [Git & GitHub Page 블로그 만들기](https://www.youtube.com/watch?v=YQat_D1C-ps) 시리즈를 보는 것도 추천한다. 전체 영상이 네 개밖에 되지 않고, 개인적으로는 상당히 유익한 강의라고 생각한다. 보면서 한 번에 이해해도 좋겠지만, `git`이란게 이런거구나 하는 정도로만 이해할 수 있어도 충분할 것 같다.

**Notice:** 물론 본인이 프로그래머가 아니거나, 블로그 운영에만 관심이 있다면 굳이 시청하지 않으셔도 됩니다.
{: .notice}