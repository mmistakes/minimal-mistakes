---
layout: single
title: "[파이썬] lambda & apply 사용법"
categories: python
tag: [python]
toc: true
author_profile: true
---

### lambda & apply 사용이유

데이터 전처리 과정에서 `DataFrame`을 원하는 대로 조작해야 할 경우가 생긴다. 여러가지 방법들 중에 apply() 함수와 lambda 사용법은 자주 사용한다.

### lambda

lambda 매개변수 : 표현식

```python
def add(x, y):
    return x + y

add(1, 2)
```

```
30
```

두 수를 더하는 함수로 def()같은 경우 함수의 이름을 만들어야 되는데 lambda는 함수의 이름을 정의해주지 않아도 된다.
또한 코드가 3줄에서 1줄로 코드도 짧아진다.

```python
(lambda x,y : x + y)(1,2)
```

```
3
```

### apply

`DataFrame`을 조작하다보면 내가 정의한 함수에 따라 데이터프레임의 값들을 변경하고 싶을때 사용된다.

```python
import pandas as pd

date_list = [{'yyyy-mm-dd': '2000-06-27'},
         {'yyyy-mm-dd': '2002-09-24'},
         {'yyyy-mm-dd': '2005-12-20'}]
df = pd.DataFrame(date_list, columns = ['yyyy-mm-dd'])
df
```

![image](https://user-images.githubusercontent.com/100071667/219605044-b5433e13-817a-4294-a00c-cf71a317834a.png)

```python
def extract_year(row):
    return row.split('-')[0]

df['year'] = df['yyyy-mm-dd'].apply(extract_year)
df
```

![image](https://user-images.githubusercontent.com/100071667/219605580-7aa89344-defe-4875-8ed9-0b4de44a374c.png)


### lambda & apply 함께 사용

```python
df['year'] = df['yyyy-mm-dd'].apply(lambda row : row.split('-')[0])
df
```

![image](https://user-images.githubusercontent.com/100071667/219605580-7aa89344-defe-4875-8ed9-0b4de44a374c.png)

위와 똑같은 결과를 얻을 수 있다.

```python
df['age'] = df['year'].apply(lambda year : 2023 - int(year))
df
```

![image](https://user-images.githubusercontent.com/100071667/219607355-578beb3d-8cce-48ec-a512-4b592e7f50bc.png)













