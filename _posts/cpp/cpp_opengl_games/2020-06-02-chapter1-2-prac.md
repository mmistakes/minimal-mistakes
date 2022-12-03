---
title:  "[C++] 1.2 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics]

toc: true
toc_sticky: true

date: 2020-06-02
last_modified_at: 2020-06-02
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다. 😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 1.2 연습문제

연습 문제는 스스로 풀이했습니다. 😀  
이전 포스트 보러가기 🖐 [1.2 기본적인 그리기 - 이동, 회전, 애니메이션](https://ansohxxn.github.io/c++%20games/chapter1-2/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005) 
{: .notice--warning} 



<br>

## 🙋 Q1. 공전하는 태양계 만들기

main의 jm::SolarSystem().run()과 `SolarSystem.h` 헤더 파일을 이용하여 별이 가운데 있고 지구는  별을 공전하고 달은 지구를 공전하고 태양은 자전하게끔 만들어보자. *(Hint! rotate 2번만 하면 된다.)*

### 내 풀이

#### 📃 Solarsystem.h + main.cpp
- 이미 구현 되어있는 것.
- 이 헤더 파일을 활용했다.

- 별 현재 위치 : 0,0
- 지구 현재 위치 : 0.5,0
- 달 현재 위치 : 0.7,0

`📃 Solarsystem.h`

```cpp
#include "Game2D.h"

namespace jm
{
	class SolarSystem : public Game2D
	{
		float time = 0.0f;

	public:
		void update() override
		{
			beginTransformation();
			{
				drawFilledStar(Colors::gold, 0.2f, 0.13f);	// Sun

				translate(0.5f, 0.0f);
				drawFilledCircle(Colors::blue, 0.1f);		// Earth

				translate(0.2f, 0.0f);
				drawFilledCircle(Colors::yellow, 0.05f);	// Moon
			}
			endTransformation();

			time += this->getTimeStep();

		}
	};
}
```

`📃main.cpp`

```cpp
#include "SolarSystem.h"

int main(void)
{
	jm::SolarSystem().run();
	
	return 0;
}
```

#### 📃 내 답안

![image](https://user-images.githubusercontent.com/42318591/84534624-3dc5f480-ad25-11ea-8195-a6d7e1a67d96.png){: width="100%" height="100%"}{: .align-center}

- 지구, 달을 일부러 별 모양으로 그렸다. '자전'하는지 보려고! 원모양이면 자전해도 회전 안 하는걸로 보이니까! 
- 그리고 일부러 달의 속도를 눈에 띄게 보려고 빠르게 150으로 조정함.
- 최종적으로 
  - 달은 rotate을 동시에 2개를 하는 모양이 된다.
  - 지구를 150 속도로 공전하면서 동시에 태양을 45 속도로 공전하는 모양이 된다. 

```cpp
#include "Game2D.h"

namespace jm
{
	class SolarSystem : public Game2D
	{
		float time = 0.0f;

	public:
		void update() override
		{
			const vec2 earth(0.5f, 0.0f);
			const vec2 moon(0.2f, 0.0f);

			beginTransformation();	    
			{                        
				rotate(time*45.0f);                           // 실행순서 7. ( 달 + 지구 + 태양 )이 함께 회전한다.
				drawFilledStar(Colors::gold, 0.2f, 0.13f);	  // 실행순서 1. 원점에 태양을 그린다

				translate(earth);                             // 실행순서 6. ( 달 + 지구 ) 가 함께 평행이동한다. 달 (0.7,0.0) 지구(0.5,0.0)
				drawFilledStar(Colors::blue, 0.1f, 0.07f);	  // 실행순서 2. 원점에 지구를 그린다 ( 태양 위에 지구가 그려진다 )
	
				rotate(time*150.0f);                          // 실행순서 5. 달만 원점에 대해 공전한다. (원점을 공전하는 모습)
				translate(moon);                              // 실행순서 4. 달만 평행이동한다. 달 좌표 (0.2, 0.0)
				drawFilledStar(Colors::yellow, 0.05f, 0.03f); // 실행순서 3. 원점에 달을 그린다 ( 지구 위에 달이 그려진다.) 여기까지 마치면 원점에서 태양 위에 지구 위에 달 이렇게 세 개가 겹쳐져 있는 모습이 된다.
			}
			endTransformation();

			time += this->getTimeStep();                                         
		}
	};
}
```

#### 📃 번외. beginTransformation을 이해하기 위해 작성한 필기

- 달은 태양을 150 속도로 공전한다.  ( 이동 → 회전 : 즉 원점을 공전하는 것처럼 )
- 지구는 태양을 45 속도로 공전한다. ( 이동 → 회전 : 즉 원점을 공전하는 것처럼 )
- 태양은 45 속도로 자전한다 ( 회전 : 원점 제자리에서 자전하는 것 처럼)
- 즉 `beginTransformation`과 `endTransformation` 안에 있는 지구와 태양만 원점 45도 회전 영향을 받는다.
- 달은 `rotate(time*150.0f`)과 `translate(moon);`에만 영향을 받았다.

![image](https://user-images.githubusercontent.com/42318591/84534821-97c6ba00-ad25-11ea-8a5a-31193b3f1b62.png){: width="50%" height="50%"}{: .align-center}

```cpp
namespace jm
{
	class SolarSystem : public Game2D
	{
		float time = 0.0f;

	public:
		void update() override
		{
			const vec2 earth(0.5f, 0.0f);
			const vec2 moon(0.2f, 0.0f);

			beginTransformation();	// 이 범위를 벗어나면 rotate도 더 이상 적용되지 않는다.
			{
				
				rotate(time*45.0f);
				drawFilledStar(Colors::gold, 0.2f, 0.13f);	// Sun

				translate(earth);
				drawFilledStar(Colors::blue, 0.1f, 0.07f);		// Earth
				
			}
			endTransformation();

			rotate(time*150.0f);
			translate(moon);
			drawFilledStar(Colors::yellow, 0.05f, 0.03f); // moon

			time += this->getTimeStep();

		}
	};
}
```

<br>

## 🙋 Q2. 얼굴 그리기

### 📃 FaceExample.h 과 필기

![image](https://user-images.githubusercontent.com/42318591/84535026-effdbc00-ad25-11ea-8610-1324c70a51de.png){: width="50%" height="50%"}{: .align-center}

```cpp
#pragma once

#include "Game2D.h"

namespace jm
{
	class FaceExample : public Game2D
	{
	public:
		void update() override
		{
			// Big yellow face
			drawFilledCircle(Colors::yellow, 0.8f); // draw background object first

			// Red mouth
			beginTransformation();
			{
				translate(0.0f, -0.6f);
				scale(3.0f, 1.0f);
				drawFilledCircle(Colors::red, 0.1f);
			}
			endTransformation();

			// Blue nose
			beginTransformation();
			{
				rotate(-10.0f);		                  //⭐ 4. 회전
				scale(1.0f, 2.0f);                    //⭐ 3. 크기를 늘린다
				translate(0.0f, -0.1f);               //⭐ 2. 평행이동
				drawFilledCircle(Colors::blue, 0.1f); //⭐ 1. 코를 그린다
			}
			endTransformation();

			// left eye
			beginTransformation();
			{
				translate(-0.3f, 0.2f);
				rotate(-45.0f);		// 10 degrees rotated 
				drawFilledBox(Colors::black, 0.1f, 0.4f);
				drawFilledBox(Colors::black, 0.4f, 0.1f);
			}
			endTransformation();

			// right eye
			beginTransformation();
			{
				translate(+0.25f, 0.3f);                      //⭐ 4. 오른쪽 눈의 위치로 평행이동
				rotate(-45.0f);		                          //⭐ 3. 45도 돌리면 x 자 모양 
				drawFilledBox(Colors::olive, 0.1f, 0.4f);     //⭐ 1. 세로로 긴 직사각형  ( 교차하며 + 모양 됨 )
				drawFilledBox(Colors::olive, 0.4f, 0.1f);     //⭐ 2. 가로로 긴 직사각형 
			}
			endTransformation();

			for (float x = -0.5f; x < 0.4f; x += 0.05f)  // ⭐ 머릿카락 사선 줄 긋기 ( x 방향 평행이동 하며 )
			{
				drawLine(Colors::black, vec2(x, 0.6f), Colors::gray, vec2(x + 0.05f, 0.85f));
			}
		}
	};
}
```

### 📃 main.cpp

```cpp
#include "FaceExample.h"

int main(void)
{
	jm::FaceExample().run();
	return 0;
}
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}