---
title: "YoloV8 문서 따라해보기 -Segmentation"
categories:
  - YoloV8

tags: [YoloV8]
comments: true
---




목차
- 0. [기본 환경 세팅]
- 1. [Pose 데이터 활용해보기]



# 0. 가상환경 키기

가상 환경 만들기
conda create -n yolov8_segmentation python=3.10
conda activate yolov8_segmentation

---
* 참고 
콘다 업데이트
conda update -n base -c defaults conda

가상 환경 삭제 명령어
conda env remove -n yolov8_segmentation
---


```bash
conda activate yolov8_custom
```

 이전 포스팅을 참고하여 이미 설치된 가상환경을 활성화 해줍니다.

# 1.Pose 데이터 활용해보기

1. 기본 스크립트
```python
from ultralytics import YOLO

# Load a model
model = YOLO('yolov8n-pose.pt')  # load an official model

# Predict with the model
results = model('https://ultralytics.com/images/bus.jpg')  # predict on an image
```

python 스크립트만 입력해줘도 모델이 없으면 찾아서 업데이트 작업 진행해주고 참 좋은 기능이다. 

다만 해당 기본 스크립트는 결과 파일을 보여주지 않기 떄문에 조금에 수정을 해준다

2. 결과 영상 출력하기

```python
from ultralytics import YOLO
import cv2
# Load a model
model = YOLO('yolov8n-pose.pt')  # load an official model

# Predict with the model

model.predict(source = 'https://ultralytics.com/images/bus.jpg', show = True, save=True)
cv2.waitKey(0)
```

## 결과

![버스 자세](/assets/img/%EC%B7%A8%EB%AF%B8%EA%B0%9C%EB%B0%9C/YOLO/pose_bus.jpg)

![pushup pose](/assets/img/%EC%B7%A8%EB%AF%B8%EA%B0%9C%EB%B0%9C/YOLO/pushup.jpg)


* 개발 환경 목록

# 출처
1. yoloV8 포즈 자세
https://docs.ultralytics.com/tasks/pose/#train