---
layout: single
title: '플레이데이터 2주차 회고 '
categories: playdata
tag: [회고]
author_profile: false
published: true
sidebar:
    nav: "counts"
---

어느덧 플레이데이터 엔지니어링 부트캠프를 들은지 2주차 회고를 써야할 때이다. 순식간에 2024년도 다가왔다..

2주차도 1주차와 마찬가지로 파이썬 기본 문법에 대해 수강했다. 데이터엔지니어링 커리큘럼 상 파이썬 파트는 거의 끝맏쳤다. 

나는 이전 부트캠프와 학부때 전공 수업으로 파이썬을 수강했기 때문에 1주차에는 수업 내용의 90%는 이미 알고있던 내용이라 가벼운 마음으로 들었지만 2주차부터는 배웠지만 잊고있었던, 잘못 이해하고 넘어갔던 내용들이 나오기 시작했다. 

예를들어 파이썬 기본 메소드인 sort()가 있단건 알고있지만 sort(key = [정렬기준]) kwy 값을 기준으로 정렬할 수 다는 내용을 까먹고 있었다..

그 외에도 <span style = "background : #F1F5FE; font-weight:bold;">fiter와 map의 차이, 가변인자, class 메소드(@classmethod), static 메소드(@staticmethod)</span> 등 알지만 모르는 새로운 내용들을 다시 공부하는데 집중했다. 


## 2주차 학습 내용 정리 

### 가변인자(Var args) 파라미터
가변인자(Var args) 파라미터는 argument로 여러개의 값을 전달하면 tuple 이나 dictionary로 묶어서 받을 수록 선언하는 parameter 이다. 

*변수명은 전달된 값을 tuple로 받아서 처리하므로  positional arguments 이며, 관례적으로 변수명은 <span style = "color : #3E49E6; font-weight:bold;" >*args</span>로 표현한다. 

----

예를들어 3명의 사람의 나이를 더하는 덧셈 함수가 있다고 생각해보자!

```python
def add(n1, n2, n3):
    return n1+n2+n3 
```
세명의 나이를 입력하면 모든 사람의 나이를 더한 값이 출력된다.

![Alt text]({{site.url}}/images/2024-01-05-playdata-weekly2-remind/w2_add_func.png){: .align-center .img-width-half} 

지금은 임의로 세개의 사람의 나이만 입력하지만 만약 난이를 더하고 싶은 사람의 수를 제한하지 않을려면 어떻게 해야할까?

그럴때 ar

