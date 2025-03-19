---
title: "[NLP] Text Classification Fine Tuning"
author: "차상진"
date: "2025-03-16"
---
`-` **colab에서 실습하길 바랍니다.**


```python
!git clone https://github.com/rickiepark/nlp-with-transformers.git
%cd nlp-with-transformers
from install import *
install_requirements(chapter=2)
```

    Cloning into 'nlp-with-transformers'...
    remote: Enumerating objects: 653, done.[K
    remote: Counting objects: 100% (36/36), done.[K
    remote: Compressing objects: 100% (11/11), done.[K
    remote: Total 653 (delta 32), reused 25 (delta 25), pack-reused 617 (from 2)[K
    Receiving objects: 100% (653/653), 62.59 MiB | 9.75 MiB/s, done.
    Resolving deltas: 100% (333/333), done.
    Updating files: 100% (118/118), done.
    /content/nlp-with-transformers
    ⏳ Installing base requirements ...
    ✅ Base requirements installed!
    Using transformers v4.48.3
    Using datasets v3.3.2
    Using accelerate v1.3.0
    Using sentencepiece v0.2.0
    Using umap v0.5.7


## 1. Data loading & Emotion encoding


```python
# 허깅페이스 데이터셋을 사용하기
from huggingface_hub import list_datasets
from datasets import load_dataset
from datasets import ClassLabel

emotions = load_dataset("emotion")

from transformers import AutoTokenizer
emotions['train'].features['label'] = ClassLabel(num_classes=6, names=['sadness', 'joy', 'love', 'anger', 'fear', 'surprise'])
model_ckpt = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_ckpt)

def tokenize(batch):
    return tokenizer(batch["text"], padding=True, truncation=True)

emotions_encoded = emotions.map(tokenize, batched=True, batch_size=None)
```

    /usr/local/lib/python3.11/dist-packages/huggingface_hub/utils/_auth.py:94: UserWarning: 
    The secret `HF_TOKEN` does not exist in your Colab secrets.
    To authenticate with the Hugging Face Hub, create a token in your settings tab (https://huggingface.co/settings/tokens), set it as secret in your Google Colab and restart your session.
    You will be able to reuse this secret in all of your notebooks.
    Please note that authentication is recommended but still optional to access public models or datasets.
      warnings.warn(



    README.md:   0%|          | 0.00/9.05k [00:00<?, ?B/s]



    train-00000-of-00001.parquet:   0%|          | 0.00/1.03M [00:00<?, ?B/s]



    validation-00000-of-00001.parquet:   0%|          | 0.00/127k [00:00<?, ?B/s]



    test-00000-of-00001.parquet:   0%|          | 0.00/129k [00:00<?, ?B/s]



    Generating train split:   0%|          | 0/16000 [00:00<?, ? examples/s]



    Generating validation split:   0%|          | 0/2000 [00:00<?, ? examples/s]



    Generating test split:   0%|          | 0/2000 [00:00<?, ? examples/s]



    tokenizer_config.json:   0%|          | 0.00/48.0 [00:00<?, ?B/s]



    config.json:   0%|          | 0.00/483 [00:00<?, ?B/s]



    vocab.txt:   0%|          | 0.00/232k [00:00<?, ?B/s]



    tokenizer.json:   0%|          | 0.00/466k [00:00<?, ?B/s]



    Map:   0%|          | 0/16000 [00:00<?, ? examples/s]



    Map:   0%|          | 0/2000 [00:00<?, ? examples/s]



    Map:   0%|          | 0/2000 [00:00<?, ? examples/s]


`-` 코드 설명
1. emotion 데이터를 불러온다.
2. emotion 데이터에서 train에 있는 레이블을 6개의 감정으로 할당해준다.
3. model을 설정하고 tokenizer도 모델에 맞게 불러온다.
4. tokenize 함수를 선언하고 문장 길이를 맞추기 위해 padding과 truncation을 True로 설정한다.
5. emotion을 토크나이징 한다.

## Text tokenizing


```python
from transformers import AutoModel
import torch
from sklearn.metrics import accuracy_score, f1_score

text = "this is a test"
inputs = tokenizer(text, return_tensors="pt")
inputs['input_ids'].size()
```




    torch.Size([1, 6])



`-` 코드 설명
1. 임의의 테스트 text를 생성 후 토크나이징을 해준다.
2. tokenizer가 반환하는 데이터를 PyTorch 텐서(torch.Tensor) 형식으로 변환하기 위해서 return_tensors="pt"를 설정한다.

## 3. HF login


```python
from huggingface_hub import notebook_login

notebook_login()
```


    VBox(children=(HTML(value='<center> <img\nsrc=https://huggingface.co/front/assets/huggingface_logo-noborder.sv…


## 4. model


```python
from transformers import AutoModelForSequenceClassification

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
num_labels = 6
model_ckpt = "distilbert-base-uncased"

# distilbert-base-uncased가 바디이고 AutoModelForSequenceClassification가 헤드이다.
# num_label이 6이므로 6개의 감정 클래스를 분류하는 헤드 하나가 추가된 것이다.
model = (AutoModelForSequenceClassification
         .from_pretrained(model_ckpt, num_labels=num_labels)
         .to(device))
```


    model.safetensors:   0%|          | 0.00/268M [00:00<?, ?B/s]


`-` 코드 설명
1. GPU를 사용하기 위해 device 설정.
2. label의 개수는 위에서 할당한 대로 6개이고 model도 선언해준다.
3. 여기서 distilbert-base-uncased은 바디이고 AutoModelForSequenceClassification은 헤드이다. 사전학습된 bert모델에 감정 클래스 분류를 위해서 헤드를 추가했다.

## 5. Learning


```python
from transformers import Trainer, TrainingArguments

batch_size = 64
logging_steps = len(emotions_encoded["train"]) // batch_size
model_name = f"{model_ckpt}-finetuned-emotion"
training_args = TrainingArguments(output_dir=model_name,
                                  num_train_epochs=2,
                                  learning_rate=2e-5,
                                  per_device_train_batch_size=batch_size,
                                  per_device_eval_batch_size=batch_size,
                                  weight_decay=0.01,
                                  evaluation_strategy="epoch",
                                  disable_tqdm=False,
                                  logging_steps=logging_steps,
                                  push_to_hub=True,
                                  save_strategy="epoch",
                                  load_best_model_at_end=True,
                                  log_level="error",
                                  report_to="none")
```

    /usr/local/lib/python3.11/dist-packages/transformers/training_args.py:1575: FutureWarning: `evaluation_strategy` is deprecated and will be removed in version 4.46 of 🤗 Transformers. Use `eval_strategy` instead
      warnings.warn(



```python
def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    f1 = f1_score(labels, preds, average="weighted")
    acc = accuracy_score(labels, preds)
    return {"accuracy": acc, "f1": f1}

trainer = Trainer(model=model, args=training_args,
                  compute_metrics=compute_metrics,
                  train_dataset=emotions_encoded["train"],
                  eval_dataset=emotions_encoded["validation"],
                  tokenizer=tokenizer)
trainer.train()
```

    <ipython-input-10-7405cf54833b>:8: FutureWarning: `tokenizer` is deprecated and will be removed in version 5.0.0 for `Trainer.__init__`. Use `processing_class` instead.
      trainer = Trainer(model=model, args=training_args,




    <div>

      <progress value='500' max='500' style='width:300px; height:20px; vertical-align: middle;'></progress>
      [500/500 03:59, Epoch 2/2]
    </div>
    <table border="1" class="dataframe">
  <thead>
 <tr style="text-align: left;">
      <th>Epoch</th>
      <th>Training Loss</th>
      <th>Validation Loss</th>
      <th>Accuracy</th>
      <th>F1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>0.816500</td>
      <td>0.306939</td>
      <td>0.911500</td>
      <td>0.910815</td>
    </tr>
    <tr>
      <td>2</td>
      <td>0.248700</td>
      <td>0.217457</td>
      <td>0.927500</td>
      <td>0.927402</td>
    </tr>
  </tbody>
</table><p>





    TrainOutput(global_step=500, training_loss=0.5326113204956054, metrics={'train_runtime': 241.4638, 'train_samples_per_second': 132.525, 'train_steps_per_second': 2.071, 'total_flos': 720342861696000.0, 'train_loss': 0.5326113204956054, 'epoch': 2.0})



`-` 코드 설명
1. training argument를 설정해준다.
2. 학습을 하고 결과를 보니 Loss, Accuracy, F1 들이 전부 향상된 것을 볼 수 있다. 즉 Fine tuning이 잘 이루어 졌다고 볼 수 있다.

## 6. Prediction


```python
output = trainer.predict(emotions_encoded["validation"])
output.metrics
```








    {'test_loss': 0.21745671331882477,
     'test_accuracy': 0.9275,
     'test_f1': 0.9274024248379652,
     'test_runtime': 3.8375,
     'test_samples_per_second': 521.167,
     'test_steps_per_second': 8.339}




```python
import numpy as np
yy = np.argmax(output.predictions,axis=1)
yy
```




    array([0, 0, 2, ..., 1, 2, 1])



## 7. Error analyze


```python
from torch.nn.functional import cross_entropy

def forward_pass_with_label(batch):
    # 모든 입력 텐서를 모델과 같은 장치로 이동합니다.
    inputs = {k:v.to(device) for k,v in batch.items()
              if k in tokenizer.model_input_names}

    with torch.no_grad(): # 역전파를 사용하지 않음 (평가 단계이므로)
        output = model(**inputs) # 입력 데이터를 모델에 전달
        pred_label = torch.argmax(output.logits, axis=-1) # 가장 높은 점수를 가진 클래스 선택
        loss = cross_entropy(output.logits, batch["label"].to(device), # loss 계산
                             reduction="none") # 평균을 내지 않고 개별 샘플의 손실을 반환

    return {"loss": loss.cpu().numpy(), # 결과를 CPU로 이동 및 numpy 배열로 변환 # PyTorch 텐서는 dataset에서 다루기 어렵다.
            "predicted_label": pred_label.cpu().numpy()}
```


```python
# 데이터셋을 다시 파이토치 텐서로 변환
emotions_encoded.set_format("torch",
                            columns=["input_ids", "attention_mask", "label"])
# 손실 값을 계산
emotions_encoded["validation"] = emotions_encoded["validation"].map(
    forward_pass_with_label, batched=True, batch_size=16)
```


    Map:   0%|          | 0/2000 [00:00<?, ? examples/s]


`-` 코드 설명
1. 모든 입력 텐서가 모델과 같아야 계산이 가능하기에 같은 장치로 이동
2. 입력 데이터를 **inputs으로 모델에 전달 후 가장 높은 logits값을 가진 클래스를 선택한다.
3. 이제 loss를 계산하고 평균을 내지 않는 이유는 label마다 loss값의 편차가 있는 것을 확인하기 위해 평균을 내지 않는다.
4. 결과를 numpy로 변환. (datasets.map() 함수는 PyTorch 텐서 대신 리스트나 NumPy 배열을 반환해야 함.)
5. 손실값을 계산하기 위해 PyTorch 텐서로 전환한다. (batch형태로 계산하기 위해서)

## 8. int -> str 변환


```python
def label_int2str(row):
    return emotions["train"].features["label"].int2str(row)

emotions_encoded.set_format("pandas")
cols = ["text", "label", "predicted_label", "loss"]
df_test = emotions_encoded["validation"][:][cols]
df_test["label"] = df_test["label"].apply(label_int2str)
df_test["predicted_label"] = (df_test["predicted_label"]
                              .apply(label_int2str))
```


```python
df_test.sort_values("loss", ascending=False).head(10)
```





  <div id="df-3cd7db83-64fb-42bb-b70f-42a31deefcd9" class="colab-df-container">
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
      <th>text</th>
      <th>label</th>
      <th>predicted_label</th>
      <th>loss</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1963</th>
      <td>i called myself pro life and voted for perry w...</td>
      <td>joy</td>
      <td>sadness</td>
      <td>5.467482</td>
    </tr>
    <tr>
      <th>1274</th>
      <td>i am going to several holiday parties and i ca...</td>
      <td>joy</td>
      <td>sadness</td>
      <td>5.429084</td>
    </tr>
    <tr>
      <th>1950</th>
      <td>i as representative of everything thats wrong ...</td>
      <td>surprise</td>
      <td>anger</td>
      <td>5.235675</td>
    </tr>
    <tr>
      <th>1500</th>
      <td>i guess we would naturally feel a sense of lon...</td>
      <td>anger</td>
      <td>sadness</td>
      <td>5.190710</td>
    </tr>
    <tr>
      <th>882</th>
      <td>i feel badly about reneging on my commitment t...</td>
      <td>love</td>
      <td>sadness</td>
      <td>5.181716</td>
    </tr>
    <tr>
      <th>1870</th>
      <td>i guess i feel betrayed because i admired him ...</td>
      <td>joy</td>
      <td>sadness</td>
      <td>5.143720</td>
    </tr>
    <tr>
      <th>1801</th>
      <td>i feel that he was being overshadowed by the s...</td>
      <td>love</td>
      <td>sadness</td>
      <td>4.943317</td>
    </tr>
    <tr>
      <th>177</th>
      <td>im sure much of the advantage is psychological...</td>
      <td>sadness</td>
      <td>joy</td>
      <td>4.789349</td>
    </tr>
    <tr>
      <th>318</th>
      <td>i felt ashamed of these feelings and was scare...</td>
      <td>fear</td>
      <td>sadness</td>
      <td>4.608293</td>
    </tr>
    <tr>
      <th>1509</th>
      <td>i guess this is a memoir so it feels like that...</td>
      <td>joy</td>
      <td>fear</td>
      <td>4.454559</td>
    </tr>
  </tbody>
</table>
</div>
    <div class="colab-df-buttons">

  <div class="colab-df-container">
    <button class="colab-df-convert" onclick="convertToInteractive('df-3cd7db83-64fb-42bb-b70f-42a31deefcd9')"
            title="Convert this dataframe to an interactive table."
            style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960">
    <path d="M120-120v-720h720v720H120Zm60-500h600v-160H180v160Zm220 220h160v-160H400v160Zm0 220h160v-160H400v160ZM180-400h160v-160H180v160Zm440 0h160v-160H620v160ZM180-180h160v-160H180v160Zm440 0h160v-160H620v160Z"/>
  </svg>
    </button>

  <style>
    .colab-df-container {
      display:flex;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    .colab-df-buttons div {
      margin-bottom: 4px;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

    <script>
      const buttonEl =
        document.querySelector('#df-3cd7db83-64fb-42bb-b70f-42a31deefcd9 button.colab-df-convert');
      buttonEl.style.display =
        google.colab.kernel.accessAllowed ? 'block' : 'none';

      async function convertToInteractive(key) {
        const element = document.querySelector('#df-3cd7db83-64fb-42bb-b70f-42a31deefcd9');
        const dataTable =
          await google.colab.kernel.invokeFunction('convertToInteractive',
                                                    [key], {});
        if (!dataTable) return;

        const docLinkHtml = 'Like what you see? Visit the ' +
          '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
          + ' to learn more about interactive tables.';
        element.innerHTML = '';
        dataTable['output_type'] = 'display_data';
        await google.colab.output.renderOutput(dataTable, element);
        const docLink = document.createElement('div');
        docLink.innerHTML = docLinkHtml;
        element.appendChild(docLink);
      }
    </script>
  </div>


<div id="df-b0422517-3da2-44a6-bc32-f7b836f3460c">
  <button class="colab-df-quickchart" onclick="quickchart('df-b0422517-3da2-44a6-bc32-f7b836f3460c')"
            title="Suggest charts"
            style="display:none;">

<svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
     width="24px">
    <g>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </g>
</svg>
  </button>

<style>
  .colab-df-quickchart {
      --bg-color: #E8F0FE;
      --fill-color: #1967D2;
      --hover-bg-color: #E2EBFA;
      --hover-fill-color: #174EA6;
      --disabled-fill-color: #AAA;
      --disabled-bg-color: #DDD;
  }

  [theme=dark] .colab-df-quickchart {
      --bg-color: #3B4455;
      --fill-color: #D2E3FC;
      --hover-bg-color: #434B5C;
      --hover-fill-color: #FFFFFF;
      --disabled-bg-color: #3B4455;
      --disabled-fill-color: #666;
  }

  .colab-df-quickchart {
    background-color: var(--bg-color);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    fill: var(--fill-color);
    height: 32px;
    padding: 0;
    width: 32px;
  }

  .colab-df-quickchart:hover {
    background-color: var(--hover-bg-color);
    box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    fill: var(--button-hover-fill-color);
  }

  .colab-df-quickchart-complete:disabled,
  .colab-df-quickchart-complete:disabled:hover {
    background-color: var(--disabled-bg-color);
    fill: var(--disabled-fill-color);
    box-shadow: none;
  }

  .colab-df-spinner {
    border: 2px solid var(--fill-color);
    border-color: transparent;
    border-bottom-color: var(--fill-color);
    animation:
      spin 1s steps(1) infinite;
  }

  @keyframes spin {
    0% {
      border-color: transparent;
      border-bottom-color: var(--fill-color);
      border-left-color: var(--fill-color);
    }
    20% {
      border-color: transparent;
      border-left-color: var(--fill-color);
      border-top-color: var(--fill-color);
    }
    30% {
      border-color: transparent;
      border-left-color: var(--fill-color);
      border-top-color: var(--fill-color);
      border-right-color: var(--fill-color);
    }
    40% {
      border-color: transparent;
      border-right-color: var(--fill-color);
      border-top-color: var(--fill-color);
    }
    60% {
      border-color: transparent;
      border-right-color: var(--fill-color);
    }
    80% {
      border-color: transparent;
      border-right-color: var(--fill-color);
      border-bottom-color: var(--fill-color);
    }
    90% {
      border-color: transparent;
      border-bottom-color: var(--fill-color);
    }
  }
</style>

  <script>
    async function quickchart(key) {
      const quickchartButtonEl =
        document.querySelector('#' + key + ' button');
      quickchartButtonEl.disabled = true;  // To prevent multiple clicks.
      quickchartButtonEl.classList.add('colab-df-spinner');
      try {
        const charts = await google.colab.kernel.invokeFunction(
            'suggestCharts', [key], {});
      } catch (error) {
        console.error('Error during call to suggestCharts:', error);
      }
      quickchartButtonEl.classList.remove('colab-df-spinner');
      quickchartButtonEl.classList.add('colab-df-quickchart-complete');
    }
    (() => {
      let quickchartButtonEl =
        document.querySelector('#df-b0422517-3da2-44a6-bc32-f7b836f3460c button');
      quickchartButtonEl.style.display =
        google.colab.kernel.accessAllowed ? 'block' : 'none';
    })();
  </script>
</div>

    </div>
  </div>





```python
df_test.sort_values("loss", ascending=True).head(10)
```





  <div id="df-38c78c59-50e9-438a-902a-8a0bf5702984" class="colab-df-container">
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
      <th>text</th>
      <th>label</th>
      <th>predicted_label</th>
      <th>loss</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1531</th>
      <td>i forgive stanley hes not so quick to forgive ...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.015848</td>
    </tr>
    <tr>
      <th>1452</th>
      <td>i always feel guilty and come to one conclusio...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016094</td>
    </tr>
    <tr>
      <th>1041</th>
      <td>i suppose it all goes along with feeling unwel...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016098</td>
    </tr>
    <tr>
      <th>861</th>
      <td>i am feeling awfully lonely today and i dont w...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016165</td>
    </tr>
    <tr>
      <th>697</th>
      <td>i was missing him desperately and feeling idio...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016172</td>
    </tr>
    <tr>
      <th>267</th>
      <td>i feel like im alone in missing him and becaus...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016177</td>
    </tr>
    <tr>
      <th>1368</th>
      <td>i started this blog with pure intentions i mus...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016258</td>
    </tr>
    <tr>
      <th>1656</th>
      <td>im feeling very jaded and uncertain about love...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016274</td>
    </tr>
    <tr>
      <th>1326</th>
      <td>i am feeling neglectful i feel like i should h...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016300</td>
    </tr>
    <tr>
      <th>1140</th>
      <td>i do think about certain people i feel a bit d...</td>
      <td>sadness</td>
      <td>sadness</td>
      <td>0.016307</td>
    </tr>
  </tbody>
</table>
</div>
    <div class="colab-df-buttons">

  <div class="colab-df-container">
    <button class="colab-df-convert" onclick="convertToInteractive('df-38c78c59-50e9-438a-902a-8a0bf5702984')"
            title="Convert this dataframe to an interactive table."
            style="display:none;">

  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960">
    <path d="M120-120v-720h720v720H120Zm60-500h600v-160H180v160Zm220 220h160v-160H400v160Zm0 220h160v-160H400v160ZM180-400h160v-160H180v160Zm440 0h160v-160H620v160ZM180-180h160v-160H180v160Zm440 0h160v-160H620v160Z"/>
  </svg>
    </button>

  <style>
    .colab-df-container {
      display:flex;
      gap: 12px;
    }

    .colab-df-convert {
      background-color: #E8F0FE;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: none;
      fill: #1967D2;
      height: 32px;
      padding: 0 0 0 0;
      width: 32px;
    }

    .colab-df-convert:hover {
      background-color: #E2EBFA;
      box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3), 0px 1px 3px 1px rgba(60, 64, 67, 0.15);
      fill: #174EA6;
    }

    .colab-df-buttons div {
      margin-bottom: 4px;
    }

    [theme=dark] .colab-df-convert {
      background-color: #3B4455;
      fill: #D2E3FC;
    }

    [theme=dark] .colab-df-convert:hover {
      background-color: #434B5C;
      box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
      filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
      fill: #FFFFFF;
    }
  </style>

    <script>
      const buttonEl =
        document.querySelector('#df-38c78c59-50e9-438a-902a-8a0bf5702984 button.colab-df-convert');
      buttonEl.style.display =
        google.colab.kernel.accessAllowed ? 'block' : 'none';

      async function convertToInteractive(key) {
        const element = document.querySelector('#df-38c78c59-50e9-438a-902a-8a0bf5702984');
        const dataTable =
          await google.colab.kernel.invokeFunction('convertToInteractive',
                                                    [key], {});
        if (!dataTable) return;

        const docLinkHtml = 'Like what you see? Visit the ' +
          '<a target="_blank" href=https://colab.research.google.com/notebooks/data_table.ipynb>data table notebook</a>'
          + ' to learn more about interactive tables.';
        element.innerHTML = '';
        dataTable['output_type'] = 'display_data';
        await google.colab.output.renderOutput(dataTable, element);
        const docLink = document.createElement('div');
        docLink.innerHTML = docLinkHtml;
        element.appendChild(docLink);
      }
    </script>
  </div>


<div id="df-a64e27b4-ff2f-4145-8cd2-970643a87cf5">
  <button class="colab-df-quickchart" onclick="quickchart('df-a64e27b4-ff2f-4145-8cd2-970643a87cf5')"
            title="Suggest charts"
            style="display:none;">

<svg xmlns="http://www.w3.org/2000/svg" height="24px"viewBox="0 0 24 24"
     width="24px">
    <g>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </g>
</svg>
  </button>

<style>
  .colab-df-quickchart {
      --bg-color: #E8F0FE;
      --fill-color: #1967D2;
      --hover-bg-color: #E2EBFA;
      --hover-fill-color: #174EA6;
      --disabled-fill-color: #AAA;
      --disabled-bg-color: #DDD;
  }

  [theme=dark] .colab-df-quickchart {
      --bg-color: #3B4455;
      --fill-color: #D2E3FC;
      --hover-bg-color: #434B5C;
      --hover-fill-color: #FFFFFF;
      --disabled-bg-color: #3B4455;
      --disabled-fill-color: #666;
  }

  .colab-df-quickchart {
    background-color: var(--bg-color);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    fill: var(--fill-color);
    height: 32px;
    padding: 0;
    width: 32px;
  }

  .colab-df-quickchart:hover {
    background-color: var(--hover-bg-color);
    box-shadow: 0 1px 2px rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    fill: var(--button-hover-fill-color);
  }

  .colab-df-quickchart-complete:disabled,
  .colab-df-quickchart-complete:disabled:hover {
    background-color: var(--disabled-bg-color);
    fill: var(--disabled-fill-color);
    box-shadow: none;
  }

  .colab-df-spinner {
    border: 2px solid var(--fill-color);
    border-color: transparent;
    border-bottom-color: var(--fill-color);
    animation:
      spin 1s steps(1) infinite;
  }

  @keyframes spin {
    0% {
      border-color: transparent;
      border-bottom-color: var(--fill-color);
      border-left-color: var(--fill-color);
    }
    20% {
      border-color: transparent;
      border-left-color: var(--fill-color);
      border-top-color: var(--fill-color);
    }
    30% {
      border-color: transparent;
      border-left-color: var(--fill-color);
      border-top-color: var(--fill-color);
      border-right-color: var(--fill-color);
    }
    40% {
      border-color: transparent;
      border-right-color: var(--fill-color);
      border-top-color: var(--fill-color);
    }
    60% {
      border-color: transparent;
      border-right-color: var(--fill-color);
    }
    80% {
      border-color: transparent;
      border-right-color: var(--fill-color);
      border-bottom-color: var(--fill-color);
    }
    90% {
      border-color: transparent;
      border-bottom-color: var(--fill-color);
    }
  }
</style>

  <script>
    async function quickchart(key) {
      const quickchartButtonEl =
        document.querySelector('#' + key + ' button');
      quickchartButtonEl.disabled = true;  // To prevent multiple clicks.
      quickchartButtonEl.classList.add('colab-df-spinner');
      try {
        const charts = await google.colab.kernel.invokeFunction(
            'suggestCharts', [key], {});
      } catch (error) {
        console.error('Error during call to suggestCharts:', error);
      }
      quickchartButtonEl.classList.remove('colab-df-spinner');
      quickchartButtonEl.classList.add('colab-df-quickchart-complete');
    }
    (() => {
      let quickchartButtonEl =
        document.querySelector('#df-a64e27b4-ff2f-4145-8cd2-970643a87cf5 button');
      quickchartButtonEl.style.display =
        google.colab.kernel.accessAllowed ? 'block' : 'none';
    })();
  </script>
</div>

    </div>
  </div>




`-` 코드 설명
1. label에 있는 int형 값들을 사람이 알아보기 쉽게 str형태로 바꿔준다.
2. 결과를 살펴보면 sadness 레이블들은 loss도 적고 잘 맞추는 것을 알 수 있다.

## 9. Save model & Publish


```python
trainer.push_to_hub(commit_message="Training completed!")
```




    CommitInfo(commit_url='https://huggingface.co/SangJinCha/distilbert-base-uncased-finetuned-emotion/commit/426fb4eb81af4054523720114488861e4b621f99', commit_message='Training completed!', commit_description='', oid='426fb4eb81af4054523720114488861e4b621f99', pr_url=None, repo_url=RepoUrl('https://huggingface.co/SangJinCha/distilbert-base-uncased-finetuned-emotion', endpoint='https://huggingface.co', repo_type='model', repo_id='SangJinCha/distilbert-base-uncased-finetuned-emotion'), pr_revision=None, pr_num=None)




```python
from transformers import pipeline

model_id = "SangJinCha/distilbert-base-uncased-finetuned-emotion"
classifier = pipeline("text-classification", model=model_id)
```


    config.json:   0%|          | 0.00/883 [00:00<?, ?B/s]



    model.safetensors:   0%|          | 0.00/268M [00:00<?, ?B/s]



    tokenizer_config.json:   0%|          | 0.00/1.23k [00:00<?, ?B/s]



    vocab.txt:   0%|          | 0.00/232k [00:00<?, ?B/s]



    tokenizer.json:   0%|          | 0.00/711k [00:00<?, ?B/s]



    special_tokens_map.json:   0%|          | 0.00/125 [00:00<?, ?B/s]


이제 모델에 hugging face 사용자 이름을 붙혀서 push 해주면 된다.
