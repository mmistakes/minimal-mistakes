---
published: true
title: "2022-03-13-DataStructure-Week2-실습1"
categories:
  - C
tags:
  - C
toc: true
toc_sticky: true
toc_label: "C"
---

# 학생 성적 관리

파일로부터 성적을 읽어 명령을 처리  
![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EA%B8%B0%EC%B4%88%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%207%EC%9E%A5%20%EC%8B%A4%EC%8A%B5-%EB%AC%B8%EC%A0%9C18.png?raw=true)

> **조건**

- 입력 값은 'Y' 또는 'N'을 포함한 그 외의 문자로, 프로그램에서 요구하는 내용을 실행할지 안할지 선택한다.
- 로또의 번호 범위(LOTTO_MAX)와 로또 1회당 값어치(LOTTO_VALUE) 그리고 로또 1등 당첨금(LOTTO_PRIZE) 상수(#define)으로 설정한다.
- 로또의 번호는 총 4개로, 번호 4개를 맞추었을 경우, 1등 당첨이다. 또한, 모든 번호는 다른 번째의 번호와 중복될 수 있다.
- 로또 번호 4개는 난수 값으로 초기화를 시킨 후, 이에 대응하는 구매자(맞추고자 하는) 번호 4개를 같은 범위로 난수 값을 초기화한다.
- 이후, 대응되는 각 번호끼리 비교하여 같은 값일 경우, 로또 번호 1개를 맞춘 것으로 본다.
- 사용자 번호는 로또 번호를 모두 맞출 때(1등의 당첨될 때)까지 무한적으로 반복하며, 매 반복마다 몇 번째 시도인지, 사용한 (누적)금액이 얼마인지 출력한다.
- 예를 들어, 첫 번째 로또 번호는 첫 번째 구매자 번호하고 대응되며, 두 번째 구매자 번호와는 동일한 값이라고해도 다르게 본다.

> **입력 예**

Y  
N

> **출력 예**

...  
[결과]  
653000원 이득 봤다!ㅎ  
계속하려면 아무 키나...

![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EA%B8%B0%EC%B4%88%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%207%EC%9E%A5%20%EC%8B%A4%EC%8A%B5-%EB%AC%B8%EC%A0%9C18.png?raw=true)

> **Source**

```C++
#include<stdio.h>
#include<stdlib.h>
#include<time.h>

#define LOTTO_MAX 10
#define LOTTO_VALUE 1000
#define LOTTO_PRIZE 10000000

int main(void) {
	srand(time(NULL));
	int num;
	bool flag = true;
	int freq = 0;
	char input = 'A';
	printf("로또를 1등 당첨이 될 떄까지 구매하시겠습니까?\n");
	printf("[Y/N or Other keys] > ");

	scanf("%c", &input);

	if (input == 'Y') {
		while (flag) {
			int a = rand() % LOTTO_MAX,
				b = rand() % LOTTO_MAX,
				c = rand() % LOTTO_MAX,
				d = rand() % LOTTO_MAX,
				e = rand() % LOTTO_MAX,
				f = rand() % LOTTO_MAX,
				g = rand() % LOTTO_MAX,
				h = rand() % LOTTO_MAX;
			freq++;
			num = 0;
			printf("[%d번째 시도] = 사용한 금액 %d원\n", freq, LOTTO_VALUE * freq);
			printf("자동 생성기로 돌린 나의 로또 번호는 %d번, %d번, %d번, %d번이다.\n", a, b, c, d);
			if (a == e && b == f && c == g && d == h) {
				printf("> 총 맞춘 번호는 4개이다. 드디어 1등에 당첨되었다..\n");
				flag = false;
			}
			else {
				if (a == e)
					num++;
				if (b == f)
					num++;
				if (c == g)
					num++;
				if (d == h)
					num++;
				printf("> 총 맞춘 번호는 %d개이다. 아직 1등에 당첨되지 못했다.\n", num);
			}
		}
		printf("\n[결과]\n%d원 이득 봤다.\n", LOTTO_PRIZE - LOTTO_VALUE * freq);
	}
	else
		return 0;

	return 0;
}
```
