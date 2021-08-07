---
title:  "CPU/함수 잡지식"
date:   2018-09-30 03:49:00
categories:
- Unifox
tags:
- Unifox
---

### 1.&nbsp;x86 아키텍쳐 cpu 레지스터
#### C언어 register 키워드
```cpp
register int num1 = 10; //변수 num1은 CPU의 레지스터를 사용
```
* 변수를 선언할 때 register로 선언을 하면 메모리 대신 CPU 레지스터 사용
* 일반 변수보다 속도 빠름
* 레지스터 개수 한정 => register를 붙인다고 해서 모두 레지스터 사용X
* CPU 레지스터를 사용하므로 메모리에 생성 안됨 => &연산자 사용 불가
* 레지스터 변수에 주소값 저장하면 * 연산자는 사용 가능
* 지역 변수에만 사용 가능

#### 범용 레지스터
1. AX (Accumulator register) : 산술 연산에 사용
* CX (Counter register) : 시프트/회전 연산과 루프에서 사용
* DX (Data register) : 산술 연산과 I/O 명령에서 사용
* BX (Base register) : 데이터의 주소를 가리키는 포인터로 사용 (세그멘티드 모드에서는 세그멘트 레지스터 DS로 존재)
* SP (Stack Pointer register) : 스택의 최상단을 가리키는 포인터로 사용
* BP (Stack Base Pointer register) : 스택의 베이스를 가리키는 포인터로 사용
* SI (Source Index register) : 스트림 명령에서 소스를 가리키는 포인터로 사용
* DI (Destination Index register) : 스트림 명령에서 도착점을 가리키는 포인터로 사용

###### 비트 별 범용 레지스터 이름
<table>
  <tr> <th></th> <th colspan="2">Accumulator</th> <th colspan="2">Counter</th> <th colspan="2">Data</th> <th colspan="2">Base</th> <th colspan="2">Stack Pointer</th> <th colspan="2">Stack Base Pointer</th> <th colspan="2">Source</th> <th colspan="2">Destination</th> </tr>

  <tr> <th>64-Bit</th> <td colspan="2">RAX</td> <td colspan="2">RCX</td> <td colspan="2">RDX</td> <td colspan="2">RBX</td> <td colspan="2">RSP</td> <td colspan="2">RBP</td> <td colspan="2">RSI</td> <td colspan="2">RDI</td> </tr>

  <tr> <th>32-Bit</th> <td colspan="2">EAX</td> <td colspan="2">ECX</td> <td colspan="2">EDX</td> <td colspan="2">EBX</td> <td colspan="2">ESP</td> <td colspan="2">EBP</td> <td colspan="2">ESI</td> <td colspan="2">EDI</td> </tr>

  <tr> <th>16-Bit</th> <td colspan="2">AX</td> <td colspan="2">CX</td> <td colspan="2">DX</td> <td colspan="2">BX</td> <td colspan="2">SP</td> <td colspan="2">BP</td> <td colspan="2">SI</td> <td colspan="2">DI</td> </tr>

  <tr> <th>8-Bit</th> <td>AH</td> <td>AL</td> <td>CH</td> <td>CL</td> <td>DH</td> <td>DL</td> <td>BH</td> <td>BL</td> <td colspan="2"></td> <td colspan="2"></td> <td colspan="2"></td> <td colspan="2"></td> </tr>
</table>

#### 세그먼트 레지스터
1. SS (Stack Segment) : 스택 영역의 시작 주소
2. CS (Code Segment) : 코드 영역의 시작 주소
3. DS (Data Segment) : 데이터 영역의 시작 주소
4. ES (Extra Segment) : 다른 데이터의 주소(E는 Extra와 동치)
5. FS (F Segment) : 또 다른 데이터의 주소(F는 E 뒤에 있다)
6. GS (G Segment) : 또 다른 데이터의 주소(G는 F 뒤에 있다)


### 2. 스택 프레임과 함수 프롤로그, 에필로그
#### 스택 프레임
함수가 호출되면 스택 영역에는
* 함수의 매개변수
* 호출이 끝난 뒤 돌아갈 반환 주소값
* 함수에서 선언된 지역변수

등이 저장된다.<br>
이렇게 스택 영역에 차례대로 저장되는 함수의 호출 정보를 스택 프레임이라 한다.

```cpp
void g(void);
void f(void);
int main(void){
    g(); //g() 호출
    return 0;
}

void g(){
    f(); //f() 호출
}

void f(){

}
```
위 코드에서의 함수 호출에 의한 스택 프레임의 변화는 아래 그림과 같다.<br><br>
<img src = "https://i.imgur.com/BofxviQ.png"> <br><br>
<img src = "https://i.imgur.com/3ZVvMo4.png"> <br><br>

#### 함수의 호출 과정
1. 함수가 사용할 매개변수를 스택에 넣고 함수 시작 지점으로 점프
2. 함수 내에서 사용할 스택 프레임 설정 (프롤로그)
3. 함수 내용 수행
4. 수행을 마치고 처음 호출한 지점으로 돌아가기 위해 스택 복원 (에필로그)

#### 함수 프롤로그
프롤로그는 함수 내에서 사용할 스택 프레임을 설정하는 과정이다.
```nasm
push  ebp
mov   ebp, esp
push  ecx
```
베이스 포인터를 스택에 저장하고, 현재 스택 포인터를 베이스 포인터에 저장

#### 함수 에필로그
에필로그는 함수 수행을 마치고 처음 호출한 지점으로 돌아가기 위해 스택을 복원하는 과정이다.
```nasm
//leave
mov   esp, ebp
pop   ebp
ret
```
스택 포인터를 베이스 포인터로 복구한 후, 베이스 포인터를 복구해주고 ret

### 3. 함수의 호출 규약

#### __cdecl 방식
* C/C++함수에서 기본적으로 사용되는 호출 규약
* 인자는 오른쪽에서 왼쪽으로 전달
* 호출자가 스택 프레임 정리
* 가변 인자 함수 생성 가능

#### __stdcall 방식
* Win32 API에서 사용
* 인자는 오른쪽에서 왼쪽으로 전달
* 피호출자가 스택 프레임 정리
* 매개 변수 개수 고정

#### __fastcall 방식
* 스택이 아닌 가까운 레지스터 사용

### 4. CPU Cashing
대부분의 메모리 접근은 특정한 위치 주변에서 자주 일어나는 경향이 있기 때문에 속도가 매우 빠른 캐시메모리에 복사해두면 평균 메모리 접근 시간을 단축 시킬 수 있다.

#### 사용처
1. 배열 전체의 합을 구해서 한 변수에 저장할 때
2. http://icpc.me/1182 처럼 데이터의 수는 작으면서 여러 번 접근해야 하는 NP문제를 풀 때
