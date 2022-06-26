---
title: "Quick Tips – SonarQube en Docker"
author: Adan Alvarez
classes: wide
excerpt: "En este post explicaremos una forma sencilla de realizar un análisis de código utilizando SonarQube y Docker"
categories:
  - Herramientas
tags:
  - Containers
  - Análisis de código
---
En este post explicaremos una forma sencilla de realizar un análisis de código utilizando [SonarQube](https://www.sonarqube.org/) y [Docker](https://www.docker.com/what-docker).[![SonarQube con Docker](https://donttouchmy.net/wp-content/uploads/2018/02/DV-SonarQube-300x99.png)](https://donttouchmy.net/wp-content/uploads/2018/02/DV-SonarQube.png)
{: style="text-align: justify;"}

El propósito no es tener una instalación correcta de SonarQube sino usar el docker de SonarQube para analizar código de forma puntual.
{: style="text-align: justify;"}

Para realizar esto deberemos tener instalado Docker. Una vez tenemos instalado docker lo iniciamos:
{: style="text-align: justify;"}
```
systemctl start docker.service
```
Descargamos SonarQube y sonar-scanner:
{: style="text-align: justify;"}

[![docker](https://donttouchmy.net/wp-content/uploads/2018/02/docker-whale-home-logo-300x171.png)](https://donttouchmy.net/wp-content/uploads/2018/02/docker-whale-home-logo.png)
```
docker pull newtmitch/sonar-scanner
docker pull sonarqube
```
Iniciamos SonarQube:
{: style="text-align: justify;"}
```
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```
Iniciamos el escaner indicando dónde está el código a analizar:
{: style="text-align: justify;"}
```
docker run -it -v /path/to/source/code/:/root/src --link sonarqube newtmitch/sonar-scanner
```
Cuando el escaner finalice podremos ir a localhost:9000 y ver los resultados.
{: style="text-align: justify;"}
