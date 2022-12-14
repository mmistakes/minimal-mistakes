---
layout: single
title:  "IU 콘의 보드게임(프로그래머스 Lv5)"
categories : java
tag : [프로그래머스 Lv5]
search: true #false로 주면 검색해도 안나온다.
---

![문제1](../../images/2022-12-14-IU_and_boardgame/문제1.png){: width="100%" height="100%"}

![문제2](../../images/2022-12-14-IU_and_boardgame/문제2.png){: width="100%" height="100%"}

![문제3](../../images/2022-12-14-IU_and_boardgame/문제3.png){: width="100%" height="100%"}

```java
import java.util.*;
class Solution 
{
    int v_length;    
    public int solution(int n, int[][] triangle, int[][] v) 
    {
        int answer = 0;
         switch(v.length) 
         {
            case 0:   
                answer = 1;
                break;                  
            case 1:
                answer = 3;
                break;
            default:
                 v_length = v.length;
                 answer=calc(triangle,v);
                 break;                      
         }
        return answer;
    }
    int calc(int[][] triangle, int[][] v)
    {        
        int[][] reit = {{0,1,2},{1,2,0},{2,0,1}};
        return = 0;
    }
}
```

실행결과

![실행결과1](../../images/2022-12-14-IU_and_boardgame/실행결과1.png){: width="100%" height="100%"}

![실행결과2](../../images/2022-12-14-IU_and_boardgame/실행결과2.png){: width="100%" height="100%"}
