---
layout: default
title:  "자주 쓰는 pandas"
---


```python
# 자주 쓰는 것들

# merge
# to_datetime
# datetime 모듈
# dropna
# to_numeric
# 특정값으로 행 찾기
# 특정값 기준으로 정렬
# 값 내보내기
# 그룹바이 groupby
# loc과 iloc
```


```python
#merge

df3 = df1.merge(df2, on = 'team_id', how = 'left')

# df1이 원본, df2가 붙일 데이터, on = 기준이 될 값
# how = 'left'는 df1 기준으로 df2를 붙이고, how = 'right'는 df2를 기준으로 df1이 붙게 된다




#여러 개 데이터 프레임 붙이기
#키 값은 모두 team_id
from functools import reduce

data_frames = [bats_pivot, sps_pivot, rps_pivot, cp, deck_final, coach_pivot]
df_lineup = reduce(lambda left, right : pd.merge(left,right, on =['team_id'], how='outer'), data_frames)
```


```python
# to_datetime
df['crt_date'] = pd.to_datetime(df['crt_date'])

#보통 sql로 뽑아오면 object로 crt_date 값이 들어오게 돼서 변환 필요


#format_code
today = datetime.datetime.now()

today.strftime("%A, %B %dth %Y") → 요일, 월, 일, 연도
```


```python
#dropna

df2 = df1.dropna()
#값에 하나라도 Na가 있으면 다 날리기
 
df2 = df1.dropna(subset=['attendance'], inplace = True)  
#특정 컬럼에 Na 값이 있으면 삭제 시키기
```


```python
#to_numeric

df3['date_int'] = pd.to_numeric(df3['date'])
 
# 'date' 라는 열의 값을 숫자로 바꿔서 'date_int' 열로 추가
```


```python
#특정값 정렬

df4 = df4.sort_values(by = 'total_purchase', ascending = True)
# 'total_purchase' 기준으로 오름차순 (낮은 값부터)
 

df3 = df3.sort_values(by=(['total_purchase', 'attendance']), ascending = False)
# total_purchase로 한 번 정렬하고 다시 attendance로 정렬 / 내림 차순
```


```python
# 값 내보내기

dataframe = pd.DataFrame(df3)
dataframe.to_csv('result.txt', header = True, index = False)
```


```python
#group by

df2 = df1.groupby(['team_id', 'days']).agg({'profit':'sum'})

#새로운 행은 전체 합계값으로 만들기
df['total_purchase']= df.groupby('team_id')['price'].transform('sum')

```


```python
# 필터링

index로 필터링 : iloc

열의 값으로 필터링 : loc

https://azanewta.tistory.com/34
```
