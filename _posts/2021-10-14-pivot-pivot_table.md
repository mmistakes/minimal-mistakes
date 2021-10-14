---
layout: single
title:  "pivot 과 pivot_table의 차이를 공부"
categories: study
tag: [pandas]
toc_label: "Contents"
toc: true
toc_sticky: true
---

# pivot 과 pivot_table과의 차이를 공부

pivot과 pivot_table을 직접 실행보고 차이점을 공부해보자




```python
# 라이브러리 로드
import pandas as pd
import numpy as np
```


```python
# 예시 데이터프레임 생성

df = pd.DataFrame({'foo': ['one', 'one', 'one', 'two', 'two',
                           'two'],
                   'bar': ['A', 'B', 'C', 'A', 'B', 'C'],
                   'baz': [1, 2, 3, 4, 5, 6],
                   'zoo': ['x', 'y', 'z', 'q', 'w', 't']})
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>foo</th>
      <th>bar</th>
      <th>baz</th>
      <th>zoo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>one</td>
      <td>A</td>
      <td>1</td>
      <td>x</td>
    </tr>
    <tr>
      <th>1</th>
      <td>one</td>
      <td>B</td>
      <td>2</td>
      <td>y</td>
    </tr>
    <tr>
      <th>2</th>
      <td>one</td>
      <td>C</td>
      <td>3</td>
      <td>z</td>
    </tr>
    <tr>
      <th>3</th>
      <td>two</td>
      <td>A</td>
      <td>4</td>
      <td>q</td>
    </tr>
    <tr>
      <th>4</th>
      <td>two</td>
      <td>B</td>
      <td>5</td>
      <td>w</td>
    </tr>
    <tr>
      <th>5</th>
      <td>two</td>
      <td>C</td>
      <td>6</td>
      <td>t</td>
    </tr>
  </tbody>
</table>
</div>




```python
# pivot의 내용보기
df.pivot?
```


```python
# df.pivot(index=None, columns=None, values=None) -> 'DataFrame'

df.pivot(index='foo', columns='bar', values='baz')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>bar</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
    <tr>
      <th>foo</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>one</th>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>two</th>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>




```python
#pivot_table 내용보기
df.pivot_table?
```


```python
# df.pivot_table(
#     values=None,
#     index=None,
#     columns=None,
#     aggfunc='mean',
#     fill_value=None,
#     margins=False,
#     dropna=True,
#     margins_name='All',
#     observed=False,
# ) -> 'DataFrame'

df.pivot_table(index='foo', columns='bar', values='baz')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>bar</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
    <tr>
      <th>foo</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>one</th>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>two</th>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>



## pivot 과 pivot_table의 차이!!
pivot은 연산을 하지않고 데이터 변환만 하고 pivot_table은 연산과 데이터 변환을 함께 할 수 있음

## pivot 으로 여러가지 해보기

Signature: df.pivot(index=None, columns=None, values=None) -> 'DataFrame'
Docstring:
Return reshaped DataFrame organized by given index / column values.

Reshape data (produce a "pivot" table) based on column values. Uses
unique values from specified `index` / `columns` to form axes of the
resulting DataFrame. This function does not support data
aggregation, multiple values will result in a MultiIndex in the
columns. See the :ref:`User Guide <reshaping>` for more on reshaping.


```python
df.pivot(index='foo', columns='bar', values='baz')
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>bar</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
    <tr>
      <th>foo</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>one</th>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>two</th>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.pivot(index='foo', columns='bar')['baz']
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th>bar</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
    <tr>
      <th>foo</th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>one</th>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>two</th>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>



value 값을 대괄호 형태로 표현 할 수 있음


```python
df.pivot(index='foo', columns='bar', values=['baz', 'zoo'])
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead tr th {
        text-align: left;
    }
    
    .dataframe thead tr:last-of-type th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr>
      <th></th>
      <th colspan="3" halign="left">baz</th>
      <th colspan="3" halign="left">zoo</th>
    </tr>
    <tr>
      <th>bar</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
    </tr>
    <tr>
      <th>foo</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>one</th>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>x</td>
      <td>y</td>
      <td>z</td>
    </tr>
    <tr>
      <th>two</th>
      <td>4</td>
      <td>5</td>
      <td>6</td>
      <td>q</td>
      <td>w</td>
      <td>t</td>
    </tr>
  </tbody>
</table>
</div>



두 개 이상의 값을 할 때는 리스트 형태로 표현

## pivot_table로 여러가지 해보기!!

Signature:
df.pivot_table(
    values=None,
    index=None,
    columns=None,
    aggfunc='mean',
    fill_value=None,
    margins=False,
    dropna=True,
    margins_name='All',
    observed=False,
) -> 'DataFrame'
Docstring:
Create a spreadsheet-style pivot table as a DataFrame.

The levels in the pivot table will be stored in MultiIndex objects
(hierarchical indexes) on the index and columns of the result DataFrame.


```python
df = pd.DataFrame({"A": ["foo", "foo", "foo", "foo", "foo", "bar", "bar", "bar", "bar"],
                   "B": ["one", "one", "one", "two", "two", "one", "one", "two", "two"],
                   "C": ["small", "large", "large", "small", "small", "large", "small", "small", "large"],
                   "D": [1, 2, 2, 3, 3, 4, 5, 6, 7],
                   "E": [2, 4, 5, 5, 6, 6, 8, 9, 9]})
df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
      <th>C</th>
      <th>D</th>
      <th>E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>foo</td>
      <td>one</td>
      <td>small</td>
      <td>1</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>foo</td>
      <td>one</td>
      <td>large</td>
      <td>2</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>foo</td>
      <td>one</td>
      <td>large</td>
      <td>2</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>foo</td>
      <td>two</td>
      <td>small</td>
      <td>3</td>
      <td>5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>foo</td>
      <td>two</td>
      <td>small</td>
      <td>3</td>
      <td>6</td>
    </tr>
    <tr>
      <th>5</th>
      <td>bar</td>
      <td>one</td>
      <td>large</td>
      <td>4</td>
      <td>6</td>
    </tr>
    <tr>
      <th>6</th>
      <td>bar</td>
      <td>one</td>
      <td>small</td>
      <td>5</td>
      <td>8</td>
    </tr>
    <tr>
      <th>7</th>
      <td>bar</td>
      <td>two</td>
      <td>small</td>
      <td>6</td>
      <td>9</td>
    </tr>
    <tr>
      <th>8</th>
      <td>bar</td>
      <td>two</td>
      <td>large</td>
      <td>7</td>
      <td>9</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.pivot_table(df, values='D', index=['A', 'B'], columns=['C'], aggfunc=np.sum)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>C</th>
      <th>large</th>
      <th>small</th>
    </tr>
    <tr>
      <th>A</th>
      <th>B</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">bar</th>
      <th>one</th>
      <td>4.0</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>two</th>
      <td>7.0</td>
      <td>6.0</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">foo</th>
      <th>one</th>
      <td>4.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>two</th>
      <td>NaN</td>
      <td>6.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
pd.pivot_table(df, values='D', index=['A', 'B'], columns=['C'], aggfunc=np.sum, fill_value=0)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
    
    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>C</th>
      <th>large</th>
      <th>small</th>
    </tr>
    <tr>
      <th>A</th>
      <th>B</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="2" valign="top">bar</th>
      <th>one</th>
      <td>4</td>
      <td>5</td>
    </tr>
    <tr>
      <th>two</th>
      <td>7</td>
      <td>6</td>
    </tr>
    <tr>
      <th rowspan="2" valign="top">foo</th>
      <th>one</th>
      <td>4</td>
      <td>1</td>
    </tr>
    <tr>
      <th>two</th>
      <td>0</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>





21-10-14 Comments

> pivot과 pivot_table에대해서 연산의 차이에대해서 알게됨. 공부를하다가 numpy에대한 개념과 추가적인 공부가 필요!!
