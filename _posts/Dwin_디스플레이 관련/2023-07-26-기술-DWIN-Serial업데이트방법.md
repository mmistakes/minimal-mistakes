---
title: "[DWIN] DWIN 시리얼 업데이트 방법 "
date: 2023-07-26
last_modified_at: 2023-07-26
categories:
  - DWIN
tags:
  - DWIN

published: true
toc: true
toc_sticky: true
---


# DWIN 모니터 시리얼 업데이트 방법

1. 원하는 변경 파일을 생성한다 (42.icl(이미지) )

2. 업데이트
32Kbyte 블록으로 나눠서 업데이트를 진행한다.


1.UltraEdit 프로그램으로 이미지 파일 열어준
2.모든 데이터를 선택 후 복사한다 (Ctrl +Shift+ c)
3. 메모장으로 복사한다 

처음 주소 위치는 
42 * 8 형식으로 구한
150 
240 byte 단위로 쪼개준다


5A A5 F3 82 80 00
5A A5 헤더정도
f3 전달 길이
82 쓰기 
80 00 주소값 

헤더는  80 00번 주소 첫번
5A A5 F3 82 80 00
44 47 55 53 5F 33 4E F4 00 00 77 F8 04 00 08 00 
00 00 00 00 00 00 00 34 00 00 10 00 00 00 18 00 
00 00 28 00 00 00 38 00 00 00 48 00 00 00 58 00 
00 00 68 00 00 2D 00 2D 02 72 00 00 06 94 FF D8 
FF E0 00 10 4A 46 49 46 00 01 01 01 00 60 00 60 
00 00 FF DB 00 43 00 01 01 01 01 01 01 01 01 01 
01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 
01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 
01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 
01 01 01 01 01 01 01 FF DB 00 43 01 01 01 01 01 
01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 
01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 
01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 01 
01 01 01 01 01 01 01 01 01 01 01 01 FF C0 00 11 
08 00 2D 00 2D 03 01 22 00 02 11 01 03 11 01 FF 

(120식 증)
5A A5 F3 82 80 78
C4 00 1F 00 00 01 05 01 01 01 01 01 01 00 00 00 
00 00 00 00 00 01 02 03 04 05 06 07 08 09 0A 0B 
FF C4 00 B5 10 00 02 01 03 03 02 04 03 05 05 04 
04 00 00 01 7D 01 02 03 00 04 11 05 12 21 31 41 
06 13 51 61 07 22 71 14 32 81 91 A1 08 23 42 B1 
C1 15 52 D1 F0 24 33 62 72 82 09 0A 16 17 18 19 
1A 25 26 27 28 29 2A 34 35 36 37 38 39 3A 43 44 
45 46 47 48 49 4A 53 54 55 56 57 58 59 5A 63 64 
65 66 67 68 69 6A 73 74 75 76 77 78 79 7A 83 84 
85 86 87 88 89 8A 92 93 94 95 96 97 98 99 9A A2 
A3 A4 A5 A6 A7 A8 A9 AA B2 B3 B4 B5 B6 B7 B8 B9 
BA C2 C3 C4 C5 C6 C7 C8 C9 CA D2 D3 D4 D5 D6 D7 
D8 D9 DA E1 E2 E3 E4 E5 E6 E7 E8 E9 EA F1 F2 F3 
F4 F5 F6 F7 F8 F9 FA FF C4 00 1F 01 00 03 01 01 
01 01 01 01 01 01 01 00 00 00 00 00 00 01 02 03


5A A5 F3 82 80 F0
C4 00 1F 00 00 01 05 01 01 01 01 01 01 00 00 00 
00 00 00 00 00 01 02 03 04 05 06 07 08 09 0A 0B 
FF C4 00 B5 10 00 02 01 03 03 02 04 03 05 05 04 
04 00 00 01 7D 01 02 03 00 04 11 05 12 21 31 41 
06 13 51 61 07 22 71 14 32 81 91 A1 08 23 42 B1 
C1 15 52 D1 F0 24 33 62 72 82 09 0A 16 17 18 19 
1A 25 26 27 28 29 2A 34 35 36 37 38 39 3A 43 44 
45 46 47 48 49 4A 53 54 55 56 57 58 59 5A 63 64 
65 66 67 68 69 6A 73 74 75 76 77 78 79 7A 83 84 
85 86 87 88 89 8A 92 93 94 95 96 97 98 99 9A A2 
A3 A4 A5 A6 A7 A8 A9 AA B2 B3 B4 B5 B6 B7 B8 B9 
BA C2 C3 C4 C5 C6 C7 C8 C9 CA D2 D3 D4 D5 D6 D7 
D8 D9 DA E1 E2 E3 E4 E5 E6 E7 E8 E9 EA F1 F2 F3 
F4 F5 F6 F7 F8 F9 FA FF C4 00 1F 01 00 03 01 01 
01 01 01 01 01 01 01 00 00 00 00 00 00 01 02 03


.....(계속 업데이)


마지막이 되면

5A A5 F3 82 87 80 기준 16byte
마지막 주소에 써준다
5A A5 13 82 87 88

00 00 00 00 00 00 00 



끝으로 끝냈다는 알려주는 신호 보내준다

5A A5 0F 82 00 AA 5A 02 01 50 80 00 00 14 00 00 00 00


01 50 이 값이 주소 42번쨰 값을 가리킨다

리셋 명령어 실행

5A A5 07 82 00 04 55 AA 5A A5


# python 업로드 소스코드 

- 참고
원격 업데이트.txt 는 41.icl 파일을 비트 단위로 보낸것
DataBlock.txt 은 보낼 데이터를 파싱하여 정상적으로 만든지 확인 방법

```python

# 시리얼 통신 플로그램 예시

''' 해결 해야하는 문제 
1. 시리얼 블록 제대로 만들기 (완료)
- 헤더 만들고 내용물 넣을수 있게 만들기
2. 주소값 위치 정보 문서 (50% 진행)

3. 원격 업데이트 완료

'''
import serial
import time

ser = serial.Serial(port='COM6', baudrate=115200, parity=serial.PARITY_NONE,
                    stopbits=serial.STOPBITS_ONE, bytesize=serial.EIGHTBITS)

f = open("원격 업데이트.txt", 'r')
f_write =open("DataBlock.txt",'w')

data =f.readline()
data =data.split(" ")

count = 0
data_array_header:list = []
data_array:list =[]


i_length = 3
i_address = 0x8000

for i in range(len(data)):
    f_write.write(data[i]+" ")
    data_array.append(int(data[i],16))

    i_length = i_length +1

    if (i % 16 ==0 and i !=0)  : #줄바꾸기
        f_write.write("\n")

    if (i)% 240 ==0 and i !=0 : #보내는 블록
        f_write.write("\n")

        data_array_header.append((0x5A))
        data_array_header.append((0xA5))
        data_array_header.append((i_length))
        data_array_header.append((0x82))
        if int(i_address/0x100) >=256:
            data_array_header.append((int(i_address/0x100) -256))
        else:
            data_array_header.append((int(i_address/0x100)))
        data_array_header.append((i_address%0x100))

        data_array = data_array_header+ data_array

        print(data_array)
        ser.write(bytearray(data_array))
        #초기화 작업
        print(i_length)
        i_address = i_address +int((i_length-3)/2)

        data_array.clear()
        data_array_header.clear()

        i_length=3
        if ser.readable(): #시리얼 응답 대기 (정확히 응답 되는지 확인 작업 필요)
           s= ser.read()
    
    if (i+1 == len(data)): # 마지막인 경우
        data_array_header.append((0x5A))
        data_array_header.append((0xA5))
        data_array_header.append((i_length))
        data_array_header.append((0x82))
        if int(i_address/0x100) >=256:
            data_array_header.append((int(i_address/0x100) -256))
        else:
            data_array_header.append((int(i_address/0x100)))
        data_array_header.append((i_address%0x100))
        
        data_array = data_array_header+ data_array

        print(data_array)
        ser.write(bytearray(data_array))
        print(i_length)
        i_length=3

  

f.close()   
f_write.close()

#끝났다는것 알려주는 신호
data_array.clear()

data_array.append(0x5A)
data_array.append(0xA5)
data_array.append(0x0F)
data_array.append(0x82)
data_array.append(0x00)
data_array.append(0xAA)
data_array.append(0x5A)
data_array.append(0x02)
data_array.append(0x01)  #42.icl 주소 0150 #41.icl 0148
data_array.append(0x48)  # 41*8 주소 
data_array.append(0x80)
data_array.append(0x00)
data_array.append(0x00)
data_array.append(0x14)
data_array.append(0x00)
data_array.append(0x00)
data_array.append(0x00)
data_array.append(0x00)

ser.write(bytearray(data_array))


if ser.readable(): #시리얼 응답 대기 (정확히 응답 되는지 확인 작업 필요)
    s= ser.read()
    
values = bytearray([0x5a,0xa5 ,0x07 ,0x82, 0x00, 0x84, 0x5a, 0x01, 0x00, 0x01])  #시스템 리부팅
ser.write(values)


```

# 참고 자료
1. 유투브 영상
https://www.youtube.com/watch?v=5a3kzkY-joo

2. 개발 메뉴
http://ko.dwin-global.com/development-guide/