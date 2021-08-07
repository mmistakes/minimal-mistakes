---
title:  "1학년 1학기 기말 컴퓨터 구조"
date:   2018-07-02 08:58:00
categories:
- Study
tags:
- Sunrin-Study
---

##### 컴퓨터의 개념
* <b>계산하는 기계</b> -&gt; <b>데이터 처리</b>
* 컴퓨터의 특성
  * 신속성 - 입출력&연산 속도가 빨라서 많은 양의 데이터를 신속하게 처리
  * 대용량성 - 많은 양의 데이터를 기억하고 처리
  * 신뢰성 - 컴퓨터의 처리 결과 신뢰 가능
  * 정확성 - 오류/오차 최소화 & 처리 결과 정확
  * 범용성 - 다양한 업무 처리 가능

##### 컴퓨터의 출현
<ol>
  <li>
    <dl>
      <dt>Mark - I</dt>
      <dd>기어&톱니바퀴 사용</dd>
      <dd>세계 최초 전기 기계식 자동 계산기</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>ENIAC (Electronic Numerical Integrator And Calculator)</dt>
      <dd>최초의 범용 디지털 컴퓨터</dd>
      <dd>각 부분을 전선으로 연결하여 프로그램마다 배선의 결합과 스위치를 직접 손으로 조작</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>EDSAC (Electronic Delayed Storage Automatic Computer)</dt>
      <dd>"폰 노이만"이 제시한 프로그램 내장 방식 적용</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>EDVAC (Electronic Discrete Variable Automatic Computer)</dt>
      <dd>1,024단어 기억 & 20,000단어 보관</dd>
      <dd>2진 표현 방식 사용</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>UNIVAC (UNIversal Automatic Computer)</dt>
      <dd>일반 업무에 사용된 첫 번째 상용 컴퓨터</dd>
      <dd>2진 표현 방식 사용</dd>
    </dl>
  </li>
</ol>

##### 컴퓨터의 세대 구분
<ul>
  <li>
    <dl>
      <dt>제 1세대</dt>
      <dd>진공관 사용</dd>
      <dd>1940중반 ~ 1950중반</dd>
      <dd>기계어, 어셈블리어</dd>
      <dd>폰 노이만의 프로그램 내장 방식</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>제 2세대</dt>
      <dd>트렌지스터 사용</dd>
      <dd>1950중반 ~ 1960초반</dd>
      <dd>FORTRAN, ALGOL, COBOL 사용</dd>
      <dd>주기억장치 : 자기코어 / 보조기억장치 사용</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>제 3세대</dt>
      <dd>집적 회로(IC) 사용</dd>
      <dd>1960중반 ~ 1970초반</dd>
      <dd>보조기억장치 : 자기드럼 & 자기디스크</dd>
      <dd시분할 시스템</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>제 4세대</dt>
      <dd>고밀도 집적 회로(LSI : Large Scale Integration) 사용</dd>
      <dd>초고밀도 집적 회로(VLSI : Very LSI) 사용</dd>
      <dd>1970년대</dd>
      <dd>소형화 & 처리 속도 증가</dd>
      <dd>가상 기억 장치 사용</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>제 5세대</dt>
      <dd>프로세서 초고밀도 집적 회로, 광회로 사용</dd>
      <dd>1980년대 이후</dd>
      <dd>유비쿼터스(Ubiquitous)환경에서 IoT(Internet of Things) 지원</dd>
      <dd>GUI환경 구현</dd>
    </dl>
  </li>
</ul>

##### 컴퓨터 구성 요소
* 하드 웨어
<ul>
  <li>
    <dl>
      <dt>입력 장치</dt>
      <dd>다양한 형태의 정보를 2진수 형태로 변환하여 읽어들임</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>출력 장치</dt>
      <dd>처리 결과를 문자, 그림, 소리 등의 형태로 출력</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>연산 장치</dt>
      <dd>입력한 데이터로 산술, 논리 연산</dd>
      <dd>연산은 CPU에서 실행</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>제어 장치</dt>
      <dd>프로그램에서 명령을 받아 각 장치들을 동작하도록 제어</dd>
      <dd>제어는 CPU에서 실행</dd>
    </dl>
  </li>

  <li>
    <dl>
      <dt>기억 장치</dt>
      <dd>데이터와 프로그램을 컴퓨터에 기억</dd>
      <dd>
        <ul>
          <li>
            <dl>
              <dt>주기억 장치</dt>
              <dd>CPU에서 실행할 데이터와 프로그램 저장</dd>
              <dd>RAM(Random Access Memory), ROM(Read Only Memory)</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>보조 기억 장치</dt>
              <dd>용량이 큰 프로그램/데이터 기억</dd>
              <dd>비휘발성 메모리</dd>
              <dd>자기 테이프, 광 디스크, 하드 디스크, 플래시 메모리, USB</dd>
            </dl>
          </li>
        </ul>
      </dd>
    </dl>
  </li>
</ul>
*  소프트웨어
  * 시스템 소프트웨어
<ul>
  <li>
    <dl>
      <dt>운영 체제</dt>
      <dd>하드웨어&소프트웨어를 직접/독립적으로 관리</dd>
      <dd>컴퓨터와 사용자 간 중개 역할</dd>
      <dd>Windows, Linux, Unix</dd>
    </dl>
  </li>
  <li>
    <dl>
      <dt>언어 번역 프로그램</dt>
      <dd>원시 프로그램 -&gt; 기계어</dd>
      <dd>
        <ul>
          <li>
            <dl>
              <dt>어셈블러(Assembler)</dt>
              <dd>어셈블리어로 작성된 원시 프로그램을 기계어로 된 목적 프로그램으로 번역</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>컴파일러(Compiler)</dt>
              <dd>고급 언어로 작성된 프로그램 전체를 목적 프로그램으로 번역 후, 링킹 작업</dd>
              <dd>FORTRAN, COBOL, PASCAL, C, C++</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>인터프리터(Interpreter)</dt>
              <dd>고급 언어나 코드화된 중간 언어를 목적 프로그램 없이 직접 기계어 생성&실행</dd>
              <dd>BASIC, SNOBOL, LISP, APL</dd>
            </dl>
          </li>
        </ul>
      </dd>
    </dl>
  </li>
  <li>
    <dl>
      <dt>유틸리티 프로그램</dt>
      <dd>사용자가 컴퓨터를 편리하고 효율적으로 사용할 수 있도록 도와주는 소프트웨어</dd>
      <dd>압축 프로그램, 백신...</dd>
    </dl>
  </li>
</ul>
  * 응용 소프트웨어
<ul>
  <li>
    <dl>
      <dt>범용 프로그램</dt>
      <dd>특정 분야에서 공동적으로 사용</dd>
      <dd>많은 노력 필요X, 쉽게 업무 처리 가능</dd>
      <dd>쉽게 수정 불가능</dd>
      <dd>MS-Office, Abode Photoshop</dd>
    </dl>
  </li>
  <li>
    <dl>
      <dt>특수 목적용 프로그램</dt>
      <dd>사용자가 특별한 목적으로 주문 제작</dd>
    </dl>
  </li>
</ul>

##### 컴퓨터의 동작
<dl>
  <dt>인출(fetch)</dt>
  <dd>다음 명령을 인출하고 PC 증가</dd>
  <dt>해독(encode)</dt>
  <dd>명령 레지스터에 있는 비트 패턴 해독</dd>
  <dt>실행(execute)</dt>
  <dd>명령 레지스터 내부에 있는 명령어가 요청하는 활동 수</dd>
</dl>

##### 디지털 코드
* BCD코드
  * 0에서 9까지 10진수를 2진수 4자리로 표현
* 3초과 코드
  * BCD코드에 3을 더해 표현
* ASCII 코드
  * 7bit 코드
  * 영어 대/소문자, 숫자, 특수 문자 표현
* EBCDIC 코드
  * 영문자, 숫자, 특수 기호 등 256자 표현 가능
* 유니 코드
  * 16bit 표현
  * 65536글자 표현 가능
* 해밍 코드
  * 단일 비트 오류 발생 시 오류 위치 검출
  * 4비트 데이터에서 사용 방법
    * C1 C2 8 C3 4 2 1
    * C1 : 1, 3, 5, 7 짝수
    * C2 : 2, 3, 6, 7 짝수
    * C3 : 4, 5, 6, 7 짝수

##### 연산 장치의 구성
* 연산 장치의 구성 요소
<dl>
  <dt>데이터 레지스터(Data Register)</dt>
  <dd>주기억 장치에서 가져온 데이터 보관</dd>

  <dt>가산기(Adder)</dt>
  <dd>누산기 값 + 레이스터 값 을 누산기에 보관</dd>

  <dt>누산기(AC, Accumulator)</dt>
  <dd>연산의 중간 결과 기억</dd>

  <dt>오버플로(Overflow) 검출기</dt>
  <dd>가산기의 결과가 레지스터 용량을 초과했는지 검사</dd>

  <dt>상태 레지스터</dt>
  <dd>자리 올림(Carry in), 오버플로, 인터럽트(Interrupt) 발생 여부 저장</dd>
</dl>

##### 연산 과정
<ol>
  <li>제어 장치의 제어 신호를 받음</li>
  <li>주기억 장치에서 데이터를 가져와 레지스터에 저장</li>
  <li>세로운 데이터 발생 시 주기억 장치에서 가져와 저장 (예외)</li>
  <li>누산기 값 + 데이터 레지스터 값</li>
  <li>상태 레지스터에 상태 저장</li>
  <li>누산기 &lt;- 가산 결과</li>
  <li>주기억 장치 &lt;- 결과</li>
</ol>

##### 불 대수
* 불 대수 정의
  * 참과 거짓을 판단하는 대수
  * 참(1) 또는 거짓(0) 값을 갖는 논리 변수, and/or/not 등의 논리 연산 이용<br><br>
* 불 대수의 기본 연산
  * 논리곱(AND) - 주어진 복수 명제 모두 참
  * 논리합(OR) - 주어진 복수 명제에서 적어도 1개 이상 참
  * 논리부정(NOT) - 주어진 명제의 참과 거짓을 부정<br><br>
* 불 대수 법칙
<table>
  <tr><th>구분</th><th>논리식</th><th>구분</th><th>논리식</th></tr>

  <tr><th rowspan  ="4">논리합</th><td>A + 0 = A</td><th rowspan = "4">논리곱</th><td>A x 0 = 0</td></tr>
  <tr><td>A + 1 = 1</td><td>A x 1 = A</td></tr>
  <tr><td>A + A = A</td><td>A x A = A</td></tr>
  <tr><td>A + A' = 1</td><td>A x A' = 0</td></tr>

  <tr><th rowspan  ="2">교환 법칙</th><td>A + B = B + A</td><th rowspan = "2">결합 법칙</th><td>A + (B + C) = (A + B) + C</td></tr>
  <tr><td>A x B = B x A</td><td>A x (B x C) = (A x B) x C</td></tr>

  <tr><th rowspan  ="2">흡수 법칙</th><td>A + (A x B) = A</td><th rowspan = "2">분배 법칙</th><td>A + (B x C) = (A + B) x (A + C)</td></tr>
  <tr><td>A x (A + B) = A</td><td>A x (B + C) = (A x B) + (A x C)</td></tr>

  <tr><th>드모르간 법칙</th><td colspan = "3">(A + B)' = A' x B', (A x B)' = A' + B'</td></tr>
</table>
* 논리 게이트
  * AND게이트, OR게이트, NOT게이트 - 설명 생략
  * NAND 게이트 - (AB)'
  * NOR 게이트 - (A+B)'
  * XOR(배타적 논리합) 게이트 - AB' + A'B

##### 가산기
* 반가산기(Half Adder)
  * 2개 입력, 2개 출력
  * 입력 변수 : 2진수 1자리 2개(A, B)
  * 출력 변수 : 합(S, Sum), 자리 올림수(C, Carry)
  * 진리표
<table>
  <tr><th colspan = "2">입력</th><th colspan = "2">출력</th></tr>
  <tr> <th>A</th> <th>B</th ><th>C</th> <th>S</th> </tr>
  <tr> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>0</td> <td>1</td> <td>0</td> <td>1</td> </tr>
  <tr> <td>1</td> <td>0</td> <td>0</td> <td>1</td> </tr>
  <tr> <td>1</td> <td>1</td> <td>1</td> <td>0</td> </tr>
</table>
  * S = A xor B
  * C = AB<br><br>
* 전가산기(Full Adder)
  * 3개 입력, 2개 출력
  * 입력 변수 : 2진수 1자리 2개(A, B), 하위 자리 자리 올림수(Z)
  * 출력 변수 : 합(S, Sum), 자리 올림수(C, Carry)
  * 진리표
<table>
  <tr> <th colspan = "3">입력</th> <th colspan = "2">출력</th> </tr>
  <tr> <th>A</th> <th>B</th> <th>Z</th> <th>C</th> <th>S</th> </tr>
  <tr> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>0</td> <td>0</td> <td>1</td> <td>0</td> <td>1</td> </tr>
  <tr> <td>0</td> <td>1</td> <td>0</td> <td>0</td> <td>1</td> </tr>
  <tr> <td>0</td> <td>1</td> <td>1</td> <td>1</td> <td>0</td> </tr>
  <tr> <td>1</td> <td>0</td> <td>0</td> <td>0</td> <td>1</td> </tr>
  <tr> <td>1</td> <td>0</td> <td>1</td> <td>1</td> <td>0</td> </tr>
  <tr> <td>1</td> <td>1</td> <td>0</td> <td>1</td> <td>0</td> </tr>
  <tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr>
</table>
  * S = (A xor B) xor Z
  * C = (A xor B)Z + AB<br><br>

##### 감산기
* 반감산기(Half Subtracter)
  * 2개 입력, 2개 출력
  * 입력 변수 : 2진수 1자리(A, B)
  * 출력 변수 : 빌림수(b, borrow), 차(D, Difference)
  * 진리표
<table>
  <tr> <th colspan = "2">입력</th> <th colspan = "2">출력</th> </tr>
  <tr> <th>A</th> <th>B</th> <th>b</th> <th>D</th> </tr>
  <tr> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
  <tr> <td>0</td> <td>1</td> <td>1</td> <td>1</td> </tr>
  <tr> <td>1</td> <td>0</td> <td>0</td> <td>1</td> </tr>
  <tr> <td>1</td> <td>1</td> <td>0</td> <td>0</td> </tr>
</table>
  * b = A'B
  * D = A xor B<br><br>
* 전감산기(Full Subtracter)
  * 3개 입력, 2개 출력
  * 입력 변수 : 2진수 1자리(A, B), 자리 빌림수(Y)
  * 출력 변수 : 빌림수(b, borrow), 차(D, Difference)
  * 진리표
<table>
<tr> <th colspan = "3">입력</th> <th colspan = "2">출력</th> </tr>
<tr> <th>A</th> <th>B</th> <th>Y</th> <th>b</th> <th>D</th> </tr>
<tr> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> </tr>
<tr> <td>0</td> <td>0</td> <td>1</td> <td>1</td> <td>1</td> </tr>
<tr> <td>0</td> <td>1</td> <td>0</td> <td>1</td> <td>1</td> </tr>
<tr> <td>0</td> <td>1</td> <td>1</td> <td>1</td> <td>0</td> </tr>
<tr> <td>1</td> <td>0</td> <td>0</td> <td>0</td> <td>1</td> </tr>
<tr> <td>1</td> <td>0</td> <td>1</td> <td>0</td> <td>0</td> </tr>
<tr> <td>1</td> <td>1</td> <td>0</td> <td>0</td> <td>0</td> </tr>
<tr> <td>1</td> <td>1</td> <td>1</td> <td>1</td> <td>1</td> </tr>
</table>
  * b = A'B + Y(A xor B)'
  * D = (A xor B) xor Y

##### 산술 연산 회로
* 사칙 연산은 덧셈을 기본한다.
<ul>
  <li>덧셈</li>
  <li>뺄셈 : 보수에 의한 덧셈</li>
  <li>곱셈 : 시프트와 덧셈의 반복</li>
  <li>나눗셈 : 시프트와 뺄셈의 반복</li>
</ul>
* 덧셈
  * AC &lt;- AC + MBR
  * 가산기의 결과를 누산기 앞에 AND게이트를 통해 누산기에 저장<br><br>
* 뺄셈
  * AC &lt;- AC + MBR의 2의 보수
  * 2의 보수를 가산기에 입력하여 누산기에 있는 피감수와 덧셈<br><br>
* 곱셈
  * AC, MQ레지스터 &lt;- AC x MBR
  * 승수 : 기억 레지스터 / 피승수 : 누산기에 기억
  * 가산기에서 덧셈을 하여 그 결과를 MQ레지트터와 누산기에 연결한 형태로 저장
  * MQ레지스터 : 곱셈의 결과 늘어난 자릿수만큼 기억할 수 있게 하는 보조 누산기<br><br>
* 나눗셈
  * AC, MQ레지스터 &lt;- MQ레지스터 AC / MBR
  * 기억 레지스터에 보수를 취한 뒤 누산기와 덧셈
  * 피제수 : MQ레지스터와 누산기를 연결한 형태의 큰 수로 기억
  * 제수 : 기억 레지스터에 기억
  * 몫 : 누산기 / 나머지 : MQ레지스터 에 저장<br><br>
* 비교 연산
<table>
  <tr> <th>A - B</th> <th>의미</th> </tr>
  <tr> <td>-</td> <td>A &lt; B</td> </tr>
  <tr> <td>0</td> <td>A = B</td> </tr>
  <tr> <td>+</td> <td>A &gt; B</td> </tr>
</table>
