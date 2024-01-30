---
title: "python OpenCV 마우스 이벤트
categories:
  - python

tags: [python, openCV]
toc : true
comments: true
---

## 개요
이미지 영역 설정하여 해당영역 비트 마스크 비교용 영역 만드는 코드

## 사용 방법

```
 python .\MakingBinaryfile.py [비트마스크 이미지 만들 원본 파일 ] [비트 마스크 이미지 파일 명]
```
 python .\MakingBinaryfile.py MQ4_RR_RH_SAMPLE.bmp  maskimage_MQ4_RR_RH.bmp

 ## 결과물 
 maskimage_2.bmp



```python
import cv2  
import numpy as np
import sys

original_file = sys.argv[1]
result_file = sys.argv[2]

def mouse_event(event, x, y, flags, param):
    global radius
    
    if event == cv2.EVENT_FLAG_LBUTTON:    
        cv2.circle(mask, (x, y), radius, (255, 255, 255), -1)
        
        cv2.imshow("maskimage",mask)
        result = cv2.bitwise_and(param, mask)
        cv2.imshow("bitwiseimage",result)
    elif event == cv2.EVENT_MOUSEWHEEL:
        if flags > 0:
            radius += 1
        elif radius > 1:
            radius -= 1

    elif event == cv2.EVENT_FLAG_RBUTTON:
        cv2.imwrite(result_file,mask)

radius = 3
image = cv2.imread(original_file)
mask = np.zeros(image.shape, dtype=np.uint8)

cv2.imshow("main_image",image)
cv2.setMouseCallback("main_image", mouse_event, image)

cv2.imshow("maskimage",mask)


cv2.waitKey(0)

```