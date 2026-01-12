---
title: "SNCF Réseau : Inventaire & Maintenance Prédictive par Vision Transformers"
date: 2026-01-12
categories:
  - Computer Vision
  - MLOps
tags:
  - AWS
  - Hugging Face
  - Transformers
  - PyTorch
header:
  teaser: https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Logo_SNCF_R%C3%A9seau_2015.svg/1200px-Logo_SNCF_R%C3%A9seau_2015.svg.png
excerpt: "Déploiement d'une architecture SOTA (DETR + OCR) sur AWS pour l'inventaire automatisé des actifs ferroviaires."
---

## 🎯 Le Défi : Moderniser la Maintenance Ferroviaire
SNCF Réseau doit inventorier et surveiller des milliers de kilomètres de voies. L'objectif était de passer d'une inspection manuelle à une **maintenance prédictive automatisée** capable d'identifier les actifs critiques (Traverses, Crocodiles, Signalisation) à partir de flux vidéo.

## 💡 La Solution Technique

J'ai conçu une architecture hybride alliant **Deep Learning de pointe** et **Cloud Engineering** :

### 1. Vision Transformers (SOTA)
Au lieu des architectures classiques (CNN), j'ai opté pour l'état de l'art :
* **Fine-tuning de modèles DETR** (Detection Transformer) via **Hugging Face**.
* Détection robuste des objets complexes malgré les conditions extérieures (pluie, luminosité).

### 2. Pipeline MLOps sur AWS
L'industrialisation est au cœur du projet :
* Gestion du **Data Lake** via **AWS S3** piloté par **Boto3** (Python).
* Pipeline automatisé pour le versionning des datasets et des modèles.

### 3. Hybridation OCR
Pour aller plus loin que la simple détection :
* Intégration du moteur **EasyOCR** en post-traitement.
* Lecture automatique et indexation des plaques de signalisation ferroviaire (TIV).

## 🛠️ Stack Technique
* **Langages :** Python 3.9
* **Frameworks IA :** PyTorch, Hugging Face (Transformers), EasyOCR
* **Cloud & Ops :** AWS (S3, Boto3), Docker
* **Data Eng :** Conversion automatique Excel vers COCO

## 🚀 Impact & Performance

> "Un système capable de lire le réseau ferroviaire comme un livre ouvert."

* **Performance :** Taux de détection **>97%** sur les objets critiques (Traverses, Crocodiles).
* **Monitoring :** Développement de modules d'évaluation automatique (mAP, F1-Score) pour garantir la non-régression du modèle en production.

---
[Retour à l'accueil](https://www.thiernobarry-ai.com)
