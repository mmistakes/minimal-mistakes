---
layout: post
title: "Data Ingestion Project"
category: data-engineering
---

This project explores and implements several data ingestion techniques for migrating data from a MySQL relational database to a BigQuery data warehouse. The goal is to demonstrate how to handle different data synchronization scenarios, from simple full loads to more complex real-time updates.

The project is divided into three main parts:

1.  **Full Data Ingestion:** This approach involves copying the entire source table to the destination in each run. It's simple to implement but can be inefficient for large datasets with frequent changes. The pipeline reads all data from a MySQL table and overwrites the corresponding table in BigQuery.

2.  **Incremental Data Ingestion:** This method improves efficiency by ingesting only new or modified records since the last run. The implementation uses a timestamp column in the source table to identify changes. The pipeline handles `INSERT`, `UPDATE`, and `DELETE` operations correctly by comparing the source and destination datasets and applying the necessary changes in BigQuery.

3.  **Change Data Capture (CDC):** This is the most advanced technique, capturing changes in the source database in real-time and streaming them to the destination. This allows for near real-time data synchronization between MySQL and BigQuery.

The project includes Python scripts for each ingestion method, using libraries like Pandas for data manipulation and connectors for MySQL and BigQuery. The code is well-documented and serves as a practical guide for implementing robust data ingestion pipelines.

[Repository](https://github.com/0ladayo/data-ingestion)
[Medium Post](https://medium.com/codex/data-ingestion-full-data-ingestion-78f0dad296e9)

Tools used:
<i class="fab fa-python"></i>  Python,
<i class="fas fa-database"></i>  MySQL,
<i class="fab fa-docker"></i>  Docker,
<i class="fas fa-cloud"></i>  GCP.