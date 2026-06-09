---
title: "REST Examples"
redirect_to: "https://netfoundry.io/docs/platform/api-guides/provision-network"
permalink: /guides/rest/
redirect_from:
  - /v2/guides/hello-world/
  - /guides/hello-world/
  - /Hello-AppWAN-HTTPie/ # redirect from prior blog permalink
sidebar:
    nav: v2guides
toc: true
classes: wide
---

This guides you step by step to create an AppWAN with raw HTTP requests. There are other exercises you may find helpful:
* [Quickstart Demo with Docker](/guides/demo/)
* [Full-stack Hello, World! exercise with web console and AWS CloudFormation](https://netfoundry.io/helloworld/)

## Audience

This is for you if you're ready to create your first AppWAN with the NetFoundry API. It is assumed you are acquainted with [the foundational concepts](/help#foundational-concepts) and have an API account downloaded from the web console. You can go back to the [authentication guide](/v2/guides/authentication/) if you need to get that account or learn how to obtain a session token.

## By Example

The result of these HTTP requests is an AppWAN that allows an endpoint named "client1" to initiate connections to a service. You could describe any server in your service definition, even one that is not public as long as the edge router is able to reach the server. The example given is a NetFoundry-hosted edge router performing dual functions:
1. edge router for dialing endpoints
2. service hosting for http://eth0.me (a simple IP echo server)

### Set up Your Workspace

These examples, like those in the [authentication guide](/v2/guides/authentication/), make use of [HTTPie (command-line HTTP client)](https://httpie.org/) and [`jq` (command-line JSON processor)](https://stedolan.github.io/jq/).

If you have your API authentication token assigned to environment variable `NETFOUNDRY_API_TOKEN` then you're ready to go! You can go back to the [authentication guide](/v2/guides/authentication/) if you need to get that account or learn how to obtain a session token.

### Discover your Organization

This is like asking "Who am I?" and is merely informational, not required for the further steps in this exercise.

```bash
❯ http GET https://gateway.production.netfoundry.io/identity/v1/organization \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" |jq .
```

### Discover Network Group ID

A network group organizes your NetFoundry networks for billing and permissions. You need to know the network group ID in order to create a network. This example filters for a particular network group by name. There is typically only one.

<!-- TODO update organizations to fixed object reference like networkgroups -->
```bash
❯ http GET https://gateway.production.netfoundry.io/rest/v1/network-groups/ \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" | jq '._embedded.organizations[]|select(.name == "MYGROUP")|{name:.name,id:.id}'
{
  "name": "MYGROUP",
  "id": "4d15ef35-cfa0-4963-a667-5c86d16ce77e"
}
❯ NF_NETWORK_GROUP=4d15ef35-cfa0-4963-a667-5c86d16ce77e
```

### Discover Network Configuration ID

This is a simplistic sizing of your network's components. Use "small" for cost-conscious testing.

```bash
❯ http GET https://gateway.production.netfoundry.io/rest/v1/networkConfigMetadata/ \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" | jq '._embedded.networkConfigMetadatas[]|{name:.name,id:.id}'
{
  "name": "small",
  "id": "2616da5c-4441-4c3d-a9a2-ed37262f2ef4"
}
{
  "name": "medium",
  "id": "5df0ee05-2abd-4996-9261-f2da6c4d5c3a"
}
❯ NF_CONFIG=2616da5c-4441-4c3d-a9a2-ed37262f2ef4
```

### Create a Network

This will provision the dedicated compute infrastructure of your NetFoundry network. The value of `locationCode` determines the AWS region in which your controller node is located.

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/networks \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  locationCode="us-west-2" \
  name="exampleNetwork" \
  networkConfigMetadataId="${NF_CONFIG}" \
  networkGroupId="${NF_NETWORK_GROUP}" | jq .id
"3559807e-617d-4c29-a434-9ea15393a582"
❯ NF_NETWORK=3559807e-617d-4c29-a434-9ea15393a582
```

### Create an Edge Router

The minimal functioning network has a single hosted edge router performing two functions: edge router for dialing endpoints and hosting for a service.

```bash
❯ http GET https://gateway.production.netfoundry.io/rest/v1/dataCenters \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" | jq '._embedded.dataCenters[]|select(.provider == "AWS")|{location:.locationCode, id:.id}'
{
  "location": "ca-central-1",
  "id": "c3b7e284-a214-701e-0111-c3a7c2b1e280"
}
❯ NF_SERVICE_DC=c3b7e284-a214-701e-0111-c3a7c2b1e280
```

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/edge-routers \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" <<EOF | jq .id
{
        "networkId": "${NF_NETWORK}",
        "attributes": [
                "#defaultRouters"
        ],
        "name": "exampleEdgeRouter",
        "dataCenterId": "${NF_SERVICE_DC}",
        "linkListener": true
}
EOF
"38e52f43-bd70-46f7-b5b3-63b135a6ae2f"
❯ NF_EDGE_ROUTER=38e52f43-bd70-46f7-b5b3-63b135a6ae2f
```

### Edge Router Policy

Authorize endpoints with matching `endpointAttributes` to dial via edge routers to which this policy is applied in `edgeRouterAttributes`.

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/edge-router-policies \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" <<EOF | jq .id
{
  "endpointAttributes": [
    "#clients"
  ],
  "edgeRouterAttributes": [
    "#defaultRouters"
  ],
  "networkId": "${NF_NETWORK}",
  "name": "exampleEdgeRouterPolicy"
}
EOF
"e8a534a1-d4bc-4570-86c0-1288fb2ced65"
❯ NF_POLICY=e8a534a1-d4bc-4570-86c0-1288fb2ced65
```

### Define an endpoint-hosted service

Describe a server. Endpoints will be authorized to access this service if they have matching tags in `attributes`. You may host a service with one or more endpoints, and all hosting endpoints share the same `serverEgress` map describing the server that is reachable by the hosting endpoint(s).

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/services \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" <<EOF | jq .id
{
  "networkId": "${NF_NETWORK}",
  "name": "Endpoint echo service",
  "encryptionRequired": true,
  "model": {
    "clientIngress": {
      "host": "echo-service.netfoundry",
      "port": 80
    },
    "edgeRouterAttributes": [
      "#all"
    ],
    "bindEndpointAttributes": [
      "@Exit1690",
      "#echoExitEndpoints"
    ],
    "serverEgress": {
      "protocol": "tcp",
      "host": "eth0.me",
      "port": 80
    }
  },
  "attributes": [
    "#publicServices"
  ],
  "modelType": "TunnelerToEndpoint"
}
EOF
"dcfd61cd-0389-4828-aa37-abdfb020d329"
❯ NF_ENDPOINT_SERVICE_ID=dcfd61cd-0389-4828-aa37-abdfb020d329
❯ NF_ENDPOINT_SERVICE_NAME="Endpoint echo service"
```

### Define a router-hosted service

Describe a list of router-server pairs to host the service. You may host a service with one or more routers, each with their own `serverEgress` map describing a server(s) that is reachable by the hosting routers.

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/services \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" <<EOF | jq .id
{
  "networkId": "${NF_NETWORK}",
  "name": "Router echo service",
  "encryptionRequired": true,
  "model": {
    "clientIngress": {
      "host": "echo-router.Junction1690.netfoundry",
      "port": 80
    },
    "edgeRouterAttributes": [
      "#all"
    ],
    "edgeRouterHosts": [
      {
        "edgeRouterId": "${NF_EDGE_ROUTER}",
        "serverEgress": {
          "protocol": "tcp",
          "host": "eth0.me",
          "port": 80
        }
      }
    ]
  },
  "attributes": [
    "#publicServices"
  ],
  "modelType": "TunnelerToEdgeRouter"
}
EOF
"d1f6ef84-f979-4a2e-8e8f-b46c0fa1664b"
❯ NF_ROUTER_SERVICE_ID=d1f6ef84-f979-4a2e-8e8f-b46c0fa1664b
❯ NF_ROUTER_SERVICE_NAME="Router echo service"
```

### Create an AppWAN

Authorize endpoints with matching tags in `endpointAttributes` to access services with matching tags in `serviceAttributes`.

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/app-wans \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" <<EOF | jq .id
{
        "networkId": "${NF_NETWORK}",
        "serviceAttributes": [
                "#publicServices"
        ],
        "endpointAttributes": [
                "#clients"
        ],
        "name": "exampleAppWAN"
}
EOF
"6085ad2f-4adf-470c-a315-23f30b9aacae"
❯ NF_APPWAN=6085ad2f-4adf-470c-a315-23f30b9aacae
```

### Create a Client Endpoint

The tags in `attributes` are used to authorize this endpoint to access services with matching tags via edge routers with matching tags.

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/endpoints \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" <<EOF | jq .id
{
        "networkId": "${NF_NETWORK}",
        "attributes": [
                "#clients"
        ],
        "enrollmentMethod": {
                "ott": true
        },
        "name": "client1"
}
EOF
"345a13a6-ef47-42b5-bd45-c6aa2328d52d"
❯ NF_CLIENT_ENDPOINT=345a13a6-ef47-42b5-bd45-c6aa2328d52d
```

### Create a Hosting Endpoint

The tags in `attributes` are used to authorize this endpoint use edge routers with matching tags.

```bash
❯ http POST https://gateway.production.netfoundry.io/core/v2/endpoints \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" <<EOF | jq .id
{
        "networkId": "${NF_NETWORK}",
        "attributes": [
                "#exits"
        ],
        "enrollmentMethod": {
                "ott": true
        },
        "name": "exit1"
}
EOF
"0bdfe257-d1bc-4949-ac9a-fcca66ba6d69"
❯ NF_HOSTING_ENDPOINT=0bdfe257-d1bc-4949-ac9a-fcca66ba6d69
```

### Enroll the Endpoints

`enroll` is a subcommand of `ziti-tunnel` that will generate a permanent cryptographic identity for this device.

```bash
❯ ./ziti-tunnel version
0.19.12

❯ http GET https://gateway.production.netfoundry.io/core/v2/endpoints/${NF_CLIENT_ENDPOINT} \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" | jq -r '.jwt' > client1.jwt

❯ ./ziti-tunnel enroll --jwt client1.jwt
INFO[0000] generating P-384 key
enrolled successfully. identity file written to: client1.json

❯ http GET https://gateway.production.netfoundry.io/core/v2/endpoints/${NF_HOSTING_ENDPOINT} \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" | jq -r '.jwt' > exit1.jwt

❯ ./ziti-tunnel enroll --jwt exit1.jwt
INFO[0000] generating P-384 key
enrolled successfully. identity file written to: exit1.json
```

### Host a Service with the Linux Tunneler

{% include ziti-tunneler.md %}

```bash
❯ ./ziti-tunnel version
0.17.2

❯ ./ziti-tunnel host --identity exit1.json
```

### Run the Linux Tunneler CLI as a Proxy

The Linux Tunneler CLI will tunnel IP packets to your service across and provides a simple proxy mode that will work well for this exercise. You could also use any app that you built with a Ziti endpoint SDK, or any of [the client apps here](https://netfoundry.io/resources/support/downloads/networkversion7/#zititunnelers). Here is [a helpful article about using ziti-tunnel as an endpoint](https://support.netfoundry.io/hc/en-us/articles/360045177311) if you would like a bit more context.

```bash
❯ ./ziti/ziti-tunnel proxy --identity client1.json "${NF_ENDPOINT_SERVICE_NAME}":8080 "${NF_ROUTER_SERVICE_NAME}":8888
```

The effect of this command is for Tunneler to bind to localhost:8080,8888 and begin listening for connections. We'll test this by sending a request to that port.

```bash
# send a request to the endpoint-hosted service
❯ http -b GET localhost:8080
69.234.67.56

# send a request to the router-hosted service
❯ http -b GET localhost:8888
54.153.103.130
```

Where 54.153.103.130 is the public IPv4 of your edge router that terminates the service. The eth0.me server merely echoes back the IP address from which the request originated. You can double check that you do receive a different result when you query the eth0.me server directly via your own public IP.

```bash
❯ http -b GET eth0.me
69.234.67.56
```
