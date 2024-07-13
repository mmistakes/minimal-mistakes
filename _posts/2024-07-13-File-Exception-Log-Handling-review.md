---
title: File / Exception / Log Handling(복습용)
date: 2024-07-13
categories: python-basic
---

<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
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

<h2>Exception</h2>
<ul>
  <li>프로그램 사용할 때 일어나는 오류들</li>
  <li>예상치 못한 많은 일(예외)들이 생김</li>
</ul>

<h3>예상 가능한 예외</h3>
<ul>
  <li>발생 여부를 사전에 인지할 수 있는 예외</li>
  <li><input type="text" data-answer="사용자" />의 잘못된 입력, 파일 호출 시 파일 없음</li>
  <li>개발자가 반드시 <strong><input type="text" data-answer="명시적으로" /> 정의</strong> 해야 함</li>
</ul>

<h3>예상 불가능한 예외</h3>
<ul>
  <li><input type="text" data-answer="인터프리터" /> 과정에서 발생하는 예외, <input type="text" data-answer="개발자" /> 실수</li>
  <li>리스트의 범위를 넘어가는 값 호출, 정수 0으로 나눔</li>
  <li>수행 불가시 인터프리터가 <input type="text" data-answer="자동 호출" /></li>
</ul>

<h3>예외 처리(Exception Handling)</h3>
<ul>
  <li>예외가 발생할 경우 후속 조치 등 대처 필요</li>
  <ol>
    <li>없는 파일 호출 -> <input type="text" data-answer="파일 없음" />을 알림</li>
    <li>게임의 비정상적 종료 -> 게임 정보 저장</li>
  </ol>
  <li>프로그램은 제품이기 때문에, 모든 잘못된 상황에 대한 대처가 필요함</li>
  <li><strong>Exception Handling</strong></li>
</ul>

<h2>Exception Handling</h2>
<ul>
  <li><input type="text" data-answer="try" /> ~ <input type="text" data-answer="except" /> 문법</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
<input type="text" data-answer="try" />:
  예외 발생 가능 코드
<input type="text" data-answer="except" /> &lt;Exception Type&gt;:
  예외 발생 시 대응하는 코드
<input type="text" data-answer="finally" />:
  예외 발생 여부와 상관없이 실행됨
</code></pre>
  </div>
</div>

<ul>
  <li>예시</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
for i in range(10):
  try:
    print(10/i)
  except <input type="text" data-answer="ZerodivisionError" />:
    print("Not divided by 0")
</code></pre>
  </div>
</div>

<h3>exception의 종류</h3>
<ul>
  <li><input type="text" data-answer="Built-in" /> Exception : 기본적으로 제공하는 예외
    <ul>
      <li>IndexError : List의 Index <input type="text" data-answer="범위를 넘어갈 때" /></li>
      <li>NameError : <input type="text" data-answer="존재하지 않는 변수" />를 호출 할 때</li>
      <li>ZeroDivisionError : <input type="text" data-answer="0" />으로 숫자를 나눌 때</li>
      <li>ValueError : <input type="text" data-answer="변환할 수 없는" /> 문자/ 숫자를 <input type="text" data-answer="변환할" /> 때</li>
      <li>FileNotFoundError : <input type="text" data-answer="존재하지 않는 파일" />을 호출할 때</li>
    </ul>
  </li>
  <li>예시</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
a = [1, 2, 3, 4, 5]
for i in range(10):
  try:
    print(i, 10//i)
    print(a[i])
  except ZeroDivisionError:
    print("Error")
    print("Not divided by 0")
  except IndexError as e:
    print(e)
  except Exception as e:
    print(e)
  finally:
    print("종료되었습니다.")
</code></pre>
  </div>
</div>

<h3>raise 구문</h3>
<ul>
  <li>필요에 따라 강제로 Exception을 발생</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
raise &lt;Exception Type&gt;(예외정보)

while True:
  value = input("변환할 정수 값을 입력해주세요")
  for digit in value:
    if digit not in "0123456789":
      raise ValueError("숫자값을 입력하지 않으셨습니다")
  print("정수값으로 변환된 숫자-", int(value))
</code></pre>
  </div>
</div>

<h3>assert 구문</h3>
<ul>
  <li>특정 조건에 만족하지 않을 경우 예외 발생</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
assert 예외조건
def get_binary_number(decimal_number):
  assert isinstance(decimal_number, int) # False값이 반환되면 코드를 멈춤
  return bin(decimal_number)
print(get_binary_number(10))
</code></pre>
  </div>
</div>

<h2>File Handling</h2>

<h3>파일의 종류</h3>
<ul>
  <li>모든 파일도 실제는 binary 파일</li>
  <li>Binary 파일
    <ul>
      <li>컴퓨터만 이해할 수 있는 형태인 이진법형식으로 저장된 파일</li>
      <li>일반적으로 메모장으로 열면 내용이 깨져 보임(메모장 해설 불가)</li>
      <li>엑셀파일, 워드 파일 등등</li>
    </ul>
  </li>
  <li>Text 파일
    <ul>
      <li>인간도 이해할 수 있는 형태인 문자열 형식으로 저장된 파일</li>
      <li>메모장으로 열면 내용 확인 가능</li>
      <li>메모장에 저장된 파일, HTML 파일, 파이썬 코드 파일 등</li>
    </ul>
  </li>
</ul>

<h3>Python File I/O</h3>
<ul>
  <li>파일 처리를 위해 "open" 키워드를 사용함</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
f = open("file_name", "접근 모드")
f.close()
</code></pre>
  </div>
</div>

<ul>
  <li>r : 읽기 모드</li>
  <li>w : 쓰기 모드</li>
  <li>a : 추가 모드, 파일의 마지막에 새로운 내용을 추가 시킬 때 사용</li>
</ul>

<h4>File Read</h4>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
f = open("file_name.txt", "r")
contents = f.read()
print(contents)
f.close()

# with 구문과 함께 사용하기
with open("file_name.txt", "r") as f:
  contents = f.read()
  print(type(contents), contents)
# with를 쓰면 .close()가 필요없다.
</code></pre>
  </div>
</div>

<ul>
  <li>실행 시 마다 한 줄 씩 읽어 오기</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
with open("file_name.txt", "r") as f:
  i = 0
  while True:
    line = f.readline()
    if not line:
      break
    print(str(i) + " === " + line.replace("\n", ""))
    i = i + 1
</code></pre>
  </div>
</div>

<ul>
  <li>단어 통계 정보 산출</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
with open("file_name.txt", "r") as f:
  contents = f.read()
  word_list = contents.split(" ")
  line_list = contents.split("\n")
print("Total Number of Characters :", len(contents))
print("Total Number of Words :", len(word_list))
print("Total Number of Lines :", len(line_list))
</code></pre>
  </div>
</div>

<h4>File Write</h4>
<ul>
  <li>mode : "w", encoding : "utf8"</li>
  <li>encoding : 문자나 글자를 저장할 때 어떻게 저장할지 표준에 대한 것</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
f = open("file_name.txt", 'w', encoding="utf8")
for i in range(1, 11):
  data = "{0}번째 줄입니다.\n".format(i)
  f.write(data)
f.close()
</code></pre>
  </div>
</div>

<ul>
  <li>'a'는 추가 모드(append)</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
with open("file_name.txt", 'a', encoding="utf8") as f:
  for i in range(11, 21):
    data = "{0}번째 줄입니다.\n".format(i)
    f.write(data)
</code></pre>
  </div>
</div>

<h3>directory 다루기</h3>
<ul>
  <li><strong>os모듈</strong>을 사용하여 Directory 다루기</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import os
# log라는 directory를 만들어라
os.mkdir("log")
</code></pre>
  </div>
</div>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import os
try:
  os.mkdir("log")
except FileExistsError as e:
  print("Already exists")

# 폴더가 있는 지 없는 지 확인
os.path.exists("log")
# True
# 파일이 있는지 없는 지 확인
os.path.isfile("file.ipynb")
# True
</code></pre>
  </div>
</div>

<ul>
  <li>shutil : 파일 옮기거나 복사할 때 사용하는 유틸</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import shutil
# file.ipynb을 abc 폴더에 text.ipynb 이름으로 복사
source = 'file.ipynb'
dest = os.path.join("abc", "test.ipynb")

shutil.copy(source, dest)
</code></pre>
  </div>
</div>

<ul>
  <li>최근에는 pathlib 모듈을 사용하여 path를 객체로 다룸</li>
  <li>path를 객체로 다룰 때 장점
    <ul>
      <li>os간 통합</li>
      <li>객체로 다루기 때문에 디렉토리나 파일을 다루기 쉬워짐</li>
    </ul>
  </li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import pathlib

cwd = pathlib.Path.cwd() # current working directory
cwd.parent # 상위 디렉토리
cwd.parents # 모든 상위 디렉토리
cwd.glob("*") # *모든 파일 출력, *.txt 는 txt 확장자를 가진 모든 파일 출력
</code></pre>
  </div>
</div>

<h4>Log 파일 생성하기</h4>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import os
if not os.path.isdir("log"):
  os.mkdir("log")
if not os.path.exists("log/count_log.txt"):
  f = open("log/count_log.txt", 'w', encoding='utf8')
  f.write("기록이 시작됩니다")
  f.close()

with open("log/count_log.txt", 'a', encoding='utf8') as f:
  import random, datetime
  for i in range(1, 11):
    stamp = str(datetime.datetime.now())
    value = random.random()*1000000
    log_line = stamp + "\t" + str(value) + "값이 생성되었습니다." + "\n"
    f.write(log_line)
</code></pre>
  </div>
</div>

<h3>Pickle</h3>
<ul>
  <li>객체는 코드가 실행 될 때 <strong>메모리</strong>에 올라가 있음</li>
  <li>파이썬 인터프리터가 종료되면 객체도 사라짐</li>
  <li>저장해서 이후에도 쓰고 싶을 때 -> pickle 사용</li>
  <li>파이썬의 객체를 영속화(persistence)하는 built-in 객체</li>
  <li>데이터, object 등 실행 중 정보를 저장 후 불러와서 사용</li>
  <li>저장해야하는 정보, 계산 결과(모델) 등 활용</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import pickle
f = open("list.pickle", "wb") # w : 쓰기 모드 b : binary 모드
test = [1, 2, 3, 4, 5]
pickle.dump(test, f)
f.close()

f = open("list.pickle", "rb")
test_pickle = pickle.load(f)
print(test_pickle)
f.close()
</code></pre>
  </div>
</div>

<h2>Logging Handling</h2>
<ul>
  <li>예시 : 게임을 만들었는데 핵쟁이 때문에 망했다
    <ul>
      <li>어떻게 잡을 수 있을까?</li>
      <li>일단은 기록부터</li>
    </ul>
  </li>
</ul>

<h3>Logging(로그 남기기)</h3>
<ul>
  <li>프로그램이 실행되는 동안 일어나는 정보를 기록으로 남기기</li>
  <li>유저의 접근, 프로그램의 exception, 특정 함수의 사용
    <ul>
      <li>어디에 남길 것인가?
        <ul>
          <li>Console 화면에 출력</li>
          <li>파일에 남기기</li>
          <li>DB에 남기기 등등</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>기록된 로그를 분석하여 의미있는 결과를 도출할 수 있음</li>
  <li>실행시점에 남겨야하는 기록(유저), 개발시점에 남겨야 하는 기록(개발자)</li>
</ul>

<h3>print vs. logging</h3>
<ul>
  <li>기록을 print로 남기는 것도 가능함</li>
  <li>그러나 Console 창에만 남기는 기록은 분석시 사용 불가</li>
  <li>떄로는 레벨 별(개발, 운영)로 기록을 남길 필요도 있음</li>
  <li>모듈 별로 logging을 남길 필요도 있음</li>
  <li>이러한 기능을 체계적으로 지원하는 모듈이 필요함</li>
</ul>

<h3>logging 모듈</h3>
<ul>
  <li>python의 기본 log 관리 모듈</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import logging

logging.debug("틀렸잖아!")  # DEBUG: 상세한 진단 정보를 제공하기 위해 사용됩니다. 주로 개발 및 디버깅 중에 유용합니다.
logging.info("확인해")     # INFO: 일반적인 정보를 제공하기 위해 사용됩니다. 프로그램의 정상적인 운영 정보를 기록합니다.
logging.warning("조심해!")  # WARNING: 잠재적인 문제를 경고하기 위해 사용됩니다. 심각하지 않지만 주의가 필요한 상황입니다.
logging.error("에러났어!!")  # ERROR: 오류가 발생했을 때 사용됩니다. 프로그램이 정상적으로 수행되지 못한 경우를 기록합니다.
logging.critical("망했다...")  # CRITICAL: 심각한 오류가 발생했을 때 사용됩니다. 프로그램이 더 이상 수행될 수 없는 상태를 나타냅니다.

# WARNING:root: 조심해!
# ERROR:root: 에러났어!!
# CRITICL:root:망했다...

# 기본 로깅 레벨 세팅이 Warning 이상이어서
</code></pre>
  </div>
</div>

<ul>
  <li>Debug > Info > Warning > Error > Critical</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import logging

if __name__ == '__main__':
  logger = logging.getLogger("main")
  logging.basicConfig(level=logging.DEBUG)
  logger.setLevel(logging.INFO)

  stream_handler = logging.FileHandler("my_log", mode="w", encoding="utf8")
  logger.addHandler(stream_handler)

  logging.debug("틀렸잖아!")
  logging.info("확인해")
  logging.warning("조심해!")
  logging.error("에러났어!!")
  logging.critical("망했다...")
</code></pre>
  </div>
</div>

<ul>
  <li>로깅을 위해선 세팅해줘야 할 것이 많음
    <ul>
      <li>로그 파일</li>
      <li>레벨</li>
      <li>데이터 파일 위치</li>
      <li>파일 저장 장소</li>
      <li>Operation Type 등</li>
    </ul>
  </li>
  <li>설정하는 방법</li>
</ul>

<ol>
  <li>configparser : 파일에</li>
  <li>argparser : 실행시점에</li>
</ol>

<h4>configparser</h4>
<ul>
  <li>프로그램의 실행 설정을 file에 저장함</li>
  <li>Section, Key Value 값의 형태로 설정된 설정 파일을 사용</li>
  <li>설정파일을 Dict Type으로 호출 후 사용</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
[SectionOne]
Status: Single
Name: Derek
Value: Yes
Age: 30
Single: True

[SectionTwo]
FavoriteColor = Green

[SectionThree]
FamilyName: Johnson
</code></pre>
  </div>
</div>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import configparser
config = configparser.ConfigParser()
config.sections()

config.read('example.cfg')
config.sections()

for key in config['SectionOne']
  print(key)
  value = config['SectionOne'][key]
  print(f"{key} : {value}")

config['SectionOne']["status"]
</code></pre>
  </div>
</div>

<h4>argparser</h4>
<ul>
  <li>Console 창에서 프로그램 실행시 Setting 정보를 저장함</li>
  <li>거의 모든 Console 기반 Python 프로그램 기본으로 제공</li>
  <li>특수 모듈도 많이 존재하지만(TF), 일반적으로 argparser를 사용</li>
  <li>Command-Line Option이라고 부름</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
import argparse

parser = argparse.ArgumentParser(description='Sum two integers.')

parser.add_argument('-a',"--a_value", dest="A_value", help="A integers", type=int)
parser.add_argument('-b', "--b_value",dest="B_value", help="B integers", type=int)
args = parser.parse_args()
print(args)
print(args.a)
print(args.b)
print(args.a + args.b)
</code></pre>
  </div>
</div>

<h4>Logging formatter</h4>
<ul>
  <li>Log 결과값의 format을 지정할 수 있음</li>
</ul>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
formatter = logging.Formatter('%(asctime)s %(levelname)s %(process)d %(message)s')

# 2018-01-18 22:47:04,385 ERROR 4410 ERROR occurred
# 2018-01-18 22:47:22,458 ERROR 4439 ERROR occurred
# 2018-01-18 22:47:22,458 INFO 4439 HERE WE ARE
# 2018-01-18 22:47:24,680 ERROR 4443 ERROR occurred
# 2018-01-18 22:47:24,681 INFO 4443 HERE WE ARE
# 2018-01-18 22:47:24,970 ERROR 4445 ERROR occurred
# 2018-01-18 22:47:24,970 INFO 4445 HERE WE ARE
</code></pre>
  </div>
</div>

<h4>Log config file</h4>

<div class="language-python highlighter-rouge">
  <div class="highlight">
    <pre class="highlight"><code>
logging.config.fileConfig('logging.conf')
logger = logging.getLogger()
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
