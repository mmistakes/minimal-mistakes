---
title: "Hello, AppWAN!"
permalink: /v1/guides/hello-appwan/
sidebar:
    nav: v1guides
toc: true
---

## Audience
This is for you if you're ready to create a functioning AppWAN. I'll assume you're acquainted with [the general concepts](/help#general-netfoundry-concepts) and have an API token ([authentication](/v1/guides/authentication/)).



## How to Build an AppWAN
1. Create an endpoint. This endpoint will provide a service.
2. Create a service on the endpoint. The service is now "terminated" by the endpoint.
3. Create another endpoint to "initiate" connections to the service.
4. Create an empty AppWAN, and add the initiating endpoint and terminated service.

