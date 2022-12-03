---
title:  "[C++] 2.1 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics]

toc: true
toc_sticky: true

date: 2020-06-06
last_modified_at: 2020-06-06
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 2.1 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [2.1 객체 지향 : 클래스와 캡슐화](https://ansohxxn.github.io/c++%20games/chapter2-1/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning}


<br>

## 🙋 Q1. 여러 채의 집들을 지붕, 벽, 창문의 색상을 다양하게 그려보기

![image](https://user-images.githubusercontent.com/42318591/84808805-3021af00-b044-11ea-83a0-b19363ee16a4.png){: width="50%" height="50%"}{: .align-center}

- `RGB randomColor(int i)` 함수
  - 랜덤 넘버가 파라미터 i에 복사되어 매칭되는 컬러를 리턴하도록 했다.

```cpp
houses[i].setWallColor(houses[i].randomColor(rnd.getInt(0, 10))); // 벽 색상 랜덤 설정
houses[i].setRoofColor(houses[i].randomColor(rnd.getInt(0, 10))); // 지붕 색상 랜덤 설정
houses[i].setWindowColor(houses[i].randomColor(rnd.getInt(0, 10))); // 창문 색상 랜덤 설정
```
- 0~10 의 정수 중 랜덤한 값 리턴

```cpp
#include "Game2D.h"
#include "Examples/PrimitivesGallery.h"
#include "RandomNumberGenerator.h"

namespace jm
{
	class House
	{
	private:
		RGB roof_color;
		RGB wall_color;
		RGB window_color;
		vec2 pos;
		float angle = 0.0f;

	public:
		House()
			: roof_color(Colors::red), pos(0.0f,0.0f), angle (0.0f), wall_color(Colors::yellow), window_color(Colors::skyblue)
		{}

		RGB randomColor(int i)  // 추가한 함수! 랜덤 넘버가 파라미터 i에 복사되어 매칭되는 컬러를 리턴하도록 했다.
		{
			if (i == 0) return Colors::red;
			else if (i == 1) return Colors::green;
			else if (i == 2) return Colors::blue;
			else if (i == 3) return Colors::skyblue;
			else if (i == 4) return Colors::gray;
			else if (i == 5) return Colors::yellow;
			else if (i == 6) return Colors::olive;
			else if (i == 7) return Colors::black;
			else if (i == 8) return Colors::white;
			else if (i == 9) return Colors::gold;
			else if (i == 10) return Colors::silver;
		}

		void setPos(const vec2& _pos)
		{
			pos = _pos;
		}

		void setAngle(const float& _angle)
		{
			angle = _angle;
		}

		void setWallColor(const RGB& _wall_color)
		{
			wall_color = _wall_color;
		}

		void setWindowColor(const RGB& _window_color) // 추가. 창문 색을 지정함
		{
			window_color = _window_color;
		}

		void setRoofColor(const RGB& _roof_color) // 추가. 지붕 색을 지정함
		{
			roof_color = _roof_color;
		}

		void draw()
		{
			beginTransformation();
			{
				translate(pos);
				rotate(angle);
				// wall
				drawFilledBox(wall_color, 0.2f, 0.2f);

				// roof
				drawFilledTriangle(roof_color, { -0.13f, 0.1f }, { 0.13f, 0.1f }, { 0.0f, 0.2f });
				drawWiredTriangle(roof_color, { -0.13f, 0.1f }, { 0.13f, 0.1f }, { 0.0f, 0.2f });

				// window
				drawFilledBox(window_color, 0.1f, 0.1f);
				drawWiredBox(Colors::gray, 0.1f, 0.1f);
				drawLine(Colors::gray, { 0.0f, -0.05f }, Colors::gray, { 0.0f, 0.05f });
				drawLine(Colors::gray, { -0.05f, 0.0f }, Colors::gray, { 0.05f, 0.0f });

			}
			endTransformation();
		}
	};

	class Example : public Game2D
	{
	public:

		House houses[10];

		Example()
			:Game2D()
		{
			RandomNumberGenerator rnd;

			for (int i = 0; i < 10; i++)
			{
				houses[i].setPos(vec2(-1.3f + 0.3f * float(i), rnd.getFloat(-0.5f, 0.5f)));
				houses[i].setWallColor(houses[i].randomColor(rnd.getInt(0, 10)));
				houses[i].setRoofColor(houses[i].randomColor(rnd.getInt(0, 10)));
				houses[i].setWindowColor(houses[i].randomColor(rnd.getInt(0, 10)));
			}
		}

		void update() override
		{	
			for (int i = 0; i < 10; i++)
			{
				houses[i].draw();
			}
		}
	};
}

int main(void)
{
	jm::Example().run();

	return 0;
}
```

<br>

## 🙋 Q2. 집들, 창문들이 각각 서로 다른 속도로 회전하게 해보자.

<iframe width="816" height="458" src="https://www.youtube.com/embed/ZP-i3QWhUBI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- `rotate(house_angle * time);` : 계속해서 회전할 수 있게.
  - time은 Update 함수 안에서 계속 업뎃
    - `houses[i].time += getTimeStep();`

```cpp
#include "Game2D.h"
#include "Examples/PrimitivesGallery.h"
#include "RandomNumberGenerator.h"

namespace jm
{
	class House
	{
	private:
		RGB roof_color;
		RGB wall_color;
		RGB window_color;
		vec2 pos;
		float house_angle = 0.0f;
		float window_angle = 0.0f;

	public:
		House()
			: roof_color(Colors::red), pos(0.0f,0.0f), house_angle(0.0f), window_angle(0.0f), wall_color(Colors::yellow), window_color(Colors::skyblue)
		{}

		float time = 0.0f;

		RGB randomColor(int i)      // white는 뺐음. 안그려진 것처럼 보여서..!
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

		void setPos(const vec2& _pos)
		{
			pos = _pos;
		}

		void setHouseAngle(const float& _house_angle)  // 추가. 회전각은 랜덤 float값으로 할 것.
		{
			house_angle = _house_angle;
		}

		void setWindowAngle(const float& _window_angle) // 추가. 회전각은 랜덤 float값으로 할 것.
		{
			window_angle = _window_angle;
		}

		void setWallColor(const RGB& _wall_color)
		{
			wall_color = _wall_color;
		}

		void setWindowColor(const RGB& _window_color)
		{
			window_color = _window_color;
		}

		void setRoofColor(const RGB& _roof_color)
		{
			roof_color = _roof_color;
		}

		void draw()
		{
			beginTransformation();
			{
				translate(pos);
				rotate(house_angle * time);     // 이걸 주석처리하면 창문만 회전한다.
				// wall
				drawFilledBox(wall_color, 0.2f, 0.2f);

				// roof
				drawFilledTriangle(roof_color, { -0.13f, 0.1f }, { 0.13f, 0.1f }, { 0.0f, 0.2f });
				drawWiredTriangle(roof_color, { -0.13f, 0.1f }, { 0.13f, 0.1f }, { 0.0f, 0.2f });

				// window
				rotate(window_angle * time);   // 이걸 주석처리하면 집 구성 요소들 동일하게 모두 회전
				drawFilledBox(window_color, 0.1f, 0.1f);
				drawWiredBox(Colors::gray, 0.1f, 0.1f);
				drawLine(Colors::gray, { 0.0f, -0.05f }, Colors::gray, { 0.0f, 0.05f });
				drawLine(Colors::gray, { -0.05f, 0.0f }, Colors::gray, { 0.05f, 0.0f });

			}
			endTransformation();
		}
	};

	class Example : public Game2D
	{
	public:

		House houses[10];

		Example()
			:Game2D()
		{
			RandomNumberGenerator rnd;

			for (int i = 0; i < 10; i++)
			{
				houses[i].setPos(vec2(-1.3f + 0.3f * float(i), rnd.getFloat(-0.5f, 0.5f)));
				houses[i].setWallColor(houses[i].randomColor(rnd.getInt(0, 9)));
				houses[i].setRoofColor(houses[i].randomColor(rnd.getInt(0, 9)));
				houses[i].setWindowColor(houses[i].randomColor(rnd.getInt(0, 9)));
				houses[i].setHouseAngle(rnd.getFloat(30.0f, 180.0f));   // (30 ~ 180도 중 랜덤한 값 * time()  으로 회전하게 된다.
				houses[i].setWindowAngle(rnd.getFloat(30.0f, 180.0f));
			}
		}

		void update() override
		{	
			for (int i = 0; i < 10; i++)
			{
				houses[i].time **+=** getTimeStep();
				houses[i].draw();
			}
		}
	};
}

int main(void)
{
	jm::Example().run();
	
	return 0;
}
```

<br>

## 🙋 Q3. 상속을 이용해 동그란 창문을 가진 집 그리기

![image](https://user-images.githubusercontent.com/42318591/84809974-a70b7780-b045-11ea-90ba-09cbc1cf23e8.png){: width="50%" height="50%"}{: .align-center}

```cpp
#include "Game2D.h"
#include "Examples/PrimitivesGallery.h"
#include "RandomNumberGenerator.h"

namespace jm
{
	class Window
	{
	private:
		RGB window_color;
		float window_angle = 0.0f;

	public:
		Window()
			: window_color(Colors::skyblue), window_angle(0.0f)
		{}

		void setWindowColor(const RGB& _window_color)
		{
			window_color = _window_color;
		}

		void setWindowAngle(const float& _window_angle)
		{
			window_angle = _window_angle;
		}

		void windowDraw()
		{
			//rotate(window_angle * time);
			drawFilledCircle(window_color, 0.05f);        // 동그란 창문
			drawWiredCircle(Colors::gray, 0.05f);
			drawLine(Colors::gray, { 0.0f, -0.05f }, Colors::gray, { 0.0f, 0.05f });
			drawLine(Colors::gray, { -0.05f, 0.0f }, Colors::gray, { 0.05f, 0.0f });
		}
	};

	class House : public Window    // Window 클래스를 상속받아 Window클래스의 함수들에 접근 가능.
	{
	private:
		RGB roof_color;
		RGB wall_color;
		vec2 pos;
		float house_angle = 0.0f;

	public:
		House()
			: roof_color(Colors::red), pos(0.0f,0.0f), house_angle(0.0f), wall_color(Colors::yellow)
		{}

		float time = 0.0f;

		RGB randomColor(int i)
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

		void setPos(const vec2& _pos)
		{
			pos = _pos;
		}

		void setHouseAngle(const float& _house_angle)
		{
			house_angle = _house_angle;
		}

		void setWallColor(const RGB& _wall_color)
		{
			wall_color = _wall_color;
		}

		void setRoofColor(const RGB& _roof_color)
		{
			roof_color = _roof_color;
		}

		void draw()
		{
			beginTransformation();
			{
				translate(pos);
				//rotate(house_angle * time);

				drawFilledBox(wall_color, 0.2f, 0.2f);

				drawFilledTriangle(roof_color, { -0.13f, 0.1f }, { 0.13f, 0.1f }, { 0.0f, 0.2f });
				drawWiredTriangle(roof_color, { -0.13f, 0.1f }, { 0.13f, 0.1f }, { 0.0f, 0.2f });

				windowDraw();

			}
			endTransformation();
		}
	};

	class Example : public Game2D
	{
	public:

		House houses[10];

		Example()
			:Game2D()
		{
			RandomNumberGenerator rnd;

			for (int i = 0; i < 10; i++)
			{
				houses[i].setPos(vec2(-1.3f + 0.3f * float(i), rnd.getFloat(-0.5f, 0.5f)));
				houses[i].setWallColor(houses[i].randomColor(rnd.getInt(0, 9)));
				houses[i].setRoofColor(houses[i].randomColor(rnd.getInt(0, 9)));
				houses[i].setWindowColor(houses[i].randomColor(rnd.getInt(0, 9)));
				//houses[i].setHouseAngle(rnd.getFloat(30.0f, 180.0f));
				//houses[i].setWindowAngle(rnd.getFloat(30.0f, 180.0f));
			}
		}

		void update() override
		{	
			for (int i = 0; i < 10; i++)
			{
				//houses[i].time += getTimeStep();
				houses[i].draw();
			}
		}
	};
}

int main(void)
{
	jm::Example().run();
	
	return 0;
}
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}