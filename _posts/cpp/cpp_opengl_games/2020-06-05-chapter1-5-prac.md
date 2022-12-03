---
title:  "[C++] 1.5 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics]

toc: true
toc_sticky: true

date: 2020-06-05
last_modified_at: 2020-06-05
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 1.5 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [1.5 FMOD를 이용한 소리 재생](https://ansohxxn.github.io/c++%20games/chapter1-5/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning} 


<br>

## 🙋 Q1. 무한 반복 사운드를 pause & resume 해보세요.

```cpp
#include "fmod.hpp"
#include <iostream>
#include <conio.h>

using namespace std;

int main()
{
	cout << "FMOD cpp conext example" << endl;

	FMOD::System     *system(nullptr);
	FMOD::Sound      *sound(nullptr);
	FMOD::Channel    *channel(nullptr);
	FMOD_RESULT       result;
	unsigned int      version;
	void             *extradriverdata(nullptr);

	result = FMOD::System_Create(&system);
	if (result != FMOD_OK) return -1;
	
	result = system->getVersion(&version);
	if (result != FMOD_OK) return -1;
	else printf("FMOD version %08x\n", version);

	result = system->init(32, FMOD_INIT_NORMAL, extradriverdata);
	if (result != FMOD_OK) return -1;

	result = system->createSound("Rhapsody in Blue.mp3", FMOD_LOOP_NORMAL, 0, &sound); 
	if (result != FMOD_OK) return -1;

	result = system->playSound(sound, 0, false, &channel);
	if (result != FMOD_OK) return -1;

	while (true)
	{
		result = system->update();
		if (result != FMOD_OK) return -1;

		cout << "Press 0 to pause, 1 to resume, and x to exit" << endl;
		
		int i = getch(); 

		if (i == '0')
			channel->setPaused(true);
		else if (i == '1')
			channel->setPaused(false);
		else if (i == 'x')
			break;
	}

	system->release();	
}
```

<br>

## 🙋 Q2. 배경 음악 튼 상태에서 스페이스바 키를 누를 때마다 다른 wav파일 재생하기

- 아래 코드! 스페이스바의 아스키코드는 32
  ```cpp
  else if (i == 32)      // 스페이스바의 아스키코드는 32. 스페이스 바를 입력받으면 효과음 객체를 재생시킨다.
  {
  	result = system->playSound(singing, 0, false, &channel);
  	if (result != FMOD_OK) return -1;
  }
  ```

```cpp
#include "fmod.hpp"
#include <iostream>
#include <conio.h>

using namespace std;

int main()
{
	cout << "FMOD cpp conext example" << endl;

	FMOD::System     *system(nullptr);
	FMOD::Sound      *background(nullptr);  // 배경 음악                       이렇게 사운드 포인터 2개
	FMOD::Sound      *singing(nullptr);    // 효과음 (짧은 wav파일)
	FMOD::Channel    *channel(nullptr);
	FMOD_RESULT       result;
	unsigned int      version;
	void             *extradriverdata(nullptr);

	result = FMOD::System_Create(&system); // 시스템 객체 만들어 주고 
	if (result != FMOD_OK) return -1;
	
	result = system->getVersion(&version);
	if (result != FMOD_OK) return -1;
	else printf("FMOD version %08x\n", version);

	result = system->init(32, FMOD_INIT_NORMAL, extradriverdata); // 시스템 객체 초기화 해주고
	if (result != FMOD_OK) return -1;

	result = system->createSound("Rhapsody in Blue.mp3", FMOD_LOOP_NORMAL, 0, &background); // 배경음악 객체 생성 -> LOOP_NORMAL 무한으로 재생시킬거라
	if (result != FMOD_OK) return -1;

	result = system->createSound("singing.wav", FMOD_LOOP_OFF, 0, &singing); // 효과음 객체 생성 -> LOOP_OFF 스페이스바 누를 때만 재생시킬거라
	if (result != FMOD_OK) return -1;

	result = system->playSound(background, 0, false, &channel);  // 무한루프에 들어가기 전에 배경음악 재생 ! while문이 끝나 프로그램 종료시까지 게~속 재생하게 된다. 미리 재생을 시작.
	if (result != FMOD_OK) return -1;

	while (true)
	{
		result = system->update();
		if (result != FMOD_OK) return -1;

		cout << "Press 0 to pause, 1 to resume, and x to exit" << endl;
		
		int i = getch(); // i is ASCII code

		if (i == '0')
			channel->setPaused(true);
		else if (i == 32)      // 스페이스바의 아스키코드는 32. 스페이스 바를 입력받으면 효과음 객체를 재생시킨다.
		{
			result = system->playSound(singing, 0, false, &channel);
			if (result != FMOD_OK) return -1;
		}
		else if (i == '1')
			channel->setPaused(false);
		else if (i == 'x')
			break;
	}

	system->release();	
}
```

<br>

## 🙋 Q3. 탱크 포탄 발사 사운드와 이동 소리 넣기

[1.3 연습문제 풀이 - Q1. 포탄 여러개 쏘는 탱크 구현하기](https://ansohxxn.github.io/c++%20games/chapter1-3-prac/#-q1-%ED%8F%AC%ED%83%84-%EC%97%AC%EB%9F%AC%EA%B0%9C-%EC%8F%98%EB%8A%94-%ED%83%B1%ED%81%AC-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0) 에서 구현했던 코드를 활용하여 탱크가 <u>이동할 때</u>, <u>포탄을 쏠 때</u> 소리를 재생하도록 하였다.

<iframe width="720" height="404" src="https://www.youtube.com/embed/hYUbxgimsC4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Class Sound 설명 
- 포인터 설명
  ```cpp
  FMOD::System     *system = nullptr;
  FMOD::Sound      *tankSound = nullptr;    // 탱크 움직일 때의 사운드 객체 포인터
  FMOD::Sound      *fireSound = nullptr;    // 발사할 때의 사운드 객체 포인터
  FMOD::Channel    *tankChannel = nullptr;   // 탱크 사운드를 컨트롤할 채널 포인터
  FMOD::Channel    *fireChannel = nullptr;    // 발사 사운드를 컨트롤할 채널 포인터
  ```
- 채널을 탱크채널 발사채널 2개로 따로 둔 이유 
  - 방향키 아무것도 안누를땐 탱크 사운드가 꺼져야 하지만 발사 사운드는 그대로 유지되야함. 
  - <u>즉 통제되는 시기가 서로 다르기 때문에</u> 따로 컨트롤 하기 위해 2개를 둠.
- `int systemInit()` : 시스템 객체 생성하고 초기화하는 함수
- `int createTankSound()` : 탱크 사운드 객체 생성하는 함수
  - 무한루프 X 
  - FMOD_LOOP_OFF
- `int createFireSound()` : 포탄 사운드 객체 생성하는 함수
  - 무한루프 X 
  - FMOD_LOOP_OFF
- `int playTankSound()` : 탱크 사운드 재생시키는 함수
- `int fireTankSound()` : 발사 사운드 재생시키는 함수
 
### 📜TankExample.h

```cpp
#include "fmod.hpp"
#include "Game2D.h"
#include <vector>
#include <iostream>
#include <conio.h>

using namespace std;

namespace jm
{
	class MyTank
	{
	public:
		vec2 center = vec2(0.0f, 0.0f);
		//vec2 direction = vec2(1.0f, 0.0f, 0.0f);

		void draw()
		{
			beginTransformation();
			{
				translate(center);
				drawFilledBox(Colors::green, 0.25f, 0.1f); // body
				translate(-0.02f, 0.1f);
				drawFilledBox(Colors::blue, 0.15f, 0.09f); // turret
				translate(0.15f, 0.0f);
				drawFilledBox(Colors::red, 0.15f, 0.03f);  // barrel
			}
			endTransformation();
		}
	};

	class MyBullet
	{
	public:
		vec2 center = vec2(0.0f, 0.0f);
		vec2 velocity = vec2(0.0f, 0.0f);

		void draw()
		{
			beginTransformation();
			translate(center);
			drawFilledRegularConvexPolygon(Colors::yellow, 0.02f, 8);
			drawWiredRegularConvexPolygon(Colors::gray, 0.02f, 8);
			endTransformation();
		}

		void update(const float& dt)
		{
			center += velocity * dt;
		}
	};

// ==================== class Sound ===========================================//
	class Sound
	{
	public:
		FMOD::System     *system = nullptr;
		FMOD::Sound      *tankSound = nullptr;           
		FMOD::Sound      *fireSound = nullptr;
		FMOD::Channel    *tankChannel = nullptr;
		FMOD::Channel    *fireChannel = nullptr;
		FMOD_RESULT       result;
		unsigned int      version;
		void             *extradriverdata = nullptr;

		int systemInit()
		{
			result = FMOD::System_Create(&system); // 시스템 객체 만들어 주고 
			if (result != FMOD_OK) return -1;

			result = system->getVersion(&version);
			if (result != FMOD_OK) return -1;
			else printf("FMOD version %08x\n", version);

			result = system->init(32, FMOD_INIT_NORMAL, extradriverdata); // 시스템 객체 초기화 해주고
			if (result != FMOD_OK) return -1;
		}

		int createTankSound()
		{
			result = system->createSound("drive.wav", FMOD_LOOP_OFF, 0, &tankSound); // .mp3 files work!
			if (result != FMOD_OK) return 0;
		}

		int createFireSound()
		{
			result = system->createSound("shot.wav", FMOD_LOOP_OFF, 0, &fireSound); // .mp3 files work!
			if (result != FMOD_OK) return 0;
		}

		int playTankSound()
		{
			result = system->playSound(tankSound, 0, false, &tankChannel);
			if (result != FMOD_OK) return 0;
		}

		int playFireSound()
		{
			result = system->playSound(fireSound, 0, false, &fireChannel);
			if (result != FMOD_OK) return 0;
		}
	};

// ======================================================================================

	class TankExample : public Game2D
	{
	public:
		MyTank tank;
		vector<MyBullet *> bullets;
		Sound sound;
		bool playing = false;

		//TODO: allow multiple bullets
		//TODO: delete bullets when they go out of the screen

	public:
		TankExample()
			: Game2D("This is my digital canvas!", 1024, 768, false, 2)
		{}

		void update() override
		{
			if (sound.tankSound == nullptr && sound.tankSound == nullptr) // 각 사운드 객체는 한번만 만들도록
			{
				sound.systemInit();        // 시스템 먼저 생성하기. 아주 중요 ! 
				sound.createTankSound(); 
				sound.createFireSound();
			}

			if (isKeyPressed(GLFW_KEY_LEFT))
			{
				tank.center.x -= 0.5f * getTimeStep();
				sound.result = sound.tankChannel->isPlaying(&playing);  // 탱크 이동 소리 이미 재생중이면 새로 처음부터 재생 안하도록 
				if (!playing)
					sound.playTankSound();
			}

			if (isKeyPressed(GLFW_KEY_RIGHT))
			{
				tank.center.x += 0.5f * getTimeStep();
				sound.result = sound.tankChannel->isPlaying(&playing);
				if (!playing)
					sound.playTankSound();
			}
				
			if (isKeyPressed(GLFW_KEY_UP))
			{
				tank.center.y += 0.5f * getTimeStep();
				sound.result = sound.tankChannel->isPlaying(&playing);
				if (!playing)
					sound.playTankSound();
			}
				
			if (isKeyPressed(GLFW_KEY_DOWN))
			{
				tank.center.y -= 0.5f * getTimeStep();
				sound.result = sound.tankChannel->isPlaying(&playing);
				if (!playing)
					sound.playTankSound();
			}
			
			if (!isKeyPressed(GLFW_KEY_LEFT) && !isKeyPressed(GLFW_KEY_RIGHT) && !isKeyPressed(GLFW_KEY_UP) && !isKeyPressed(GLFW_KEY_DOWN))
			{
				sound.tankChannel->stop();  // 각 방향키를 안누르고 있을땐 tank 소리 정지
			}	

			if (isKeyPressedAndReleased(GLFW_KEY_SPACE))
			{
				bullets.push_back(new MyBullet);
				bullets.back()->center = tank.center; //		
				bullets.back()->center.x += 0.2f;
				bullets.back()->center.y += 0.1f;
				bullets.back()->velocity = vec2(2.0f, 0.0f);
				sound.playFireSound();  // 스페이스바 누르면 발사소리 재생되도록! tank와 다르게 쏠때마다 소리 새로 재생되도 자연스러움
			}

			if (!bullets.empty())
			{
				for (int i = 0; i < bullets.size(); i++)
				{
					bullets.at(i)->update(getTimeStep());
					bullets.at(i)->draw();
				}
			}

			tank.draw();

			if (!bullets.empty())
			{
				for (int i = 0; i < bullets.size(); i++)
				{
					if (bullets[i]->center.x > 1.5f)
					{
						delete bullets[i];
						bullets.erase(bullets.begin() + i);
					}
				}
			}			
		}
	};
}
```

### 📜main.cpp

```cpp
#include "Game2D.h"
#include "TankExample.h"

int main(void)
{
	jm::TankExample().init("Tank example", 1280, 960, false, 2).run();

	return 0;
}
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}