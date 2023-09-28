---
categories:
  - C
---

# #C #function

역시 프로그래밍 언어의 꽃은 사용자 정의함수 같다. C언어에서도 드디어 사용자정의함수를 배울 차례가 왔다.

# 함수 정의하기

```c
#include  <stdio.h>

int  summation(int  n)  {
int  sum  =  0;
for  (int  i  =  1;  i  <=  n;  i++) {
sum  +=  i;
}
return  sum;
}  
int  main()  { 
int  n;
printf("Enter a number: ");
scanf("%d",  &n);

printf("Summation from 1 to %d is %d",  n,  summation(n));

  

return  0;

}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA2MDAwNzg3OV19
-->