---
title:  "[C++] 2.2 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics]

toc: true
toc_sticky: true

date: 2020-06-07
last_modified_at: 2020-06-07
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 2.2 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [2.2 상속으로 깔끔하게](https://ansohxxn.github.io/c++%20games/chapter2-2/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning}


<br>

## 🙋 Q1. 다양한 물체들을 랜덤하게 그리고 별을 추가하자.

![image](https://user-images.githubusercontent.com/42318591/84928460-5f4e2400-b109-11ea-90f0-20e1ba7a11da.png){: width="50%" height="50%"}{: .align-center}

- 별,원,세모,네모가 각각 5개씩 총 20개가 그려진다.
- 랜덤한 위치, 랜덤한 크기, 랜덤한 색상으로 그려진다.

### 📜main

```cpp
#include "Game2D.h"
#include "Examples/PrimitivesGallery.h"
#include "RandomNumberGenerator.h"
#include "GeometricObject.h"  // 부모클래스 하나만 상속받아 부모클래스 타입 포인터 하나로 자식 클래스들(별,원,세모,네모) 전부 접근하기
#include <vector>
using namespace std;

namespace jm
{

	class Example : public Game2D
	{
	public:
		RandomNumberGenerator rnd;
		vector <GeometricObject *> objs;    // 부모타입의 포인터를 담는 벡터. 이 곳에 부모 타입 포인터로 참조하여 자식 인스턴스들의 주소를 담을 것이다.  

		Example()
			: Game2D()
		{
			for (int i = 0; i < 5; i++)
			{
				objs.push_back(GeometricObject::makeBox(  // GeometricObject::makeBox -> '네모' 를 <동적할당 + 초기화> 하고 그 주소를 리턴하는 GeometricObject의 static 함수.  부모 타입 포인터로 참조하여 벡터에 넣어준다.
					rndColor(rnd.getInt(0, 9)),
					vec2{ rnd.getFloat(-1.0f ,1.0f), rnd.getFloat(-1.0f, 1.0f) },
					rnd.getFloat(0.01f, 0.25f),   
					rnd.getFloat(0.01f, 0.25f)**)**);

				objs.push_back(GeometricObject::makeStar(  //  GeometricObject::makeStar ->  '별' 를 <동적할당 + 초기화> 하고 그 주소를 리턴하는 GeometricObject의 static 함수.  부모 타입 포인터로 참조하여 벡터에 넣어준다.
					rndColor(rnd.getInt(0, 9)),
					vec2{ rnd.getFloat(-1.0f,1.0f), rnd.getFloat(-1.0f, 1.0f) },
					rnd.getFloat(0.01f, 0.25f),
					rnd.getFloat(0.01f, 0.25f)));

				objs.push_back(GeometricObject::makeCircle(  //  GeometricObject::makeCircle ->  '원' 를 <동적할당 + 초기화> 하고 그 주소를 리턴하는 GeometricObject의 static 함수.  부모 타입 포인터로 참조하여 벡터에 넣어준다.
					rndColor(rnd.getInt(0, 9)),
					vec2{ rnd.getFloat(-1.0f,1.0f), rnd.getFloat(-1.0f,1.0f) },
					rnd.getFloat(0.01f, 0.25f)));

				objs.push_back(GeometricObject::makeTriangle(  //  GeometricObject::makeTriangle ->  '세모' 를 <동적할당 + 초기화> 하고 그 주소를 리턴하는 GeometricObject의 static 함수.  부모 타입 포인터로 참조하여 벡터에 넣어준다.
					rndColor(rnd.getInt(0, 9)),
					vec2{ rnd.getFloat(-1.0f,1.0f), rnd.getFloat(-1.0f,1.0f) },
					rnd.getFloat(0.01f, 0.25f)));
			}
		}

		RGB rndColor(int i)   // 정수를 넣으면 매칭되는 컬러를 리턴해주는 함수
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

		void update() override
		{
			for (const auto & obj : objs)   // 하나의 for문으로 벡터를 돌려 부모 포인터로 자식 객체들을 그린다.
				obj->draw();
		}
	};
}

int main(void)
{
	jm::Example().run();

	return 0;
}
```

### 📜GeometricObject.h

```cpp
#pragma once

#include "Game2D.h"

namespace jm
{
	class GeometricObject
	{
	public:
		vec2 pos;
		RGB  color;

		void init(const RGB & _color, const vec2 & _pos)
		{
			color = _color;
			pos = _pos;
		}

		virtual void drawGeometry() const = 0;

		void draw()
		{
			beginTransformation();
			{
				translate(pos);
				drawGeometry();
			}
			endTransformation();
		}

		static GeometricObject * makeTriangle(const RGB & _color, const vec2 & _pos, const float & _size);  // static 함수라 객체 생성 없이 클래스 이름으로 바로 사용 가능. 구현은 cpp에서.
		static GeometricObject * makeCircle(const RGB & _color, const vec2 & _pos, const float & _size);
		static GeometricObject * makeBox(const RGB & _color, const vec2 & _pos, const float & _width, const float &_height);
		static GeometricObject * makeStar(const RGB & _color, const vec2 & _pos, const float & _os, const float &_is);
	};
}
```

### 📜GeometricObject.cpp

```cpp
#include "Triangle.h"
#include "Circle.h"
#include "Box.h"
#include "Star.h"
#include "GeometricObject.h"

namespace jm
{
	GeometricObject * GeometricObject::makeTriangle(const RGB & _color, const vec2 & _pos, const float & _size)   
	{
		return new Triangle(_color, _pos, _size); // 1. 초기화 하고 2. 생성하고 (동적할당) 3. 주소 리턴 
	}
	GeometricObject * GeometricObject::makeCircle(const RGB & _color, const vec2 & _pos, const float & _size)
	{
		return new Circle(_color, _pos, _size);
	}
	GeometricObject * GeometricObject::makeBox(const RGB & _color, const vec2 & _pos, const float & _width, const float &_height)
	{
		return new Box(_color, _pos, _width, _height);
	}
	GeometricObject * GeometricObject::makeStar(const RGB & _color, const vec2 & _pos, const float & _os, const float &_is)
	{
		return new Star(_color, _pos, _is, _os);
	}
}
```

### 📜Box.h

```cpp
#pragma once

#include "GeometricObject.h"

namespace jm
{
	class Box : public GeometricObject
	{
	public:
		float width, height;

		Box()
		{}

		Box(const RGB & _color, const vec2 & _pos, const float & _width,
			const float &_height)   // 매개변수들 받아 초기화(init함수 호출) 하는 생성자 
		{
			init(_color, _pos, _width, _height);
		}

		void init(const RGB & _color, const vec2 & _pos, const float & _width, 
			const float &_height)
		{
			GeometricObject::init(_color, _pos); // 자식들 모두 동일하게 가지는 멤버들은 부모 초기화 함수로

			width = _width;
			height = _height;
		}

		void drawGeometry() const override
		{
			drawFilledBox(GeometricObject::color, this->width, this->height);
		}
	};
}
```

### 📜Circle.h

```cpp
#pragma once

#include "GeometricObject.h"

namespace jm
{
	class Circle : public GeometricObject
	{
	public:
		float size;

		Circle()
		{}

		Circle(const RGB & _color, const vec2 & _pos, const float & _size) // 매개변수들 받아 초기화(init함수 호출) 하는 생성자 
		{
			init(_color, _pos, _size);
		}

		void init(const RGB & _color, const vec2 & _pos, const float & _size)
		{
			GeometricObject::init(_color, _pos); // 자식들 모두 동일하게 가지는 멤버들은 부모 초기화 함수로
			size = _size;
		}

		void drawGeometry() const override
		{
			drawFilledCircle(color, size);
		}
	};
}
```

### 📜Triangle.h

```cpp
#pragma once

#include "GeometricObject.h"

namespace jm
{
	class Triangle : public GeometricObject
	{
	public:
		float size;

		Triangle()
		{}

		Triangle(const RGB & _color, const vec2 & _pos, const float & _size) // 매개변수들 받아 초기화(init함수 호출) 하는 생성자 
		{
			init(_color, _pos, _size);
		}

		void init(const RGB & _color, const vec2 & _pos, const float & _size)
		{
			GeometricObject::init(_color, _pos); // 자식들 모두 동일하게 가지는 멤버들은 부모 초기화 함수로
			size = _size;
		}

		void drawGeometry() const override
		{
			drawFilledTriangle(color, size);
		}
	};
}
```

### 📜Star.h

```cpp
#pragma once

#include "GeometricObject.h"

namespace jm
{
	class Star : public GeometricObject
	{
	public:
		float os, is;

		Star()
		{}

		Star(const RGB & _color, const vec2 & _pos, const float & _os,  
			const float &_is)  // 매개변수들 받아 초기화(init함수 호출) 하는 생성자 
		{
			init(_color, _pos, _os, _is);
		}

		void init(const RGB & _color, const vec2 & _pos, const float & _os,
			const float &_is)
		{
			GeometricObject::init(_color, _pos); // 자식들 모두 동일하게 가지는 멤버들은 부모 초기화 함수로

			os = _os;
			is = _is;
		}

		void drawGeometry() const override
		{
			drawFilledStar(GeometricObject::color, this->os, this->is);
		}
	};
}
```

<br>

## 🙋 Q2. 모든 물체들이 회전하게 만들기

<iframe width="672" height="377" src="https://www.youtube.com/embed/PkiCoOkD2j8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 📜Geometric.h

```cpp
#pragma once

#include "Game2D.h"

namespace jm
{
	class GeometricObject
	{
	public:
		vec2 pos;
		RGB  color;
		float time = 0.0f;

		void init(const RGB & _color, const vec2 & _pos)
		{
			color = _color;
			pos = _pos;
		}

		virtual void drawGeometry() const = 0;

		void draw(const float& dt)
		{
			beginTransformation();
			{	
				translate(pos);            // 회전 먼저하고 이동 ! 
				rotate(time * 90.0f);
				drawGeometry();
			}
			endTransformation();
			
			time += dt;
		}

		static GeometricObject * makeTriangle(const RGB & _color, const vec2 & _pos, const float & _size);
		static GeometricObject * makeCircle(const RGB & _color, const vec2 & _pos, const float & _size);
		static GeometricObject * makeBox(const RGB & _color, const vec2 & _pos, const float & _width, const float &_height);
		static GeometricObject * makeStar(const RGB & _color, const vec2 & _pos, const float & _os, const float &_is);
	};
}
```

### 📜main

```cpp
void update() override
		{
			for (const auto & obj : objs)
			{
				obj->draw(getTimeStep());
			}
		}
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}