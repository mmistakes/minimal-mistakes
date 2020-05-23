---
title: Early Bug Detection using Pull Request Builds
tags:
    - devops
    - jenkins
    - qa
    - ci
    - kubernetes
author: Albert
author_profile: true
excerpt: One of the biggest headaches any Devops Engineer faces is how to ensure bugs are not introduced into working software.
toc: true
last_updated: April 13, 2020
---

### Background

One of the biggest headaches any Devops Engineer faces is how to ensure bugs are not introduced into working software. This has to be done without slowing down feature rollout from developers. Traditional approaches have relied on Continuous Integration ( such as Jenkins, Bitbucket ) to perform a build of newly introduced features. This is highly inadequate and doesn't test critical failure points such as runtime errors and database migrations. As a result, once the branches are merged in, often times bugs are introduced sometimes leading to downtime.

What is needed is something more robust to test any pull requests before they get merged into the main branch. This will allow us to test different aspects of pre-deployed software including

*   Successful deployment of micro-services
    
*   Runtime errors
    
*   Database Migrations
    
*   Correct API response from pre-deployed micro-services
    

### Before PR Builds

Before we go into the solution, a quick highlight into our software stack. The software is split into micros-services which are running on AWS ECS ( Elastic Container Service ). The data layer is housed in AWS MySQL RDS. We use Bitbucket as the code repository and Jenkins as the CI server. All branches have to go through a build and unit test through Jenkins and only merges to the main branch will lead to deployments on ECS and database migrations on AWS RDS. Bitbucket branch permissions is used to that define merge rules, e.g you cannot merge code to main branch without a successful build.

![pr-build-diagram](/assets/images/prbuild-diagram.png)

Feature Branch Build

![feature-branch-build](/assets/images/feature-branch-build.png)

Main Branch Build

![main-branch-build](/assets/images/main-branch-build.png)

### After PR Builds

To improve our build quality, the key step introduced was to use Kubernetes and Jenkins to setup dynamic environments for any pull requests that are raised. This dynamic environment will host both the micro-services and databases, and will allow automated run of tests in the environment. Approval of the Pull Request is fully dependent on these tests passing.

![prbuild-diagram-after](/assets/images/prbuild-diagram-after.png)

PR Build Steps

Following steps are performed during the PR build and test environment

1.  Once a Pull Request is raised, Bitbucket will call the Jenkins webhook to trigger a build
    
2.  Jenkins will then checkout this branch from Bitbucket
    
3.  Jenkins will compile the code ensuring no compilation errors
    
4.  Jenkins will use AWS CLI to spin up EC2 instances which are powering the Kubernetes cluster. This is to ensure there is enough capacity on Kubernetes to spin up new services
    
5.  Jenkins will use Kubernetes CLI to create a namespace for this PR.
    
6.  Jenkins will spin up MySQL database containers on Kubernetes and import Sandbox data to the containers.
    
7.  Jenkins will then spin up all the micro-services and ensure they start correctly
    
8.  A full stack of tests is run on the new k8s environment setup
    
9.  Jenkins will then use Bitbucket API to pass/fail the build.
    
10.  k8s namespace and AWS EC2 resources are destroyed to conserve cost.
    
11.  All the container logs are shipped to Elastic using Filebeat, so engineers can analyze any errors
    
12.  Targeted slack notifications are used to alert developers of any errors.

![full-pipeline](/assets/images/full-pipeline.png)

### Key Learnings

1.  This drastically improved the quality of software. We moved from ~2 outages every sprint ( 2 week cycle ) to one outage every quarter. As we have kept improving the quality of the tests we have noticed that this number keeps getting better
    
2.  There was improved acceleration and confidence from developers as well, as they were not worried that they would push bugs to the main branch, since we run a full cycle of tests each time.
    
3.  Logging was critical as the k8s environment was span down immediately after. It was critical developers will be able to search exact reason for a PR denial.
    

