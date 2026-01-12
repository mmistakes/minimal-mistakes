---
title: "Migration Cloud : De SAS Legacy vers Azure Databricks (Circana)"
date: 2026-02-01
categories:
  - Data Engineering
  - Cloud Migration
tags:
  - Azure
  - Databricks
  - PySpark
  - SAS
header:
  teaser: https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/1200px-Microsoft_Azure_Logo.svg.png
excerpt: "Modernisation d'une infrastructure Data Legacy. Migration des pipelines ETL critiques de SAS vers une architecture Lakehouse sur Azure Databricks."
---

## 🎯 Le Défi : L'Impasse du Legacy (SAS)
Circana (ex-NPD Group) gérait des volumes massifs de données panelistes (Food Service, Beauty) via une infrastructure **SAS On-Premise** vieillissante.
* **Contrainte critique :** Expiration imminente des licences SAS et coûts de maintenance élevés.
* **Freins techniques :** Difficulté à scalabiliser les traitements et impossibilité de déployer des modèles de Machine Learning modernes.

## 💡 La Solution : Refonte vers Azure Lakehouse

J'ai piloté la migration technique des flux ETL critiques vers le Cloud Microsoft Azure, en passant d'une logique "Boîte Noire" à une architecture ouverte et distribuée.

### 1. Stratégie de Migration (Re-platforming)
Plutôt qu'un simple "Lift & Shift", nous avons réécrit la logique métier :
* **Conversion de code :** Traduction des procédures SAS complexes en **PySpark** optimisé pour le calcul distribué.
* **Algorithme de Matching :** Développement d'un moteur de classification semi-automatique (mots-clés) pour catégoriser les tickets de caisse et données sociodémographiques.

### 2. Orchestration & DevOps
* Industrialisation des pipelines via **Azure Data Factory (ADF)** pour l'ingestion des données brutes (SME).
* Mise en place de pipelines CI/CD via **Azure DevOps** pour garantir la qualité du code en production.

## 🛠️ Stack Technique
* **Legacy :** SAS Base/Macro
* **Cloud Compute :** Azure Databricks (PySpark, SQL)
* **Orchestration :** Azure Data Factory (ADF)
* **Viz :** Power BI (pour le reporting client type McDonald's)

## 🚀 Résultats & Impact

> "Transformation d'un centre de coûts IT en plateforme d'innovation Data."

* **Performance :** Réduction drastique des temps de traitement grâce au calcul distribué Spark.
* **Scalabilité :** Capacité à absorber les pics de charge (données tickets de caisse mensuelles) sans saturation.
* **Coûts :** Suppression des frais de licence SAS et passage à un modèle "Pay-as-you-go".

---
[Retour à l'accueil](https://www.thiernobarry-ai.com)
