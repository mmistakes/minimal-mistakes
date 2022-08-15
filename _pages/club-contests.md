---
permalink: /club-contests/
title: "동아리 대회"
excerpt: "KPSC 동아리 대회"
toc: true
---

[동아리 대회 Repository](https://github.com/KMUCS-KPSC/Welcome-Contest)

## 개요

KPSC 동아리에서 개최하는 알고리즘 경시 대회입니다. 신입 부원 환영 및 모집을 위한 대회를 개최하거나 각자의 실력을 겨루기 위한 대회를 개최합니다.

## 규칙

- 각 팀은 문제 풀이 결과에 따라 해결한 문제 수와 페널티라는 점수를 가집니다.
- 각 팀의 페널티는 해결한 문제들에 대해 아래 식으로 얻어진 개별 페널티의 총합입니다.
  - (처음으로 정답 판정을 받은 소스의 제출 시각 − 대회 시작시각) + (정답 판정을 받기 전에 제출한 오답 소스 제출 횟수) × 20
- 순위는 아래 조건을 순차적으로 적용해 상위에 있는 조건을 먼저 만족한 팀이 더 높은 순위를 가집니다.
  - 해결한 문제 수가 더 많은 팀
  - 페널티의 총합이 더 적은 팀
  - 마지막으로 정답 판정을 받은 소스의 제출시각이 더 빠른 팀

## 사용 가능 언어

- C (C11)
- C++ (C++14)
- Java (OpenJDK 11.0.5)

## 답안 제출 주의사항

- ICPC와 같이 언어별 추가 시간과 추가 메모리는 제공되지 않습니다.
- 각 문제는 동일한 사양의 여러 컴퓨터중 하나에서 여러 testcase를 사용하여 채점됩니다.
- 채점결과
  - No – Compiler-Error: 정상적으로 컴파일되지 않았음
  - No – Run-Error: 컴파일되고 실행되었으나, 실행도중에 비정상적으로 종료됨
  - No – Time-limit Exceeded: 특정 테스트 케이스에 대해 주어진 제한시간 안에 정상적으로 종료되지 않음
  - No – No Output: 실행 중 어떤 값도 출력하지 않았음
  - No – Too-Late: 대회가 끝나고 제출을 하였음
  - No – Wrong Answer: 컴파일되고 실행되어 특정 테스트 케이스에 대해 제한시간 안에 종료되었으나, 옳은 답을 출력하지 않았음
  - Correct: 정답
- 프로그램은 단일 쓰레드만을 사용해야 하며, 표준 입출력(Standard input/output)을 제외한 파일 I/O, 네트워킹 등의 system call은 사용할 수 없습니다.
- 프로그램은 정답을 표준 출력(standard output)에 출력한 뒤, 정상적으로 프로세스가 종료되어야 합니다. 이는 return code가 0 이어야 함을 의미합니다. 이외의 exit code는 Runtime Error로 간주됩니다.
- 채점과 대회 진행을 고의적으로 방해하는 프로그램을 제출하는 경우에는 실격될 수 있습니다.

## 주의사항

- 팀원이 아닌 사람과 대회 문제에 대해 어떤 형태로든 커뮤니케이션하는 것은 부정행위입니다. 적발되는 경우에는 실격되며 일정기간동안 대회 참가가 제한됩니다.
- 같은 팀원이 아닌 사람에게 대회용 계정의 정보를 공유해서는 안 됩니다. 적발되는 경우에는 실격되며 일정기간동안 대회 참가가 제한됩니다.
- 대회가 종료된 후, 소스코드 표절검사가 진행됩니다. 표절이 발견된 경우 관련 팀들은 실격되며 일정기간동안 대회 참가가 제한됩니다.
- **사전 안내에 따라** 대회 중에는 프로그래밍 언어별 공식 Reference Site 와 대회 홈페이지를 제외한 웹사이트 및 인터넷 사용은 일체 허용되지 않을 수 있습니다.
- **사전 안내에 따라** 사용할 컴퓨터에 미리 프로그램 작성에 사용할 수 있는 함수, 라이브러리, 예제 코드를 저장해서는 안될 수 있습니다.
- 기타 명시되지 않은 사항은 운영진의 판단에 따라 결정할 수 있습니다.

## 역대 대회

### 2021

- KPSC 2021-1 Welcome Contest

  - 시간: 4/3(토) 9시 0분 ~ 4/4(일) 9시 0분 (24시간)
  - 장소: 온라인
  - 출제자: [박정현](https://www.acmicpc.net/user/pjh9996), [윤상건](https://www.acmicpc.net/user/ggj06281), [장병준](https://www.acmicpc.net/user/sunjbs98), [허준영](https://www.acmicpc.net/user/jyheo98)
  - [대회 결과](https://github.com/KMUCS-KPSC/Welcome-Contest#KPSC-2021-1-환영대회)
  - [에디토리얼](https://github.com/KMUCS-KPSC/Welcome-Contest/blob/master/Editorial/KPSC%202021-1%20환영대회%20에디토리얼.md)
  - 1등: [윤웅배](https://www.acmicpc.net/user/devbelly)

- KPSC 2021-2 Welcome Contest
  - 시간: 09/18(토) 13시 0분 ~ 09/19(일) 13시 0분(24시간)
  - 장소: 온라인
  - 출제자: [박정현](https://www.acmicpc.net/user/pjh9996), [윤상건](https://www.acmicpc.net/user/ggj06281)
  - [대회 결과](https://github.com/KMUCS-KPSC/Welcome-Contest#KPSC-2021-2-환영대회)
  - [에디토리얼](https://github.com/KMUCS-KPSC/Welcome-Contest/blob/master/Editorial/KPSC%202021-2%20환영대회%20에디토리얼.md)
  - 1등: [손강민](https://www.acmicpc.net/user/gangminson)

### 2020

- KPSC 2020-1 Welcome Contest

  - 시간: 3/28(토) 0시 0분 ~ 4/3(금) 23시 59분(7일간)
  - 장소: 온라인
  - 출제자: [박정현](https://www.acmicpc.net/user/pjh9996), [윤상건](https://www.acmicpc.net/user/ggj06281)
  - [대회 결과](https://github.com/KMUCS-KPSC/Welcome-Contest#KPSC-2020-1-환영대회)
  - [에디토리얼](https://github.com/KMUCS-KPSC/Welcome-Contest/blob/master/Editorial/KPSC%202020-1%20환영대회%20에디토리얼.md)
  - 1등: [장병준](https://www.acmicpc.net/user/sunjbs98)

- KPSC 2020-2 Welcome Contest
  - 시간: 9/19(토) 9시 0분 ~ 9/20(일) 9시 0분 (24시간)
  - 장소: 온라인
  - 출제자: [박정현](https://www.acmicpc.net/user/pjh9996), [윤상건](https://www.acmicpc.net/user/ggj06281), [장병준](https://www.acmicpc.net/user/sunjbs98), [서형빈](https://www.acmicpc.net/user/antifly55), [허준영](https://www.acmicpc.net/user/jyheo98)
  - [대회 결과](https://github.com/KMUCS-KPSC/Welcome-Contest#KPSC-2020-2-환영대회)
  - [에디토리얼](https://github.com/KMUCS-KPSC/Welcome-Contest/blob/master/Editorial/KPSC%202020-2%20환영대회%20에디토리얼.md)
  - 1등: [김상홍](https://www.acmicpc.net/user/bconfiden2)
  - Open Contest 1등: [한창훈](https://www.acmicpc.net/user/noye)
