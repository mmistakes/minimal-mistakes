---
title: Python data structure(복습용)
date: 2024-07-07
categories: python-basic
---
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문서 변환</title>
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

<h2>특징이 있는 정보는 어떻게 저장하면 좋을까?</h2>

<ul>
    <li>전화번호부 정보는 어떻게 저장하면 좋을까?</li>
    <li>은행 번호표 정보는 어떻게 처리하면 좋을까?</li>
    <li>서적 정보는 어떻게 관리하면 좋을까?</li>
    <li>창고에 쌓인 수화물의 위치를 역순으로 찾을 때는 어떻게 하는게 좋을까?</li>
</ul>

<h2>파이썬 기본 데이터 구조</h2>

<ul>
    <li>스택과 큐(stack & queue)</li>
    <li>튜플과 집합(tuple & set)</li>
    <li>사전(dictionary)</li>
    <li>Collection 모듈</li>
</ul>

<h2><input type="text" data-answer="stack" /></h2>

<ul>
    <li><input type="text" data-answer="나중에 넣은" /> 데이터를 <input type="text" data-answer="먼저 반환" />하도록 설계된 메모리 구조</li>
    <li><input type="text" data-answer="LIFO" /> : <input type="text" data-answer="Last" /> In <input type="text" data-answer="First" /> Out</li>
    <li>Data의 입력을 <input type="text" data-answer="Push" />, 출력을 <input type="text" data-answer="Pop" />이라고 함</li>
</ul>

<h3>stack with list object</h3>

<ul>
    <li>리스트를 사용하여 스택 구조를 구현 가능</li>
    <li>push를 <input type="text" data-answer="append()" />, pop을 <input type="text" data-answer="pop()" />을 사용</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
a = [1, 2, 3, 4, 5]
a.append(20)
c = a.pop() # pop은 return 값을 가진다. 여기서 c = <input type="text" data-answer="20" />
        </code></pre> 
  </div> 
</div>

<h2><input type="text" data-answer="queue" /></h2>

<ul>
    <li><input type="text" data-answer="먼저 넣은" /> 데이터를 <input type="text" data-answer="먼저 반환" />하도록 설계된 메모리 구조</li>
    <li><input type="text" data-answer="FIFO" /> : <input type="text" data-answer="First" /> In <input type="text" data-answer="First" /> Out</li>
    <li>Stack과 반대되는 개념</li>
</ul>

<h3>queue with list object</h3>

<ul>
    <li>리스트를 사용하여 큐 구조를 구현 가능</li>
    <li><input type="text" data-answer="put" />을 <input type="text" data-answer="append()" />, <input type="text" data-answer="get" />을 <input type="text" data-answer="pop(0)" />을 사용</li>
</ul>

<h2><input type="text" data-answer="tuple" /></h2>

<ul>
    <li>값의 변경이 <input type="text" data-answer="불가능한" /> 리스트</li>
    <li>선언 시 "[]"가 아닌 "<input type="text" data-answer="()" />"를 사용</li>
    <li>리스트의 연산, 인덱싱, 슬라이싱 등 동일하게 사용가능</li>
</ul>

<ul>
    <li>쓰는 이유?</li>
    <ul>
        <li>변경되지 않는 데이터를 저장할 때 사용</li>
        <li>함수의 반환값 등 사용자의 실수에 의한 에러를 사전에 방지</li>
    </ul>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
<input type="text" data-answer="TypeError" /> : 'tuple' object does not support item assignment  # 값의 할당을 사전에 방지
        </code></pre> 
  </div> 
</div>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
t = (1) # 일반 정수로 인식
t = <input type="text" data-answer="(1, )" /> # 튜플로 선언하려면 <input type="text" data-answer="," />를 사용해야 한다
        </code></pre> 
  </div> 
</div>

<h2><input type="text" data-answer="set" /></h2>

<ul>
    <li>값을 <input type="text" data-answer="순서없이" /> 저장, <input type="text" data-answer="중복" />을 불허 하는 자료형</li>
    <li><input type="text" data-answer="set" />([object]) 또는 <input type="text" data-answer="{object}" />를 사용해서 객체 생성</li>
</ul>

<h3>집합의 연산</h3>

<ul>
    <li>수학에서 활용하는 다양한 집합연산 가능</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
s1 = set([1, 2, 3, 4, 5])
s1 = set([3, 4, 5, 6, 7])
s1.<input type="text" data-answer="union" />(s1) or s1 <input type="text" data-answer="|" /> s2
# {1, 2, 3, 4, 5, 6, 7}
s1.<input type="text" data-answer="intersection" />(s2) or s1 <input type="text" data-answer="&" /> s2
# {3, 4, 5}
s1.<input type="text" data-answer="difference" />(s2) or s1 <input type="text" data-answer="-" /> s2
# {1, 2}
        </code></pre> 
  </div> 
</div>

<h2><input type="text" data-answer="dictionary" /></h2>

<ul>
    <li>데이터를 저장할 때 구분 지을 수 있는 값을 함께 저장</li>
    <li>구분을 위한 데이터 고유값을 <input type="text" data-answer="Identifier" /> 또는 key라고 함</li>
    <li>Key값을 활용하여, 데이터 값(Value)을 관리함</li>
    <li>다른 언어에서는 <input type="text" data-answer="Hash Table" />이라는 용어를 사용</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
dict_example = {Key1 : Value1, Key2 : Value2, Key3 : Value3...}

for dic_item in dict_example.items():
  print(dic_item)
(Key1 : Value1) # 튜플의 형태로 저장(값을 바꿀 수 없음)
(Key2 : Value2)
(Key3 : Value3)

dict_example.<input type="text" data-answer="keys" />() # 키 값만 출력
dict_example.<input type="text" data-answer="values" />() # value 값 출력

<input type="text" data-answer="&quot;Key100&quot; in dict_example.keys()" /> # key값에 "Key100"이 있는지 확인
        </code></pre> 
  </div> 
</div>

<h3>Lab-dict</h3>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
sorted_dict = sorted(dictlist, key = getKey, reverse = True)
# dictlist: 정렬할 딕셔너리들의 리스트
# key 인자: 각 딕셔너리에 대해 정렬 기준을 정의하는 함수
# reverse=True: 내림차순으로 정렬
        </code></pre> 
  </div> 
</div>

<h2><input type="text" data-answer="collections" /></h2>

<ul>
    <li>List, Tuple, Dict에 대한 Python Built-in 확장 자료 구조(모듈)</li>
    <li>편의성, 실행 효율성(메모리 사용량 or 시간 복잡도)</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
from collections import deque
from collections import Counter
from collections import OrderedDict
from collections import defaultdict
from collections import namedtuple
        </code></pre> 
  </div> 
</div>

<h3><input type="text" data-answer="deque" /></h3>

<ul>
    <li>queue와 stack을 모두 지원하는 모듈</li>
    <li>List에 비해 효율적인(빠른) 자료 저장 방식을 지원</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
<input type="text" data-answer="from collections import deque" />

deque_list = deque()
for i in range(5):
  deque_list.<input type="text" data-answer="append" />(i)
print(deque_list)
deque_list.<input type="text" data-answer="appendleft" />(10)
print(deque_list)

# deque([0, 1, 2, 3, 4])
# deque([10, 0, 1, 2, 3, 4])
        </code></pre> 
  </div> 
</div>

<ul>
    <li>rotate, reverse 등 Linked List[^1]의 특성을 지원함</li>
    <li>기존 list 형태의 함수를 모두 지원함</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
from collections import deque

deque_list = deque()
for i in range(5):
    deque_list.append(i)
deque_list.<input type="text" data-answer="appendleft" />(10)
# deque([10, 0, 1, 2, 3, 4])
deque_list.<input type="text" data-answer="rotate" />(1) # 오른쪽으로 1칸 이동
# deque([4, 10, 0, 1, 2, 3])

deque_list.<input type="text" data-answer="extend" />([5, 6, 7])
# deque([4, 10, 0, 1, 2, 3, 5, 6, 7])

deque_list.<input type="text" data-answer="extendleft" />([5, 6, 7]) # 5, 6, 7을 왼쪽에 추가하면 7, 6, 5 순서로 추가됨
# deque([7, 6, 5, 4, 10, 0, 1, 2, 3, 5, 6, 7])
        </code></pre> 
  </div> 
</div>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
from collections import deque
import time

start_time = time.<input type="text" data-answer="perf_counter" />()
deque_list = deque()
for i in range(10000):
    for i in range(10000):
        deque_list.append(i)
        deque_list.pop()
print(time.<input type="text" data-answer="perf_counter" />() - start_time, "seconds")
# 3.909028 seconds

start_time = time.<input type="text" data-answer="perf_counter" />()
just_list = []
for i in range(10000):
    for i in range(10000):
        just_list.append(i)
        just_list.pop()
print(time.<input type="text" data-answer="perf_counter" />()- start_time, "seconds")
# 8.662928999999998 seconds
        </code></pre> 
  </div> 
</div>

<h3><input type="text" data-answer="OrderedDict" /></h3>

<ul>
    <li>Dict와 달리, 데이터를 입력한 순서대로 dict를 반환함</li>
    <li>현재는 순서를 보장하여 출력하기 때문에 참고만</li>
</ul>

<h3><input type="text" data-answer="defaultdict" /></h3>

<ul>
    <li>Dict type의 값에 <input type="text" data-answer="기본 값" />을 지정, 신규값 생성 시 사용하는 방법</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
d = dict()
print(d["first"])
------------------------------------------
KeyError: 'first'
        </code></pre> 
  </div> 
</div>

<ul>
    <li><strong>존재하지 않는 키</strong>를 접근하려 할 때 <strong><input type="text" data-answer="자동으로 기본값을 생성" /></strong>해 주는 기능</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
from collections import defaultdict
d = defaultdict(object) # Default dictionary를 생성
d = defaultdict(lambda: 0) # Default 값을 0으로 설정
print(d["first"])
#
        </code></pre> 
  </div> 
</div>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
from collections import defaultdict
text = """
A press release is the quickest and easiest way to get free publicity. If
well written, a press release can result in multiple published articles about your
firm and its products. And that Can mean new prospects contacting you asking you to
sell to them.
""".lower().split()

text_counter = defaultdict(object)
text_counter = defaultdict(lambda: 0)
for word in text:
        text_counter[word] += 1

print(text_counter["to"])
# 3
        </code></pre> 
  </div> 
</div>

<h3><input type="text" data-answer="Counter" /></h3>

<ul>
    <li>Sequence type의 data element들의 갯수를 dict 형태로 반환</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
from collections import Counter

c = Counter()
c = Counter('gallahad')
print(c)
# Counter({'a': 3, 'l': 2, 'g': 1, 'd': 1, 'h': 1})
        </code></pre> 
  </div> 
</div>

<ul>
    <li>Set의 연산들을 지원함(set의 확장 버전)</li>
</ul>

<h3><input type="text" data-answer="namedtuple" /></h3>

<ul>
    <li>Tuple 형태로 Data 구조체를 저장하는 방법</li>
    <li>저장되는 data의 variable을 사전에 지정해서 저장함</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
        <pre class="highlight"><code>
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(x = 11, y = 22)
print(p[0]+p[1])
# 33
        </code></pre> 
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
