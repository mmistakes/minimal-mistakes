---
title: "[OpenCV] VideoCapture 되감기 "
date: 2023-06-13
last_modified_at: 2023-06-13
excerpt: ""
categories:
  - OpenCV
tags:
  - OpenCV

published: true
toc: true
toc_sticky: true
---

# VideoCapture 사용시 되감기 기능

Get을 이용하여 현재 프레임을 구한뒤 이전 프레임 값으로 변경 작업 진행하면 된다.


```python
next_frame = cap.get(cv2.CAP_PROP_POS_FRAMES)
current_frame = next_frame - 1
previous_frame = current_frame - 1

if previous_frame >= 0:
  cap.set(cv2.CAP_PROP_POS_FRAMES, previous_frame)
  ret, frame = cap.read()
```

# 참고
https://stackoverflow.com/questions/48025689/how-to-get-previous-frame-of-a-video-in-opencv-python