---
layout: single
title: pandas 3.timestamp
tags: numpy_pandas
---
    
## pandas 3.timestamp

## 예제 5_6

```python
''' timestamp
'''
import numpy as np
import pandas as pd

def test_timestamp():
    # 1. read csv
    # 2. conver into a dataframe
    # 3. pick a timestamp column
    # 4. convert int64_timestamp to datetime_timestamp
    tags_path = './tags.csv'
    dt_tags = {
        'userId':np.int16,
        'movieId':np.int32,
        'tag':np.str_,
        'timestamp':np.int64
    }
    df_tags = pd.read_csv(tags_path,dtype=dt_tags,sep=',')
    print(df_tags.head(5))

    df_ts = pd.to_datetime(df_tags['timestamp'], unit="s")
    # unit = s,D, ns, us, ms, ...
    print(df_ts.head(5))

    return None

def main():
    test_timestamp()
    return None

if __name__ =='__main__':
    main()
```
```
   userId  movieId               tag   timestamp
0       3      260           classic  1439472355
1       3      260            sci-fi  1439472256
2       4     1732       dark comedy  1573943598
3       4     1732    great dialogue  1573943604
4       4     7569  so bad it's good  1573943455
0   2015-08-13 13:25:55
1   2015-08-13 13:24:16
2   2019-11-16 22:33:18
3   2019-11-16 22:33:24
4   2019-11-16 22:30:55
Name: timestamp, dtype: datetime64[ns]
```