---
layout: post
title: "논문 리뷰, 2024년 4월"
---

##Toward a Theory of Tokenization in LLMs
Nived Rajaraman, Jiantao Jiao, Kannan Ramchandran

선행 지식: 

1. BPE, Unigram 방식 (GPT2)
2. Markov Chain 원리

키워드: Transformer, Data Generation, Markov, Tokenization

요약: 
1. Tokenizer를 사용하지 않은 Transformer의 Markov Process Prediction은 Stationary Distribution을 기반으로 이루어지는데, 이러면 cross-entropy loss가 높게 나타난다 (Dynamics를 고려하지 못함)
2. 간단한 Tokenizer를 적용하기만 해도 Transformer의 near-optimal cross entropy loss를 달성하는 것으로 나타난다
3. 고도화된 Tokenizer를 사용할수록 target cross-entropy를 달성하기 위한 dictionary의 크기가 작아진다. 즉, computationally efficient한 prediction을 할 수 있게 된다




