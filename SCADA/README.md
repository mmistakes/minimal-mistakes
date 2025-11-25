# SCADA Documentation

This folder contains documentation about NVIDIA's SCADA (SCaled Accelerated Data Access) technology.

## Contents

### Chapter 1: SCADA Architecture
**File:** `Chapter-1-SCADA-Architecture.md`

Topics covered:
- What is SCADA (by NVIDIA)
- Architecture and Components (Client, Server, Protocols)
- Use cases and motivations
- Q&A section covering trusted/untrusted models, protocols, and communication

### Chapter 2: SCADA Motivation
**File:** `Chapter-2-SCADA-Motivation.md`

Topics covered:
- AI 시대의 데이터와 Storage 목적 변화
- TB/TCO → IOPS/TCO 패러다임 전환
- 기존 CPU 중심 방식의 병목
- Little's Law and performance requirements

### Chapter 3: SCADA BaM (Big Accelerator Memory)
**File:** `Chapter-3-SCADA-BaM.md`

Topics covered:
- Big Accelerator Memory concept
- GPU as data access engine
- Critical Section problems and solutions
- Request batching and coalescing
- NVMe Queue structure

## Images

All images are stored in the `images/` subdirectory. See `images/README.md` for the list of required images.

## Notes

- Content converted from Obsidian format to Jekyll-compatible markdown
- Image references updated from `![[image.png]]` to `![alt](path/to/image.png)` format
- Korean language content preserved as-is
