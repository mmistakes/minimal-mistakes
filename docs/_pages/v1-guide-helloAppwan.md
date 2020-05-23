---
title: "Hello, AppWAN!"
permalink: /v1/guides/hello-appwan/
sidebar:
    nav: v1guides
toc: true
---

## Audience
This is for you if you're ready to create a functioning AppWAN. I'll assume you're acquainted with [the general concepts](/help#general-netfoundry-concepts) and have an API token ([authentication](/v1/guides/authentication/)).

<div class="notice--warning">
RapidAPI subscribers may use the same order of operations, but will use the RapidAPI code samples to compose valid HTTP requests for RapidAPI.
</div>



## How to Build an AppWAN
1. Create an endpoint. This endpoint will provide a service.
2. Create a service on the endpoint. The service is now terminated by this endpoint.
3. Create another endpoint, a client endpoint to initiate connections to the service.
4. Create an empty AppWAN, and add the initiating endpoint and terminated service.

## By Example
The result of this example is an AppWAN that allows a client endpoint to initiate connections to a service.

### Terminating Endpoint

#### Request

#### Response

### Service Definition

#### Request

#### Response

### Client Endpoint

#### Request

#### Response

### AppWAN

#### Request

#### Response
