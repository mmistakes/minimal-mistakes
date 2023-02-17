---
layout: single
title:  "mmdetection 설명 & 설치과정"
categories : MMpackage
tag : [python, mmdetection, object-detection]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=mmdetection 설명, 설치과정&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)

## 1. mmdetection?

- Pytorch 기반으로 하는 오픈소스 object-detection 
- 다양한 object-detection 모델을 빠르게 수행 및 검증 가능
- 쉬운 사용법 및 data augmentation 지원
- 매우 많은 모델 등등..



> 기본적으로 object detection을 공부하면서 모델을 하나씩 구현하는 것은 매우 시간이 많이 걸리는 일이었습니다.. mmdetection을 사용하면 보다 편리하게 다양한 논문에서 소개한 모델을 사용할수 있다는 장점이 있습니다.



## 2. 설치

개인적으로 설치가 힘들었던 패키지 중에 하나



- 설치는 기본적으로 [자동설치, 수동설치] 두가지가 존재

- 자동설치

  ```python
  pip install -U openmim
  mim install mmcv-full
  
  pip install mmdet==2.22.0
  ```

  - 자동설치로 설치후 이상이 없다면 그냥 진행해도 무방함



- 수동설치

  - mmcv-full 설치

    ```python
    pip install mmcv-full -f https://download.openmmlab.com/mmcv/dist/{cu_version}/{torch_version}/index.html
    ```

    - cu_version, torch_version 은 설치한 Pytorch 기준으로 설정

      - Pytorch version check

        ```python
        import torch
        torch.__version__
        # 1.10.0+cu111 ---> {torch_version}+{cu_version} 
        ```

        
        
        

  - mmdet 설치
  
    ```python
    git clone https://github.com/open-mmlab/mmdetection.git
    cd mmdetection
    pip install -r requirements/build.txt
    pip install -v -e .
    
    pip install mmdet
    ```
    
    
    
  
  
  
  > 실제로 설치했을때 window 기준으로 자동설치가 잘 안됨, 자동설치가 안된다면 바로 수동설치를 하는것을 권장함
  
  

## 3. 설치 완료 테스트

- 위 설치과정을 수행후 설치 완료 테스트까지 문제없이 수행된다면 제대로 설치한 것임

- 자동설치가 성공했다면 

  ```python
  git clone https://github.com/open-mmlab/mmdetection.git
  ```

  - 해당 git clone을 통해 실행환경에 mmdetection 폴더로 이동
  - 수동설치를 수행했다면 이미 mmdetection 폴더가 존재함

- 설치 테스트

  ```python
  from mmdet.apis import init_detector, inference_detector
  from PIL import Image
  
  config_file = './mmdetection/configs/faster_rcnn/faster_rcnn_r50_fpn_1x_coco.py'
  checkpoint_file = './mmdetection/checkpoint/faster_rcnn_r50_fpn_1x_coco_20200130-047c8118.pth'
  device = 'cuda:2'
  model = init_detector(config_file, checkpoint_file, device=device)
  
  test_img = './mmdetection/demo/demo.jpg'
  result = inference_detector(model, test_img)
  
  model.show_result(test_img, result, out_file='./result.jpg')
  
  img = Image.open(test_img)
  img2 = Image.open('./result.jpg')
  img.show()
  img2.show()
  ```

  

  - 위 코드에서 checkpoint_file에 해당하는 파일은 [링크](https://github.com/open-mmlab/mmdetection/tree/master/configs/faster_rcnn) 에서 다운가능

  - Pre-trained Models 에서 4번째 행
  
    ![pre-train](../images/2022-06-20-mmdetection1/pre-train.png)

## 4. 수행 결과

mmdetection에서 제공하는 demo 이미지를 통한 검증



- 원본

  ![demo](../images/2022-06-20-mmdetection1/demo.png)

- 결과

  ![demo_detection](../images/2022-06-20-mmdetection1/demo_detection.png)



## 5. 끝으로

이후 포스팅부터는 논문 리뷰와 해당하는 mmdetection 모델를 수행하는 과정으로 포스팅 하겠습니다~



