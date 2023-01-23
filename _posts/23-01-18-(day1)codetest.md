---
layout: single
title: " 코테(mission2) "
categories: algorithm 
tag: [algorithm]
---
# day1 - code test

지갑 크기 구하기(= 최대 최소값 구하기)

지갑에 들어가는 카드를 눕힐 수 있어 가로 세로 상관없이
긴변 중 가장 긴 변, 짧은 변중 가장 긴 변 을 구하라

```js
const sizes = [[60, 50], [30, 70], [60, 30], [80, 40]]
function solution(sizes)
biggerSideMax = 0;											// 가상의 최대 최소값 설정
smallSideMax = 0;
for(let i=0; i<sizes.length; i++){							//반복문으로 전체 배열 돌리기
 	let fir = sizes[i][0]
    let sec = sizes[i][1]
    
    if(fir > sec){											// 두변 비교
            if(biggerSizemax < fir) biggerSizemax = fir; 	//큰 변 중 큰 변을 fir에 재할당 하고 다시 실행됨
            if(smallSizemax < sec)smallSizemax = sec;		//큰 변중 작은 변중의 큰변을 할당
        }else{ 												//반대로 실행
            if(biggerSizemax < sec) biggerSizemax = sec;	//
            if(smallSizemax < fir) smallSizemax = fir;
                }
        }													// 그럼 재할당을 반복하며 긴변중 가장긴변	
    return biggerSizemax * smallSizemax;					//작은 변중 가장 긴변이 각 변수(bigger, small)에 할당
    }
```



