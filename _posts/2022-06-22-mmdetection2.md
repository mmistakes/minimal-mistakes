---
layout: single
title:  "mmdetection config setting"
categories : MMpackage
tag : [python, mmdetection, object-detection]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=mmdetection config setting&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)



## 1. mmdetection config 

- mmdetection 모델, 데이터 변경없이 사용하려면 --> **mmdetection 설명 & 설치과정** 참조
- mmdetection 튜토리얼을 살펴보면 mmdetection 구조는 크게    dataset, model, schedule, default_runtime 4개로 구분이 가능



- 다양한 모델 예를 들어 Faster R-CNN, Mask R-CNN, Cascade R-CNN, RPN, SSD 등의 기본이 되는 구성은 base에 작성되어있음

  - 실제로 mmdetection의 configs 안에는 다양한 모델 및 backbone 부분의 폴더가 존재

    ![image-20220622115735959](/mmdetection/images/2022-06-22-mmdetection2/image-20220622115735959.png)

  - configs/faster_rcnn/faster_rcnn_r50_fpn_1x_coco.py의 내용을 확인해 보면

    ![image-20220622121221797](/mmdetection/images/2022-06-22-mmdetection2/image-20220622121221797.png)

    - 위에서 설명한 4개의 dataset,model,schedule,runtime 으로 구성됨
    - 사용자 custom을 할때는 4개를 적절하게 설정하면 



## 2. mmdetection config write 

- 실제 구성파일 작성할때 이름을 만드는 방법이 예시로 정해져 있음

  ```py
  {model}_[model setting]_{backbone}_{neck}_[norm setting]_[misc]_[gpu x batch_per_gpu]_{schedule}_{dataset}
  ```

  - {}는 필수, []는 선택
    - `{model}`  faster_rcnn, mask_rcnn 등과 같은 모델 유형
    - `[model setting]` without_semantic, htc, moment, reppoints 등과 같은 일부 모델에 대한 특정 설정
    - `{backbone}`  `r50` : (ResNet-50), `x101`(ResNeXt-101) 과 같은 backbone
    - `{neck}` `fpn`, `pafpn`, `nasfpn`,  `c4` 같은 유형
    - `[norm_setting]`: `bn`(Batch Normalization)은 지정하지 않는 한 사용되며, 다른 표준 레이어 유형은 `gn`(Group Normalization), `syncbn`(Synchronized Batch Normalization)
      -  `gn-head`/ `gn-neck`는 GN이 head/neck 에만 적용됨을 나타내고 GN이 `gn-all`전체 모델(예: backbone, neck, head)에 적용됨을 의미합니다.
    - `[misc]`: 모델의 기타 설정/플러그인(예: `dconv`, `gcb`, `attention`, `albu`, `mstrain`.
    - `[gpu x batch_per_gpu]`: GPU 및 GPU당 샘플 `8x2`이 기본적으로 사용됩니다.
    - `{schedule}`: 교육 일정, 옵션은 `1x`, `2x`, `20e`등 `1x`이며 `2x`각각 12 Epoch 및 24 Epoch를 의미합니다. `20e`는 20 Epoch를 나타내는 cascade 모델에서 채택됩니다. `1x`/ 의 경우 `2x`초기 학습률은 8/16 및 11/22 Epoch에서 10배 감소합니다. 의 경우 `20e`초기 학습률은 16번째 및 19번째 Epoch에서 10배 감소합니다.
    - `{dataset}`: `coco`, `cityscapes`, `voc_0712`, `wider_face`.

