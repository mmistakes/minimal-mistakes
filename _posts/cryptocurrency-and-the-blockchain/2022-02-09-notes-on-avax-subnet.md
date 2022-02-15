---
title: " Notes on Avalanche's Subnets"
layout: single
categories:
  - "cryptocurrency_and_the_blockchain"
permalink: /categories/cryptocurrency_and_the_blockchain/notes_avalanches_subnets
toc: true
tags:
  - avalanche
  - subnet
  - avax
  - crypto
  - blockchain
  - scaling
header:
  overlay_image: "/assets/images/categories/cryptocurrency_and_the_blockchain/avax-subnet-1.jpeg"
  teaser: "/assets/images/categories/cryptocurrency_and_the_blockchain/avax-subnet-1.jpeg"
  caption: Photo by **[John Robert-Nicoud](https://www.pexels.com/@john-robert-nicoud-5556?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)** from **[Pexels](https://www.pexels.com/photo/man-performing-snowboard-stunts-38242/?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels)**
  actions:
    - label: "Link to Podcast"
      url: "https://youtu.be/WhRkkr_tIkY"
---

# Overview

In this post, I am capturing notes from an [outstanding presentation by the Ava Labs](https://youtu.be/WhRkkr_tIkY) team on subnets. I highly recommend watching the video to get a better understanding of subnets. Please note I took these notes while watching the presentation; therefore they might be a bit rush and not entirely accurate.

# Horizontal Versus Vertical Scaling

- Vertical vs. horizontal scaling is a big issue with the blockchain.

- The Merkle-tree used for compression can be inefficient in many ways

  - Too many writes to disk.

  - Some solutions were initially reasonable but were outdated with current use cases.

- We need to scale more than 100x and focus more on infinite scaling.

- Horizontal scaling can be a great implementation if you can isolate blockchains for specific use cases. It’s easier if ten nodes only focus on their use case instead of keeping track of the overall state.

# What are subnets

- A new blockchain that runs on the avalanche ecosystem

- It takes two things to run a subnet

  - A virtual machine - Application-level logic of your blockchain. A representation of your state.

    - It contains all your transactions that manipulate your state.

  - A validator set - Provides the set of requirements needed for the blockchain.

    - Including things like KYC, hardware requirements, etc.

- On AVAX, the P-chain, C-chain, and X-chain can communicate with each other. In the future, subnets will have the capability of keeping track of only their state but also communicating with each other.

- Subnets are the “main catch” of Avax.

- Subnets allow you to deploy your own blockchain on Avalanche.

  - You need to provide the virtual machine (application rules) and the validator set (who can participate).

  - Allows you to have private and public blockchains.

  - Different virtual machines can be run on Avalanche.

    - EVM - Ethereum

    - Bitcoin’s VM

    - Solana’s VM

    - Cardano’s VM

# Power of Subnets

Compounding networking effect (Reed’s Law) - The deeper the network(s) are, the more value it has.

- The power of the AVAX subnet is that it can recreate many popular blockchains (and new blockchains) and allow for interpolation. You can have transactions between subnets.

- Hypothetically speaking, you can run a bitcoin subnet on AVAX, which uses PoS instead of Nakamoto Protocol. This would allow you to have significantly faster transactions while still utilizing bitcoin.

- **Avax Consensus** - Avalanche will determine the next block for you utilizing their consensus model. The creator of new blockchains only has to specify the actions that need to occur after a new block is mined.

- You don’t have to worry about the language; you simply need to implement the GRPC client into your logic.

- You can have instant access to liquidity if your subnet is on Avalanche.

  - Move assets from any subnets.

- No need to build bridges. Avax has put a lot of effort into their bridge, especially since it's a critical part of the subnet architecture.

- **You can build Layer 1’s on these subnets.**

- With Avax subnet, you can focus more on your application/business-specific logic.

- Existing L1s might want to deploy their virtual machines on AVAX.

- You can also have private blockchains but have them managed by the chain.

  - Regulatory compliance for banks can utilize this logic.

- Anyone can launch a subnet (permissionless); you don’t need to lock up funds. The only requirement is to serve as a validator of the P-chain.

- You might want to deploy a subnet for individual Dapp, similar to a microservice model.

- Deployment is super easy cause it’s all done through a **JSON** file.

  - In the future, there might be a frontend that allows users to interact with a frontend to create a subnet.

- If you run a subnet, you can choose what token is used for transactions and gas.

  - You can pay validators in the chosen token.

# How to Leverage Subnets

- Knowing Golang is a benefit when working with AVAX.

- Messing around with the EVM JSON config is a great way to experiment and start.

- Try to build a **real** blockchain on the subnet.

- Try to build a non-EVM blockchain on the subnet.

- The hardest thing might be to create a new VM from scratch.

  - Although the EVM is great, if history has taught us anything, everything gets replaced. Try to create the successor of the EVM.
