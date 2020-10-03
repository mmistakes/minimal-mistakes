---
title: Use Azure Key Vault as TDE with Azure PaaS Services
date: 2020-02-20 16:12
author: nicold
comments: false
tags: [Azure, Linux, AppService, github, github action, angular, node]
---

This sample demonstrates how to deploy, from GitHub, an Angular single page application (SPA) to Azure App Service running node on linux. A continuous delivery/continuous integration pipeline will be put in place with Github Action.

This sample demonstrates who to:

* create a sample angular app
* push on a github repository
* create an appservice plan and appservice running linux and node
* deploy angular app to appservice via github action

For more information:

* <a href="https://git-scm.com/" target="_blank">git</a>
* <a href="https://nodejs.org/" target="_blank">node.js</a>
* <a href="https://www.npmjs.com/" target="_blank">npm</a>
* https://blog.angular-university.io/getting-started-with-angular-setup-a-development-environment-with-yarn-the-angular-cli-setup-an-ide/ 

# Logic Diagram
the following pictore shows the logic flow from developer's commit to production web on Azure.

![Logic Diagram](..\assets\post\2020\angular-appservice\architecure.jpg)

# Create sample angular app
First thing to do is install the tools we’re going to need.
If you don’t have **git**, **node.js**, and **npm** installed already, go ahead and install them.

Then go to the command line and run the following command to install Angular CLI, which is a command line tool that we can use to scaffold Angular applications

```powershell
npm install -g yarn
yarn global add @angular/cli
```

Let's then scaffold our first application. create a folder on you computer you will use as project repository, con inside it and type

```powershell
ng new hello-world-app
```

This is going to take a while, but it will create a new project structure and it will install all the needed dependencies in one go. when done, we are ready to use project: We can run our application by simply doing:

```powershell
cd hello-world-app
ng serve
```

The ng serve command should start a development server on your locahost port 4200, so if you go to your browser and enter the following url:

**http://localhost:4200**

You should see in the browser a blank screen with the message “**ello-world-app app is running!**”.

![localhost](../assets/post/2020/angular-appservice/angular-localhost.jpg)


continuare da quì
.............................................................................repository temporaneo di appoggio C:\MyProjects\GitHub\sample-cd-ci\

