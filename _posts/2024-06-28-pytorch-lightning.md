---
layout: single
title: "Pytorch Lightning과 Hydra 사용해보기"

# sidebar:
#   nav: "counts"

categories: Pytorch
tag: [Pytorch]
# tag: [Pytorch, Pytorch-Lightning, Hydra]
---

PytorchLightning과 Hydra를 사용해보자.

# 1.왜 사용할까?

<!-- > "아니 파이토치만 잘 사용하면 되는거지 뭐하러 추가적인 라이브러리를 사용해야하는거야??"
> {:.notice--danger} -->

<div class='notice--success'>
파이토치만 잘 사용하면 되는거지 뭐하러 추가적인 라이브러리를 사용해야하는거야??"
</div>

솔직히 말하면 굳이 사용하지 않아도 프로젝트를 진행하는데는 지장이 없다.  
새로운 라이브러리를 사용하는데는 언제나 그렇듯 기본적인 이해도를 갖추는 시간이 필요하고, 손발 다루듯 하려면 이래저래 삽질을 많이 해야한다. 그럼에도 불구하고 나는 Pytorch Lightning과 Hydra만큼은 딥러닝 개발에 있어서 활용도가 높다고 느꼈다.

딥러닝 개발을 하는 경우 다음과 같은 필수 구성요소를 만들게 된다.

- 데이터셋
- 모델
- 학습, 평가
- 추론

이외에도 LearningRate Scheduler, EarlyStopping, CheckpointSaving과 같은 다양한 기능들을 원하는대로 사용하기 위해 구현을 한다.  
분명 필수적으로 구현을 해야하는 것 맞지만 풀어야할 문제가 가진 복잡성에 따라 구현단계에서 소모되는 시간도 크고, 관리적인 측면에서도 상당히 큰 시간과 비용을 요구하게 된다.

또한 사용되는 파라미터를 코드 내부에 직접 작성하는 것은 각각의 스크립트마다 파라미터를 변경해야할 수 있고 같은 파라미터가 여러 위치에서 사용되는 경우 일관성을 유지하기도 어렵다.  
즉, 이런저런 이유로 인해 한 부분에서 문제가 생긴다면 프로젝트 전체에 영향을 주게 된다.

파이토치 라이트닝(Pytorch Lightning)은 개발 단계에서 소모되는 시간과 비용을 단축시키기 위해 코드 템플릿을 제공하는 Python 라이브러리로, 표준화된 방식에 따라 개발을 해야하기 때문에 가독성을 높이면서 유지보수를 쉽게 만든다.  
하이드라(Hydra)는 yaml 파일로 모델 하이퍼파라미터, 프로젝트의 설정값 등을 관리를 쉽게 해주는 라이브러리로써 다양한 설정을 실험하고 결과를 비교하는데 집중할 수 있게 한다.

# 2.Pytorch Lightning

파이토치 라이트닝의 [공식 홈페이지](https://lightning.ai/docs/pytorch/stable/)를 참고하여 간단한 코드들을 작성해봤다. 간략한 경험담을 이야기하자면 작성해야할 코드가 현격히 줄어들어 전반적인 사용법만 이해하면 당장 프로젝트 개발에 사용해도 큰 무리가 없을 정도다.

## 2-1.Lightning Data Module

```python
import torch
from torchvision import datasets
from torchvision import transforms
from pytorch_lightning import LightningDataModule
from torch.utils.data import random_split, DataLoader

class DataModule(LightningDataModule):
    def __init__(self,
                 data_dir="path/to/dir",
                 batch_size=32,
                 num_workers=4,
                 transform=transforms.ToTensor()):
        super().__init__()
        self.data_dir = data_dir
        self.batch_size = batch_size
        self.num_workers = num_workers
        self.transform = transform

    def prepare_data(self):
        ## 데이터 다운로드(준비)
        datasets.MNIST(root=self.data_dir, download=True, train=True, transform=None)
        datasets.MNIST(root=self.data_dir, download=True, train=False, transform=None)

    def setup(self, stage=None):
        if stage == 'fit' or stage is None:
            full_train_dataset = datasets.MNIST(root=self.data_dir, download=True, train=True, transform=self.transform)
            self.train_dataset, self.valid_dataset = random_split(full_train_dataset, [55000, 5000], generator=torch.Generator().manual_seed(42))

        if stage == 'test' or stage == 'predict':
            self.test_dataset = datasets.MNIST(root=self.data_dir, download=True, train=False, transform=self.transform)

    def train_dataloader(self):
        return DataLoader(self.train_dataset, batch_size=self.batch_size, num_workers=self.num_workers, shuffle=True)

    def val_dataloader(self):
        return DataLoader(self.valid_dataset, batch_size=self.batch_size, num_workers=self.num_workers, shuffle=False)

    def test_dataloader(self):
        return DataLoader(self.test_dataset, batch_size=self.batch_size, num_workers=self.num_workers, shuffle=False)

    def predict_dataloader(self):
        return DataLoader(self.test_dataset, batch_size=self.batch_size, num_workers=self.num_workers, shuffle=False)
```

LightningDataModule은 pytorch에서 사용자가 가진 데이터셋을 이용한 Dataset 클래스 정의와 DatatLoader를 정의하는 단계를 하나로 압축시켜둔 형태다.  
사용자의 클래스를 정의할 때 `LightningDataModule`를 상속받도록 해야하며, 각각의 메서드는 자체적의 의미와 동작시점이 정해져있다.

- `__init__` : 생성자 메서드는 본격적으로 데이터셋을 다루기 전에 입력 받아야하는 값들을 인스턴스 변수로 저장하기 위함.
- `prepare_data` : torchvision과 같은 라이브러리나 웹 페이지상에서 데이터셋을 다운로드하는 등의 준비작업을 수행한다.
- `setup` : 데이터셋을 초기화하고 나누는 작업을 수행한다. 즉, train/valid/test 데이터셋을 준비한다. setup 메서드에서 가장 인상적이었던 부분은 `stage`라는 인자인데 이것을 통해 pytorch lightning이 train, test, prediction의 단계에 맞는 데이터셋을 알아서 로드한다.
- `train_dataloader` : 학습에 적용될 데이터로더를 정의하는 메서드로, val_dataloader, test_dataloader 그리고 predict_dataloader를 정의할 수 있다.

## 2-2.LightningModule

```python
import torch
from torch import nn
from torchmetrics import Accuracy
from pytorch_lightning import LightningModule

class CNN(LightningModule):
    def __init__(self, num_classes, learning_rate, dropout_ratio, use_scheduler):
        super().__init__()
        self.num_classes = num_classes
        self.learning_rate = learning_rate
        self.dropout_ratio = dropout_ratio
        self.use_scheduler = use_scheduler
        self.save_hyperparameters()

        self.criterion = nn.CrossEntropyLoss()
        self.accuracy = Accuracy(task="multiclass", num_classes=num_classes)

        self.conv1 = nn.Conv2d(in_channels=1, out_channels=16, kernel_size=5)  # [BATCH_SIZE, 1, 28, 28] -> [BATCH_SIZE, 16, 24, 24]
        self.relu1 = nn.ReLU()

        self.conv2 = nn.Conv2d(in_channels=16, out_channels=32, kernel_size=5) # [BATCH_SIZE, 16, 24, 24] -> [BATCH_SIZE, 32, 20, 20]
        self.relu2 = nn.ReLU()
        self.pool2 = nn.MaxPool2d(kernel_size=2) # [BATCH_SIZE, 32, 20, 20] -> [BATCH_SIZE, 32, 10, 10]
        self.dropout2 = nn.Dropout(dropout_ratio)

        self.conv3 = nn.Conv2d(in_channels=32, out_channels=64, kernel_size=5) # [BATCH_SIZE, 32, 10, 10] -> [BATCH_SIZE, 64, 6, 6]
        self.relu3 = nn.ReLU()
        self.pool3 = nn.MaxPool2d(kernel_size=2) # 크기를 1/2로 줄입니다. [BATCH_SIZE, 64, 6, 6] -> [BATCH_SIZE, 64, 3, 3]
        self.dropout3 = nn.Dropout(dropout_ratio)

        self.output = nn.Linear(64 * 3 * 3, self.num_classes)


    def forward(self, x):
        x = self.conv1(x)
        x = self.relu1(x)

        x = self.conv2(x)
        x = self.relu2(x)
        x = self.pool2(x)
        x = self.dropout2(x)

        x = self.conv3(x)
        x = self.relu3(x)
        x = self.pool3(x)
        x = self.dropout3(x)

        x = x.view(x.size(0), -1)
        x = self.output(x)

        return x


    def configure_optimizers(self):
        optimizer = torch.optim.Adam(self.parameters(), lr=1e-3)

        if self.use_scheduler:
            scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='max', patience=10, factor=0.1, verbose=True)
            return [optimizer], [scheduler]
        else:
            return optimizer


    def training_step(self, batch, batch_idx):
        ## model.train()을 생략.
        x, y = batch ## to(device)를 생략.
        y_pred = self(x) ## outputs = model(images)

        loss = self.criterion(y_pred, y)
        acc = self.accuracy(y_pred, y)
        ## loss.backward(), optimizer.step()은 생략한다. 라이트닝이 자동으로 수행.

        self.log("train_loss", loss, on_step=False, on_epoch=True, logger=True)
        self.log("train_acc", acc, on_step=False, on_epoch=True, logger=True)

        return loss


    def validation_step(self, batch, batch_idx):
        ## valid, test에서 사용하던 model.eval()과 torch.no_grad()를 생략한다. 자동으로 수행함.
        x, y = batch
        y_pred = self(x)
        loss = self.criterion(y_pred, y)

        _, preds = torch.max(y_pred, dim=1) ## [batch_size, num_classes]. num_classes 중 최고 확률 하나 선택.
        acc = self.accuracy(preds, y)

        self.log("valid_loss", loss, on_step=False, on_epoch=True, logger=True)
        self.log("valid_acc", acc, on_step=False, on_epoch=True, logger=True)


    def test_step(self, batch, batch_idx):
        x, y = batch
        y_pred = self(x)
        loss = self.criterion(y_pred, y)

        _, preds = torch.max(y_pred, dim=1) ## [batch_size, num_classes]. num_classes 중 최고 확률 하나 선택.
        acc = self.accuracy(preds, y)

        self.log("test_loss", loss, on_step=False, on_epoch=True, logger=True)
        self.log("test_acc", acc, on_step=False, on_epoch=True, logger=True)


    def predict_step(self, batch, batch_idx):
        x, _ = batch
        predictions = self(x)
        _, preds = torch.max(predictions, dim=1)

        return preds


    def weight_initialization(self):
        for m in self.modules():
            if isinstance(m, nn.Conv2d) or isinstance(m, nn.Linear):
                nn.init.kaiming_normal_(m.weight)
                nn.init.zeros_(m.bias)


    def count_parameters(self):
        return sum(p.numel() for p in self.parameters() if p.requires_grad)
```

LightningModule은 사용자의 모델 클래스를 정의할 때 상속해야하는 클래스로 모델의 학습, 검증, 테스트 로직을 정의하는데 사용한다.  
코드를 봤을 때 눈에 띄는 점은 생성자 메서드에서 손실함수를 정의하고 `configure_optimizers`에서는 최적화 알고리즘을 정의하고 있다. 그 이유는 training_step, validation_step과 같이 학습과 평가, 추론까지 동작해야할 로직을 정의해주기 때문이고 이에 따라 train.py에서 별도로 train, eval 함수 그리고 손실함수와 최적화 알고리즘을 정의할 필요가 없어져 코드가 훨씬 간결해질 것이라 예상할 수 있다. 뿐만 아니라 `model.train()`, `model.eval()`같은 모델의 모드를 별도로 설정할 필요가 없으며, `x.to(device)`나 `torch.no_grad()`와 같이 텐서를 gpu로 보내거나 gradient가 발생하지 않도록 하는 것도 별도로 작성하지 않고 pytorch lightning이 알아서 해준다.

## 2-3.Trainer

```python
from pytorch_lightning.trainer import Trainer
from pytorch_lightning.loggers.csv_logs import CSVLogger
from pytorch_lightning.loggers.tensorboard import TensorBoardLogger
from pytorch_lightning.callbacks.early_stopping import EarlyStopping
from pytorch_lightning.callbacks.model_checkpoint import ModelCheckpoint

save_dir = "./runs"
csv_logger = CSVLogger(save_dir=f"{save_dir}/logs", name="train_csv")
tb_logger = TensorBoardLogger(save_dir=f"{save_dir}/logs", name="train_tb")

early_stop_callback = EarlyStopping(monitor="valid_loss", mode='min')
save_ckpt_callback = ModelCheckpoint(
    dirpath=f"{save_dir}/weights",
    monitor="valid_loss",
    mode="min",
    filename="{epoch}-{valid_loss:.2f}",  # 모델 체크포인트 파일 이름 설정
    save_last=True,
    save_weights_only=True,
    verbose=True,
    save_top_k=3  # 가장 좋은 3개의 모델만 저장
)

trainer = Trainer(
    max_epochs=100,
    accelerator="gpu", ## 또는 auto로 설정하면 알아서 선택함.
    callbacks=[early_stop_callback, save_ckpt_callback],
    logger=[csv_logger, tb_logger],
    default_root_dir="./runs" ## 저장경로
)

trainer.fit(model, datamodule=data_module)

trainer.test(
    model,
    data_module,
    ckpt_path="./runs/last.ckpt",
    verbose=True
)
```

Trainer 클래스는 모델을 학습시키거나 추론하게 만드는 실행 파일 역할을 한다.

- accelerator라는 파라미터를 통해 cpu, gpu, tpu 등의 자원을 설정할 수 있으며 이마저도 auto로 설정하는 경우 알아서 설정해준다.
- pytorch lightning에서는 자체적으로 많은 [callback](https://lightning.ai/docs/pytorch/stable/api_references.html#callbacks)과 [logger](https://lightning.ai/docs/pytorch/stable/api_references.html#loggers)를 지원하고 있다.
- 학습이 끝난 시점에서 테스트셋으로 평가를 할 때도 trainer 인스턴스를 활용하며, 이 때 data_module을 그대로 전달해주는데 앞서 stage라는 파라미터로 인해 pytorch lightning은 테스트 단계에서 test dataset을 사용해야함을 자동으로 인식한다.

# 3.Hydra

Pytorch Lightning으로 학습 및 평가 코드를 모두 작성한 상황이라고 가정해보자. 이제는 반복적인 실험을 통해 모델의 성능을 높이는데 집중해야한다. 그런데 이전에 작성한 코드는 epochs, batch_size, learning_rate 등등  
여러가지 파라미터들을 파이썬 스크립트 내부에서 관리되고 있다. train.py 내부에서 파라미터 값을 바꿨을 때 다른 스크립트에 모두 반영이 된다면 그나마 다행이겠지만 그렇지 못한 경우 각각의 스크립트에서 해당 파라미터 값을 바꿔줘야한다.  
또한 서로 다른 구조를 가진 모델이나 손실함수, 최적화 알고리즘의 변경과 같은 학습 요소들의 변화에 대한 모델 성능을 실험하고자 한다면 매번 변경 사항을 코드에서 바꿔주고 실행시켜야하는 것일까??
다행히도 하이드라를 사용하면 보다 간결하게 이러한 문제들을 해결할 수 있다. 하이드라는 `yaml` 파일로 파라미터들을 관리할 수 있으며 Instantiate, Multi-run과 같은 내부적인 기능을 통해 편리함을 더해준다.

## 3-1.config.yaml

```yaml
# config.yaml
defaults:
  - _self_

hydra:
  run:
    dir: outputs/${now:%Y-%m-%d}/${now:%H-%M-%S}
  verbose: True

data:
  data_dir: /home/pervinco/Datasets/MNIST
  batch_size: 32
  num_workers: 32

model:
  num_classes: 10
  learning_rate: 0.01
  dropout_ratio: 0.2
  use_scheduler: False
  _target_: torch.nn.CrossEntropyLoss

optimizer:
  _target_: torch.optim.Adam
  lr: ${model.learning_rate} # 모델의 learning_rate를 참조.

trainer:
  max_epochs: 100
  accelerator: gpu

callbacks:
  early_stop:
    monitor: valid_loss
    mode: min
  model_checkpoint:
    dirpath: ./weights
    monitor: valid_loss
    mode: min
    filename: "{epoch}-{valid_loss:.2f}.pth"
    save_last: True
    save_weights_only: True
    verbose: True
    save_top_k: 1

logger:
  csv:
    save_dir: ./logs
    name: csv
  tensorboard:
    save_dir: ./logs
    name: tensorboard

test:
  weight_file: /home/pervinco/Upstage_Ai_Lab/08_Pytorch/pytorch_lightning/outputs/2024-06-28/14-24-22/weights/epoch=4-valid_loss=0.03.pth.ckpt
```

다음과 같이 yaml 파일을 작성해준다. 작성된 내용을 보면 모델 학습에 반영될 하이퍼파라미터부터 저장경로, 데이터셋 경로 등을 명시해준 것을 확인할 수 있다. 이렇게 config.yaml 파일을 생성하고나면 파라미터를 바꾸는 시점에 파이썬 스크립트가 아닌 yaml 파일의 내용 하나만 바꿔주면 되기 때문에 관리적인 측면에서 매우 편리하다.

## 3-2.Pytorch Lightning + Hydra

```python
import hydra

from omegaconf import DictConfig
from torchvision import transforms
from pytorch_lightning import Trainer
from pytorch_lightning.loggers.csv_logs import CSVLogger
from pytorch_lightning.loggers.tensorboard import TensorBoardLogger
from pytorch_lightning.callbacks.early_stopping import EarlyStopping
from pytorch_lightning.callbacks.model_checkpoint import ModelCheckpoint

from models.model import CNN
from data.dataset import DataModule

@hydra.main(config_path=".", config_name="config")
def main(cfg: DictConfig):
    csv_logger = CSVLogger(save_dir=cfg.logger.csv.save_dir, name=cfg.logger.csv.name)
    tb_logger = TensorBoardLogger(save_dir=cfg.logger.tensorboard.save_dir, name=cfg.logger.tensorboard.name)

    early_stop_callback = EarlyStopping(
        monitor=cfg.callbacks.early_stop.monitor,
        mode=cfg.callbacks.early_stop.mode
    )
    save_ckpt_callback = ModelCheckpoint(
        dirpath=cfg.callbacks.model_checkpoint.dirpath,
        monitor=cfg.callbacks.model_checkpoint.monitor,
        mode=cfg.callbacks.model_checkpoint.mode,
        filename=cfg.callbacks.model_checkpoint.filename,
        save_last=cfg.callbacks.model_checkpoint.save_last,
        save_weights_only=cfg.callbacks.model_checkpoint.save_weights_only,
        verbose=cfg.callbacks.model_checkpoint.verbose,
        save_top_k=cfg.callbacks.model_checkpoint.save_top_k
    )

    data_module = DataModule(
        data_dir=cfg.data.data_dir,
        batch_size=cfg.data.batch_size,
        num_workers=cfg.data.num_workers,
        transform=transforms.ToTensor()
    )
    model = CNN(
        num_classes=cfg.model.num_classes,
        learning_rate=cfg.model.learning_rate,
        dropout_ratio=cfg.model.dropout_ratio,
        use_scheduler=cfg.model.use_scheduler
    )

    trainer = Trainer(
        max_epochs=cfg.trainer.max_epochs,
        accelerator=cfg.trainer.accelerator,
        callbacks=[early_stop_callback, save_ckpt_callback],
        logger=[csv_logger, tb_logger],
        default_root_dir=cfg.callbacks.model_checkpoint.dirpath
    )

    trainer.fit(model, datamodule=data_module)

if __name__ == "__main__":
    main()
```

앞서 만든 파이토치 라이트닝의 train.py에서 바뀌는 부분은 hydra와 config.yaml을 적용하는 것 뿐이다. 코드가 좌우로 길어진 것 같은 느낌이 들긴하지만 hydra를 사용함으로써 파이썬 스크립트는 딥러닝 모델의 학습이나 추론에 관련된 기능적인 부분을 담당하고, 하이퍼파라미터와 같은 설정값들은 config.yaml로 철저히 분리된 것으로 보인다.

## 3-3.Instantiate

```python
class CNN(LightningModule):
    def __init__(self, cfg):
        super().__init__()
        self.num_classes = cfg.model.num_classes
        self.learning_rate = cfg.model.learning_rate
        self.dropout_ratio = cfg.model.dropout_ratio
        self.use_scheduler = cfg.model.use_scheduler
        self.criterion = instantiate(cfg.criterion)
        self.optimizer = cfg.optimizer
        self.accuracy = Accuracy(task="multiclass", num_classes=self.num_classes)
        self.save_hyperparameters()

    def configure_optimizers(self):
        optimizer = instantiate(self.optimizer, self.parameters())

        if self.use_scheduler:
            scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='max', patience=10, factor=0.1, verbose=True)
            return [optimizer], [scheduler]
        else:
            return optimizer

```

Hydra의 instantiate 함수는 설정 파일에 정의된 클래스나 함수를 동적으로 생성하는 데 사용하며 이를 통해 config파일의 내용만 바꿈으로써 여러 가지 실험을 관리하기에 편리해진다. 코드를 보면 모델 클래스에 `instantiate(cfg.criterion)`로 작성하여 하이드라가 전달받은 값을 기반으로 인스턴스를 바로 생성할 수 있도록 한다.

```yaml
model:
  num_classes: 10
  learning_rate: 0.01
  dropout_ratio: 0.2
  use_scheduler: False

criterion:
  _target_: torch.nn.CrossEntropyLoss

optimizer:
  _target_: torch.optim.Adam
```

이후, yaml 파일의 내용처럼 파이토치 라이브러리 내부에 구현된 클래스의 인스턴스를 생성할 수 있게 된다. 따라서 여러 개의 손실함수를 실험해 보고 싶다면 criterion의 `_target_`을 바꿔주기만 하면 된다.

## 3-4.Multi-run

만약 옵티마이저나 손실함수를 다르게 설정하고 싶은데 config.yaml에서 내용을 수정해가면서 train.py를 실행하기엔 번거로울 수 있다. 이럴 때는 hydra의 multi-run 기능을 사용하면된다. Hydra의 Multi-run 기능은 여러 구성 조합을 한 번에 실행하여 다양한 실험을 쉽게 관리할 수 있도록 해준다. 이를 통해 하이퍼파라미터 튜닝, 여러 모델 아키텍처 실험, 다양한 손실 함수 및 옵티마이저 테스트 등을 효율적으로 수행할 수 있다.

```
python train.py -m "criterion._target_=torch.nn.CrossEntropyLoss" "criterion._target_=torch.nn.MSELoss"
python train.py -m "criterion._target_=torch.optim.SGD" "criterion._target_=torch.nn.Adam"
```

이와 같이 train.py를 실행할 때 `-m`으로 설정해 multi-run으로 실행함을 명시하고, 실험에 반영하고자 하는 요소들을 명시해주면 된다.
