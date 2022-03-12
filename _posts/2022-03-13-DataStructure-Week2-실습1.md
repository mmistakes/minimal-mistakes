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

- 파일로부터 성적을 읽어 명령을 처리  
  ![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80%EC%8B%A4%EC%8A%B5-2%EC%9E%A5-%EC%8B%A4%EC%8A%B51.png?raw=true)

- 명령어
  성적 출력(P), 성적 찾기(S), 성적 수정(C), 파일에 저장(W)

> **실행 예**

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
