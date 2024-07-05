---
title: Python 기본 문법 - Function and Console I/O(복습용)
date: 2024-07-05
categories: python-basic
---

<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Python 학습</title>
    <style>
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
    <h1>Function and Console I/O</h1>

    <h2>Function</h2>
    <p>
      - <input type="text" data-answer="어떤 일을 수행하는 코드의 덩어리" />
    </p>
    <ul>
      <li>- 반복적인 수행을 1회만 작성 후 호출</li>
      <li>- 코드를 <input type="text" data-answer="논리적인 단위" />로 분리</li>
      <li>
        - <input type="text" data-answer="캡슐화" /> : 인터페이스만 알면 타인의
        코드 사용
      </li>
    </ul>

    <pre>
    def <input type="text" data-answer="함수 이름" /> (<input type="text" data-answer="parameter|파라미터" />, ...):
        <input type="text" data-answer="수행문" /> #1(statements)
        return <input type="text" data-answer="반환값|리턴값" />
    </pre>

    <h3>함수의 수행 순서</h3>
    <ul>
      <li>- <input type="text" data-answer="def" />를 메모리에 올려놓음</li>
      <li>- 프로그램의 함수와 수학의 함수는 유사함</li>
      <li>- 모두 입력 값과 출력 값으로 이루어짐</li>
      <li>
        - <input type="text" data-answer="parameter" /> : 함수의 입력값
        인터페이스
      </li>
      <li>
        - <input type="text" data-answer="argument" /> : 실제 Parameter에 대입된
        값
      </li>
    </ul>

    <pre>
    def f(<input type="text" data-answer="x" />): <- x가 <input type="text" data-answer="parameter" />

    &gt;&gt;&gt;print(f(<input type="text" data-answer="2" />)) <- 2가 <input type="text" data-answer="argument" />
    </pre>

    <hr />

    <h2>console in/out</h2>
    <p>
      : 어떻게 프로그램과 데이터를 주고(<input
        type="text"
        data-answer="input"
      />) 받을(<input type="text" data-answer="print" />) 것인가?
    </p>
    <ul>
      <li>
        - <input type="text" data-answer="input()" /> : 문자열을 입력 받는 함수
      </li>
    </ul>

    <h3>Print Formatting</h3>
    <ol>
      <li>%<input type="text" data-answer="string" />(퍼센트 스트링)</li>
      <li><input type="text" data-answer="format" /> 함수</li>
      <li><input type="text" data-answer="fstring" /></li>
    </ol>

    <h4>%string과 str.format()</h4>
    <ul>
      <li>%string</li>
    </ul>

    <pre>
    print('%s %s % ('one', 'two'))
    - %<input type="text" data-answer="s" /> : string
    - %<input type="text" data-answer="d" /> : digit

    print('<input type="text" data-answer="{}" /> <input type="text" data-answer="{}" />'.format(1,2))
    </pre>

    <ul>
      <li>
        - <input type="text" data-answer='"%datatype%"(variable)' /> 형태로 출력
        양식을 표현
      </li>
    </ul>

    <pre>
    print("I eat <input type="text" data-answer="%d" /> apples."% 3)
    print("Product: <input type="text" data-answer="%s" />, Price per unit: <input type="text" data-answer="%f" />." % ("Apple", 5.243))
    print("Product: %s, Price per unit: %8.2f." % ("Apple", 5.243))
    <input type="text" data-answer="%8.2f" /> : 8자리로 출력, 소수점 아래 2자리만 출력
      %<input type="text" data-answer="10s" /> : 10자리 문자열 출력
    </pre>

    <ul>
      <li>- str.<input type="text" data-answer="format" />()</li>
    </ul>

    <pre>
    print("My name is {0}. I'm {1} years.old.".format(<input type="text" data-answer="name" />, <input type="text" data-answer="age" />))
      {0}, {1} : 인덱스
    print("My name is {0}. I'm {1:10.5f} years.old.".format(name, age))
    <input type="text" data-answer="{1:10.5f}" /> : 10자리로 출력, 소수점 아래 5자리까지 출력
    {0:<input type="text" data-answer="<10s" />} : 왼쪽 정렬
    {0:>10s} : 오른쪽 정렬
    </pre>

    <ul>
      <li>- padding</li>
      <li>
        {1:<input type="text" data-answer="10.5f" />} : 10자리로 출력, 소수점
        아래 5자리까지 출력
      </li>
      <li>{0:<input type="text" data-answer="<10s" />} : 왼쪽 정렬</li>
      <li>{0:>10s} : 오른쪽 정렬</li>
    </ul>

    <ul>
      <li>- naming</li>
    </ul>

    <pre>
    print("Product : %(name)10s, Price per unit: %(price)10.5f"% {"name":"Apple", "price":5.243})
    print("Product : {name:10s}, Price per unit: {price:10.5f}.".format(name="Apple", price=5.243))
    </pre>

    <hr />

    <h4>f-string</h4>

    <pre>
    print(f"Hello, {<input type="text" data-answer="name" />} . You are {age}.")
    print(f"{name:<input type="text" data-answer="20" />} ) : 기본이 왼쪽 정렬, 20자리 출력
    print(f"{name:>20}) : 오른쪽 정렬
    print(f"{name:<input type="text" data-answer="*<20" />}) : 왼쪽 정렬에 빈 공간을 *로 채움
    print(f"{name:<input type="text" data-answer="*>20" />}) : 오른쪽 정렬에 빈 공간을 *로 채움
    print(f"{name:<input type="text" data-answer="*^20" />}) : 가운데 정렬에 빈 공간을 *로 채움
    print(f"{number:<input type="text" data-answer=".2f" />}") : 소수점 아래 2자리
    </pre>

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
