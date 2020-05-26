---
title: Overview
permalink: /v1/guides/introduction/
redirect_from:
    - /guides/
    - /v1/
    - /v1/guides/
    - /v1/guides/overview/
    - /v2/
    - /v2/guides/
sidebar:
    nav: "v1guides"
toc: true
---

## Audience

This documentation is aimed at developers wishing to automate things they can already do with the [NetFoundry Web Console](https://nfconsole.io/). If you are looking for a general introduction to NetFoundry then the [Support Hub](https://support.netfoundry.io/hc/en-us) or the [main web site](https://netfoundry.io) are also places you could begin.

## API vs Web Console

the [NetFoundry Web Console](https://nfconsole.io/) is an implementation of the API and so may help to express the model of the API while you're learning how to build an AppWAN.

The API allows you to manage your AppWANs with your own code. You could program your AppWAN to

* disallow a lost or non-compliant device from connecting,
* allow a new device to connect to a service based on some event or condition,
* create a path to a new network service for an existing group of devices, or
* trigger an alert based on an unexpected metric that NetFoundry reports.

## Representations

This RESTful API transacts meaningful HTTP verbs and request paths and parameters. Most types of requests and responses also have an HTTP document body which is always a JSON representation. Requests that include a JSON body must also include a header `Content-Type: application/json`, and responses with a JSON body will have this header too.

You'll find the [API definition and reference](/reference/) here. You can also browse the available API endpoints with contextual descriptions and example requests and responses in [the playground](/v1/playground/) which is running Swagger UI.

### Links

The API responds with hypertext links in a `_links` map for navigation. With this you can avoid the brittleness of hard-coding URL paths in your implementation.

For example, a request like `GET /rest/v1/organizations` might return a list of one in `_embedded.organizations`. This is a great starting place because your implementation could then navigate to the "networks" link which is list of all networks in this organization a.k.a. "network group".

```json
{
    "_embedded" : {
        "organizations" : [ {
            "createdAt": "2020-05-23T09:20:26.000+0000",
            "updatedAt": "2020-05-23T09:20:26.000+0000",
            "name": "exampleOrganization11",
            "organizationShortName": "EXORG11",
            "mfaRequired": false,
            "zitiEnabled": true,
            "awsAutoScalingGatewayEnabled": false,
            "defaultAzureVirtualWanId": null,
            "billingAccountId": "fda91466-56bc-458f-bf8d-c8f04cd39898",
            "ownerIdentityId": null,
            "id": "cb621953-1f50-4fd9-907a-bdc0dbebde9c",
            "_links": {
                "self": {
                "href": "https://gateway.production.netfoundry.io/rest/v1/organizations/cb621953-1f50-4fd9-920a-bdc0dbebde9c"
                },
                "networks": {
                "href": "https://gateway.production.netfoundry.io/rest/v1/networks"
                },
                "azureSubscription": {
                "href": "https://gateway.production.netfoundry.io/rest/v1/azureSubscriptions?organizationId=cb621953-1f50-4fd9-920a-bdc0dbebde9c"
                }
            }
        } ]
    }
}
```

Now following the "networks" link would return all networks. If you extract the `.page` object from the response you will see something like this which indicates there are 211 total networks on 22 pages of 10 each, and you've just consumed page 1.

```json
{
  "size": 10,
  "totalElements": 211,
  "totalPages": 22,
  "number": 1
}
```

To advance you'd send a request for page 2 using the parameters that are described in [the API definition](/reference/). A request like `GET /rest/v1/networks?page=0&size=10&sort=name,asc` will return up to ten networks as an array. Here's an example response for just one network.

```json
{
  "_embedded" : {
    "networks" : [ {
        "createdAt": "2019-12-14T07:13:47.000+0000",
        "updatedAt": "2020-05-22T22:09:17.000+0000",
        "name": "myExampleNetwork",
        "caName": "CA_87acd939-fd36-49bb-a59c-608ac7341aef",
        "productFamily": "ZITI_ENABLED",
        "productVersion": "6.0.0-57305256",
        "provisionedAt": "2019-12-14T07:09:29.000+0000",
        "o365BreakoutCategory": "NONE",
        "mfaClientId": null,
        "mfaIssuerId": null,
        "status": 300,
        "organizationId": null,
        "ownerIdentityId": "a8d02ab4-57a8-4296-bc14-8acfe464694a",
        "networkConfigMetadataId": null,
        "id": "8c2cb505-ab5e-460b-809d-1439fb4c5f8d",
        "_links": {
            "self": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d"
            },
            "organization": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/organizations"
            },
            "networkControllerHosts": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/networkControllerHosts"
            },
            "endpoints": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/endpoints"
            },
            "endpointGroups": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/endpointGroups"
            },
            "services": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/services"
            },
            "appWans": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/appWans"
            },
            "gatewayClusters": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/gatewayClusters"
            },
            "virtualWanSites": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/virtualWanSites"
            },
            "networkConfigMetadata": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/8c2cb505-ab5e-460b-809d-1439fb4c5f8d/networkConfigMetadata"
            }
        }
    } ]
  }
}
```

From here we can see a clear path to inspect the endpoints, services, and AppWANs for this particular network. Good luck and let us know what else you'd like to see in this introduction: [contact](/help/) or send a pull request with the EDIT link below!
