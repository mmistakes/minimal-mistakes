---
layout: single
title:  "Stable Diffusion"
toc: true
toc_sticky: true # 주석하면 고정
toc_label: Stable Diffusion # 오른쪽 목차 이름 변경가능
author_profile: true # true false로 왼쪽 삭제가능능
search: true # 검색기능에 나오게 할건지 여부       
---

## Stable Diffusion 영상

{% include video id="brcaIyprkZQ" provider="youtube" %}

## Stable Diffusion 설치

[AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui?tab=readme-ov-file)

[![sdwebui]({{site.url}}/images/2025-05-08-stable-diffusion/sdwebui.png)]({{site.url}}/images/2025-05-08-stable-diffusion/sdwebui.png)

sd.webui.zip 다운로드 후 압축풀기

[![run1]({{site.url}}/images/2025-05-08-stable-diffusion/run1.png)]({{site.url}}/images/2025-05-08-stable-diffusion/run1.png)

[![run2]({{site.url}}/images/2025-05-08-stable-diffusion/run2.png)]({{site.url}}/images/2025-05-08-stable-diffusion/run2.png)

update.bat 클릭

run.bat 설치 및 실행기능

[![run2]({{site.url}}/images/2025-05-08-stable-diffusion/sd실행사진.png)]({{site.url}}/images/2025-05-08-stable-diffusion/sd실행사진.png)

실행창 준비완료

## Ai 모델 다운로드

[civitai.com](https://civitai.com/models)

vram 사양 모델에 맞춰서 다운로드

webui폴더 -> models폴더 -> Stable-diffusion폴더 -> 다운로드폴더복붙

모델선택

값 지정 후 실행 이미지 생성 완료

webui폴더 -> outputs이미지 쭉 들어가면 이미지 저장되어있음

## 그래픽카드 최신버전 오류발생 해결

[![쿠다에러]({{site.url}}/images/2025-05-08-stable-diffusion/쿠다에러.png)]({{site.url}}/images/2025-05-08-stable-diffusion/쿠다에러.png)

cmd창 열기

```
pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128
```

```
cd C:<현재 작업 디렉토리>\sd.webui\system\python

```

현재 작업 디렉토리 변경

```
.\python.exe -m pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128
```

해당 파이썬으로 PyTorch nightly CUDA 12.8 설치