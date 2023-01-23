---
layout: single
title: " 추천시스템과 방법론 "
categories: recommender system
---   
## 추천시스템이란?    

 우리는 방대한 정보를 쉽게 찾아보고 보고 접할 수 있습니다. 온라인 쇼핑몰의 상품추천, 최신 뉴스 추천, 금융상품 추천, 검색 시스템 등 다양한 분야에서 사용되고 있습니다. 그렇다면 그 수많은 정보 중에 나에게 추출(filtering) 해서 주는 정보는 어떻게 정할까요? 추천시스템은 유저의 과거의 행동 및 선호도를 바탕으로 관심사를 제안합니다. 

---
## 1. Content-based filtering technique

콘텐츠 기반 필터링(Content-based Filtering)은 해당 아이템의 도메인을 활용한 것으로 **유저가 관심있는 아이템의 속성을 분석하여 새로운 아이템을 추천해주는 것**입니다. 뒤에서 설명드릴 **Collaborative Filtering(Item-based)와 다른 점은 다른 유저의 정보가 사용되지 않는다**는 점입니다.

예를 들면, 내가 산 옷과 비슷하게 생긴 옷을 추천해`주거나 뉴스 기사가 비슷하거나 관련된 다른 뉴스를 추천해주는 경우에 자주 사용됩니다.

이러한 콘텐츠 기반 필터링은 아이템들의 feature를 잘 추출하기 위한 TF-IDF(Term Frequency - Inverse Document Frequency)나 Word2Vec과 같은 **Feature Extraction** 방법론이 사용됩니다. 또한, 추출된 feature를 통해 **아이템을 비교할 유사도(Similarity)**에 대한 선택도 중요합니다.

- 장점 : 유저의 선호도에 대한 정보 없이, 아이템 정보만으로 추천 가능
- 단점 : 아이템을 설명할 수 있는 데이터(item's metadata) 구축이 필요.


---

## 2. Collaborative filtering technique

협업 필터링(Collaborative Filtering, CF)은 **유저-아이템의 관계(User-Item interaction)로부터 도출되는 추천 시스템**입니다.

- 장점 : 아이템에 대한 콘텐츠의 정보 없이 사용 가능
- 단점1 Cold Start : ‘새로 시작할 때 곤란함’을 의미하며, 새로운 유저나 아이템의 초기 정보 부족의 문제점
- 단점2 Data Sparsity : 수 많은 유저와 아이템 사이에 경험하지 못한, 구매해보지 못한 경우가 데이터의 대부분을 차지함 (Ex. 온라인 쇼핑몰에서 내가 구매한 목록보다 구매하지 않은 목록이 압도적으로 많음)
- 단점3 Scalability : 유저와 아이템의 수가 많아질수록 데이터의 크기가 기하급수로 커짐


---
### 2-1. **Memory-based Filtering**

*User-Item Matrix로부터 도출되는 유사도 기반*으로 아이템을 추천을 합니다.   

1) User-based

**유저 간의 선호도(아이팀에 대한 점수)나 구매 이력을 비교하여 추천하는 방법**을 User-based CF라고 합니다.예를 들면, 유저 A가 [라면, 삼각김밥, 김치, 콜라]를 샀다고 하면, 유저 A와 가장 유사한 쇼핑 목록을 갖고 있는 유저 B [라면, 삼각김밥, 김치]에게 [콜라]를 추천해주는 것입니다.

2) Item-based

User-based와는 반대로 **아이템 간의 유저 목록을 비교하여 추천하는 방법**입니다.예를 들면, 라면을 [유저 A, 유저 B, 유저 C, 유저 D]가 구매를 했다면, 라면을 산 유저의 목록과 가장 비슷한 삼각김밥 [유저 A, 유저 B, 유저 C, 유저 E]을 유저 D에게 추천하는 것입니다. 또는, 유저 E에게 라면을 추천해줄 수도 있습니다.


---

### 2-2. **Model-based Filtering**

 Model-based CF는 *User-Item interaction*을 머신러닝이나 딥러닝과 같은 모델을 학습하는 것을 말합니다. 장바구니 분석(Association rule)과 같이 아이템 간의 관계를 학습할 수도 있고, Clustering을 통해 유사한 아이템이나 유저 간의 그룹을 형성할 수도 있습니다. 이 외에도 Matrix Factorization, Bayesian Network, Decision Tree 등 많은 방법론이 사용됩니다.

- Matrix Factorization


