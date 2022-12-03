---
title:  "[C++] 1.3 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics]

toc: true
toc_sticky: true

date: 2020-06-03
last_modified_at: 2020-06-03
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 1.3 연습문제

연습 문제는 스스로 풀이했습니다. 😀    
이전 포스트 보러가기 🖐 [1.3 상호작용 맛보기 - 키보드 입력과 반응](https://ansohxxn.github.io/c++%20games/chapter1-3/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning} 





<br>

## 🙋 Q1. 포탄 여러개 쏘는 탱크 구현하기

![image](https://user-images.githubusercontent.com/42318591/84557002-3709a280-ad62-11ea-8546-c7ff2c77ece8.png){: .align-center}

### 구현시 중점적으로 생각한 포인트
- 총알 포인터(동적메모리) 여러개를 관리해야 하니 <u>vector 컨테이너</u>를 사용했다.
- 원본 코드에선 총알이 하나만 존재할 수 있는 상태였다.
  - 총알을 새로 쏘면 기존 총알은 사라졌다. 
  - <u>이미 기존 bullet이 존재하는 상태에서 new Bullet을 bullet에 또 할당하면 안된다.</u> 가비지 생겨 메모리 누수 문제가 발생하기 때문.
- <u>이미 화면을 멀리 벗어난지 오래인 포탄은 delete</u>시켜 메모리를 차지하지 않도록 해야한다.

### Vector 컨테이너 특징
- 사용하기 위해선 `#include <vector>` 해주기
- vector <int> 는 0으로 자동 초기화되고 vector <포인터>는 nullptr로 자동 초기화 된다.
- `using namespace std;` 이 필요하다. std::vector 일일이 붙여주기 귀찮음.
- 추가, 삭제 연산시 <u>지가 알아서 컨테이너의 사이즈 조절을 한다.</u>
- Vector의 주요 함수
  - `push_back(원소)` : 원소를 벡터 맨 뒤에 삽입
  - `back()` : 벡터 맨 뒤의 원소
  - `front()` : 벡터 맨 앞의 원소
  - `end()` : 벡터 맨 뒤의 원소의 주소
  - `front()` : 벡터 맨 앞의 원소의 주소
  - `empty()` : 벡터가 비어 있으면 true 리턴
  - `at(인덱스)` : 해당 인덱스의 원소 리턴
  - `erase(원소의주소)` : 벡터의 해당 원소를 삭제하고 그 뒤의 원소들은 앞으로 당겨온다. size는 1 줄어들게 된다.

### 소멸자 

- 프로그래머가 직접 호출하는 것은 권장하지 않는다.
- 소멸자는 객체가 메모리에서 해제될 때 내부에서 <u>자동으로 호출됨</u>
- 즉 해당 scope에서 벗어날 때 자동으로 호출되는거라서
화면 벗어날때마다 총알 객체를 delete 시킬거면 <u>소멸자에서 delete 시키는 것은 좋지 않을 것이라고 판단함.</u> 
  - 총알은 화면이 벗어날 때마다 delete 되야 하는데
  - 원본 코드처럼 소멸자 안에서 delete 한다면 프로그램 종료시에만 총알이 delete 될테니
  - <u>따라서 소멸자는 빈 코드로 두었다.</u> 

### 📃 구현한 코드

```cpp
#pragma once`

#include "Game2D.h"
#include <vector>

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

	class TankExample : public Game2D
	{
	public:
		MyTank tank;
		vector<MyBullet *> bullets;   
        /*⭐ MyBullet 포인터 타입들을 저장하는 벡터
        ⭐ 여러번 발사를 하면 화면에 총알이 여러개 존재해야 하기 때문에 편하게 참조할 수 있도록 벡터 이용 함 ! 
        동적 할당받아 포인터 벡터에 각 총알객체들의 주소들 저장하자
        ⭐ 현재 아무 것도 안들은 원소 하나도 없는 empty한 벡터임
        MyBullet *bullet = nullptr;  이건 지웠음
        */

	public:
		TankExample()
			: Game2D("This is my digital canvas!", 1024, 768, false, 2)
		{}

		~TankExample()                     // ⭐ 소멸자는 비워 두었다.
		{
			
		}

		void update() override
		{
			// move tank
			if (isKeyPressed(GLFW_KEY_LEFT))	tank.center.x -= 0.5f * getTimeStep();
			if (isKeyPressed(GLFW_KEY_RIGHT))	tank.center.x += 0.5f * getTimeStep();
			if (isKeyPressed(GLFW_KEY_UP))		tank.center.y += 0.5f * getTimeStep();
			if (isKeyPressed(GLFW_KEY_DOWN))	tank.center.y -= 0.5f * getTimeStep();

			// shoot a cannon ball
			if (isKeyPressedAndReleased(GLFW_KEY_SPACE)) 
			{
				bullets.push_back(new MyBullet);    // ⭐ 총알을 동적 할당받아 만들고 벡터의 맨 마지막 원소(포인터)에 총알 객체의 주소 삽입
				bullets.back()->center = tank.center; 		
				bullets.back()->center.x += 0.2f;
				bullets.back()->center.y += 0.1f;
				bullets.back()->velocity = vec2(2.0f, 0.0f);
				printf("%d\n", bullets.size()); // 이건 그냥 화면 벗어날 때마다 총알 없어지는지, 즉 벡터 사이즈가 줄어드는지 확인하려고 넣어보았다.
			}

			if (!bullets.empty())       // ⭐ 꼭 ! 벡터가 비어있지 않아야 한다. 벡터가 비어 있는데 (= 아무 포인터도 없는데) update하고 draw 하려하면 런타임 에러남.
			{   
				for (int i = 0; i < bullets.size(); i++)  // ⭐  벡터 순회
				{
					bullets.at(i)->update(getTimeStep());  // ⭐ 총알 위치 업뎃. (총알 위치 변화시키기)
					bullets.at(i)->draw();                // ⭐  총알 그리기 

                    /*
                        이미 화면에 그려진게 움직이는 원리가 아니고, 매번 매 while마다 새로 바뀐 자리에 계속 draw 함수를 실행시켜
                        매 프레임마다 그리는 것이다. 따라서 여러 총알들이 화면에 한꺼번에 보이려면 각 총알마다 각각!!! draw 실행시켜 주어야 함.
                        기존 원본 코드는 이 과정 없이 그냥 space 누를때마다 새로 생기는 총알 객체를 참조하고 기존 총알 객체는 
                        더 이상 참조하지 않는 가비지가 되어 버렸었다. 그러니 기존 총알 그릴 수도 없고 계속 새로운 총알 1개만 
                        그렸었는데 이제는 기존의 총알들까지 다 벡터에 저장하니까 벡터에 담긴 그 전의 총알들 또한 각각 그들만의
                        draw 과 update 을 해주면 된다. 매 프레임마다 모든 총알들이 draw, update을 실행하게 됨.
                    */
				}
			}

			tank.draw();  //탱크 그리기
            
            // 화면 벗어나는 총알 delete 시키는 처리
            // 이 과정 또한 매 update 마다, 즉 매 프레임마다 for 돌려서 벡터 전체를 순회하며 검사하게 된다. 화면을 벗어난 총알이 있는지.
			if (!bullets.empty())
			{
				for (int i = 0; i < bullets.size(); i++)
				{
					if (bullets[i]->center.x > 1.5f)   // ⭐ 화면을 벗어날 때. (평평하게만 이동하니 y는 고려할 필요 없고 오른쪽 방향으로만 날라가니 대충 1.5f 넘으면 화면을 벗어났다고 가정했다.)
					{
						delete bullets[i];                  // ⭐ 벡터 원소(포인터)가 참조하는 총알 객체 delete
						bullets.erase(bullets.begin() + i);  // ⭐ 해당 벡터 원소도 없애고 뒤에껀 한칸 앞으로 당긴다. 벡터 사이즈가 1 줄어들 것.
					}
				}
			}			
		}
	};
}
```

<br>

## 🙋 Q2. 팔 다리를 흔들며 걸어가는 사람을 구현해보자.

### 1. 먼저 2개의 팔과 2개의 다리를 그려보자.

![image](https://user-images.githubusercontent.com/42318591/84557747-8783fe80-ad68-11ea-90dc-b7504d019c2e.png){: width="50%" height="50%"}{: .align-center}


📃 `WalkingPerson.h`


```cpp
#pragma once

#include "Game2D.h"

namespace jm
{
	class WalkingPerson : public Game2D
	{
		float time = 0.0f;

	public:
		void update() override
		{
			// gold face
			beginTransformation();
			translate(0.0f, 0.12f);
			drawFilledCircle(Colors::gold, 0.08f);
			translate(0.05f, 0.03f);
			drawFilledCircle(Colors::white, 0.01f); // white eye
			endTransformation();

            // ⭐몸통 뒤에서 흔드는 왼쪽 팔. 오른쪽 팔과 다른 방향으로 움직인다.
            // 몸통 뒤에 있으므로 몸통보다 먼저 그려준다.
			// yellow arm : 왼쪽 팔
			beginTransformation();
			rotate(sinf(time*5.0f + 3.141592f) * 30.0f);					// animation!
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::yellow, 0.05f, 0.18f);
			endTransformation();

            // ⭐몸통 뒤에서 흔드는 왼쪽 다리. 왼쪽 다리와 다른 방향으로 움직인다.
            // 몸통 뒤에 있으므로 몸통보다 먼저 그려준다.
			// green leg : 왼쪽 다리
			beginTransformation();
			translate(0.0f, -0.6f);
			translate(0.0f, 0.2f);
			rotate(sin(time*5.0f) * 30.0f);		// animation!
			translate(0.0f, -0.2f);
			drawFilledBox(Colors::green, 0.1f, 0.4f);
			endTransformation();

			// red body : 몸통
			beginTransformation();
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::red, 0.13f, 0.2f);
			endTransformation();

			// yellow arm : 오른쪽 팔
			beginTransformation();
			rotate(sin(time*5.0f) * 30.0f);					// animation!
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::yellow, 0.05f, 0.18f);
			endTransformation();

			// green leg : 오른쪽 다리
			beginTransformation();
			translate(0.0f, -0.6f);
			translate(0.0f, 0.2f);
			rotate(sinf(time*5.0f + 3.141592f) * 30.0f);	// animation!
			translate(0.0f, -0.2f);
			drawFilledBox(Colors::green, 0.1f, 0.4f);
			endTransformation();

			

			time += this->getTimeStep();
		}
	};
}
```

📃 `main.cpp`

```cpp
#include "Game2D.h"
#include "WalkingPerson.h"

int main(void)
{
	jm::WalkingPerson().run();
	return 0;
}
```

### 2. 여러 사람이 걸어다니는 것을 구현해보자. (class를 이용하여 확장)

![image](https://user-images.githubusercontent.com/42318591/84557809-fa8d7500-ad68-11ea-8fe2-f097ed96dbe5.png){: .align-center}

- 5명이 팔 다리를 휘저으는 애니메이션을 하며 걷고 있다.

#### Class

1. Person : '사람' 클래스. 사람 객체를 찍어내는 클래스며 사람을 그리는 draw 함수를 담고 있다.
2. WalkingPerson : 헤더 파일 이름과 동일. Game2D를 상속하여 update를 오버라이딩 한다.

#### 📃 구현 코드

```cpp
#pragma once

#include "Game2D.h"

namespace jm {

	class Person {

		float time = 0.0f;
		vec2 start = vec2(-1.0f, 0.0f);  // 모든 사람의 초기 위치.

	public:
		void draw(const float& dt) {   
            
            /*
            getTimeStep()은 Game2D를 상속하는 클래스에서만 물려받아 쓸 수 있기 때문에 
            Person 클래스인 여기서 바로  time += this->getTimeStep(); 이렇게 사용할 수가 없다. 
            따라서 Game2D를 상속하는 WalkingPerson 클래스에서 getTimeStep() 리턴값을 매개변수로 넘겨 받을 수 있도록
            draw(const float& dt) 로 매개변수를 가진 함수로 바꿨다.

            5명 그려야 하니까 (-1.0f, 0.0f) 좌표에 5명을 다 그리고 update에서 한명씩 평행이동 시키는걸로.
            translate(start);
            */

			// gold face
			beginTransformation();
			translate(start);
			translate(0.0f, 0.12f);
			drawFilledCircle(Colors::gold, 0.08f);
			translate(0.05f, 0.03f);
			drawFilledCircle(Colors::white, 0.01f); // white eye
			endTransformation();

			// yellow arm 1
			beginTransformation();
			translate(start);
			rotate(sinf(time*5.0f + 3.141592f) * 30.0f);					// animation!
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::yellow, 0.05f, 0.18f);
			endTransformation();

			// green leg 1
			beginTransformation();
			translate(start);
			translate(0.0f, -0.6f);
			translate(0.0f, 0.2f);
			rotate(sin(time*5.0f) * 30.0f);		// animation!
			translate(0.0f, -0.2f);
			drawFilledBox(Colors::green, 0.1f, 0.4f);
			endTransformation();

			// red body
			beginTransformation();
			translate(start);
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::red, 0.13f, 0.2f);
			endTransformation();

			// yellow arm 2 
			beginTransformation();
			translate(start);
			rotate(sin(time*5.0f) * 30.0f);					// animation!
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::yellow, 0.05f, 0.18f);
			endTransformation();

			// green leg 2
			beginTransformation();
			translate(start);
			translate(0.0f, -0.6f);
			translate(0.0f, 0.2f);
			rotate(sinf(time*5.0f + 3.141592f) * 30.0f);	// animation!
			translate(0.0f, -0.2f);
			drawFilledBox(Colors::green, 0.1f, 0.4f);
			endTransformation();

			time += dt;

		}
	};

	class WalkingPerson : public Game2D
	{
	public:
		Person * p[5];      // 5명그릴거야. 5 크기의 배열에 담음. 객체 '포인터' 사용함 !

	public:
		WalkingPerson()
		{
			for (int i = 0; i < 5; i++)
			{
				p[i] = new Person();              // 객체를 동적 할당으로 생성하여 포인터 배열에 각각 넣어준다.
			}
		}

		~WalkingPerson()
		{
			for (int i = 0; i < 5; i++)
			{
				delete p[i];                 // 소멸자에선 delete 시켜주고 원소 nullptr로 초기화
				p[i] = nullptr;
			}
		}

		void update() override  // 매 프레임마다 실행됨 (Game2D의 run() 속에서 무한루프 됨)
		{ 
			for (int i = 0; i < 5; i++)
			{
                /*
                  translate -> for문 안에서 계속해서 평행이동 누적 합 된다. 
                  처음 그려지는 p[0] 사람은 for문 다 돌고나면 x축 (0.5f)자리에 그려질 것. -1.0f + (5 * 0.3f)
                  가장 마지막에 그려지는 p[4] 사람은 딱 start위치인 x축 (-1.0f)에 (0.3f) 한번만 더해진 (-0.7f)에 그려질 것이다.
                */

				translate(0.3f, 0.0f);        
				p[i]->draw(getTimeStep());    // 각 사람을 그려준다. 
			}
		}
	};
}
```

<br>

## 🙋 Q3. 아이언맨처럼 손에서 리펄서 빔을 발사하며 걸어다니는 사람 구현

<iframe width="815" height="458" src="https://www.youtube.com/embed/iW1-_X1t-5M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### enum 사용
- `enum Direction`
  - 오른쪽 왼쪽 구분이 필요한데 bool로 하기 보다 눈에 딱 들어오게 열거형으로 `LEFT = 1`, `RIGHT = 0` 로 지정했다.
    1. 눈의 방향 
      - 눈의 위치만 변해도 반대쪽으로 방향 튼 것으로 보이기 때문에 고려했다. 
      - `void drawEye(int dir);`
    2. 리펄서 쏠 때의 팔 방향  
      - `void drawRightArm(int repulsor, int dir);`
    3. 사람 위치 
      - 오른쪽이면 + 해주고 왼쪽이면 - 해줘야 하기 떄문에
      - `void move(const float& dt, int dir);`
    4. 리펄서 쏴지는 방향  
      - `void drawRepulsor(int dir);`
- `enum Repulse`
  - 리펄서 쏠 때와 안 쏠 떄의 팔 모양이 다르니까 ! 
  - 안 쏠 때 `WAIT = 0`, 쏠 때 `FIRE = 1`로 지정했다.
  - 역시 bool로 하기보다는 눈에 딱 들어오게 하려고 열거형으로. 
  - `void drawRightArm(int repulsor, int dir);`

### class 설명 

1. class Person : <u>사람</u>을 그리는데 필요한 함수들과 사람의 위치 멤버 변수를 묶어 둠
2. class Repulsor : <u>리펄서</u>를 그리는데 필요한 함수들과 리펄서의 위치 멤버 변수를 묶어 둠
3. class WalkingPerson : Game2D 클래스를 상속 받으며 그로부터 update함수를 받아 오버라이딩 해서 게임 무한 루프 돌림. <u>사람, 리펄서 객체를 만듬.</u>

- 함수가 많아 복잡해서.. 헤더파일, CPP파일로 따로 나눴다! 
  - 📃 `WalkingPersoh.h` : 헤더파일은 함수의 프로토 타입만 모아둠.  
  - 📃 `WalkingPersoh.cpp` : cpp는 함수 바디를 모아 둠.

#### 구현 코드 : 📃 `WalkingPersoh.h`

```cpp
#pragma once

#include "Game2D.h"

namespace jm {

	enum Direction 
	{
		RIGHT,
		LEFT
	};

	enum Repulse
	{
		WAIT,
		FIRE
	};


	class Person  // ⭐ 사람 클래스
	{
	public:
		vec2 personLocation = vec2(0.0f, 0.0f);   //사람의 위치

		Person(){}

		void drawFaceAndBody();    // 얼굴 + 몸 그리기   -> 애니메이션 X 
		void drawEye(int dir);     // 눈 그리기 ( 왼쪽 방향키 누르면 왼쪽 방향 )  -> 애니메이션 X 단 위치는 바뀜
		void drawLeftArm();        // 왼팔 그리기 (몸통 뒤에 있는 팔을 왼팔이라고 칭했다)    -> 애니메이션 O 무빙시 팔 흔듬
		void drawRightArm(int repulsor, int dir);  // 오른팔 그리기 ( 리펄서를 쏘고 있다면. 그리고 쏘는 방향에 따라 그려지는 팔의 모습 )  -> 애니메이션 O 무빙시 팔 흔듬, 리펄서 쏠땐 애니메이션 X
		void drawLeftLeg();       // 왼다리 그리기 ( 몸통 뒤 )  ->  애니메이션 O 무빙시 다리 흔듬
		void drawRightLeg();      // 오른다리 그리기  ->  애니메이션 O 무빙시 다리 흔듬

		void stand();             // 서있을 때 모습. 실행시작 OR 방향키를 누르고 있지 않을 때  -> 차렷하고 서있을 수 있게 애니메이션 효과를 없앤다. time 을 0으로 초기화 주면 됨
		void move(const float& dt, int dir);      // 방향키 누를 때 사람의 위치 갱신
	};


	class Repulsor  // ⭐ 리펄서 클래스
	{
	public:
		vec2 repulsorLocation = vec2(0.0f, 0.0f);    // 리펄서 위치 ( 오른 팔 끝에서 나가야 한다. )

		void drawRepulsor(int dir);      // 리펄서 그리기  -> 애니메이션은 x  사람 위치에 따라 같이 위치만 바뀜 
	};


	class WalkingPerson : public Game2D  // ⭐ 게임 실행 클래스
	{
	public:
		Person person;                      // 사람 객체 생성
		Repulsor* repulsor = nullptr;       // 리펄서 객체 포인터 ( 메모리 누수를 막기 위해 스페이스 안누를땐 리펄서가 없어져야 하고 싶으므로 포인터로 접근하기로 했다 )
		int dir = RIGHT;                    // 시작 시엔 오른쪽 향하는 상태로 초기화
		int rep = WAIT;                     // 시작 시엔 리펄서 안쏘는걸로 상태로 초기화

	public:

        /*
            update은 무한 루프 안에서 돌아가며 매 실행마다 갱신된 위치에 새로 그리는 작업을 한다.
            객체의 기존 그림이 이동하는거라고 착각하면 안돼. 매번 새로운 위치에 새 그림이 그려져서 우리 눈에 정지해 있는 그림 혹은 애니메이션으로 보이는거다.
        */
		void update() override                              
		{
			person.drawLeftArm();  // 1. 왼쪽 팔을 그린다. (몸통에 가려지니 몸통보다 먼저 그려야.)
			person.drawLeftLeg();  // 2. 왼쪽 다리를 그린다. 
			person.drawFaceAndBody();  // 3. 얼굴과 몸통을 그린다.
			person.drawEye(dir);   // 4. 눈을 그린다. (얼굴보다 나중에 그려야 얼굴 위에 그려짐)
			person.drawRightArm(rep, dir); // 5. 오른 팔을 그린다. (몸통보다 나중에 그려야 몸통 위에 그려짐)
			person.drawRightLeg();  // 6. 오른 다리를 그린다.

			if (isKeyPressed(GLFW_KEY_LEFT))  
			{
				dir = LEFT;   // 왼쪽 방향키를 누르면 
				person.move(getTimeStep(), dir);   // 사람이 왼쪽 방향으로 이동하게끔
			}

			if (isKeyPressed(GLFW_KEY_RIGHT))
			{
				dir = RIGHT;   // 오른쪽 방향키를 누르면 
				person.move(getTimeStep(), dir);   // 사람이 오른쪽 방향으로 이동하게끔
			}

			if (!isKeyPressed(GLFW_KEY_RIGHT) && !isKeyPressed(GLFW_KEY_LEFT))    // 왼쪽키와 오른쪽키 모두 누르지 않을때는 애니메이션 없이 가만히 서있는 자세가 되도록.
			{ 
				person.stand();         // 더이상 팔다리를 흔들지 않게 time을 0으로 리셋하는 기능을 한다. 
 			}

			if (isKeyPressed(GLFW_KEY_SPACE)) // 스페이스바를 누르면 스페이스 누를 때 리펄서 객체 생성
			{
				rep = FIRE;
				repulsor = new Repulsor;   
				
				if (dir == LEFT)
				{
					repulsor->repulsorLocation = person.personLocation + vec2(-1.0f, 0.0f);   // 왼쪽 보고 있을 시 리펄서가 나가는 위치
				}	
				else if (dir == RIGHT)
				{
					repulsor->repulsorLocation = person.personLocation + vec2(1.0f, 0.0f);   // 오른쪽 보고 있을 시 리펄서가 나가는 위치
				}
				repulsor->drawRepulsor(dir);
			}

			if (!isKeyPressed(GLFW_KEY_SPACE))   // 스페이스 안누를 때 
			{
				rep = WAIT;  // 리펄서 안쏠 때는 WAIT으로 상태로 바꿔야하고

				delete repulsor; // 리펄서 객체 delete 해야한다.
				repulsor = nullptr;
			}
		}
	};
}
```

#### 구현 코드 : 📃 `WalkingPersoh.cpp`

```cpp
#include "Game2D.h"
#include "WalkingPerson.h"

namespace jm {
	
	float time = 0.0f;

	void Person::drawFaceAndBody()          // drawFaceAndBody() : 얼굴 + 몸 그리는 함수 
	{
		beginTransformation();            // 얼굴 그리기
		{
			translate(personLocation);
			translate(0.0f, 0.12f);
			drawFilledCircle(Colors::gold, 0.08f);
		}
		endTransformation();
		beginTransformation();
		{
			translate(personLocation);     // 몸통 그리기
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::red, 0.13f, 0.2f);
		}
		endTransformation();
	}

	void Person::drawEye(int dir)    // drawEye(int dir) : 눈 그리는 함수
	{
		if (dir == LEFT)  // 왼쪽을 볼 때
		{
			beginTransformation();
			{
				translate(personLocation);
				translate(-0.05f, 0.15f);
				drawFilledCircle(Colors::black, 0.01f);
			}
			endTransformation();
		}
		else if (dir == RIGHT) // 오른쪽을 볼 때
		{
			beginTransformation();
			{
				translate(personLocation);
				translate(0.05f, 0.15f);
				drawFilledCircle(Colors::black, 0.01f);
			}
			endTransformation();
		}
	}

	void Person::drawLeftArm()  // drawLeftArm() : 왼쪽 팔(몸통 뒤에 있는 팔) 그리는 함수
	{
		beginTransformation();
		{
			translate(personLocation);
			rotate(sinf(time*5.0f + 3.141592f) * 30.0f);					// animation!
			scale(1.0f, 2.0f);
			translate(0.0f, -0.1f);
			drawFilledBox(Colors::yellow, 0.05f, 0.18f);
		}
		endTransformation();
	}

	void Person::drawRightArm(int repulsor, int dir)    // drawRightArm(int repulsor, int dir) : 오른 팔 그리는 함수. 리펄서를 쏘는 팔이다. 
	{
		if (repulsor == WAIT)     // 정지 상태<time = 0>    OR      움직일 때(발사는 안하되 그냥 걸어다닐 때)<time != 0>
		{
			beginTransformation();
			{
				translate(personLocation);
				rotate(sinf(time*5.0f) * 30.0f);					// animation!
				scale(1.0f, 2.0f);
				translate(0.0f, -0.1f);
				drawFilledBox(Colors::yellow, 0.05f, 0.18f);
			}
			endTransformation();
		}
		else if (repulsor == FIRE)  // 발사 상태일 때
		{
			if (dir == RIGHT)  // 오른쪽 발사시
			{
				beginTransformation();
				{
					translate(personLocation);
					rotate(90.0f);
					scale(1.0f, 2.0f);
					translate(0.0f, -0.1f);
					drawFilledBox(Colors::yellow, 0.05f, 0.18f);
				}
				endTransformation();
			}
			else if (dir == LEFT)  // 왼쪽 발사시
			{
				beginTransformation();
				{
					translate(personLocation);
					rotate(-90.0f);
					scale(1.0f, 2.0f);
					translate(0.0f, -0.1f);	
					drawFilledBox(Colors::yellow, 0.05f, 0.18f);
				}
				endTransformation();
			}
		}
	}

	void Person::drawLeftLeg()  // drawLeftLeg() : 왼쪽 다리 그리는 함수
	{
		beginTransformation();
		{
			translate(personLocation);
			translate(0.0f, -0.6f);
			translate(0.0f, 0.2f);
			rotate(sinf(time*5.0f + 3.141592f) * 30.0f);	// animation!
			translate(0.0f, -0.2f);
			drawFilledBox(Colors::green, 0.1f, 0.4f);
		}
		endTransformation();
	}

	void Person::drawRightLeg() // drawRighttLeg() : 오른쪽 다리 그리는 함수
	{
		beginTransformation();
		{
			translate(personLocation);
			translate(0.0f, -0.6f);
			translate(0.0f, 0.2f);
			rotate(sinf(time*5.0f) * 30.0f);	// animation!
			translate(0.0f, -0.2f);
			drawFilledBox(Colors::green, 0.1f, 0.4f);
		}
		endTransformation();
	}

	void Person::stand()     // stand() : 방향키를 안누를땐 차렷 자세여야 하니 팔다리 안흔들도록 time 0으로 초기화
	{
		time = 0.0f;
	}

	void Person::move(const float& dt, int dir) // move(const float& dt, int dir) : 사람의 위치 업뎃
	{
		time += dt;                    // time 업뎃
		if (dir == LEFT)
			personLocation.x -= 0.5f * dt;  // 사람의 위치 업뎃
		else if (dir == RIGHT)
			personLocation.x += 0.5f * dt;
	}

	void Repulsor::drawRepulsor(int dir)  // :drawRepulsor(int dir): Repulsor 클래스의 함수. 리펄서를 그린다.
	{
		beginTransformation();
		{
			translate(repulsorLocation);
			drawFilledBox(Colors::skyblue, 1.0f, 0.08f);
		}
		endTransformation();
	}
}
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}