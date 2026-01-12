---
title: "Computer Vision : Détection d'anomalies industrielles (SNCF)"
date: 2026-01-12
categories:
  - Computer Vision
  - MLOps
tags:
  - Python
  - Azure
  - YOLO
header:
  teaser: /assets/images/logo-sncf.png # On mettra une image plus tard
excerpt: "Industrialisation d'un modèle de Computer Vision pour sécuriser la maintenance ferroviaire. De la R&D au déploiement MLOps sur Azure."
---

## 🎯 Le Défi
La maintenance préventive des voies ferrées est un enjeu critique pour la SNCF. L'objectif était d'automatiser la détection de défauts sur les caténaires à partir de flux vidéo haute résolution, pour réduire l'intervention humaine en zone dangereuse.

## 💡 La Solution Technique

J'ai piloté le développement d'une pipeline de Vision par Ordinateur complète :

* **Modélisation :** Fine-tuning de modèles **YOLOv8** sur un dataset propriétaire annoté.
* **Traitement d'images :** Pré-processing avec **OpenCV** (réduction de bruit, normalisation).
* **Architecture Cloud :** Déploiement sur **Azure ML** avec utilisation de GPU pour l'inférence temps réel.

### La Stack Technique
* **Langage :** Python 3.9
* **Frameworks :** PyTorch, Ultralytics (YOLO), FastAPI
* **Ops :** Docker, Kubernetes (AKS), CI/CD GitHub Actions

## 🚀 Résultats & Impact

> "Ce système a permis d'augmenter la couverture d'inspection de 40% tout en divisant par deux le temps d'analyse des vidéos."

* **Précision (mAP) :** 92% sur les défauts critiques.
* **Latence :** Traitement de 30 images/seconde en production.
* **Scalabilité :** Déploiement automatisé via pipeline MLOps.

---
[Retour à l'accueil](https://www.thiernobarry-ai.com)
