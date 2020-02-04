---
layout: post
title: "ToSee Analyzer(취약점 진단 도구)"
excerpt_separator: "<!--more-->"
date : 2019-11-23 11:45:35 +0100
categories:
  - ToSee
tags:
  - ToSee
  - 취약점진단
---
### 자산에 대한 정보 분석
  * 운영체제정보 분석 - 운영체제별 버젼, 설치일자, 최근부팅일자,  사용자, 설치폴더, 도메인명, UUID
  * 하드웨어 정보 분석 - CPU 정보 및 CPU 시리얼넘버, 메인보드 시리얼넘버, 맥어드레스, 메모리
  * 고유정보를 통한 자산의 관리 - CPU 시리얼, 메인보드시리얼, 맥어드레스, UUID등을 통하여 자산정보 추적관리
  ![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/analyzer/main.png){: .center}


### 취약점 진단
  * 기본 16가지항목진단 및 커스터마이징을 통하여 고급공유정보 및 추가적인 보안정책진단.
  * 계정관리 - 사용자 패스워드 및 정책진단
  * 파일시스템 - 공유폴더 및 파일시스템,  메신져서비스와 불필요한 서비스 진단
  * 패치관리 - 윈도우즈 HOTFIX 및 서비스팩 진단
  * 보안관리 - 백신, 방화벽 및 일부 보안정책진단
  * 취약점 진단결과를 점수로 환산하여 표시
  * 발견된 취약점에 대해서 즉시 조치 가능한 취약점 조치 기능 제공
  ![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/analyzer/result.png){: .center}
  ![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/analyzer/result_1.png){: .center}

### USB 사용 내역 진단
  * USB 저장장치 최초 연결 및 최근 연결시간 진단
  * USB 장치 정보 확인
  ![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/analyzer/usb.png){: .center}

### 이벤트로그 분석
  * System Event Log에 한하여 에러로그 확인
  * 이벤트코드를 통한 해당 에러에 대한 대책 안내(지속적인 업데이트 예정)
  ![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/analyzer/event.png){: .center}