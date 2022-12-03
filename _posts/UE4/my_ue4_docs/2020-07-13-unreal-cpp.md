---
title:  "UE4 C++ 정리" 

categories:
  -  UE4Docs
tags:
  - [Game Engine, UE4]

toc: true
toc_sticky: true

date: 2020-07-13
last_modified_at: 2020-07-13
---

공부하면서 알게된 <u>C++ 관련 언리얼4 기능들 정리</u>  
{: .notice--warning}

***

> 언리얼 공식 매뉴얼 <https://docs.unrealengine.com/ko/index.html>

- `떙떙.Object` 👉 포인터

## 👩‍🦰 클래스 타입

### ConstructorHelpers::FObjectFinder
- 메모리에서 에셋을 찾아보고 로드한다.
- 생성자 안에서만 사용할 수 있다.
- static ConstructorHelpers::FObjectFinder<컴포넌트 클래스> 객체(인수)
  - 이런 형태로 많이 쓰며 인수로 에셋의 경로를 넘기고 그 경로에서 해당 컴포넌트를 가진 에셋을 찾아 로드한다.
- **함수**
  - Succeeded()
    - 에셋 로드를 성공하면 True 리턴


## 👩‍🦰 컴포넌트

### StaticMesh
- `UStaticMeshComponent 클래스` <u>애니메이션이 없는</u> 모델링 에셋에 **시각적, 물리적 기능** 제공

<br>

### PointLight

- `UPointLightComponent` 클래스
- 조명 기능을 하는 컴포넌트.

<br>

### ParticleSystem

- `UParticleSystemComponent` 클래스
- 파티클 효과를 입혀주는 컴포넌트.

<br>
<br>

## 👩‍🦰 언리얼의 자료형

- 문자열
  - `FName`
  - `FText` 👉 언리얼의 자동 현지화(번역)를 지원한다. 
  - `FString` 👉 C++ 에서의 `string`처럼 문자열 처리와 관련된 메서드들 사용 가능
- 언리얼에선 `int` 말고 `int32`를 쓴다.

<br>
<br>

## 👩‍🦰 매크로

### UPROPERTY()
- 언리얼에서는 `UPROPERTY()` <u>매크로를 포인터 위에 붙여주면 객체가 더 이상 사용되지 않으면 자동으로 메모리를 해제</u>시켜 준다.
  - 가비지 컬렉션 역할
  - 개발자가 직접 `delete`시킬 필요가 없음
  - 이 매크로는 언리얼 오브젝트 객체에만 사용이 가능하다.
- <u>적용할 변수 선언 바로 윗 줄에 써주면 된다.</u>
- **프로퍼티**
  - UPROPERTY(VisibleAnywhere)
    - 이 속성이 언리얼 디테일 윈도우뷰에서 보이지만 이 속성의 값을 <u>편집은 할 수 없다.</u>
  - UPROPERTY(EditAnywhere)
    - 이 속성이 언리얼 디테일 윈도우뷰에서 보이며 이 속성의 값도 <u>편집은 할 수 있다.</u>
  - UPROPERTY(EditAnywhere, Category = Stat, <u>Meta = (AllowPrivateAccess = true)</u>)
    - `priavte` 은닉성을 유지하나 에디터에서 편집할 수 있게 해주는 키워드

### UE_LOG
> `UE_LOG`(카테고리, 로깅 수준, 형식 문자열, 인자...)

- 로그를 출력한다.

### ABLOG
- 특정 카테고리를 고정으로 하고 로그를 남길 때 제작하는 매크로.


<br>
<br>
 
## 👩‍🦰 함수

### CreateDeaultSubobject

- 컴포넌트들을 동적 할당해 생성하고 그 주소를 리턴한다.

```cpp
Body = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("BODY"));
Water = CreateDefaultSubobject<UStaticMeshComponent>(TEXT("WATER"));
```
- 동적 할당하고 포인터를 리턴
- `UStaticMeshComponent` 컴포넌트 생성
- TEXT("BODY")
  - 액터에 속한 컴포넌트들을 구별하기 위한 Hash 값 생성에 사용되는 문자열 값이다.
  - 다른 컴포넌트들과 중복되지 않는 유일한 값을 사용해야 하며 어떤 값을 넣어도 상관은 없다.

<br>

### SetupAttachment

```cpp
    RootComponent = Body;
	Water->SetupAttachment(Body);
```

- 루트 컴포넌트인 인수를 전달하면 호출한 컴포넌트를 루트 컴포넌트의 자식으로 넣는다.
- 즉 인수로 넘긴 컴포넌트의 자식으로 붙여준다.

<br>

### SetRelativeLocation 

```cpp
Water->SetRelativeLocation(FVector(0.0f, 0.0f, 135.0f));
```

- 해당 컴포넌트의 디폴트 Transform 값을 설정할 수있다. 인수로 `FVector` 타입의 구조체로 넘긴다.

<br>

### AddActorLocalRotation(Y축회전, Z축회전, X축 회전)

- 액터를 인수만큼 추가로 회전시킴.
- `FRotator`를 인수로 넘김

```cpp
AddActorLocalRotation(FRotator(0.0f, RotateSpeed * DeltaTime, 0.0f));  // Z 축으로 30도 * 프레임당 시간 만큼 회전
```

<br>

### SetStaticMesh(포인터)

StaticMesh 컴포넌트를 해당 포인터가 참조하는 에셋을 붙인 상태로 붙여준다.



<br>
<br>

## 👩‍🦰 이벤트 함수

### BeginPlay
  - 액터가 게임에 참여할 때 자동 호출
  - 유니티의 Start

### Tick(float DeltaTime)
  - 매 프레임마다 호출됨
  - 유니티의 Update
  - 프레임 타임 정보가 인수로 필요함.

### EndPlay
  - 액터가 게임에서 퇴장하여 메모리에서 소멸될 때 자동 호출

<br>
<br>

## 👩‍🦰 헤더 파일

- #include "EngineMinimal.h"
  - <u>언리얼 오브젝트</u>의 다양한 엔진 클래스 선언을 모아둔 공용 헤더
    - CoreMinimal보다 더 기능이 많다.
- #include "CoreMinimal.h" 
  - <u>언리얼 오브젝트</u>가 동작할 수 있는 최소한의 기능만 선언된 공용 헤더
- #include "Fountain.generated.h"
  - 코드를 작성할 땐 없지만 언리얼 환경의 컴파일 과정에서 생기는 파일이다. 마지막 #inlcude 구문에서 반드시 선언해주어야 하는 헤더파일이다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}