---
title: String and advanced function concept(복습용)
date: 2024-07-06
categories: python-basic
---
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>String and Advanced Function Concept</title>
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
    <h1>String and Advanced Function Concept</h1>

    <h2>String</h2>
    <ul>
        <li><input type="text" data-answer="시퀀스" /> 자료형으로 문자형 data를 메모리에 저장</li>
        <li>영문자 한 글자는 <input type="text" data-answer="1" />byte의 메모리 공간을 사용</li>
        <li><img src="https://i.imgur.com/mna5FrP.png" alt="alt text"></li>

    </ul>
    <p>비트 : 0 또는 1</p>
    <p>바이트 = 비트 8개 = 256</p>
    <p>킬로바이트 = 1024바이트</p>
    <ul>
        <li>문자열의 각 문자는 <input type="text" data-answer="개별 주소(offset)|offset|주소" />을 가짐</li>
        <li>이 주소를 사용해 할당된 값을 가져오는 것이 <strong><input type="text" data-answer="인덱싱" /></strong></li>
        <li>List와 같은 형태로 데이터를 처리함</li>
    </ul>
    <div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
len(a) # 문자열의 길이를 반환
a.upper() # 문자열을 대문자로 변환
a.lower() # 문자열을 소문자로 변환
a.capitalize() # 첫 글자를 대문자로 변환
a.title() # 각 단어의 첫 글자를 대문자로 변환
a.count('abc') # 'abc' 문자열의 출현 횟수를 반환
a.find('abc') # 'abc' 문자열이 처음 나타나는 위치를 반환 (없으면 -1)
a.rfind('abc') # 'abc' 문자열이 마지막으로 나타나는 위치를 반환 (없으면 -1)
a.startswith('abc') # 문자열이 'abc'로 시작하면 True, 아니면 False
a.endswith('abc') # 문자열이 'abc'로 끝나면 True, 아니면 False
a.split() # 공백을 기준으로 문자열을 나누어 리스트로 반환
a.isdigit() # 문자열이 숫자로만 이루어져 있으면 True, 아니면 False
</code>
</pre> 
</div> 
</div>

    <h2>Function</h2>
    <ul>
        <li>call by object reference</li>
        <li>함수에서 <input type="text" data-answer="parameter" />를 전달하는 방식
            <ol>
                <li>값에 의한 호출(Call by value)</li>
                <li>참조에 의한 호출(Call by reference)</li>
                <li>객체 참조에 의한 호출(Call by object reference)</li>
            </ol>
        </li>
    </ul>
    <ul>
        <li>Call by Object Reference
            <ul>
                <li>파이썬의 객체의 주소가 함수로 전달되는 방식
                    <ul>
                        <li>전달된 객체를 참조하여 변경 시 호출자에게 영향을 주나 <input type="text" data-answer="새로운 객체를 만들 경우" /> 호출자에게 영향을 주지 않음</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
    <div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def spam(eggs):
    eggs.append(1) # 기존 객체의 주소값에 [1] 추가
    <input type="text" data-answer="eggs" /> = [2, 3] # 새로운 객체 생성
ham = [0]
spam(ham)
print(ham) # [0,1]
</code>
</pre> 
</div> 
</div>


    <ul>
        <li>swap</li>
    </ul>

    <h3>swap_value(x, y)</h3>
    <div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def swap_value(x, y):
    temp = x
    x = y
    y = temp
</code>
</pre> 
</div> 
</div>

    <ul>
        <li>이 함수는 <code>x</code>와 <code>y</code>라는 변수 두 개를 받아서 그 값들을 교환합니다.</li>
        <li>중요한 점은 이 함수가 받은 값들만 교환할 뿐, 리스트 <code>a</code>에는 아무런 영향을 주지 않습니다.</li>
        <li>예를 들어, <code>swap_value(a[0], a[1])</code>을 호출하면 <code>x</code>는 1, <code>y</code>는 2가 되어 교환됩니다. 그러나 이 교환은 함수 내부에서만 일어나고 리스트 <code>a</code>는 그대로 <code>[1, 2, 3, 4, 5]</code>입니다.</li>
    </ul>

    <h3>swap_offset(offset_x, offset_y)</h3>
    <div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def swap_offset(offset_x, offset_y):
    temp = a[offset_x]
    a[offset_x] = a[offset_y]
    a[offset_y] = temp
</code>
</pre> 
</div> 
</div>

    <ul>
        <li>이 함수는 리스트 <code>a</code>의 특정 위치에 있는 값을 교환합니다.</li>
        <li><code>offset_x</code>와 <code>offset_y</code>는 리스트의 인덱스(위치)를 의미합니다.</li>
        <li>예를 들어, <code>swap_offset(0, 1)</code>을 호출하면 <code>a[0]</code>과 <code>a[1]</code>의 값이 교환되어 리스트 <code>a</code>는 <code>[2, 1, 3, 4, 5]</code>가 됩니다.</li>
    </ul>

    <h3>swap_reference(list, offset_x, offset_y)</h3>
<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def swap_reference(list, offset_x, offset_y):
    temp = list[offset_x]
    list[offset_x] = list[offset_y]
    list[offset_y] = temp
</code>
</pre> 
</div> 
</div>

    <ul>
        <li>이 함수는 전달된 리스트의 특정 위치에 있는 값을 교환합니다.</li>
        <li>리스트를 함수의 인자로 받아서 그 리스트의 원소들을 교환합니다.</li>
        <li>예를 들어, <code>swap_reference(a, 0, 1)</code>을 호출하면 <code>a[0]</code>과 <code>a[1]</code>의 값이 교환되어 리스트 <code>a</code>는 <code>[2, 1, 3, 4, 5]</code>가 됩니다.</li>
    </ul>

    <hr>

    <h2>function - scoping rule</h2>
    <ul>
        <li>변수의 범위(Scoping Rule)</li>
        <li>지역변수(local variable) : 함수내에서만 사용</li>
        <li>전역변수(Global variable) : 프로그램 전체에서 사용</li>
    </ul>
<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def test(t): # t : 함수 내의 변수 local variable
  print(x) # x : 함수 밖의 변수 global variable
  t = 20
  print("In Function: ", t)

x = 10
test(x)
print(t)
</code>
</pre> 
</div> 
</div>


<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def f():
    global s
    s="I love London!"
    print(s)
s = "I love Paris!"
f()
print(s)

# I love London!
# I love London!
</code>
</pre> 
</div> 
</div>


    <h2>Recursive Function(재귀 함수)</h2>
    <ul>
        <li>자기 자신을 호출하는 함수</li>
        <li>점화식과 같은 재귀적 수학 모형을 표현할 때 사용</li>
        <li>재귀 종료 조건 존재, 종료 조건까지 함수호출 반복</li>
    </ul>

    <h2>Function type hints</h2>
    <ul>
        <li>파이썬의 가장 큰 특징 : dynamic typing</li>
        <li>처음 함수를 사용하는 사용자가 interface를 알기 어렵다는 단점이 있음</li>
    </ul>
<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def do_function(var_name: var_type) -> return_type:
    pass
def type_hint_example(name: str) -> str:
    return f"Hello, {name}"
</code>
</pre> 
</div> 
</div>

    <ul>
        <li>Type hints의 장점
            <ol>
                <li>사용자에게 인터페이스를 명확히 알려줄 수 있다.</li>
                <li>함수의 문서화시 parameter에 대한 정보를 명확히 알 수 있다.</li>
                <li>시스템 전체적인 안정성을 확보할 수 있다.</li>
            </ol>
        </li>
    </ul>
    <p>ex)</p>
    <li><img src="[https://i.imgur.com/mna5FrP.png](https://i.imgur.com/CpgANZk.png)" alt="alt text"></li>

    <h2>docstring</h2>
    <ul>
        <li>파이썬 함수에 대한 상세스펙을 사전에 작성 -> 함수 사용자의 이해도 up</li>
        <li>세 개의 따옴표로 docstring 영역 표시(함수명 아래)</li>
    </ul>

    <h2>함수 작성 가이드 라인</h2>
    <ul>
        <li>함수는 가능하면 짧게 작성할 것(줄 수를 줄일 것)</li>
        <li>함수 이름에 함수의 역할, 의도가 명확히 드러낼 것</li>
<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
def 동사+명사():
</code>
</pre> 
</div> 
</div>

        <li>하나의 함수에는 유사한 역할을 하는 코드만 포함</li>
        <li>인자로 받은 값 자체를 바꾸진 말 것(임시변수 선언)</li>
        <li>공통적으로 사용되는 코드는 함수로 변환</li>
        <li>복잡한 수식, 조건 -> 식별 가능한 이름의 함수로 변환</li>
    </ul>

    <h2>코딩은 팀플</h2>
    <blockquote>
        <p>컴퓨터가 이해할 수 있는 코드는 어느 바보나 다 짤 수 있다. 좋은 프로그래머는 사람이 이해할 수 있는 코드를 짠다. -마틴 파울러-</p>
    </blockquote>
    <ul>
        <li>사람의 이해를 돕기 위한 <strong>규칙</strong>이 필요함</li>
        <li>그 규칙을 <strong>코딩 컨벤션</strong>이라고 함(Google python convention)
            <ul>
                <li>명확한 규칙은 없으나 중요한 건 팀이나 프로젝트 마다의 <strong>일관성</strong></li>
                <li>들여쓰기는 Tab or 4 Space
                    <ul>
                        <li>일반적으로 4 Space 권장</li>
                    </ul>
                </li>
                <li>한 줄은 최대 79자까지</li>
                <li>불필요한 공백은 피함</li>
                <li>= 연산자는 1칸 이상 안 띄움</li>
                <li>주석은 항상 갱신, 불필요한 주석은 삭제</li>
                <li>코드의 마지막에는 항상 한 줄 추가</li>
                <li>소문자 l, 대문자 O, 대문자 I 금지</li>
                <li>함수명은 소문자로 구성, 필요하면 밑줄로 나눔</li>
            </ul>
        </li>
    </ul>
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
