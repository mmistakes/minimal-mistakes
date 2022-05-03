---
layout: single
title: "음..넘~파이, 클래스 복습"
categories: study
toc: true
tag: class, numpy
---

넘파이란?

@property 데코레이터 사용

format 복습
f string 복습

퍼스트 클래스 함수 

#### 클로저- 함수가 종료후 다른함수의 로컬변수를 기억할수가 있는지 알수있다.
```python
def superman(power):
	def marry_jane():
		print('i know you',power)
	return marry_jane

clark=superman('power overwall')
print(clark)
clark()

```
데코레이터- 함수 자체를 수정하지 않으면서 사람들이 많이 사용하는 기능들을 파있넝 ㅣ제공하는 방법으로 변경할때 사용

함수를 할당하고 나서 함수가 호출후 종료가 되고나서도 할당된 변수가 함수를 재활용이 가능하다.

Numpy : 선형대수 분석 라이브러리

인스턴스는 저장한 순서대로 출력된다.

인스턴스명을 알아야 출력이 가능한데 인스턴스 명을 모르고 출력할수 있는 방법

브로드캐스팅

ndarray도 시퀀스 데이터 타입이다. 인덱스 이용해서 자리값 불러올수 있다.

스칼라	상수
벡터	방향성 
매트릭스

().reshape(-1,2)
에서 -1가 존재하는 이유는 무엇인가?

슬라이싱 

넘파이도 기본적으로 랜덤메소드를 제공.... 

넘파이 시드값
랜덤 수 추출 random.choice


넘파이는 원칙적으로 지원하지않음

넘파이 슬라이싱
[:,:]
첫번째 행, 두번쨰 열

np.median(a)

np.std(a)

np.cumsum(a)

np.argmin(a)
np.argmax(a)

np.argsort


**슬라이싱에 익숙해지기 전까진 생략하지말고 명시적으로 코드를 작성해주는것이 실수를 방지하는 방법입니다.*