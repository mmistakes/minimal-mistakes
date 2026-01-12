---
title: "GenAI Souveraine : RAG Local avec Llama 3 & Qdrant"
date: 2026-03-01
categories:
  - Generative AI
  - Open Source
tags:
  - Llama 3
  - Qdrant
  - LlamaIndex
  - Docker
header:
  teaser: https://miro.medium.com/v2/resize:fit:1400/1*c_fiB-YgbNMkTwnHSjvDNg.png
excerpt: "Construction d'une architecture RAG 100% On-Premise pour données confidentielles. Stack Open Source : Llama 3, Qdrant et Embeddings BGE-M3."
---

## 🎯 Le Défi : Confidentialité & Souveraineté
Dans les secteurs régulés (Banque, Défense, Santé), l'envoi de documents sensibles vers des APIs publiques (comme OpenAI) est impossible. L'objectif était de concevoir un système de **Knowledge Management intelligent** fonctionnant entièrement en local ("Air-gapped"), sans qu'aucune donnée ne quitte l'infrastructure de l'entreprise.

## 💡 La Solution : La "Sovereign Stack"

J'ai déployé une architecture RAG haute performance utilisant uniquement des modèles et outils Open Source, conteneurisée via Docker.

### 1. Ingestion & Recherche Hybride
Pour dépasser les limites de la recherche vectorielle simple :
* **Embeddings SOTA :** Utilisation du modèle **BGE-M3** (BAAI) pour une représentation sémantique multilingue supérieure aux modèles propriétaires.
* **Vector Store :** Déploiement de **Qdrant** (Rust) pour le stockage vectoriel.
* **Recherche Hybride :** Implémentation d'une stratégie de retrieval combinant *Dense Vector Search* (Sémantique) et *Sparse Keyword Search* (BM25) pour une précision maximale.

### 2. Inférence Locale (LLM)
* **Modèle :** **Meta Llama 3 (8B Instruct)** quantizé en 4-bit pour tourner sur des GPU grand public (T4/L4) avec une latence < 100ms.
* **Moteur d'inférence :** Utilisation d'**Ollama** pour servir le modèle via une API locale compatible REST.

## 🛠️ Stack Technique
* **LLM :** Llama 3 (via Ollama/vLLM)
* **Orchestration :** LlamaIndex (Python)
* **Vector DB :** Qdrant (Docker)
* **Embedding :** HuggingFace (BAAI/bge-m3)
* **Infra :** Docker Compose, NVIDIA Container Toolkit

## 🚀 Résultats & Performance

> "La puissance de GPT-4, avec la confidentialité d'un coffre-fort."

* **Sécurité :** 0% de fuite de données (Architecture 100% Offline).
* **Coûts :** Suppression des coûts variables au token (CAPEX vs OPEX).
* **Qualité :** Le Reranking (ColBERT) a permis d'atteindre un score de pertinence comparable aux solutions propriétaires sur le corpus technique.

---
[Retour à l'accueil](https://www.thiernobarry-ai.com)
