# Python Data Analysis Library - Pandas 2

## Groupby 1

- SQL groupby 명령어와 같은
- split -> apply -> combine
- 과정을 거쳐 연산함

```python
df.groupby("Team")["Points"].sum()
# Team : 묶음의 기준이 되는 컬럼
# Points : 연산을 적용받는 컬럼
```

| Points | Rank | Team   | Year |
| ------ | ---- | ------ | ---- |
| 876    | 1    | Riders | 2014 |
| 789    | 2    | Riders | 2015 |
| 863    | 2    | Devils | 2014 |
| 673    | 3    | Devils | 2015 |
| 741    | 3    | Kings  | 2014 |

- 결과:

| Team   | Points |
| ------ | ------ |
| Devils | 1536   |
| Kings  | 2285   |
| Riders | 3049   |
| Royals | 1505   |
| kings  | 812    |

- 한 개 이상의 column을 묶을 수 있음

```python
df.groupby(["Team", "Year"])["Points"].sum()
```

| Points | Rank | Team   | Year |
| ------ | ---- | ------ | ---- | --- |
| 876    | 1    | Riders | 2014 |
| 789    | 2    | Riders | 2015 |
| 863    | 2    | Devils | 2014 |
| 673    | 3    | Devils | 2015 |
| 741    | 3    | Kings  | 2014 | ``` |

결과:
| Team | Year | Points |
|--------|------|--------|
| Devils | 2014 | 863 |
| | 2015 | 673 |
| Kings | 2014 | 741 |
| | 2016 | 756 |
| | 2017 | 788 |
| Riders | 2014 | 876 |
| | 2015 | 789 |
| | 2016 | 694 |

### Hierarchical index

- Gruopby 명령의 결과물도 결국은 dataframe
- 두 개의 column으로 groupby를 할 경우, index가 두 개 생성
  | Team | Year | Points |
  |--------|------|--------|
  | Devils | 2014 | 863 |
  | | 2015 | 673 |
  | Kings | 2014 | 741 |
  | | 2016 | 756 |
  | | 2017 | 788 |
  | Riders | 2014 | 876 |
  | | 2015 | 789 |
  | | 2016 | 694 |

### unstack()

- Group으로 묶여진 데이터를 matrix 형태로 전환해줌

```python
h_index.unstack()
```

| Team   | Year | Points |
| ------ | ---- | ------ |
| Devils | 2014 | 863    |
| Devils | 2015 | 673    |
| Kings  | 2014 | 741    |
| Kings  | 2016 | 756    |
| Kings  | 2017 | 788    |
| Riders | 2014 | 876    |
| Riders | 2015 | 789    |
| Riders | 2016 | 694    |
| Riders | 2017 | 690    |
| Royals | 2014 | 701    |
| Royals | 2015 | 804    |
| kings  | 2015 | 812    |

결과:
| Year | 2014 | 2015 | 2016 | 2017 |
|--------|------|------|------|------|
| Team | | | | |
| Devils | 863.0| 673.0| NaN | NaN |
| Kings | 741.0| NaN | 756.0| 788.0|
| Riders | 876.0| 789.0| 694.0| 690.0|
| Royals | 701.0| 804.0| NaN | NaN |
| kings | NaN | 812.0| NaN | NaN |

### sort_index

```python
h_index.sort_index(level = 0)
```

| Team   | Year | Points |
| ------ | ---- | ------ |
| Devils | 2014 | 863    |
| Devils | 2015 | 673    |
| Kings  | 2014 | 741    |
| Kings  | 2015 | 812    |
| Kings  | 2016 | 756    |
| Kings  | 2017 | 788    |
| Riders | 2014 | 876    |
| Riders | 2015 | 789    |
| Riders | 2016 | 694    |
| Riders | 2017 | 690    |
| Royals | 2014 | 701    |
| Royals | 2015 | 804    |

```python
h_index.std(level=0)
```

| Team   |            |
| ------ | ---------- |
| Devils | 134.350288 |
| Kings  | 24.006943  |
| Riders | 88.567771  |

## Groupby 2

- Groupby에 의해 Split된 상태를 추출 가능함
