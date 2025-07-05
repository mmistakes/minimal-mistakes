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
# 마크다운
## 안내문구
> 📓 NOTE <br>
> Useful information that users should know, even when skimming content.
> {: .notice--info}
> ⏰️ TIP <br>
> Helpful advice for doing things better or more easily.
> {: .notice}
> ❗️ IMPORTANT <br>
> Key information users need to know to achieve their goal.
> {: .notice--primary}
> ⛔️ WARNING <br>
> Urgent info that needs immediate user attention to avoid problems.
> {: .notice--warning}
> ⚠️ CAUTION <br>
> Advises about risks or negative outcomes of certain actions.
> {: .notice--danger}
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 헤더문법
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

## Quote(인용)문법
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

## 수평선
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
# ERP
## AP전표
```sql
select * from ap_invoices_all;
select * from ap_invoice_distributions_all;
  ```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## AR전표
```sql
select * from ra_customer_trx_all;
select * from ra_customer_lines_all;
```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## GL전표
```sql
select * from gl_je_headers;
select * from gl_je_lines;
```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 거래처
### 매입(AP)
  ```sql
  select * from po_vendors;
  select * from po_vendor_sites_all;
  ```
### 매출(AR)
  ```sql
  select * from ra_customers;
  ```
  
<a href="#" class="btn btn--success">Back to top</a>
<br>

## AR Receipt
```sql
select * from ar_cash_receipts_all;
select * from ar_receipt_applications_all;
```
<a href="#" class="btn btn--success">Back to top</a>
<br>

## 인터페이스 에러
- Salesperson 미등록
  ```sql
  # 에러내역: Other Error : ORA-01403: no data found
  --1. 제품서비스 등록이 되어있는지 확인
  --2. 미등록 제품서비스인 경우 회계팀에 요청하여 등록
  --3. 인터페이스 재실행 후 전표 생성
  */
  ```
- 인터페이스 진행중 상태
  ```sql
  /*
  # 현상: INTERFACE_FLAG 값이 'P' , ERP_IMPORT_FLAG 값이 'Y' , JOURNAL_NAME이 NULL인 상태
  --1. gl_interface 테이블에 내역이 있는지 확인
  --2. 내역 있으면 삭제
  --3. 인터페이스 초기화 (INTERFACE_FLAG = 'N' , ERP_IMPORT_FLAG 값이 'N') 및 재실행 후 전표 생성
  */
  ```

<a href="#" class="btn btn--success">Back to top</a>
<br>

<br><br>
# 그룹웨어
## 메일 보내기
<br>
<a href="#" class="btn btn--success">Back to top</a>
<br>

<br><br>
# 윈도우
## 환경변수



