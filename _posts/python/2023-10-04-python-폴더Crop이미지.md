---
title: "python 폴더 내 이미지 자르기"
categories:
  - python

tags: [python, openCV]
toc : true
comments: true
---
# python 폴더 내 이미지 읽기

```python
import cv2

import os
 
root_dir = 'CropImage' # 디렉토리
 
img_path_list = []
possible_img_extension = ['.jpg', '.jpeg', '.JPG', '.bmp', '.png'] # 이미지 확장자들
 
for (root, dirs, files) in os.walk(root_dir):
    if len(files) > 0:
        for file_name in files:
            if os.path.splitext(file_name)[1] in possible_img_extension:
                img_path = root + '/' + file_name
                
                # 경로에서 \를 모두 /로 바꿔줘야함
                img_path = img_path.replace('\\', '/') # \는 \\로 나타내야함         
                img_path_list.append(img_path)
                             
print(img_path_list)


x:int= 340
y:int= 130

for image in img_path_list:
    cv2.imshow("test",cv2.imread(image))
    cv2.waitKey(0)

    save_image =image.replace("Crop","Save")
    cv2.imwrite(save_image,cv2.imread(image)[y:y+340,x:x+340])



```



# 출처
1. python 폴더 내 이미지 읽기 + 한글 이미지 읽기
https://bskyvision.com/entry/%EC%95%84%EC%9D%B4%EC%BD%98%EA%B3%BC-%ED%8C%8C%EB%B9%84%EC%BD%98%EC%9D%98-%EC%B0%A8%EC%9D%B4

https://bskyvision.com/entry/python-cv2imread-%ED%95%9C%EA%B8%80-%ED%8C%8C%EC%9D%BC-%EA%B2%BD%EB%A1%9C-%EC%9D%B8%EC%8B%9D%EC%9D%84-%EB%AA%BB%ED%95%98%EB%8A%94-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95

2. python 폴더 선택
https://cjsal95.tistory.com/35

