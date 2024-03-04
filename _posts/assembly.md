## 데이터 이동 (Data Transfer)
### mov (move)
- src **값**을 dst로 복사  

### lea (load effective address)
- src **주소**를 dst로 복사

## 산술 연산 (Arithmetic)
### inc (increase)
- 값을 1 증가
### dec (decrease)
- 값을 1 감소
### add
- dst에 src 값을 더해서 dst에 저장
### sub (subtract)
- dst에 src 값을 빼서 dst에 저장

## 논리 연산 (Logical)
### and
- 두 값의 각 비트를 and 연산
- 비트가 모두 1일때 값이 1
### or
- 두 값의 각 비트를 or 연산
- 비트 중 하나가 1이면 값이 1
### xor
- 두 값의 각 비트를 xor 연산
- 비트가 서로 다른 값이면 값이 1, 아니면 0
### not
- 값의 각 비트를 xor 연산
- 1이면 0으로 0이면 1로 값의 비트를 반대로 바꿈

## 비교 (Comparsion)
### cmp
### test

## 분기 (Branch)
### jmp
### je
### jg

## 스택 (Stack)
### push
### pop

## 프로시져(Procedure)
### call
### ret
### leave

## 시스템 콜(System call)
### syscall