---
title: Organizing Knowledge
key: 20181011
tags: knowledge management kmm
excerpt: "지식 관리"
toc: true
toc_sticky: true
---

# summaries

분산되어 저장된 지식을 통합하여 관리하고 코드 기반의 Knowledge 관리를 한다.

<!-- more -->

# Intro

보통 아이디어를 떠올리고 구현하는 절차는 아래와 같다. 단 `3번` 항목의 경우 제외 될 수 있다. 기반 Framework 를 구성하지 않은 상태에서 코드를 테스트하는 경우가 그것이다.

1. 아이디어 착상 (Conceive an idea)
2. 개념 코드 작성 (Proof of Concept)
3. 반영 (Deployment)

# 아이디어 착성

아이디어의 형태를 미리 정의하는 것은 의미가 없다. 그러나 여러 아이디어를 한순간에 쏟아 내기보다는 꾸준히 누적하는 것이 중요함은 당연한 사실이다. (*노트가 왜 중요한 가?*)

때로는 이 아이디어는 시스템에 종속되고 개발 언어에 종속된다. 시간이 많이 걸릴 때도 있고 버려야 할 때도 있다. 그렇기에 정의할 수 없거나 종속되는 요인으로 인해 구현이 어려운 경우 이를 버리기도 한다.

하지만 추상적인 사고는 그 자체로 중요한 정신적 활동이다. 물리적인 기반이 어렵다고 해서 사고가 발전하지 않는 것은 아니다. (*아인슈타인의 사례 참고*)

따라서 아이디어를 논리적인 방법으로 기술하여 그 전개의 모순이 없음을 사유하는 것은 고도의 정신적 활동이라고 볼 수 있다. 모든 것이 확인되지 않았으나 각종 정보를 참조하여 모든 단계를 물리적으로 구현하지 않은 상태에서 개념적으로 이해하고 새로운 개념을 구축하는 것이 IT 에서 가장 중요한 요소이지 않은가 생각한다.

# 개념 코드 작성

개념 코드를 작성하는 것은 그 기반이 되는 물리적 환경의 문맥을 이해하고 통제할 수 있음이다. 그러나 그 환경 자체를 git 에 모두 저장할 수 없다. 이 때 `Docker` 가 간절해 진다. 즉각적으로 환경을 셋업할 수 있도록 Docker 설정 파일을 갖추고 개념 코드를 작성한다. 그리고 Framework 별 개발 언어 별로 `git repository` 를 관리한다.

이때 README 파일은 `banner` 와 같다. 좋은 요약이 될 수 있으며 즉시 내용을 파악할 수 있다. (*이는 그 글이 자신이 쓴 글일 때만 가능하다.*)


# 지식 관리 규칙

1. 아이디어를 최대한 자세히 기록한다.

필기, 구글 독스 등 무엇이든 가능하다. 최대한 착상된 아이디어를 구체적으로 기술한다. 그리고 한 곳에 보존해 둔다.

2. 기술 요소 도해

- 필요한 언어 (python, javascript, c++)
- 필요한 알고리즘
- 필요한 프레임워크
- 기존 지식 활용 여부
  - 신규 학습의 비용과 아이디어 구현의 효과를 고려 시 중요
- 성과 예측
  - 아이디어를 구현하였을 때 성과가 예측 가능해야 하며 이를 통해 투자(시간) 여부를 결정할 수 있다.
  - 지식 근로자에게 시간은 매우 중요한 자원임을 명심

3. 코드 작성

간편하게 활용 가능한 수준으로 코드를 작성한다. 단, 활용성을 고려하여 작성한다. (*Go 언어의 모듈 임포트 과정에 주목하라*)

4. 적용

특정 프레임워크 위에 코드를 적용한다. 라이브러리/유틸 등의 분류로 등록되거나 비즈니스 로직으로 사용될 것이다. 중요한 것은 지나친 욕심을 부리지 않는 것이다. 조금의 수정을 기뻐해라 그리고 이를 참조한 개념 코드에 변경을 반영해라

- 실제 코드에 적용
- 지나친 욕심은 금물
  - 수정을 1도 하지 않고 적용하는 것은 오만이다.
  - 조금의 수정을 할 수 있는 여지에 감사하라.
- **수정하였다면 개념 코드에도 반영해라**

# 실제 삶에 적용하기

현재 본인은 `보안 의식 제고 (raising security awareness)` 를 충족하기 위한 프로젝트를 진행 중이다. SPA (Single Page Application) 에 관심이 많아 `Reactjs` 를 활용하여 위지윅 방식의 교육 어플리케이션을 제작할 계획이다. 이미 해당 프로젝트를 `C#`, `WPF`, `Prism` 기반으로 구축하여 현 회사에 배포 및 사용 중이다. 그러나 접근성을 강화하기 위한 방법을 모색하던 중 웹 기반으로 전향을 생각하였다.

이미 PHP를 기반으로 한 코딩에 익숙해 있지만 구조화된 프로그래밍에 특화된 React 를 기반으로 하는 것이 추후 소스코드 관리 및 신규 기술에 대한 적응성을 기르는데 좋을 것으로 판단했다.

구현을 위해서 `reactjs`, `redux`, `es6`, `webpack` 등을 공부해야 한다. 시간적인 요소는 1~2달 정도 소요될 것으로 예상된다. (*실제로 C#, wpf, Prism framework 를 학습하는데 2달 정도 소요됨*)

구현시 효과는 다음과 같이 예상된다.

- 임직원 들의 보안 서비스 접근성 확대
- 추가 서비스 적용 가능
  - 취약점 관리 기능 (관리자 용도)
  - 자산 관리 기능 (관리자 용도)
  - 관리적 보안 프로세스 효율화(관리자 용도)
  - 등등
- 보안 인식 재고 어플리케이션 기능
  - 멀티미디어 학습
  - 반응형 문제 풀이
    - 올바른 정답 드래그 앤 드랍
    - 선다형 문제 풀이
    - 주관식 문제 풀이
    - 그림 맞추기
  - 가독성 높은 텍스트 제시
  - 학습 기록 관리
  - Push 메시지
  - 사용자 별 게시판 기능
- 솔루션 제작 여부
  - Make money!

위의 요구사항 나열 과정을 통해 필요한 요건을 추출 할 수 있다.

- 기능 추가가 용이하도록 구성
  - 1단,2단 메뉴 기반의 기능 추가가 용이
    - 변화하는 기능 변화에 대응
- 서버 어플리케이션 지정
  - django 기반
- 클라이언트 어플리케이션
  - Menu 기반 구성
    - React Routing
    - Layout 디자인
      - 다양한 Layout 구조를 지정
    - 다국어 지원
      - boilerplate 에 보면 다국어를 지원하는 구조가 있다.
  - 컴포넌트 개발
    - Dumb, Smart 컴포넌트를 적절히 사용하여 단위 기능 컴포넌트를 개발한다.
    - 프로젝트 디렉터리 구조 관리가 중요한데 시뮬레이션이 필요하다.
  - 위지윅 방식의 문제 풀이 서비스 구현
    - 단위 코드를 작성하여 예상한 결과가 구현될 수 있는지 확인한다.
- 오픈소스 프로젝트 찾아보기
  - react 를 기반으로 원하는 기능을 개발하여 공개했다면 조금의 수정으로 구현할 수 있다.
- django server side rendering
  - 장고를 기반으로 server side rendering 을 할 수 있다고 한다. 방법을 정리해 둔다.
- push 기능 관리
  - chrome 의 알림 기능을 활용하여 push 받을 수 있도록 한다.
    - [integrating push notifications in your node react web app][1]
    - [React PWA (Progressive Web Application) Guide App][2]
    - [Code Lab Push Notifications][3]


<!-- References Link -->
[1]: https://medium.com/@jasminejacquelin/integrating-push-notifications-in-your-node-react-web-app-4e8d8190a52c "integrating push notifications in your node react web app"
[2]: https://github.com/codebusking/react-pwa-guide-app "react-pwa-guide-app"
[3]: https://developers.google.com/web/fundamentals/codelabs/push-notifications/ "Code Lab Push Notifications in google Developers"

<!-- Images Reference Links -->

<!--
When you use image link just put it on the document.

![kibana 모니터링 화면][kibana-monitoring]

This is sample code to embed an image in markdown document.s
[kibana-monitoring]: /assets/img/2018-10-02-Setup-ElasticSearch-and-Kibana/kibana-cluster-overview.png
-->

<!-- End of Documents -->

If you like the post, don't forget to give me a star :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=code-machina&repo=code-machina.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
