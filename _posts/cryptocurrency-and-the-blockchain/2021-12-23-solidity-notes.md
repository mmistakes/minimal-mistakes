---
title: "Notes on Solidity, Blockchain, and Smart Contracts"
layout: single
categories:
  - "cryptocurrency_and_the_blockchain"
permalink: /categories/cryptocurrency_and_the_blockchain/notes_solidity_blockchain_and_smart_contracts
toc: true
header:
  image: "/assets/images/categories/cryptocurrency_and_the_blockchain/solidity_notes.jpeg"
  teaser: "/assets/images/categories/cryptocurrency_and_the_blockchain/solidity_notes.jpeg"
---

# Overview

This post will capture notes about Solidity, blockchain development, smart contracts, and the EVM. It is meant to be used for future Abdul’s reference. These notes follow a [Youtube tutorial](https://www.youtube.com/watch?v=M576WGiDBdQ&t=46080s "https://www.youtube.com/watch?v=M576WGiDBdQ&t=46080s") on Solidity by Patrick Collins.

# Blockchain Specific

## Blocks

- Miners get the block #, the data, and the hash; they must reverse engineer the nonce (PoW).

- Genesis block - First block

- Changing a middle block will result in needing to change every downstream block.

  - But other miners will notice any changes to an existing block and kick the bad actor out of the network.

## Keys

- Private keys are used for authentication; they are also used to sign transactions/messages. A private key can sign a message. A validator can utilize your public key against the message to make sure your private key signed it.

- Someone with our private key can access our accounts, but they can also sign messages for us.

- Your Ethereum address is a hash of your public key.

- Each node keeps track of the blockchain

## Consensus

- Consensus - Mechanism to agree on the state of the blockchain

### Proof of Work

- Sybil resistance mechanism (Proof of Work) - Provides a way to figure out who the block author is (through proof of work). Sybil Resistance is the blockchain's ability to defend against multiple people creating fake blockchains.

- Block time - The time between blocks being published. It correlates to the difficulty of the problem that needs to be solved by miners.

- Nakamoto consensus - A combination of proof of work and longest chain rule.

  - Block confirmation - The number of blocks on top of some origin block.

  - Proof of work is not the consensus protocol; it is a part of the Nakamoto Consensus protocol.

- Miners get paid in two ways

  - The transaction fee - Provided by the sender

  - The block reward - Provided by the protocol

- Sybil Attack

  - When users create many accounts to try to influence the network.

  - Pretending to be multiple people

- 51% Attack

  - If you own 51% of the network and create a fork (you add fake transactions and validate them).

### Proof of Stake

- Users put up a stake to become validators. If they get out of line, they lose their stake.

- Miners are called Validators.

- A user is randomly selected to create the next block. Once they have made it, a group of validators validates that the users were honest.

- RanDAO - Collectively chooses which node is selected next.

## Scalability

### Sharding

- A blockchain of blockchains

- More chains for people to make transactions on.

## Rollups

- Kind of like a shared chain.

- They send bulk transactions to layer 1.

# Solidity Notes

- EVM - Ethereum Virtual Machine, where most smart contracts are deployed.

## General Process for Brownie - Manual

This is how to **set up a project using Brownie manually**.

1.  `brownie init`

2.  Write a smart contract in `contracts/`

3.  Setup `brownie-config.yaml`

    1.  Add any dependencies, networks, `dotenv`, `wallets`, etc.

    2.  You can find important addresses on [chainlinks](https://docs.chain.link/docs/vrf-contracts/ "https://docs.chain.link/docs/vrf-contracts/").

4.  Add a `.env` file for testing.

5.  Write a generic test in `tests/`

    1.  Use the default account: `accounts[0]`

    2.  The purpose here is to ensure that you have a generic connection with your test and contracts.

6.  Create a deployment script in `scripts`

    1.  Import your `helpful_scripts.py` package

    2.  Integrate your `helpful_scripts.py` in your `scripts/deploy.py`

7.  Setup any `mocks` in `helpful_scripts.py`

    1.  Create a function that will decipher between a development network and a live network.

    2.  Create a `contracts/test` folder.

    3.  Add any `.sol` files for creating the mocks.

        1.  It might be easiest to simply copy the `test` folder from [chainlink mix](https://github.com/smartcontractkit/chainlink-mix/tree/master/contracts/test "https://github.com/smartcontractkit/chainlink-mix/tree/master/contracts/test").

8.  Add any interfaces

    1.  Might be easiest to simply copy the `interfaces` folder from [chainlink mix](https://github.com/smartcontractkit/chainlink-mix/tree/master/interfaces "https://github.com/smartcontractkit/chainlink-mix/tree/master/interfaces").

9.  Deploy contract locally

    1.  Add all the necessary functions to interact with the smart contract into the `scripts/deploy.sh`

10. Testing code

    1.  Unit testing

    2.  Test functions that should pass as well as those that shouldn’t

    3.  Its okay to hardcode here for predictable functionality

    4.  Integration Testing

## General Process for Brownie - Bake

This process uses brownie bake.

1.  Use `brownie bake {mix} {dir_name}`

    1.  This will set up all the necessary project files saving time.

2.  Review the `brownie-config.yaml`

    1.  Utilize `.dotenv`

3.  Add a `deploy` script

## Testing

The priority for testing should be:

1.  Brownie Ganache chain with mocks: Always

2.  Testnet: Always (Mostly for integration testing)

3.  Brownie mainnet fork: Optional

4.  Custom mainnet fork: Optional

5.  Self/Local Ganache: Good for tinkering

### Unit Tests

- A majority of tests should be unit tests.

- Run unit tests in the development environment. This is quicker and more efficient.

- 3 Phases

  - Arrange

  - Act

  - Assert

### Integration Test

- It can be run on a test net.

- It can be run on a local mainnet fork.

# NFTs

- ERC-721 - The NFT standard

- ERC 1155 - Semi-fungible tokens

- ERC-721

  - Each NFT has metadata

  - The NFT contains the token uri

- Images and NFT attributes are currently not stored on-chain.

- IPFS is commonly used to store images in a decentralized fashion.

- An NFT must be verifiably scarce to hold value.

- Utilize a service like Pinata to pin your image… forever.

# Upgrades

Three types of upgrades:

- Not really/parametrize

  - Can’t add new storage and logic

  - But we parameterize each variable within the contract and change the values.

  - Doesn’t provide full functionality for upgrades.

- Social YEET/migration

  - You create a new contract, which is unassociated with the original contract, and tell everyone to move over (Uniswap V1 → Uniswap V2)

  - Cons

    - Lots of work to move users over

    - New address

  - Pros

    - Truly immutable

    - Easy to Audit

- Proxies

  - `delegatecall` - Call another contracts functions in your contract.

  - Terminology

    - Implementation Contract - Contains all of the logic for the contract.

    - Proxy Contract - Points to the “correct” implementations contract and routes everyone's calls there.

    - User - Calls the proxy.

    - Admin - User/group responsible for upgrading the implementation contracts.

  - Gotchas

    - Storage Clashes - The proxy contracts change the implementation contracts storage values.

    - Function Selector - Two functions can have the same function selector causing errors.

    - No current “golden standard" for upgrades.
