---
layout: single
title: '플레이데이터 4주차 회고 '
categories: playdata
tag: [회고]
author_profile: false
published: false
sidebar:
    nav: "counts"
---

### SQL

#### select 결과를 DataFrame으로 로딩.
import pymysql

### Pandas

~~-  between()
s10[s10.between(2, 10)]  # 원소별로 2 ~ 10 사이에 있는지 확인~~

~~- astype() 
정수: int8(-128~127), int16(+-3만5천), int32(+-21억), int64(+-9경)
실수: float16, float32, float64
문자열: object
s = pd.Series([10_000_000, 2])
s.astype("int16")~~

~~- na_values
df_na = pd.read_csv("saved_data/grade_na.csv", na_values=["?", "모름"])~~

- read_html
wc_df = pd.read_html("https://ko.wikipedia.org/wiki/FIFA_%EC%9B%94%EB%93%9C%EC%BB%B5")
len(wc_df)

~~- info()
dataframe의 정보 -> 행/열에대한 정보
결측치가 있으면 int type 은 float으로 처리 
director_facebook_likes    4814 non-null   float64~~

~~- describe(include=[])
통계량을 볼 컬럼들의 타입을 지정 
카테고리 컬럼의 describe 를 보고싶을 때 사용 
df.describe(include=['object']).T~~

~~- drop labels
axis = 0 (행), 1(열)
이차원 리스트를 생각 : a[0][0] -> 행이 먼저 
grade2.drop(labels=[70, 80], axis=0)~~

~~- df.insert(삽입할 위치 index, 삽입할 열이름, 값)
grade.insert(0, 'His', [89, 29,])~~

~~- 조회
movie[movie.columns[[1, 3, 4, 7]]]
 movie.iloc[[1,5]] 가능~~

~~- select_dtypes
movie.select_dtypes(include="object").head()~~

~~- filter
movie.filter(items=['color', 'director'])
movie.filter(like='actor')
movie.filter(regex=r'actor_[123]_name') # actor + 1 or 2 or 3 + name~~ 

~~- loc, iloc
df.loc[index이름 , 컬럼이름]~~

~~- sort
df2 = m.sort_index()
df2.loc['A':'C']~~

~~- skipna, numeric_only
df.max(numeric_only=True, skipna=False) 
 na를 skip하지 않고 계산 => na가 있는 컬럼의 결과 -> na~~

- agg
컬럼별로 다른 집계

~~func = {
    "DEP_DELAY" : "mean",
    "AIR_TIME" : ["min", "max"]
}
key: 컬럼명, value: 통계량을 구하는 메소드 
df.agg(func)~~

- 사용자 정의 함수 적용
컬럼의 max, min 차이 계산
매개변수: Series - 컬럼, 반환: 집계결과 
def min_max_diff(col):
    return col.max() - col.min()

~~min_max_diff(df['AIR_TIME'])
df['AIR_TIME'].agg(min_max_diff)
df['AIR_TIME'].agg(["min", "max", min_max_diff])
df['AIR_TIME'].agg(lambda x: max(x) - min(x))
df['AIR_TIME'].agg(lambda col: col.max() - col.min())
df.select_dtypes(exclude="object").agg(["min", "max", min_max_diff, "mean"]).T~~

- pivot_table
df.pivot_table(
    index = 'AIRLINE',      # 행 
    columns= 'ORG_AIR',     # 열
    values='CANCELLED',     # 집계대상
    aggfunc='sum',          # 집계함수 (default : mean)
    margins=True ,          # 행,열 총 집계
    margins_name= '총계',   
   # fill_value=0            # 결측치 대체 
    )       

- apply
def func2(value, cnt):
    return value+cnt

df['A'].apply(func2, cnt=5)
- map, cut 

