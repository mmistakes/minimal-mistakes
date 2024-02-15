---
layout: single
title: "End-to-End Semi-Supervised Object Detection with Soft Teacher"
permalink: /studies/paper/SoftTeacher
tags: [Paper, Vision AI]
categories:
  - 📄 paper
use_math: true
date: 2023-09-25
published: false
---
*본 논문은 이전의 복잡한 다단계 방법과 다르게 처음부터 끝까지 하나의 과정으로 이루어진 준지도학습 기반 객체 탐지 접근법을 제시한다. 이 방법은 커리큘럼 동안 점차적으로 가상 레이블의 품질을 향상시키며, 점점 더 정확해진 가상 레이블은 다시 객체 탐지 학습에 이점을 제공한다. 이 프레임워크 내에서 두 가지 간단하지만 효과적인 기술을 제안한다: 각 레이블되지 않은 바운딩 박스의 분류 손실을 교사 네트워크가 생성한 분류 점수로 가중치를 두는 소프트 교사 메커니즘; 박스 회귀 학습을 위한 신뢰할 수 있는 가상 박스를 선택하는 박스 지터링 접근법이다. COCO 벤치마크에서 제안된 접근법은 다양한 레이블링 비율(예: 1%, 5%, 10%)에서 이전 방법들을 큰 차이로 능가한다. 또한, 레이블된 데이터의 양이 상대적으로 많을 때도 잘 작동한다. 예를 들어 전체 COCO 학습 세트를 사용하여 학습된 40.9 mAP 기준 검출기를 COCO의 123K 레이블되지 않은 이미지를 활용하여 +3.6 mAP로 향상시켜 44.5 mAP에 도달할 수 있다. 최신 Swin Transformer 기반 객체 탐지기(테스트-데브에서 58.9 mAP)에서도 탐지 정확도를 +1.5 mAP 향상시켜 60.4 mAP에 도달하고, 인스턴스 분할 정확도를 +1.2 mAP 향상시켜 52.4 mAP에 도달하여, 새로운 최고 기록을 달성할 수 있다. Object365 사전 학습 모델과 추가로 결합하면 탐지 정확도가 61.3 mAP에 도달하고 인스턴스 분할 정확도가 53.0 mAP에 도달하여 새로운 최고 기록을 세운다.*

## 📋 Table of Contents

- [1.Introduction](#1introduction)
- [2.Relate dworks](#2relate-dworks)
- [3.Methodology](#3methodology)
- [4.Experiments](#4experiments)
- [5.Conclusion](#5conclusion)


## 1.Introduction

## 2.Relate dworks

## 3.Methodology
### 3.1.End-to-End Pseudo-Labeling Framework

### 3.2.Soft Teacher

### 3.3.Box Jittering

## 4.Experiments
### 4.1.Dataset and Evaluation Protocol

### 4.2.Implementation Details

### 4.3.System Comparison

### 4.4.Ablation Studies

## 5.Conclusion

