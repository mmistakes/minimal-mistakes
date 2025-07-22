---
layout: single
title: 업무 로직
excerpt: 여섯번째 노트
toc: true
toc_label: "테이블 오브 콘텐츠"
toc_icon: "business-time"
sidebar:
  title: "노트 더보기"
  nav: sidebar-notes
---

🏢 업무 로직 정리!
<br><br><br>
# 1.마크다운
## 1.1.안내문구
> 📓 NOTE <br>
> Useful information that users should know, even when skimming content.
> {: .notice--info}
> 
> ⏰️ TIP <br>
> Helpful advice for doing things better or more easily.
> {: .notice}
> 
> ❗️ IMPORTANT <br>
> Key information users need to know to achieve their goal.
> {: .notice--primary}
> 
> ⛔️ WARNING <br>
> Urgent info that needs immediate user attention to avoid problems.
> {: .notice--warning}
> 
> ⚠️ CAUTION <br>
> Advises about risks or negative outcomes of certain actions.
> {: .notice--danger}
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 1.2.헤더문법
> ⏰️ TIP <br>
> #의 갯수에 따라 헤더의 크기가 달라져요.
> {: .notice}
> <h1>첫번째 헤더</h1>
  ```
  # 첫번째 헤더
  ```
> <h2>두번째 헤더</h2>
  ```
  ## 두번째 헤더
  ```
> <h3>세번째 헤더</h3>
  ```
  ### 세번째 헤더
  ```
> <h4>네번째 헤더</h4>
  ```
  #### 네번째 헤더
  ```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 1.3.Quote(인용)문법
> ⏰️ TIP <br>
> ">"의 갯수에 따라 깊이가 달라져요.
> {: .notice}
> ">" 꺽쇠가 한개인 경우의 깊이
>
  ```
  ">" 한개일때
  ```
>> ">>" 꺽쇠가 두개인 경우의 깊이
>>
  ```
  ">>" 두개일때
  ```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 1.4.수평선
> ⏰️ TIP <br>
> *** 또는 - - - 또는 <hr> 로 표현.
> {: .notice}
> ***
  ```
  ***
  ```
> ---
  ```
  ---
  ```
> <hr>
  ```
  "<hr>"
  ```
<a href="#" class="btn btn--success">Back to top</a>
<br>

<br><br>
# 2.ERP
## 2.1.AP전표
```sql
select * from ap_invoices_all;
select * from ap_invoice_distributions_all;
```
<a href="#" class="btn btn--success">Back to top</a>
<br>

### - 선급금 반제
- 선급금 전표 Tax라인 있는 경우
  
  ❗️IMPORTANT <br> 1. 선급금 반제시 원전표에 Tax라인 생성됨 <br> 2. Tax라인 불필요시 선급금 반제전 선급금 Tax Calculation 변경 필요 <br> &emsp;- 화면) Header → Line 또는 None <br> &emsp;- DB) TAX_CALCULATION_FLAG: Y → L 또는 N
  {: .notice--primary}

- 선급금 반제 후 원전표 회계생성 안된 경우

  ❗️IMPORTANT <br> 1. 5)View Prepayment Application 내역 확인 <br> 2. 원전표 Status가 Partial이면 테이블 확인 <br> &emsp;- ap_invoice_distributions_all <br> &emsp;- ap_accounting_evnets_all
  {: .notice--primary}

<a href="#" class="btn btn--success">Back to top</a>
<br>

## 2.2.AR전표
```sql
select * from ra_customer_trx_all;
select * from ra_customer_lines_all;
```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 2.3.GL전표
```sql
select * from gl_je_headers;
select * from gl_je_lines;
```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 2.4.거래처
- 매입(AP)
  ```sql
  select * from po_vendors;
  select * from po_vendor_sites_all;
  ```
- 매출(AR)
  ```sql
  select * from ra_customers;
  ```
  
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 2.5.AR Receipt
```sql
select * from ar_cash_receipts_all;
select * from ar_receipt_applications_all;
```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 2.6.인터페이스 에러
### - Type1
- Salesperson 미등록
  ```sql
  # 에러내역:
  Other Error : ORA-01403: no data found
  ```
  ⏰️ TIP <br> 1. 제품서비스 등록 여부 확인 <br> 2. 미등록 제품서비스인 경우 회계팀에 요청하여 등록<br> 3. 인터페이스 재실행 후 전표 생성
  {: .notice}

- 인터페이스 진행중 상태 (GL)
  ```sql
  # 현상:
  INTERFACE_FLAG 값이 'P',
  ERP_IMPORT_FLAG 값이 'Y',
  JOURNAL_NAME이 NULL인 상태
  ```
  ⏰️ TIP <br> 1. gl_interface 테이블에 내역 확인<br> 2. 내역 있으면 삭제 <br> 3. 인터페이스 초기화 <br> &nbsp;&nbsp;- INTERFACE_FLAG = 'N' <br> &nbsp;&nbsp;- ERP_IMPORT_FLAG = 'N' <br> &nbsp;&nbsp;- 인터페이스 재실행 후 전표 생성
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>

### - Type2
- 인터페이스 진행중 상태 (AR)
  ```sql
  INTERFACE_FLAG 값이 'P',
  ERP_IMPORT_FLAG 값이 'Y',
  TRX_NUMBER가 생성된 상태
  ```
  ⏰️ TIP <br> 1. FCM에서 trx_number 확인 <br> 2. AR전표 생성된 경우 전자세금계산서 발행여부 확인 <br> 3. 인터페이스 완료처리 <br> &ensp;- INTERFACE_FLAG = 'Y' <br> &ensp;- ERP_IMPORT_FLAG = 'C' <br> &ensp;- 전자세금계산서 인터페이스 실행
  {: .notice}

- 인터페이스 진행중 상태 (AP)
  ```sql
  INTERFACE_FLAG 값이 'P',
  ERP_IMPORT_FLAG 값이 'Y',
  INVOICE_NUM이 생성된 상태
  ```
  ⏰️ TIP <br> 1. AP 인터페이스 내역 확인 <br> &emsp;- ap_invoices_interface <br> &emsp;- ap_invoice_lines_interface <br> 2. FCM에 AP전표 미생성된 경우 AP 인터페이스 내역 삭제 <br> 3. 인터페이스 초기화 <br> &ensp;- INTERFACE_FLAG = 'N' <br> &ensp;- ERP_IMPORT_FLAG = 'N' <br> &ensp;- INVOICE_NUM = NULL <br> 4. 인터페이스 재실행 후 전표 생성
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>

### - Type3
- DB Lock
  ```sql
  # 에러내역:
  Other Error : ORA-20001: You cannot delete a posted record.
  ORA-06512: at "APPS.RA_CUST_TRX_LINE_GL_DIST_BRI", line 75
  ORA-04088: error during execution of trigger 'APPS.RA_CUST_TRX_LINE_GL_DIST_BRI'
  ```
  ⏰️ TIP <br> 1. db-lock 확인하기 <br> 2. gl_interface 내역 삭제 <br> 3. 인터페이스 초기화 <br> &emsp;- gl → INTERFACE_FLAG = 'N', <br> &emsp;&emsp;&emsp;&emsp;ERP_IMPORT_FLAG = 'N', <br> &emsp;&emsp;&emsp;&emsp;JOURNAL_NAME = NULL <br> &emsp;- ar → ERP_IMPORT_FLAG = 'C' <br> 4. 인터페이스 재실행 후 전표 생성
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>

## 2.7.출장보고서 초기화
### - 출장보고서 반려된 경우
  ```sql
  --출장보고서 내역 확인
  select * from eap_ep_ap_interface_history;
  ```
  ```sql
  --출장전표번호 확인
  select * from EAP_BIZ_TRIP_INVOICES;
  select * from eap_biz_trip_invoices_line;
  ```
  ```sql
  --인터페이스 확인
  select * from egl_interface_header;
  select * from egl_interface_line;
  ```
  ```sql
  --AP전표 확인
  select * from ap_invoices_all;
  ```
  ```sql
  --법인카드 확인
  select * from eap_card_approve;
  ```
  ⏰️ TIP <br> 1. 법인카드 내역 초기화 <br> 2. 출장전표번호 삭제
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>
  
### - 출장보고서 완료후 법인카드 결재중인 경우
  ```sql
  --출장보고서 내역 확인
  select * from eap_ep_ap_interface_history;
  ```
  ```sql
  --출장전표번호 확인
  select * from EAP_BIZ_TRIP_INVOICES;
  select * from eap_biz_trip_invoices_line;
  ```
  ```sql
  --인터페이스 확인
  select * from egl_interface_header;
  select * from egl_interface_line;
  ```
  ```sql
  --AP전표 확인
  select * from ap_invoices_all;
  ```
  ```sql
  --법인카드 확인
  select * from eap_card_approve;
  ```
  ```sql
  --AP 인터페이스 확인
  select * from ap_invoices_interface;
  select * from ap_invoice_lines_interface;
  ```
  ⏰️ TIP <br> 1. AP 인터페이스 내역 삭제 <br> 2. 법인카드 내역 초기화 <br> 3. 인터페이스 초기화 및 재실행 후 AP전표 생성
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>

<br><br>
# 3.그룹웨어
## 3.1.메일 보내기
<br>
<a href="#" class="btn btn--success">Back to top</a>
<br>

<br><br>
# 4.윈도우
## 4.1.환경변수

<a href="#" class="btn btn--success">Back to top</a>
<br>

<br><br>
# 5.출입증
## 5.1.등록
- 방재실 방문하여 스피드게이트 등록
  ```
  신규 / 기존 구분하여 등록
  신규: 입사자
  기존: 재직자
  ```
  ⏰️ TIP <br> 1. 담당자 부재 시 회사,층수,연락처 기재 <br> 2. 등록 완료 후 담당자가 메시지 발송 <br> 3. 출입증 픽업
  {: .notice}

- 출입시스템 단말기 등록
  ```
  마지막 사용자 번호: 404
  마스터 카드로 시퀀스 번호+1 하여 사용자 등록
  다음 사용자 번호: 405
  ```
  ⏰️ TIP <br> 1. 단말기에 등록된 사용자 출입관리시스템 서버로 가져오기 <br> 2. 사용자 정보 수정 <br> 3. 지정된 단말기로 사용자 정보 뿌리기
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>

## 5.2.사용
- 임직원 출입증 사용
  
  ⏰️ TIP <br> 1. 총무담당자가 임직원에게 출입증 전달 <br> 2. 임직원 출퇴근시 출입증 사용 <br> 3. 지정된 단말기에 출입증 태그
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>

## 5.3.회수
- 퇴사자 출입증 반납
  
  ⏰️ TIP <br> 1. 출입증 총무담당자에게 반납 <br> 2. 출입권한 해제 <br> 3. 복합기 UID 삭제
  {: .notice}

<a href="#" class="btn btn--success">Back to top</a>
<br>

<br><br>
# 6.PC
## 6.1.노트북 렌탈 신청
## 6.2.노트북 반납




