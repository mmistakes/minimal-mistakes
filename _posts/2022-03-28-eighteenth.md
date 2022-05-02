---
layout: single
title: "음..넘~파이 판다스"
categories: study
tag: numpy,pandas
---
#### 넘파이
flatten()

2차원 구조
데이터 프레임: 여러개의 시리즈가 모여서 하나의 데이터 프레임이 된다.
인덱스 변수 값...

iloc은 인덱스값을 기준으로 접근

loc은 라벨값 기준으로 접근

칼럼을 추가할려면 칼럼을 이름을 적어주고 내용물을 적어주면된다.
그럼 행에 맞춰서 자동으로 추가된다. 
데이터프레임이름[추가할 컬럼]= 결과물

np.reshape('인자',(행,렬,축))
인자.reshape

np.mean('인자')
인자.mean

차원이 다른경우 브로드캐스팅이 지원되지 않는 경우가 있다.

np.concatenate((b.T, a), axis=1
t= 전치 행렬

브로드캐스팅은 shape가 다른배열간에도 연산이 가능하지만 
차원이 1이하면 가능| 차원의 축이 동일하면 가능

np.delete(arr,1,0)