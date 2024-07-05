---
title: Conditionals and Loops(조건문과 루프)
date: 2024-07-05
categories: python-basic
---

<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Python 학습</title>
    <style>
      /* 기존 CSS 스타일과 추가된 스타일 */
      input[type="text"] {
        width: 150px;
        border: 1px solid black;
      }
      .result {
        margin-top: 20px;
      }
     
    </style>

  </head>
  <body>
    <h1>조건문과 루프</h1>

    <h2>조건문</h2>
    <ul>
      <li>- 조건에 따라 특정한 동작을 하게하는 명령어</li>
      <li>
        - 조건문은 조건을 나타내는 <input type="text" data-answer="기준" />과
        실행해야 할 <input type="text" data-answer="명령" />으로 구성됨
      </li>
      <li>
        - 파이썬은 조건문으로 <input type="text" data-answer="if" />,
        <input type="text" data-answer="else" />,
        <input type="text" data-answer="elif" /> 등의 예약어를 사용함
      </li>
    </ul>

    <h3>if-else문 문법</h3>
    <ul>
      <li>- 조건 일치시 수행 명령 <input type="text" data-answer="block" /></li>
      <li>- 조건 불일치시 수행 명령 block</li>
    </ul>

<div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
# 비교 연산자

    x < y
    x > y
    x == y
    x <input type="text" data-answer="is" /> y : 메모리의 주소를 비교
    x != y
    x is not y
    x >= y
    x <= y
</code>
</pre> 
</div> 
</div>


    <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
boolean_list = [True, False, True, False, True]

    all(boolean_list) 
    # False

    any(boolean_list)
    # True
</code>
</pre> 
</div> 
</div>


    <h3>삼항 연산자(Ternary operators)</h3>
    <ul>
      <li>- 조건문을 사용하여 참일 경우와 거짓일 경우의 결과를 한줄에 표현</li>
    </ul>

   <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
 >>> value = 12
    >>> is_even = True if value % 2 == 0 else False
    >>> print(is_even)
    # True
</code>
</pre> 
</div> 
</div>


    <h2>Loop</h2>
    <ul>
      <li>- 정해진 동작을 반복적으로 수행하게 하는 명령문</li>
      <li>- 반복 시작 조건</li>
      <li>- <input type="text" data-answer="종료 조건" /></li>
      <li>- 수행 명령</li>
      <li>
        - <input type="text" data-answer="for" />,
        <input type="text" data-answer="while" />
      </li>
    </ul>

    <h3>for loop</h3>
    <ul>
      <li>- <input type="text" data-answer="range()" /> 사용하기</li>
    </ul>

    <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
for looper in [1, 2, 3, 4, 5]:
        print("hello")
    for looper in range(0, 5):
        print("hello")
</code>
</pre> 
</div> 
</div>


    <ul>
      <li>- 왜 range(1, 5)가 아닌 range(0, 5)인가?</li>
      <li>- range()는 마지막 숫자 바로 앞까지 리스트를 만들어줌</li>
      <li>- range(1, 5) = [1, 2, 3, 4]까지라는 의미</li>
      <li>- range(0, 5) = range(5)</li>
    </ul>

    <h4>간격을 두고 세기</h4>

    <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
for i in range(1, 10, 2):
        # 1부터 10까지 2씩 증가시키면서 반복문 수행
</code>
</pre> 
</div> 
</div>


    <h4>역순으로 반복문 수행</h4>

    <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
for i in range(10, 1, -1):
        # 10부터 1까지 -1씩 감소시키면서 반복문 수행
</code>
</pre> 
</div> 
</div>


    <h3>while문</h3>
    <ul>
      <li>- <strong>조건이 만족하는 동안</strong> 반복 명령문을 수행</li>
      <li>
        - 반복의 제어 - <input type="text" data-answer="break" />,
        <input type="text" data-answer="continue" />, else
      </li>
      <li>- break : 특정 조건에서 반복 종료</li>
    </ul>

   <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
for i in range(10):
        if i == 5: break
        print(i)
    print("EOP")
</code>
</pre> 
</div> 
</div>


    <ul>
      <li>- continue : 특정 조건에서 남은 반복 명령 skip</li>
    </ul>

   <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
for i in range(10):
        if i == 5: continue
        print(i)
    print("EOP")
</code>
</pre> 
</div> 
</div>


    <ul>
      <li>- else : 반복 조건이 만족하지 않을 경우 반복 종료 시 1회 수행</li>
    </ul>

    <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
for i in range(10):
        print(i,)
    else:
        print("EOP")
</code>
</pre> 
</div> 
</div>


    <h2>loop & control lab</h2>
    <ul>
      <li>- 가변적인 중첩 반복문(variable nested loops)</li>
    </ul>

    <h2>debugging</h2>
    <ul>
      <li>- 코드의 오류를 발견하여 수정하는 과정</li>
      <li>- 오류의 '원인을 알고 '해결책'을 찾아야 함</li>
      <li>- <strong>문법적 에러</strong>를 찾기 위한 에러 메시지 분석</li>
      <li>- <strong>논리적 에러</strong>를 찾기 위한 테스트도 중요</li>
    </ul>

   <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
- IndentationError : <input type="text" data-answer="들여쓰기 오류" />
    - NameError : <input type="text" data-answer="오탈자" />
</code>
</pre> 
</div> 
</div>


   <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
File "test.py, line 1 # 몇번째 줄에
     test = float(input())
     ^  # 이 부분에 에러가 있어요
    IndentationError : unexpected indent # 이런 문제가 있네요
</code>
</pre> 
</div> 
</div>


    <ul>
      <li>- 논리적 에러 : print()를 찍어보며 확인하기</li>
    </ul>

    <div class="language-plaintext highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
if __name__ == '__main__':
        main()
        # 특수한 언더바 두개
</code>
</pre> 
</div> 
</div>


    <button onclick="checkAnswers()">제출</button>
    <p id="result"></p>

    <script>
      function normalizeText(text) {
        return text.trim().toLowerCase().replace(/\s+/g, "");
      }

      function checkAnswers() {
        const inputs = document.querySelectorAll('input[type="text"]');
        let correct = 0;
        let total = inputs.length;

        inputs.forEach((input) => {
          const userAnswer = normalizeText(input.value);
          const correctAnswers = input.dataset.answer
            .split("|")
            .map(normalizeText);
          if (correctAnswers.includes(userAnswer)) {
            input.style.backgroundColor = "lightgreen";
            correct++;
          } else {
            input.style.backgroundColor = "lightcoral";
          }
        });

        document.getElementById(
          "result"
        ).textContent = `총 ${total} 문제 중 ${correct}개 맞았습니다.`;
      }
    </script>
  </body>
</html>
