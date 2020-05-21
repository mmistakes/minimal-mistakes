---
title: "Hello, AppWAN!"
permalink: /v1/guides/hello-appwan/
sidebar:
    nav: v1guides
---

## How to Build an AppWAN
1. Create an endpoint. This endpoint will provide a service.
2. Create a service on the endpoint. The service is now "terminated" by the endpoint.
3. Create another endpoint to "initiate" connections to the service.
4. Create an empty AppWAN, and add the initiating endpoint and terminated service.

