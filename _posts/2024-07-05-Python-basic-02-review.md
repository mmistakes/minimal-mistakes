---
title: Python 기본 문법 - variable, list, operations(복습용)
date: 2024-07-05
categories: python-basic
related_posts:
  - "2024-07-05-Python-basic-02.md"
---

<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>파이썬 기초 문법 2</title>
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
    <h1>파이썬 기초 문법 1</h1>

    <h2>Variable & List</h2>
    <p>variable & memory</p>
    <p>
      <input type="text" data-answer="데이터(값)" />을 저장하기 위한
      <input type="text" data-answer="메모리 공간" />의 프로그래밍상 이름
    </p>
    <p>
      professor = "Sungchul Choi"의 의미는 "professor에 Sungchul Choi를 넣어라"
    </p>
    <ul>
      <li>
        professor라는 변수에 "Sungchul Choi"라는 값을 넣으라는 의미
      </li>
      <li>
        변수는 <input type="text" data-answer="메모리 주소" />를 가지고 있고
        변수에 들어가는 값은 <input type="text" data-answer="메모리 주소" />에
        할당됨
      </li>
      <li>
        a = 8의 의미는 "<input type="text" data-answer="a는 8이다" />"가 아닌
        <input type="text" data-answer="a라는 이름을 가진 메모리 주소" />에 8을
        저장하라임
      </li>
    </ul>
    <hr />

    <h2>basic operations</h2>
    <ol>
      <li>기본 자료형(primitive data type)</li>
      <li>연산자와 피연산자</li>
      <li>데이터 형변환</li>
    </ol>
    <hr />

    <ol>
      <li>
        파이썬이 처리할 수 있는 데이터 유형
        <ul>
          <li><input type="text" data-answer="integer" /></li>
          <li><input type="text" data-answer="float" /></li>
          <li><input type="text" data-answer="string" /></li>
          <li><input type="text" data-answer="boolean" /></li>
        </ul>
      </li>
      <p>
        데이터 타입마다 <input type="text" data-answer="메모리" />가 가지는
        크기가 달라짐
      </p>
      <ul>
        <li>
          integer : <input type="text" data-answer="4" />바이트,
          <input type="text" data-answer="32" />비트
        </li>
        <li>long : <input type="text" data-answer="무제한" /></li>
        <li>
          float : <input type="text" data-answer="8" />바이트,
          <input type="text" data-answer="64" />비트
        </li>
        <li>
          string : 각 문자는 <input type="text" data-answer="1" />바이트 또는
          <input type="text" data-answer="2" />바이트
        </li>
        <li>boolean : <input type="text" data-answer="1" />바이트</li>
      </ul>
      <p>
        다이나믹 타이핑 Dynamic Typing : 타입에 대해서 선언하지 않더라도 알아서
        <input type="text" data-answer="타입을 인식|타입 인식" />
      </p>
    </ol>
    <hr />

    <ol>
      <li>연산자(Operator)와 피연산자(operand)</li>
      <ul>
        <li>
          문자 간 + 연산 : <input type="text" data-answer="concatenate" />
        </li>
        <li>제곱 연산 : <input type="text" data-answer="**" /></li>
        <li>% : <input type="text" data-answer="나머지 연산" /></li>
        <li>+= : <input type="text" data-answer="증가 연산" /></li>
        <li>-= : <input type="text" data-answer="감소 연산" /></li>
      </ul>
    </ol>
    <hr />

    <ol>
      <li>형변환</li>
      <p>&gt;&gt;&gt; a = 10</p>
      <p>&gt;&gt;&gt; type(a)</p>
      <p>&lt;class '<input type="text" data-answer="int" />'&gt;</p>
      <p>&gt;&gt;&gt; <input type="text" data-answer="float" />(a)</p>
      <p>10.0</p>
      <p>&gt;&gt;&gt; type(a)</p>
      <p>&lt;class '<input type="text" data-answer="int" />'&gt;</p>
      <p>&gt;&gt;&gt; a = float(a) # 재할당을 해줘야 형변환이 됨</p>
      <p>&gt;&gt;&gt; type(a)</p>
      <p>&lt;class '<input type="text" data-answer="float" />'&gt;</p>
    </ol>
    <hr />

    <ol>
      <li>List 또는 Array</li>
      <ul>
        <li>시퀀스 자료형</li>
        <li>
          list의 값들은 <input type="text" data-answer="주소(offset)|offset|주소" />를 가짐
          cities[<input type="text" data-answer="start" /> 인덱스 :
          <input type="text" data-answer="end" /> 인덱스 : step]
        </li>
        <li>
          다양한 데이터 타입이 하나의 <input type="text" data-answer="List" />에
          들어감
        </li>
        <ul>
          <li>a = ["color", 1, 0.2]</li>
        </ul>
        <li>리스트 <input type="text" data-answer="메모리 저장" /> 방식</li>
        <ul>
          <li>a = [5, 4, 3, 2, 1]</li>
          <li>b = [1, 2, 3, 4, 5]</li>
          <li>b = a # 메모리 <input type="text" data-answer="주소 참조" /></li>
          <li>a.<input type="text" data-answer="sort" />()</li>
          <li>
            b = a[:] # 메모리 <input type="text" data-answer="주소 공유" />가
            아닌 <input type="text" data-answer="새롭게 복사|복사" />[^2]
          </li>
        </ul>
        <li>
          <input type="text" data-answer="패킹" /> : 한 변수에 여러 개의
          데이터를 넣는 것
        </li>
        <li>
          <input type="text" data-answer="언패킹" /> : 한 변수의 데이터를 각각의
          변수로 반환
        </li>
        <ul>
          <li>
            &gt;&gt;&gt; <input type="text" data-answer="t" /> = [1, 2, 3] # 1,
            2, 3을 변수 t에 패킹
          </li>
          <li>
            &gt;&gt;&gt; <input type="text" data-answer="a, b, c" /> = t # t에
            있는 값 1, 2, 3을 변수 a, b, c에 언패킹
          </li>
        </ul>
      </ul>
    </ol>
    <hr />

    <p>
      [^1]: <input type="text" data-answer="비트(bit)|비트|bit" /> : 0 또는 1을
      가짐 <input type="text" data-answer="바이트(Byte)|바이트|byte" /> : 8개의
      bit로 구성. 0~255
      <input
        type="text"
        data-answer="킬로바이트(Kilobyte)|Kilobyte|킬로바이트"
      />
      : 1024 Byte
      <input
        type="text"
        data-answer="메가바이트(Megabyte)|Megabyte|메가바이트"
      />
      : 1024 KB
    </p>
    <p>
      [^2]: <input type="text" data-answer="2차원" /> matrix는 안됨. 이때는
      <input type="text" data-answer="import copy" /> copy.<input
        type="text"
        data-answer="deepcopy"
      />(array)
    </p>

    <button onclick="checkAnswers()">제출</button>
    <div id="result" class="result"></div>

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
