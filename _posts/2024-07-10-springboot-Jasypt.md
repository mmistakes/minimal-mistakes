---
layout: single
title: '[Spring] Jasypt를 이용해 암호화 기능 적용 후 배포하기'
categories: Backend
tag: [Spring, SpringBoot]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

최근 진행했던 프로젝트에 중요정보를 암호화하여 외부 노출을 막고 배포까지 진행해보자. 

## Jasypt 란?
Jasypt(Java Simplified Encryption) 는 오픈소스 Java library로 개발자는 암호화관련 깊은 지식이 없어도 암복화 프로그램을 개발할 수 있도록 지원한다.

Spring Boot에서는 jasypt-spring-boot-starter를 이용하여 쉽게 암호화 기능을 적용할 수 있다. 

jasypt-spring-boot-starter 는 구동 단계에서 **ENC(암호화 된 값)** 형식의 속성을 찾아 복호화를 수행하여 원래의 암호화된 속성 값으로 대체해준다. 


## 1. 의존성 추가 

```java
implementation "com.github.ulisesbocchio:jasypt-spring-boot-starter:3.0.5"
```

## 2. application.yml 에 jasypt 속성 추가 

```java
jasypt:
  encryptor:
    algorithm: PBEWithMD5AndDES # 사용되는 알고리즘
    pool-size: 2 # 암호화 요청을 담고 있는 pool의 크기
    string-output-type: base64 # 암호화 이후에 어떤 형태로 값을 받을지 설정
    key-obtention-iterations: 1000 # 암호화 키를 얻기 위해 반복해야 하는 해시 횟수
    password: ${JASYPT_KEY} # 환경변수 설정 
```

JASYPT_KEY 는 asypt 암호화를 위한 비밀 키로, 보안이 매우 중요한 요소이다. 

대문자, 소문자, 숫자, 특수문자를 혼합하여 예측 가능하지 않은 무작위 문자열로 설정해주자. 


## 3. Config 파일 만들기

```java
package com.web.ddajait.config;
import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JasyptConfig {

    @Value("${jasypt.encryptor.password}")
    private String key;
    @Value("${jasypt.encryptor.algorithm}")
    private String algorithm;
    @Value("${jasypt.encryptor.pool-size}")
    private String poolSize;
    @Value("${jasypt.encryptor.string-output-type}")
    private String outputType;
    @Value("${jasypt.encryptor.key-obtention-iterations}")
    private String hashing;

    @Bean(name = "jasyptStringEncryptor")
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();
        config.setPassword(key); // 암호화 키
        config.setAlgorithm(algorithm); // 암호화 알고리즘
        // config.setIvGenerator(new RandomIvGenerator()); // PBE-AES 기반 알고리즘의 경우 IV 생성 필수
        config.setKeyObtentionIterations(hashing); // 반복할 해싱 회수
        config.setPoolSize(poolSize); // 인스턴스 pool
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator"); // salt 생성 클래스
        config.setStringOutputType(outputType); // 인코딩
        encryptor.setConfig(config);
        return encryptor;
    }
}
```

여기서 기억해야 할 점은 Bean 이름은 무조건 **jasyptStringEncryptor** 으로 설정해줘야 한다. 



## 4. JASYPT_KEY 환경변수 설정 

### 로컬 환경변수 (VSCODE 기준)

Mac 환경에서 export를 이용한 환경변수 설정 방법이 프로젝트 실행시 인식이 안돼서 launch.json 에 롼경변수를 추가해주는 방법을 선택했다. 


상단 탭의 ```Run``` 클릭 후  ```Add Configuration``` 클릭 하여 ```launch.json``` 파일에 환경변수 추가 

```java
{
    "configurations": [

        {
            "type": "java",
            "request": "launch",
            "args": "",
            "envFile": "${workspaceFolder}/.env",
            "env": {
                "JASYPT_KEY": "암호화 키 값"
              }
        }
    ]
}
```

### 배포용 환경변수 (Git Actions)
깃 프로젝트에 들어가서 ```Setting -> Secrets and variables -> Actions```

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-10-springboot-Jasypt\secrets.png" alt="Alt text" style="width: 80%; height: 80%; margin: 10px;">
</div>

## 5. 중요정보 암호화하기 

나는 <a href = "https://www.devglan.com/online-tools/jasypt-online-encryption-decryption#google_vignette">Jasypt Encryption and Decryption Online</a> 사이트를 이용하여 암호화 했다. 

위 사이트는 **PBEWithMD5AndDES 알고리즘**을 이용하여 암호화가 이루어지므로 다른 알고리즘 적용 시 TEST 코드를 이용하여 암호화 해야햔다.

### 암호화한 값 yaml 파일에 적용

```java

 # 데이터 베이스 
  datasource:
      username: ENC(암호화한 값) 
      password: ENC(암호화한 값) 
      

#JWT
jwt:
  header: Authorization
  secret: ENC(암호화 값) 
  token-validity-in-seconds: 86400  

```

여기까지 진행했으면 로컬에서 암호화 적용돼서 프로그램이 정상적으로 실행된다!!


이제부터는 Gitaction workflow 에 위에서 넣어줬던 secret key를 등록해주는 코드를 넣어줘야 한다. 

```java

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'adopt'

      - name: Replace JASYPT_KEY in application.yaml
        run: |
          sed -i 's/\${JASYPT_KEY}/${{ secrets.JASYPT_KEY }}/g' ./src/main/resources/application.yaml

```


sed 명령어를 사용하여 application.yaml 파일에서 JASYPT_KEY를 실제 비밀 키로 대체하는 스크립트를 추가해줬다. 여러번의 삽질을 반복하다가 GPT의 도움을 받아 드디어 성공했다..

코드를 자세히 살펴보면 다음과 같다. 


- sed: 스트림 편집기 명령어.
- -i: 파일을 직접 수정(in-place)하도록 지시합니다.
- 's/\${JASYPT_KEY}/${{ secrets.JASYPT_KEY }}/g': 치환 명령어입니다. 여기서 s는 substitute를 의미하며, 다음과 같이 해석됩니다:
    - \${JASYPT_KEY}: 찾을 패턴입니다. ${JASYPT_KEY}와 일치하는 부분을 찾습니다. 여기서 $ 기호는 이스케이프(\) 문자를 사용하여 문자 그대로 $로 인식되도록 합니다.
    - ${{ secrets.JASYPT_KEY }}: 대체할 문자열입니다. GitHub Actions에서 비밀 변수(secrets.JASYPT_KEY)를 참조하여 실제 비밀 키 값으로 대체합니다.
    - g: 글로벌 치환을 의미하며, 줄의 모든 일치 항목을 대체합니다.
- ./src/main/resources/application.yaml: 수정할 파일의 경로입니다.

<br>
<br>

위 코드 추가 후 배포를 진행하면 정상적으로 배포작업이 이루어진다! 

아래는 내 삽질의 흔적이다....

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-10-springboot-Jasypt\error.png" alt="Alt text" style="width: 60%; height: 60%; margin: 20px;">
</div>

<br>

현재 정상 배포된 모습이다 !!

<br>


<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-07-10-springboot-Jasypt\success.png" alt="Alt text" style="width: 60%; height: 60%; margin: 20px;">
</div>


<br>
<br>

----
Reference

- <a href = 'https://velog.io/@joonghyun/Jasypt%EC%99%80-Github-Secrets%EB%A1%9C-Github-%EA%B0%9C%EC%9D%B8-%EC%A0%95%EB%B3%B4-%EC%9C%A0%EC%B6%9C-%EB%B0%A9%EC%A7%80%ED%95%98%EA%B8%B0'>Jasypt와 Github Secrets로 Github 개인 정보 유출 방지하기 by HeavyJ</a>
- <a href = 'https://velog.io/@kide77/Jasypt-%EB%A5%BC-%EC%A0%81%EC%9A%A9%ED%95%A0-%EB%95%8C-%EC%A3%BC%EC%9D%98%ED%95%A0-%EC%A0%90'> Jasypt 를 적용할 때 주의할 점
- <a href = 'https://zhfvkq.tistory.com/113'> [SpringBoot] yml, propertise 설정 값 암호화 (Jasypt) by zhfvkq

- <a href = 'https://karla.tistory.com/455'> [Jasypt] Spring Boot yaml 파일 암호화 by karla


