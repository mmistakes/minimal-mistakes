---
layout: single
title:  "Image Features"
categories: Vision
tag: [vision, AI, ML, DL]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---

# Image features

pixel(0 ~ 255)로 나타내는 matrix. Raw pixel을 사용.
Raw pixel은 scale variation, intra-class variation, deformation, occlusion, illumination change 등에 취약 → pixel matrix에서 특정 feature를 찾아야 한다.

feature : 하나의 image에 vector 형태로 추출.


## 좋은 image features

1. repeatability : geometric과 photometric 변환에도 불구하고 똑같은 이미지에서 동일한 특징.
2. saliency : 특징은 image의 interesting point를 포함.
3. locality : 특징은 image 내의 작은 영역을 차지. (?)

interest points = local features → corner, blob
feature를 얻기 위해서는 low-level의 image processing 단계 필요.


# Image processing

## convolution(kernel)

kernel : 값을 가지는 rectangle matrix

convolution을 통해 image로부터 sharp, smooth, gradient의 이미지 정보를 얻을 수 있다.




------------------------------------------------------
# reference

(https://wewinserv.tistory.com/85)