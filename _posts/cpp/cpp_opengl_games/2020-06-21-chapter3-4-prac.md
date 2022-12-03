---
title:  "[C++] 3.4 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics]

toc: true
toc_sticky: true

date: 2020-06-21
last_modified_at: 2020-06-21
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 3.2 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [3.4 파티클 시스템](https://ansohxxn.github.io/c++%20games/chapter3-4/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning}

<br>

## 🙋 Q1. 마우스 클릭하는 곳에 파티클 효과 일으키기

<iframe width="478" height="360" src="https://www.youtube.com/embed/oWjqFsp-pjg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

	static const auto gravity = vec2(0.0f, -9.8f);
	const int numOfParticle = 100;

	class Particle
	{
	public:
		
		vec2 pos;
		vec2 vel;

		float rot;
		float angular_velocity;

		RGB  color;

		float age;
		float life;

		bool isDisappeared = false;

		void update(const float & dt)
		{
			const auto acc = gravity; //assumes GA only.

			vel += acc * dt;
			pos += vel * dt;

			rot += angular_velocity * dt;

			// update age.
			age += dt;

			if (life < age)
				isDisappeared = true;
			// update color (blend with background color)
		}
	};

	class ParticleSystem
	{
	public:
		vector<Particle> particles;
		vec2 startAtMousePos;
		bool allDisapeared = false;

		RandomNumberGenerator rn;

		ParticleSystem(vec2 _startAtMousePos)
		{
			startAtMousePos = _startAtMousePos;
			reset();
		}

		auto getRandomUnitVector()
		{
			const float theta = rn.getFloat(0.0f, 3.141592f * 2.0f); // 0.0 ~ 2pi

			return vec2{cos(theta), -sin(theta)};
		}

		auto getRandomColor()
		{
			return RGB{ rn.getFloat(0.0f, 1.0f), rn.getFloat(0.0f, 1.0f), rn.getFloat(0.0f, 1.0f) };
		}

		void reset()
		{
			particles.clear();

			// initialize particles
			for (int i = 0; i < numOfParticle; ++i)
			{
				Particle new_particle;
				new_particle.pos = vec2(startAtMousePos) + getRandomUnitVector() * rn.getFloat(0.001f, 0.03f);
				new_particle.vel = getRandomUnitVector() * rn.getFloat(0.01f, 2.0f);
				new_particle.rot = rn.getFloat(0.01f, 2.0f * 3.141592f) * 360.0f;
				new_particle.angular_velocity = rn.getFloat(-1.0f, 1.0f) * 360.0f * 4.0f;
				new_particle.color = getRandomColor();
				new_particle.age = 0.0f;
				new_particle.life = rn.getFloat(0.1f, 0.5f);

				particles.push_back(new_particle);
			}
		}

		void update(const float & dt)
		{
			int numOfDisappeared = 0;
			for (auto & pt : particles)
			{
				pt.update(dt);
				if (pt.isDisappeared == true)
				{
					numOfDisappeared++;
				}
			}
			if (numOfDisappeared == numOfParticle)
				allDisapeared = true;
		}

		void draw()
		{
			beginTransformation();

			for (const auto & pt : particles)
			{
				if (pt.life < pt.age) continue;	// dead

				const float color_alpha = 1.0f - pt.age / pt.life;

				const RGB blended_color = { pt.color.r * color_alpha + 1.0f * (1.0f - color_alpha),
					pt.color.g * color_alpha + 1.0f * (1.0f - color_alpha),
					pt.color.b * color_alpha + 1.0f * (1.0f - color_alpha) };

				//drawPoint(blended_color, pt.pos, 3.0f);
				beginTransformation();
				translate(pt.pos);
				rotate(pt.rot);
				drawFilledStar(blended_color, 0.03f, 0.01f);
				endTransformation();
			}

			endTransformation();
		}
	};

	class Example : public Game2D
	{
	public:
		vector <ParticleSystem *> ps;

		Example()
			: Game2D()
		{}

		void update() override
		{
			const vec2 mouse_pos = getCursorPos(true);
			if (isMouseButtonPressedAndReleased(GLFW_MOUSE_BUTTON_1))
			{
				ps.push_back(new ParticleSystem(mouse_pos));
			}

			const float dt = getTimeStep() * 0.4f;

			if (!empty(ps))
			{
				for (int i = 0; i < ps.size(); i++)
				{
					if (ps[i]->allDisapeared == true)
					{
						delete ps[i];
						ps.erase(ps.begin() + i);
						continue;
					}
					ps[i]->update(dt);
					ps[i]->draw();
				}
			}

			printf("%d \n", ps.size());

			// reset button
			if (isKeyPressedAndReleased(GLFW_KEY_R))
			{
				if (!empty(ps))
				{
					for (int i = 0; i < ps.size(); i++)
						delete ps[i];
					ps.clear();
				}		
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

- const int numOfParticle = 100
    - 1000개로 하면 너무 렉걸리길래 100개로 함

### 📜`class Particle`
- *bool `isDisappeared` = false;*
  - 파티클 입자 객체가 사라졌는지 체크할 bool 타입 변수
  - 기본 값은 false
  - if (life < age)
    - 파티클 입자 객체의 수명이 다하면 이 입자 객체의 isDisappeared 를 true 로 바꾼다.

### 📜`class ParticleSystem`
- **변수**
  - *vector\<Particle> `particles`;*
    - 파티클 `Particle` 입자 객체들을 모아둔 벡터
  - *vec2 `startAtMousePos`;*
    - 마우스 클릭한 위치를 저장할 vec2 객체 생성
    - 마우스 클릭한 위치에 `ParticleSystem`을 생성할 것. 
  - *bool `allDisapeared` = false*
    - 이 파티클 시스템 내의 파티클 입자들이 모두 수명을 다해 사라졌는지 체크
    - 즉 파티클 입자 객체 벡터 `particles`의 모든 원소(`Particle`)들이 `isDisappeared` = ture 일 때 `allDisapeared` 은 true가 된다.
- **생성자** 
  - *ParticleSystem(vec2 _startAtMousePos)*
    - `startAtMousePos` 변수를 초기화함.
      - Game2D 상속 클래스에서 클릭한 마우스 위치를 받아와 `ParticleSystem`객체를 생성할거고 생성자로 `ParticleSystem`객체의  `startAtMousePos` 변수 값을 초기화할 것
- **함수**    
  - *void reset()*
    - new_particle.pos = vec2(`startAtMousePos`) + getRandomUnitVector() * rn.getFloat(0.001f, 0.03f);
      - 파티클 입자들은 모두 공통적으로 `startAtMousePos` 를 시작점으로 각각 여기서 랜덤한 방향, 랜덤한 거를 초기 위치로 가질 것.
  - *void update(const float & dt)*
    - 이 update함수는 `class Example` 의 *void update() override* 안 에서 매 프레임마다 실행된다.
    - *int `numOfDisappeared` = 0;*
      - 해당 파티클 시스템 내에 사라진 파티클 입자 수
      - 함수 내에서만 살아있는 지역 변수
    - *for (auto & pt : particles)*
      - 매 프레임마다 파티클 시스템의 파티클 입자 벡터 원소 전부 for문 돌며 수명이 다한 입자 수를 센다.
      - *pt.isDisappeared == true* 이면 `numOfDisappeared` 을 더해나간다.
      - *if (numOfDisappeared == numOfParticle)*
        - 한 파티클 시스템 당 파티클 입자의 총 개수와 (=`numOfParticle`) 한 파티클 시스템 당 사라진 파티클 입자의 총 개수 (=`numOfDisappeared`)가 같다면
        - allDisapeared = true;
          - 이 파티클 시스템의 모든 파티클 입자들은 사라졌다고 판단하여 true로 바꿔준다.

### 📜`class Example`
- *vector \<ParticleSystem *> `ps`;*
  - 클릭할때마다 파티클 시스템이 생성되야 하니 파티클 시스템 벡터 ps를 생성
  - 파티클 입자들이 전부 수명이 다해버린 파티클 시스템은 delete 시킬거라 ParicleSystem 포인터 벡터로 설정했다.
    - 생성자에 `ParticleSystem`의 reset 함수를 빼버렸다.
      - Example 객체 생성하자마자 파티클 시스템이 생성되는게 아니라 마우스 클릭할때 생겨야하므로
- *void update() override*
  - *const vec2 `mouse_pos` = getCursorPos(true);*
    - 매 프레임마다 `mouse_pos`에 마우스 현재 위치를 리턴 받는다.
  - 마우스 좌클 하면
    - *ps.push_back(new ParticleSystem(mouse_pos));*
      - 파티클 시스템을 동적으로 생성하여 그 포인터를 파티클 시스템 벡터에 삽입한다.
      - 마우스 좌클한 그 위치를 생성자 매개변수로 넘긴다. 그 위치에서 파티클시스템이 그려질 수 있게끔
  - *if (!empty(ps))*
    - 비어있으면 포인터가 아무것도 없다는거고 그런 상태에서 delete 하거나 간접 참조 하면 런타임 에러. 이를 방지 !
    - for문 돌면서 파티클 시스템 포인터 벡터 순회
      - *if (ps[i]->allDisapeared == true)*
        - 파티클 입자가 모두 사라진 파티클 시스템이라면
        - *delete ps[i];*
          - 파티클 시스템 없액고
        - *ps.erase(ps.begin() + i);*
          - 없앤 자리도 없애고 땡긴다.
        - *continue;*
          - 삭제했으니 아래 update, draw과정은 건너 뛰어야함 

<br>

## 🙋 Q2. 물이 뿜어져 나오듯이 지속적으로 파티클이 생성되도록

<iframe width="478" height="360" src="https://www.youtube.com/embed/qz44kyt3j8I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> 수명이 다해 죽은 파티클 자리에 새로운 파티클을 넣는식으로 효율적으로 벡터 관리하기

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

	static const auto gravity = vec2(0.0f, -9.8f);

	class Particle
	{
	public:
		vec2 pos;
		vec2 vel;

		float rot;
		float angular_velocity;

		RGB  color;

		float age;
		float life;

		void update(const float & dt)
		{
			const auto acc = gravity; //assumes GA only.

			vel += acc * dt;
			pos += vel * dt;

			rot += angular_velocity * dt;

			// update age.
			age += dt;

			// update color (blend with background color)
		}
	};

	class ParticleSystem
	{
	public:
		vector<Particle *> particles;

		RandomNumberGenerator rn;

		ParticleSystem()
		{
			reset();
		}

		auto getRandomUnitVector()
		{
			const float theta = rn.getFloat(0.0f, 3.141592f * 2.0f); // 0.0 ~ 2pi

			return vec2{ cos(theta), -sin(theta) };
		}

		auto getRandomColor()
		{
			return RGB{ rn.getFloat(0.0f, 1.0f), rn.getFloat(0.0f, 1.0f), rn.getFloat(0.0f, 1.0f) };
		}

		void init(Particle * p)
		{
			p->pos = vec2(0.0f, 0.5f) + getRandomUnitVector() * rn.getFloat(0.001f, 0.03f);
			p->vel = getRandomUnitVector() * rn.getFloat(0.01f, 2.0f);
			p->rot = rn.getFloat(0.01f, 2.0f * 3.141592f) * 360.0f;
			p->angular_velocity = rn.getFloat(-1.0f, 1.0f) * 360.0f * 4.0f;
			p->color = getRandomColor();
			p->age = 0.0f;
			p->life = rn.getFloat(0.1f, 2.0f);
		}

		void reset()
		{
			particles.clear();

			// initialize particles
			for (int i = 0; i < 1000; ++i)
			{
				Particle * new_particle = new Particle;
				init(new_particle);

				particles.push_back(new_particle);
			}
		}

		void update(const float & dt)
		{
			for (int i = 0; i < particles.size(); i++)
			{
				if (particles[i]->life < particles[i]->age)
				{
					delete particles[i];
					particles.erase(particles.begin() + i);
					
					particles.insert(particles.begin() + i, new Particle);
					init(particles[i]);
				}
				particles[i]->update(dt);
			}
		}

		void draw()
		{
			beginTransformation();

			for (const auto & pt : particles)
			{
				if (pt->life < pt->age) continue;	// dead

				const float color_alpha = 1.0f - pt->age / pt->life;

				const RGB blended_color = { pt->color.r * color_alpha + 1.0f * (1.0f - color_alpha),
					pt->color.g * color_alpha + 1.0f * (1.0f - color_alpha),
					pt->color.b * color_alpha + 1.0f * (1.0f - color_alpha) };

				//drawPoint(blended_color, pt.pos, 3.0f);
				beginTransformation();
				translate(pt->pos);
				rotate(pt->rot);
				drawFilledStar(blended_color, 0.03f, 0.01f);
				endTransformation();
			}

			endTransformation();
		}
	};

	class Example : public Game2D
	{
	public:
		ParticleSystem ps;

		Example()
			: Game2D()
		{
			reset();
		}

		void reset()
		{
			ps.reset();
		}

		void update() override
		{
			const float dt = getTimeStep() * 0.4f;

			ps.update(dt);

			ps.draw();

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

- 파티클 시스템은 1개만 있으면 된다.
  - 수명이 다한 파티클 입자는 delete하고 그 자리에 그대로 새로운 파티클 입자를 생성해 삽입하여 파티클 입자가 지속적으로 생성되는 것처럼 보이게 할 것

- `class ParticleSystem`
  - *vector\<Particle *> `particles`;*
    - 파티클 입자들은 delete되고 생성되고를 반복할거라서 Particle * 포인터 타입
  - *void init(Particle * p)*
    - 파티클 입자의 포인터를 넘겨 받아 이 포인터로 간접참조하여 파티클의 멤버들을 초기화 할 것.
  - *void update(const float & dt)*
    - 이 update함수는 `class Example` 의 void update() override 에서 매 프레임마다 실행된다.
    - *for (int i = 0; i < particles.size(); i++)*
      - 매 프레임마다 파티클 입자 벡터 전체를 순회
      - *if (particles[i]->life < particles[i]->age)*
        - 수명이 다한 파티클이라면
        - *delete particles[i];*
        - *particles.erase(particles.begin() + i);*
          - 삭제 해주고
        - *particles.insert(particles.begin() + i, new Particle);*				
        - *init(particles[i]);*
          - 그 자리에 새로운 파티클을 삽입한다.
- `class Example`
    - ParticleSystem ps;
        - 파티클 시스템 객체는 하나만 있으면 됨.

<br>

## 🙋 Q3. 공 위에 파티클을 뿌릴 경우 물체와의 충돌을 넣어보자. (아직 풀이 X)

> 파티클들이 공을 뚫고 가는게 아니라 공에 부딪쳐서 튕겨 나오도록

<br>

## 🙋 Q4. 시간에 따라 별이 점점 더 커지다가 빵터지게 만들어 보자. (아직 풀이 X)

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}