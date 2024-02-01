---
layout: single
title: "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows"
permalink: /studies/paper/Swin Transformer
tags: [Paper, Vision AI]
categories:
  - 📄 paper
use_math: true
published: false
---
*이 논문은 컴퓨터 비전을 위한 범용 백본으로서 기능할 수 있는 새로운 비전 트랜스포머인 Swin Transformer를 소개합니다. 언어와 비전 사이의 차이점, 예를 들어 시각적 엔티티의 규모 변화가 크고 이미지 내 픽셀의 해상도가 텍스트 내 단어에 비해 높은 점 등으로 인해 트랜스포머를 비전에 적용하는 데 있어 도전이 발생합니다. 이러한 차이점을 해결하기 위해, 우리는 Shifted windows로 계산된 표현을 가지는 계층적 트랜스포머를 제안합니다. 이동된 창 방식은 비중첩 로컬 창으로 자기 주의 계산을 제한함으로써 효율성을 높이며, 동시에 창간 연결을 허용합니다. 이 계층적 아키텍처는 다양한 규모에서 모델링할 수 있는 유연성을 가지고 있으며, 이미지 크기에 대해 선형적인 계산 복잡도를 가집니다. Swin Transformer의 이러한 특성은 이미지 분류(87.3 top-1 정확도 on ImageNet-1K)와 객체 검출(58.7 box AP와 51.1 mask AP on COCO test-dev) 및 의미 분할(53.5 mIoU on ADE20K val)과 같은 밀집 예측 작업을 포함한 다양한 비전 작업과 호환됩니다. 그 성능은 이전 최고 기록을 큰 차이로 초과하여 COCO에서 +2.7 box AP와 +2.6 mask AP, ADE20K에서 +3.2 mIoU를 달성함으로써, 트랜스포머 기반 모델이 비전 백본으로서의 가능성을 보여줍니다. 계층적 설계와 이동 창 접근 방식은 모두 MLP 아키텍처에도 유리하게 작용합니다. 코드와 모델은 [https://github.com/microsoft/Swin-Transformer](https://github.com/microsoft/Swin-Transformer){:target="_blank"}에서 공개적으로 이용할 수 있습니다.*
## 📋 Table of Contents

- [1. Introduction](#1-introduction)
- [2. Related Work](#2-related-work)
- [3. Method](#3-method)
- [4. Experiments](#4-experiments)
- [5. Conclusion](#5-conclusion)

## 1. Introduction

## 2. Related Work

## 3. Method
### 3.1. Overall Architecture

### 3.2. ShiftedWindow based SelfAttention

### 3.3. Architecture Variants

## 4. Experiments

### 4.1. Image Classification on ImageNet1K

### 4.2. Object Detection on COCO

### 4.3. Semantic Segmentation on ADE20K

### 4.4. Ablation Study

## 5. Conclusion