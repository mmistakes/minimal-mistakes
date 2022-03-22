---
layout: single
title: 에러해결-OMP:Error
categories: 에러해결
tag: 에러
typora-root-url: ../
---

OMP: Error #15: Initializing libiomp5.dylib, but found libiomp5.dylib already initialized.
OMP: Hint: This means that multiple copies of the OpenMP runtime have been linked into the program. That is dangerous, since it can degrade performance or cause incorrect results. The best thing to do is to ensure that only a single OpenMP runtime is linked into the process, e.g. by avoiding static linking of the OpenMP runtime in any library. As an unsafe, unsupported, undocumented workaround you can set the environment variable KMP_DUPLICATE_LIB_OK=TRUE to allow the program to continue to execute, but that may cause crashes or silently produce incorrect results. For more information, please see http://www.intel.com/software/products/support/.


딥러닝 학습실행 중에 이러한 에러를 맞닥들였다. 

검색해보았으나 jupyter notebook, mac os 등 여러 이유로 이러한 에러를 만나는 글들을 볼 수 있었다.

나는 vscode, window환경을 사용중에 발생한터라 위와는 상황이였다. 하지만 해결 방법은 다른이들과 같았다. 


소스 상단에 해당 코드를 입력해준다.
'''
import os
os.environ[‘KMP_DUPLICATE_LIB_OK’]=’True’
'''

import os는 이미 되어있던 터라 그 밑에 줄만 추가해주었고 정상 작동함을 확인했다.