---
title: '[NLP] Text generation'
author: 차상진
date: '2025-03-17'
---
# 1. 그리디 서치 디코딩

`-` 그리디 서치 디코딩의 이해

처음 문장($x=x_1,...,x_k$) 이 주어질 때 텍스트에 등장하는 토큰 시퀀스 ($y=y_1,...,y_t$)의 확률 $P(y|x)$를 추정하도록 사전 훈련된다.

하지만 직접 $P(y|x)$을 추정하려면 방대한 양의 훈련데이터가 필요하므로 **연쇄법칙(Chain Rule of Probability)** 을 사용해 조건부 확률의 곱으로 나타낸다.

$P(y_1, ..., y_t | x) = \prod_{t=1}^{N} P(y_t | y_{<t}, x)$

계산된 확률을 기반으로, 각 시점 t에서 가장 확률이 높은 단어를 선택하여 다음 단어를 예측한다.   

`-` 아래는 그리디 서치 디코딩의 구현이다.


```python
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

device = "cuda" if torch.cuda.is_available() else "cpu"
model_name = "gpt2-xl"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name).to(device)
```

    2025-03-17 17:53:47.780280: E external/local_xla/xla/stream_executor/cuda/cuda_fft.cc:467] Unable to register cuFFT factory: Attempting to register factory for plugin cuFFT when one has already been registered
    WARNING: All log messages before absl::InitializeLog() is called are written to STDERR
    E0000 00:00:1742234027.798227   18290 cuda_dnn.cc:8579] Unable to register cuDNN factory: Attempting to register factory for plugin cuDNN when one has already been registered
    E0000 00:00:1742234027.803855   18290 cuda_blas.cc:1407] Unable to register cuBLAS factory: Attempting to register factory for plugin cuBLAS when one has already been registered
    W0000 00:00:1742234027.817808   18290 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    W0000 00:00:1742234027.817823   18290 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    W0000 00:00:1742234027.817825   18290 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    W0000 00:00:1742234027.817827   18290 computation_placer.cc:177] computation placer already registered. Please check linkage and avoid linking the same target more than once.
    2025-03-17 17:53:47.822310: I tensorflow/core/platform/cpu_feature_guard.cc:210] This TensorFlow binary is optimized to use available CPU instructions in performance-critical operations.
    To enable the following instructions: AVX2 FMA, in other operations, rebuild TensorFlow with the appropriate compiler flags.



```python
import pandas as pd

input_txt = "Transformers are the"
input_ids = tokenizer(input_txt, return_tensors="pt")["input_ids"].to(device)
iterations = [] # 스텝별로 예측된 단어들을 저장할 리스트
n_steps = 8 # 최대 8개의 단어를 추가 생성
choices_per_step = 5 # 각 스텝에서 가장 높은 확률을 가진 5개의 단어를 저장

with torch.no_grad(): # 학습이 아니라 예측을 수행하므로 gradient 계산을 비활성화
    for _ in range(n_steps): 
        iteration = dict() 
        iteration["Input"] = tokenizer.decode(input_ids[0]) # 딕셔너리 생성 후 현재까지의 문장을 저장
        output = model(input_ids=input_ids) # 현재 문장을 모델에 입력하려 다음 단어의 확률을 얻음.
        # 첫 번째 배치의 마지막 토큰의 로짓을 선택해 소프트맥스를 적용합니다.
        next_token_logits = output.logits[0, -1, :]
        next_token_probs = torch.softmax(next_token_logits, dim=-1)
        sorted_ids = torch.argsort(next_token_probs, dim=-1, descending=True)
        # 가장 높은 확률의 토큰을 저장합니다.
        for choice_idx in range(choices_per_step):
            token_id = sorted_ids[choice_idx]
            token_prob = next_token_probs[token_id].cpu().numpy()
            token_choice = (
                f"{tokenizer.decode(token_id)} ({100 * token_prob:.2f}%)"
            )
            iteration[f"Choice {choice_idx+1}"] = token_choice
        # 예측한 다음 토큰을 입력에 추가합니다.
        input_ids = torch.cat([input_ids, sorted_ids[None, 0, None]], dim=-1)
        iterations.append(iteration)

pd.DataFrame(iterations)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Input</th>
      <th>Choice 1</th>
      <th>Choice 2</th>
      <th>Choice 3</th>
      <th>Choice 4</th>
      <th>Choice 5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Transformers are the</td>
      <td>most (8.53%)</td>
      <td>only (4.96%)</td>
      <td>best (4.65%)</td>
      <td>Transformers (4.37%)</td>
      <td>ultimate (2.16%)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Transformers are the most</td>
      <td>popular (16.78%)</td>
      <td>powerful (5.37%)</td>
      <td>common (4.96%)</td>
      <td>famous (3.72%)</td>
      <td>successful (3.20%)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Transformers are the most popular</td>
      <td>toy (10.63%)</td>
      <td>toys (7.23%)</td>
      <td>Transformers (6.60%)</td>
      <td>of (5.46%)</td>
      <td>and (3.76%)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Transformers are the most popular toy</td>
      <td>line (34.38%)</td>
      <td>in (18.20%)</td>
      <td>of (11.71%)</td>
      <td>brand (6.10%)</td>
      <td>line (2.69%)</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Transformers are the most popular toy line</td>
      <td>in (46.28%)</td>
      <td>of (15.09%)</td>
      <td>, (4.94%)</td>
      <td>on (4.40%)</td>
      <td>ever (2.72%)</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Transformers are the most popular toy line in</td>
      <td>the (65.99%)</td>
      <td>history (12.42%)</td>
      <td>America (6.91%)</td>
      <td>Japan (2.44%)</td>
      <td>North (1.40%)</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Transformers are the most popular toy line in the</td>
      <td>world (69.26%)</td>
      <td>United (4.55%)</td>
      <td>history (4.29%)</td>
      <td>US (4.23%)</td>
      <td>U (2.30%)</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Transformers are the most popular toy line in ...</td>
      <td>, (39.73%)</td>
      <td>. (30.64%)</td>
      <td>and (9.87%)</td>
      <td>with (2.32%)</td>
      <td>today (1.74%)</td>
    </tr>
  </tbody>
</table>
</div>




```python
input_ids = tokenizer(input_txt, return_tensors="pt")["input_ids"].to(device)
output = model.generate(input_ids, max_new_tokens=n_steps, do_sample=False)
print(tokenizer.decode(output[0]))
```

    Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.


    Transformers are the most popular toy line in the world,



```python
max_length = 128
input_txt = """In a shocking finding, scientist discovered \
a herd of unicorns living in a remote, previously unexplored \
valley, in the Andes Mountains. Even more surprising to the \
researchers was the fact that the unicorns spoke perfect English.\n\n
"""
input_ids = tokenizer(input_txt, return_tensors="pt")["input_ids"].to(device)
output_greedy = model.generate(input_ids, max_length=max_length,
                               do_sample=False)
print(tokenizer.decode(output_greedy[0]))
```

    Setting `pad_token_id` to `eos_token_id`:50256 for open-end generation.


    In a shocking finding, scientist discovered a herd of unicorns living in a remote, previously unexplored valley, in the Andes Mountains. Even more surprising to the researchers was the fact that the unicorns spoke perfect English.
    
    
    The researchers, from the University of California, Davis, and the University of Colorado, Boulder, were conducting a study on the Andean cloud forest, which is home to the rare species of cloud forest trees.
    
    
    The researchers were surprised to find that the unicorns were able to communicate with each other, and even with humans.
    
    
    The researchers were surprised to find that the unicorns were able


`-` 그리디 서치 디코딩은 각 타임스텝에서 확률이 가장 높은 토큰을 탐욕적(greedily)으로 선택하는 방식이다.

    하지만 이것은 사실 최적의 디코딩 방식이 아니다. 가장 최적의 방식은 가능한 모든 경우의 수로 문장을 완성시켜놓고 그 후에 그 문장을 판단하여 가장 좋은 문장을 선택하는 방식이다.

    하지만 그것은 너무 비용이 많이 드는 문제가 있어서 그리디 서치 디코딩 방식이 연구되었지만 이 방식 또한 반복적인 출력 시퀀스를 생성하는 경향이 있다. 이로 인해 최적의 솔루션을 만들기는 어렵다.

# 2. 빔 서치 디코딩

`-` 빔 서치는 각 스텝에서 확률이 가장 높은 토큰을 디코딩하는 대신, 확률이 가장 높은 상위 b개의 다음 토큰을 추적한다.
    
    빔 세트는 기존 세트에서 가능한 모든 다음 토큰을 확장한 후 확률이 가장 높은 b개의 확장을 선택하여 구성한다.

    이 과정은 최대 길이나 EOS토큰에 도달할 때까지 반복된다.

`-` 로그확률을 이용하는 이유

    빔서치는 다음 단어의 확률을 계산할 때 기존의 곱으로 연결되던 확률이 아닌 로그를 취한 확률을 이용한다. 즉 로그확률을 이용한다.
    
    그 이유는 곱셈에서 사용되는 각 조건부 확률은 0과 1사이에 있는 작은 값이다. 이 값들은 문장의 길이가 조금만 길어지면 전체 확률이 0으로 가깝게 되는 underfolow가 쉽게 발생한다.

    아주 작은 값을 수치적으로 불안정하기에 확률에 log를 취해주면 곱셈이 덧셈으로 바뀌기에 식이 안정화된다. 이런 값은 다루기 훨씬 쉽다.

    추가적으로 log는 단조증가함수로서 확률크기를 비교만하면 되기에 log를 취해도 확률간에 대소관계는 달라지지 않기에 로그확률을 사용해도 상관없다.


```python
# 이 함수는 주어진 logits에서 특정 labels에 해당하는 로그 확률을 추출하는 함수이다.

import torch.nn.functional as F

def log_probs_from_logits(logits, labels):
    logp = F.log_softmax(logits, dim=-1)
    logp_label = torch.gather(logp, 2, labels.unsqueeze(2)).squeeze(-1)
    # unsqueeze(2)를 이용해서 logp과 labels의 차원을 맞춰줌. 그 후에 squeeze를 이용해서 크기가 1인 차원을 없앤다.
    return logp_label
```


```python
# 이 함수는 모델이 예측한 logits을 사용하여 전체 문장의 로그 확률을 계산하는 함수이다.

def sequence_logprob(model, labels, input_len=0):
    with torch.no_grad():
        output = model(labels)
        log_probs = log_probs_from_logits(
            output.logits[:, :-1, :], labels[:, 1:]) # labels[:,1:]는 정답, output.logits[:,:-1,:]은 마지막 단어를 제외한 모든 단어의 로짓
        seq_log_prob = torch.sum(log_probs[:, input_len:]) #input_len만큼의 확률을 무시하고 더한다.
    return seq_log_prob.cpu().numpy()
```

`1` **그리디 서칭 디코딩으로 만든 시퀀스 로그확률 계산**


```python
logp = sequence_logprob(model, output_greedy, input_len=len(input_ids[0]))
print(tokenizer.decode(output_greedy[0]))
print(f"\n로그 확률: {logp:.2f}")
```

    In a shocking finding, scientist discovered a herd of unicorns living in a
    remote, previously unexplored valley, in the Andes Mountains. Even more
    surprising to the researchers was the fact that the unicorns spoke perfect
    English.
    
    
    The researchers, from the University of California, Davis, and the University of
    Colorado, Boulder, were conducting a study on the Andean cloud forest, which is
    home to the rare species of cloud forest trees.
    
    
    The researchers were surprised to find that the unicorns were able to
    communicate with each other, and even with humans.
    
    
    The researchers were surprised to find that the unicorns were able
    
    로그 확률: -87.43


`2` **빔 서치 디코딩으로 만든 시퀀스 로그확률 계산**


```python
output_beam = model.generate(input_ids, max_length=max_length, num_beams=5, # num_beams을 설정하면 빔 서치 디코딩이 활성화 된다. (가장 가능성이 높은 5문장을 동시탐색)
                             do_sample=False) # do_sample=False는 샘플링을 하지 않고 결정론적 방식으로 단어를 선택(항상 같은 문장이 생성됨)
logp = sequence_logprob(model, output_beam, input_len=len(input_ids[0]))
print(tokenizer.decode(output_beam[0]))
print(f"\n로그 확률: {logp:.2f}")
```

    In a shocking finding, scientist discovered a herd of unicorns living in a
    remote, previously unexplored valley, in the Andes Mountains. Even more
    surprising to the researchers was the fact that the unicorns spoke perfect
    English.
    
    
    The discovery of the unicorns was made by a team of scientists from the
    University of California, Santa Cruz, and the National Geographic Society.
    
    
    The scientists were conducting a study of the Andes Mountains when they
    discovered a herd of unicorns living in a remote, previously unexplored valley,
    in the Andes Mountains. Even more surprising to the researchers was the fact
    that the unicorns spoke perfect English
    
    로그 확률: -55.23


`-` **빔 서치 디코딩 no_repeat_ngram_size 옵션 활성화**

    no_repeat_ngram_size은 빔 서치도 텍스트가 반복되는 문제가 있기에 그 문제를 해결하기 위해 n-그램 페널티를 부과하는 옵션이다.


```python
output_beam = model.generate(input_ids, max_length=max_length, num_beams=5,
                             do_sample=False, no_repeat_ngram_size=2) # 생성된 문장에서 동일한 연속된 n개의 단어가 반복되지 않도록 제한하는 옵션.
                             # 빔 서치도 텍스트가 반복되는 문제가 있기에 no_repeat_ngram_size을 설정한다.
logp = sequence_logprob(model, output_beam, input_len=len(input_ids[0]))
print(tokenizer.decode(output_beam[0]))
print(f"\n로그 확률: {logp:.2f}")
```

    In a shocking finding, scientist discovered a herd of unicorns living in a
    remote, previously unexplored valley, in the Andes Mountains. Even more
    surprising to the researchers was the fact that the unicorns spoke perfect
    English.
    
    
    The discovery was made by a team of scientists from the University of
    California, Santa Cruz, and the National Geographic Society.
    
    According to a press release, the scientists were conducting a survey of the
    area when they came across the herd. They were surprised to find that they were
    able to converse with the animals in English, even though they had never seen a
    unicorn in person before. The researchers were
    
    로그 확률: -93.12


**점수는 낮아졌지만 텍스트가 일관성을 유지하기에 결과는 좋다!**

`!` 참고로 당연히 각 시점에서의 로그확률은 음수이다 (0과 1사이의 값에 로그를 취하면 음수이기에...)

    하지만 1에 가까울 수록 절댓값은 더 작아지기에 시퀀스의 로그확률(모두 더한 값)은 0에 가까우면 가까울수록 좋은 것이다. (양수는 불가능)
