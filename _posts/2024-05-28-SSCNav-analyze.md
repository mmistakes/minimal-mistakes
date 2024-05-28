---
layout: single
title:  "SSCNav Code Analyze"
---


---

이 문서는 AI의 결과물을 참고하여 작성되었습니다.

## 목차   

* [1. SSCNav-master/utils에 대하여](#1-SSCNav-masterutils에-대하여)

  * [1.1 SSCNav-master/utils/mapper.py](#11-SSCNav-masterutilsmapperpy)

  * [1.2 SSCNav-master/utils/utils.py](#12-SSCNav-masterutilsutilspy)

  * [1.3 SSCNav-master/utils/dataloader_cmplt.py](#13-SSCNav-masterutilsdataloader_cmpltpy)

  * [1.4 SSCNav-master/utils/dataloader_seg.py](#14-SSCNav-masterutilsdataloader_segpy)

* [2. SSCNav-master/test_agent.py](#2-SSCNav-mastertest_agentpy)

* [3. SSCNav-master/train_agent.py](#3-SSCNav-mastertrain_agentpy)

* [4. SSCNav-master/train_cmplt.py](#4-SSCNav-mastertrain_cmpltpy)

* [5. SSCNav-master/train_conf.py](#5-SSCNav-mastertrain_confpy)

* [6. SSCNav-master/SCNav_agent.py](#6-SSCNav-masterSCNav_agentpy)

  * [6.1 전처리 부분(클래스 정의 전 단계)](#61-전처리-부분클래스-정의-전-단계)

  * [6.2 class replay_buffer(object) 분석](#62-class-replay_bufferobject-분석)

  * [6.3 class Memory 분석](#63-class-Memory-분석)

  * [6.4 class Memory_gpu(Memory) 분석](#64-class-Memory_gpuMemory-분석)

  * [6.5 class SCNavAgent 대규모 분석](#65-class-SCNavAgent-대규모-분석)

    * [6.5.1 \_\_init\_\_ \(\)](#651-__init__)

    * [6.5.2 embedding(self, target)](#652-embeddingself-target)

    * [6.5.3 reset_config(self, config)](#653-reset_configself-config)

    * [6.5.4 reset(self, target=None)](#654-resetself-targetnone)

    * [6.5.5 update_Q_t(self)](#655-update_Q_tself)

    * [6.5.6 update_Q_t_soft(self)](#656-update_Q_t_softself)

    * [6.5.7 train_Q(self)](#657-train_Qself)

    * [6.5.8 get_observations(self)](#658-get_observationsself)

    * [6.5.9 get_trinsics(self)](#659-get_trinsicsself)

    * [6.5.10 single_view_and_save(self)](#6510-single_view_and_saveself)

    * [6.5.11 single_view_and_save_new(self)](#6511-single_view_and_save_newself)

    * [6.5.12 view(self)](#6512-viewself)

    * [6.5.13 action_picker(self, eps_threshold)](#6513-action_pickerself-eps_threshold)

    * [6.5.14 reach_goal(self, c_x, c_y)](#6514-reach_goalself-c_x-c_y)

    * [6.5.15 planner_path(self, eps_threshold)](#6515-planner_pathself-eps_threshold)

    * [6.5.16 planner(self, eps_threshold)](#6516-plannerself-eps_threshold)

    * [6.5.17 planner_discrete(self, randomness)](#6517-planner_discreteself-randomness)

    * [6.5.18 euclidean_distance(self, position_a, position_b)](#6518-euclidean_distanceself-position_a-position_b)

    * [6.5.19 shortest_distance(self)](#6519-shortest_distanceself)

    * [6.5.20 rotate(self, angle)](#6520-rotateself-angle)

    * [6.5.21 move_path(self)](#6521-move_pathself)

    * [6.5.22 move(self, action_list)](#6522-moveself-action_list)

    * [6.5.23 visible_close_checker(self, targets, semantic, depth)](#6523-visible_close_checkerself-targets-semantic-depth)

    * [6.5.24 stop_checker(self)](#6524-stop_checkerself)

    * [6.5.25 success_checker(self)](#6525-def-success_checkerself)

    * [6.5.26 step(self, randomness)](###-6.5.26-def-step(self,-randomness):)

---
# 1 SSCNav-master/utils에 대하여
# 1.1 SSCNav-master/utils/mapper.py

## `Mapper` 클래스

로봇 에이전트가 환경의 글로벌 맵을 생성하고 유지하는 데 사용됩니다. 이 클래스는 시맨틱 및 깊이 관찰을 사용하여 맵을 업데이트하고 렌더링하여 내비게이션 및 위치 추정 작업에 활용할 수 있습니다.

### 주요 기능
1. **`Mapper` 클래스**: 전역 맵을 저장하고 관리하는 클래스
    - `reset`: 맵 초기화
    - `append`: 에이전트의 위치, 회전, 관측치를 전역 맵에 누적
    - `get_orient`: 에이전트의 현재 방향 계산
    - `get_map_local`: 에이전트 주변의 지역 맵 획득
    - `get_map_local_rot`: 회전된 지역 맵 획득
    - `get_map_global`: 전체 전역 맵 획득
    - `render`: 맵을 시각화할 수 있는 텐서 형식으로 변환
    - `cat2obst`: 장애물 맵 생성

2. **환경과의 상호작용**: `reset`, `step` 등 메서드를 통해 Habitat 환경과 상호작용
3. **이미지 저장 및 사용자 입력 처리**: 이미지 파일을 저장하고 사용자 입력을 받는 코드 포함

이 코드는 3D 환경에서 에이전트가 이동하며 관측한 정보를 전역 맵에 축적하고, 구축된 맵을 시각화하고 저장할 수 있는 기능을 제공합니다. 이를 통해 에이전트의 위치 인식, 내비게이션 등의 작업에 활용될 수 있습니다.

---
# 1.2 SSCNav-master/utils/utils.py

## 주요 함수 및 클래스
1. **`clever_resize`**: 512x512 크기의 소스 이미지를 128x128로 축소
2. **`ScalarMeanTracker`**: 스칼라 값들의 평균 계산 및 추적
3. **`get_points`**: 환경 관측치에서 포인트 클라우드, RGB, 의미론적 정보 추출
4. **`get_height_map`**: 포인트 클라우드 정보에서 높이 맵, RGB 맵, 의미론적 맵 생성
5. **`get_panorama`**: 여러 방향에서 본 포인트 클라우드를 합쳐서 전체 파노라마 뷰 생성
6. **`euler_to_quaternion`**: 오일러 각도를 쿼터니언으로 변환

### GPU 처리 함수들
- **`depth2local3d_gpu`**, **`generate_pc_gpu`**, **`pc2local_gpu`**, **`color2local3d_gpu`**

### CPU 처리 함수들
- **`depth2local3d`**, **`color2local3d`**, **`generate_pc`**, **`pc2local`**

### 기타 함수들
- **`repeat4`**: 배열의 각 요소를 4번 반복
- **`get_observations`**: 관측치에서 포인트 클라우드, RGB, 의미론적 정보, 높이 맵 등을 추출
- **`preprocess`**: 의미론적 분할 정보를 전처리하고 One-Hot 인코딩
- **`fill_holes`**: 의미론적 분할 결과에서 구멍 채우기
- **`one_hot`**: 클래스 레이블을 One-Hot 인코딩
- **`random_region_mask`**: 무작위 영역을 마스킹
- **`cmplt_iou`**, **`cmplt_accuracy`**: 의미론적 분할 결과 평가
- **`shrink_obs`**: 관측치 이미지를 축소

이 코드는 주로 3D 환경에서 포인트 클라우드, 색상, 의미론적 정보를 처리하고, 높이 맵과 파노라마 뷰를 생성하는 기능을 제공하며, 의미론적 분할 결과를 평가하는 유틸리티 함수들도 포함되어 있습니다.

---
# 1.3 SSCNav-master/utils/dataloader_cmplt.py

## 주요 클래스

### **BaseDataset** (`torch.utils.data.Dataset` 상속)
- **`__init__`**: 지정된 디렉토리에서 `.hdf5` 파일을 찾아 경로를 저장. `limit` 파라미터를 통해 최대 샘플 수 제한 가능
- **`__len__`** & **`__getitem__`**: 자식 클래스에서 구현할 추상 메소드

### **CompletionDataset** (BaseDataset 상속)
- **입력 데이터**: `.hdf5` 파일에서 샘플 추출, 4개의 회전 버전으로 확장
- **`__getitem__`**: 특정 인덱스에 대해 알맞은 회전을 처리하고, 입력 데이터(`sem_in`)와 실제 데이터(`sem_gt`) 생성

### **MultiViewDataset** (BaseDataset 상속)
- **멀티뷰 학습**: 하나 또는 여러 개의 뷰에서 데이터를 합성 가능
- **`__getitem__`** 메소드
  - **`getitem`**: 임의로 다른 뷰의 데이터를 합성하여 입력 데이터 생성
  - **`getitem_fix`**: 미리 지정된 선택을 통해 데이터 뷰를 결정하고 처리

## 주요 기능
- **.hdf5 파일 처리**: `.hdf5` 파일로부터 데이터 읽기
- **데이터 증강**: 동일한 데이터를 다양한 각도에서 보여줌
- **데이터 로딩 및 변환**: PyTorch `Dataset` 및 `DataLoader`와 호환 가능

## 사용 방법
- 메인 함수에서 특정 디렉토리로부터 `MultiViewDataset` 클래스 인스턴스 생성, 길이 출력
- 모델 학습 루프에서 `DataLoader`를 통해 인스턴스 사용 가능

---
# 1.4 SSCNav-master/utils/dataloader_seg.py

## 주요 클래스 분석

### **BaseDataset** (`torch.utils.data.Dataset` 상속)
- 기본 데이터셋 클래스로, 이미지 변환, 데이터 증강, 이미지 수치 규격화 수행
- **`__init__`**: 기본 설정 초기화
- **`input_transform`**, **`label_transform`**: 이미지 및 라벨 데이터 변환
- **`multi_scale_aug`**, **`rand_crop`**: 데이터 증강 처리

### **HRNetDataset** (BaseDataset 상속)
- **`__init__`**: 설정에 따라 샘플 초기화
- **`__getitem__`**: 데이터셋에서 특정 인덱스에 해당하는 데이터 로딩 및 변환

### **SegmentationDataset** (`torch.utils.data.Dataset` 상속)
- 세그멘테이션 데이터를 처리하는 클래스, 데이터 전처리 및 증강 기법 적용
- **`RandomHSV`**, **`scaleNorm`**, **`RandomScale`**, **`RandomCrop`**, **`RandomFlip`**, **`Normalize`**, **`ToTensor`** 등 다양한 데이터 변환 클래스 포함

## 사용 방법
- **HRNetDataset** 및 **SegmentationDataset** 클래스 인스턴스는 각각 학습, 검증, 테스트용 데이터로 사용 가능
- **데이터 로딩 및 변환 파이프라인**: `transforms.Compose` 함수를 사용하여 여러 변환 메소드를 파이프라인으로 구성

## 실행 코드
- `root_dirs`에서 데이터를 로드하여 **HRNetDataset** 또는 **SegmentationDataset** 클래스 인스턴스화
- `print(len(SData))`: 로드된 데이터의 길이 출력
- 주석 처리된 부분: 데이터를 확인하거나 이미지 파일로 저장하는 코드

전반적으로, 이 코드는 이미지 데이터의 전처리 및 증강을 통해 딥러닝 모델의 학습을 도우며, 다양한 데이터셋 설정에 대응할 수 있는 유연성을 제공합니다.

---

# 2. SSCNav-master/test_agent.py

위 코드는 SCNavAgent라는 객체를 사용하여 시뮬레이션 환경에서 특정 목표를 향한 내비게이션을 수행하는 에이전트를 평가하는 프로그램입니다. 전체적으로, 이 코드는 다양한 설정 및 초기화를 통해 에이전트를 설정하고, 주어진 에피소드에 대해 에이전트의 행동을 기록하며, 결과를 저장하는 방식으로 구성되어 있습니다. 주요 부분을 단계별로 설명하겠습니다.

### 주요 구성 요소 및 흐름

1. **필요한 라이브러리 및 모듈 임포트**:
    - `SCNav_agent`, `utils.utils`, `torch`, `numpy`, `argparse` 등 다양한 라이브러리와 모듈을 임포트합니다. 이들은 주로 에이전트의 초기화, 시뮬레이션 환경과 상호작용, 데이터 처리를 위해 사용됩니다.
2. **메인 함수 정의 (main)**:
    - 프로그램의 주요 로직이 포함된 함수입니다. 여기서 다양한 설정을 로드하고 에이전트를 초기화하며, 시뮬레이션을 실행합니다.
3. **명령줄 인자 파싱**:
    - `parser.parse_args()`를 사용하여 명령줄 인자를 파싱합니다. 이는 실행 시 제공되는 인자들을 처리하여 에이전트 설정에 사용됩니다.
4. **경로 설정 및 디렉토리 생성**:
    - 결과를 저장할 디렉토리를 설정하고 생성합니다. 만약 이미 존재하는 디렉토리라면, 프로그램을 종료합니다.
5. **환경 설정 및 랜덤 시드 초기화**:
    - `random`, `numpy`, `torch`의 시드를 설정하여 실행의 재현성을 보장합니다.
6. **에이전트 초기화**:
    - `SCNavAgent` 객체를 초기화합니다. 다양한 설정 인자를 통해 에이전트의 동작 방식을 정의합니다. 여기에는 디바이스 설정, 경로, 메모리 크기, 학습률 등 여러 파라미터가 포함됩니다.
7. **에피소드 설정 및 실행**:
    - 주어진 에피소드 설정 파일 (`val.json`)을 로드하고, 각 에피소드에 대해 에이전트를 초기화하고 목표를 설정합니다.
    - 에피소드가 진행되는 동안 에이전트의 상태를 이미지로 저장하며, 각 단계에서 에이전트의 행동을 기록합니다.
8. **평가 및 결과 저장**:
    - 각 에피소드가 종료되면, 경로 길이, 보상, 성공 여부 등의 결과를 기록하고 저장합니다.
    - `ScalarMeanTracker`를 사용하여 결과를 추적하고, 최종 결과를 JSON 파일로 저장합니다.

### 내부 구조 및 이유

- **라이브러리 및 모듈 사용**:
    - 다양한 라이브러리 및 모듈을 사용하여 코드를 모듈화하고 유지보수를 용이하게 합니다.
    
- **명령줄 인자 파싱**:
    - 사용자로부터 다양한 설정 값을 동적으로 받을 수 있도록 하여, 코드의 유연성과 재사용성을 높입니다.
- **에이전트 초기화**:
    - `SCNavAgent` 객체를 초기화하면서 다양한 설정 값을 인자로 전달합니다. 이는 에이전트의 동작 방식을 세부적으로 조정할 수 있게 합니다.
- **에피소드 실행 및 기록**:
    - 각 에피소드에서 에이전트의 행동을 이미지와 텍스트로 기록합니다. 이는 디버깅 및 결과 분석에 유용합니다.
- **결과 저장**:
    - 각 에피소드의 결과를 JSON 파일로 저장하여, 후속 분석 및 시각화를 용이하게 합니다.

이와 같은 구조를 통해 에이전트의 동작을 체계적으로 평가하고 결과를 기록하며, 다양한 설정을 손쉽게 조정할 수 있습니다.

---

# 3. SSCNav-master/train_agent.py

위 코드는 SCNavAgent를 사용하여 내비게이션 에이전트를 학습하는 프로그램입니다. 이 코드는 다음과 같은 주요 단계로 구성됩니다.

1. **라이브러리 및 모듈 임포트**:
    - 필요한 라이브러리 및 모듈을 임포트합니다. 이는 주로 PyTorch, NumPy, OpenCV 등의 머신러닝 및 이미지 처리에 필요한 기능을 제공합니다.
2. **인자 파싱**:
    - 명령줄 인자를 파싱하여 프로그램 실행 시 설정 값을 받아옵니다. 이를 통해 에이전트의 학습 설정을 동적으로 변경할 수 있습니다.
3. **에이전트 초기화**:
    - SCNavAgent 객체를 초기화합니다. 여기서는 주어진 설정 값을 바탕으로 에이전트의 동작 방식을 결정합니다.
4. **학습 루프**:
    - 에이전트가 환경과 상호작용하며 학습을 진행합니다. 에피소드가 시작될 때마다 환경을 초기화하고, 에이전트가 목표를 달성할 때까지 행동합니다.
    - 학습 과정에서는 행동에 따른 보상을 계산하고, 이를 사용하여 Q 함수를 업데이트합니다. 이러한 과정을 통해 에이전트는 높은 보상을 받는 행동을 학습하게 됩니다.
5. **결과 및 모델 저장**:
    - 학습 과정 중에는 주기적으로 결과 및 모델을 저장합니다. 이를 통해 학습 중간에 중단된 경우에도 학습을 재개할 수 있습니다.
6. **학습 상태 모니터링**:
    - 학습 중에는 손실, 보상, Q 값 등의 지표를 모니터링하고 기록합니다. 이를 통해 학습 진행 상황을 시각화하고 분석할 수 있습니다.

이 코드는 에이전트가 환경과 상호작용하며 목표를 달성하기 위한 최적의 정책을 학습하는 데 사용됩니다.

---

# 4. SSCNav-master/train_cmplt.py

위 코드는 주어진 데이터셋에서 의미 분할(semantic segmentation)을 수행하는 컴플리션(completion) 모델을 학습하고 검증하는 프로그램입니다. 이 코드는 다음과 같은 주요 단계로 구성됩니다.

1. **라이브러리 및 모듈 임포트**: 
    - 필요한 라이브러리 및 모듈을 임포트합니다. 주로 PyTorch를 사용하여 모델과 데이터를 처리합니다.
2. **인자 파싱**:
    - 명령줄에서 전달된 인자를 파싱하여 학습 및 테스트 설정을 결정합니다.
3. **데이터 로딩**:
    - 학습 및 테스트 데이터셋을 DataLoader를 사용하여 로드합니다.
4. **모델 초기화**:
    - 주어진 설정을 바탕으로 의미 분할 모델을 초기화합니다. ResNet과 같은 신경망 아키텍처를 사용합니다.
5. **손실 함수 및 옵티마이저 설정**:
    - 교차 엔트로피 손실 함수를 정의하고, Adam 옵티마이저를 설정합니다.
6. **학습 및 검증 루프**:
    - 주어진 epoch 수에 따라 학습 및 검증을 반복합니다.
    - 학습 루프에서는 주어진 배치 데이터를 사용하여 모델을 학습하고, 옵티마이저로부터 기울기를 업데이트합니다.
    - 검증 루프에서는 학습된 모델을 사용하여 테스트 데이터에 대한 정확도와 손실을 평가합니다.
7. **결과 시각화 및 저장**:
    - 주기적으로 학습 및 테스트 데이터에 대한 결과를 시각화하고 저장합니다. 이를 통해 모델의 학습 진행 상황을 모니터링하고, 성능을 평가할 수 있습니다.
8. **모델 저장**:
    - 학습이 완료된 모델을 주기적으로 저장합니다.

이 코드는 주어진 의미 분할 데이터셋에서 학습된 모델의 성능을 평가하고, 최종적으로 의미 분할 모델을 저장하여 나중에 사용할 수 있도록 합니다.

---

# 5. SSCNav-master/train_conf.py

이 코드는 주어진 이미지 데이터셋을 사용하여 Semantic Segmentation 및 Confidence Estimation을 수행하는 모델을 학습하고 평가하는 파이썬 스크립트입니다. 코드는 크게 세 부분으로 나뉩니다.

1. **데이터 및 하이퍼파라미터 설정**: `argparse`를 사용하여 실험 ID 및 다양한 하이퍼파라미터를 설정합니다. 데이터셋 경로, 배치 크기, 학습률, 모델 아키텍처 등이 여기에 포함됩니다.
2. **모델 및 학습 루프 설정**: 데이터 로딩, 모델 설정, 손실 함수 정의, 옵티마이저 설정, 학습률 조정 등이 이 부분에서 이루어집니다. 이 부분에서는 주로 PyTorch의 `DataLoader`, `DataParallel`, `nn.Module`, `nn.CrossEntropyLoss`, `Adam` 옵티마이저 등을 사용하여 모델을 설정하고 학습 루프를 구성합니다.
3. **학습 및 평가 루프**: 이 부분에서는 `train_loader`를 사용하여 주어진 epoch 수에 대해 모델을 학습하고, 지정된 간격으로 테스트 데이터셋을 사용하여 모델을 평가합니다. 학습 및 평가 과정 중 손실을 기록하고, 시각화 및 결과 저장을 위해 TensorboardX 및 OpenCV를 사용합니다.

이 코드에서는 Semantic Segmentation 모델로 ResNet을 사용하고, Confidence Estimation을 위해 추가적인 네트워크를 구성하고 학습합니다. Semantic Segmentation 결과에 따라 Confidence Estimation을 수행하며, 이는 `fd`라는 네트워크로 이루어집니다.

---
---
---

# 6. SSCNav-master/SCNav_agent.py

### 6.1 전처리 부분(클래스 정의 전 단계)

이 코드는 다양한 모듈을 가져와서 사용하기 위한 준비 작업을 수행합니다. 각 줄의 역할은 다음과 같습니다:

1. `from models import ...`: 모델 관련 클래스들을 가져옵니다. 여기서는 `QNet`, `ResNet`, `Bottleneck`, `DeconvBottleneck`, `ACNet`, `Q_discrete` 클래스들을 가져옵니다.
2. `from utils.dataloader_seg import *`: Segmentation 모델을 위한 데이터 로더를 가져옵니다.
3. `import habitat`: Habitat 환경을 사용하기 위한 라이브러리를 가져옵니다.
4. `from habitat.tasks.nav.nav import NavigationEpisode`: Navigation 작업 관련 클래스를 가져옵니다.
5. `from habitat.tasks.nav.object_nav_task import ...`: Object navigation 작업 관련 클래스들을 가져옵니다.
6. Torch와 관련된 라이브러리들을 가져옵니다: `torch`, `torch.nn.functional`, `torch.optim`, `torchvision`.
7. `import pickle` 및 `_pickle as cPickle`: Pickle을 사용하여 객체를 직렬화하고 역직렬화하기 위한 라이브러리를 가져옵니다.
8. `import random` 및 `numpy as np`: 무작위 수 생성 및 배열 조작을 위한 라이브러리를 가져옵니다.
9. `from quaternion import as_rotation_matrix, from_rotation_matrix`: 쿼터니언을 사용하여 회전 행렬을 생성하고 회전 행렬을 쿼터니언으로 변환하기 위한 함수를 가져옵니다.
10. `from utils.utils import ...`: 다양한 유틸리티 함수들을 가져옵니다. 여기에는 점군을 생성하거나 색상을 로컬 3D로 변환하는 등의 기능이 포함될 수 있습니다.
11. `from collections import namedtuple, OrderedDict`: 명명된 튜플 및 순서가 있는 딕셔너리 클래스를 가져옵니다.
12. `import copy`: 객체를 복사하기 위한 라이브러리를 가져옵니다.
13. `import os`: 운영체제와 관련된 기능을 사용하기 위한 라이브러리를 가져옵니다.
14. `from utils.mapper import Mapper`: 지도 생성을 위한 유틸리티 클래스를 가져옵니다.

15. `name2id`와 `layer_infos`는 데이터나 모델 설정 등을 위한 상수들을 정의합니다.
16. `transform`은 데이터 전처리를 위한 변환 함수들을 정의합니다.
17. `Transition`은 강화 학습을 위한 튜플 형태의 데이터 구조를 정의합니다. 이 구조는 `(현재 상태, 행동, 다음 상태, 보상)`으로 이루어져 있습니다.

이 코드는 모델, 데이터, 환경 등 다양한 부분에서 필요한 요소들을 가져와서 사용하기 쉽도록 준비하는 역할을 합니다.

---

### 6.2 class replay_buffer(object) 분석

이 클래스는 강화 학습에서 사용되는 재생 버퍼(replay buffer)를 구현한 것으로 보입니다. 재생 버퍼는 에이전트가 경험한 데이터를 저장하고 샘플링하여 학습할 때 사용됩니다. 여기서 클래스의 각 부분을 살펴보겠습니다:

1. `__init__(self, capacity, save_dir, current_position)`: 클래스의 생성자입니다. 재생 버퍼의 용량(capacity), 데이터를 저장할 디렉토리 경로(save_dir), 현재 위치(current_position)를 초기화합니다.
2. `push(self, *args)`: 새로운 transition 데이터를 버퍼에 추가하는 메서드입니다. `*args`를 통해 임의의 개수의 인자를 받을 수 있습니다. 각 transition 데이터는 pickle 파일로 저장됩니다. 저장된 파일의 이름은 현재 버퍼의 위치를 나타내며, 파일 내용은 transition 데이터입니다.
3. `sample(self, batch_size)`: 버퍼에서 지정된 배치 크기만큼의 transition 데이터를 랜덤하게 샘플링하는 메서드입니다. 샘플링된 데이터는 pickle 파일에서 로드되어 반환됩니다.
4. `__len__(self)`: 현재 버퍼에 저장된 transition 데이터의 개수를 반환하는 메서드입니다.
    
이 클래스는 파일 시스템을 사용하여 transition 데이터를 저장하고 로드하는 간단한 재생 버퍼를 구현합니다. 강화 학습 알고리즘에서는 이러한 재생 버퍼를 사용하여 데이터를 효율적으로 관리하고 학습에 활용합니다.

---

### 6.3 class Memory 분석

위의 코드는 `Memory` 클래스를 정의하고 있습니다. 이 클래스는 환경에서 관찰된 데이터를 기억하고, 필요한 경우에 해당 데이터를 사용할 수 있도록 처리하는 데 사용됩니다. 클래스의 주요 기능은 다음과 같습니다:

1. `__init__(self, aggregate, memory_size, pano, num_channel, id2cat, roof_thre, floor_thre, ignore, fov=np.pi / 2.)`: 클래스의 생성자입니다. 메모리의 초기 상태를 설정하고, 필요한 하이퍼파라미터들을 인자로 받습니다. 각각의 인자는 다음과 같은 역할을 합니다:
   - `aggregate`: True일 경우, 관찰된 데이터를 모두 저장하고 False일 경우, 가장 최근의 데이터만 저장합니다.
   - `memory_size`: 메모리에 저장할 최대 관측 수입니다.
   - `pano`: True일 경우, 360도 파노라마 이미지를 처리하고 False일 경우, 단일 시점 이미지를 처리합니다.
   - `num_channel`: 데이터의 클래스 수입니다.
   - `id2cat`: 객체 ID와 클래스 간의 매핑을 나타내는 딕셔너리입니다.
   - `roof_thre`, `floor_thre`: 지면과 지붕을 정의하는 데 사용되는 임계값입니다.
   - `ignore`: 무시해야 하는 클래스의 리스트입니다.
   - `fov`: 시야각을 나타내는 값입니다. 기본값은 파이/2입니다.
2. `reset(self)`: 메모리를 초기화합니다.
3. `get_height_map(self, quaternion, translation, area_x, area_z, h, w)`: 주어진 위치와 방향으로부터 메모리 내의 데이터를 시각화하기 위한 높이 맵을 생성합니다. 이를 통해 RGB 및 클래스 높이 맵을 반환합니다.
4. `append(self, quaternion, translation, observations, raw_semantics=None)`: 관찰된 데이터를 메모리에 추가합니다. 데이터는 위치, 방향, 깊이, RGB 이미지, 시맨틱 세그멘테이션 정보를 포함합니다. 데이터는 관찰되는 순서대로 메모리에 추가되며, 메모리 크기를 초과하면 가장 오래된 데이터를 잊어버립니다.

이 클래스는 환경에서 관찰된 정보를 메모리에 저장하고, 필요할 때 해당 정보를 추출하여 사용할 수 있도록 하는데 사용됩니다.

---

### 6.4 class Memory_gpu(Memory) 분석

위의 코드는 `Memory_gpu` 클래스를 정의하고 있습니다. 이 클래스는 GPU를 사용하여 메모리 작업을 처리합니다. `Memory` 클래스를 상속하며, 몇 가지 메서드를 수정하여 GPU를 활용합니다.

1. `__init__(self, aggregate, memory_size, pano, num_channel, id2cat, roof_thre, floor_thre, ignore, device, fov=np.pi / 2.)`: 클래스의 생성자는 `Memory` 클래스의 생성자를 호출하면서 추가적으로 GPU 디바이스(device)를 받습니다. 이 디바이스는 나중에 메모리 작업에 사용됩니다.
2. `get_height_map(self, quaternion, translation, area_x, area_z, h, w)`: 높이 맵을 생성하는 메서드는 원래의 `Memory` 클래스와 유사하지만, 계산을 GPU에서 수행합니다. 여러 계산이 GPU에서 이루어지고 결과가 CPU로 이동합니다.
3. `append(self, quaternion, translation, observations, raw_semantics=None)`: 데이터를 메모리에 추가하는 메서드도 마찬가지로 GPU에서 수행됩니다. 여러 계산이 GPU에서 이루어지고 결과가 CPU로 이동합니다.

이 클래스는 기존의 메모리 클래스를 확장하여 GPU를 사용하도록 수정한 것입니다. 이렇게 함으로써 메모리 작업의 속도를 향상시킬 수 있습니다.

---
---

# 6.5 class SCNavAgent 대규모 분석

### 6.5.1 def \_\_init\_\_(): 
전처리하는 과정. 필요한 변수등을 선언하는 등의 준비단계
매우 많아서 추후 정리 

### 6.5.2 def embedding(self, target):
특정 target에 따라서 하나의 임베딩 텐서를 생성하는 메소드
새로운 텐서를 생성하는데 이때 (1, self.num_channel, self.h, self.w) 이러한 크기를 가지고 모든 요소가 0으로 된다. 각각 채널 수, 높이, 너비 등을 의히한다.
이후 target 채널의 모든 위치(높이와 너비)에 대해서 값을 1로 설정한다.
그리고 반들어진 텐서를 반환한다.

### 6.5.3 def reset_config(self, config):
이 메서드는 로봇이 특정 목표를 향해서 네비게이션을 수행하는 시뮬레이션 환경을 설정하는데 주로 사용된다.
이 코드 조각은 `reset_config` 메서드를 정의하고, 주어진 설정(`config`)을 기반으로 환경을 초기화합니다. 이 메서드는 로봇이나 에이전트가 특정 목표를 향해 네비게이션을 수행하는 시뮬레이션 환경을 설정하는 데 사용됩니다. 

코드를 한 줄씩 분석해 보겠습니다.

```python
def reset_config(self, config):
```
- `reset_config` 메서드를 정의합니다. 이 메서드는 `self`와 `config`라는 두 개의 인수를 받습니다. `self`는 클래스 인스턴스를 가리키며, `config`는 환경 설정 정보를 담고 있습니다.

```python
    # randomly choose a target if no specific target is given
    self.target = config['target']
```
- `config` 딕셔너리에서 `target`을 읽어와 `self.target`에 저장합니다.

```python
    # find a valid habitat episode setting to start with
    # valid: at least one target object reachable
    # and no one target is too close
```
- 유효한 에피소드 설정을 찾기 위한 주석입니다. 유효한 설정은 접근 가능한 목표 객체가 하나 이상 있어야 하고, 너무 가까운 목표가 없어야 합니다.

```python
    start_position = [float(pos) for pos in config['start_position']]
    start_rotation = [float(rot) for rot in config['start_rotation']]
```
- `config`에서 시작 위치와 회전 정보를 가져와 실수 리스트로 변환하여 `start_position`과 `start_rotation`에 저장합니다.

```python
    scene_id = config['scene_id']
    if not self.new_eval:
        start_rotation.reverse()
        self.episode = NavigationEpisode(
            goals= [],
            episode_id="0",
            scene_id=scene_id,
            start_position=start_position,
            start_rotation=start_rotation
        )
    else:
        self.episode = ObjectGoalNavEpisode(
            goals = [],
            episode_id='0',
            scene_id=scene_id,
            start_position=start_position,
            start_rotation=start_rotation,
        )
```
- `config`에서 `scene_id`를 가져옵니다.
- `self.new_eval`이 `False`일 경우, `start_rotation`을 역순으로 하고 `NavigationEpisode` 객체를 생성합니다.
- `self.new_eval`이 `True`일 경우, `ObjectGoalNavEpisode` 객체를 생성합니다.
- `goals`는 빈 리스트로 초기화되고, `episode_id`는 "0"으로 설정됩니다.

```python
    self.env.episode_iterator = iter([self.episode])
    self.env.reset()
```
- 생성한 에피소드를 환경의 에피소드 이터레이터로 설정하고 환경을 리셋합니다.

```python
    candidate_targets = [obj.category.name() for obj in
        self.env.sim.semantic_annotations().objects if
        obj.category.name() in self.targets]
```
- 환경에서 객체들의 주석을 가져와 `self.targets`에 포함된 객체 이름을 `candidate_targets` 리스트에 저장합니다.

```python
    self.target_objects = []
    self.target_radiuss = []
    self.target_positions = []
    self.best_path_length = float("inf")
```
- 목표 객체, 목표 반경, 목표 위치, 최적 경로 길이를 저장할 리스트와 변수를 초기화합니다.

```python
    for obj in self.env.sim.semantic_annotations().objects:
        if obj.category.name() == self.target:
            distance = self.env.sim.geodesic_distance(start_position,
                        obj.aabb.center)
            radius = np.sqrt(obj.aabb.sizes[0]**2 + obj.aabb.sizes[2]**2) / 2.
            if distance < float("inf"):
                self.best_path_length = min(distance - self.success_threshold,
                            self.best_path_length)
                self.target_objects.append(int(obj.id.split("_")[-1]))
                self.target_radiuss.append(radius) 
                self.target_positions.append(obj.aabb.center)
```
- 주석 객체 중 `self.target`과 일치하는 객체를 찾고, 해당 객체와 시작 위치 사이의 지오데식 거리와 반경을 계산합니다.
- 유효한 거리가 있으면, 최적 경로 길이를 업데이트하고, 목표 객체 정보들을 리스트에 추가합니다.

```python
    if self.new_eval:
        self.best_path_length = config['best_path_length']
```
- `self.new_eval`이 `True`이면, `config`에서 최적 경로 길이를 가져와 설정합니다.

```python
    self.env.step("LOOK_DOWN")
    roof_thre = start_position[1] + self.height / 2. + self.offset
    floor_thre = start_position[1] - self.height / 2. - self.floor_threshold
```
- 에이전트가 "LOOK_DOWN" 동작을 수행하게 합니다.
- 천장과 바닥 임계값을 계산합니다.

```python
    id2cat = {int(obj.id.split("_")[-1]): obj.category.index() for obj in
        self.env.sim.semantic_annotations().objects}
    if self.full_map:
        self.mapper.reset(id2cat, roof_thre, floor_thre)
    else:
        self.memory = Memory_gpu(self.aggregate, self.memory_size, self.pano,
            self.num_channel, id2cat, roof_thre, floor_thre,
            ignore=self.ignore, device=self.device)
```
- 객체 ID와 카테고리 인덱스를 매핑하는 딕셔너리를 생성합니다.
- `self.full_map`이 `True`이면, 매퍼를 리셋합니다.
- 그렇지 않으면, `Memory_gpu` 객체를 생성합니다.

```python
    self.id2cat = id2cat
    self.target = name2id[self.target]
    self.target_map = self.embedding(self.target)
```
- `id2cat`을 `self.id2cat`에 저장합니다.
- `self.target`을 해당하는 ID로 변환합니다.
- `self.embedding` 메서드를 호출하여 목표 맵을 생성합니다.

```python
    self.reward = 0.
    self.action = None
    self.current_obs = None
    self.cmplted_obs = None
    self.conf_obs = None
    self.raw_semantics = None
    self.state = None
    self.old_state = None
    self.q_map = None
    self.done = False
    self.success = False

    self.image = None
    self.depth = None
    self.navigable = self.navigable_base + [self.target] 
    self.eps_len = 0.
    self.path_length = 0.

    self.view()
```
- 여러 상태 변수들을 초기화합니다.
- `self.view()` 메서드를 호출합니다.

이 코드 조각은 주어진 설정에 따라 환경을 초기화하고, 에이전트의 목표를 설정하며, 초기 상태를 준비하는 작업을 수행합니다. 이는 강화학습이나 로봇 네비게이션 시뮬레이션에서 사용될 수 있습니다.

### 6.5.4 def reset(self, target=None):
이 코드는 `reset`이라는 메서드를 정의하고, 주어진 목표 또는 랜덤한 목표를 선택하여 시뮬레이션 환경을 초기화하는 작업을 수행합니다. 이는 강화학습 환경에서 에이전트가 새로운 에피소드를 시작할 때 사용될 수 있습니다. 코드를 한 줄씩 분석해 보겠습니다.

```python
def reset(self, target=None):
```
- `reset` 메서드를 정의합니다. 이 메서드는 선택적으로 `target`을 인수로 받습니다.

```python
    # randomly choose a target if no specific target is given
    self.target = None
    if target is not None:
        self.target = target
```
- 특정 목표가 주어지지 않으면 `self.target`을 `None`으로 설정하고, 주어진 목표가 있으면 `self.target`에 저장합니다.

```python
    # find a valid habitat episode setting to start with
    # valid: at least one target object reachable
    # and no one target is too close
    random_heading = np.random.uniform(-np.pi, np.pi)
    start_rotation = [
                0,
                np.sin(random_heading / 2),
                0,
                np.cos(random_heading / 2),
                ]
```
- 유효한 환경 설정을 찾기 위한 주석입니다.
- 랜덤한 방향(`random_heading`)을 생성하고, 이를 사용하여 `start_rotation`(에이전트의 초기 회전)을 설정합니다.

```python
    while True:
        # change house by certain probability
        if self.episode is None or random.random() < self.flip:
            self.episode = random.choice(self.env.episodes)
        
            self.env.episode_iterator = iter([NavigationEpisode(
                goals=[],
                episode_id="0",
                scene_id=self.episode.scene_id,
                start_position=self.episode.start_position,
                start_rotation=self.episode.start_rotation)]
                )
            self.env.reset()
```
- 무한 루프를 시작하여 유효한 환경 설정을 찾습니다.
- 에피소드가 없거나, 특정 확률(`self.flip`)에 따라 새로운 에피소드를 선택합니다.
- 선택된 에피소드를 기반으로 `NavigationEpisode` 객체를 생성하고, 환경을 리셋합니다.

```python
        # pick a target candidate for this episode
        candidate_targets = [obj.category.name() for obj in
                self.env.sim.semantic_annotations().objects if
                obj.category.name() in self.targets]
        legal_rooms = [room.aabb for room in
                self.env.sim.semantic_annotations().regions if
                room.category.name() in self.scene_types]
        # if no legal target to pick in this scene, remove episode
        if len(candidate_targets) == 0:
            self.episode = None
            continue
        if len(legal_rooms) == 0:
            self.episode = None
            continue
        if self.target is not None:
            if self.target not in candidate_targets:
                self.episode = None
                continue
```
- 후보 목표와 유효한 방을 선택합니다.
- 유효한 목표나 방이 없으면 현재 에피소드를 제거하고 루프를 계속 돌립니다.
- 주어진 목표가 후보 목표에 없으면 현재 에피소드를 제거하고 루프를 계속 돌립니다.

```python
        for trial in range(100):
            self.target_objects = []
            self.target_radiuss = []
            self.target_positions = []
            self.best_path_length = float("inf")
            edistance = float("inf")

            if target is None:
                self.target = random.choice(candidate_targets)
            target_room = random.choice(legal_rooms)
            start_position = [target_room.center[0]
                    + (random.random() - 0.5) * abs(target_room.sizes[0]),
                    target_room.center[1] - abs(target_room.sizes[1]) / 2.,
                    target_room.center[2]
                    + (random.random() - 0.5) * abs(target_room.sizes[2])]
            if not self.env.sim.is_navigable(start_position):
                continue
```
- 목표가 주어지지 않으면 랜덤하게 목표를 선택합니다.
- 랜덤하게 유효한 방을 선택하고, 시작 위치를 설정합니다.
- 설정된 시작 위치가 내비게이션 가능한지 확인하고, 그렇지 않으면 다음 시도를 계속합니다.

```python
            for obj in self.env.sim.semantic_annotations().objects:
                if obj.category.name() == self.target:
                    distance = self.env.sim.geodesic_distance(start_position,
                        obj.aabb.center)
                    radius = np.sqrt(obj.aabb.sizes[0]**2 + obj.aabb.sizes[2]**2) / 2.
                    cedistance = self.euclidean_distance(start_position,
                            obj.aabb.center) 
                    # already in success state, illegal, start from very
                    # beginning
                    # or if min_dist is set, cannot be closer
                    if min(cedistance, distance) < radius + self.success_threshold + self.min_dist:
                        self.target_objects = []
                        self.target_radiuss = []
                        self.target_positions = []
                        self.best_path_length = float("inf")
                        edistance = float("inf")
                        break
                    if distance < float("inf"):
                        self.best_path_length = min(distance - self.success_threshold,
                            self.best_path_length)
                        self.target_objects.append(int(obj.id.split("_")[-1]))
                        self.target_radiuss.append(radius)
                        self.target_positions.append(obj.aabb.center)
                        
                        # update shortest euclidean distance
                        edistance = min(edistance, self.euclidean_distance(start_position,
                            obj.aabb.center))
            if edistance < self.max_dist and len(self.target_objects) >= 1:
                break
        if edistance < self.max_dist and len(self.target_objects) >= 1:
            break
```
- 목표 객체를 탐색합니다.
- 각 객체에 대해 지오데식 거리와 유클리드 거리를 계산합니다.
- 목표 객체가 너무 가까운지 확인하고, 그렇다면 다시 시도합니다.
- 유효한 거리와 목표 객체를 찾으면 관련 정보를 업데이트하고 루프를 종료합니다.

```python
    self.env.sim.set_agent_state(position=start_position, rotation=start_rotation)
    self.env.step("LOOK_DOWN")
    roof_thre = start_position[1] + self.height/2. + self.offset
    floor_thre = start_position[1] - self.height/2. - self.floor_threshold
```
- 에이전트의 상태를 설정하고, "LOOK_DOWN" 동작을 수행합니다.
- 천장과 바닥 임계값을 계산합니다.

```python
    id2cat = {int(obj.id.split("_")[-1]): obj.category.index() for obj in
            self.env.sim.semantic_annotations().objects}
    if self.full_map:
        
        self.mapper.reset(id2cat, roof_thre, floor_thre)
    else:
        self.memory = Memory_gpu(self.aggregate, self.memory_size, self.pano,
            self.num_channel, id2cat, roof_thre, floor_thre,
            ignore=self.ignore, device=self.device)
    self.id2cat = id2cat
```
- 객체 ID와 카테고리 인덱스를 매핑하는 딕셔너리를 생성합니다.
- `self.full_map`이 `True`이면, 매퍼를 리셋합니다.
- 그렇지 않으면, `Memory_gpu` 객체를 생성합니다.
- `id2cat`을 `self.id2cat`에 저장합니다.

```python
    self.target = name2id[self.target]        
    # embed target as part of state
    self.target_map = self.embedding(self.target)

    self.reward = 0.
    self.action = None
    self.current_obs = None
    self.cmplted_obs = None
    self.conf_obs = None
    self.raw_semantics = None
    self.state = None
    self.old_state = None
    self.q_map = None
    self.done = False
    self.success = False
    self.seen = None

    self.image = None
    self.depth = None
    self.navigable = self.navigable_base + [self.target] 
    self.eps_len = 0.
    self.path_length = 0.

    self.view()
```
- `self.target`을 해당하는 ID로 변환하고, 목표 맵을 생성합니다.
- 다양한 상태 변수들을 초기화합니다.
- `self.view()` 메서드를 호출하여 초기 설정을 완료합니다.

이 코드는 주어진 목표 또는 랜덤한 목표에 따라 환경을 초기화하고, 에이전트가 새로운 에피소드를 시작할 수 있도록 준비하는 작업을 수행합니다. 이는 강화학습 환경에서 에이전트의 학습을 위한 중요한 초기화 작업입니다.

### 6.5.5 def update_Q_t(self):
이 코드는 딥러닝 모델에서 Q 네트워크의 가중치를 업데이트하는 메서드입니다. Q 네트워크는 종종 강화학습 알고리즘에서 사용됩니다. 이 코드 조각을 분석해 보겠습니다.

```python
def update_Q_t(self):
    self.Q_t.load_state_dict(self.Q.state_dict())
```

- 이 메서드는 `update_Q_t`라는 이름을 가지고 있으며, 인수는 없습니다.
- 메서드는 `self.Q`의 상태를 `self.Q_t`에 복사합니다. 이 두 객체는 딥러닝 모델(예: PyTorch의 `nn.Module` 클래스)의 인스턴스일 가능성이 큽니다.

구체적으로 살펴보겠습니다.

#### `self.Q`와 `self.Q_t`
- `self.Q`는 Q-네트워크로, 주로 현재 상태에서의 행동 가치를 추정하는 데 사용됩니다.
- `self.Q_t`는 타겟 Q-네트워크로, 주로 안정적인 학습을 위해 일정한 간격으로 업데이트되는 네트워크입니다.

#### `load_state_dict`와 `state_dict`
- `self.Q.state_dict()`는 `self.Q` 모델의 현재 가중치와 버퍼들을 딕셔너리 형태로 반환합니다.
- `self.Q_t.load_state_dict(self.Q.state_dict())`는 `self.Q` 모델의 가중치와 버퍼들을 `self.Q_t` 모델에 복사합니다.

#### 강화학습에서의 사용 예
강화학습에서 DQN(Deep Q-Network) 같은 알고리즘에서는 타겟 네트워크를 사용하여 안정적인 학습을 도모합니다. 타겟 네트워크 `Q_t`는 일정 주기마다 주 네트워크 `Q`의 가중치로 업데이트됩니다. 이렇게 하면 학습이 안정적이고, Q 값의 변동이 완화됩니다.

1. **주 네트워크 (`Q`)**: 현재 정책을 기반으로 행동 가치를 예측합니다.
2. **타겟 네트워크 (`Q_t`)**: 일정 주기마다 주 네트워크의 가중치로 업데이트되며, 타겟 값을 계산하는 데 사용됩니다.

예를 들어, 주 네트워크는 매 스텝마다 업데이트되지만, 타겟 네트워크는 1000 스텝마다 주 네트워크의 가중치로 업데이트됩니다. 이 메서드는 그 주기적인 업데이트를 수행하는 역할을 합니다.

이 코드는 강화학습에서 Q-네트워크의 가중치를 업데이트하여 학습의 안정성을 높이는 중요한 역할을 합니다.

### 6.5.6 def update_Q_t_soft(self):
이 코드는 `update_Q_t_soft`라는 메서드로, 소프트 업데이트를 통해 Q 네트워크의 가중치를 업데이트하는 방법을 구현합니다. 이 방식은 강화학습에서 타겟 네트워크의 가중치를 점진적으로 주 네트워크의 가중치에 맞춰가는 방식입니다. 이를 통해 학습이 더욱 안정적이게 됩니다. 아래에서 코드를 분석해 보겠습니다.

```python
def update_Q_t_soft(self):
    old_params = {} 
    for name, params in self.Q_t.module.named_parameters():
        old_params[name] = params.clone()
    for name, params in self.Q.module.named_parameters():
        old_params[name] = old_params[name] * (1 - self.TAU)\
        + params.clone() * self.TAU
    for name, params in self.Q_t.module.named_parameters():
        params.data.copy_(old_params[name])
```

#### 1. `old_params` 딕셔너리 초기화
```python
old_params = {}
```
- `old_params`라는 빈 딕셔너리를 초기화합니다. 이 딕셔너리는 타겟 네트워크(`self.Q_t`)의 가중치와 주 네트워크(`self.Q`)의 가중치를 결합하여 저장하는 데 사용됩니다.

#### 2. 타겟 네트워크의 현재 가중치 복사
```python
for name, params in self.Q_t.module.named_parameters():
    old_params[name] = params.clone()
```
- 타겟 네트워크(`self.Q_t`)의 모든 파라미터를 순회하며, 각 파라미터를 복사해서 `old_params` 딕셔너리에 저장합니다.
- `named_parameters()` 메서드는 파라미터의 이름과 값을 반환합니다.
- `params.clone()`은 파라미터를 복사합니다. 이는 파라미터의 원본 값이 변경되지 않도록 하기 위함입니다.

#### 3. 주 네트워크의 가중치를 타겟 네트워크의 가중치와 결합
```python
for name, params in self.Q.module.named_parameters():
    old_params[name] = old_params[name] * (1 - self.TAU) + params.clone() * self.TAU
```
- 주 네트워크(`self.Q`)의 모든 파라미터를 순회하며, 각 파라미터를 `old_params` 딕셔너리에 있는 타겟 네트워크의 파라미터와 결합합니다.
- `self.TAU`는 소프트 업데이트의 계수로, 일반적으로 0과 1 사이의 값입니다. 예를 들어, `TAU`가 0.01이면, 타겟 네트워크의 가중치의 99%와 주 네트워크의 가중치의 1%를 결합하게 됩니다.
- `old_params[name] = old_params[name] * (1 - self.TAU) + params.clone() * self.TAU`는 타겟 네트워크의 기존 가중치의 1 - `TAU` 비율과 주 네트워크의 새로운 가중치의 `TAU` 비율을 결합합니다.

#### 4. 결합된 가중치를 타겟 네트워크에 복사
```python
for name, params in self.Q_t.module.named_parameters():
    params.data.copy_(old_params[name])
```
- 타겟 네트워크(`self.Q_t`)의 모든 파라미터를 순회하며, `old_params` 딕셔너리에 저장된 결합된 가중치로 업데이트합니다.
- `params.data.copy_(old_params[name])`는 기존의 파라미터 데이터를 새로운 결합된 가중치 데이터로 덮어씁니다.

#### 요약
이 메서드는 소프트 업데이트 방법을 사용하여 타겟 네트워크의 가중치를 주 네트워크의 가중치에 맞춰 점진적으로 조정합니다. 이는 강화학습에서 흔히 사용되는 방법으로, 학습의 안정성을 높이고, 급격한 변화로 인한 학습 불안정을 완화하는 데 도움을 줍니다.

- `TAU`는 업데이트의 크기를 결정하는 계수입니다. 작은 값일수록 타겟 네트워크가 천천히 변합니다.
- 이 방식은 Q-learning에서 타겟 네트워크를 사용하여 더 안정적인 Q-value 업데이트를 보장하는 데 사용됩니다.

### 6.5.7 def train_Q(self):
이 코드는 `train_Q`라는 메서드로, 강화학습의 딥 Q-네트워크(DQN)에서 Q 네트워크를 학습시키는 역할을 합니다. 이 메서드는 경험 재현 버퍼에서 샘플을 가져와서, Q-값을 업데이트합니다. 아래에서 코드를 단계별로 분석하겠습니다.

#### 1. 초기 조건 확인 및 샘플링

```python
if len(self.replay_buffer) < self.batch_size:
    return None
transitions = self.replay_buffer.sample(self.batch_size)
batch = Transition(*zip(*transitions))
```

- `self.replay_buffer`의 크기가 `self.batch_size`보다 작으면 학습을 진행하지 않고 종료합니다.
- `self.replay_buffer.sample(self.batch_size)`를 통해 경험 재현 버퍼에서 배치 크기만큼 샘플을 가져옵니다.
- `Transition` 객체를 사용하여 샘플을 상태, 행동, 보상, 다음 상태로 분리합니다.

#### 2. 배치 데이터 준비

```python
non_final_mask, non_final_next_states = None, None
try:
    non_final_mask = torch.tensor(tuple(map(lambda s: s is not None, batch.next_state)), device=self.device, dtype=torch.bool)
    non_final_next_states = torch.cat([s for s in batch.next_state if s is not None]).to(self.device)
except:
    pass
state_batch = torch.cat(batch.state).to(self.device)
reward_batch = torch.cat(batch.reward).to(self.device)
action_batch = torch.cat(batch.action).to(self.device)
```

- `non_final_mask`는 다음 상태가 존재하는지 여부를 나타내는 불리언 마스크입니다.
- `non_final_next_states`는 다음 상태가 존재하는 샘플들로 구성된 텐서입니다.
- `state_batch`, `reward_batch`, `action_batch`는 현재 상태, 보상, 행동의 배치입니다.

#### 3. 현재 상태에서의 Q 값 계산

```python
state_action_values = torch.zeros(self.batch_size, device=self.device)
q_out = self.Q(state_batch)
state_action_values = q_out.view(self.batch_size, -1).gather(1, action_batch.view(self.batch_size, -1).long()).squeeze(-1)
```

- `q_out`는 현재 상태 배치를 Q 네트워크에 통과시켜 얻은 Q 값입니다.
- `state_action_values`는 각 상태-행동 쌍에 대한 Q 값을 저장합니다.

#### 4. 다음 상태에서의 Q 값 계산 및 타겟 값 계산

```python
next_state_values = torch.zeros(self.batch_size, device=self.device)
if non_final_mask is not None and non_final_next_states is not None:
    if self.double_dqn:
        with torch.no_grad():
            best_action = self.Q(non_final_next_states).view(non_final_next_states.shape[0], -1).max(1)[1].view(non_final_next_states.shape[0], 1)
            next_state_values[non_final_mask] = self.Q_t(non_final_next_states).view(non_final_next_states.shape[0], -1).gather(1, best_action).view(-1)
    else:
        next_state_values[non_final_mask] = self.Q_t(non_final_next_states).view(non_final_next_states.shape[0], -1).max(1)[0].detach()
expected_state_action_values = (next_state_values * self.gamma) + reward_batch
```

- `next_state_values`는 다음 상태에서의 Q 값을 저장합니다.
- `self.double_dqn`이 참이면, 더블 DQN 알고리즘을 사용하여 타겟 Q 값을 계산합니다. 그렇지 않으면 일반 DQN 알고리즘을 사용합니다.
- `expected_state_action_values`는 타겟 값으로, 다음 상태에서의 Q 값과 보상을 이용하여 계산합니다.

#### 5. 손실 계산 및 네트워크 업데이트

```python
loss = F.smooth_l1_loss(state_action_values, expected_state_action_values)
loss_value = float(loss)

self.optimizer.zero_grad()
loss.backward()
torch.nn.utils.clip_grad_norm_(self.Q.parameters(), 1.)
self.optimizer.step()
```

- `F.smooth_l1_loss`를 사용하여 현재 상태-행동 Q 값과 타겟 Q 값 사이의 손실을 계산합니다.
- 옵티마이저의 그라디언트를 초기화하고, 손실에 대한 그라디언트를 역전파합니다.
- 그라디언트 클리핑을 통해 그라디언트 폭발을 방지합니다.
- 옵티마이저를 사용하여 네트워크 파라미터를 업데이트합니다.

#### 6. 손실 값 반환

```python
return loss_value
```

- 손실 값을 반환하여 학습의 진행 상황을 모니터링할 수 있도록 합니다.

#### 요약
이 메서드는 경험 재현 버퍼에서 샘플을 추출하고, Q 네트워크를 업데이트하는 과정입니다. 더블 DQN 알고리즘을 지원하며, 소프트 업데이트와 그라디언트 클리핑을 통해 안정적인 학습을 도모합니다.

### 6.5.8 def get_observations(self):
이 코드는 `get_observations`라는 메서드로, 강화학습 에이전트가 환경에서 관찰을 수집하는 역할을 합니다. 이 메서드는 시뮬레이터에서 현재 센서 데이터를 가져와서 반환합니다. 아래에서 코드를 단계별로 분석하겠습니다.

```python
def get_observations(self):
    return self.env.sim._sensor_suite.get_observations(self.env.sim.get_sensor_observations())
```

#### 1. `self.env.sim.get_sensor_observations()`
```python
self.env.sim.get_sensor_observations()
```
- 이 메서드는 시뮬레이터(`self.env.sim`)에서 현재 센서 데이터(관찰)를 가져옵니다.
- 이 메서드는 시뮬레이터 내부의 센서로부터 현재 상태에 대한 원시 관찰 값을 수집합니다.

#### 2. `self.env.sim._sensor_suite.get_observations(...)`
```python
self.env.sim._sensor_suite.get_observations(self.env.sim.get_sensor_observations())
```
- `self.env.sim._sensor_suite`는 시뮬레이터에서 사용되는 센서 스위트(센서 모음) 객체입니다.
- `get_observations` 메서드는 원시 센서 데이터를 처리하여 관찰을 반환합니다. 이는 센서 데이터가 에이전트가 이해할 수 있는 형태로 변환되는 과정을 포함할 수 있습니다.

#### 반환 값
```python
return self.env.sim._sensor_suite.get_observations(self.env.sim.get_sensor_observations())
```
- 최종적으로 변환된 관찰 데이터를 반환합니다. 이 데이터는 강화학습 에이전트가 환경을 이해하고 행동을 결정하는 데 사용됩니다.

#### 요약
이 메서드는 환경 시뮬레이터에서 센서 데이터를 수집하고, 이를 처리하여 관찰 데이터를 반환합니다. 구체적으로:
1. 시뮬레이터에서 현재 센서 데이터를 가져옵니다.
2. 센서 데이터를 센서 스위트를 통해 처리합니다.
3. 처리된 관찰 데이터를 반환합니다.
이 과정은 에이전트가 환경을 이해하고, 적절한 행동을 선택하는 데 필수적인 정보를 제공하는 역할을 합니다.

### 6.5.9 def get_trinsics(self):
이 코드는 `get_trinsics`라는 메서드로, 에이전트의 센서 상태(특히 깊이 센서)에서 회전(quaternion)과 위치(translation)를 가져오는 역할을 합니다. 이 정보는 에이전트의 현재 시점에서의 상태를 이해하는 데 사용됩니다. 아래에서 코드를 단계별로 분석해 보겠습니다.

```python
def get_trinsics(self):
    quaternion = self.env._sim.get_agent_state().sensor_states['depth'].rotation
    translation = self.env._sim.get_agent_state().sensor_states['depth'].position
    return quaternion, translation
```

#### 1. 에이전트 상태 가져오기

```python
quaternion = self.env._sim.get_agent_state().sensor_states['depth'].rotation
translation = self.env._sim.get_agent_state().sensor_states['depth'].position
```

- `self.env._sim.get_agent_state()`:
  - `self.env._sim`은 시뮬레이터 객체입니다.
  - `get_agent_state()` 메서드는 현재 에이전트의 상태를 반환합니다. 이 상태에는 에이전트의 위치, 회전, 센서 상태 등이 포함됩니다.
  
- `.sensor_states['depth']`:
  - `sensor_states`는 에이전트의 센서 상태를 나타내는 딕셔너리입니다.
  - `'depth'`는 깊이 센서의 상태를 나타냅니다. 이 키를 사용하여 깊이 센서의 상태에 접근합니다.
  
- `.rotation`:
  - 깊이 센서의 회전 상태를 쿼터니언(quaternion) 형태로 반환합니다. 쿼터니언은 회전을 나타내는 방식 중 하나로, 3D 회전을 표현하는 데 사용됩니다.
  
- `.position`:
  - 깊이 센서의 위치를 반환합니다. 이 위치는 3D 공간에서의 좌표로 표현됩니다.

#### 2. 쿼터니언과 위치 반환

```python
return quaternion, translation
```

- `quaternion`과 `translation`을 반환합니다. 이 두 값은 에이전트의 현재 깊이 센서의 회전과 위치를 나타냅니다.
- 반환된 값은 에이전트의 상태를 이해하는 데 사용되며, 특히 깊이 센서의 시점에서의 상태를 나타냅니다.

#### 요약

이 메서드는 시뮬레이터에서 에이전트의 현재 깊이 센서의 회전과 위치를 가져와 반환합니다. 이를 통해 에이전트의 센서 시점에서의 상태를 파악할 수 있습니다.

1. 에이전트의 현재 상태를 시뮬레이터에서 가져옵니다.
2. 깊이 센서의 회전(quaternion)과 위치(translation)을 추출합니다.
3. 이 정보를 반환하여 에이전트의 현재 시점에서의 상태를 이해합니다.

이 정보는 에이전트의 상태를 모니터링하거나, 에이전트가 환경에서의 위치와 방향을 이해하는 데 유용합니다.

### 6.5.10 def single_view_and_save(self):
이 코드는 `single_view_and_save`라는 메서드로, 에이전트가 한 번의 관찰을 수행하고 그 결과를 저장하는 역할을 합니다. 이 과정에서 RGB, 깊이, 그리고 시맨틱(segmentation) 데이터를 처리하고, 이를 메모리에 저장합니다. 아래에서 코드를 단계별로 분석해 보겠습니다.

#### 1. 관찰 데이터 가져오기

```python
observations = self.get_observations()
```

- `self.get_observations()` 메서드를 호출하여 현재 환경에서 에이전트의 관찰 데이터를 가져옵니다.
- `observations`는 딕셔너리 형태로, RGB, 깊이, 시맨틱 데이터를 포함할 수 있습니다.

#### 2. 사용자 시맨틱 데이터 처리

```python
if self.user_semantics:
    # preprocess observation for segmentation network
    rgb = observations['rgb']
    dep = observations['depth']
    sem = observations['semantic']
    sample = {'image': rgb[..., [2, 1, 0]], 'depth': dep[..., 0], 'label': sem}
    sample = transform(sample)
    rgb = sample['image'].unsqueeze(0)
    dep = sample['depth'].unsqueeze(0)
    self.image = rgb.to(self.device)
    self.depth = dep.to(self.device)
```

- `self.user_semantics`가 `True`일 경우, 시맨틱 데이터를 처리합니다.
- `observations`에서 RGB, 깊이, 시맨틱 데이터를 각각 가져옵니다.
- `rgb[..., [2, 1, 0]]`는 RGB 채널의 순서를 변경합니다(보통 BGR을 RGB로 변환).
- `dep[..., 0]`는 깊이 데이터의 첫 번째 채널을 가져옵니다.
- `sample` 딕셔너리에 이미지를 변환하여 저장하고, `transform` 함수를 사용하여 전처리합니다.
- 전처리된 RGB와 깊이 데이터를 배치 차원을 추가하여 (`unsqueeze(0)`), 텐서 형태로 변환하고, `self.device`로 이동시킵니다.

#### 3. 시맨틱 예측

```python
with torch.no_grad():
    self.raw_semantics = self.seg_model(self.image, self.depth).detach().cpu()[0]
    self.raw_semantics = torch.argmax(self.raw_semantics, dim=0).numpy()
```

- `torch.no_grad()` 블록 안에서 시맨틱 네트워크(`self.seg_model`)를 사용하여 시맨틱 예측을 수행합니다.
- 예측 결과를 CPU로 이동시키고 첫 번째 배치를 선택합니다.
- `torch.argmax`를 사용하여 채널 축을 따라 가장 높은 값을 가지는 인덱스를 시맨틱 레이블로 변환합니다.

#### 4. 쿼터니언 및 위치 정보 가져오기

```python
quaternion, translation = self.get_trinsics()
```

- `self.get_trinsics()` 메서드를 호출하여 에이전트의 현재 회전(quaternion)과 위치(translation)을 가져옵니다.

#### 5. 메모리에 저장

```python
self.memory.append(quaternion, translation, self.get_observations(), self.raw_semantics)
```

- `self.memory.append` 메서드를 사용하여 쿼터니언, 위치, 현재 관찰, 시맨틱 데이터를 메모리에 저장합니다.

#### 요약

이 메서드는 에이전트가 한 번의 관찰을 수행하고 그 데이터를 처리하여 저장하는 전체 과정을 다룹니다.

1. 관찰 데이터를 가져옵니다.
2. 사용자 시맨틱 데이터가 활성화된 경우, RGB, 깊이, 시맨틱 데이터를 전처리하고 시맨틱 네트워크를 통해 시맨틱 예측을 수행합니다.
3. 에이전트의 현재 회전과 위치 정보를 가져옵니다.
4. 메모리에 이 데이터를 저장합니다.

이 과정은 에이전트가 환경에서의 상태를 이해하고, 이 정보를 바탕으로 적절한 행동을 선택할 수 있도록 돕습니다.

### 6.5.11 def single_view_and_save_new(self):
이 코드는 `single_view_and_save_new`라는 메서드로, 에이전트가 환경에서 관찰을 수행하고 그 결과를 저장하는 과정을 다룹니다. 이 과정에서는 두 번의 시점 이동("LOOK_UP"과 "LOOK_DOWN")을 통해 데이터를 수집하고, 시맨틱 정보를 포함하여 메모리에 저장합니다. 아래에서 코드를 단계별로 분석해 보겠습니다.

#### 1. 에이전트 시점 이동 및 관찰 데이터 수집

```python
self.env.step("LOOK_UP")
quaternion = self.env._sim.get_agent_state().sensor_states['depth'].rotation 
translation = self.env._sim.get_agent_state().sensor_states['depth'].position
observations = self.env.sim._sensor_suite.get_observations(self.env.sim._sim.get_sensor_observations())
```

- `self.env.step("LOOK_UP")`:
  - 에이전트가 시점을 위로 이동합니다. 이는 에이전트의 시야를 변경하기 위해 수행됩니다.
- `self.env._sim.get_agent_state().sensor_states['depth'].rotation`:
  - 깊이 센서의 회전(quaternion)을 가져옵니다.
- `self.env._sim.get_agent_state().sensor_states['depth'].position`:
  - 깊이 센서의 위치(translation)를 가져옵니다.
- `self.env.sim._sensor_suite.get_observations(self.env.sim._sim.get_sensor_observations())`:
  - 시뮬레이터에서 현재 센서 데이터를 가져옵니다. 이 데이터는 RGB, 깊이, 시맨틱 데이터를 포함할 수 있습니다.

#### 2. 시맨틱 데이터 처리 (사용자 시맨틱이 활성화된 경우)

```python
if self.user_semantics:
    # preprocess observation for segmentation network
    rgb = observations['rgb']
    dep = observations['depth']
    sem = observations['semantic']
    sample = {'image': rgb[..., [2, 1, 0]], 'depth': dep[..., 0], 'label': sem}
    sample = transform(sample)
    rgb = sample['image'].unsqueeze(0)
    dep = sample['depth'].unsqueeze(0)
    self.image = rgb.to(self.device)
    self.depth = dep.to(self.device)

    with torch.no_grad():
        self.raw_semantics = self.seg_model(self.image, self.depth).detach().cpu()[0]
        self.raw_semantics = torch.argmax(self.raw_semantics, dim=0).numpy()
```

- `self.user_semantics`가 `True`일 경우, 시맨틱 데이터를 처리합니다.
- `observations`에서 RGB, 깊이, 시맨틱 데이터를 각각 가져옵니다.
- RGB 채널 순서를 변경하고, 깊이 데이터의 첫 번째 채널을 가져옵니다.
- `sample` 딕셔너리에 이미지를 변환하여 저장하고, `transform` 함수를 사용하여 전처리합니다.
- 전처리된 RGB와 깊이 데이터를 배치 차원을 추가하여 텐서 형태로 변환하고, `self.device`로 이동시킵니다.
- `torch.no_grad()` 블록 안에서 시맨틱 네트워크(`self.seg_model`)를 사용하여 시맨틱 예측을 수행합니다.
- 예측 결과를 CPU로 이동시키고, 가장 높은 값을 가지는 인덱스를 시맨틱 레이블로 변환합니다.

#### 3. 에이전트 시점 이동

```python
self.env.step("LOOK_DOWN")
```

- 에이전트가 시점을 아래로 이동합니다. 이는 원래 시점으로 돌아가기 위해 수행됩니다.

#### 4. 메모리에 저장

```python
if self.user_semantics:
    self.mapper.append(quaternion, translation, observations, raw_semantics=self.raw_semantics)
else:
    self.mapper.append(quaternion, translation, observations, raw_semantics=None)
```

- `self.mapper.append` 메서드를 사용하여 쿼터니언, 위치, 관찰 데이터를 메모리에 저장합니다.
- 시맨틱 데이터가 활성화된 경우 `raw_semantics`를 함께 저장하고, 그렇지 않은 경우 `None`을 저장합니다.

#### 요약

이 메서드는 에이전트가 환경에서 관찰을 수행하고 그 데이터를 처리하여 저장하는 전체 과정을 다룹니다.

1. 에이전트의 시점을 위로 이동하고 관찰 데이터를 수집합니다.
2. 사용자 시맨틱 데이터가 활성화된 경우, RGB, 깊이, 시맨틱 데이터를 전처리하고 시맨틱 네트워크를 통해 시맨틱 예측을 수행합니다.
3. 에이전트의 시점을 아래로 이동합니다.
4. 쿼터니언, 위치, 관찰 데이터, 시맨틱 데이터를 메모리에 저장합니다.

이 과정은 에이전트가 환경을 이해하고, 수집된 데이터를 바탕으로 적절한 행동을 선택할 수 있도록 돕습니다.

### 6.5.12 def view(self):
이 코드는 에이전트가 환경을 관찰하고 그 결과를 처리하여 상태를 구성하는 `view` 메서드입니다. 이 메서드는 다음과 같은 단계로 수행됩니다.

#### 1. 파노라마 모드 여부 확인

```python
if self.pano:
    for i in range(4):
        self.rotate(np.pi/2.)
        if self.full_map:
            self.single_view_and_save_new()
        else:
            self.single_view_and_save()
else:
    if self.full_map:
        self.single_view_and_save_new()
    else:
        self.single_view_and_save()
```

- 파노라마 모드가 활성화되어 있으면, 시점을 90도씩 회전시키고 각 시점에서 `single_view_and_save_new` 또는 `single_view_and_save` 메서드를 호출하여 관찰 데이터를 수집하고 저장합니다.
- 파노라마 모드가 비활성화되어 있으면, 단일 관찰만 수행합니다.

#### 2. 시점 이동 및 데이터 저장

```python
self.env.step("LOOK_UP")
quaternion, translation = self.get_trinsics()        
self.env.step("LOOK_DOWN")
```

- 에이전트의 시점을 위로 올리고, 쿼터니언과 위치 정보를 가져옵니다.
- 시점을 다시 아래로 내리고, 메모리에 관찰 데이터를 저장합니다.

#### 3. 현재 상태 구성

```python
if self.full_map:
    self.current_obs = self.mapper.get_map_local_rot(quaternion, translation, float(self.h), float(self.w)).unsqueeze(0).float()
else:
    _, self.current_obs = self.memory.get_height_map(quaternion, translation, self.area_x, self.area_z, self.h, self.w) 

self.state = torch.cat((self.current_obs, self.target_map), dim=1)
```

- 만약 전체 맵을 사용하는 경우, `self.mapper.get_map_local_rot` 메서드를 호출하여 현재 맵 정보를 가져옵니다.
- 그렇지 않으면, `self.memory.get_height_map` 메서드를 호출하여 지역 맵 정보를 가져옵니다.
- 현재 상태는 현재 관찰 데이터와 타겟 맵을 연결하여 구성됩니다.

#### 4. 보충 정보 추가 (옵션)

```python
with torch.no_grad():
    if self.cmplt:
        # 생략
    if self.fake_conf:
        # 생략
    elif self.conf:
        # 생략
```

- 보충 정보가 활성화된 경우, 각 정보에 대해 처리를 수행합니다. 보충 정보는 시맨틱 완성(`cmplt`), 가짜 확신(`fake_conf`), 실제 확신(`conf`) 등을 포함할 수 있습니다.

#### 5. 상태 크기 조정

```python
assert self.h == self.h_new, "no resizing for now"
```

- 상태의 크기가 조절되었는지 확인합니다. 현재는 크기 조절이 없다는 메시지를 출력합니다.

이 메서드는 에이전트의 시점을 변경하고, 관찰 데이터를 수집하여 현재 상태를 구성하는 중요한 과정을 수행합니다.

### 6.5.13 def action_picker(self, eps_threshold):
이 코드는 에이전트가 행동을 선택하는 방법을 정의하는 `action_picker` 메서드입니다. 이 메서드는 E-Greedy Algorithm을 따라 행동을 선택합니다. 아래에서 코드를 단계별로 살펴보겠습니다.

#### 1. E-Greedy Algorithm 적용

```python
sample = random.random()
if sample > eps_threshold:
```

- 0과 1 사이의 랜덤 샘플을 추출합니다.
- 이 샘플이 E 임계값보다 크면, Greedy 방식으로 행동을 선택합니다.

#### 2. Greedy 행동 선택

```python
tmp = torch.argmax(self.q_map.view(-1))
a_w = tmp % self.w_new 
a_h = (tmp - a_w) / self.w_new
self.action = (a_h, a_w)
```

- Q-value 맵에서 가장 큰 값을 가지는 인덱스를 찾습니다.
- 이 인덱스를 행렬의 좌표로 변환하여 (`a_h`, `a_w`)에 저장합니다.
- 이 좌표가 선택한 행동을 나타냅니다.

#### 3. 무작위 행동 선택

```python
else:
    self.action = (random.randint(0, self.h_new - 1), random.randint(0, self.w_new - 1))
```

- E 임계값보다 샘플이 작으면, 무작위로 행동을 선택합니다.
- 행동은 `(0, 0)`부터 `(self.h_new - 1, self.w_new - 1)`까지의 무작위 좌표로 결정됩니다.

이 메서드는 E-Greedy Algorithm을 따라 행동을 선택합니다. 랜덤한 확률에 따라 Greedy 최적의 행동을 선택하거나, 무작위로 탐험하는 행동을 선택합니다.

### 6.5.14 def reach_goal(self, c_x, c_y):
이 코드는 `reach_goal` 메서드로, 에이전트가 목표 지점에 도달했는지 여부를 확인하는 기능을 수행합니다. 아래에 단계별로 코드를 분석하겠습니다.

#### 입력 변수
- `c_x`, `c_y`: 현재 위치의 좌표입니다.
- `self.action`: 에이전트가 선택한 목표 위치의 좌표입니다.
- `self.adj`: 목표 영역의 크기를 결정하는 변수입니다.

#### 1. 목표 영역 설정

```python
lx = self.action[0] - int(self.adj / 2.)
ux = self.action[0] + int(self.adj / 2.)
ly = self.action[1] - int(self.adj / 2.)
uy = self.action[1] + int(self.adj / 2.)
```

- `lx`, `ux`: 목표 위치의 x 좌표에 대해 하한과 상한을 설정합니다.
- `ly`, `uy`: 목표 위치의 y 좌표에 대해 하한과 상한을 설정합니다.
- `self.adj`의 절반을 빼고 더하여 목표 영역을 설정합니다.

#### 2. 현재 위치가 목표 영역 내에 있는지 확인

```python
if c_x >= lx:
    if c_x <= ux:
        if c_y >= ly:
            if c_y <= uy:
                return True
return False
```

- 현재 위치 `c_x`가 목표 영역의 x 좌표 범위 내에 있는지 확인합니다.
- 현재 위치 `c_y`가 목표 영역의 y 좌표 범위 내에 있는지 확인합니다.
- 두 조건을 모두 만족하면 `True`를 반환하여 에이전트가 목표에 도달했음을 나타냅니다.
- 조건을 만족하지 않으면 `False`를 반환합니다.

#### 요약

이 메서드는 현재 위치(`c_x`, `c_y`)가 목표 위치(`self.action`)를 중심으로 한 사각형 영역 내에 있는지를 확인합니다. 영역의 크기는 `self.adj`에 의해 결정됩니다. 조건을 모두 만족하면 `True`를 반환하여 에이전트가 목표에 도달했음을 나타내고, 그렇지 않으면 `False`를 반환합니다.

### 6.5.15 def planner_path(self, eps_threshold):
이 코드는 `planner_path` 메서드로, 목표 지점에 도달하기 위해 경로를 계획하고 에이전트의 움직임을 결정하는 기능을 수행합니다. 아래에 단계별로 코드를 분석하겠습니다.

#### 입력 변수
- `eps_threshold`: 탐험-활용 균형을 조정하는 임계값입니다.

#### 주요 단계

1. **초기 설정 및 변수 초기화**

```python
self.action_picker(eps_threshold)
c_x = int(self.h_new / 2)
c_y = int(self.w_new / 2)

counter = 0
visited = np.zeros((self.h_new, self.w_new)).astype('int')

a_x = max(min(self.action[0], self.h_new - 2), 1)
a_y = max(min(self.action[1], self.w_new - 2), 1)
visited[a_x-1:a_x + 2, a_y - 1: a_y + 2] = 1
```

- `self.action_picker(eps_threshold)`를 호출하여 에이전트의 목표 위치를 결정합니다.
- `c_x`, `c_y`는 에이전트의 초기 위치를 설정합니다.
- `visited` 배열을 초기화하여 방문한 위치를 추적합니다.
- `a_x`, `a_y`는 목표 위치를 설정하고, 해당 위치를 중심으로 3x3 영역을 방문한 것으로 표시합니다.

2. **목표 지점에 도달할 때까지 반복**

```python
while not self.reach_goal(c_x, c_y):
    if counter >= self.num_local:
        break
    counter += 1
    # get up-to-date distance map at this local step
    obs = torch.argmax(self.current_obs, dim=1)
    self.obstacle = (obs == 1) | (obs == self.target) | (obs == self.num_channel - 1)
    self.obstacle = self.obstacle[0].int().numpy()

    visited[c_x-1:c_x + 2, c_y - 1:c_y + 2] = 1
    self.obstacle[visited == 1] = 1
```

- `self.reach_goal(c_x, c_y)`를 호출하여 에이전트가 목표 지점에 도달했는지 확인합니다.
- `counter`가 `self.num_local`보다 작으면 반복합니다.
- `self.current_obs`에서 현재 관측된 장애물을 추출합니다.
- `visited` 배열에서 방문한 위치를 장애물로 표시합니다.

3. **거리 맵 계산 및 이동 방향 결정**

```python
def add_boundary(mat):
    h, w = mat.shape
    gap = int(self.adj / 2.)
    new_mat = np.zeros((h+2 * gap,w+2 * gap))
    new_mat[gap:h+gap,gap:w+gap] = mat
    return new_mat

self.obstacle = add_boundary(self.obstacle)
tmp = np.ma.masked_values(self.obstacle * 1, 0)
gap = int(self.adj / 2.)
tmp[self.action[0] + gap, self.action[1] + gap] = 0
dd = skfmm.distance(tmp, dx=1)
dd = np.ma.filled(dd, np.max(dd) + 1)

crop = dd[c_x:c_x + 2*gap + 1, c_y:c_y + 2*gap]
crop[c_x + gap, c_y + gap] = np.max(dd) + 1
(d_x, d_y) = np.unravel_index(np.argmin(crop), crop.shape)
```

- `add_boundary` 함수는 장애물 배열에 경계를 추가합니다.
- `self.obstacle`에 경계를 추가하고, `tmp`로 장애물 배열을 복사합니다.
- `dd`는 Fast Marching Method(FMM)를 사용하여 거리 맵을 계산합니다.
- `crop` 배열은 현재 위치 주변의 거리를 나타내며, `d_x`, `d_y`는 가장 가까운 목표 지점의 상대 좌표를 나타냅니다.

4. **회전 각도 계산**

```python
angle = None
if d_y > gap:
    if d_x < gap:
        angle = np.arctan((d_y - gap) / (gap - d_x))
    else:
        angle = np.arctan((d_x - gap) / (d_y - gap))
        angle += np.pi / 2.

elif d_x < gap:
    angle = np.arctan((gap - d_y) / (gap - d_x))
    angle = -angle

else:
    angle = np.arctan((d_x - gap) / (gap - d_y))
    angle = -np.pi / 2 - angle
self.action_list.append(-angle)
```

- `angle`은 목표 지점을 향한 회전 각도를 계산합니다.
- `d_x`, `d_y`에 따라 각도를 계산하고, `self.action_list`에 추가합니다.

5. **대각선 이동 및 결과 반환**

```python
diag = int(np.sqrt((self.action[0] - source[0])**2 + (self.action[1] - source[1])**2)) - 1
if diag < 0:
    diag = 0
for k in range(diag):
    self.action_list.append(0.)

return self.action_list
```

- 목표 지점과의 대각선 거리를 계산하고, 해당 거리만큼 `self.action_list`에 0을 추가합니다.
- 최종적으로 `self.action_list`를 반환합니다.

#### 요약

이 메서드는 에이전트가 목표 지점에 도달하기 위해 경로를 계획합니다. 목표 위치를 설정하고, 장애물과 방문한 위치를 고려하여 이동 방향을 결정합니다. 각 이동 단계마다 장애물 맵을 업데이트하고, 목표 지점을 향해 회전 각도를 계산합니다. 최종적으로 에이전트의 움직임 목록을 반환합니다.

### 6.5.16 def planner(self, eps_threshold):
이 `planner` 메서드는 에이전트가 목표 지점을 향해 이동할 수 있도록 회전하고 전진하는 계획을 세웁니다. 주어진 `eps_threshold`를 기반으로 움직임을 결정하며, 목표를 향한 회전 각도를 계산하고 그 후 앞으로 이동합니다. 아래에 단계별로 코드를 분석하겠습니다.

#### 입력 변수
- `eps_threshold`: 탐험-활용 균형을 조정하는 임계값입니다.

#### 주요 단계

1. **초기 설정 및 변수 초기화**

```python
self.action_picker(eps_threshold)
action_list = []
source = (self.h_new / 2 - 0.5, self.w_new / 2 - 0.5)
```

- `self.action_picker(eps_threshold)`를 호출하여 에이전트의 목표 위치를 결정합니다.
- `action_list`는 에이전트의 행동 목록을 저장할 리스트입니다.
- `source`는 에이전트의 초기 위치를 설정합니다. (격자의 중심 위치)

2. **목표 지점을 향해 회전 각도 계산**

```python
angle = None
if self.action[1] > source[1]:
    if self.action[0] < source[0]:
        angle = np.arctan((self.action[1] - source[1]) / (source[0] - self.action[0]))

    else:
        angle = np.arctan((self.action[0] - source[0]) / (self.action[1] - source[1]))
        angle += np.pi / 2.

elif self.action[0] < source[0]:
    angle = np.arctan((source[1] - self.action[1]) / (source[0] - self.action[0]))
    angle = -angle

else:
    angle = np.arctan((self.action[0] - source[0]) / (source[1] - self.action[1]))
    angle = -np.pi/2 - angle
```

- `angle` 변수는 목표 지점을 향한 회전 각도를 저장합니다.
- `self.action`는 목표 지점의 좌표를 나타내며, `source`는 현재 위치입니다.
- 여러 조건문을 통해 목표 지점을 향한 회전 각도를 계산합니다:
  - `self.action[1] > source[1]`: 목표가 현재 위치의 오른쪽에 있는 경우
  - `self.action[0] < source[0]`: 목표가 현재 위치의 위쪽에 있는 경우
  - `self.action[0] >= source[0]`: 목표가 현재 위치의 아래쪽에 있는 경우

3. **계산된 회전 각도와 전진 명령 추가**

```python
action_list.append(-angle)
action_list.append("MOVE_FORWARD")
```

- `action_list`에 회전 각도를 추가합니다.
- 에이전트를 목표 지점을 향해 회전시킨 후 "MOVE_FORWARD" 명령을 추가합니다.

4. **결과 반환**

```python
return action_list
```

- 최종적으로 `action_list`를 반환합니다. 이 리스트에는 에이전트가 목표 지점을 향해 회전하고 앞으로 이동하는 명령이 포함됩니다.

#### 요약

이 `planner` 메서드는 에이전트가 목표 지점을 향해 회전하고 전진하는 계획을 세웁니다. 주어진 `eps_threshold`를 기반으로 목표 지점을 선택하고, 에이전트의 현재 위치를 기준으로 목표 지점을 향한 회전 각도를 계산합니다. 그 후, 에이전트는 목표 지점을 향해 회전한 다음 앞으로 이동합니다. 반환된 `action_list`는 이 계획된 움직임을 나타냅니다.

### 6.5.17 def planner_discrete(self, randomness):
이 `planner_discrete` 메서드는 주어진 무작위성 수준에 따라 에이전트의 다음 행동을 계획합니다. 여기서는 이산적인 움직임을 고려하여, 특정 방향으로 회전한 후 앞으로 이동하는 방식으로 에이전트의 행동을 결정합니다.

#### 입력 변수
- `randomness`: 에이전트의 행동 선택에서 무작위성을 제어하는 값입니다. 이 값이 클수록 에이전트는 무작위로 행동할 가능성이 높습니다.

#### 주요 단계

1. **무작위 샘플링**

```python
sample = random.random()
```

- 0과 1 사이의 무작위 실수를 생성합니다.

2. **행동 선택**

```python
if sample > randomness:
    self.action = int(torch.argmax(self.q_map))
else:
    self.action = random.randint(0, self.q_map.shape[0]-1)
```

- 무작위 샘플이 `randomness` 값보다 크면, `q_map`에서 가장 큰 값을 가지는 인덱스를 선택합니다. 이는 에이전트가 현재 상태에서 가장 좋은 것으로 평가된 행동을 선택하는 것입니다.
- 무작위 샘플이 `randomness` 값보다 작으면, `q_map`의 가능한 행동 중 하나를 무작위로 선택합니다. 이는 탐험을 위한 것입니다.

3. **행동 리스트 구성**

```python
action_list = [self.action * np.pi/4., 'MOVE_FORWARD']
```

- 선택된 행동 인덱스를 기반으로 회전 각도를 계산합니다. 여기서 인덱스는 `0`부터 `7`까지의 값을 가질 수 있으며, 이를 `π/4`(45도) 단위로 곱하여 회전 각도를 설정합니다.
- 'MOVE_FORWARD' 명령을 추가하여 에이전트가 앞으로 이동하도록 합니다.

4. **결과 반환**

```python
return action_list
```

- 최종적으로 `action_list`를 반환합니다. 이 리스트에는 에이전트가 회전한 각도와 앞으로 이동하는 명령이 포함됩니다.

#### 요약

`planner_discrete` 메서드는 무작위성을 고려하여 에이전트의 다음 행동을 계획합니다. 무작위성 값에 따라 에이전트는 가장 좋은 평가를 받은 행동을 선택하거나 무작위로 행동을 선택할 수 있습니다. 선택된 행동은 특정 각도로 회전한 후 앞으로 이동하는 명령으로 구성됩니다. 반환된 `action_list`는 이 계획된 움직임을 나타냅니다.

### 6.5.18 def euclidean_distance(self, position_a, position_b):
이 `euclidean_distance` 메서드는 두 위치 간의 유클리드 거리를 계산합니다. 유클리드 거리는 두 점 사이의 직선 거리로 정의되며, 여기서는 numpy 라이브러리를 사용하여 계산됩니다.

#### 코드 분석

```python
def euclidean_distance(self, position_a, position_b):
    return np.linalg.norm(position_b - position_a, ord=2)
```

#### 입력 변수
- `position_a`: 첫 번째 위치를 나타내는 numpy 배열입니다.
- `position_b`: 두 번째 위치를 나타내는 numpy 배열입니다.

#### 주요 단계
1. **벡터 차이 계산**
   ```python
   position_b - position_a
   ```
   - 이 연산은 두 위치 벡터 간의 차이를 계산합니다. 결과는 각 좌표의 차이를 요소로 갖는 새로운 벡터입니다.
   
2. **유클리드 거리 계산**
   ```python
   np.linalg.norm(position_b - position_a, ord=2)
   ```
   - `np.linalg.norm` 함수는 벡터의 노름(norm)을 계산하는 함수입니다.
   - `ord=2`는 2-노름을 지정하며, 이는 유클리드 노름을 의미합니다. 
   - 벡터의 2-노름은 벡터의 각 요소를 제곱하여 더한 후, 그 결과의 제곱근을 구하는 방식으로 계산됩니다.

#### 반환 값
- 두 위치 간의 유클리드 거리로, 이는 두 점 사이의 직선 거리를 나타냅니다.

#### 예제

만약 `position_a`가 `[1, 2, 3]`이고 `position_b`가 `[4, 5, 6]`이라면:
```python
distance = np.linalg.norm([4, 5, 6] - [1, 2, 3], ord=2)
```
이것은 다음과 같이 계산됩니다:
1. 벡터 차이: `[4-1, 5-2, 6-3]` => `[3, 3, 3]`
2. 2-노름 계산: `sqrt(3^2 + 3^2 + 3^2)` => `sqrt(27)` => `5.196`

따라서, `euclidean_distance([1, 2, 3], [4, 5, 6])`는 `5.196`을 반환합니다.

#### 요약

이 메서드는 두 위치 벡터 간의 유클리드 거리를 계산하여 반환합니다. 이는 두 점 사이의 직선 거리로, 주로 기하학적 공간에서 두 점 사이의 실제 거리를 측정하는 데 사용됩니다.

### 6.5.19 def shortest_distance(self):
이 `shortest_distance` 메서드는 에이전트와 여러 목표 위치 간의 최단 거리를 계산하여 반환합니다. 구체적으로, 에이전트의 현재 위치에서 각 목표 위치까지의 지오데식(geodesic) 거리를 계산하고, 각 거리에서 목표의 반경 및 성공 임계값을 뺀 값 중 가장 작은 값을 반환합니다.

#### 코드 분석

```python
def shortest_distance(self):
    best = float("inf")
    position = self.env.sim.get_agent_state().position
    for oid, pos in enumerate(self.target_positions):
        best = min(best, self.env.sim.geodesic_distance(position, pos)
                - self.target_radiuss[oid] - self.success_threshold)
    return best
```

#### 주요 단계
1. **초기화**
   ```python
   best = float("inf")
   ```
   - `best` 변수는 초기값으로 무한대(`float("inf")`)로 설정됩니다. 이는 최소값을 찾기 위한 초기값입니다.
   
2. **현재 에이전트 위치 가져오기**
   ```python
   position = self.env.sim.get_agent_state().position
   ```
   - 에이전트의 현재 위치를 가져옵니다.
   
3. **목표 위치들에 대한 거리 계산**
   ```python
   for oid, pos in enumerate(self.target_positions):
       best = min(best, self.env.sim.geodesic_distance(position, pos)
               - self.target_radiuss[oid] - self.success_threshold)
   ```
   - 각 목표 위치에 대해 루프를 실행합니다.
   - `self.env.sim.geodesic_distance(position, pos)`를 사용하여 현재 에이전트 위치(`position`)와 목표 위치(`pos`) 사이의 지오데식 거리를 계산합니다.
   - 각 거리에서 해당 목표의 반경(`self.target_radiuss[oid]`) 및 성공 임계값(`self.success_threshold`)을 뺍니다.
   - `best` 변수에 이 값들 중 최소값을 갱신합니다.
   
4. **최종 거리 반환**
   ```python
   return best
   ```
   - 최단 거리를 반환합니다.

#### 예제

만약 에이전트의 현재 위치가 `[0, 0, 0]`이고, 목표 위치들이 `[[3, 4, 0], [1, 1, 0], [5, 5, 0]]`이며, 각 목표의 반경이 `[1, 0.5, 2]`이고 성공 임계값이 `0.1`인 경우:
1. 첫 번째 목표:
   - 지오데식 거리: `5` (유클리드 거리로 가정)
   - 조정 거리: `5 - 1 - 0.1 = 3.9`
2. 두 번째 목표:
   - 지오데식 거리: `sqrt(2) ≈ 1.414`
   - 조정 거리: `1.414 - 0.5 - 0.1 = 0.814`
3. 세 번째 목표:
   - 지오데식 거리: `sqrt(50) ≈ 7.071`
   - 조정 거리: `7.071 - 2 - 0.1 = 4.971`

따라서, 최단 조정 거리는 `0.814`입니다.

#### 요약

`shortest_distance` 메서드는 에이전트의 현재 위치에서 각 목표 위치까지의 조정된 지오데식 거리(목표의 반경 및 성공 임계값을 뺀 거리) 중 가장 짧은 거리를 계산하여 반환합니다. 이 메서드는 에이전트가 목표에 얼마나 가까운지를 평가하는 데 유용합니다.

### 6.5.20 def rotate(self, angle):
이 `rotate` 메서드는 에이전트의 현재 회전 상태를 지정된 각도만큼 회전시킵니다. 이를 통해 에이전트의 방향을 변경할 수 있습니다. 코드는 회전 변환 행렬을 생성하고 이를 에이전트의 현재 회전 행렬에 곱한 후, 새로운 회전 상태로 에이전트를 업데이트합니다.

#### 코드 분석

```python
def rotate(self, angle):
    # 회전 변환 행렬 생성
    tr = np.array([
        [np.cos(angle), 0., np.sin(angle)],
        [0., 1., 0.],
        [-np.sin(angle), 0., np.cos(angle)]
    ])

    # 에이전트의 현재 위치와 회전 상태 가져오기
    position = self.env.sim.get_agent_state().position
    quaternion = self.env.sim.get_agent_state().rotation
    rotation = as_rotation_matrix(quaternion)

    # 회전 변환 행렬과 현재 회전 행렬을 곱함
    rotation = np.dot(rotation, tr)

    # 새로운 회전 상태로 에이전트 업데이트
    self.env.sim.set_agent_state(position=position,
            rotation=from_rotation_matrix(rotation), reset_sensors=False)
```

#### 주요 단계

1. **회전 변환 행렬 생성**
   ```python
   tr = np.array([
       [np.cos(angle), 0., np.sin(angle)],
       [0., 1., 0.],
       [-np.sin(angle), 0., np.cos(angle)]
   ])
   ```
   - 주어진 각도(`angle`)에 따라 회전 변환 행렬을 생성합니다. 이 행렬은 Y축을 중심으로 한 회전을 나타냅니다.
   - 이 변환 행렬은 3x3 크기로, 회전 변환을 적용하기 위해 사용됩니다.

2. **현재 위치와 회전 상태 가져오기**
   ```python
   position = self.env.sim.get_agent_state().position
   quaternion = self.env.sim.get_agent_state().rotation
   rotation = as_rotation_matrix(quaternion)
   ```
   - 에이전트의 현재 위치와 회전 상태(쿼터니언)를 가져옵니다.
   - `as_rotation_matrix` 함수를 사용하여 쿼터니언을 회전 행렬로 변환합니다.

3. **회전 변환 적용**
   ```python
   rotation = np.dot(rotation, tr)
   ```
   - 기존 회전 행렬에 새로운 회전 변환 행렬을 곱하여 최종 회전 행렬을 계산합니다.

4. **에이전트의 새로운 회전 상태 설정**
   ```python
   self.env.sim.set_agent_state(position=position,
           rotation=from_rotation_matrix(rotation), reset_sensors=False)
   ```
   - 계산된 새로운 회전 행렬을 다시 쿼터니언으로 변환(`from_rotation_matrix` 함수 사용)하고, 이를 사용하여 에이전트의 회전 상태를 업데이트합니다.
   - `position`은 변경되지 않으며, `reset_sensors` 플래그는 `False`로 설정되어 센서 상태는 초기화되지 않습니다.

#### 요약

이 `rotate` 메서드는 주어진 각도만큼 에이전트를 회전시키는 기능을 합니다. 이를 위해 현재 회전 상태를 가져와 회전 변환 행렬을 적용한 후, 새로운 회전 상태를 에이전트에 설정합니다. 이 방법은 에이전트의 방향을 동적으로 변경해야 하는 다양한 시나리오에서 유용하게 사용될 수 있습니다.

### 6.5.21 def move_path(self):

#### 1. 함수 정의 및 초기 설정

```python
def move_path(self):
    assert False, "Pause"  # 임시 중단을 위해 사용된 어서션
    reward = 0.0  # 초기 보상 설정
    old_distance = self.shortest_distance()  # 현재 위치와 목표 사이의 거리 계산
    action = None  # 초기 행동 설정
    distance = None  # 초기 거리 설정
    idx = 1  # 경로 인덱스 초기화
```

여기서 함수가 정의되고, 초기 보상이 0으로 설정됩니다. `shortest_distance()` 메서드를 호출하여 현재 위치와 목표 사이의 거리를 계산하고, `action`과 `distance` 변수를 초기화합니다. 

#### 2. 경로 이동 및 회전

```python
    for action in self.action_list:
        reward += self.step_penalty  # 이동 시 페널티 적용
        self.rotate(action)  # 회전 명령 실행
        
        old_position = self.env.sim.get_agent_state().position  # 이동 전 위치 기록
        self.env.step("MOVE_FORWARD")  # 전진 명령 실행
        new_position = self.env.sim.get_agent_state().position  # 이동 후 위치 기록

        distance = self.euclidean_distance(old_position, new_position)  # 이동 거리 계산
        self.path_length += distance  # 총 경로 길이에 추가
        self.eps_len += 1  # 에피소드 길이 증가

        self.action = (self.path[idx][0], self.path[idx][1])  # 다음 행동 설정
        idx += 1  # 경로 인덱스 증가

        if distance < self.collision_threshold:  # 충돌 여부 확인
            reward += self.collision_penalty  # 충돌 시 페널티 적용
            break  # 충돌 발생 시 반복 종료
        
        if not self.training and self.eps_len >= self.max_step:  # 최대 스텝 수 초과 여부 확인
            break  # 최대 스텝 수 초과 시 반복 종료
```

여기서는 `action_list`에 정의된 각 행동을 반복하면서 에이전트를 회전시키고 전진시킵니다. 이동 전후의 위치를 기록하고 이동 거리를 계산합니다. 충돌이 발생하거나 최대 스텝 수를 초과하면 반복을 종료합니다.

#### 3. 접근 보상 계산

```python
    new_distance = self.shortest_distance()  # 이동 후 거리 계산
    reward += self.approach_reward * (old_distance - new_distance)  # 접근 보상 계산
```

이동 전후의 거리를 비교하여 접근 보상을 계산합니다. 목표에 가까워질수록 더 많은 보상을 받습니다.

#### 4. 성공 여부 판별 (기본)

```python
    self.done = False  # 초기 성공 여부 설정
    self.success = False  # 초기 성공 상태 설정

    if not self.user_semantics:  # 세그멘틱 정보 사용 여부 확인
        for t in range(4):
            self.rotate(np.pi / 2)  # 90도 회전
            if self.success:
                continue
            done = self.stop_checker()  # 현재 상태에서 멈춰야 하는지 확인
            self.success = done and self.success_checker()  # 멈춤 및 성공 여부 확인
            self.done = self.done or done  # 멈춤 여부 업데이트
```

세그멘틱 정보를 사용하지 않는 경우, 에이전트는 네 번 90도 회전하며 각 방향에서 목표에 도달했는지 확인합니다. 

#### 5. 성공 여부 판별 (세그멘틱 정보 사용)

```python
    else:
        success = False
        rgbs, deps = None, None  
        depths = None
        for t in range(4):
            self.rotate(np.pi / 2)
            success = success or self.success_checker()
            depth = self.get_observations()['depth']
            depth = depth * self.d2x
            if depths is None:
                depths = depth[..., 0][np.newaxis, ...]
            else:
                depths = np.concatenate((depths, depth[..., 0][np.newaxis, ...]), axis=0)
            observations = self.get_observations()
            rgb = observations['rgb']
            dep = observations['depth']
            sem = observations['semantic']
            sample = {'image': rgb[..., [2, 1, 0]], 'depth': dep[..., 0], 'label': sem}
            sample = transform(sample)
            rgb = sample['image'].unsqueeze(0)
            dep = sample['depth'].unsqueeze(0)
            rgbs = rgb if rgbs is None else torch.cat((rgbs, rgb), dim=0)
            deps = dep if deps is None else torch.cat((deps, dep), dim=0)

        with torch.no_grad():
            raw_semantics = self.seg_model(rgbs.to(self.device), deps.to(self.device)).detach()
            raw_semantics = torch.argmax(raw_semantics, dim=1)

        depths = torch.from_numpy(depths).to(self.device)
        check = (raw_semantics == self.target) & (depths != 0.0) & (depths <= self.success_threshold)
        if torch.any(torch.sum(check.int().view(4, -1), dim=1) > self.seg_threshold):
            self.done = True
        raw_semantics = raw_semantics.cpu()
        depths = depths.cpu()
        self.success = self.done and success
```

세그멘틱 정보를 사용하는 경우, 네 번 90도 회전하면서 각 방향에서 깊이 정보와 세그멘틱 정보를 수집합니다. 수집한 정보를 바탕으로 목표에 도달했는지 여부를 확인합니다.

#### 6. 보상 및 에피소드 종료 여부 업데이트

```python
    if self.success:
        reward += self.success_reward  # 성공 시 보상 추가
        if action is not None and distance < self.collision_threshold:
            reward -= self.collision_penalty  # 충돌로 인한 벌점 취소

    if self.eps_len >= self.max_step:
        self.done = True  # 최대 스텝 수 초과 시 에피소드 종료

    self.reward += reward  # 총 보상 업데이트
    
    return reward  # 보상 반환
```

성공 여부에 따라 추가 보상을 적용하고, 최대 스텝 수를 초과하면 에피소드를 종료합니다. 최종 보상을 업데이트하고 반환합니다.

#### 요약

이 `move_path` 함수는 에이전트가 미리 정의된 경로를 따라 이동하면서 목표에 도달하는 과정을 관리합니다. 각 단계에서 보상 및 벌점을 계산하고, 에이전트의 성공 여부를 판단합니다. 이러한 과정을 통해 에이전트는 효과적으로 목표를 향해 이동하고, 학습할 수 있습니다.

### 6.5.22 def move(self, action_list):
이 `move` 함수는 에이전트가 주어진 `action_list`에 따라 움직이며, 보상을 계산하고, 성공 여부를 판단합니다. 코드를 논리적으로 연관된 부분으로 나누어 분석하겠습니다.

#### 1. 함수 정의 및 초기 설정

```python
def move(self, action_list):
    reward = 0.0  # 초기 보상 설정
    old_distance = self.shortest_distance()  # 현재 위치와 목표 사이의 거리 계산

    self.rotate(action_list[0])  # 첫 번째 회전 명령 실행
    action = None  # 초기 행동 설정
    distance = None  # 초기 거리 설정
    assert len(action_list) == 2, "Only support 1 step version"  # action_list의 길이 확인
```

여기서 함수가 정의되고, 초기 보상이 0으로 설정됩니다. `shortest_distance()` 메서드를 호출하여 현재 위치와 목표 사이의 거리를 계산하고, `action_list`의 첫 번째 요소에 따라 회전합니다. `action_list`는 정확히 2개의 요소를 가져야 한다는 어서션을 사용합니다.

#### 2. 경로 이동 및 충돌 처리

```python
    for action in action_list[1:]:
        self.eps_len += 1  # 에피소드 길이 증가
        reward += self.step_penalty  # 이동 시 페널티 적용

        old_position = self.env.sim.get_agent_state().position  # 이동 전 위치 기록
        self.env.step(action)  # 이동 명령 실행
        new_position = self.env.sim.get_agent_state().position  # 이동 후 위치 기록

        distance = self.euclidean_distance(old_position, new_position)  # 이동 거리 계산
        self.path_length += distance  # 총 경로 길이에 추가

        if distance < self.collision_threshold:  # 충돌 여부 확인
            reward += self.collision_penalty  # 충돌 시 페널티 적용
            break  # 충돌 발생 시 반복 종료
```

`action_list`의 나머지 요소들을 반복하면서 이동 명령을 실행합니다. 이동 전후의 위치를 기록하고, 이동 거리를 계산하여 총 경로 길이에 추가합니다. 충돌이 발생하면 페널티를 적용하고 반복을 종료합니다.

#### 3. 접근 보상 계산

```python
    new_distance = self.shortest_distance()  # 이동 후 거리 계산
    reward += self.approach_reward * (old_distance - new_distance)  # 접근 보상 계산
```

이동 전후의 거리를 비교하여 접근 보상을 계산합니다. 목표에 가까워질수록 더 많은 보상을 받습니다.

#### 4. 성공 여부 판별 (기본)

```python
    close_enough = True  # 기본 성공 여부 설정 (디버그용으로 항상 True)
    
    self.done = False  # 초기 성공 여부 설정
    self.success = False  # 초기 성공 상태 설정

    if self.new_eval and (not self.user_semantics):
        if not self.user_semantics:
            for t in range(4):
                self.rotate(np.pi / 2)  # 90도 회전
                if self.success:  # 이미 성공한 경우 다음 체크 생략
                    continue
                done = self.stop_checker()  # 현재 상태에서 멈춰야 하는지 확인
                self.success = close_enough and (done and self.success_checker())  # 멈춤 및 성공 여부 확인
                self.done = self.done or done  # 멈춤 여부 업데이트
```

세그멘틱 정보를 사용하지 않는 경우, 에이전트는 네 번 90도 회전하며 각 방향에서 목표에 도달했는지 확인합니다. `stop_checker()`와 `success_checker()`를 통해 성공 여부를 판단합니다.

#### 5. 성공 여부 판별 (세그멘틱 정보 사용)

```python
        else:
            success = False
            rgbs, deps = None, None  
            depths = None
            for t in range(4):
                self.rotate(np.pi / 2)
                success = close_enough and (success or self.success_checker())
                depth = self.get_observations()['depth']
                depth = depth * self.d2x
                if depths is None:
                    depths = depth[..., 0][np.newaxis, ...]
                else:
                    depths = np.concatenate((depths, depth[..., 0][np.newaxis, ...]), axis=0)
                observations = self.get_observations()
                rgb = observations['rgb']
                dep = observations['depth']
                sem = observations['semantic']
                sample = {'image': rgb[..., [2, 1, 0]], 'depth': dep[..., 0], 'label': sem}
                sample = transform(sample)
                rgb = sample['image'].unsqueeze(0)
                dep = sample['depth'].unsqueeze(0)
                rgbs = rgb if rgbs is None else torch.cat((rgbs, rgb), dim=0)
                deps = dep if deps is None else torch.cat((deps, dep), dim=0)

            with torch.no_grad():
                raw_semantics = self.seg_model(rgbs.to(self.device), deps.to(self.device)).detach()
                raw_semantics = torch.argmax(raw_semantics, dim=1)
            depths = torch.from_numpy(depths).to(self.device)
            check = (raw_semantics == self.target) & (depths != 0.) & (depths <= self.success_threshold)
            if torch.any(torch.sum(check.int().view(4, -1), dim=1) > self.seg_threshold):
                self.done = True
            raw_semantics = raw_semantics.cpu()
            depths = depths.cpu()
            self.success = self.done and success
```

세그멘틱 정보를 사용하는 경우, 네 번 90도 회전하면서 각 방향에서 깊이 정보와 세그멘틱 정보를 수집합니다. 수집한 정보를 바탕으로 목표에 도달했는지 여부를 확인합니다.

#### 6. 에피소드 종료 및 보상 업데이트

```python
    else:
        self.done = self.stop_checker()
        self.success = close_enough and (self.done and self.success_checker())

    if self.success:
        reward += self.success_reward  # 성공 시 보상 추가
        if action is not None and distance < self.collision_threshold:
            reward -= self.collision_penalty  # 충돌로 인한 벌점 취소

    if self.eps_len == self.max_step:
        self.done = True  # 최대 스텝 수 초과 시 에피소드 종료

    self.reward += reward  # 총 보상 업데이트
    
    return reward  # 보상 반환
```

기본 성공 여부를 판단하고, 성공 시 보상을 추가합니다. 충돌로 인한 벌점이 있다면 이를 취소합니다. 최대 스텝 수를 초과하면 에피소드를 종료하고, 최종 보상을 업데이트한 후 반환합니다.

#### 요약

`move` 함수는 에이전트가 주어진 `action_list`에 따라 움직이며, 보상을 계산하고, 성공 여부를 판단합니다. 각 단계에서 에이전트의 위치와 보상을 업데이트하고, 성공 여부를 판단하여 에피소드를 관리합니다.

### 6.5.23 def visible_close_checker(self, targets, semantic, depth):

이 함수는 주어진 타겟들에 대해 시맨틱 및 깊이 정보를 사용하여 가시적인 물체가 가까이 있는지 여부를 확인합니다.
#### 1. 시맨틱 및 깊이 정보 준비

```python
def visible_close_checker(self, targets, semantic, depth):
    depth = depth * self.d2x
    legal = None
    for target in targets:
        if legal is None:
            legal = (semantic != target)
        else:
            legal = legal & (semantic != target)
    legal = legal | (depth[..., 0] == 0.)
```

- 입력된 깊이 정보에 `self.d2x`를 곱하여 깊이를 조정합니다.
- `legal` 변수를 초기화하고, 각 타겟 시맨틱을 제외한 영역을 결정하기 위해 시맨틱 정보를 확인합니다.
- 깊이가 0인 영역(투명 영역)을 `legal`에 추가합니다.

#### 2. 물체 확인

```python
    check = (~legal) & (depth[..., 0] <= self.success_threshold)
    if np.any(check):
        return True
    return False
```

- `legal`과 깊이가 `self.success_threshold` 이하인 영역을 확인하여 가시적인 물체가 있는지 판단합니다.
- 만약 가시적인 물체가 있다면 `True`를 반환하고, 그렇지 않으면 `False`를 반환합니다.
#### 요약

이 함수는 시맨틱 및 깊이 정보를 사용하여 가시적인 물체가 가까이에 있는지 여부를 판단합니다. 특정 시맨틱 타겟을 제외하고, 깊이가 0이거나 특정 임계값 이하인 영역이 있는지 확인하여 결과를 반환합니다.

### 6.5.24 def stop_checker(self):

#### 1. 시맨틱 정보를 이용한 정지 여부 확인

이 코드는 로봇이 정지해야 하는지 여부를 확인하는 기능을 담고 있습니다.

```python
def stop_checker(self):
    if not self.user_semantics:
        return self.success_checker()
    else:
        depth = self.get_observations()['depth']
        targets = [self.target]
```

- `user_semantics`가 False인 경우에는 단순히 `success_checker` 함수를 호출하여 정지 여부를 확인합니다.
- 그렇지 않은 경우, 시맨틱 정보를 이용하여 정지 여부를 확인하기 위해 준비 작업을 수행합니다.

#### 2. 시맨틱 정보를 활용한 정지 여부 확인

```python
        observations = self.get_observations()
        rgb = observations['rgb']
        dep = observations['depth']
        sem = observations['semantic']
        sample = {'image': rgb[..., [2, 1, 0]],
                'depth': dep[..., 0],                  
                'label': sem
                }
        sample = transform(sample)       
        rgb = sample['image'].unsqueeze(0)
        dep = sample['depth'].unsqueeze(0)
```

- 관찰된 이미지에서 RGB 및 깊이 정보를 가져와 시맨틱 분할 모델에 전달하기 위해 준비합니다.

#### 3. 시맨틱 분할을 통한 정지 여부 확인

```python
        with torch.no_grad():
            raw_semantics = self.seg_model(rgb.to(self.device),
                    dep.to(self.device)).detach()[0]
            raw_semantics = torch.argmax(raw_semantics,
                    dim=0).cpu().numpy()

        depth = depth * self.d2x
        legal = None
        for target in targets:
            if legal is None:
                legal = (raw_semantics != target)
            else:
                legal = legal & (raw_semantics != target)

        legal = legal | (depth[..., 0] == 0.)
```

- 시맨틱 분할 모델을 통해 이미지를 처리하고 시맨틱 정보를 얻습니다.
- 시맨틱 정보와 깊이 정보를 이용하여 가시적인 물체를 확인하고 `legal` 변수에 저장합니다.

#### 4. 정지 여부 확인

```python
        check = (~legal) & (depth[..., 0] <= self.success_threshold)
        if np.sum(check.astype('int')) > self.seg_threshold:
            return True

        return False
```

- 시맨틱 정보와 깊이 정보를 통해 가시적인 물체가 있는지 확인합니다.
- 만약 가시적인 물체가 있고, 그 개수가 `seg_threshold`보다 많다면 정지 여부를 True로 반환합니다. 그렇지 않으면 False를 반환합니다.

### 6.5.25 def success_checker(self):
이 코드는 로봇이 목표 지점에 도달했는지를 확인하는 역할을 합니다.

```python
def success_checker(self):
    # 1. 환경에서 관찰된 정보 가져오기
    observations = self.get_observations()

    # 2. 시맨틱 정보 가져오기
    semantics = observations['semantic']
 
    # 3. 시맨틱 레이블을 카테고리 ID로 변환
    semantics = np.vectorize(lambda x: self.id2cat.get(x, self.num_channel))(semantics)

    # 4. 시맨틱 레이블에서 목표로 설정된 레이블에 해당하는 영역 찾기
    semantics -= 1
    semantics[((semantics < 0) | (semantics >= self.num_channel))] = self.num_channel - 1

    # 5. 환경에서 관찰된 깊이 정보 가져오기
    depth = observations['depth']

    # 6. 가시적인 물체가 목표로 설정된 레이블과 동일한지 여부 확인
    return self.visible_close_checker([self.target], semantics, depth)
```

1. 환경에서 관찰된 정보를 가져옵니다.
2. 관찰된 정보 중에서 시맨틱 정보를 가져옵니다.
3. 시맨틱 레이블을 카테고리 ID로 변환합니다.
4. 목표로 설정된 레이블에 해당하는 영역을 찾습니다.
5. 가시적인 물체가 목표로 설정된 레이블과 동일한지 여부를 확인합니다.
6. 만약 가시적인 물체가 목표로 설정된 레이블과 동일하고, 설정된 성공 임계값 이내에 있으면 True를 반환합니다. 그렇지 않으면 False를 반환합니다.

이 코드는 로봇이 목표 지점에 도달했는지를 확인하는 중요한 기능을 담당합니다.

### 6.5.26 def step(self, randomness):
위 코드는 강화 학습 환경 내에서 하나의 단계를 수행하는 함수를 구현한 것으로 보입니다. 다음은 코드의 전반적인 구조와 각 부분에 대한 설명입니다.

#### 함수 개요

- 함수명: `step`

- 매개변수: `randomness` (계획 과정에서의 불확실성을 조절하는 매개변수)

- 목적: 현재 상태에서 다음 행동을 선택하고, 해당 행동을 수행한 후, 보상을 계산하며, 선택한 행동과 상태 전환을 리플레이 버퍼(replay buffer)에 저장합니다.

- 코드의 주요 단계를 요약하면 다음과 같습니다:

1. 최대 단계를 초과했는지 확인

2. 상태가 이산적(discrete)인지 연속적(continuous)인지 확인

3. 적절한 행동 계획 및 이동

4. 보상 계산 후 리플레이 버퍼에 저장

#### 상세 분석

##### 최대 단계 확인

```python

if self.eps_len == self.max_step:

return

```

- 에피소드의 길이가 `max_step`에 도달했는지 확인하고, 도달했다면 함수를 종료합니다.

##### 이산적 상태

```python

if self.discrete:

self.q_map = self.Q(self.state.to(self.device)).detach().cpu()

assert self.q_map.shape[0] == 1, 'make sure q_map size is 1'

self.q_map = self.q_map[0]

self.old_state = self.state.clone()

action_list = self.planner_discrete(randomness)

reward = self.move(action_list)

self.view()

if self.training:

self.replay_buffer.push(self.old_state,

torch.Tensor([self.action]), self.state if not

self.done else None, torch.Tensor([reward]))

return reward

```

- 네트워크 `Q`에 현재 상태를 넣어서 Q-값(q_map)을 계산합니다.

- Q-값의 첫 번째 차원이 1인지 확인함으로써 안전성 검사를 합니다.

- 이전 상태를 현재 상태로 저장하고, `planner_discrete` 함수를 통해 행동 리스트(action_list)를 생성합니다.

- `move` 함수를 통해 행동을 수행하고, 그에 따른 보상을 계산합니다.

- `view` 함수를 호출하여 현재 환경을 시각적으로 업데이트합니다.

- 학습 중이라면 리플레이 버퍼에 상태 전환 및 보상을 저장합니다.

- 보상을 반환합니다.

##### 연속적 상태

```python

with torch.no_grad():

self.q_map = self.Q(self.state.to(self.device)).detach().cpu()[0][0]

self.old_state = self.state.clone()

if not self.shortest:

action_list = self.planner(randomness)

reward = self.move(action_list)

else:

self.planner_path(randomness)

reward = self.move_path()

self.view()

if self.training:

self.replay_buffer.push(self.old_state,

torch.Tensor([self.action[0]*self.w_new + self.action[1]]), self.state if not

self.done else None, torch.Tensor([reward]))

return reward

```

- 이전 상태와 마찬가지로 Q-값을 계산하지만, 네트워크 출력을 첫 번째 및 두 번째 차원에서 가져옵니다.

- 이전 상태를 저장합니다.

- `shortest` 플래그를 확인하여 현재 최적 경로를 사용할 것인지 결정합니다.

- `shortest`가 `False`인 경우, 현재 지식에 기반하여 행동을 계획합니다(`planner` 함수 사용).

- `shortest`가 `True`인 경우, 최단 경로 계획을 세우고(`planner_path` 함수 사용), 해당 경로로 이동합니다(`move_path` 함수 사용).

- 다시 `view` 함수를 호출하여 현재 환경을 시각적으로 업데이트합니다.

- 학습 중이라면 리플레이 버퍼에 상태 전환 및 보상을 저장합니다.

- 보상을 반환합니다.

#### 요약

이 함수는 강화 학습 에이전트가 현재 상태에서 최적의 행동을 결정하고, 그 행동을 수행한 후, 상태 전환과 보상을 리플레이 버퍼에 저장하는 역할을 합니다. 이산적 상태와 연속적 상태를 모두 다루며, 최적 경로 탐색 여부에 따라 다른 행동 계획 전략을 사용합니다.
