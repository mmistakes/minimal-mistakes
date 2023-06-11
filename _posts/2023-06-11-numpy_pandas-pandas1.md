---
layout: single
title: pandas 1. basic and attributes
tags: numpy_pandas
---

https://pandas.pydata.org/docs/ 참고

## pandas 1. basic and attributes


## 예제 5_1
```python
'''
pandas Series : basic and attributes
'''
import numpy as np
import pandas as pd

def testPd1():
    ser_a = pd.Series(
        np.array([1,2,3,4,5]), # data
        index=['a','b','c','d','e'], # index - key값은 다 달라야 한다
        dtype=np.float64) # element data type
    #print('series a[]', ser_a, sep='\n')

    #print('The index structure')
    #print(ser_a.index)

    print('1:', ser_a[1])
    print('2:', ser_a['b'])

    # attributes
    print('ndim',ser_a.ndim,'size',ser_a.size,'nbytes',ser_a.nbytes,'shape',ser_a.shape,sep='\n')
    print('values :',ser_a.values)
    print('empty :',ser_a.empty)

    # at, iat, loc, iloc
    print('1-th element:',ser_a.at['a'])
    print('1-th element:',ser_a.iat[1])
    print('group element:',ser_a.loc[:'c'],sep='\n')
    print('group element:',ser_a.iloc[:2],sep='\n')

    # index가 없는 경우
    ser_a1 = pd.Series(['1','2','3','4'])
    print(ser_a1[0])
    print(ser_a1.at[2])
    print(ser_a1.iat[2]) # 기본값이 숫자로 01234인듯?

    return None

def testPd2():
    df_A = pd.DataFrame(
        [[1,2,3,4],[2,3,4,5]], # data
        #index=['1st','2nd'], # index(row)
        columns=['col1','col2','col3','col4'] # columns
    )
    print('df_A :\n',df_A)

    # implicit
    # print(df_A[1])
    print(df_A['col2']) # col 단위로 먼저 잘라야된다
    # Series를 가져오게 된다
    print(df_A['col2'][1]) #Series로 가져오면 인덱스로 접근 가능하지만

    # explicit
    #print(df_A.at['1st','col2'])
    print(df_A.loc[:,:'col2'].iat[1,1])
    # attribute임에 유의 - 결과가 값이다. doc 참고

    # index도 attribute - 결과가 값이다.
    print(df_A.index) # range index..

    return None

def main():
    testPd1()
    print('---------------')
    testPd2()
    return None

if __name__ == '__main__':
    main()
```
```
1: 2.0
2: 2.0
ndim
1
size
5
nbytes
40
shape
(5,)
values : [1. 2. 3. 4. 5.]
empty : False
1-th element: 1.0
1-th element: 2.0
group element:
a    1.0
b    2.0
c    3.0
dtype: float64
group element:
a    1.0
b    2.0
dtype: float64
1
3
3
---------------
df_A :
    col1  col2  col3  col4
0     1     2     3     4
1     2     3     4     5
0    2
1    3
Name: col2, dtype: int64
3
3
RangeIndex(start=0, stop=2, step=1)

```


## 예제 5_2

```python
import numpy as np
import pandas as pd

# read a CSV file => inject the CSV file into a Dataframe
def testpd1():
    # new data type in form of dictionary
    dt_crimes = {
        # 'column_name' : data_type
        'cdatetime': np.str_,
        'address': np.str_,
        'district':np.int8,
        'beat':np.object_,
        'grid':np.str_,
        'crimedescr':np.str_,
        'ucr_ncic_code':"S4",
        'latitude':np.float32,
        'longitude':np.float32
    }

    crime_csv_path = "./SacramentocrimeJanuary2006.csv"
    df_csv = pd.read_csv(crime_csv_path,dtype=dt_crimes,sep=",")
    print('head :\n',df_csv.head())
    # 유닉스 명령어 head tail default 5줄

    print(df_csv.dtypes)
    #print('Dataframd Size = ',df_csv.memory_usage())
    #print(df_csv.size)

    print('length =',df_csv.iloc[0,:].nbytes) # Series 의 attribute

    return None
    
def testpd2():
    csv_path = './ratings.csv'
    dt_ratings = {
    #    userId,movieId,rating,timestamp
        'userId':'S8',
        'movieId':'S8',
        'rating':np.float16,
        'timestamp':np.int64
    }
    df_ratings = pd.read_csv(csv_path,dtype=dt_ratings)
    #print(df_ratings.tail())
    #print(df_ratings.dtypes)
    
    print(df_ratings.index)
    print(df_ratings.columns)
    
    row_1 = df_ratings.iloc[1]
    print('row_1 :\n',row_1)
    print('row_1[1] :\n',row_1[1]) # 한줄이라서 Series로 변해서 가능. 그러나 쓰지말것. iat iloc 쓰기
    print('rating' in row_1)
    print(row_1['rating'])
    return None

def testpd3():
    crime_xls_file   = "./SacramentocrimeJanuary2006.xls"
    df_csv = pd.read_excel(crime_xls_file)
    print('head :\n',df_csv.head())
    return None

def main():
    testpd1()
    print('--------------')
    testpd2()
    print('--------------')
    testpd3()
    return None

if __name__ == '__main__':
    main()
```
```
head :
      cdatetime              address  district  ... ucr_ncic_code   latitude   longitude
0  1/1/06 0:00   3108 OCCIDENTAL DR         3  ...       b'2404'  38.550419 -121.391418
1  1/1/06 0:00  2082 EXPEDITION WAY         5  ...       b'2204'  38.473499 -121.490189
2  1/1/06 0:00           4 PALEN CT         2  ...       b'2404'  38.657845 -121.462097
3  1/1/06 0:00       22 BECKFORD CT         6  ...       b'2501'  38.506775 -121.426949
4  1/1/06 0:00     3421 AUBURN BLVD         2  ...       b'2299'  38.637447 -121.384613

[5 rows x 9 columns]
cdatetime         object
address           object
district            int8
beat              object
grid              object
crimedescr        object
ucr_ncic_code     object
latitude         float32
longitude        float32
dtype: object
length = 72
--------------
RangeIndex(start=0, stop=25000095, step=1)
Index(['userId', 'movieId', 'rating', 'timestamp'], dtype='object')
row_1 :
 userId             b'1'
movieId          b'306'
rating              3.5
timestamp    1147868817
Name: 1, dtype: object
row_1[1] :
 b'306'
True
3.5
--------------
head :
              cdatetime              address  district  ... ucr_ncic_code   latitude   longitude       
0  2001-01-06 00:00:00   3108 OCCIDENTAL DR         3  ...          2404  38.550420 -121.391416        
1  2001-01-06 00:00:00  2082 EXPEDITION WAY         5  ...          2204  38.473501 -121.490186        
2  2001-01-06 00:00:00           4 PALEN CT         2  ...          2404  38.657846 -121.462101        
3  2001-01-06 00:00:00       22 BECKFORD CT         6  ...          2501  38.506774 -121.426951        
4  2001-01-06 00:00:00     3421 AUBURN BLVD         2  ...          2299  38.637448 -121.384613        

[5 rows x 9 columns]
```


## 예제 5_3 (loc,iloc,at,iat)

```python
import numpy as np
import pandas as pd

def testpd1():
    #crime_loc
    crime_loc = {
        'latitude':[38.65042047,
                    37.47350069,
                    38.65784584,
                    38.50677377],
        'longitude':[-121.3914158,
                     -121.4901858,
                     -121.4621009,
                     -121.4269508]
    }
    #df_crime_loc
    df_crime_loc = pd.DataFrame(crime_loc)
    #print(df_crime_loc)
    #print(df_crime_loc.head())
    print(df_crime_loc.describe())
    print('')

    '''
    sr_df_crime_loc_lat = df_crime_loc['latitude']
    # descriptive statistics
    # min max mean std mode median
    sr_min = sr_df_crime_loc_lat.min()
    print(sr_min)
    sr_mean = sr_df_crime_loc_lat.mean()
    print(sr_mean)
    sr_mode = sr_df_crime_loc_lat.mode()
    print(sr_mode)
    sr_median = sr_df_crime_loc_lat.median()
    print(sr_median)

    # 행을 가져오기
    tmp = df_crime_loc.iloc[1]
    print(tmp.mean())
    '''

    # list the ranking
    print(df_crime_loc[['latitude']].rank())
    # crime location.latitude > 38.3

    # df_crime_loc['check'] = df_crime_loc[['latitude']] > 38.6 # 열 하나를 추가한다.
    df_crime_loc_tag = df_crime_loc[['latitude']] > 38.6
    print(df_crime_loc_tag)
    print(df_crime_loc_tag.any())
    # result
    print(df_crime_loc[df_crime_loc_tag])
    return None

def main():
    testpd1()
    return None

if __name__ == '__main__':
    main()
```

```
        latitude   longitude
count   4.000000    4.000000
mean   38.322135 -121.442663
std     0.570013    0.042854
min    37.473501 -121.490186
25%    38.248456 -121.469122
50%    38.578597 -121.444526
75%    38.652277 -121.418067
max    38.657846 -121.391416

   latitude
0       3.0
1       1.0
2       4.0
3       2.0
   latitude
0      True
1     False
2      True
3     False
latitude    True
dtype: bool
    latitude  longitude
0  38.650420        NaN
1        NaN        NaN
2  38.657846        NaN
3        NaN        NaN
```

## 예제 5_4 (trim)

```python
import numpy as np
import pandas as pd

# read a CSV file => inject the CSV file into a Dataframe
def testpd1():
    crime_csv_path = "./SacramentocrimeJanuary2006.csv"
    df_csv = pd.read_csv(crime_csv_path,sep=",")
    #print(df_crime)
    #print(df_csv.head())
    
    # trim a Series named 'address'
    sr_x = df_csv[['address']]
    print(sr_x)
    #trim a DataFrame named 'address, crimedescr, grid'
    
    y = df_csv[['address','crimedescr','grid']]
    print(y)
    return None

def main():
    testpd1()
    return None

if __name__ == '__main__':
    main()
```
```
                                address
0                    3108 OCCIDENTAL DR
1                   2082 EXPEDITION WAY
2                            4 PALEN CT
3                        22 BECKFORD CT
4                      3421 AUBURN BLVD
...                                 ...
7579                     26TH ST / G ST
7580                 4011 FREEPORT BLVD
7581                     30TH ST / K ST
7582                 5303 FRANKLIN BLVD
7583  COBBLE COVE LN / COBBLE SHORES DR

[7584 rows x 1 columns]
                                address                     crimedescr  grid
0                    3108 OCCIDENTAL DR  10851(A)VC TAKE VEH W/O OWNER  1115
1                   2082 EXPEDITION WAY     459 PC  BURGLARY RESIDENCE  1512
2                            4 PALEN CT  10851(A)VC TAKE VEH W/O OWNER   212
3                        22 BECKFORD CT   476 PC PASS FICTICIOUS CHECK  1443
4                      3421 AUBURN BLVD   459 PC  BURGLARY-UNSPECIFIED   508
...                                 ...                            ...   ...
7579                     26TH ST / G ST  594(B)(2)(A) VANDALISM/ -$400   728
7580                 4011 FREEPORT BLVD      459 PC  BURGLARY BUSINESS   957
7581                     30TH ST / K ST        TRAFFIC-ACCIDENT INJURY   841
7582                 5303 FRANKLIN BLVD        3056 PAROLE VIO - I RPT   969
7583  COBBLE COVE LN / COBBLE SHORES DR    TRAFFIC-ACCIDENT-NON INJURY  1294

[7584 rows x 3 columns]
```