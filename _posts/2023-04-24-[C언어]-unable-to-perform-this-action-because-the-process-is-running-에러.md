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

구글링으로 열심히 돌아다닌 결과, *launch.json* 파일에서`externalTerminal`을 `false`에서 `true`로 바꿔줘야 한다고 나왔다. 하지만 내 *json* 파일에는 저런 부분이 없었고, 내가 임의로 추가해줘도 아무런 변화가 일어나지 않았다.

그렇게 스택오버플로우와 깃허브 등을 1시간 정도 탐방한 결과, 해결방법을 찾았다.

바로 **Code Runner**라는 Extension을 깔면 된다.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5NjI2MDU5NjBdfQ==
-->