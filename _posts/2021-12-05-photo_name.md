---
layout: single
title:  "사진 이름 대량으로 변경하기"
categories : Python
tag : [python, pandas]
---

```python
import os
import glob
import pandas as pd
  
  
# 가져올 파일들이 있는 directory path 설정
# 파일명에서 한글 없게 처리
 
path_dir = "C:/Users/GD-hjim/Desktop/photo"
file_list = os.listdir(path_dir)       
file_list_png = [file for file in file_list if file.endswith(".png")]
print(file_list_png)
```



<img src="../../img/2021-12-05-photo_name/photo1-16387001826961.png" alt="photo1" style="zoom:67%;" />

.

.

```python
# 파이썬 기본 폴더에 저장
filenames = pd.Series(file_list_png)
filenames.to_excel("output.xlsx",index=False, header=False)
  
  
# old_filename에 긁어 온 파일명들, new_file_name에 바꿔 줄 파일명 넣고 세이브
  
# 엑셀 파일 열어서 체크
df = pd.read_excel('output.xlsx')
df
```

<img src="../../img/2021-12-05-photo_name/photo2.png" alt="photo2" style="zoom: 80%;" />

.

.

```python
#new filename이 겹치지 않도록 중복 체크 후 실행
df = pd.read_excel('output.xlsx')
old_filename = []
for a in df["old_filename"]:
    old_filename.append(a)
    
new_filename = []
for a in df["new_filename"]:
    new_filename.append(a)
dic = dict(zip(old_filename, new_filename))
   

#파일명 변경
for key in dic.keys():
    os.rename("C:/Users/GD-hjim/Desktop/photo/"+key, 
              "C:/Users/GD-hjim/Desktop/photo/"+dic[key])
```



.

.