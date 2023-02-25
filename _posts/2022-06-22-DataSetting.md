---
layout: single
title:  "object-detection Data & Label"
categories : labeling
tag : [python, data, object-detection, labeling]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=object-detection Data & Label&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)



## 1. Roboflow

link : [**Roboflow**](https://roboflow.com/)



- object-detection 관련 public image dataset이 많음

- 각 image data 마다 다양한 형태의 format 지원

  ![image-20220622123944463](/data/images/image-20220622123944463.png)

  - object-detection 모델마다 사용하기 쉬운 label format이 존재
  - Roboflow에서는 다양한 형태의 label format을 지원
  - 빠르게 모델을 사용할 데이터를 구할때 매우 유용함

- Public 데이터 이외에 custom image를 모아서 roboflow에 올리면 labeling도 수행가능

  ![image-20220622143743978](/data/images/image-20220622143743978.png)

- public data, custom data 모두 Train/Valid/Test 사용자가 비율선택가능

- data Augmentation을 적용할수 있음



## 2. Labelme

link : [**Labelme**](https://github.com/wkentaro/labelme)



- 쉬운 설치및 Python 패키지

  ```python
  pip install labelme
  ```

- Python이 없어도 .exe / .dmg  설치 파일 제공

  link : [**Download**](https://github.com/wkentaro/labelme/releases)

- 다양한 모양의 label 제공

  ![image-20220622144839038](/data/images/image-20220622144839038.png)

- labeling한 파일 json형식으로 저장

  - python 패키지 labelme2coco 통한 coco format 변환이 쉬움

    link :  [**labelme2coco**](https://github.com/fcakyon/labelme2coco)

  - 다양한 format은 위의 Roboflow를 통한 format 변환이 가능





