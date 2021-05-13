---
title: Build an Azure Windows Virtual Desktop for Demo
date: 2021-05-05 10:00
author: nicold
comments: false
tags: [Azure, Windows Virtual Desktop, Tutorial]
---

TUTTO DA RISCRIVERE This sample demonstrates how to deploy, from GitHub, an Angular single page application (SPA) to Azure App Service running Node.js on Linux. A continuous delivery/continuous integration pipeline will be also put in place with a GitHub Action.

This sample demonstrates how to:

* create a sample Angular app
* push to a GitHub repository
* create an App Service Plan and an App Service running Linux and Node.js
* deploy an Angular app to Azure App Service via GitHub action

For more information:

* Azure <a href="https://docs.microsoft.com/en-us/azure/app-service/" target="_blank">App Service</a> and <a href="https://docs.microsoft.com/en-us/azure/app-service/overview-hosting-plans" target="_blank">App Service Plan</a>
* <a href="https://git-scm.com/" target="_blank">git</a>
* <a href="https://nodejs.org/" target="_blank">node.js</a>
* <a href="https://www.npmjs.com/" target="_blank">npm</a>
* <a href="https://pm2.keymetrics.io/docs/usage/expose/" target="_blank">PM2</a>
* <a href="https://blog.angular-university.io/getting-started-with-angular-setup-a-development-environment-with-yarn-the-angular-cli-setup-an-ide/%20" target="_blank">Yarn and Angular CLI</a>


Passi operativi

1. Creazione del Resource Group
2. Creazione della VNET (10.10.0.0/16) - subnet1 (10.10.1.0/24)
3. Creazione Azure AD Domain Services
    1. DNS Domain Name: demo.nicold
    2. IL deployment può richiedere un'oretta
    (attenzione al DNS della VNET che dovrà puntare al DC (ci sarà un warning nella configurazione))
4. Creazione Host pool di Windows Virtual Desktop