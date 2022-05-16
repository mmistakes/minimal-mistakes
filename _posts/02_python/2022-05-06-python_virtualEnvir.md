---
layout: single
title: python 가상환경(virtual environment)
categories: 02_python
tag: [python, virtual environment]
toc: true
author_profile: false
sidebar:
    nav: "docs"
---
내 경우 python을 주먹구구식으로 해서 가상환경에 대한 개념없이 하다보니 d드라이브에 anaconda pkg를 깔아놓고 가상환경을 동일한 이름으로 반들었는데 결과적으로 업무에 쓰는 모든 프로그램은 가상환경에 묶여 있고, ML, DL을 하는 jupyter notebook은 base anaconda에 묶여 있었다. 이 개념을 프로그래밍하고 3년이 지난 시기에 알았다. <br><br>
# 가상환경(Virtual Environment)
Python program은 interpreter(한국어로 통역사)이다.우리는 궁극적으로 우리가 말한 말을 컴퓨터가 알아 들었으면 좋겠는데 우리는 다양한 언어로 말을 하지만 컴퓨터는 오직 0과 1로 동작한다. 우리가 작성한 code(if, else, for등을 사용한 언어)를 중간에 interpreter가 컴퓨터가 이해할 수 있는 0과 1로 바꿔주는 것이다. <br>근데 이 python program은 다양한 code로 이뤄진 패키지(package)로 구성되어 있는데 개발하고자 하는 환경에 따라 필요한 패키지가 다른 경우가 많다. 통일하면 좋겠지만 어쩔 수 없다. 이 package 또한 수많은 기업 또는 개발자가 만들기 때문에 통일할 수는 없다. 또한 python 자체도 업글이 계속되지만 특정 프로그램은 특정 version이상의 python에서는 작동하지 않는 경우도 많다. <br> 대신에  python으로 다양한 project를 진행하려는데 서로 요구되는 version이 다르다(예를 들어 A project, B project). 그럼 A project를 진행할 때는 필요한 version의 package만 모아 A python folder(A 가상환경이 된다)에 넣어두고, B project를 진행할 때는 필요한 version의 package만 모아 B python folder(B 가상환경이 된다)에 넣어두고 해당 가상환경을 interpreter로 등록하고 coding을 하면 된다. 

# anaconda 환경생성 명령어
1. anaconda prompt에서 virtual environment 확인: **conda info —envs 혹은 conda env list**
2. vir. env.을 새로 생성할 때: **conda create -n bong** (bong은 가상환경 폴더 이름)
3. vir. env.을 삭제할 때: **conda remove -n bong —all** 
4. 가상환경 실행: **conda activate bong**
5. package 깔 때: **conda install numpy**
6. package 삭제할 때: **conda remove scipy** 혹은 **conda remove -n bong scipy**
    
7. package 업데이트 할 때: **conda update pandas**
8. 설치된 python package 확인(해당 env로 directory 변경 후): **conda list**