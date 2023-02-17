---
layout: single
title:  "[이것이 데이터 분석이다(with 파이썬)] 멕시코풍 프랜차이즈 chipotle의 주문 데이터 분석하기"
categories: DataAnalysis
tag: [python, DataAnalysis]
toc: true
---


**[참고 깃허브 링크](<https://github.com/yoonkt200/python-data-analysis>)**
{: .notice--primary}


### chipotle 데이터셋의 기초 정보 출력하기

```python
import pandas as pd

file_path = '../data/chipotle.tsv'
chipo = pd.read_csv(file_path, sep = '\t')

print(chipo.shape)
print("------------------------------------")
print(chipo.info())
```

```
(4622, 5)
------------------------------------
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 4622 entries, 0 to 4621
Data columns (total 5 columns):
 #   Column              Non-Null Count  Dtype 
---  ------              --------------  ----- 
 0   order_id            4622 non-null   int64 
 1   quantity            4622 non-null   int64 
 2   item_name           4622 non-null   object
 3   choice_description  3376 non-null   object
 4   item_price          4622 non-null   object
dtypes: int64(2), object(3)
memory usage: 180.7+ KB
None
```


choice_description의 데이터는 3376개가 채워져 있고 1246개의 결측값이 존재한다는 것을 확인할 수 있다.

```python
print(chipo.columns)
print("------------------------------------")
print(chipo.index)
```

```
Index(['order_id', 'quantity', 'item_name', 'choice_description',
       'item_price'],
      dtype='object')
------------------------------------
RangeIndex(start=0, stop=4622, step=1)
```

chipotle 데이터셋 피처의 의미는 각각 다음과 같다.

- order_id : 주문 번호
- quantity : 아이템의 주문 수량
- item_name : 주문한 아이템의 이름
- choice_description : 주문한 아이템의 상세 선택 옵션
- item_price : 주문 아이템의 가격 정보

```python
#order_id는 숫자의 의미를 가지지 않기 때문에 str로 변환해준다.
chipo['order_id'] = chipo['order_id'].astype(str)
print(chipo.describe()) # chipo 데이터 프레임에서 수치형 피처들의 기초 통계량 확인
```

아이템의 평균 주문 수량(mean)은 약 1.07이라는 것을 알 수 있다.
즉 대부분 1개 정도만 주문했고 `한 사람이 같은 메뉴를 여러개 구매하는 경우는 많지 않다.`라는 인사이트를 얻을 수 있다.

### 가장 많이 주문한 item

```python
# enumerate 사용
item_count = chipo['item_name'].value_counts()[:10]
for idx, (val,cnt) in enumerate(item_count.iteritems(), 1):
    print("TOP",idx,":",val,cnt)
```

```
TOP 1 : Chicken Bowl 726
TOP 2 : Chicken Burrito 553
TOP 3 : Chips and Guacamole 479
TOP 4 : Steak Burrito 368
TOP 5 : Canned Soft Drink 301
TOP 6 : Steak Bowl 211
TOP 7 : Chips 211
TOP 8 : Bottled Water 162
TOP 9 : Chicken Soft Tacos 115
TOP 10 : Chips and Fresh Tomato Salsa 110
```

value_counts()함수를 적용하여 'Chicken Bowl'이 가장 많이 주문한 아이템인 것을 확인할 수 있다.


###  아이템별 주문 총량 시각화하여 보기

아이템별 주문의 총량을 막대 그래프를 이용하여 시각화해볼 수 있다. tolist()와 넘파이의 arrange()함수를 이용한다.

```python
%matplotlib inline
import numpy as np
import matplotlib.pyplot as plt

item_name_list = item_quantity.index.tolist()
x_pos = np.arange(len(item_name_list))
order_cnt = item_quantity.values.tolist()

plt.bar(x_pos, order_cnt)
plt.ylabel('ordered_item_count')
plt.title('Distribution of all orderd item')
 
plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/219539825-9cdc4ef5-6fea-460f-bfcb-48f5a346b70c.png)

### apply()와 lamda를 이용해 데이터 전처리하기

```python
# column 단위 데이터에 apply 함수로 전처리를 적용한다.
chipo['item_price'] = chipo['item_price'].apply(lambda x: float(x[1:]))
chipo.describe()
```

![image](https://user-images.githubusercontent.com/100071667/219540571-47f3548a-b0ef-483a-865b-409a8b796fd6.png)

apply()와 lamda를 이용해 가격을 나타내는 숫자 앞에 '$' 기호를 제거하고 전처리를 해준다.

### 한 주문에 10달러 이상 지불한 주문번호(id) 출력하기

```python
chipo_orderid_group = chipo.groupby('order_id').sum()
results = chipo_orderid_group[chipo_orderid_group.item_price >= 10]

print(results[:10])
print(results.index.values)
```

```
          quantity  item_price
order_id                      
1                4       11.56
10               2       13.20
100              2       10.08
1000             2       20.50
1001             2       10.08
1002             2       10.68
1003             2       13.00
1004             2       21.96
1005             3       12.15
1006             8       71.40
['1' '10' '100' ... '997' '998' '999']
```

order_id를 기준으로 그룹을 만들어 합계를 계산한다. 그 후 결과에서 10 이상인 값을 펄터링해줍니다. 최종결과인 results의 index.values를 출력하면 한 주문에 10달러 이상 지불한 id를 확인해볼 수 있다.

### 각 아이템의 가격 구하기

1. chipo[chipo.quantity == 1]으로 동일 아이템을 1개만 구매한 주문을 선별한다.
2. item_name을 기준으로 groupby 연산을 수행한 뒤, min()함수로 각 그룹별 최저가를 계산한다.
3. item_price를 기준으로 정렬하는 sort_values()함수를 적용한다. `sort_values()`는 `series 데이터`를 정렬해주는 함수이다.

```python
chipo_one_item = chipo[chipo.quantity == 1]
price_per_item = chipo_one_item.groupby('item_name').min()
price_per_item.sort_values(by = "item_price", ascending = False)[:10]
```

![image](https://user-images.githubusercontent.com/100071667/219542602-8d340173-066d-497c-a47f-a1ba52a19c67.png)

#### 시각화하기


##### 막대 그래프

```python
#아이템 가격 분포 그래프를 출력
item_name_list = price_per_item.index.tolist()
x_pos = np.arange(len(item_name_list))
item_price = price_per_item['item_price'].tolist()

plt.bar(x_pos, item_price, align='center')
plt.ylabel('item price($)')
plt.title('Distribution of item price')
 
plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/219543333-915230b1-bbea-4020-98a4-b89462351658.png)

##### 히스토그램

```python
# 아이템 가격 히스토그램을 출력합니다.
plt.hist(item_price)
plt.ylabel('counts')
plt.title('Histogram of item price')

plt.show()
```

![image](https://user-images.githubusercontent.com/100071667/219543368-35fef280-1616-4c39-8caa-5ba2a249945e.png)

### 가장 비싼 주문에서 아이템이 총 몇 개 팔렸는지 구하기

```python
chipo.groupby('order_id').sum().sort_values(by='item_price', ascending=False)[:5]
```

![image](https://user-images.githubusercontent.com/100071667/219543708-d26eb6eb-2f11-4a9a-8d05-5bf27a1517da.png)

---

공부한 전체 코드는 깃허브에 올렸습니다.


**[깃허브 주소](<https://github.com/mgskko/Python_Data_Analysis/blob/main/chapter1/01-chipotle-eda.ipynb>)**
{: .notice--primary}

