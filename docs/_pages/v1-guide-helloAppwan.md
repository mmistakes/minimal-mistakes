---
title: "Hello, AppWAN!"
permalink: /v1/guides/hello-appwan/
sidebar:
    nav: v1guides
toc: true
---

## Audience

This is for you if you're ready to create a functioning AppWAN. I'll assume you're acquainted with [the foundational concepts](/help#foundational-concepts) and have an API token from Auth0. Learn more in the [authentication guide](/v1/guides/authentication/).

RapidAPI subscribers may take the same steps except you will not need to provision a new network.
{: .notice--success}

## How to Build an AppWAN

1. Create a NetFoundry network.
2. Create a terminating endpoint.
3. Create a service.
4. Create a gateway endpoint.
5. Create a client endpoint.
6. Create an empty AppWAN, and add 
    1. the client and gateway endpoints and 
    2. the service.

## By Example

The result of this example is an AppWAN that allows Tunneler to initiate connections to a service.

### Create Network

**Request**

**Response**

### Terminating Endpoint

**Request**

**Response**

### Service Definition

**Request**

**Response**

### Gateway Endpoint

**Request**

**Response**

### Client Endpoint

**Request**

**Response**

### AppWAN

**Request**

**Response**
