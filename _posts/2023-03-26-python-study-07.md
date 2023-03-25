---
layout: single
title: python-study-07 표준 모듈
tags: python
---


## import
외부의 모듈을 가져와서 사용할때는 import 명령을 사용한다. 이 명령에 의해 모듈에 정의된 코드가 현재 소스로 읽혀진다.  
import문을 사용하는 방식은 여러가지가 있다. 모듈 전체를 import할때는 import 다음에 모듈 이름을 쓰며, 확장자 .py는 붙이지 않는다.
import문은 보통은 코드의 앞쪽에 작성하나, 중간에도 필요한 경우 import문을 사용할 수 있으며, 필요한것만 골라서 import하는것도 가능하다


```python
import math
print(math.sqrt(2))
```
```
1.4142135623730951
```

import math 선언은 math 모듈에 작성된 모든 상수와 함수를 다 가져온다. 이후 소스에서 직접 정의한것 처럼 math의 함수를 호출 가능하다. 이 구문이 없다면 sqrt 함수는 정의되지 않은 것으로 error 처리된다.

```python
from math import sqrt
# from 모듈 import 함수명
print(sqrt(2))
```
특정 함수를 import 할때는 위와 같은 구문을 사용하며, 함수를 직접 import 했으므로 소속을 밝힐 필요가 없이 함수명으로 바로 호출 가능하다. 그러나 sqrt 함수만 import 했기 때문에 math에 속한 다른 함수는 사용할 수가 없다.  

```python
from math import *
```
위와 같은 방법으로 math에 속한 모든 함수를 다 import 가능하고, 같은 모듈 소속의 함수는 콤마로 구분하여 여러개 가져올수도 있다. 너무 많은 함수를 import하면 다른 모듈과 이름이 충돌하는 문제가 생길 수 있으므로 가급적 소속을 밝히고 쓰는것이 좋다.  

```python
import math as m
print(m.sqrt(2))
```
모듈 이름이 길고 복잡할 경우 import문의 as 다음에 모듈의 별명을 지정한다. 이후 모듈명 대신 별명을 사용하면 된다.

```python
from math import sqrt as sq
print(sq(2))
```
함수에 대해서도 똑같은 방식으로 별명을 지정할 수 있다. 


## math 모듈

### math 모듈의 상수
- pi : 원주율 상수 (지름과 원 둘레의 비율)
- tau : 원주율의 2배 되는 상수 (반지름과 원 둘레의 비율)
- e : 자연대수 상수
- inf : 무한대 값
- nan : 숫자가 아닌 값

### math 모듈의 함수
- sqrt(x) : x의 제곱근을 구한다, 세제곱근은 1/3승을 계산하여 구한다
- pow(x,y) : x의 y숭을 계산한다. **연산자와 기능은 같지만 인수를 모두 실수로 바꾼 후 연산한다는 차이가 있다
- hypot(x,y) : 피타고라스의 정리에 의해 x제곱+y제곱의 제곱근을 구한다
- factorial(x) : x의 계승을 구한다, x는 양의 정수만 가능하다
- sin(x), cos(x), tan(x) : 삼각함수를 계산한다, x는 라디안 값
- asin(x), ... , atan(x), atan2(y,x) : 역삼각함수 계산
- sinh(x) ... : 쌍곡선 삼각함수 계산
- asinh(x) ... : 쌍곡선 역삼각함수 계산
- degrees(x) : 라디안 값을 각도로 바꾼다
- radians(x) : 각도를 라디안 값으로 바꾼다
- ceil(x) : 수직선 오른쪽의 올림 값을 찾는다
- floor(x) : 수직선 왼쪽의 내림 값을 찾는다
- fabs(x) : x의 절댓값을 구한다
- ftrunc(x) : x의 소숫점 이하를 버린다
- log(x,base) : base에 대한 x의 로그를 구한다. base생략시 자연로그를 구한다
- log10(x) : 10의 로그를 구한다. log(x,10)과 같다
- gcd(a,b) : a,b의 최대공약수를 구한다

### 예제
```python
import math
import turtle as t

t.penup()
t.goto(-720,0)
t.pendown()
for x in range(-720,720):
    t.goto(x, math.sin(math.radians(x)) * 100)
t.done()
```
터틀 그래픽을 이용해서 진폭이 200인 사인곡선 그리기


## statistics 모듈
### statistics 모듈 함수
- mean : 평균을 구한다
- harmonic_mean : 조화평균을 구한다
- median : 중앙값을 구한다. 짝수인 경우 보간 값을 계산한다
- median_low : 중앙값을 구한다. 집합 내의 낮은 값을 선택한다
- median_high : 중앙값을 구한다. 집합 내의 높은 값을 선택한다
- median_grouped : 그룹 연속 중앙값을 구한다
- mode : 최빈값을 구한다
- pstdev : 모표준편차를 구한다
- stdev : 표준편차를 구한다
- variance : 분산을 구한다

수학 함수로도 구할 수 있지만 통계 함수는 한번에 정확한 값을 효율적으로 계산해낸다. 통계는 여러개의 값으로부터 원하는 값을 찾아내는 것이므로 인수로 수치값의 리스트가 온다. 입력값이 많아도 빠른 속도로 통계값을 계산해 낸다.  


## time 모듈
time 모듈은 시간 관련 기능을 제공한다.

```python
import time
print(time.time())
```
```
1679758311.265318
```
현재 시간으로 조사하는 time함수이다. 유닉스는 1970년 1월 1일 자정을 기준으로 경과한 시간을 초 단위로 표현하는데, 이를 Epoch시간 또는 유닉스 시간이라고 부른다. 현재 시간을 조사해보면 16억정도의 큰 값이 나오는데, 1970년 부터 지금까지 그정도의 초가 지났다는 이야기이다.  
시간을 딱 하나의 값으로 1차원화 하여 표현할수 있어서 계산이나 저장이 편하고, 다른 시스템과 통신에 유리하다.  

```python
import time
t = time.time()
print(time.ctime(t))
```
```
Sun Mar 26 00:34:16 2023
```
일상적으로 사용하는 시간 포멧을 보려면 ctime함수를 사용한다. 인수로 에폭 시간을 넘기면 문자열로 바꿔준다.


```python
import time
t = time.time()
print(time.localtime(t))
```
```
time.struct_time(tm_year=2023, tm_mon=3, tm_mday=26, tm_hour=0, tm_min=36, tm_sec=16, tm_wday=6, tm_yday=85, tm_isdst=0)
```
시간 요소를 분리하는 함수는 두가지가 있는데, 에폭 시간을 인수로 주면 시간 요소를 멤버로 가지는 struct_time형의 객체를 리턴한다. localtime 함수는 지역 시간을 고려하여 현지 시간을 구하고 gmtime은 세계 표준 시간인 UTC 시간을 구한다. 인수를 생략하면 현재 시간을 구해 객체로 바꾼다. 현지 시간이 실용적이므로 보통 localtime 함수로 현재 시간을 구한다.  
각 멤버의 이름에 설명이 되어있고, 년월일시분초의 정보, 요일, 1년중 날수, 일광절약시간여부 등이 저장되어 있다. c언어와 다르게 모든 멤버가 1부터 시작해서 별다른 계산이 필요가 없다. 이 정보를 하나씩 분리하고 문자열로 조립하여 원하는 형태로 날짜를 출력할 수 있다.


```python
import time
now = time.localtime()
print('%d년 %d월 %d일' % (now.tm_year, now.tm_mon, now.tm_mday))
print('%d:%d:%d' % (now.tm_hour,now.tm_min,now.tm_sec))
```
```
2023년 3월 26일
0:39:23
```
날짜와 시간을 우리나라 시간과 포맷에 맞추어 조립하고 출력한 형태


```python
import datetime
now = datetime.datetime.now()
print('%d년 %d월 %d일' % (now.year, now.month, now.day))
print('%d:%d:%d' % (now.hour, now.minute, now.second))
```
```
2023년 3월 26일
0:45:28
```
time모듈 대신 datetime 모듈의 now함수 (또는 today함수)를 사용해도 현재 지역시간을 쉽게 구할 수 있고, 멤버의 이름이 더 짧고 직관적이다.  
  
mktime함수는 반대로 struct_time 객체를 에폭 시간으로 바꾼다. struct_time 객체는 (년,월,일,시,분,초,...) 등의 값 9개를 적되 앞쪽 일부만 적고 나머지는 0이나 -1로 채워넣어도 무방하다. 1970년 8월 1일의 자정이라면 (1970,8,1,0,0,0,0,0,0) 이렇게 적는다.

### 실행 시간 측정
```python
import time
start = time.time()
for a in range(1000):
    print(a)
end = time.time()
print(end - start)
```
```
0
1
2
3
...
997
998
999
0.0030303001403808594
```
0에서 999까지 출력하는데 걸린 시간을 측정하는 예제이다. time 함수가 구하는 시간은 컴퓨터에 내장된 시계를 기준으로 한다. 시간은 언제나 흘러가고 있어 time 함수를 호출하는 시점에 따라 구해지는 시간이 다르다. 이를 이용하면 두 지점 간의 경과 시간을 측정할 수 있다.  
작업을 시작하기 전에 time함수로 현재 시간을 구하고, 작업을 완료한 시간을 구해서 두 값을 뺀다. 이렇게 하면 경과한 시간을 알 수가 있다. 타자 연습 프로그램을 짠다면 이 방법으로 사용자가 분당 얼마만큼 입력했는지 조사할 수 있다.


```python
import time
print(0)
time.sleep(1)
print(1)
time.sleep(5)
print(5)
```
```
0
1
5
```
sleep 함수는 cpu를 지정한 시간만큼 잠재워 아무것도 하지 않고 시간을 끈다. 인수로 초 단위의 값을 주되 소수점 이하의 정밀한 값으로 초 단위보다 더 짧은 시간을 지정할 수도 있다.


## calendar 모듈
```python
import calendar
print(calendar.calendar(2018))
print(calendar.month(2019,1))
#calendar.prcal(2018)
#calendar.prmonth(2019,1)
```
```
                                  2018

      January                   February                   March
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
 1  2  3  4  5  6  7                1  2  3  4                1  2  3  4
 8  9 10 11 12 13 14       5  6  7  8  9 10 11       5  6  7  8  9 10 11
15 16 17 18 19 20 21      12 13 14 15 16 17 18      12 13 14 15 16 17 18
22 23 24 25 26 27 28      19 20 21 22 23 24 25      19 20 21 22 23 24 25
29 30 31                  26 27 28                  26 27 28 29 30 31

...

    January 2019
Mo Tu We Th Fr Sa Su
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30 31
```
calendar 모듈은 유닉스의 cal 명령과 유사한 달력 기능을 제공한다. calendar 함수는 인수로 받은 년도의 달력 객체를 리턴하고 month 함수는 년도와 달을 인수로 받아 해당 월의 달력 객체를 리턴한다.  
2018년 달력 전체가 4행 3열로 출력되고 2019년 1월 달력이 연이어 출력된다. calendar 함수와 month 함수는 달력을 직접 출력하지 않고 객체만 리턴하므로 print 함수로 객체를 전달 해야 결과를 볼 수 있다. 이에 비해 prcal, prmonth 함수는 달력을 직접 출력한다.  
  
유닉스의 달력은 월요일이 제일 첫 칸에 나오도록 되어 있다. 첫 칸의 요일을 바꿀 때는, setfirstweekday 함수로 첫 요일을 지정하되 0이 월요일이고 1이 화요일이다. 디폴트는 월요일로 되어잇지만 calendar.setfirstweekday(6) 이렇게 첫 요일을 바꿀 경우 일요일이 첫 열에 오게 된다.

```python
import calendar
y = ['월','화','수','목','금','토','일']
day = calendar.weekday(2020,8,15)
print('광복절은',y[day] + '요일이다.')
```
```
광복절은 토요일이다.
```
weekday 함수는 특정 날짜가 무슨 요일인지 조사한다. y\[day] 식으로 조사된 요일을 문자열로 바꾸어 출력했다.  
  
달력을 2차 배열로 구해주는 monthcalendar함수, 달의 첫 요일과 날수를 구해주는 monthrange 등의 함수가 있고 윤년 여부를 조사해주는 isleap 함수 등이 있다.  


## 난수
### random
```python
import random
for i in range(5):
    print(random.random())
```
```
0.6960288832431542
0.7101929501434888
0.9013901805458961
0.7494987407424174
0.7202853321835572
```
random 모듈은 난수를 생성하는 기능을 제공한다. random 함수는 0에서 1미만의 실수 하나를 생성한다. 매번 호출할 떄마다 무작위 수를 만들어 내므로 결과는 실행할때마다 달라지며, 다섯개의 숫자에 일정한 규칙이 없다. 다만 실수여서 사용하기 어렵다.


```python
import random
for i in range(5):
    print(random.randint(1,10))
```
```
4
2
4
8
9
```
randint 함수는 begin~end 사이의 정수 난수중 하나를 골라 주며, 이때 끝값도 범위에 포함된다.  
randrange(begin,end) 함수의 경우 end는 범위에서 제외된다. begin 인수를 생략하면 0에서 end-1까지의 숫자 중 하나를 고른다.

```python
import random
for i in range(5):
    print(random.uniform(1,100))
```
```
37.338542467926196
40.154586262985525
20.12539859808767
28.216812642941168
23.627079009615645
```
1~100사이 실수 난수를 생성한다. uniform 호출문은 begin + (end - begin) * random() 수식과 같다.  
이외에 난수 생성 알고리즘에 따라 감마 난수, 가우스 난수 등이 있다.


```python
import random
l = [1,2,3,4,5]
print(random.choice(l))
```
choice 함수는 리스트에서 임의의 요소 하나를 골라서 리턴한다.

```python
i = random.randrange(len(l))
return l[i]
```
choice 함수는 위와 같은 구조이다.


```python
import random
l = [1,2,3,4,5]
print(l)
random.shuffle(l)
print(l)
```
```
[1, 2, 3, 4, 5]
[4, 3, 1, 5, 2]
```
shuffle 함수는 리스트의 요소를 무작위로 섞는다. 매 실행할 때마다 요소의 순서가 뒤죽박죽이 되며 리스트가 바뀐다.


```python
import random
nums = random.sample(range(1,46),6)
nums.sort()
print(nums)
```
```
[9, 11, 20, 24, 35, 42]
```
sample 함수는 리스트의 항목 중 n개를 무작위로 뽑아서 새로운 리스트를 만든다. 샘플 개수는 원래 리스트 개수보다는 작아야 한다. 추출된 새 리스트를 리턴하며 원본은 변경하지 않는다. 위의 코드는 로또 번호 생성기이다.



## sys 모듈

### 시스템 정보
플랫폼 독립적인 언어인 파이썬으로 만든 프로그램은 어느 운영체제에서나 잘 실행된다 그러나 플랫폼의 영향을 받지 않는다는 것은 플랫폼 고유의 기능을 쓸 수 없다는 이야기와 같다. 범용성도 중요하지만 특정 플랫폼의 기능을 적극적으로 활용해야 할 때도 있다.  
  
sys 모듈은 파이썬 해석기가 실행되는 환경과 해석기의 여러 가지 기능을 조회하고 관리하는 모듈이다. 이 모듈의 정보를 통해 시스템에 관련된 정보를 조사한다. 상세한 정보가 제공되는데 전체 목록은 레퍼런스를 참고하자.

```python
import sys

print('버전 :', sys.version)
print('플랫폼 :', sys.platform)
if (sys.platform == 'win32'):
    print(sys.getwindowsversion())
print('바이트 순서 :',sys.byteorder)
print('모듈 경로 :', sys.path)
sys.exit(0)
```
```
버전 : 3.10.6 (tags/v3.10.6:9c7b4bd, Aug  1 2022, 21:53:49) [MSC v.1932 64 bit (AMD64)]
플랫폼 : win32
sys.getwindowsversion(major=10, minor=0, build=22621, platform=2, service_pack='')
바이트 순서 : little
모듈 경로 : ['c:\\Users\\noir1\\AppData\\Local\\Programs\\Python\\Python310\\python310.zip', 'c:\\Users\\noir1\\AppData\\Local\\Programs\\Python\\Python310\\DLLs',...]
```
sys.version은 파이썬 자체의 버전을 조사하는데 버전에따라 코드가 약간씩 달라지는 경우나, 특정 버전 이상에서만 실행되는 프로그램의 경우 이 멤버를 참조한다.  
해석기가 실행되는 운영체제의 종류나 버전 정보도 상세하게 구할 수 있따. 바이트 순서는 이 기종의 컴퓨터끼리 데이터를 주고받는 네트워크 통신에 꼭 필요한 정보이다.  
sys.exit 메서드는 프로그램을 강제 종료한다. 실행을 계속할 수 없는 치명적인 이유가 있거나, 몇 겹으로 중첩된 루프에서 즉시 종료할때 사용한다. 인수로 종료 코드를 지정하는데 0이면 정상 종료이고, 그 외의 값이면 에러의 의한 종료다. 생략시 0이 적용된다.  

### 명령행 인수
파이썬 프로그램은 명령행에서 직접 실행할 수 있는 실행 파일이다. 확장자가 py인 프로그램을 실행하면 해석기가 로드되어 소스를 즉시 해석하여 실행한다. 실행 파일 뒤에 인수를 전달할수 있는데,  
  
파일을 복사하는 명령은 다음과 같다.
```
copy a.txt b.txt
```
copy는 명령어이고 a.txt와 b.txt가 명령행 인수이다. 이 값은 명령을 수행할 대상이나 옵션을 지정한다. 파이썬 프로그램에서 명령행 인수의 값을 읽으려면 sys.argv를 읽는다. 명령행 인수가 문자열 리스트로 전달된다.  

```python
import sys
print(sys.argv)
```
```
$ python test.py a option
['test.py', 'a', 'option']
```
그냥 실행하면 실행 파일명만 나타나지만 명령행으로 나가 인수를 주면 인수 목록이 출력된다.  
argv\[0]에 실행 파일의 전체 경로가 들어가고 이후의 인수는 argv[1], argv[2]로 전달된다. 명령행에서 몇 개의 인수를 전달했는가에 따라서 argv의 길이는 달라지며 인수의 개수는 len(sys.argv)로 구한다.  
sys.argv\[idx] 로 명령행 인수로 년도나 년도와 월을 입력하여 해당 년도, 해당 년도의 월의 달력만 볼수도 있다. 그래픽 환경에서는 사용하는 경우가 드믈다.  
  
어떤 날짜를 코드에 직접 기록해놓으면 매번 코드를 수정해야 하니 불편하지만, 명령행 인수로 직접 전달하면 임의의 날짜를 지정할 수 있어서 실용적이다.  
명령행으로 인수를 전달하는 방식은 즉시 동작하여 효율은 좋으나, 사용자가 사용법을 숙지해야 하므로 직관적이고 정확한 형식을 갖추기는 어렵다. 인수보다는 질움을 하고 직접 입력받는게 번거롭지만 정확하고 편리하겠다.  
