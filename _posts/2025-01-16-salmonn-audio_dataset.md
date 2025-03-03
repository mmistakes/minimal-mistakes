---
layout: single
title: "Audio Benchmark Dataset(SALMONN: Paper Review)"
categories:
  - hackathon_audiodata
tags:
  - AI
  - AudioLM
  - Lightweight
  - Paper_review
author_profile: false
---

# About. Audio Benchmark Dataset

**Audiocaps, Gigaspeech, WavCaps, Librispeech, Clotho**



## **1. AudioCaps**

- **설명**
  - **오디오 캡셔닝(AAC) 작업**을 위해 설계된 대규모 데이터셋
  - "오디오 클립 + 해당 텍스트 설명" 쌍으로 구성

- **출처**: AudioSet 데이터셋에서 추출된 10초 길이의 YouTube 오디오 클립 기반
- **주요 특징**
  - 약 **46,000개의 오디오-텍스트 쌍**으로 구성.
  - **사람(Amazon Mechanical Turk)이 작성**한 캡션 포함
  - **다양한 환경 소리와 이벤트**를 설명하며, 자연어로 오디오 내용을 서술
- **용도**
  - 자동 오디오 캡셔닝(AAC)
  - 오디오 이벤트 탐지 및 텍스트 생성 연구



## **2. GigaSpeech**

- **설명**: **영어 음성 인식**을 위한 대규모 데이터셋
- **출처**: **다양한 도메인에서 수집된 데이터**를 포함(오디오북, 팟캐스트, YouTube 등)
- **주요 특징**:
  - 약 **10,000시간의 고품질 라벨링된 음성 데이터** 제공
  - 읽기 스타일, 즉흥적 발화 스타일 모두 포함
  - 다양한 주제 다룸(예술, 과학, 스포츠 등)
  - 여러 크기의 하위 세트(XS, S, M, L, XL)로 구성 - 학습 요구에 맞게 선택 가능
- **용도**:
  - 자동 음성 인식(ASR)
  - 텍스트-음성 변환(TTS) 및 텍스트-오디오 변환 연구



## **3. WavCaps**

- **설명**
  - <u>ChatGPT를 활용, 약간의 라벨링</u>만 이루어진 대규모 **오디오 캡셔닝** 데이터셋
  - 약 **400,000개의 오디오 클립과 캡션 쌍**으로 구성

- **출처**: BBC Sound Effects, FreeSound, AudioSet 등
- **주요 특징**:
  - 평균 오디오 길이: 약 67.59초
  - ChatGPT 기반의 세 단계 처리 파이프라인으로 고품질 캡션 생성
  - 다양한 소리 이벤트 포괄(짧은 클립, 단일 이벤트 중심)
- **용도**:
  - 오디오 캡셔닝 연구
  - 멀티모달 연구(AudioLM 모델)



## **4. LibriSpeech**

- **설명**
  - 영어 읽기 음성 데이터를 기반으로 한 **자동 음성 인식** 데이터셋
  - 약 **1,000시간의 녹음된 오디오북 데이터**로 구성

- **출처**: 공공 도메인 오디오북(Provided by. LibriVox 프로젝트)
- **주요 특징**:
  - "clean" 및 "other"로 나뉘며, 발화 품질에 따라 분류
  - 학습 세트는 총 3개로 나뉨 (100시간: train-100, 360시간: train-360, 500시간: train-500)
- **용도**:
  - ASR 모델 학습 및 평가(기준: Word Error Rate(WER))



## **5. Clotho**

- **설명**: 
  - 다양한 환경 소리 및 이를 설명하는 텍스트로 구성
  - 오디오 캡셔닝 작업을 위해 설계된 데이터셋

- **출처**: Freesound 플랫폼에서 수집된 오디오 샘플
- **주요 특징**:
  - 각 샘플은 길이가 약 15~30초 / 하나의 샘플당 최대 다섯 개의 캡션 제공(8~20단어)
  - 총 약 6,972개의 샘플, 약 34,860개의 캡션 포함(Clotho v2 기준)
  - Amazon Mechanical Turk를 통해 크라우드소싱 방식으로 캡션 수집
- **용도**:
  - 자동 오디오 캡셔닝(AAC).
  - DCASE 챌린지와 같은 평가 작업 수행
