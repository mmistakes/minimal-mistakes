---
title: Use Azure Key Vault as TDE with Azure PaaS Services
date: 2020-02-20 16:12
author: nicold
comments: false
tags: [Azure, Linux, App Service, github, github action, angular, node, git, PM2, SPA, Single Page App]
---

This sample demonstrates how to deploy, from GitHub, an Angular single page application (SPA) to Azure App Service running Node.js on Linux. A continuous delivery/continuous integration pipeline will be also put in place with a GitHub Action.

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

# Logic diagram
The following picture shows the logic flow from developer's commit to production web on Azure, implemented in this sample.

![Logic Diagram](../assets/post/2020/angular-appservice/architecure.jpg)

# Create sample Angular app
First thing to do is install the tools we’re going to need.
If you don’t have **git**, **node.js**, and **npm** installed already, go ahead and install them.

Then go to the command line and run the following command to install Angular CLI, which is a command line tool that we can use to scaffold Angular applications

```powershell
npm install -g yarn
yarn global add @angular/cli
```

Let's then scaffold our first application. Create a folder on you computer you will use as container for your project repository, go inside it and type:

```powershell
ng new hello-world-app
```

This is going to take a while, but it will create a new project structure and it will install all the needed dependencies in one go. When done, we are ready to run the application: We can run our application by simply doing:

```powershell
cd hello-world-app
ng serve
```

The **ng serve** command should start a development server on your locahost port 4200, so if you go to your browser and enter the following url:

**http://localhost:4200**

You should see in the browser the following page.

![localhost](../assets/post/2020/angular-appservice/angular-localhost.jpg)

# Push to a GitHub repository

**ng new** have created a local git repository for you. Run the following commands to track your files and make the initial commit in the local repository:

```powershell
git add .
git commit -m "my first commit"
```

When that’s done, we successfully prepared our new local repository to be pushed to GitHub. You can now navigate to the GitHub page for creating new repositories by visiting this link: https://github.com/new

On that page, you need to specify a repository name and an optional description.

For the Repository name, we can specify the same project name (*hello-world-app*) as the local repository that we are using in our example. 

You can set your repository to be Public or Private. When uploading your code to a public directory, make sure it doesn’t contain any sensitive data not intended to share with others. When creating a Private repository, you’ll manually choose who can access the new repository.

Now switch back to your local terminal and run the specified commands from your project folder:

```powershell
git remote add origin <https://github.com/><your-username>/<your-repo-name>.git
git push -u origin master
```

# Create an App Service plan and App Service running Linux and node.js
on your Azure subscription you have to create:

* a resource group
* an App Service plan
* an App Service

To create all there elementos go to https://ms.portal.azure.com/#create/Microsoft.WebSite and fill all fields as in the following screenshot.

![create Web App](../assets/post/2020/angular-appservice/create-web-app.jpg)

when the resources are ready click on the button [**go to resource**].

# Deploy angular app to appservice via GitHub action
In Azure, in the App Service configuration, select Deployment Center -> GitHub -> Authorize

![Deployment Center](../assets/post/2020/angular-appservice/deployment-center.jpg)

after connected Azure and GitHub, click on **continue** button. It is the time to select your build provider: so you click on [**GitHub Actions**] and [**continue**]. On the next page select your organization, repository and branch. Leave Node as runtime stack as in the picture below.

![configure](../assets/post/2020/angular-appservice/deployment-configure.jpg)

click on [**continue**] and [**finish**] will set up your building pipeline on GitHub. In your GitHub repository you will find a .yml file under *.github/workflow*. If you go in Action menu you will also find a workflow running (yellow circle animation): Azure have created a yml file|workflow in GitHub that will build your app and deploy it to your App Service.

![workflow](../assets/post/2020/angular-appservice/github-action.jpg)

this workflow could require few minutes to complete, and at the end probably all the process will terminate with an error. To understand why it fails and how can we fix it we have to analize the file *.github/workflow/master_hello-world-app-to-delete.yml* (your file could have a different name, but the directory will be the same).

The content of your file will be very similar to the following:

```powershell
# Docs for the Azure Web Apps Deploy action: https://github.com/Azure/webapps-deploy
# More GitHub Actions for Azure: https://github.com/Azure/actions

name: Build and deploy Node.js app to Azure Web App - hello-world-app-to-delete

on:
  push:
    branches:
      - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@master

    - name: Set up Node.js version
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'

    - name: npm install, build, and test
      run: |
        npm install
        npm run build --if-present
        npm run test --if-present

    - name: 'Deploy to Azure Web App'
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'hello-world-app-to-delete'
        slot-name: 'production'
        publish-profile: ${{ secrets.AzureAppService_PublishProfile_a094*****************f8ce }}
        package: .
```

It begins with some comment and a Name field. The first interesting part is the following:

```powershell
on:
  push:
    branches:
      - master
```

that means "please run this workflow on each commit on master branch". If you prefer to trigger your workflow by hand change it in:

```powershell
on:
  workflow_dispatch:
```

follows the jobs part, containing 1 job "build and deploy" that will run on Ubuntu

```powershell
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
```

this job when executed, runs 4 steps:

first: fetchs from the repository the master branch

```powershell
- uses: actions/checkout@master
```

Second: setup a node.js enviroment

```powershell
- name: Set up Node.js version
     uses: actions/setup-node@v1
     with:
       node-version: '12.x'
```

third: install build and run test of the solution. This steps usually **fails**

```powershell
- name: npm install, build, and test
      run: |
        npm install
        npm run build --if-present
        npm run test --if-present
```

in order to fix it, remove the test step, and change the build as the following

```powershell
- name: npm install, build, and test
      run: |
        npm install
        npm run build --prod
      working-directory: .
```

we have removed the test step because it needs Chrome, that requires an X display to run. With this change the build should work, but if you open your appservice you should continue to receive the following message:

*:( Application Error: If you are the application administrator, you can access the diagnostic resources.*

![Application Error](../assets/post/2020/angular-appservice/application-error.jpg)

to fix it you have to work on both workflow on GitHub, and App Service side.

the deploy task to Azure should be changed from this:

```powershell
- name: 'Deploy to Azure Web App'
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'hello-world-app-to-delete'
        slot-name: 'production'
        publish-profile: ${{ secrets.AzureAppService_PublishProfile_a094*****************f8ce }}
        package: .
```

to this:

```powershell
- name: 'Deploy to Azure Web App'
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'hello-world-app-to-delete'
        publish-profile: ${{ secrets.AzureAppService_PublishProfile_a094*****************f8ce }}
        package: ./dist/hello-world-app
```

because (1) the slot-name is not needed on B1 App Service plan and (2) the package to deploy is located in dist/hello-world-app folder, and not in the root.

On App Service side you have to configure the system to serve static files over HTTP, and this can be done using PM2 (https://pm2.keymetrics.io/docs/usage/expose/).
So on AppService -> Settings -> General Settings -> Startup command that is blank, insert the following text

**pm2 serve /home/site/wwwroot --no-daemon --spa**

![AppService Settings](../assets/post/2020/angular-appservice/appservice-settings.jpg)

We are ready to go: run the GitHub action again, and enjoy the app running on the cloud.

[Angular App in cloud](../assets/post/2020/angular-appservice/angular-cloud.jpg)

