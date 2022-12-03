---
title:  "[C++] 3.2 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics, Math, Physics]

toc: true
toc_sticky: true

date: 2020-06-17
last_modified_at: 2020-06-17
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 3.2 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [3.2 두 공을 충돌시켜보자](https://ansohxxn.github.io/c++%20games/chapter3-2/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning}

- [벡터 개념](https://ansohxxn.github.io/c++%20games/chapter3-2-1/)
- [벡터 내적](https://ansohxxn.github.io/c++%20games/chapter3-2-2/)
- [노말 벡터](https://ansohxxn.github.io/c++%20games/chapter3-2-3/)
- [상대속도와 반발계수](https://ansohxxn.github.io/c++%20games/chapter3-2-4/)
- [작용, 반작용, 충격량](https://ansohxxn.github.io/c++%20games/chapter3-2-5/)

<br>

## 🙋 Q1. 3개 이상의 공 충돌시키기 

<iframe width="477" height="268" src="https://www.youtube.com/embed/5FQ47pF1nzw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> Console창에다 <u>생성할 공의 개수를 입력하면 입력한 개수만큼 공이 생성되도록 구현</u>하였다. 생성되는 공은 랜덤한 속도, 랜덤한 색상, 랜덤한 반지름, 랜덤한 질량을 가진다. R키를 누르면 다시 입력하고 다시 생성할 수 있음.

### 📜RigidCircle.h

```cpp

	class RigidCircle
	{
	public:
		vec2 pos;
		vec2 vel;
		RGB color = Colors::hotpink;
		float radius = 0.1f;
		float mass = 1.0f;

		RigidCircle(vec2& _pos, vec2& _vel, RGB& _color, float& _radius, float& _mass)
		{
			pos = _pos;
			vel = _vel;
			color = _color;
			radius = _radius;
			mass = _mass;
		}
```
- 5개의 멤버를 받아 초기화하는 생성자를 추가하였다.

### 📜main 

```cpp
#include "Game2D.h"
#include "Examples/PrimitivesGallery.h"
#include "RandomNumberGenerator.h"
#include "RigidCircle.h"
#include <vector>
#include <memory>

using namespace std;
namespace jm
{
	class Example : public Game2D
	{
	public:
		int numberOfCircles = 0; // 공의 개수

		vector <RigidCircle *> circles;
		RandomNumberGenerator rnd;

		const float epsilon = 1.0f;

		Example()
			: Game2D()
		{
			reset();
		}

		RGB rndColor(int i)
		{
			if (i == 0) return Colors::red;
			else if (i == 1) return Colors::green;
			else if (i == 2) return Colors::blue;
			else if (i == 3) return Colors::skyblue;
			else if (i == 4) return Colors::gray;
			else if (i == 5) return Colors::yellow;
			else if (i == 6) return Colors::olive;
			else if (i == 7) return Colors::black;
			else if (i == 8) return Colors::gold;
			else if (i == 9) return Colors::silver;
		}

		void reset()
		{
			cout << "공의 개수를 입력해 주세요 : ";
			cin >> numberOfCircles;

			const float maximumOfRadius = 0.15f;
			const float manimumOfRadius = 0.1f;
			const float interval = (1.9f - 2 * maximumOfRadius * numberOfCircles) / (numberOfCircles - 1);

			vec2 pos = vec2(-0.8f, 0.3f);
			vec2 vel;
			RGB color;
			float radius = 0.0f;
			float mass = 1.0f;

			for (int i = 0; i < numberOfCircles; i++)
			{
				vel = vec2(rnd.getFloat(3.0f, 6.0f), 0.0f);
				color = rndColor(rnd.getInt(0, 9));
				radius = rnd.getFloat(0.1f, 0.15f);

				circles.push_back(new RigidCircle(pos, vel, color, radius, mass));
				
				pos.x += 2 * radius + interval;
				if (i != 0) mass = circles[0]->mass * std::pow(circles[0]->radius / circles[i]->radius, 2);
			}
		}

		void drawWall()
		{
			setLineWidth(5.0f);
			drawLine(Colors::blue, { -1.0f, -1.0f }, Colors::blue, { 1.0f, -1.0f });
			drawLine(Colors::blue, { 1.0f, -1.0f }, Colors::blue, { 1.0f, 1.0f });
			drawLine(Colors::blue, { -1.0f, -1.0f }, Colors::blue, { -1.0f, 1.0f });
		}

		void checkCollision(RigidCircle & rb0, RigidCircle & rb1)
		{
			// check collision between two rigid bodies
			const float distance = (rb0.pos - rb1.pos).getMagnitude();
			const auto vel_rel = rb0.vel - rb1.vel;
			const auto normal = -(rb1.pos - rb0.pos) / (rb1.pos - rb0.pos).getMagnitude();

			if (distance <= rb0.radius + rb1.radius)
			{
				// compute impulse
				const auto product = vel_rel.getDotProduct(normal);

				if (product < 0.0f) // approaching
				{
					const auto impulse = normal * -(1.0f + epsilon) * vel_rel.getDotProduct(normal) /
						((1.0f / rb0.mass) + (1.0f / rb1.mass));

					// update velocities of two bodies
					rb0.vel += impulse / rb0.mass;
					rb1.vel -= impulse / rb1.mass;
				}
			}
		}

		void update() override
		{
			const float dt = getTimeStep() * 0.4f;	
			
			drawWall();

			if (!circles.empty())
			{
				// update
				for (int i = 0; i < numberOfCircles; i++)
					circles[i]->update(dt);

				// collision of tow circles
				for (int i = 0; i < numberOfCircles - 1; i++)
					for (int j = i + 1; j < numberOfCircles; j++)
						checkCollision(*circles[i], *circles[j]);

				// draw
				for (int i = 0; i < numberOfCircles; i++)
					circles[i]->draw();	
			}
			
			// reset button
			if (isKeyPressedAndReleased(GLFW_KEY_R))
			{
				for (int i = 0; i < numberOfCircles; i++)
					delete circles[i];
				circles.clear();
				reset();
			}
		}
	};
}

int main(void)
{
	cout << "공의 개수를 바꾸고 싶다면 R키를 눌러주세요 ! " << endl;
	jm::Example().run();

	return 0;
}
```

- *변수*
  - *int numberOfCircles = 0;*
    - 공의 개수 
    - 콘솔창 입력에 따라 값이 정해질 것이다.
  - *vector \<RigidCircle *> circles;*
    - 공 객체의 포인터들을 저장하는 벡터 컨테이너
      - 포인터로 한 이유
        - R키 누르면 기존 공 객체들을 소멸시켜야 하기 때문에 동적 메모리로 할당받아 delete 하려고.
        - 공 객체들을 동적 메모리로 할당받아 그 주소를 저장할 포인터들. `RigidCircle *`
    - 컨테이너 크기가 콘솔창 입력으로 정해지기 때문에, 즉 동적으로 정해지기 때문에 vector로 선택했다.
  - *RandomNumberGenerator rnd;*
    - 공의 위치, 속도, 반지름을 랜덤하게 하기 위해선 랜덤한 float, int 값을 리턴해주는 함수가 필요한데 📜RandomNumberGenerator.h 에 구현되어 있다. 이를 사용하기 위해 객체를 만듬.
  - *const float epsilon = 1.0f;*
    - 반발계수
    - 이 값을 크게 설정할 수록 두 공의 충돌시 튕겨지는 정도가 크다.
- *생성자*
  - 게임이 시작되자마자 `reset()`함수를 호출하여 멤버들을 초기화한다.
- *함수*
  - *RGB rndColor(int i)*
    - i와 컬러가 매칭되어 있음
    - 컬러를 리턴해줌
    - 랜덤한 int 데이터를 매개변수로 넘겨 랜덤한 색상을 리턴받을 것
  - *void reset()*
    - 호출 될 때
      1. 게임 시작하자마자
      2. 사용자가 R키를 누를 때 
    - 구현
      1. 공의 개수를 콘솔창에서 입력 받는다.
      2. 입력으로 들어 온 수만큼공 객체들을 동적 할당받아 생성하고
      3. 그 포인터를 벡터에 원소로 추가한다.
      4. 공 객체마다 5가지 멤버값 전부 랜덤하게 설정해준다.
        - 위치, 속도, 색상, 반지름, 질량 모두 랜덤하게.
    - 자세한 설명
      - *const float maximumOfRadius = 0.15f;*
        - 공이 움직일 수 있는 왼쪽벽과 오른쪽 벽 사이의 반경을 고려해서 대충 만들 수 있는 원의 최대 반지름은 0.15f로 설정함
      - *const float manimumOfRadius = 0.1f;*
        - 만들 수 있는 원의 최소 반지름은 0.15f로 설정함
        - 원 반지름은 0.1f ~ 0.15f 사이에서 랜덤하게 뽑을 것.
      - *const float interval = (1.9f - 2 * maximumOfRadius * numberOfCircles) / (numberOfCircles - 1);*
        - 원의 초기 위치들이 같은 간격으로 정렬되어 시작하기 위해서 만듬.
        - 공의 개수가 많을 수록 좁은 간격, 공의 개수가 적을 수록 넓은 간격으로 되게끔
        - 공이 움직일 수 있는 왼쪽벽과 오른쪽 벽 사이의 길이는 2.0f이지만 맨 왼쪽 공과 맨 오른쪽 공이 벽에서 최소 0.05f는 떼어져있게 설정 함. (0.15f 반지름 크기의 최대 크기 원 기준)
        - 즉 공의 초기 pos값 정렬은 y는 0.3f로 동일하고 x는 -0.95f ~ 0.95f 내에서 (-0.8f, 0.3f) ← 여기를 시작으로 중심 좌표의 x 방향은 interval + 원의 지름 간격으로 정렬할거다.
        - (1.9f - 2 * maximumOfRadius * numberOfCircles) 
          - 0.95f * 2 = 1.9f
          - 1.9f 반경에서 원의 지름을 원하는 공 개수만큼 곱한 것을 빼주면 전체 여분이 남음
        - (numberOfCircles - 1);
          - 원이 6개면 원 사이의 간격은 5개가 된다.
        - 따라서 위에서 구한 전체 여분을 (numberOfCircles - 1) 로 나눠주어 최종적인 원 사이의 간격을 도출하도록 했다.
          - 원의 개수마다 interval 값이 다를 것. 원의 개수가 적을 수록 interval 값이 클 것.
          - 원이 많을 수록 촘촘한 간격으로 초기화 되어있을거고 원의 개수가 적을수록 넓은 간격으로 초기화
      - *vec2 pos = vec2(-0.8f, 0.3f);*
        - 지역변수다. 생성자 안에 한꺼번에 써주면 너무 길어져 정신없어져 지역변수 선언함
          - new RigidCircle(pos, vel, color, radius, mass)) 깔끔하게 이렇게 넣기 위해...
        - 첫번째 공은 무조건  (-0.8f, 0.3f) 이 자리에 위치하게 할거다.
        - pos값을 계속 변화시킬거기 떄문에 const 아님. (원들을 각각 다른 위치로 초기화 할거니까)
      - *float mass = 1.0f;*
        - 첫번째 공의 질량값은 1.0f로
      - for 문
        - 속도, 색상, 반지름
          - 이 3개는 공 객체 생성 전에 미리 설정
            - 얘네는 초기화 안했으니까 이대로 첫번째 공에 적용할 순 없으니까.
          - 랜덤한 속도, 랜덤한 색상, 랜덤한 반지름
        - circles.push_back(new RigidCircle(pos, vel, color, radius, mass));
          - 벡터에 공객체를 생성하고 삽입한다.
        - pos.x += 2 * radius + interval;
          - 다음 공의 중심 좌표는 (원의 지름 + interval) 만큼 이동한 곳으로 설정
          - y는 동일하게 0.3f 위치로 초기화 할거라서 x좌표만 업뎃.
        - if (i != 0) mass = circles[0]->mass * std::pow(circles[0]->radius / circles[i]->radius, 2);
          - 첫번째 공의 질량을 기준으로
          - 그 이후의 공부턴 첫번째 공의 반지름과 반지름을 비교하여 다음 공의 질량 결정
  - *void drawWall()*
    - 벽을 그리는 함수
  - *void checkCollision(RigidCircle & rb0, RigidCircle & rb1)*
    - 두 공의 충돌을 처리하는 함수 !
    - 이번 강의에서 배운 두 공의 충돌 처리 코드를 이 함수에 넣음.
    - 두 공 객체를 참조 형태로 넘겨 받음.
  - *void update() override*
    - Game2D의 update()오버라이딩
    - const float dt = getTimeStep() * 0.4f;
        - 시간 dt 업뎃
    - if (!circles.empty())
      - 벡터가 비어있지 않을 때만 아래의 과정을 실행함
        - R키 눌러서 벡터가 다 비워지고 났을 때 각 공의 update, draw 함수를 실행하려고 하면 런타임 에러나니까
        - circles[i]->update(dt);
          - 공의 개수만큼 for문 돌려 시간에 따른 각 공의 위치를 업뎃한다.
          - 더불어 각 공의 속도 변화도 처리한다. ( 벽에 부딪칠시, 바닥에 부딪칠시 )
          ```cpp
          for (int i = 0; i < numberOfCircles - 1; i++)
        	for (int j = i + 1; j < numberOfCircles; j++)
        		checkCollision(*circles[i], *circles[j]);
          ```
          - 공의 개수가 총 4개면 두공의 조합은 \\({4\choose{2}}=6\\)개가 된다.
          - { 1,2 } , { 1,3 }, { 1,4 }, { 2,3 }, { 2,4 }, { 3, 4}
        - 이중 for문으로 두공의 모든 조합들의 충돌을 체크하고 처리하기
          - checkCollision가 매개변수를 참조로 받기 때문에 (*circles[i], *circles[j]) 간접 참조로 넘긴다.
            - circles 벡터는 공 객체를 동적할당 받아 그것을 가리키는 포인터들을 담고 있다.
        - circles[i]->draw()
          - 공의 개수만큼 for문 돌려 시간에 따른 각 공을 그린다.
    - if (isKeyPressedAndReleased(GLFW_KEY_R))
      - R키를 누르면
        - delete circles[i];
          - for문 돌리면서 각 원소들이 가리키는 공 객체 동적 메모리들을 해제 시켜준다.
        - circles.clear();
          - 벡터를 비운다. 모든 원소를 없앤다.
            - 이 과정 안해주면 reset함수 불러와져서 기존 벡터의 뒤에 그대로 또 새로운 공들이 삽입된다. 그래서 입력하는 개수대로 안나옴.
            - reset() 함수 불러 새로 시작 !
    
    

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}