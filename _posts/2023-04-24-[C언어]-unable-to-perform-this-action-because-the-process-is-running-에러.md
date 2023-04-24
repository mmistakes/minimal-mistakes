---
categories:
  - C
---

# #C #error #CodeRunner

열심히 C를 공부 중인데, VS Code로 코드를 짜보다가 다음과 같은 에러가 발생했다.

```
unable to perform this action because the process is running.
```

나는 다음과 같은 코드를 짜고있었다. ~~(사실 다음 포스팅 스포)~~

```c
#include  <stdio.h>
int  main()
{
	int  g[5];
	int i, ave = 0; 

	for (i = 0; i < 5; i++)
	{
		printf("Grade for %d th stduent: ", i + 1);
		scanf("%d", &g[i]);
	}
	for (i = 0; i < 5; i++)
	{
		ave = ave + g[i];
	}
	printf("Average grade is %d .", ave / 5);

	return  0;
}
```

위의 코드를 실행할 경우, `Grade for 1 th student: `라고 점수를 입력할 수 있게끔 뜬다. 여기에 내가 임의로 `90`과 같은 숫자를 넣었더니 에러가 뜬 것이다.

구글링으로 열심히 돌아다닌 결과, *launch.json* `externalTerminal`을 `false`에서 `true`로 바꿔줘야 한다고 나왔다. 하지만 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYzMDkxODg3XX0=
-->