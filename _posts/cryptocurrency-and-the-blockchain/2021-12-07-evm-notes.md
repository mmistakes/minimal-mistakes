---
title: "Notes on the EVM"
layout: single
categories:
  - "cryptocurrency_and_the_blockchain"
permalink: /categories/cryptocurrency_and_the_blockchain/notes_on_the_evm
toc: true
header:
  image: "/assets/images/categories/cryptocurrency_and_the_blockchain/evm_notes.jpeg"
---

# Overview

This post will capture my notes from a presentation by the [Ethereum Engineering Group](https://www.youtube.com/watch?v=RxL_1AfV7N4&t=255s "https://www.youtube.com/watch?v=RxL_1AfV7N4&t=255s"). This post is currently a work in progress.

# Compiler

-   Bin - Output for the byte code
    
-   ABI - Interface file which tells applications how to interact with your code.
    
-   Vyper is another EVM language.
    
-   The ABI and bin can be used with a wrapper generator (brownie).
    

# Deployment Architecture

-   A web3 library is used to interact with the Eutheruem network.
    
-   Solidity runs on an Etheruem client; the client is an instance of the software running on a node.
    

# Ethereum Transactions

-   When sending a simple transaction, the data field is usually empty but doesn’t have to be.
    
-   If you are deploying a contract, the `to` field must be empty.
    

# Stack, Memory, Storage, Code, CallData, Logs

-   EVM is a stack-based processor.
    
-   EVM can access and store information in six places.
    
    -   Stack - EVM Opcodes pop information from and push data onto the stack.
        
        -   The stack has a maximum depth of 1024 words. One word is 32 bytes.
            
    -   CallData - The data field of a transaction. These are parameters to the call.
        
    -   Memory - An information store accessible for the duration of a transaction.
        
    -   Storage - A persistent data store.
        
    -   Code - Execution code and static data storage.
        
    -   Logs - Write-only logger / event output.
        

# OpCodes in the Ethereum Yellow Paper

-   OpCodes represent tasks and operations.
    

# Contract Deployment, Constructors & Init Code Fragments

-   Init code - The init function includes code to deploy the contract plus the constructor to set up the contract state.
    
-   The bin contains the “init code fragment” and the “code to be deployed to the blockchain.”
    

## Constructor

Contracts are deployed using transactions where:

-   `To` address is not specified
    
-   `Data` is the init code fragment. This includes the contract binary. This is the compiler output in the `*.bin` file.
    

Note:

-   The init function is not stored on the blockchain.
    
-   The `data` of the transaction is treated as code for contract deployment.
    

## OpCode

-   `MSTORE` - Store a word in memory
    
-   `CALLVALUE` - Push how much Wei was sent with the transaction onto the stack. That is the `VALUE` transaction field.
    
-   `DUP1` - Duplicate the top of the stack.
    
    -   `DUP1` - `DUP31`: This will duplicate different levels of the stack.
        
-   `ISZERO` - Pops a word off of the stack. If the word is zero, push 1 onto the stack, otherwise push 0.
    
-   `PUSH2` - Push two bytes onto the stack.
    
-   `JUMPI` - Set the program counter (PC) to `stack[0]` if the `stack[1]` is not zero. Pop two values off the stack.
    
-   `REVERT` - Halt execution and indicates a `REVERT` has occurred. Use `stack[0]` as a memory location and `stack[1]` as a length of Revert Reason.
    
-   `JUMPDEST` - If the jump to Program Counter `0x10` was taken it would arrive here. Valid jump destinations are indicated by the `JUMPDEST` opcode.
    
-   `POP` - Pop the top value off of the stack.
    
-   `SSTORE` - Store a word to storage.
    
-   `COPYCODE` - Copy from code that is executing to memory.
    
-   `RETURN` - End execution, return a result and indicate successful execution.
    
-   `INVALID` - Invalid operation marks the end of the init code.
    
-   `CALLDATASIZE` - Push the size of the transaction data field onto the stack.
    
-   `LT` - Less than
    
-   `CALLDATALOAD` - Push the 32 bytes (of `CALLDATA`) onto the stack at offset `stack[0]`.
    
-   `SHR` - Shift `stack[1]` to the right `stack[0]` times, pop `stack[0]` off the stack.
    

## Init Code Summary

_For the specific example in the video._

-   Set up Free Memory Pointer (which wasn’t used).
    
-   Cause a `REVERT` if Wei was sent with the transaction (if the constructor is not payable).
    
-   Set up storage location with initial non-zero values.
    
-   Return a pointer to the contract code and length of code to be stored on the blockchain.
    

# Function Calls

-   `public` variables automatically have a `getter` function created.