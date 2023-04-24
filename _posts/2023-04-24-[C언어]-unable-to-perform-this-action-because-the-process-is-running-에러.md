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

위의 코드를 실행할 경우, Gr
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4OTEwOTY3NjVdfQ==
-->