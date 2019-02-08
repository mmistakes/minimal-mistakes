---
layout: post
title:  "Jupyter Notebook 테마 꾸미기"
subtitle: "jupyter-themes 모듈을 이용한 간편 테마 설정"
author: "코마"
date:   2019-02-08 03:00:00 +0900
categories: [ "jupyter", "notebook", "themes"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마** 입니다. 오늘은 Jupyter Notebook 의 테마를 꾸며보도록 하겠습니다. 
<!--more-->

# 개요

이번에 소개해 드릴 내용은 `jupyter-themes` 인데요. 저 **코마**는 미리 테마들을 살펴볼 수 있도록 스크린샷을 올려 놓았습니다.

## 설치

보통 Jupyter Notebook 을 사용하시는 분들은 Anaconda 환경을 사용하시는 분들이라고 생각합니다. 따라서, 설치 설명은 Windows Anaconda 설치를 전제로 하겠습니다. 우선 아래의 커맨드를 입력하여 Anaconda Prompt 를 실행합니다. 그리고 프롬프트를 확인 후에 아래의 명령어를 드래그 복사 후 붙여넣습니다.

- Win-Key > Anaconda > Anaconda Prompt 

```bash
pip install jupyterthemes
```

## 적용 가능한 테마 

Jupyter Themes 모듈은 아래의 테마를 지원합니다. 그리고 아래와 같이 명령어를 입력할 경우 간편하게 테마를 변경할 수 있습니다. 물론 폰트도 변경할 수 있으니 조금 더 읽어주세요.

- chesterish
- grade3
- gruvboxd
- gruvboxl
- monokai
- oceans16
- onedork
- solarizedd
- solarizedl

```bash
jt -l # 사용 가능한 테마 목록을 출력
jt -t chesterish # chesterish 테마로 변경합니다.
```

## 테마 적용 화면 

테마 목록을 정리해보았습니다. 마음에 드는 색의 조합을 선택한 뒤에 세부 설정을 조작하는 것을 추천드립니다.

### Default 테마

여러분에 친숙한 기본 테마입니다.

![테마-1](/assets/img/2019/02/default-theme.png)

### Chesterish 테마

전체적으로 어두운 테마입니다.

![테마-1](/assets/img/2019/02/chesterish-theme.png)

![테마-1](/assets/img/2019/02/chesterish-theme-2.png)

### Grade3 테마

밝은 분위기의 테마입니다.

![테마-1](/assets/img/2019/02/grade3-theme.png)


### Gruvboxd 테마

어두운 테마의 갈색 계열 색의 조합이 두드러집니다.

![테마-1](/assets/img/2019/02/gruvboxd-theme.png)


### Monaki 테마

우리에게 잘 알려진 Monaki 테마입니다. 프로그래밍을 하시는 분들이라면 한번씩은 해보셨을 만한 테마입니다.

![테마-1](/assets/img/2019/02/monaki-theme.png)
![테마-1](/assets/img/2019/02/monaki-theme-2.png)

### Onedork 테마

![테마-1](/assets/img/2019/02/onedork-theme.png)
![테마-1](/assets/img/2019/02/onedork-theme-2.png)

## 결론

코마의 개인적인 취향을 말씀드리자면 roboto 폰트와 글자 크기 12pt 그리고 각 셀의 너비가 전체 화면의 80% 정도입니다. 요구사항에 맞추어 보니 대충 아래와 같이 명령 옵션이 설정되네요.
한번 설정하면 지속적으로 유지가 되며 default 테마로 변경하고자 하시는 분들은 `jt -r` 명령을 입력하시면 됩니다.

```bash
jt -t grade3 -f roboto -fs 12 -altp -tfs 12 -nfs 12 -cellw 80% -T -N
```

아래는 제가 사용하는 테마입니다. 기왕이면 밝은 톤이 좋겠죠?

![추천 테마-1](/assets/img/2019/02/reco-theme.png)

여기까지 **코마** 의 Jupyter Notebook 테마 소개였습니다. 다음에도 좋은 자료로 찾아뵙도록 하겠습니다. 아래의 링크는 jupyter-themes 모듈의 깃헙(github) 링크입니다. 구독해주셔서 감사합니다.

- [깃헙: jupyter-themes](https://github.com/dunovank/jupyter-themes)