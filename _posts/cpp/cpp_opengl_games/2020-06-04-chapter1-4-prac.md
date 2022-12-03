---
title:  "[C++] 1.4 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics, Math]

toc: true
toc_sticky: true

date: 2020-06-04
last_modified_at: 2020-06-04
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 1.4 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [1.4 마우스 입력 다루기](https://ansohxxn.github.io/c++%20games/chapter1-4/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning} 


<br>

## 🙋 Q1. 마우스 커서 위치에 회전하는 별 구현하기

```cpp
#include "Game2D.h"

namespace jm
{
	class MouseExample : public Game2D
	{
	public:
		float time = 0.0f;
		void update() override
		{
			const vec2 mouse_pos = getCursorPos(true);
			translate(mouse_pos);
			rotate(time*90.0f);    // translate 이동 전 회전 먼저 시키기. 원점에 대해서, 즉 제자리에서 돌게끔.
			drawFilledStar(Colors::gold, 0.2f, 0.13f);

			time += getTimeStep(); // 계속해서 회전하게끔 시간 업뎃
		}
	};
}

int main(void)
{
	jm::MouseExample().init("This is my digital canvas!", 1000, 1000, false).run();

	return 0;
}
```

<br>

## 🙋 Q2. 커서가 원 안에 들어갔을 경우 색깔 바꾸기

- 파란 원을 한 개 그리고 마우스 커서가 그 원 안에 들어갔을 경우에 빨간색으로 바꿔보세요.

```cpp
#include "Game2D.h"

namespace jm
{
	class MouseExample : public Game2D
	{
	public:
		float radius = 0.1f;                // 원의 반지름은 0.1f 로 설정
		vec2 circlePos = vec2(0.5f, 0.5f);  // 원의 고정 위치

		void update() override
		{
			const vec2 mouse_pos = getCursorPos(true);       // 마우스 현재 위치

			translate(circlePos);  // 아래 if 문이 거짓일땐 파란원만, 아래 if 문이 참일 땐 빨간원 파란원 둘다 translate 될 것.
			drawFilledCircle(Colors::blue, radius);         // 1. 파란 원을 그린다.

			if (mouse_pos.x >= circlePos.x - radius && mouse_pos.x <= circlePos.x + radius 
					&& mouse_pos.y >= circlePos.y - radius && mouse_pos.y <= circlePos.y + radius)
			{
				drawFilledCircle(Colors::red, radius);       // 원 안에 마우스 커서가 들어 가는게 참일 땐 2. 빨간 원을 그린다.
			}
		}
	};
}

int main(void)
{
	jm::MouseExample().init("This is my digital canvas!", 1000, 1000, false).run();

	return 0;
}
```

<br>

## 🙋 Q3. 원하는 방향으로 마우스를 조작하여 포탄 날리기 

- 2D 배틀 그라운드처럼 화면 가운데의 물체를 커서 방향으로 회전시켜 보세요.
- 2D 배틀 그라운드처럼 마우스 버튼을 누르면 커서 방향으로 총알을 발사해보세요.

<iframe width="816" height="458" src="https://www.youtube.com/embed/8eOtOcQf50c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 코드

```cpp
#include "Game2D.h"
#include <vector>

namespace jm
{
	class Bullet // 총알 클래스
	{
	public:
		vec2 mousePosSave = vec2(0.0f, 0.0f);       
		vec2 velocity = vec2(2.0f, 0.0f);
		vec2 distanceFromStart = vec2(0.0f, 0.0f);
		vec2 start = vec2(0.45f, 0.0f);

		void draw()
		{
			beginTransformation();
			translate(distanceFromStart);
			translate(start); 
			drawFilledRegularConvexPolygon(Colors::yellow, 0.02f, 8);
			drawWiredRegularConvexPolygon(Colors::gray, 0.02f, 8);
			endTransformation();
		}

		void update(const float& dt)
		{
			distanceFromStart += velocity * dt;
		}
	};

	class MouseExample : public Game2D
	{
	public:

		vector<Bullet *> bullets;
		vec2 temp = vec2(0.0f, 0.0f);

		void update() override
		{
			const vec2 mouse_pos = getCursorPos(true);   // 마우스 현재 위치
			
			/* 발사대 모양 만들고 좌클시 총알 객체 만들기 */

			beginTransformation();
			if (mouse_pos.x != 0)
			{
				rotate(180 / 3.141592f * atan2f(mouse_pos.y, mouse_pos.x));  // 4. 파란 상자만 마우스 현재 위치 방향으로 회전
				temp.x = mouse_pos.x; // 이때의 마우스 위치 temp에 저장. 나중에 총알 객체 생성되면 그때 쓰려고.
				temp.y = mouse_pos.y; 
			}
			if (isMouseButtonPressedAndReleased(GLFW_MOUSE_BUTTON_1))    // 좌클 누르면 총알 객체 생성, mousePos에 temp 옮겨주기.
			{
				bullets.push_back(new Bullet);		
				bullets.back()->mousePosSave = vec2(temp.x, temp.y);
			}
			translate(0.2f, 0.0f);                     // 3. 파란상자만 tranlate 된다. (노란원은 begin~end 밖이라 해당 x)
			drawFilledBox(Colors::blue, 0.4f, 0.05f);  //  1. 파란 상자가 먼저 그려진다.
			endTransformation();
			
            drawFilledCircle(Colors::gold, 0.1f);	   // 2. 노란 원이 그려진다.

			/* 총알들 그리기 */

			if (!empty(bullets))    // bullet 벡터가 비어있지 않을 때, 즉 포인터가 동적 공간을 할당 중이어야만 접근하기.
			{
				for (int i = 0; i < bullets.size(); i++)
				{
					beginTransformation(); // begin end 꼭 해주기. 누적되지 않게.
					rotate(180 / 3.141592f*atan2f(bullets[i]->mousePosSave.y, bullets[i]->mousePosSave.x)); // 총알 회전
					bullets.at(i)->update(getTimeStep());
					bullets.at(i)->draw();   // 총알을 start+distaceFromStart
					endTransformation();
				}
			}

			/* 화면 벗어난 총알들 delete */

			if (!empty(bullets))
			{
				vec2 v;
				for (int i = 0; i < bullets.size(); i++)
				{
					v = bullets[i]->distanceFromStart + bullets[i]->start;   // 그림상에서 x축 두번째 분홍 점
					if (v.x > 1.5f || v.x < -1.5f || v.y > 1.5f || v.y < -1.5f) // 화면을 벗어나면 
					{
						delete bullets[i];
						bullets.erase(bullets.begin() + i);
					}
					printf("%d\n", bullets.size());  // 이렇게 해놔서 화면 출력창에 벡터사이즈가 늘고 줄고하는거 볼 수 있게 함
				}
			}
		}
	};
}

int main(void)
{
	jm::MouseExample().init("This is my digital canvas!", 1000, 1000, false).run();
	return 0;
}
```

<br>

### 구조 설명

![image](https://user-images.githubusercontent.com/42318591/84586933-32beb180-ae56-11ea-834d-2258aa37e9a6.png)

#### class Bullet
- 총알들을 찍어낼 총알 클래스 (포탄)
- `vec2 mousePosSave`
  - 마우스의 현재 위치를 '저장' -> 마우스 현재 위치로 파란 상자를 회전시킬 때는 bullet 객체는 아직 생성되지 않은 상태라 (마우스 좌클릭시에만 생성) 미리 저장. 
  - 총알도 생성시에 파란상자와 같은 각도로 회전해야 하기 때문에 파란 상자가 회전하는 기준이였던 그 찰나의 마우스 현재 위치를 미리 저장해놔야 한다.
- `vec2 velocity = vec2(2.0f, 0.0f);`
  - 총알이 날아가는 속도.
  - velocity 좌표 값은 코드 내에서 변경 안되고 고정 됨. 
  - 3.0f으로 하면 더 빨라진다. 값 수정 가능.
- `vec2 distanceFromStart`
  - start 좌표로부터 `velocity * dt`가 더해진 좌표. 
  - 즉 총알은 계속 날아가면서 시간의 흐름에 따라 distanceFromStart 좌표에서 그려진다. 
  - 시간의 흐름에 따라 계속 증가한다.
- `vec2 start = vec2(0.45f, 0.0f);`
  - 파란 상자의 오른쪽 끝 위치에 대충 맞춤.
  - start 좌표 값은 코드 내에서 변경 안되고 고정 됨.
- `void draw()` 
  - 총알을 그림 (x축에)
  - 원점에 총알을 그린 후 start 좌표에 이동시켜 놓음.
  - 뒤 이어 distanceFromStart 에 이동시킴
- `void update(const float& dt)`
  - distanceFromStart 좌표를 업뎃 시킴 (고정 속도에 프레임 곱)
    - 시간의 흐름에 따라 원점으로부터 점점 더 멀어지게 됨

#### class MouseExample
- Game2D를 상속하며 update를 가지고 있는 게임 실행 클래스. update 안에서 객체를 생성한다.
- `vector<Bullet *> bullets`
  - 총알 객체 포인터들을 담는 벡터. 
  - 총알 여러개를 그려야하기 떄문에 벡터, 화면 벗어나면 없애고 가비지 방지 위해 동적 할당 메모리를 담은 포인터.
- `vec2 temp`
  - `temp`는 <u>MouseExample</u>꺼고 `mousePosSave`는 <u>Bullet</u>꺼.
    - 총알이 날아가는 모션을 그릴 때 회전해야하므로 회전 각을 구할 땐 mouse_Pos가 필요할데 Bullet 객체는 아직 여기 존재하지 않으니 Bullet 생성되때 이때의 mouse_Pos 값을 옮겨주기위해 임시 저장용으로 temp를 사용했다.

##### 각도 구하기, atan2 vs atan1

![image](https://user-images.githubusercontent.com/42318591/84587024-a52f9180-ae56-11ea-907a-474cbffb1b6d.png)

- `rotate(180 / 3.141592f*atan2f(mouse_pos.y, mouse_pos.x));`
- 각도(세타) = arctan(y / x)
- `라디안` 에서 `도`로 변환하기 : <u>degree(도) = ( 180 / π ) * radian (라디안)</u>
- atan 과 atan2는 아크 탄젠트 값을 구해주는 함수인데 
  - `atan`은 0~360도 범위를 리턴하고 매개변수를 y/x 한개만 필요로 하며 
  - `atan2`는 -180~180도 범위로 매개변수를 y, x 두개 받는다. 
  - `atan`은 1분면과 3사분면을, 2사분면과 4사분면을 동일하게 생각하고 구분하지 못해 잘못된 결과 값을 리턴할 수 있다. 따라서 `atan2` 사용을 추천한다.



***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}