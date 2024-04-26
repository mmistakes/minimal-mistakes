---
layout: single
title:  "Faster R-CNN colab"
categories : MMDetection
tag : [python, MMDetection, object-detection, Faster R-CNN]
toc: true
toc_sticky: true
---

![header](https://capsule-render.vercel.app/api?type=waving&color=a2dcec&height=300&section=header&text=Faster R-CNN 구현&fontSize=40&animation=fadeIn&fontAlignY=38&fontColor=FFFFFF)



<div align=center> <a target="_blank" href="https://colab.research.google.com/drive/1P-S70UbPX4U7MT3RXtbFFpOZNBqMm5Bt?usp=sharing"><img _ngcontent-byh-c89="" src="https://aifactory.space/assets/images/open_colab.svg" /></a></div>



- 데이터는 roboflow 사용
- 방법1, 방법2 두가지로 구현
- 최종결과 확인 및 정리


- 사용할 데이터셋 :  [마스크 데이터셋](https://public.roboflow.com/object-detection/mask-wearing)



&nbsp;

## 작업위치 설정


```python
import os

os.mkdir('fast_rcnn')
os.chdir('fast_rcnn')
```

&nbsp;

## mmdetection 설치 (colab 기본 pytorch 버전과 맞춘것)


```python
!pip install mmcv-full -f https://download.openmmlab.com/mmcv/dist/cu113/torch1.11.0/index.html
!git clone https://github.com/open-mmlab/mmdetection.git
%cd mmdetection
!pip install -r requirements/build.txt
!pip install -v -e .
!pip install mmdet
```




&nbsp;

## 데이터셋 다운

- roboflow 에서는 원하는 데이터셋 코드 다운도 지원

&nbsp;

- 폴더 생성및 데이터 다운


```python
os.mkdir('data')
os.chdir('data')
!curl -L "https://public.roboflow.com/ds/NyfU3VG4Vv?key=4el7nxVvoP" > roboflow.zip; unzip roboflow.zip; rm roboflow.zip
```



```python
os.listdir()

>> ['test', 'valid', 'train', 'README.roboflow.txt', 'README.dataset.txt']
```



&nbsp;

## Faster R-CNN 

- mmdetection/configs 안에 _ custom _ 폴더 생성
- mmdetection 밑에 checkpoint 폴더 생성


```python
os.chdir('/content/fast_rcnn/mmdetection/checkpoint/')

from requests import get 

def download(url, file_name):
    with open(file_name, "wb") as file:   
        response = get(url)               
        file.write(response.content)


url = "https://download.openmmlab.com/mmdetection/v2.0/faster_rcnn/faster_rcnn_r50_fpn_1x_coco/faster_rcnn_r50_fpn_1x_coco_20200130-047c8118.pth"
download(url,"faster_rcnn_r50_fpn_1x_coco_20200130-047c8118.pth")

```

### 방법 1. custom.py 사용

![image.png](data:image/png;base64,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)


- faster_rcnn_custom.py

```python

_base_ = '../faster_rcnn/faster_rcnn_r50_fpn_1x_coco.py'


model = dict(
  roi_head = dict(
    bbox_head = dict(
      num_classes = 3
    )
  )
)


data_root = '/data'
classes = ('People', 'mask', 'no-mask',)


data = dict(
    samples_per_gpu=1,
    workers_per_gpu=0,

    train=dict(
      img_prefix="/train/",
      classes = classes,
      ann_file="/train/_annotations.coco.json"
),

    val=dict(
        img_prefix="/valid/",
        classes = classes,
        ann_file="/valid/_annotations.coco.json"
),

    test=dict(
        img_prefix="/test/",
        classes = classes,
        ann_file="/test/_annotations.coco.json"
)
)


runner = dict(type='EpochBasedRunner', max_epochs=5)
auto_scale_lr = dict(enable=False, base_batch_size=16)
checkpoint_config = dict(interval=1,out_dir='work_dirs/faster_rcnn/')
evaluation = dict(interval=1, metric='bbox')
load_from = 'checkpoint/faster_rcnn_r50_fpn_1x_coco_20200130-047c8118.pth'
```




```python
# 100 epoch 수행하는 것
os.chdir('/content/fast_rcnn/mmdetection/')
!python ./tools/train.py configs/_custom_/faster_rcnn_custom.py --work-dir configs/custom/faster_rcnn/
```




- 결과 이미지 확인


```python
!python ./tools/test.py configs/_custom_/faster_rcnn_custom.py work_dirs/faster_rcnn/faster_rcnn/latest.pth --show-dir results/mask 
```




```python
from glob import glob 
import cv2
from google.colab.patches import cv2_imshow

data_list = glob('./results/mask/*.jpg')
for i in data_list[:10]:
  src = cv2.imread(i)

  cv2_imshow(src)
```

![image-20220711225338725](/images/2022-07-11-faster_rcnn_code/image-20220711225338725.png)



&nbsp;

### 방법 2. config 사용


```python
os.chdir('/content/fast_rcnn/mmdetection/')
```


```python
import mmcv
from mmcv.runner import load_checkpoint
from mmdet.apis import inference_detector, show_result_pyplot
from mmdet.models import build_detector
from mmdet.apis import set_random_seed

# 사용할 모데 초기 py 설정
config = './configs/faster_rcnn/faster_rcnn_r50_fpn_1x_coco.py'

# config 불러오기
cfg = mmcv.Config.fromfile(config)

# 데이터셋 지정
cfg.dataset_type = 'CocoDataset'

# data_root는 사용자가 저장한 데이터가 있는 폴더 전까지
data_root = '/content/fast_rcnn/mmdetection/data'

# class 설정
classes = ('People', 'mask', 'no-mask',)

# train, val, test 데이터셋에 대한 type, data_root, ann_file, img_prefix 설정

cfg.data.samples_per_gpu=1
cfg.data.workers_per_gpu=0

cfg.data.train.data_root = data_root 
cfg.data.train.ann_file =  data_root + "/train/_annotations.coco.json"
cfg.data.train.img_prefix = data_root +  '/train/'
cfg.data.train.classes = classes

cfg.data.val.data_root = data_root
cfg.data.val.ann_file =  data_root + "/valid/_annotations.coco.json"
cfg.data.val.img_prefix = data_root +  '/valid/'
cfg.data.val.classes = classes

cfg.data.test.data_root = data_root
cfg.data.test.ann_file =  data_root + "/test/_annotations.coco.json"
cfg.data.test.img_prefix = data_root +  '/test/'
cfg.data.test.classes = classes

# 클래스 수 지정
cfg.model.roi_head.bbox_head.num_classes = 3

# 사전 훈련 모델 지정
cfg.load_from = 'checkpoint/faster_rcnn_r50_fpn_1x_coco_20200130-047c8118.pth'

# 가중치 저장 위치
cfg.work_dir = './work_dirs/mask_cfg/'

# learning rate
cfg.optimizer.lr = 0.02 / 8

# 로그 출력 시기 설정
cfg.log_config.interval = 1 
cfg.lr_config.policy = 'step'

# 평가 지표로 설정
cfg.evaluation.metric = 'bbox'

# 평가 구간 설정
cfg.evaluation.interval = 10

# 체크포인트 구간 설정
cfg.checkpoint_config.interval = 10

# epoch 설정
cfg.runner = dict(type='EpochBasedRunner', max_epochs=100)

# 결과 재현을 위한 시드값 설정
cfg.seed = 0
set_random_seed(0, deterministic=False)
cfg.gpu_ids = range(1)
cfg.device='cuda'
```


```python
from mmdet.datasets import build_dataset
from mmdet.models import build_detector
from mmdet.apis import train_detector

# dataset 생성 및 model 설정

datasets = [build_dataset(cfg.data.train)]
model = build_detector(cfg.model)
model.CLASSES = datasets[0].CLASSES

# 훈련
train_detector(model, datasets, cfg, distributed=False, validate=True)
```




- 결과 이미지 확인


```python
test_data = glob('/content/fast_rcnn/mmdetection/data/test/*.jpg')

for i in test_data[:10]:
  img = mmcv.imread(i)

  model.cfg = cfg
  result = inference_detector(model, img)
  show_result_pyplot(model, img, result)
```

![image-20220711225434144](/images/2022-07-11-faster_rcnn_code/image-20220711225434144.png)



> 적은 epoch만 돌렸을때는 확실히 성능이 좋지 못한 경향을 보임
>
> 대부분 잘 잡아내지만 클래스별 데이터가 너무 적고, 전체 데이터 또한 적어서 엄청 큰 성능을 보이지는 않음
