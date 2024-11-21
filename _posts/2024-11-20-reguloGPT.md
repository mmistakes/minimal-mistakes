---
layout: single
title: reguloGPT
categories: paper
---

# 논문 리뷰: reguloGPT
<!-- {: .no_toc } -->
[reguloGPT: Harnessing GPT for Knowledge Graph Construction of Molecular Regulatory Pathways ](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10836076/)

<!-- ## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc} -->

---
## Background

- MRP: Molecualr Regulartory Pathways(분자 조절 경로).     
- KG: Knowledge Graph(지식 그래프). 개체, 사건 또는 개념과 같은 실체에 대한 상호 연결된 설명 모음     
- end-to-end learning: 입력에서 출력까지 파이프라인 네트워크 없이 신경망으로 한 번에 처리. 양끝단 상에서 라벨링된 데이터가 많을 때 잘 동작하는 경향이 있다.           
- m<sup>6</sup>A(N6-methyladenosine): mRNA(단백질 설계도)에 부여하는 화학적 변형. 유전자 발현을 조절하기 위한 기작.
- ICL: in-context learning.
- outdegree: 방향성 그래프에서 node로부터 시작하는 고유한 edge.
{: .fs-3 }

## 0. Abstract

- Motivation: MRP에 대한 KG 구축이 현재로선 미미하다.

- Results: reguloGPT의 문헌에서 생물학적 지식 추출 가능성         
  reguloGPT 통한 예측 -> m<sup>6</sup>A-KG 구축 -> m<sup>6</sup>A 조절 메커니즘 밝힘.       
  컨텍스트 인식 관계형 그래프 도입 / m<sup>6</sup>A 제목 및 벤치마크 데이터 세트 제작        
  G-Eval 체계: 성능 평가 위해 GPT-4를 활용. 기존 주석 기반 평가와 일치.         

- Availability and implementation:     
   reguloGPT의 소스 코드, m<sup>6</sup>A 관련 제목 및 벤치마크 데이터 세트, m<sup>6</sup>A-KG   
   https://github.com/Huang-AI4Medicine-Lab/reguloGPT

- Key words: MRP, KG, GPT, In Context Learning, m6A mRNA Methylation                   

## 1. Introduction    

- 왜 필요한가   
  MRP: 생물의학 연구 핵심.     
  KG: MRP를 위한 도구. KG는 복잡한 생물학적 지식을 구조화하여 표현한다.  
  -> 문헌에서 지식 추출 자동화: NLP(Natural Language Processing) 이용  
  
- 현재는 어떤가  
  현재로서는 NLP를 통해 복잡한 MRP를 매핑하기에는 부적절하다.
  
  ![Fig. 1.](https://www.ncbi.nlm.nih.gov/pmc/articles/instance/10836076/bin/nihpp-2024.01.27.577521v1-f0001.jpg)  
  METTLL3가 위암의 진행을 조절하는 메커니즘을 전체적으로 설명
  MRP를 위해 이러한 그래프를 얻기 위해서는 기존 NLP, 컨텍스트 식별, NER(Named Entity Recignition), N항 RE(N-ary Relationship Extraction) 필요.

  여러 시스템이 있지만 N항 RE는 생물의학 분야에서 충분히 탐구되지 못했다.  
  
- 이 논문에서는  
  주어진 문장에서 m<sup>6</sup>A methylation의 컨텍스트별 MRP를 위해 컨텍스트 인식 관계형 그래프의 end-to-end 구성에서 GPT-4 기능을 탐구한다.
  - 논문의 기여  
    1. end-to-end joint NER, N-ary 위한 reguloGPT, GPT-4 구동 ICL prompt 제안.
       reguloGPT에 대한 기준선인 few-shot 및 CoT 프롬프트 설계  
    2. 컨텍스트 인식 관계형 그래프 표현 도입  
    3. 벤치마크 데이터 세트 구축  
    4. 프롬프트의 성능 평가  
    5. G-Eval 체계 도입: 프롬프트를 활용하여 추출된 그래프를 평가  
    6. m<sup>6</sup>A-KG 구축: 2013-2023년 PubMed에서 수집한 문헌 제목에 reguloGPT 적용

## 2. Methods

- reguloGPT: end-to-end 추출 위해 GPT-4 기반 ICL 활용. 6개의 모듈을 포함한다.  

  ![Fig. 2.](https://www.ncbi.nlm.nih.gov/pmc/articles/instance/10836076/bin/nihpp-2024.01.27.577521v1-f0002.jpg)  
  PubMed에서 컨텍스트 인식 KG를 구축하기 쉽도록 reguloGPT를 설계

### A. reguloGPT에 대한 ICL 프롬프트  
   ![Fig. 3.](https://www.ncbi.nlm.nih.gov/pmc/articles/instance/10836076/bin/nihpp-2024.01.27.577521v1-f0003.jpg)  
   
1) 기준 프롬프트 (A): 지침, 정의 및 출력 형식을 포함한 기준 프롬프트  
  1 - 작업 목표 제시  
  2 - node, edge, context, inferred edge 를 포함하여 컨텍스트 인식 관계형 그래프의 구성요소 정의  
  3 - 출력 형식.   

2) Few-shot 프롬프트 (B): 대상 문장과 출력(context, nodes, direct edges, inferred edges)  
  1 - 지시,  2 - 정의,  3 - 데모,  4 - 출력의 형식  
  기준 프롬프트와 달리 정의 뒤에 추가 데모 섹션이 포함되어 있음.  

3) Chain-of-Thoughts(CoT) 프롬프트 (C):
   LLM에게 복잡하고 논리적인 응답 장려. 중간 추론 단계를 사고의 사슬로 추가.  

### B. 벤치마크 및 지식 그래프 생성을 위한 데이터 세트 구축  

- m<sup>6</sup>A 연구와 관련된 문헌의 제목 추출: PubMed, PtbTator 검색 및 사용.  
  완전한 문장, 여러 유전자에 대한 참조를 포함하는 제목 -> m<sup>6</sup>A와 유전자/단백질 사이의 경로 매핑  

1. 벤치마크 데이터세트에 대한 주석 방법  
  컴퓨터 과학과 생물의학 분야 전문가 5명을 주석자로 삼고 400개의 제목에 주석을 닮. 세 단계를 거침.  
  a. 연습 주석 단계  
  b. 그룹 주석 단계  
  c. 심사 단계  

2. 주석 지침  
  연습 주석 단계에서의 기본 지침 요약

### C. nodes, predicates, context의 정규화  

- node, context 정규화: Gilda, Gene Ontoloy knowledgebase.  
- predicates 정규화: Ontological predicate definition.  
- 관계 정규화: GPT-4 적용 및 수동 평가.    

### D. m<sup>6</sup>A-KG 구축  

- 400개 제목의 벤치마크 데이터 세트 외에 PubTator에서 MRP에 관한 제목 968개 추가 추출.  
  정규화된 관계 그래프를 벤치마크 데이터 세트의 그래프와 통합.   
  포괄적인 KG인 m<sup>6</sup>A-KG 구축.
  
- Neo4j를 이용한 KG 시각화 및 조작

### E. 평가 및 지표 기준  

1) 벤치마크 데이터 세트 평가  
  Precision 및 F1 score 지표  

    예측된 node 및 edge를 평가하는 기준  
          a. True positive: GPT-4의 예측 node가 벤치마크 주석과 완전히 일치할 경우  
          b. False positive: node나 edge가 잘못 추출될 경우 혹은 node는 일치하지만 서술어가 올바르지 않거나 추출되지 않았을 경우  
          c. False negative: 모든 node와 edge에 대한 예측이 일치하지 않았을 경우


3) G-Eval 체계
  수동 주석 작업을 자동화하기 위해 LLM 사용.  
  프레임워크 GPT-4-evaluation 제안.  
  
    ![Fig. 4.](https://www.ncbi.nlm.nih.gov/pmc/articles/instance/10836076/bin/nihpp-2024.01.27.577521v1-f0004.jpg)   
    평가를 위한 G-Eval 프롬프트 / A: 컨텍스트 평가, B: 그래프 평가  

## 3. Results  

### A. 벤치마크 데이터 세트의 주석  
- m<sup>6</sup>A 연구 논문 400개의 제목에 대한 컨텍스트 인식 그래프에 주석을 닮.
- 데이터 세트의 정규화된 컨텍스트에서 24개의 다른 TCGA 암 유형을 추출할 수 있었음.

### B. 우수한 성능의 reguloGPT  

- 평가 위해 REACH, EIDOS 알고리즘 선택  
  (두 알고리즘 모두 컨텍스트를 추출하도록 설계된 것은 아님)
  
  ![Table 1.](https://www.biorxiv.org/content/biorxiv/early/2024/01/30/2024.01.27.577521/T1.medium.gif)   
  각 프롬프트의 성능을 알고리즘과 비교하여 평가 (컨텍스트 평가는 제외) / CoT 프롬프트가 가장 효과적

- 예시1  
  "m<sup>6</sup>A 메틸트랜스퍼라제 METTL3는 LEF1의 m<sup>6</sup>A 수준을 조절하여 골육종 진행을 촉진한다" (PMID: 31253399)    
  컨텍스트: 골육종  
  REACH: (METTL3, STIMULATES, LEF1 수준)  
  EIDOS: (m6A 메틸트랜스퍼라제 METTL3, STIMULATES, 골육종 진행)  
  reguloGPT: 골육종 및 올바른 3개의 직접 edge 및 1개의 간접 3edge 관계 추출 성공  

- 예시2  
  "elF3i는 PHGDH 번역 증강을 통해 대장암 세포 생존을 촉진한다" (PMID: 37611825)  
  reguloGPT: 컨텍스트는 대장암 세포, 세 개의 삼중항 식별. (PHGDH, STIMULATES, 생존) 까지.  
  REACH: 한 개의 삼중항 (elF3i, STIMULATES, 세포 생존)  
  EIDOS: 두 개의 삼중항(elF3i, AUGMENTS, PHGDG 번역), (elF3i, STIMULATES, 대장암 세포 생존)  

- few-show prompt의 조건 무시 문제  
  "Suppression of m6A reader Ythdf2 promotes hematopoietic stem cell expansion" (PMID: 30065315)  
  "Silencing METTL3 inhibits the proliferation and invasion of osteosarcoma by regulating ATAD2" (PMID: 32044716)

### C. G-Eval 평가는 수동 평가와 일치  

- G-Eval 평가의 score 범위는 1~5. 사람 주석 평가와의 유사성.
  
  ![Table 2.](https://www.biorxiv.org/content/biorxiv/early/2024/01/30/2024.01.27.577521/T2.medium.gif)  
  CoT 프롬프트가 가장 우수.

## 4. m<sup>6</sup>A-KG, A context-aware KG of m<sup>6</sup>A regulatory fuctions  

### A. reguloGPT를 이용한 m6A-KG 구축  

- 포괄적인 m<sup>6</sup>A-KG에서 가장 연결 차수가 높은 m<sup>6</sup>(827)는 그래프의 중심이 된다.  
  차수별 상위 node에는 METTL3(436), METTL14(122)와 같은 주요 m<sup>6</sup>A writers, ALKBH5(166) 및 FTO(222)와 같은 erasers, YTHDF2(127) 및 YTHDF1(109)과 같은 readers가 포함된다.
  이는 m<sup>6</sup>A의 조절 기능에서 중요한 역할을 강조한다.  
  세포 증식과 신생물 전이를 나타내는 node도 높은 수준을 보이며, m<sup>6</sup>A가 이러한 종양 관련 표현형에 상당한 영향을 미친다는 것을 나타낸다.

### B. m<sup>6</sup>-KG의 구조는 분자 조절 경로의 구조를 반영  

- MRP의 아키텍처를 따르는지 알아보기 위한 node 분류 그룹:  
  m<sup>6</sup>A, WERs, GO/pathway, genes/proteins, 기타(H, M, L)

- 다양한 범주 node의 outdegree-rate

  ![Fig. 5.](https://www.ncbi.nlm.nih.gov/pmc/articles/instance/10836076/bin/nihpp-2024.01.27.577521v1-f0005.jpg)  
  m<sup>6</sup>A와 WERs(Writers, Erasers, Readers)는 핵심 조절자.  
  GO/pathwat node는 하류 조절자.   
  gene/protein node는 그 둘을 잇는 중간자.  

  other node의 경우  
  other(L)은 질병 표현형 또는 결과 정의.  
  other(H)는 화학적 자극 또는 환경적 자극.  

  => MRP의 특징

### C. m<sup>6</sup>A-KG는 다양한 암 유형에서 m<sup>6</sup> 기능의 독특한 메커니즘을 보여준다  

- m<sup>6</sup>A 조절 기능에 대해 알 수 있다.  
  m<sup>6</sup>A 조절자, 질병 표현형, 종양 전이 관여, 종양 억제 유전자의 암 의존적 조절 등 조절 메커니즘을 KG를 통해 해석할 수 있다.

## 5. Conclusion  

- reguloGPT: MRP 영역에서 KG의 end-to-end 구축을 위한 GPT-4의 새로운 응용 프로그램.  
- ICL 프롬프팅 개발.  
- 벤치마크 데이터베이스에 대한 reguloGPT의 효능 평가, G-Eval 평가와 사람 주석의 유사성.  
- m<sup>6</sup>A-KG 구축: MRP 구조 반영. 컨텍스트와 PubMed ID를 통합하는 고유한 컨텍스트 인식 edge가 특징.
  컨텍스트별 조절 이해, 데이터의 추적성과 검증 개선.  
- 향후 연구: edge와 컨텍스트에 대한 개선된 정규화 체계, 체계적인 G-Eval 평가 및 관계 추출 탐구.
