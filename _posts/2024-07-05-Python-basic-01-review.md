---
title: Python 기본 문법 - Python의 특징(복습용)
date: 2024-07-05
categories: python-basic
---
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Python 인출 학습 (2단계)</title>
    <style>
      input[type="text"] {
        width: 150px;
      }
      .result {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <h1>Python</h1>
    <ul>
      <li>
        <input type="text" data-answer="1991년" />
        <input type="text" data-answer="Guido Van Rossum" />이 발표
      </li>
      <li>플랫폼 <input type="text" data-answer="독립적" /></li>
      <li>인터프리터 언어</li>
      <li>객체 지향</li>
      <li>동적 <input type="text" data-answer="타이핑" /> 언어</li>
      <li>처음 <input type="text" data-answer="C 언어" />로 구현됨</li>
      <li>1989년 크리스마스에 할 일이 없어 파이썬 개발</li>
      <li>
        <input type="text" data-answer="자비로운 종신 독재자" /> -> 지금은 사임
      </li>
    </ul>
    <hr />
    <h2>플랫폼 독립적인 인터프리터 언어</h2>
    <ol>
      <li>플랫폼 = <input type="text" data-answer="OS" /></li>
      <ul>
        <li>
          운영체제에 상관없이
          <input type="text" data-answer="돌아가는 프로그램" />
        </li>
      </ul>
      <li>컴파일러 vs. 인터프리터</li>
      <ul>
        <li>
          컴파일러 :
          <input type="text" data-answer="소스코드를 기계어로 먼저 번역" />
        </li>
        <li>
          인터프리터 : 별도의 번역과정 없이
          <input type="text" data-answer="소스코드를 실행시점에 해석하여" />
          컴퓨터가 처리할 수 있도록 함
        </li>
        <ul>
          <li>
            컴파일러 언어: 요리법을 미리 외우고 빠르게 요리하는 요리사 (<input
              type="text"
              data-answer="C 언어"
            />)
          </li>
          <li>
            인터프리터 언어: 요리 동영상을 보며 실시간으로 따라 하는 요리사
            (<input type="text" data-answer="Python" />)
          </li>
        </ul>
      </ul>
      <li>객체 지향 동적 타이핑 언어</li>
      <ul>
        <li>객체 지향</li>
        <ul>
          <li>
            실행 순서가 아닌
            <input type="text" data-answer="단위 모듈(객체)" /> 중심으로
            프로그램을 작성
          </li>
          <li>
            하나의 객체는 목적을 달성하기 위한
            <input type="text" data-answer="행동(method)" />와
            <input type="text" data-answer="속성(attribute)" />를 가지고 있음
          </li>
        </ul>
        <li>동적 타이핑 언어</li>
        <ul>
          <li>
            프로그램을 실행하는 시점에 프로그램이 사용해야할 데이터에 대한
            <input type="text" data-answer="타입" />을 결정함
          </li>
        </ul>
      </ul>
    </ol>

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
            .split(",")
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
