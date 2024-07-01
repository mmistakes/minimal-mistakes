---
layout: single
title: Hyper-V에서 용량 확장하기
categories: Hypervisor
tags:
  - Tips
  - Hyper-V
  - Linux 
---
  

## Hyper-V 설정(서버가 종료돼있는 상태에서 작업 진행)

1. Hyper-V 관리자 디스크 편집
![](/images/2024/04/2024-04-16-Hyper-V_1.png)

2. 변경하려는 VM의 디스크파일 vhd나 vhdx 파일 선택
![](/images/2024/04/2024-04-16-Hyper-V_2.png)

3. 확장 선택(다른 기능은 아직 안써봤다)
![](/images/2024/04/2024-04-16-Hyper-V_3.png)

4. 변환하려는 크기 지정 후 마침(원래 크기 50GB)
![](/images/2024/04/2024-04-16-Hyper-V_4.png)
  
5. 마지막으로 서버를 다시 켜고 설정을 하면 된다.
![](/images/2024/04/2024-04-16-Hyper-V_5.png)


## Linux 내부 설정

1. df -hT 를 사용하여 현재 사용가능한 디스크 용량 및 타입을 확인
![](/images/2024/04/2024-04-16-Hyper-V_6.png)

2. lsblk(or fdisk -l)을 입력하여 현재 스토리지(블록) 상태 확인
![](/images/2024/04/2024-04-16-Hyper-V_7.png)<br/>
현재 10GB 추가 할당하여 총 디스크 용량 60GB로 변경하였고 기존 50GB인 상태였기 때문에 용량 확장만 하면 된다.
10GB 용량의 파티션을 따로 생성하는 방법도 있겠지만 여기선 기존 루트(/)의 용량 확장을 진행하려고 한다.

3. parted 사용하여 파티션 확장
parted 명령 실행 후 print free
sda 3의 용량이 나오고 여분 공간 10GB가 보인다.
![](/images/2024/04/2024-04-16-Hyper-V_8.png)<br/>
resizepart 를 입력한 후 변경할 번호(3번) 입력, yes, -1은 마지막이라는 뜻
![](/images/2024/04/2024-04-16-Hyper-V_9.png)

4. 파티션은 늘렸지만 파일시스템을 동일하게 만들어줘야 실제 사용이 가능하다.<br/>
resize2fs를 이용하여 작업한다.<br/>
ext4를 사용하고 있기 때문에 resize2fs를 썼는데 xfs의 경우는 xfs_grow 를 사용하면 될 것 같다.
![](/images/2024/04/2024-04-16-Hyper-V_10.png)

  

완료
