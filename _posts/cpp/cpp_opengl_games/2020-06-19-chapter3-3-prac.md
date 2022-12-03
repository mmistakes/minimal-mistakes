---
title:  "[C++] 3.3 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics, Math, Physics]

toc: true
toc_sticky: true

date: 2020-06-19
last_modified_at: 2020-06-19
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 3.2 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [3.3 질량-용수철 시스템](https://ansohxxn.github.io/c++%20games/chapter3-3/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning}

<br>

## 🙋 Q1. 스프링과 물체 하나 더 추가해보기

> 🟡*rb0*은 고정이며 🔵*rb1*,🔵*rb1* 질점이 2개 있는 형태

![image](https://user-images.githubusercontent.com/42318591/85251341-1218dc00-b494-11ea-9243-84b01896a85b.png){: width="30%" height="40%"}{: .align-center}

### 전체 코드

```cpp
#include "Game2D.h"
#include "Examples/PrimitivesGallery.h"
#include "RandomNumberGenerator.h"
#include "RigidCircle.h"
#include <vector>
#include <memory>

namespace jm
{
	class Example : public Game2D
	{
	public:
		RigidCircle rb0, rb1, rb2;

		Example()
			: Game2D()
		{
			reset();
		}

		void reset()
		{
			// Initial position and velocity
			rb0.pos = vec2(0.0f, 0.5f);
			rb0.vel = vec2(0.0f, 0.0f);
			rb0.color = Colors::hotpink;
			rb0.radius = 0.03f;
			rb0.mass = 1.0f;

			rb1.pos = vec2(0.5f, 0.5f);
			rb1.vel = vec2(0.0f, 0.0f);
			rb1.color = Colors::yellow;
			rb1.radius = 0.03f;
			rb1.mass = rb0.mass * std::pow(rb1.radius / rb0.radius, 2.0f);

			rb2.pos = vec2(0.8f, 0.5f);
			rb2.vel = vec2(0.0f, 0.0f);
			rb2.color = Colors::green;
			rb2.radius = 0.03f;
			rb2.mass = rb0.mass * std::pow(rb1.radius / rb0.radius, 2.0f);
		}

		void drawWall()
		{
			setLineWidth(5.0f);
			drawLine(Colors::blue, { -1.0f, -1.0f }, Colors::blue, { 1.0f, -1.0f });
			drawLine(Colors::blue, { 1.0f, -1.0f }, Colors::blue, { 1.0f, 1.0f });
			drawLine(Colors::blue, { -1.0f, -1.0f }, Colors::blue, { -1.0f, 1.0f });
		}

		void update() override
		{
			const float dt = getTimeStep() * 0.4f;
			const float epsilon = 0.5f;

			// physics update (Temporarily disabled)
			//rb0.update(dt);
			//rb1.update(dt);

			// coefficients
			const vec2 gravity(0.0f, -9.8f);
			const float coeff_k = 50.0f;
			const float coeff_d = 10.0f;

			// update rb1 (Note: rb0 is fixed)
			{
				const float l0 = 0.3f;

				// rb0-rb1 spring
				const auto distance = (rb1.pos - rb0.pos).getMagnitude();
				const auto direction = (rb1.pos - rb0.pos) / distance;// unit vector

				// compute stiffness force
				const auto spring_force = direction * -(distance - l0) * coeff_k +
					direction * -(rb1.vel - rb0.vel).getDotProduct(direction) * coeff_d;

				// compute damping force

				const auto accel = gravity + spring_force / rb1.mass;

				rb1.vel += accel * dt;

				// to 'reaction' to rb0 because rb0 is fixed.
			}

			// update rb2
			{
				const float l0 = 0.2f;

				// rb1-rb2 spring
				const auto distance = (rb2.pos - rb1.pos).getMagnitude();
				const auto direction = (rb2.pos - rb1.pos) / distance; // unit vector

				// compute stiffness force
				const auto spring_force = direction * -(distance - l0) * coeff_k +
					direction * -(rb2.vel - rb1.vel).getDotProduct(direction) * coeff_d;

				// compute damping force

				const auto accel = gravity + spring_force / rb2.mass;

				rb2.vel += accel * dt;
				rb1.vel -= spring_force / rb1.mass * dt; // reaction
			}

			// update positions
			rb1.pos += rb1.vel * dt;
			rb2.pos += rb2.vel * dt;

			// draw
			drawWall();

			// spring
			drawLine(Colors::red, rb0.pos, Colors::red, rb1.pos);
			drawLine(Colors::red, rb1.pos, Colors::red, rb2.pos);

			// mass points
			rb0.draw();
			rb1.draw();
			rb2.draw();

			// reset button
			if (isKeyPressedAndReleased(GLFW_KEY_R)) reset();
		}

	};
}

int main(void)
{
	jm::Example().run();

	return 0;
}
```

### 🟡*rb0* 👉🏻 🔵*rb1* 속도 업데이트 (가속도)

```cpp
{
	const float l0 = 0.3f;

	// rb0-rb1 spring
	const auto distance = (rb1.pos - rb0.pos).getMagnitude();
	const auto direction = (rb1.pos - rb0.pos) / distance;// unit vector

	// compute stiffness force
	const auto spring_force = direction * -(distance - l0) * coeff_k + direction * -(rb1.vel - rb0.vel).getDotProduct(direction) * coeff_d;

	// compute damping force

	const auto accel = gravity + spring_force / rb1.mass;

	rb1.vel += accel * dt;

	// to 'reaction' to rb0 because rb0 is fixed.
}
```

- 🟡*rb0*은 고정이므로 속도를 업데이트 하지 않는다. 
- 가속도 = 중력가속도 + 스프링의총힘/질량
- *const float l0 = 0.3f;*
  - 🟡*rb0* 👉🏻 🔵*rb1* 의 고정 길이
- distance :  l rb1.pos - rb0.pos l
- direction : ***rb0 → rb1***
- `rb1의 가속도`
  - `accel` = gravity + spring_force / rb1.mass;
    1. 중력가속도
    2. spring_force / rb1의 질량
      - rb1이 spring_force로부터 받을 가속도

### 🔵*rb1* 👉🏻 🔵*rb2* 속도 업데이트 (가속도)

```cpp
{
	const float l0 = 0.2f; // 원래 길이

	// rb1-rb2 spring
	const auto distance = (rb2.pos - rb1.pos).getMagnitude();
	const auto direction = (rb2.pos - rb1.pos) / distance; // unit vector

	// compute stiffness force
	const auto spring_force = direction * -(distance - l0) * coeff_k + direction * -(rb2.vel - rb1.vel).getDotProduct(direction) * coeff_d;

	// compute damping force

	const auto accel = gravity + spring_force / rb2.mass;

	rb2.vel += accel * dt;
	rb1.vel -= spring_force / rb1.mass * dt; // reaction
}
```

- 🔵*rb2* 의 `가속도`
  ```cpp
  const auto accel = gravity + spring_force / rb2.mass;
  rb2.vel += accel * dt;
  ```
  - distance : l rb2.pos - rb1.pos l
  - direction : ***rb1 → rb2***
  - `accel` = gravity + spring_force / rb2.mass*dt;
    1. 중력가속도
    2. rb2이 spring_force로부터 받을 가속도
      - spring_force / rb2의 질량
      - rb1 → rb2
      - rb1 입장에서의 rb2의 상대속도 : ***rb1.vel - rb0.vel***
        
- 🔵*rb1* 의 `가속도`
  ```cpp
  rb1.vel -= spring_force / rb1.mass * dt; // reaction
  ```
  - rb1.vel의 중력 가속도는 🟡*rb0*👉🏻🔵*rb1* 에서 반영 했으니까 언급 X
  - 🔵*rb1*👉🏻🔵*rb2* 의 스프링이 원래대로 돌아가는 힘은 🟡*rb0*👉🏻🔵*rb1*의 스프링이 원래대로 돌아가는 힘에 영향을 받은 🔵*rb1*의 <u>가속도를 줄인다.</u>
      - rb1.vel `-=` spring_force / rb1.mass * dt; 
      - <u>그래서 이렇게 빼주어야 한다.</u>
    - 이말은 즉 rb1의 속도 변화 폭이 점점 줄어든다는 것.
      - ~~이 부분 이해가 빠삭하게 되는건 아님.. 아리까리 😥😭~~

<br>

## 🙋 Q2. 바둑판처럼 스프링을 촘촘하게 연결해보기.
*게임 내에서 플레이어의 옷감을 표현하는데에 많이 쓰이는 기법이다.  옷이 휘날린다던가 이럴 때!*

<iframe width="1000" height="563" src="https://www.youtube.com/embed/CwMZETZaWNY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 아이디어

![image](https://user-images.githubusercontent.com/42318591/85253429-198eb400-b499-11ea-9b9e-c34517cd1b3b.png){: width="80%" height="80%"}{: .align-center}

- <u>여러개의 질점</u>과 <u>여러개의 스프링</u>이 엮여 있을 때
  - > 여러가지 힘을 다 합쳐주면 된다. 
    - 벡터 x_0이 받는 힘들을 다 더한후 질량으로 나누어 가속도로서 속도에 더해주면 된다.
      - *x_0이 받는 힘 = x_1 로부터 받는 힘 + x_2 로부터 받는 힘 + x_3 로부터 받는 힘*


![image](https://user-images.githubusercontent.com/42318591/85254319-fb29b800-b49a-11ea-98d9-468c3b2bf7a5.png){: width="70%" height="70%"}{: .align-center}

- `row`, `col`을 설정해서 `row × col`개수의 질점을 만들 것이다.
- 🟡질점 2개는 고정되어 있다.
- 나머지 🔵질점들은 <u>양 옆(형제)</u>, <u>위에 있는(부모)</u> 질점들로부터 가속도 영향을 받는다.
  - 자신보다 아래에 있는 자식 질점들로부터는 가속도 영향을 받지 않는다.
    - 질점을 잡고 늘어지는 외부의 힘 중력으로부터 질점을 원래대로 끌어 올리는 스프링 힘은 <u>부모 또는 형제 질점이 자식 질점에게 가하는 것이므로.</u>
    - 따라서 자식 질점으로부터는 스프링의 힘을 받지 않음. 
  - 위 사진은 각 질점들이 부모, 형제 질점들과 연결짓는 경우의 수 정리

![image](https://user-images.githubusercontent.com/42318591/85254386-27ddcf80-b49b-11ea-815d-0f94ac7484a0.png){: width="70%" height="70%"}{: .align-center}

- 질점들끼리 스프링 연결 

### 전체 코드

```cpp
#include "Game2D.h"
#include "Examples/PrimitivesGallery.h"
#include "RandomNumberGenerator.h"
#include "RigidCircle.h"
#include <vector>
#include <memory>

namespace jm
{
	using namespace std;
	class Example : public Game2D
	{
	public:
		vector<RigidCircle *> circles;
		const float l0 = 0.3f;
		int row = 6;   // <- 바꿔서도 실행 해보자
		int col = 4;   // <- 바꿔서도 실행 보자

		Example()
			: Game2D()
		{
			reset();
		}

		void reset()
		{
			vec2 pos = vec2(-0.5f, 0.75f);
			vec2 vel = vec2(0.0f, 0.0f);
			RGB color = Colors::blue;
			float radius = 0.03f;
			float mass = 1.0f;

			// Initial position and velocity
			for (int i = 0; i < row; i++)
			{
				pos.y = 0.75f - i * 1.0f / (row - 1);
				for (int j = 0; j < col; j++)
				{
					pos.x = -0.5f + j * 1.0f / (col - 1);

					if ((i == 0 && j == 0) || (i == 0 && j == col - 1))
						color = Colors::yellow;
					else
						color = Colors::blue;

					circles.push_back(new RigidCircle(pos, vel, color, radius, mass));

					if (i != 0) mass = circles[0]->mass * std::pow(circles[0]->radius / circles[i]->radius, 2);
				}
			}
		}

		void drawWall()
		{
			setLineWidth(5.0f);
			drawLine(Colors::blue, { -1.0f, -1.0f }, Colors::blue, { 1.0f, -1.0f });
			drawLine(Colors::blue, { 1.0f, -1.0f }, Colors::blue, { 1.0f, 1.0f });
			drawLine(Colors::blue, { -1.0f, -1.0f }, Colors::blue, { -1.0f, 1.0f });
		}

		void update() override
		{
			const float dt = getTimeStep() * 0.4f;
			const float epsilon = 0.5f;

			// coefficients
			const vec2 gravity(0.0f, -9.8f);
			const float coeff_k = 200.0f;
			const float coeff_d = 5.0f;

			// vel update
			float distance;
			vec2 direction;
			vec2 rel_vel;
			vec2 spring_force;
			vec2 total_spring_force;
			vec2 accel;
			int me, myDirectParent;
			int flag = 1;

			for (int i = 0; i < row; i++)
			{
				for (int j = 0; j < col; j++)
				{
					total_spring_force = vec2(0.0f, 0.0f);
					if (i == 0)
					{
						if (j == 0 || j == col - 1)
							continue;
						else
						{
							me = i * col + j;

							flag = -1;
							for (int k = 0; k < 2; k++) // 형제 2개
							{
								distance = (circles[me]->pos - circles[me + flag]->pos).getMagnitude();
								direction = (circles[me]->pos - circles[me + flag]->pos) / distance;
								rel_vel = circles[me]->vel - circles[me + flag]->vel;
								spring_force = direction * -(distance - l0) * coeff_k + direction * -rel_vel.getDotProduct(direction) * coeff_d;
								if(me + flag != 0 && me + flag != col - 1)
									circles[me + flag]->vel -= spring_force / circles[me + flag]->mass * dt;
								
								total_spring_force += spring_force;

								flag = 1;
							}
						}
					}
					else if (j == 0 || j == col - 1)
					{
						me = i * col + j;
						myDirectParent = (i - 1) * col + j;

						if (j == 0)
							flag = 1;
						else if (j == col - 1)
							flag = -1;

						for (int k = 0; k < 2; k++) // 부모 2개
						{
							distance = (circles[me]->pos - circles[myDirectParent + flag * k]->pos).getMagnitude();
							direction = (circles[me]->pos - circles[myDirectParent + flag * k]->pos) / distance;
							rel_vel = circles[me]->vel - circles[myDirectParent + flag * k]->vel;
							spring_force = direction * -(distance - l0) * coeff_k + direction * -rel_vel.getDotProduct(direction) * coeff_d;
							if (myDirectParent + flag * k != 0 && myDirectParent + flag * k != col - 1)
								circles[myDirectParent + flag * k]->vel -= spring_force / circles[myDirectParent + flag * k]->mass * dt;

							total_spring_force += spring_force;
						}
						{	// 형제 1개
							distance = (circles[me]->pos - circles[me + flag]->pos).getMagnitude();
							direction = (circles[me]->pos - circles[me + flag]->pos) / distance;
							rel_vel = circles[me]->vel - circles[me + flag]->vel;
							spring_force = direction * -(distance - l0) * coeff_k + direction * -rel_vel.getDotProduct(direction) * coeff_d;
							if (me + flag != 0 && me + flag != col - 1)
								circles[me + flag]->vel -= spring_force / circles[me + flag]->mass * dt;

							total_spring_force += spring_force;
						}
					}
					else
					{
						me = i * col + j;
						myDirectParent = (i - 1) * col + j;

						flag = -1;
						for (int k = 0; k < 3; k++) // 부모 3개
						{
							distance = (circles[me]->pos - circles[myDirectParent + flag]->pos).getMagnitude();
							direction = (circles[me]->pos - circles[myDirectParent + flag]->pos) / distance;
							rel_vel = circles[me]->vel - circles[myDirectParent + flag]->vel;
							spring_force = direction * -(distance - l0) * coeff_k + direction * -rel_vel.getDotProduct(direction) * coeff_d;
							if (myDirectParent + flag != 0 && myDirectParent + flag  != col - 1)
								circles[myDirectParent + flag]->vel -= spring_force / circles[myDirectParent + flag]->mass * dt;

							total_spring_force += spring_force;
							
							flag++;
						}
						flag = -1;
					}
					accel = gravity + total_spring_force / circles[me]->mass;
					circles[me]->vel += accel * dt;
				}
			}
		
			// update positions
			for (int i = 0; i < row * col; i++)
				circles[i]->pos += circles[i]->vel * dt;

			// draw
			drawWall();

			// draw spring
			for (int i = 0; i < row; i++)	
				for (int j = 0; j < col - 1; j++)
					drawLine(Colors::gray, circles[i * col + j]->pos, Colors::gray, circles[i * col + j + 1]->pos);
			
			for (int i = 0; i < row - 1; i++)
				for (int j = 0; j < col; j++)
					drawLine(Colors::gray, circles[i * col + j]->pos, Colors::gray, circles[(i + 1) * col + j]->pos);

			for (int i = 0; i < row - 1; i++)
				for (int j = 0; j < col - 1; j++)
				{
					drawLine(Colors::gray, circles[i * col + j + 1]->pos, Colors::gray, circles[(i + 1) * col + j]->pos);
					drawLine(Colors::gray, circles[i * col + j]->pos, Colors::gray, circles[(i + 1) * col + j + 1]->pos);
				}				

			// draw circles
			for (int i = 0; i < row * col; i++)
				circles[i]->draw();

			// reset button
			if (isKeyPressedAndReleased(GLFW_KEY_R))
			{
				for (int i = 0; i < row * col; i++)
					delete circles[i];
				circles.clear();
				reset();
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

> 각 🔵의 부모 질점과 형제 질점과의 스프링 힘을 `total_spring_force` 에 합해 나간다.

- *if(i != 0)*
  - 첫번째 줄
  - *if (j == 0 || j == col - 1)*
    - 양 옆 끝
    - **고정된 🟡가 있는 곳**
    - *continue* 속도를 업뎃 하지 않는다.
  - *else*
    - **고정된 🟡가 아닌 것들은 다 🔵**
    - 양 옆 `형제🔵🔵2개` 질점과의 스프링 힘 계산
    - 첫번째 줄의 🔵들은 부모 없고 형제만 2개
- *else if (j == 0 || j == col - 1)*
  - 첫번째 줄 제외한 그 모든 줄에서의 양 옆 끝
  - `부모🔵🔵2개`, `형제🔵1개`
- *else*
  - 첫번째 줄도 아니고 양 옆 끝도 아닌 경우
  - `부모🔵🔵🔵3개`, `형제🔵🔵2개`
- 가속도와 속도 업데이트
  ```cpp
  accel = gravity + total_spring_force / circles[me]->mass;
  circles[me]->vel += accel * dt;
  ```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}