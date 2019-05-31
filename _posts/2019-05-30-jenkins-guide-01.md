---
title: "Windows에서 젠킨스(Jenkins) 설치 방법"
date: 2019-05-30
categories: jenkins
comments: true
---


>Jenins Guide 01   
Install Jenkins on Windows

CI(Continuous Integration)도구인, 젠킨스를 윈도우에 설치하는 방법입니다.
## Step 1: Jenkins 실행파일 다운로드
1. <https://jenkins.io/download/> 이동
2. 버전 선택
    - LTS: 안정적인 버전
    - Weekly: 매 주 릴리즈 되는 버전(LTS보다 안정성이 낮을 수 있음)
3. Windows용 다운로드
    - LTS버전을 이용했습니다.
4. 다운로드 받은 압축파일을 풀고 jenkins.msi 실행 

## Step 2: Jenkins 설치
![예제1]({{ "/assets/images/20190530/example1.png"}})
![예제2]({{ "/assets/images/20190530/example2.png"}})  
![예제3]({{ "/assets/images/20190530/example3.png"}})
![예제4]({{ "/assets/images/20190530/example4.png"}})

![예제5]({{ "/assets/images/20190530/example5.png"}})

- 위 그림 처럼 명시된 경로의 파일을 엽니다.
    - (C:\Program Files (x86)\Jenkins\secrets\initialAdminPassword)
    - (경로는 다를 수 있습니다.)
- Administrator password를 복사하여 입력합니다.

![예제6]({{ "/assets/images/20190530/example6.png"}})
- 자주 사용되는 플러그인을 자동으로 설치하는 것과 사용자 지정이 있습니다.

![예제7]({{ "/assets/images/20190530/example7.png"}})
- 플러그인 설치 중

![예제8]({{ "/assets/images/20190530/example8.png"}})
- 젠킨스 관리 계정 생성  

![예제9]({{ "/assets/images/20190530/example9.png"}})
![예제9]({{ "/assets/images/20190530/example10.png"}})

## 참고
- default url: <http://localhost8080>
- 포트 변경: Jenkins 폴더 경로에서 jenkins.xml 편집
```
  <arguments>... --httpPort=[포트 입력] ...</arguments>
```


