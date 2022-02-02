---
layout: post
title: "날짜 계산 (Java) + int to long, string to date"
---

컨트롤러에서 받아온 start date와 end date의 차이 (즉 전체 기간)  
찾아보니 long 타입으로 쓰는 방법 밖에 없다  

<br>
# String to Date
```
// 시작일(iniStartDate)
String iniStartDateString = param.get("iniStartDate");
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
Date iniStartDate = sdf.parse(iniStartDateString);

// 종료일(iniEndDate)
String iniEndDateString = param.get("iniEndDate");
Date iniEndDate = sdf.parse(iniEndDateString);
```
👆 파라미터 param(Map)에서 iniStartDate를 가져오고 String으로 저장  
✌ SQL 저장 시 포맷이 맞아야 하므로 `SimpleDateFormat`으로 포맷을 맞춰준다  
🤟 `.parse()`를 통해 Date 타입으로 변경  

<br>

# 날짜 계산
```
long iniDurationLong = (iniEndDate.getTime() - iniStartDate.getTime()) / (24*60*60*1000);
```
👆 `.getTime`을 통해 1970년 1월 1일 이후로 iniEndDate와 iniStartDate까지 밀리세컨드만큼 시간이 얼마나 지났는지 값을 가져옴  
✌ 각각 밀리세컨드의 차를 `24*60*60*1000`으로 나눠주면 일(日)에 대한 차이를 알 수 있다  
만약 초에대한 차이를 알려면 1000으로만 두 값의 차이를 나눠주고  
분에 대한 차이를 알려면 `1000*60`  
시간에 대한 차이를 알려면 `1000*60*60`으로 나눠준다  

<br>

# Int to Long
```
int iniDuration = Long.valueOf(iniDurationLong).intValue();
```
Long.valueOf(변환을 원하는 Long).intValue()를 해주면 끝
