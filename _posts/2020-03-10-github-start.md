---
title: "Github page 시작하기 허니팁 (1)"
categories:
  - Github Blog
tags:
  - HowToStart
toc: true
toc_sticky: true
---

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2020-01-09-las-vagas.png" alt="">
</figure> 

## 1. 시작하기 전에

필자는 웹페이지 개발을 하지 않을 뿐더러 `git` 을 사용하지도 않았던 터라, 처음 github page 구축까지 일주일이 넘게 걸렸다. 이미 github page를 이용해 블로그를 운영하는 방법에 대해 정리한 사이트는 많이 있지만, 대부분 `Jekyll` 이나 `git` 에 익숙하다는 전제하에 설명하는 경우가 많았고, 각자의 개발 환경을 위주로 설명하고 있는 경우가 많아서 그대로 따라하기에도 어려웠던 기억이 있다.

**Warning:** 본인은 이 분야의 전문가가 아니므로 잘못 기재된 내용이 있을 수 있습니다.
{: .notice--warning}

### 1.1 github page는 어떻게 관리되는가?

`github.io` 도메인을 갖는 블로그는 **[github](https://github.com)** 사이트 내의 저장 공간을 이용해서 관리한다. 만약 **[github](https://github.com)** 사이트에 대해 모른다면, 일단은 각종 프로그램 소스를 관리하거나 공유하는 사이트 정도로 이해하고 넘어가도록 하자. github 블로그를 운영하기 위해서는 당연히 자신의 github 계정(**구체적으로는 `github.io` 도메인으로 연동시킬 온라인 저장 공간**)과 블로그를 수정하고 관리하는데 사용할 프로그램이 필요하다. 따라서, 본격적으로 블로그를 운영하기에 앞서 **[github](https://github.com)** 사이트에서 본인 계정을 만들고, 아래의 링크를 통해 블로그 운영에 필요한 프로그램을 설치하자.

**[Visual Studio Code](https://code.visualstudio.com)**

<figure style="width: 80%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/visual-studio-code-download.png" alt="">
  <figcaption>Look at 580 x 300 getting some love.</figcaption>
</figure>

**[Git](https://git-scm.com/downloads)**

<figure style="width: 80%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/git-download.png" alt="">
  <figcaption>Look at 580 x 300 getting some love.</figcaption>
</figure>
<!--![git-image]({{ site.url }}{{ site.baseurl }}/assets/images/git-download.png)-->

**Visual Studio Code (VS Code)**는 블로그에 올릴 포스트나 설정 파일들을 관리하는데 사용할 프로그램이고, **Git**을 설치하면서 함께 설치되는 **Git Bash**는 자신의 컴퓨터에서 작성한 포스트나 수정한 정보를 온라인 공간에 업데이트 하기 위해 사용한다. 

>블로그를 관리하고 업데이트하는 과정은 아래 그림과 같이 <span style="color:#045FB4"><b>VS Code</b></span> 상에서 관련 파일을 작성한 뒤, <span style="color:#0A2229"><b>Git Bash</b></span>에 아래 코드를 입력하여 해당 정보를 반영하는 두 단계로 진행된다.

![visual-code-image]({{ site.url }}{{ site.baseurl }}/assets/images/vs-code-post-example.png)

```yaml
# Update page (repository) info
git add *
git commit -m "blog-testing"
git push
```

### 1.2 Git 개념 이해하기 (권장)

본인이 컴퓨터 공학과 관련된 일을 하거나 공부를하고 있다면 **`git`을 공부하고 반드시 사용하도록 하자.** 필자의 경우 전자공학을 전공했고, 임베디드 시스템 프로그래밍을 주로 했었기 때문에 `git`의 필요성을 느끼지 못했었는데, 이번에 블로그 구축을 시작하면서 `git`이 얼마나 유용한 시스템인지 새삼 깨닫게 되었다. 

본인이 `git`에 대해 아예 모른다면 다음의 YouTube 영상 시청을 권장한다.

**[Git & GitHub Page 블로그 만들기](https://www.youtube.com/watch?v=YQat_D1C-ps)** 

전체 영상이 네 개밖에 되지 않고, 개인적으로는 상당히 유익한 강의라고 생각한다. 보면서 한 번에 이해해도 좋겠지만, `git`이란게 이런거구나 하는 정도로만 이해할 수 있어도 충분할 것 같다.

**Notice:** 본인이 프로그래머가 아니거나, 블로그 운영에만 관심이 있다면 굳이 시청하지 않으셔도 됩니다.
{: .notice}

