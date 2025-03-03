---
layout: single
title: "Multiple tasks(SALMONN: Paper Review)"
categories: hackathon_baseline
tags:
  - AI
  - AudioLM
  - Lightweight
  - Paper_review
author_profile: false
---

# **Multiple tasks used in train SALMONN stage2**



## **1. ASR (Automatic Speech Recognition)**

- **설명**: 입력된 음성을 텍스트로 변환하는 작업
- **데이터 소스**:
  - **LibriSpeech**: 오디오북 데이터셋으로, 음성 인식 연구에서 널리 사용
  - **GigaSpeech**: 대규모 음성 데이터셋으로, 다양한 도메인에서 수집된 음성 포함
- **목적**: SALMONN이 음성 데이터를 정확히 텍스트로 변환할 수 있도록 학습

## **2. En2Zh (English-to-Chinese Speech Translation)**

- **설명**: 영어 음성을 중국어 텍스트로 번역하는 작업
- **데이터 소스**:
  - **CoVoST2-En2Zh**: 다국어 음성 번역 데이터셋(영어에서 중국어로 번역된 데이터 포함)
- **목적**: SALMONN이 다국어 번역 작업을 수행할 수 있도록 학습.

## **3. AAC (Automated Audio Captioning)**

- **설명**: 오디오 클립의 내용을 자연어로 설명하는 작업
- **데이터 소스**:
  - **AudioCaps**: 다양한 환경 소리와 그에 대한 텍스트 설명을 포함하는 데이터셋
  - **Clotho**: 오디오 캡셔닝 연구를 위해 설계된 데이터셋
- **목적**: SALMONN이 오디오 데이터를 이해하고 이를 텍스트로 설명할 수 있도록 학습

## **4. PR (Phone Recognition)**

- **설명**: 음성을 세분화하여 개별적인 음소(phoneme)를 식별하는 작업
- **데이터 소스**:
  - **LibriSpeech**: 음소 인식 연구에 사용되는 고품질 데이터셋
- **목적**: SALMONN이 세부적인 발음 정보를 처리하고 분석할 수 있도록 학습

## **5. ER (Emotion Recognition)**

- **설명**: 음성 데이터를 기반으로 화자의 감정을 인식하는 작업
- **데이터 소스**:
  - **IEMOCAP**: 감정 표현이 포함된 대화형 데이터셋
- **목적**: SALMONN이 감정을 이해하고 이를 분류할 수 있도록 학습

## **6. MC (Music Captioning)**

- **설명**: 음악 클립의 내용을 텍스트로 설명하는 작업
- **데이터 소스**:
  - **MusicCaps**: 음악의 분위기, 악기, 장르 등을 설명하는 캡션 데이터셋
- **목적**: SALMONN이 음악 데이터를 분석하고 이를 자연어로 표현할 수 있도록 학습

## **7. OSR (Overlapped Speech Recognition)**

- **설명**: 여러 화자가 동시에 말하는 상황에서 각각의 발화를 인식하는 작업
- **데이터 소스**:
  - **LibriMix**: 겹치는 음성을 포함한 데이터셋으로, 화자 분리 및 인식을 지원
- **목적**: SALMONN이 복잡한 오디오 환경에서도 정확히 발화를 분리하고 인식할 수 있도록 학습

## **8. SV (Speaker Verification)**

- **설명**: 특정 화자가 말한 내용인지 확인하는 작업
- **데이터 소스**:
  - **VoxCeleb1**: 다양한 화자의 음성을 포함한 대규모 데이터셋
- **목적**: SALMONN이 화자를 식별하거나 인증할 수 있는 능력을 갖추도록 학습

## **9. GR (Gender Recognition)**

- **설명**: 화자의 성별을 인식하는 작업
- **데이터 소스**:
  - **LibriSpeech**: 성별 정보가 포함된 음성 데이터 활용
- **목적**: SALMONN이 화자의 성별을 정확히 분류할 수 있도록 학습

## 10~12 - QA (ChatGPT를 활용한 텍스트 캡셔닝 task)



## **10. SQA (Speech Question Answering)**

- **설명**: 음성 데이터를 기반으로 질문에 답변하는 작업
- **데이터 소스**:
  - **LibriSpeech**: 질문과 답변 형식의 데이터를 생성하여 활용
- **목적**: SALMONN이 음성을 이해하고 질문에 답변할 수 있도록 학습

## **11. AQA (Audio Question Answering)**

- **설명**: 오디오 클립의 내용을 기반으로 질문에 답변하는 작업
- **데이터 소스**:
  - **WavCaps / AudioCaps**: 오디오와 관련된 질문과 답변 데이터 포함
- **목적**: SALMONN이 오디오 정보를 분석하고 질문에 답변할 수 있도록 학습

## **12. MQA (Music Question Answering)**

- **설명**: 음악 클립을 기반으로 질문에 답변하는 작업
- **데이터 소스**:
  - **MillionSong / MusicNet**: 음악 관련 질문과 답변 데이터 포함
- **목적**: SALMONN이 음악 콘텐츠를 이해하고 이에 대한 질문에 답변할 수 있도록 학습



