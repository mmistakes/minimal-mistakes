---
published: true
title: "[Programmers] Lv.1 덧칠하기 (Python)"

categories: CodingTest
tag: [codingtest, programmers]

toc: true
toc_sticky: true

sidebar:
    nav: "docs"
    nav: "counts"

date: 2024-01-09
---
프로그래머스 Lv.1 덧칠하기


**[프로그래머스 데이터 분석 데브코스 2기](https://school.programmers.co.kr/learn/courses/20748/20748-2%EA%B8%B0-k-digital-training-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B6%84%EC%84%9D-%EB%8D%B0%EB%B8%8C%EC%BD%94%EC%8A%A4)** 를 지원 할 계획이다. 절차 중 코딩 테스트가 있는데 프로그래머스 연습문제 Lv.1 수준이라고해서 며칠 전부터 Lv.1 문제만 주구장창 풀고 있다.

<br>

# 문제

**[[Programmers] 덧칠하기](https://school.programmers.co.kr/learn/courses/30/lessons/161989)**

**[문제 설명]**

어느 학교에 페인트가 칠해진 길이가 n미터인 벽이 있습니다. 벽에 동아리 · 학회 홍보나 회사 채용 공고 포스터 등을 게시하기 위해 테이프로 붙였다가 철거할 때 떼는 일이 많고 그 과정에서 페인트가 벗겨지곤 합니다. 페인트가 벗겨진 벽이 보기 흉해져 학교는 벽에 페인트를 덧칠하기로 했습니다.

넓은 벽 전체에 페인트를 새로 칠하는 대신, 구역을 나누어 일부만 페인트를 새로 칠 함으로써 예산을 아끼려 합니다. 이를 위해 벽을 1미터 길이의 구역 n개로 나누고, 각 구역에 왼쪽부터 순서대로 1번부터 n번까지 번호를 붙였습니다. 그리고 페인트를 다시 칠해야 할 구역들을 정했습니다.

벽에 페인트를 칠하는 롤러의 길이는 m미터이고, 롤러로 벽에 페인트를 한 번 칠하는 규칙은 다음과 같습니다.

롤러가 벽에서 벗어나면 안 됩니다.
구역의 일부분만 포함되도록 칠하면 안 됩니다.
즉, 롤러의 좌우측 끝을 구역의 경계선 혹은 벽의 좌우측 끝부분에 맞춘 후 롤러를 위아래로 움직이면서 벽을 칠합니다. 현재 페인트를 칠하는 구역들을 완전히 칠한 후 벽에서 롤러를 떼며, 이를 벽을 한 번 칠했다고 정의합니다.

한 구역에 페인트를 여러 번 칠해도 되고 다시 칠해야 할 구역이 아닌 곳에 페인트를 칠해도 되지만 다시 칠하기로 정한 구역은 적어도 한 번 페인트칠을 해야 합니다. 예산을 아끼기 위해 다시 칠할 구역을 정했듯 마찬가지로 롤러로 페인트칠을 하는 횟수를 최소화하려고 합니다.

정수 n, m과 다시 페인트를 칠하기로 정한 구역들의 번호가 담긴 정수 배열 section이 매개변수로 주어질 때 롤러로 페인트칠해야 하는 최소 횟수를 return 하는 solution 함수를 작성해 주세요.

<br>

# 풀이

음.. 문제 이해가 어렵지 않았고 난이도도 그렇게 높아보이지 않았다.

머릿속에 처음 떠오른 방법은 n개의 구역 리스트를 1로 초기화하고 덧칠해야 할 구역인 section의 인덱스를 0으로 바꿔 준 다음, 리스트를 돌면서 section을 기준으로 앞뒤로 m//2 만큼 더해주면 되지 않을까? 였다.

## 첫번째 Code

```python
def solution(n, m, section):
    
    paint = [1] * n
    roller = 0
    for i in section:
        paint[i-1] = 0
    
    for i in range(len(paint)):
        if paint[i] == 0:
            start = max(0, i - (m//2)) # 덧칠 시작점
            end = min(n, i + (m//2) + 1) #    끝점
            paint[start: end] = [1] * (end - start)
            roller += 1
    
    return roller
```

입출력예시 #1을 돌려봤는데 결과 나오길래 아싸 했는데 ㅋㅋㅋ

정확성 테스트 실패했다.

![aa](https://github.com/leejongseok1/algorithm/assets/79849878/b347792a-8440-4825-992e-08fbfc33c9e6)


결국 살짝의 구글링을 빌렸다. 초반에 코딩 테스트를 공부 할 때는 정해진 시간동안 혼자 생각하며 풀어본 다음, 안되면 풀이를 보면서 해보는 것이 아주 도움된다고 세미나(?)에서 들었다. 

## 정답 Code

```python
def solution(n, m, section):
    roller = 1 # 롤러 횟수
    paint = section[0] # 덧칠 시작점
    for i in range(1, len(section)):
        if section[i] - paint >= m:
            roller += 1
            paint = section[i]
    
    return  roller
```

`section[0]`을 `paint` 변수로 저장한 접근이 신기했다.

이후 for문을 통해 `paint`와 `section[i]`의 간격을 구했다.

(입출력 예시#1) 롤러의 길이`m`가 4라면 1,2,3,4를 롤러 1번으로 칠할 수 있으므로 1번의 덧칠로 가능한 범위는 `4-1=3`이고 즉 `m-1`이다.

m-1까지는 한 번의 덧칠로 가능하므로 m부터는 두 번의 덧칠이 필요한 것이다.

그래서 `section[i]-paint`가 `m`이상이면 roller 횟수를 1 더해주면 된다.

한 번의 loop가 끝나고 다음 칠할 구간을 찾기 위해서 section[i]를 다시 paint 시작점으로 바꾸고 범위를 찾는 과정을 반복하는 것이 위 코드의 for문이다.

for문은 `section`과 `paint`간의 간격이 m보다 크거나 같을 때 까지 반복한다.

![이미지](https://github.com/leejongseok1/algorithm/assets/79849878/7e582e4a-eb51-458c-b62e-3007d262f7cf)

위는 for문 돌 때 마다 `section`과 `paint`인데.. 올리려고 한 게 아니고

그냥 혼자 이해를 돕기 위해서 끄적인 거라 글씨가 영 보기 좋지 않지만 그냥 올려둔다!