---
title: "Technical Experience Overview"
permalink: /categories/career/technical_experience/
layout: single
author_profile: false
sidebar:
  nav: "technical_experience"
category: technical_experience
excerpt: "Technical Experience"
toc: true
toc_sticky: true
categories:
  - career
tag:
  - technical_experience
  - devops
  - tech
  - fintech
  - linux
  - personal
header:
  overlay_image: "/assets/images/categories/career/technical_experience/general/technical_experience_1.jpg"
---

# Overview

This section of my website is meant to serve as a deep dive into my experience with certain tools, past projects, and roles. For a high-level overview, please [refer to my resume](https://s3.amazonaws.com/www.abdulrabbani.com/Abdul_Rabbani_resume_20220629.pdf).

# Tech Insight

Throughout my tech career, I have had the pleasure of having many teachers and learning many things. Some of my teachers have been books, videos, online courses, and, best of all, people. Below, I have summarized and linked the posts that capture my experience with prominent tools. Please click on the appropriate link to read any of the posts and see my experiences in more detail.

- [**DevOps Tools**](/categories/career/technical_experience/devops_tools) - A post capturing my experience with the tools and technologies I learned as a DevOps engineer.

  - **CI/CD Tools** - Created pipelines with **Jenkins**, **Travis**, and **GitHub Actions**.

  - **Terraform** - Wrote Terraform modules and contributed to multiple **Microsoft open source** repositories.

  - **Ansible** - Wrote hundreds of playbooks and roles in one of my favorite tools.

  - **Containers** - Utilized **Docker** and **Kubernetes** for development, deployment, and more.

- [**Programming Languages**](/categories/career/technical_experience/programming_languages) - A post capturing the languages I learned to _speak_ and write in, as well as my point of view on them.

  - **Python** - My first and favorite programming language that I have used to write various scripts and applications.

  - **Go** - A new favorite language. I appreciate the similarities to C while providing easy syntax like Python.

  - **C++** - A language I enjoyed writing code in and learned to understand at a deep level from an application perspective. I have configured, monitored, optimized, and tested many C++ applications.

  - **C** - A beautiful language that I _simply_ love. C provides elegancy and simplicity, which has made me an ardent supporter. A language I am happy I learned.

  - **Scala** - A language I picked up so that I may understand functional programming. I have also learned to work with Spark in Scala.

  - **Lua** - A language that I learned when writing NGINX custom modules.

  - **Bash** - A powerful scripting language that I continuously return to.

- [**Core Knowledge**](/categories/career/technical_experience/core_knowledge) - A post capturing my knowledge of fundamental technologies, ideas, and concepts.

  - **Linux Kernel Internals** - Emphasizing my deep appreciation of Linux, I now learned to understand the true beauty behind it.

  - **Core Internet Protocols** - Emphasizing my understanding of core internet protocols at a development level instead of simply understanding them at a user level.

# Featured Projects

The following links highlight a few projects that I’ve worked on in some of my previous roles. Fair warning, I will mainly capture my experience working in finance, as most of my experience working in tech can be captured within the “DevOps Tools” section.

- [**Internal Trading Market**](/categories/career/technical_experience/internal_trading_market) - At Societe General, I was responsible for creating an “internal market” that external clients would be able to route orders to. Learn about my experience with **Python**, **Pandas**, **market data**, **order entry**, and **smart order routing (SOR)** [here](/categories/career/technical_experience/internal_trading_market).

- [**Microwave**](/categories/career/technical_experience/microwave) - At Societe General, I worked closely with our Microwave instances. Learn about my experience configuring, analyzing, testing, upgrading, and architecting solutions for Microwaves [here](/categories/career/technical_experience/internal_trading_market).

# Open-Source Contributions

## Terraform - Microsoft Azure

The following contributions were made to Azure’s Cloud Architecture Framework (CAF), where I worked directly with the leaders in cloud automation.

- [Storage Account Management](https://github.com/aztfmod/terraform-azurerm-caf/pull/658)

- [File Storage Solution](https://github.com/aztfmod/terraform-azurerm-caf/pull/626/files)

- [Custom Data Logic for Azure VM](https://github.com/aztfmod/terraform-azurerm-caf/pull/667)

- [Azure VM Disk Creation](https://github.com/aztfmod/terraform-azurerm-caf/pull/688/files)

- [Azure Cognitive Services](https://github.com/aztfmod/terraform-azurerm-caf/pull/604)

## Vulcanize - Blockchain-Specific Contributions

At Vulcanize I contributed blockchain specific code in Golang, wrote entire testing and deployment frames works, and maintained a Geth Fork.

- `go-ethereum` [Fork](https://github.com/vulcanize/go-ethereum/tree/v1.10.19-statediff-v5) - The commit history is hard to decipher due to the rebase strategy.

  - [Updates for capturing known gaps while head tracking.](https://github.com/vulcanize/go-ethereum/pull/217/files)

  - [Updates for capturing RLP encoded uncles (Ommers).](https://github.com/vulcanize/go-ethereum/pull/250)

  - [Handling Geth Patches with complex conflicts.](https://github.com/vulcanize/go-ethereum/pull/222)

- [Stack Orchestrator](https://github.com/vulcanize/stack-orchestrator) - I am the primary maintainer of the repository. This repo is utilized for complex CI/CD pipelines, docker deployments, local testing, and starting geth in a local private network with deterministic behaviors.

  - [Compile Geth](https://github.com/vulcanize/go-ethereum/runs/7081923602?check_suite_focus=true) - One of the most useful pipelines I have built does the following.

    - Compiles Geth using the source code.

    - Start Geth in a private network using a custom Genesis File.

    - Deploy Smart Contracts using Foundry.

    - Execute Transactions and ensure they are properly written to a Postgres DB.

  - [Pre-Jobs](https://github.com/vulcanize/go-ethereum/actions/runs/2572252728) - A component I have added to CICD pipelines to avoid running duplicate jobs. This saves resources, time, and allows for smoother testing.

- `ipld-eth-db` - [A database](https://github.com/vulcanize/ipld-eth-db/commits?author=abdulrabbani00) that captures all events on the Ethereum Execution Layer.

- `ipld-eth-server` - [An application](https://github.com/vulcanize/ipld-eth-server/commits?author=abdulrabbani00) that serves Ethereum-specific data in an IPLD format.

## Ethereum Kubernetes Testnet

I created a [pull request](https://github.com/skylenet/ethereum-k8s-testnets/pull/16) to improve the Terraform deployments for deploying Kubernetes testnets.

## Foundry - Smart Contract Testing

Containerizing the testing framework (Co-Author)

- [Initial PR](https://github.com/foundry-rs/foundry/pull/914)

- [Final PR](https://github.com/foundry-rs/foundry/pull/981)

# Past Experience

Here I capture a few of my past roles of great significance.

## Vulcanize Inc

While working as a contractor for Vulcanize Inc, I provided value by developing the core applications for their new blockchain. I also learned the inner workings of Ethereum’s Consensus and Execution layer. I wrote all of the code in Golang, and I had the opportunity to work on various open-source projects.

Working with the authors of EIP-1599, I was able to gain insight into core blockchain concepts and technologies from some of the brightest minds in the space. As an application developer with strong DevOps experience, I was able to write the code for various blockchain indexers, deploy the infrastructure and monitor the stack in an automated fashion.

## Mobiz Inc

In the first half of 2021, I was the head of engineering at Mobiz Inc, a start-up based in California. At Mobiz, I oversaw the engineering department and implemented processes and standards. While at Mobiz, I learned much about client-facing businesses and consulting. I thoroughly enjoyed mentoring engineers, sharing my knowledge and love for tech, and seeing them improve and grow.

While at Mobiz, I also helped shift the company into the Agile methodology, migrating all projects to Jira and using Confluence for documentation. By improving the project management process, the organization could have more efficient cycles, better communication, and strong client relationships.

Through this managerial position, I gained many valuable skills which I will continue to develop, such as project planning, client-facing communication, and delegation. Although I enjoyed many aspects of leading an engineering department, I deeply missed being an engineer. I learned that I am committed to sharing knowledge and helping others improve their understanding of our field, but I most enjoy this work from a hands-on approach. Working at Mobiz was a great opportunity, and it helped me learn a lot about myself and what I want.

In my next role, I would love to combine my experience as a manager and my experience as an engineer. I could have a more meaningful impact with this approach. Instead of telling the engineers the best practices, I would love to implement them throughout the organization actively. From my experience, engineers are more susceptible to influence when it comes from a fellow engineer who understands their perspective. In the future, I want to utilize my skills to ensure that the management and engineering team are on the same page with the same goals in mind.

## Microsoft-PromoteIQ

From 2019-2021 I was a DevOps Engineer at a start-up called PromoteIQ, which Microsoft owns. PromoteIQ is an advertising firm that works in the private marketplace. My job there was to maintain all the servers, networks, applications, and infrastructure to be able to serve ads for our clients.

Part of being a good DevOps Engineer is ensuring you are not doing the same work twice. Infrastructure, applications, networks, servers, and other pieces of technology constantly need to be replicated and changed. Technology is great because if you work smarter, you can program it to do much for you. Some of the tools I leveraged to make my life easier were _**Ansible**,_ **Python**_,_ **Terraform**_, and_ **Jenkins**.

Like many companies, PromoteIQ lives on the cloud and not just one. PromotIQ has applications on **AWS**_,_ **GCP**_,_ **Azure**_,_ **Rackspace**_, and_ **Digital Ocean** to meet client needs. Because of solid leadership and competent engineers, we could efficiently serve clients out of various clouds. Through PromoteIQ and its focus on automation and growth, I understood what it takes to run a smart, sleek, and truly advanced shop in today's day and age.

I want to take the lessons learned here and apply them in my next role. Being part of a “tight ship” has shown me where most companies make mistakes in culture, collaboration, and innovation. I now understand the small, individual components that must work together for the crew to work better and can attempt to improve these components in my next role.

## Societe Generale

Before working for PromoteIQ, I was an SRE at Societe Generale, primarily focusing on the technology of the high-frequency, low-latency trading desk. My main focus was maintaining trading applications with latency and performance in mind. Some of my topics of interest were **microwave**_,_ **market data**_, and_ **smart order routing (SOR)**.

At SocGen, I learned to work very closely with physical hardware. Although I did not touch any servers in my time there, I quickly could decipher the right tool for the right job. Furthermore, with the help of some talented individuals, I became an experienced programmer at SocGen.

I started learning **Python** and quickly began working on the ILP (Internal Liquidity Provider) project. The project's purpose was to produce market data for our clients and have them route orders to us the way they would to a protected market. I used Python to improve a program that ensured that we were executing our client's requests at the best price on the market (Easier said than done). Working on the ILP project gave me a more profound and richer insight into the complexity of market data.

Eventually, I moved on to **C/C++**. Although I left before I could show my skills in **C/C++**, I believe that my former colleagues would be happy with my growth.

Working directly with trading applications in a programmatic way, I could learn their internal features and functions intimately. The lessons learned through projects like ILP gave me a deeper and richer insight into the complexity of market data, order entry, smart order routing, microwaves, and data manipulation. I hope to bring this insight to a company dedicated to creating robust, efficient, and dynamic trading systems.
