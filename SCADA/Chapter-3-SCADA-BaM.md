## 3.1. Big Accelerator Memory

- 이름 뜻 해석
	- accelerator memory는 GPU VRAM; HBM을 말한다.
	- Big 이라는 건 HBM의 크기가 부족한 걸 마치 풍족한 거 처럼 보이겠다는 뜻이다.
- CPU가 아닌 GPU가 storage에 직접 access (I/O Request)함
	- *GPU as a data access engine*
	- GDS에서 SSD -> VRAM을 보였으나 CPU SW overhead 한계가 있다.
	- Little's Law에 따르면 (4KB granularity 가정시) 26MIOPS가 필요하다.
- 동작 흐름 (5단계)
```
1. GPU 스레드가 데이터 요청
2. GPU 내 SW Cache 확인 (HBM 일부)
3. Cache Miss → NVMe에 I/O 요청 생성
4. GPU가 직접 NVMe Doorbell Ring
5. 데이터 도착하면 계속 실행
```

## 3.2 Critical Section 문제와 해결
### 문제
- [ ] TODO Critical section에 대한 비유 개선 필요 (여러 사람이 화장실에 한번에 들어가서 a toilet을 이용할 순 없잖아..)

### 해결

**BaM의 해결책 (Fine-grained Synchronization)**:
```
1. Request Batching (묶어서 보내기)
   비유: "10만명이 각자 문 두드리지 말고,
         100명씩 묶어서 대표 1명이 두드리자"
   - 512B 요청 수만 개를 모아서 한 번에 전송

2. Coalescing (합치기)
   - 같은 캐시 라인 요청하는 스레드들 → 하나로 통합
   - 중복 제거로 실제 I/O 개수 줄이기

3. 결과:
   - Critical Section 진입 횟수: 10만 → 수백 개로 감소
   - GPU 병렬성 유지하면서도 동기화 오버헤드 최소화
```



**NVMe Queue 구조**:
```
┌─────────────────────────────────────────┐
│ BaM의 System-level Queue Depth (Qd)     │ ← Little's Law로 계산
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ GPU Threads (10만개)              │  │
│  │ - 각자 I/O 요청 생성               │  │
│  │ - 동시에 수천~수만 개 요청 발생    │  │
│  └──────────────────────────────────┘  │
│              ↓                          │
│  ┌──────────────────────────────────┐  │
│  │ BaM Batching/Coalescing          │  │
│  │ - 수만 개 → 수백~수천 개로 압축   │  │
│  └──────────────────────────────────┘  │
│              ↓                          │
│  ┌──────────────────────────────────┐  │
│  │ NVMe Queue Pairs (128개)          │  │ ← SSD의 Queue
│  │ - 각 Queue depth: 1024            │  │
│  │ - 총 131K entries 가능             │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```
