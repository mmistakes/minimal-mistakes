---
title:  "[C++] 2.3 연습 문제 풀이" 

categories:
  - C++ games
tags:
  - [Programming, Cpp, OpenGL, Graphics]

toc: true
toc_sticky: true

date: 2020-06-08
last_modified_at: 2020-06-08
---

인프런에 있는 홍정모 교수님의 **홍정모의 게임 만들기 연습 문제 패키지** 강의를 듣고 정리한 필기입니다.😀   
[🌜 공부에 사용된 홍정모 교수님의 코드들 보러가기](https://github.com/jmhong-simulation/GameDevPracticePackage)   
[🌜 [홍정모의 게임 만들기 연습 문제 패키지] 강의 들으러 가기!](https://www.inflearn.com/course/c-2)
{: .notice--warning}

<br>

# 2.3 연습문제

**연습 문제**는 스스로 풀이했습니다. 😀       
해당 챕터 보러가기 🖐 [2.3 다형성으로 유연하게](https://ansohxxn.github.io/c++%20games/chapter2-3/)   
연습 문제 출처 : [홍정모 교수님 블로그](https://blog.naver.com/atelierjpro/221413483005)
{: .notice--warning}


<br>

## 🙋 Q1. 마우스 좌클, 우클에 따라 다른 모양 그리기
- 좌클시 커서 위치에 삼각형 그리고
- 우클시 커서 위치에 원을 그려보자.

<iframe width="851" height="477" src="https://www.youtube.com/embed/lX4-a24gQAQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

```cpp
void update() override
		{
			const vec2 mouse_pos = getCursorPos(true);
			if (isMouseButtonPressed(GLFW_MOUSE_BUTTON_1) == true)
			{
				objs.push_back(GeometricObject::makeTriangle(
					rndColor(rnd.getInt(0, 9)),
					mouse_pos,
					rnd.getFloat(0.01f, 0.25f)));
			}
			if (isMouseButtonPressed(GLFW_MOUSE_BUTTON_2))
			{
				objs.push_back(GeometricObject::makeCircle(
					rndColor(rnd.getInt(0, 9)),
					mouse_pos,
					rnd.getFloat(0.01f, 0.25f)));
			}

			if (!objs.empty())
			{
				for (const auto & obj : objs)
				{
					obj->draw();
				}
			}
		}
```

***

<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}