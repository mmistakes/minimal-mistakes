---
layout: single
title:  "디지털 논리"
categories: Digital-Logic
tag: [디지털 논리, 이론]
toc: true
author_profile: false
---
**[공지사항]** [본 블로그에 포함된 모든 정보는 교육 목적으로만 제공됩니다.](https://weoooo.github.io/notice/notice/)
{: .notice--danger}

## 디지털 논리란?

> 디지털 논리(digital logic)는 컴퓨터와 전자 기기의 기본적인 동작 원리를 설명하는 개념으로, 디지털 회로에서 0과 1의 두 가지 상태를 사용하여 데이터를 처리하고 전달합니다. 
> 
> 이를 통해 복잡한 연산을 수행할 수 있습니다.

## 기본 개념

1. **비트(bit)**
비트는 디지털 논리의 가장 기본적인 단위로, 0 또는 1 중 하나의 값을 가집니다.

2. **논리 게이트(logic gate)** 
논리 게이트는 하나 이상의 입력을 받아 특정 논리 연산을 수행하여 하나의 출력을 내보내는 기본 회로 요소입니다. 주요 논리 게이트로는 AND, OR, NOT, NAND, NOR, XOR, XNOR 게이트가 있습니다.

## 주요 논리 게이트

- [x] **AND 게이트**

모든 입력이 1일 때만 출력이 1인 게이트입니다.
  
  <div class="notice--primary">
  <h4>진리표</h4>
  <ul>
    <li>입력: 0, 0 -> 출력: 0</li>
    <li>입력: 0, 1 -> 출력: 0</li>
    <li>입력: 1, 0 -> 출력: 0</li>
    <li>입력: 1, 1 -> 출력: 1</li>
  </ul>
  </div>

- [x] **OR 게이트**

하나 이상의 입력이 1일 때 출력이 1인 게이트입니다.
  
  <div class="notice--primary">
  <h4>진리표</h4>
  <ul>
    <li>입력: 0, 0 -> 출력: 0</li>
    <li>입력: 0, 1 -> 출력: 1</li>
    <li>입력: 1, 0 -> 출력: 1</li>
    <li>입력: 1, 1 -> 출력: 1</li>
  </ul>
  </div>

- [x] **NOT 게이트**

입력이 0이면 출력이 1이고, 입력이 1이면 출력이 0인 게이트입니다.
  
  <div class="notice--primary">
  <h4>진리표</h4>
  <ul>
    <li>입력: 0 -> 출력: 1</li>
    <li>입력: 1 -> 출력: 0</li>
  </ul>
  </div>

- [x] **NAND 게이트**

AND 게이트의 출력을 반전한 게이트로, 모든 입력이 1일 때만 출력이 0입니다.
  
  <div class="notice--primary">
  <h4>진리표</h4>
  <ul>
    <li>입력: 0, 0 -> 출력: 1</li>
    <li>입력: 0, 1 -> 출력: 1</li>
    <li>입력: 1, 0 -> 출력: 1</li>
    <li>입력: 1, 1 -> 출력: 0</li>
  </ul>
  </div>

- [x] **NOR 게이트**

OR 게이트의 출력을 반전한 게이트로, 모든 입력이 0일 때만 출력이 1입니다.
  
  <div class="notice--primary">
  <h4>진리표</h4>
  <ul>
    <li>입력: 0, 0 -> 출력: 1</li>
    <li>입력: 0, 1 -> 출력: 0</li>
    <li>입력: 1, 0 -> 출력: 0</li>
    <li>입력: 1, 1 -> 출력: 0</li>
  </ul>
  </div>

- [x] **XOR 게이트**

입력이 서로 다를 때 출력이 1인 게이트입니다.
  
  <div class="notice--primary">
  <h4>진리표</h4>
  <ul>
    <li>입력: 0, 0 -> 출력: 0</li>
    <li>입력: 0, 1 -> 출력: 1</li>
    <li>입력: 1, 0 -> 출력: 1</li>
    <li>입력: 1, 1 -> 출력: 0</li>
  </ul>
  </div>

- [x] **XNOR 게이트**

XOR 게이트의 출력을 반전한 게이트로, 입력이 서로 같을 때 출력이 1입니다.
  
  <div class="notice--primary">
  <h4>진리표</h4>
  <ul>
    <li>입력: 0, 0 -> 출력: 1</li>
    <li>입력: 0, 1 -> 출력: 0</li>
    <li>입력: 1, 0 -> 출력: 0</li>
    <li>입력: 1, 1 -> 출력: 1</li>
  </ul>
  </div>

## 논리 회로

> 논리 게이트를 조합하여 더 복잡한 논리 회로를 만들 수 있습니다. 
> 
> 이러한 회로는 다음과 같은 기능을 수행할 수 있습니다

1. **조합 논리 회로**: 입력값의 조합에 따라 출력을 결정하는 회로입니다. 
예: 가산기(adder), 디코더(decoder).

2. **순차 논리 회로**: 시간의 흐름에 따라 상태가 변화하는 회로입니다. 
예: 플립플롭(flip-flop), 레지스터(register).

## 디지털 논리의 응용

> 디지털 논리는 컴퓨터, 스마트폰, 디지털 카메라 등 다양한 전자 기기의 설계와 운영에 필수적입니다. 
> 
> 프로세서, 메모리, 통신 장비 등에서 디지털 논리를 이용하여 데이터 처리와 제어를 수행합니다.

디지털 논리를 이해하는 것은 컴퓨터 공학 및 전자 공학의 기본이며, 더 나아가 소프트웨어와 하드웨어의 상호작용을 이해하는 데 중요한 역할을 합니다.

## 📖Reference

[digitallogic](https://cs.lmu.edu/~ray/notes/digitallogic/)

[How to Use Digital Logic in Electronic Circuits - Circuit Basics](https://www.circuitbasics.com/what-is-digital-logic/)
