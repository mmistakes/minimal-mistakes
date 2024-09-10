---
layout: single        # 문서 형식
title: Residual Learning         # 제목
categories: Deep Learning    # 카테고리
toc: true             # 글 목차
author_profiel: false # 홈페이지 프로필이 다른 페이지에도 뜨는지 여부
sidebar:              # 페이지 왼쪽에 카테고리 지정
    nav: "docs"       # sidebar의 주소 지정
#search: false # 블로그 내 검색 비활성화
---

# 1. Vanishing / Exploding Gradient
모델 성능 개선을 위해 가장 우선적으로 고려할 수 있는 경우는 모델의 층을 깊이 쌓는 것입니다. 즉, 은닉층의 수를 늘리는 것입니다. 이 과정에서 학습 중 계산이 필요한 파라미터의 수가 기하급수적으로 증가하고, 연속적이고 많은 수의 미분을 시행합니다. 그리고 이로 인해 가중치의 기울기가 사라지거나 폭발적으로 커지는 현상이 발생합니다. 이 현상을 Vanishing / Exploding Gradient 라고 합니다.

# 2. Skip Connection
![alt text](<skip connection.jpg>)

# 3. Residual Learning



# 2. Background


# 참고

https://arxiv.org/abs/1512.03385v1 (Deep Residual Learning for Image Recognition)
https://meaningful96.github.io/deeplearning/skipconnection/


