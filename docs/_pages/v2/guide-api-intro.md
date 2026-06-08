---
title: Overview
redirect_to: "https://netfoundry.io/docs/platform/api-guides/"
permalink: /guides/introduction/
redirect_from:
    - /guides/
    - /guides/overview/
    - /v2/
    - /v2/guides/
    - /v2/guides/overview/
    - /v2/guides/introduction/
sidebar:
    nav: "v2guides"
toc: true
---

{% include intro.md %}

## The Web Console

the [NetFoundry Web Console](https://nfconsole.io/) is an implementation of the API and so may help to express the model of the API while you're learning [how to build an AppWAN](/guides/rest/). For example, you might inspect the HTTP requests sent from your browser if you're unsure how to automate a particular action and need a hint for searching [the API reference](/reference/).

## Representations

This RESTful API transacts meaningful HTTP verbs and request paths and parameters. Most types of requests and responses also have an HTTP document body which is always a JSON representation. Requests that include a JSON body must also include a header `Content-Type: application/json`, and responses with a JSON body will have this header too.

Here you'll find [the API reference](/reference/).

There is one alternative form for mutable resources in the network domain: the `create` form. You may request this by appending `as=create` to the semi-colon-separated values in a request `ACCEPT` header, like this:

```http
accept: application/json;as=create
```

The `create` form of a resource presents only the properties that are necessary to re-create the same resource, and so it is useful for duplicating or backing up. You may request the `create` form of a single resource or an entire network.

Here's how you would request the `create` form of a service with the CLI:

```bash
# represent the resource as YAML in the as=create form
nfctl get service name="ACME Service" --as=create
```

```yaml
attributes:
- '#acme_services'
encryptionRequired: true
model:
    bindEndpointAttributes:
    - '#acme_endpoints'
    clientIngress:
        host: acme-service.netfoundry
        port: 80
    edgeRouterAttributes: []
    serverEgress:
        host: 127.0.0.1
        port: 8000
        protocol: tcp
modelType: TunnelerToEndpoint
name: ACME Service
```

The equivalent HTTP request:

```http
GET /core/v2/services?name=ACME%20Service25&networkId=${networkId} HTTP/1.1
Host: gateway.production.netfoundry.io
User-Agent: python-requests/2.27.1
Accept-Encoding: gzip, deflate
accept: application/hal+json;as=create
Connection: close
authorization: Bearer ${NETFOUNDRY_API_TOKEN}
```
