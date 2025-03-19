---
layout: single
title: "AI 오디오 뉴스 앱 아키텍처 설계"
categories: SideProject
tags: [AI, TTS, 뉴스 앱, React Native, Spring Boot, Architecture]
# toc_label: 목차
author_profile: true
search: true
sidebar:
  nav: "counts"
---

# 🏗️ 뉴스 앱 아키텍처 설계 및 기술 조사

## 📌 개요

이 문서는 뉴스 요약 및 오디오 변환 기능을 제공하는 뉴스 앱의 **소프트웨어 아키텍처 설계 및 기술 조사** 내용을 정리한 것입니다.  
MVP 개발을 위해 필요한 **기획, 기술 검토, API 조사**를 포함합니다.

---

## 🔹 1. 요구사항 분석 (Requirement Analysis)

### 🎯 **핵심 기능**

- **뉴스 수집**: RSS 및 뉴스 API를 통해 최신 뉴스 데이터 확보
- **AI 요약**: OpenAI API를 활용한 뉴스 자동 요약
- **TTS 변환**: AI 기반 음성 변환 (Google TTS, Amazon Polly 등)
- **맞춤형 피드**: 사용자의 관심 카테고리에 맞춰 뉴스 추천
- **오디오 뉴스**: 뉴스 내용을 음성으로 듣기 가능 (속도 조절 지원)
- **뉴스 저장 및 공유**: 즐겨찾기 및 SNS 공유 기능 제공

---

## 🔹 2. 시스템 아키텍처 설계 (System Architecture Design)

### 📌 **아키텍처 다이어그램**

<!-- ```mermaid -->
<!-- flowchart TD
    User[📱 사용자] ->|요청| Frontend[🌐 React Native]
    Frontend ->|API 요청| Backend[🖥️ Spring Boot API]
    Backend ->|데이터 요청| Database[(🗄️ MySQL)]
    Backend ->|뉴스 데이터 요청| NewsAPI[📰 뉴스 API / RSS]
    Backend ->|AI 요약 요청| OpenAI[🤖 AI 요약 API]
    Backend ->|TTS 변환 요청| TTS_API[🎤 TTS 변환 API] -->
<!-- ``` -->

<img src="/assets/images/NewsApp_FlowChart.png" alt="flowChart" width="70%">{: .align-center}

<!-- ![flowChart](/assets/images/NewsApp_FlowChart.png){: .img-width-half .align-center} -->

---

## 🔹 3. 기술 스택 선정 (Tech Stack Selection)

| 구성요소        | 기술선택                        | 설명                         |
| --------------- | ------------------------------- | ---------------------------- |
| 프론트엔드      | React Native                    | 크로스플랫폼 앱 개발         |
| 백엔드          | Spring Boot (JPA)               | REST API 개발 및 데이터 처리 |
| 데이터베이스    | MySQL                           | 사용자 데이터 및 뉴스 저장   |
| 뉴스 데이터     | 네이버 뉴스 API, RSS            | 실시간 뉴스 수집             |
| AI 요약         | OpenAI GPT API                  | 뉴스 자동 요약 기능          |
| 음성 변환 (TTS) | Google Cloud TTS / Amazon Polly | 뉴스 오디오 변환             |
| 호스팅          | AWS (EC2, RDS)                  | 서버 및 데이터베이스 호스팅  |

---

## 🔹 4. API 조사 (API Research)

### 📰 뉴스 API

TBD

### 🎤 TTS API

TBD

---

## 🔹 5. 데이터 흐름 (Data Flow)

1️⃣ 사용자가 앱을 실행하면 최신 뉴스 데이터를 불러옴 <br>
2️⃣ 뉴스 데이터는 네이버 뉴스 API 또는 RSS에서 가져옴 <br>
3️⃣ AI 요약 API를 호출해 뉴스 내용을 요약 <br>
4️⃣ TTS API를 호출하여 뉴스 내용을 음성으로 변환 <br>
5️⃣ 사용자가 뉴스 저장 또는 공유 가능

<!-- ```mermaid -->
<!-- sequenceDiagram
    participant User as 사용자
    participant Frontend as React Native
    participant Backend as Spring Boot API
    participant DB as MySQL (뉴스 DB)
    participant NewsAPI as 뉴스 API
    participant AI as OpenAI (GPT 요약)
    participant TTS as TTS API (Google/Amazon)

    %% 1. 기본 기사 조회 흐름
    User ->> Frontend: 뉴스 요청
    Frontend ->> Backend: 뉴스 데이터 요청
    Backend ->> DB: DB에서 뉴스 조회
    alt 뉴스가 DB에 없음
        Backend ->> NewsAPI: 뉴스 기사 요청
        NewsAPI ->> Backend: 기사 데이터 반환
        Backend ->> AI: AI 요약 요청
        AI ->> Backend: 요약된 뉴스 반환
        Backend ->> DB: 뉴스 + 요약 데이터 저장
    end
    Backend ->> Frontend: 요약 뉴스 & 전체 기사 URL 반환
    Frontend ->> User: 요약 뉴스 목록 표시

    %% 2. 사용자가 오디오 변환 요청하는 흐름
    User ->> Frontend: 특정 뉴스 오디오 변환 요청 (체크한 기사)
    Frontend ->> Backend: 선택한 기사 TTS 요청
    Backend ->> DB: DB에서 해당 기사 오디오 존재 여부 확인
    alt 오디오가 DB에 없음
        Backend ->> AI: AI 요약 요청 (오디오용 요약)
        AI ->> Backend: 오디오용 요약 뉴스 반환
        Backend ->> TTS: 텍스트 음성 변환 요청
        TTS ->> Backend: 음성 파일 반환
        Backend ->> DB: 변환된 오디오 저장
    end
    Backend ->> Frontend: 오디오 URL 반환
    Frontend ->> User: 선택된 뉴스 오디오 재생 -->

<!-- ``` -->

<img src="/assets/images/NewsApp_SequenceDiagram.png" alt="sequenceDiagram" width="80%">{: .align-center}

<!-- ![sequenceDiagram](/assets/images/NewsApp_SequenceDiagram.png) -->

---

## 🔹 6. MVP 개발 계획 (MVP Development Plan)

### 🎯 1차 목표 (MVP)

✅ 뉴스 데이터 수집 (네이버 뉴스 API / RSS) <br>
✅ AI 요약 기능 (OpenAI API 활용) <br>
✅ TTS 변환 기능 (Google Cloud TTS 또는 Amazon Polly) <br>
✅ React Native 앱 개발 (기본 UI 구현)

### 🚀 2차 목표

🔹 개인 맞춤형 뉴스 추천 <br>
🔹 오디오 뉴스 재생 속도 조절 <br>
🔹 북마크 & 공유 기능

---

## 🔹 7. 결론 및 차별점

✅ AI 기반 뉴스 요약 + 오디오 변환 기능 제공 <br>
✅ 출퇴근길, 운동 중에도 "듣는 뉴스" 소비 가능 <br>
✅ 무료 API 활용으로 초기 개발 비용 절감 <br>
✅ 단순 뉴스 요약이 아닌 맞춤형 피드 제공 (추천 뉴스)

## 🔹 8. 관련링크 & 참고자료

- [네이버 뉴스 API](https://developers.naver.com/docs/serviceapi/search/news/news.md)
- [GNews](https://gnews.io/)
- [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech)
- [Amazon Polly](https://aws.amazon.com/ko/polly/)
- [OpenAI API](https://platform.openai.com/docs/overview)
