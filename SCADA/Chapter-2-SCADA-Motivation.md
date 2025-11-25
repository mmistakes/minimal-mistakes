# 2. Why - 왜 SCADA가 필요한가?

## 2.1 AI 시대의 데이터와 Storage 목적 변화
#### message: Workload가 바뀌고 있다. 데이터 유지 비용 뿐만 아니라 (random IO)데이터 접근 비용도 고려해야한다.
- TB/TCO -> IOPS/TCO 패러다임 전환
- Storage의 목적 변화: 보관 -> 대량의 데이터 풀에서 필요한 걸 빠르게 접근


### 과거 vs 현재 비교
| 시대         | 접근 패턴        | 성능 지표                 | 예시                      |
| ---------- | ------------ | --------------------- | ----------------------- |
| Pre-GenAI) | 큰 데이터 한 번 읽기 | **Throughput (GB/s)** | 영화 스트리밍                 |
| GenAI      | 작은 데이터 자주 읽기 | **IOPS (512B-4KB)**   | RAG, Vector Search, GNN |
### AI application overview
- Apps bifurcate by access pattern and IO intensity; TB/TCO *persists*, IOPS/TCO is *emerging*
![AI Application Overview](/SCADA/images/Pasted-image-20251121190247.png)
### Datacenter Compute Inversion
- Extreme processing using *GPUs* and accelerators is now a norm in datacenter
![Datacenter Compute Inversion](/SCADA/images/Pasted-image-20251121185958.png)
### Emerging workloads demand memory
![Emerging Workloads Demand Memory](/SCADA/images/Pasted-image-20251121190135.png)

## 2.2 기존 CPU 중심 방식의 병목
#### Access granularity가 작고(vector db 크기는 64B~8KB이다), total size가 큰 data는 기존 방식으로는 한계가 있다. -> 왜 GPU가 직접 storage에 접근해야 하는지 설명

### 기존 방식 (CPU-initiated I/O)
- 문제: size가 대량이지만 granularity가 작은 workload를 처리하기엔 기존 방식의 속도가 너무 느리다. 대량의 data를 memory에 올려놓을 수도 있겠지만 60TB만큼의 host memory 는 가성비가 최악이다 (Q. CXL에 대해서 어떻게 CJ는 말하는가?)

- 기존 방식은 속도가 느리다
	1) Control
	- GPU가 데이터 필요 -> CPU에 요청 -> CPU가 가져옴 -> GPU 전달
	- Sowftware Stack overhead
	2) Data
	- Storage -> CPU RAM -> GPU VRAM

- GDS (GPU direct storage)가 Data movement의 비효율성은 해결하였다.
- CPU의 SW bottleneck이 더 크게 부각된다.

![CPU-centric Bottleneck](/SCADA/images/Pasted-image-20251121194843.png)

>질문1-1. Inefficient to load PB of data via tiling?
>Tiling: 전체 데이터를 한 번에 로드할 수 없을 때, 메모리 용량에 맞는 작은 조각(Tile)으로 분할하여 순차적으로 로드하고 처리하는 데이터 처리 기법

>질문1-2. CPU-centric에서 PB data tiling이 비효율적인 이유?ㅁ
>tile loading vs. view-based access 차이를 잘 모르겠다. CPU-centric에서도 on-demand로 필요한 data만 불러오는 건 마찬가지 아닌가? 대신 GPU가 thread개수가 많아서 fine-grained data를 PCIe bandwidth에 가득 채워서 요청하고 받을 수 있는 걸로 이해하고 있는데?

### Little's Law
- 얼마나 빨라져야 할까? -> SSD에서 최대한 빨리 data를 공급받아야 함. 왜냐하면 HBM의 부족한 공간을 SSD로 확장하는 게 목적임.
- PCIe 대역폭의 한계 속도만큼 끌어 올려야함.
**수식**
![Little's Law Formula 1](/SCADA/images/Pasted-image-20251124183818.png)
![Little's Law Formula 2](/SCADA/images/Pasted-image-20251124183842.png)

```
Qd = T × L

Qd: 필요한 동시 요청 수 (Queue Depth)
T:  목표 처리량 (Throughput, IOPS)
L:  평균 지연시간 (Latency)
```


**I/O Request 개수는 여러 개의 SSDs가 나누어 처리할 수 있음.**
