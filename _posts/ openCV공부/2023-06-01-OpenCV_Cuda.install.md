---
title: "OpenCV Cuda 설치"
categories:
  - OpenCV

tags: [OpenCV]
toc : true
comments: true
---
1. [사전 준비](#사전 준비) 
2. [CUDA 와 cuDNN 설치](#cuda-와-cudnn-설치)
3. Cmake 이용하여 OpenCV 만들기
4. Visual studio 이용하여 OpenCV build 하기
=======
# 사전 준비

1. GPU 검사
장치 관리자 에서 확인
![GPU 스펙 보기](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/OpenCV_CUDA/GPU%20%EC%82%AC%EC%96%91.png)

GPU와 알맞은 연산 능력 버젼 확인

![위키피디아 CUDA](https://ko.wikipedia.org/wiki/CUDA)

![GPU 버젼 8.6](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/OpenCV_CUDA/GPU_%EB%B2%84%EC%A0%BC.png)


2. OpenCV 소스 다운로드

[OpenCV 소스](https://opencv.org/releases/)

[OpenCV 확장 모듈](https://github.com/opencv/opencv_contrib/tags)

OpenCV 4.7.0 소스와 확장 모듈까지 소스 다운로드한다
압축 파일이기에 원하는 공간에 압축 풀어준다.
또 Build 파일 생성해준다.



4. CMAKE 파일 다운로드


[CMAKE 다운로드 링크](https://cmake.org/download/)


5. Visual Studio 다운로드


==================
# CUDA 와 cuDNN 설치

[CUDA 설치 링크 ](https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local)

[CUDA 설치 예시](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/OpenCV_CUDA/CUDA%20%EC%84%A4%EC%B9%98.png)

해당 설정에 맞게 설치 진행한다

[cuDNN](https://developer.nvidia.com/cudnn)

cuDNN 인경우 Nvidia 회원 가입이 필요하다


[cuDNN 설치](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/OpenCV_CUDA/cuDNN%20%EC%84%A4%EC%B9%98.png)

CUDA 설치후 설치 폴더 경로에 cuDNN 파일 을 덮어 넣습니다.


* 사전 세팅
 기존에 설치 되어있던 OpenCV 버젼 삭제 진행한다.

```bash
pip uninstall opencv-python
```

 [삭제 확인](/assets/img//%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/OpenCV_CUDA/openCV%20%EC%82%AD%EC%A0%9C.png)


===================


3. Cmake 이용하여 OpenCV 만들기

[환경설정](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/OpenCV_CUDA/configuration.png)


필수적인 선택 사항으로

1. OPENCV_DNN_CUDA 

2. WITH_CUDA

3. ENABLE_FAST_MATH

4. OPENCV_EXTRA_MODULES_PATH (확장 모듈 경로 선택)
ex) D:\CUDA\opencv_contrib-4.7.0\opencv_contrib-4.7.0\modules

5. INSTALL_PYTHON_EXAMPLES (선택)

 이후 Configure 이후 다시 체크해줘야하는것이 

1. WITH_CUDNN

2. WITH_CUBLAS

3. CUDA_FAST_MATH

4. CUDA_ARCH_BIN (자신에 맞는 버젼 GPU)
RTX 3060Ti = 8.6

Cmake 에서 Generate 클릭후

[build](/assets/img/%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD/OpenCV_CUDA/build.png)


빌드 모드르 Release 변경후 ALL_BUILD 빌드 하면된다 (1시간 이상 걸림)
-> 오류 없이완료후 아래 INSTALL 빌드 실행

=====




2. OpenCV 소스 다운로드
4.7.0
https://github.com/opencv/opencv_contrib
OpenCV_Contrib  추가 모듈 설치 
설치
https://opencv.org/releases/

CMake 설


쿠다 버젼 확인 

7.5	튜링	TU102, TU104, TU106, TU116, TU117	엔비디아 타이탄 RTX, 지포스 RTX 2080Ti, RTX 2080, RTX 2070, RTX 2060, 지포스 GTX 1660 Ti, GTX 1660, GTX 1650


CUDA ARCHBIN 없음

https://ko.wikipedia.org/wiki/CUDA
# 출처
https://www.youtube.com/watch?v=tjXkW0-4gME

https://www.youtube.com/watch?v=5NwU1MmmqWo

https://prlabhotelshoe.tistory.com/24