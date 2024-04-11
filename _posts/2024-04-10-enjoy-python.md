---
layout: post
title:  "Your Working Space"
---

## AI model 
### Decoder Model 
* M.E
* Solar
  * LLaMA2 아키텍쳐럴 upsate에서 Depth Up-Scaling 기술을 이용하여 제작한 모델
* Mistral
  * Sliding window attention, Rolling Buffer Cache 등의 기술을 이용하여 제작한 모델
  * LLaMA2 13B 보다 좋은 성능
* LLaMA2
  * 메타에서 제작한 대규모 AI 언어모델로 LLaMA1 보다 더 많은 2조개의 토큰을 학습한 모델

### Encoder Model 
* Klue roberta large
  * 기존의 bert에서 학습 방식을 발전 시켜 만든 roberta 를 klue 데이터로 사전 학습 시킨 모델
* KcELECTRA base
  * 기존의 bert의 MLM 학습이 아닌 RTD 학습 방법은 채택한 ELECTRA를 온라인 뉴스와 댓글을 수집해 사전 학습 시킨 모델 
