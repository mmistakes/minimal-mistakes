---
layout: single
title: "Setting"
categories: Start
tag:
  [
    python,
    crawling,
    blog,
    github,
    image,
    엣지,
    edge,
    remove,
    delete,
    제거,
    파이썬,
    입문,
    기초,
    개발환경,
    세팅,
  ]
toc: true
sidebar:
  nav: "docs"
---

# Edge 삭제법

프로그램 추가/제거로도 삭제는 안되고
드문드문 등장해 거슬리게 하는 엣지를
삭제해보려고 합니다.

### 1. edge installer 폴더에 접근

C:\Program Files (x86)\Microsoft\Edge\Application\

다음 맨 위에 숫자폴더로 들어간 뒤 (필자는 96.0.1054.62, 환경마다 다름)
Installer 폴더에서 마우스 오른쪽 버튼을 클릭한 뒤
windows 터미널에서 열기를 합니다.

### 2. 터미널에서 아래 명령어 실행

setup.exe --uninstall --system-level --verbose-logging --force-uninstall
이러면 삭제가 끝납니다.
