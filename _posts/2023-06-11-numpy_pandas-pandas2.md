---
layout: single
title: pandas 2. sql, concatenate, merge
tags: numpy_pandas
---
    
## pandas 2. sql, concatenate, merge


## 예제 5_5
```python
import numpy as np
import pandas as pd

def testpd1():
    crime_csv_path = "./SacramentocrimeJanuary2006.csv"
    df_csv = pd.read_csv(crime_csv_path,sep=",")
    # pick a column named 'beat' = SELECT * FROM CRIMES WHERE BEAT = "3C"
    #print(df_csv.head())
    beat_3c = df_csv[['beat']] == '3C        '
    # filter 
    df_beat_3c = df_csv[beat_3c]
    print(df_beat_3c)

    df_csv['3C_beat'] = beat_3c
    print(df_csv)

    print(df_csv.index)
    idx = df_csv.index
    print(idx.max())

    df1 = df_csv.drop(columns=['3C_beat'])
    print(df1.head())

    '''
    del_rows = [0,2]
    df2 = df_csv.drop(index=del_rows)
    '''

    return None

def testpd2():
    '''
    student_csv_file = "./student.csv"
    df_student = pd.read_csv(student_csv_file,sep=",")
    #print(df_student)

    df_gb_years = df_student.groupby('years')
    print(df_gb_years)          # <= groupby
                                # SELECT * FROM STUDENT GROUP BY YEARS
    print(df_gb_years.mean())   # <= aggregate by mean() <= general function
    print(df_gb_years.count())
    '''
    student_csv_file1 = "./student_sql.csv"
    dt_st1 = {
        #col_name:type
        'SID':np.int32,
        'SName':np.unicode_,
        'DepId':np.unicode_
    }

    df_st1 = pd.read_csv(student_csv_file1,sep=",",dtype=dt_st1)
    df_st2 = pd.read_csv(student_csv_file1,sep=",",dtype=dt_st1)
    print(df_st1)

    # concat = st1 || st2 with option axis = 0, axis = 1
    df_st = pd.concat([df_st1,df_st2])
    print('Concatenate : st1 || st2(row)\n',df_st) # axis = 0 (row 기준으로, hstack과 유사)
    df_st = pd.concat([df_st1,df_st2],axis=1)
    print('Concatenate : st1 || st2(column)\n',df_st) # axis = 1 (col 기준으로, vstack과 유사)

    student_csv_file2 = "./depart_sql.csv"
    dt_dep = {
        'DId':np.unicode_,
        'DName':np.unicode_
    }
    df_st2 = pd.read_csv(student_csv_file2,sep=",",dtype=dt_dep)
    df_school = pd.concat([df_st1,df_st2],axis=0) # axis = 0 (row의 기준)
    print('Concatenate : st1 || dep (row)',df_school)
    df_school = pd.concat([df_st1,df_st2],axis=1,join='inner') # axis = 1, join옵션 주면 NaN줄만 없어진다
    print('Concatenate : st1 || dep (col)',df_school)

    return None

def testpd3():
    # read student & depart
    # make df
    student_csv_file1 = "./student_sql.csv"
    dt_st1 = {
        #col_name:type
        'SID':np.int32,
        'SName':np.string_,
        'DepId':np.string_
    }
    df_st1 = pd.read_csv(student_csv_file1,sep=",",dtype=dt_st1)

    student_csv_file2 = "./depart_sql.csv"
    dt_dep = {
        'DId':np.string_,
        'DName':np.string_
    }
    df_dep = pd.read_csv(student_csv_file2,sep=",",dtype=dt_dep)
    print(df_st1)
    print(df_dep)
    
    # merge
    df_merge = pd.merge(df_st1, df_dep,left_on='DepId', right_on='DId',how='inner')
    #df_school = pd.merge(df_st1,df_dep, left_on="depid", right_on="did")
    print(df_merge)

    return None

def main():
    testpd1()
    print('-----------')
    testpd2()
    print('-----------')
    testpd3()
    return None

if __name__ == '__main__':
    main()
```
```
     cdatetime address  district        beat  grid crimedescr  ucr_ncic_code  latitude  longitude
0          NaN     NaN       NaN  3C           NaN        NaN            NaN       NaN        NaN      
1          NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      
2          NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      
3          NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      
4          NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      
...        ...     ...       ...         ...   ...        ...            ...       ...        ...      
7579       NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      
7580       NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      
7581       NaN     NaN       NaN  3C           NaN        NaN            NaN       NaN        NaN      
7582       NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      
7583       NaN     NaN       NaN         NaN   NaN        NaN            NaN       NaN        NaN      

[7584 rows x 9 columns]
          cdatetime                            address  district  ...   latitude   longitude 3C_beat   
0       1/1/06 0:00                 3108 OCCIDENTAL DR         3  ...  38.550420 -121.391416    True   
1       1/1/06 0:00                2082 EXPEDITION WAY         5  ...  38.473501 -121.490186   False   
2       1/1/06 0:00                         4 PALEN CT         2  ...  38.657846 -121.462101   False   
3       1/1/06 0:00                     22 BECKFORD CT         6  ...  38.506774 -121.426951   False   
4       1/1/06 0:00                   3421 AUBURN BLVD         2  ...  38.637448 -121.384613   False   
...             ...                                ...       ...  ...        ...         ...     ...   
7579  1/31/06 23:36                     26TH ST / G ST         3  ...  38.577832 -121.470460   False   
7580  1/31/06 23:40                 4011 FREEPORT BLVD         4  ...  38.537591 -121.492591   False   
7581  1/31/06 23:41                     30TH ST / K ST         3  ...  38.572030 -121.467012    True   
7582  1/31/06 23:45                 5303 FRANKLIN BLVD         4  ...  38.527187 -121.471248   False   
7583  1/31/06 23:50  COBBLE COVE LN / COBBLE SHORES DR         4  ...  38.479628 -121.528634   False   

[7584 rows x 10 columns]
RangeIndex(start=0, stop=7584, step=1)
7583
     cdatetime              address  district  ... ucr_ncic_code   latitude   longitude
0  1/1/06 0:00   3108 OCCIDENTAL DR         3  ...          2404  38.550420 -121.391416
1  1/1/06 0:00  2082 EXPEDITION WAY         5  ...          2204  38.473501 -121.490186
2  1/1/06 0:00           4 PALEN CT         2  ...          2404  38.657846 -121.462101
3  1/1/06 0:00       22 BECKFORD CT         6  ...          2501  38.506774 -121.426951
4  1/1/06 0:00     3421 AUBURN BLVD         2  ...          2299  38.637448 -121.384613

[5 rows x 9 columns]
-----------
    SId    SName DepId
0  1001    Alice   G01
1  1002      Kim   G01
2  1003     Choi   G02
3  1004      Bob   G07
4  1005     John   G03
5  1006  Charlie   G03
6  1007     Park   G03
7  1008      Lee   G05
Concatenate : st1 || st2(row)
     SId    SName DepId
0  1001    Alice   G01
1  1002      Kim   G01
2  1003     Choi   G02
3  1004      Bob   G07
4  1005     John   G03
5  1006  Charlie   G03
6  1007     Park   G03
7  1008      Lee   G05
0  1001    Alice   G01
1  1002      Kim   G01
2  1003     Choi   G02
3  1004      Bob   G07
4  1005     John   G03
5  1006  Charlie   G03
6  1007     Park   G03
7  1008      Lee   G05
Concatenate : st1 || st2(column)
     SId    SName DepId   SId    SName DepId
0  1001    Alice   G01  1001    Alice   G01
1  1002      Kim   G01  1002      Kim   G01
2  1003     Choi   G02  1003     Choi   G02
3  1004      Bob   G07  1004      Bob   G07
4  1005     John   G03  1005     John   G03
5  1006  Charlie   G03  1006  Charlie   G03
6  1007     Park   G03  1007     Park   G03
7  1008      Lee   G05  1008      Lee   G05
Concatenate : st1 || dep (row)       SId    SName DepId  DId   DName
0  1001.0    Alice   G01  NaN     NaN
1  1002.0      Kim   G01  NaN     NaN
2  1003.0     Choi   G02  NaN     NaN
3  1004.0      Bob   G07  NaN     NaN
4  1005.0     John   G03  NaN     NaN
5  1006.0  Charlie   G03  NaN     NaN
6  1007.0     Park   G03  NaN     NaN
7  1008.0      Lee   G05  NaN     NaN
0     NaN      NaN   NaN  G01   금융수학과
1     NaN      NaN   NaN  G02  응용통계학과
2     NaN      NaN   NaN  G03    경제학과
3     NaN      NaN   NaN  G04    경영학과
4     NaN      NaN   NaN  G05  컴퓨터공학과
5     NaN      NaN   NaN  G06     기악과
6     NaN      NaN   NaN  G07  동양어문학과
Concatenate : st1 || dep (col)     SId    SName DepId  DId   DName
0  1001    Alice   G01  G01   금융수학과
1  1002      Kim   G01  G02  응용통계학과
2  1003     Choi   G02  G03    경제학과
3  1004      Bob   G07  G04    경영학과
4  1005     John   G03  G05  컴퓨터공학과
5  1006  Charlie   G03  G06     기악과
6  1007     Park   G03  G07  동양어문학과
-----------
    SId    SName DepId
0  1001    Alice   G01
1  1002      Kim   G01
2  1003     Choi   G02
3  1004      Bob   G07
4  1005     John   G03
5  1006  Charlie   G03
6  1007     Park   G03
7  1008      Lee   G05
   DId   DName
0  G01   금융수학과
1  G02  응용통계학과
2  G03    경제학과
3  G04    경영학과
4  G05  컴퓨터공학과
5  G06     기악과
6  G07  동양어문학과
    SId    SName DepId  DId   DName
0  1001    Alice   G01  G01   금융수학과
1  1002      Kim   G01  G01   금융수학과
2  1003     Choi   G02  G02  응용통계학과
3  1004      Bob   G07  G07  동양어문학과
4  1005     John   G03  G03    경제학과
5  1006  Charlie   G03  G03    경제학과
6  1007     Park   G03  G03    경제학과
7  1008      Lee   G05  G05  컴퓨터공학과
```