---
title: 'Java - Practice6 - question2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 2

채널과 전원버튼을 변수로 갖는 Tv클래스가 있다.  
이 클래스는 ChannelUp(), ChannelDown(), PowerOff(), PowerOn() 함수가 있다.  
채널: 채널은 0~99번까지 존재한다.  
전원버튼 On, Off  
ChannelUp(): 채널 +1이 된다. 채널이 +1됐다고 출력  
ChannelDown(): 채널 -1이 된다. 채널이 -1됐다고 출력  
PowerOn(), PowerOff(): 전원 on, off 변경 및 on, off 됐다고 출력  
<br>
**추가조건**  
함수의 기능이 제대로 실행 안될 시 해당 이유를 출력해야 함  
채널을 변경하려면 전원이 먼저 켜져 있어야 한다.  
채널변경 시 0번에서 99번 사이를 넘어갈 수는 없다.  
Power on, off시 해당 상태와 동일한 기능을 작동불가.  
채널변수와 전원버튼은 private생성 후, setter, getter 생성
<br>

```java
package practice6;

import java.util.Scanner;
	static void exec(Tv s, String input) {
		// make function
	}

	public static void main(String args[]) {
		Tv sm = new Tv();
		Scanner sc = new Scanner(System.in);
		String input = sc.nextLine();

		do {
			exec(sm, input);
			input = sc.nextLine();
		} while (!input.equals("exit"));
	}
}
```

Tv클래스를 작성 후 옆의 test코드하여 클래스가 제대로 작동하는지 테스트한다.  
<br>
이 테스트 코드는 사용자로부터 명령어를 입력받고 해당 명령어에 따라 Tv클래스의 함수를 실행하게 된다. 위의 exec함수를 완성하여 테스트를 진행하면 된다.  
<br>

up: 채널업, down: 채널다운, on: 전원on, off: 전원off  
위 명령어는 대소문자 구별없이 입력받을 수 있고 위 명령어를 제외한 나머지 명령어가 입력될 경우 Unknown Error를 출력해주면 된다.

> **Answer**

- Tv.java

```java
package practice6;

public class Tv {
	private int channel = 0;
	private boolean power = false;

	void setChannel(int channel) {
		this.channel = channel;
	}

	void setPower(boolean power) {
		this.power = power;
	}

	int getChannel() {
		return channel;
	}

	boolean getPower() {
		return power;
	}

	void ChannelUp() {
		if (power == false)
			System.out.println("전원이 먼저 켜져 있어야 합니다.");
		else {
			if (channel >= 0 && channel <= 99) {
				channel++;
				System.out.println("채널이 +1 되었습니다.");
			}
			else {
				System.out.println("채널은 0번에서 99번 사이를 넘어갈 수는 없습니다.");
			}
		}
	}

	void ChannelDown() {
		if (power == false)
			System.out.println("전원이 먼저 켜져 있어야 합니다.");
		else {
			if (channel >= 0 && channel <= 99) {
				channel--;
				System.out.println("채널이 -1 되었습니다.");
			}
			else {
				System.out.println("채널은 0번에서 99번 사이를 넘어갈 수는 없습니다.");
			}
		}
	}

	void PowerOn() {
		power = true;
		System.out.println("전원이 on 되었습니다.");
	}

	void PowerOff() {
		power = false;
		System.out.println("전원이 off 되었습니다.");
	}
}

```

- test2.java

```java
package practice6;

import java.util.Scanner;

public class test2 {
	static void exec(Tv s, String input) {
		if (input.equals("up"))
			s.ChannelUp();
		else if (input.equals("down"))
			s.ChannelDown();
		else if (input.equals("on"))
			s.PowerOn();
		else if (input.equals("off"))
			s.PowerOff();
		else
			System.out.println("Unknown Error");
	}

	public static void main(String args[]) {
		Tv sm = new Tv();
		Scanner sc = new Scanner(System.in);
		String input = sc.nextLine();

		do {
			exec(sm, input);
			input = sc.nextLine();
		} while (!input.equals("exit"));
	}
}

```
