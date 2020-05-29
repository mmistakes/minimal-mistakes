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

The result of these request examples is an AppWAN that allows Tunneler to initiate connections to a service. You could substitute any service, even one that is not public.

### Create Network

**Request**

```bash
http POST https://gateway.production.netfoundry.io/rest/v1/networks \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  name=exampleNetwork11
```

**Response**

```json
{
  "createdAt": "2020-05-27T15:49:23.000+0000",
  "updatedAt": "2020-05-27T15:49:24.000+0000",
  "name": "exampleNetwork11",
  "caName": "CA_de67d725-b63f-4c2f-8c8c-073390cb3bed",
  "productFamily": "ZITI_ENABLED",
  "productVersion": "6.1.1-58266265",
  "provisionedAt": "2020-05-27T15:49:23.000+0000",
  "o365BreakoutCategory": "NONE",
  "mfaClientId": null,
  "mfaIssuerId": null,
  "status": 200,
  "organizationId": "a97cede7-3d24-4d8b-9f42-2396955875d1",
  "ownerIdentityId": "40deb1ba-d18f-4480-9d63-e2c6e7812caf",
  "networkConfigMetadataId": "5df0ee05-2abd-4996-9261-f2da6c4d5c3a",
  "id": "3716d78d-084a-446c-9ac4-5f63ba7b569d",
  "_links": {
    "self": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
    },
    "organization": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/organizations/a97cede7-3d24-4d8b-9f42-2396955875d1"
    },
    "networkControllerHosts": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/networkControllerHosts"
    },
    "endpoints": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints"
    },
    "endpointGroups": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpointGroups"
    },
    "services": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/services"
    },
    "appWans": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans"
    },
    "gatewayClusters": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/gatewayClusters"
    },
    "cas": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/cas"
    },
    "virtualWanSites": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/virtualWanSites"
    },
    "networkConfigMetadata": {
      "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/networkConfigMetadata"
    }
  }
}
```

### Terminating Endpoint

#### Terminating Endpoint Request

We need to tell NetFoundry which region is near the service. This improve performance. We'll extract the ID of "GENERIC Canada East1", and use that ID in the following request to create the endpoint.

```bash
❯ http GET https://gateway.production.netfoundry.io/rest/v1/geoRegions \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" | jq '._embedded.geoRegions[11].id'
"1d824744-0b38-425a-b1d3-6c1dd69def26"
```

We'll use the ID of the network we created in the request path, and the ID of the region in the request body.

```bash
http POST https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
name=kbEndTerm26 \
geoRegionId=1d824744-0b38-425a-b1d3-6c1dd69def26 \
endpointType=GW
```

#### Terminating Endpoint Response

```json
{
    "_links": {
        "appWans": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/
4543075e-22e6-46db-a2e5-b934ea1dec19/appWans"
        },
        "dataCenter": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/dataCenters/c3b7e284-a214-701e-0111-c3a7c2b1e280"
        },
        "endpointGroups": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/
4543075e-22e6-46db-a2e5-b934ea1dec19/endpointGroups"
        },
        "geoRegion": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/geoRegions/1d824744-0b38-425a-b1d3-6c1dd69def26"
        },
        "network": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
        },
        "self": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/4543075e-22e6-46db-a2e5-b934ea1dec19"
        },
        "services": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/4543075e-22e6-46db-a2e5-b934ea1dec19/services"
        }
    },
    "clientMfaEnable": "NO",
    "clientType": null,
    "clientVersion": null,
    "componentId": null,
    "countryId": null,
    "createdAt": "2020-05-28T16:57:50.000+0000",
    "currentState": 100,
    "dataCenterId": "c3b7e284-a214-701e-0111-c3a7c2b1e280",
    "endpointProtectionRole": null,
    "endpointType": "GW",
    "gatewayClusterId": null,
    "geoRegionId": "1d824744-0b38-425a-b1d3-6c1dd69def26",
    "haEndpointType": null,
    "id": "4543075e-22e6-46db-a2e5-b934ea1dec19",
    "name": "exampleTerminatingEndpoint",
    "networkId": "3716d78d-084a-446c-9ac4-5f63ba7b569d",
    "o365BreakoutNextHopIp": null,
    "ownerIdentityId": "40deb1ba-d18f-4480-9d63-e2c6e7812caf",
    "registrationAttemptsLeft": 5,
    "registrationKey": "22BA32F64BBF27967C872096BAC08C250E872062",
    "sessionIdentityId": null,
    "source": null,
    "stateLastUpdated": "2020-05-28T16:57:50.000+0000",
    "status": 100,
    "syncId": null,
    "updatedAt": "2020-05-28T16:57:52.000+0000"
}
```

### Create Service

This is to describe the server for which you wish to manage access through an AppWAN. The terminating endpoint must have network access to the server.

#### Create Service Request

```bash
❯ http POST https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/services \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  name=kbSvc26 \
  serviceClass=CS \
  serviceInterceptType=IP \
  serviceType=TCP \
  interceptDnsHostname=wttr.in \
  interceptDnsPort=80 \
  interceptFirstPort=80 \
  interceptLastPort=80 \
  networkIp=5.9.243.187 \
  networkFirstPort=80 \
  networkLastPort=80 \
  interceptIp=5.9.243.187 \
  endpointId=4543075e-22e6-46db-a2e5-b934ea1dec19
```

#### Create Service Response

```json
{
  "serviceClass" : "CS",
  "serviceInterceptType" : "IP",
  "serviceType" : "TCP",
  "lowLatency" : "YES",
  "dataInterleaving" : "NO",
  "transparency" : "NO",
  "localNetworkGateway" : null,
  "multicast" : "OFF",
  "dnsOptions" : "NONE",
  "icmpTunnel" : "NO",
  "cryptoLevel" : "STRONG",
  "permanentConnection" : "NO",
  "collectionLocation" : "BOTH",
  "pbrType" : "WAN",
  "rateSmoothing" : "NO",
  "networkIp" : "5.9.243.187",
  "networkNetmask" : null,
  "networkFirstPort" : 80,
  "networkLastPort" : 80,
  "interceptIp" : "5.9.243.187",
  "interceptDnsHostname" : "wttr.in",
  "interceptDnsPort" : 80,
  "interceptFirstPort" : 80,
  "interceptLastPort" : 80,
  "gatewayIp" : null,
  "gatewayCidrBlock" : 0,
  "netflowIndex" : 0,
  "profileIndex" : 0,
  "o365Conflict" : false,
  "status" : 100,
  "protectionGroupId" : null,
  "portInterceptMode" : null,
  "endpointId" : "4543075e-22e6-46db-a2e5-b934ea1dec19",
  "gatewayClusterId" : null,
  "networkId" : null,
  "ownerIdentityId" : "b580cd14-6e70-446d-a3a2-1d752bc02726",
  "interceptIncludePorts" : null,
  "interceptExcludePorts" : null,
  "createdAt" : "2020-05-29T21:24:47.923+0000",
  "updatedAt" : "2020-05-29T21:24:47.923+0000",
  "name" : "kbSvc26",
  "interceptPorts" : {
    "include" : [ ],
    "exclude" : [ ]
  },
  "gatewayNetmask" : "",
  "id" : "e4d8fa7b-a94d-4d4a-9bca-54dfd209729a",
  "_links" : {
    "self" : {
      "href" : "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/services/e4d8fa7b-a94d-4d4a-9bca-54dfd209729a"
    },
    "network" : {
      "href" : "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
    },
    "appWans" : {
      "href" : "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/services/e4d8fa7b-a94d-4d4a-9bca-54dfd209729a/appWans"
    },
    "endpoint" : {
      "href" : "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/4543075e-22e6-46db-a2e5-b934ea1dec19"
    }
  }
}
```

### Bridge Gateway Endpoint

Ziti clients require a dedicated bridge gateway for each AppWAN. Later we'll add this to the AppWAN along with the Ziti client.

#### Bridge Gateway Endpoint Request

```bash
❯ http POST https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  name=kbBridgeGw27 \
  endpointType=ZTGW \
  geoRegionId=1d824744-0b38-425a-b1d3-6c1dd69def26
```

#### Bridge Gateway Endpoint Response

```json
{
    "_links": {
        "appWans": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/4728677b-ade6-438d-ae52-144d6adbdc88/appWans"
        },
        "dataCenter": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/dataCenters/c3b7e284-a214-701e-0111-c3a7c2b1e280"
        },
        "endpointGroups": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/4728677b-ade6-438d-ae52-144d6adbdc88/endpointGroups"
        },
        "geoRegion": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/geoRegions/1d824744-0b38-425a-b1d3-6c1dd69def26"
        },
        "network": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
        },
        "self": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/4728677b-ade6-438d-ae52-144d6adbdc88"
        },
        "services": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/4728677b-ade6-438d-ae52-144d6adbdc88/services"
        }
    },
    "clientMfaEnable": "NO",
    "clientType": null,
    "clientVersion": null,
    "componentId": null,
    "countryId": null,
    "createdAt": "2020-05-29T22:01:36.000+0000",
    "currentState": 100,
    "dataCenterId": "c3b7e284-a214-701e-0111-c3a7c2b1e280",
    "endpointProtectionRole": null,
    "endpointType": "ZTGW",
    "gatewayClusterId": null,
    "geoRegionId": "1d824744-0b38-425a-b1d3-6c1dd69def26",
    "haEndpointType": null,
    "id": "4728677b-ade6-438d-ae52-144d6adbdc88",
    "name": "kbBridgeGw27",
    "networkId": "3716d78d-084a-446c-9ac4-5f63ba7b569d",
    "o365BreakoutNextHopIp": null,
    "ownerIdentityId": "40deb1ba-d18f-4480-9d63-e2c6e7812caf",
    "registrationAttemptsLeft": 5,
    "registrationKey": "C2CF1D7824FF470C47C1D40E0DDA562B1B1B732D",
    "sessionIdentityId": null,
    "source": null,
    "stateLastUpdated": "2020-05-29T22:01:37.000+0000",
    "status": 100,
    "syncId": null,
    "updatedAt": "2020-05-29T22:01:39.000+0000"
}
```

### Client Endpoint

This is your Ziti client. We'll install Tunneler and enroll it with the one-time key provided in the response.

#### Client Endpoint Request

```bash
❯ http POST https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  name=kbZitiCl27 \
  endpointType=ZTCL \
  geoRegionId=1d824744-0b38-425a-b1d3-6c1dd69def26
```

#### Client Endpoint Response

```json
{
    "_links": {
        "appWans": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/ebeaecae-ce3f-4a68-8cb9-01b7eb87124c/appWans"
        },
        "dataCenter": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/dataCenters/c3b7e284-a214-701e-0111-c3a7c2b1e280"
        },
        "endpointGroups": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/ebeaecae-ce3f-4a68-8cb9-01b7eb87124c/endpointGroups"
        },
        "geoRegion": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/geoRegions/1d824744-0b38-425a-b1d3-6c1dd69def26"
        },
        "network": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
        },
        "self": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/ebeaecae-ce3f-4a68-8cb9-01b7eb87124c"
        },
        "services": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/endpoints/ebeaecae-ce3f-4a68-8cb9-01b7eb87124c/services"
        }
    },
    "clientMfaEnable": "NO",
    "clientType": null,
    "clientVersion": null,
    "componentId": null,
    "countryId": null,
    "createdAt": "2020-05-29T22:04:24.000+0000",
    "currentState": 100,
    "dataCenterId": "c3b7e284-a214-701e-0111-c3a7c2b1e280",
    "endpointProtectionRole": null,
    "endpointType": "ZTCL",
    "gatewayClusterId": null,
    "geoRegionId": "1d824744-0b38-425a-b1d3-6c1dd69def26",
    "haEndpointType": null,
    "id": "ebeaecae-ce3f-4a68-8cb9-01b7eb87124c",
    "name": "kbZitiCl27",
    "networkId": "3716d78d-084a-446c-9ac4-5f63ba7b569d",
    "o365BreakoutNextHopIp": null,
    "ownerIdentityId": "40deb1ba-d18f-4480-9d63-e2c6e7812caf",
    "registrationAttemptsLeft": 5,
    "registrationKey": "8D8EDF01C5BFD855C5839488B7B031778BF1E2CE",
    "sessionIdentityId": null,
    "source": null,
    "stateLastUpdated": "2020-05-29T22:04:25.000+0000",
    "status": 100,
    "syncId": null,
    "updatedAt": "2020-05-29T22:04:26.000+0000"
}
```

### Create AppWAN

Initialize an empty AppWAN

#### Create AppWAN Request

```bash
❯ http POST https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  name=kbAppWan27
```

#### Create AppWAN Response

```json
{
    "_links": {
        "endpointGroups": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/endpointGroups"
        },
        "endpoints": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/endpoints"
        },
        "network": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
        },
        "self": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2"
        },
        "services": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/services"
        }
    },
    "createdAt": "2020-05-29T22:09:22.583+0000",
    "id": "1c46ae3a-39cf-4ff3-bbbf-243fde329de2",
    "name": "kbAppWan27",
    "networkId": null,
    "ownerIdentityId": "40deb1ba-d18f-4480-9d63-e2c6e7812caf",
    "status": 100,
    "updatedAt": "2020-05-29T22:09:22.583+0000"
}
```

### Update AppWAN Endpoints

Add the client and bridge gateway to the AppWAN.

#### Update AppWAN Endpoints Request

```bash
❯ http POST https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/endpoints \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  ids:='["ebeaecae-ce3f-4a68-8cb9-01b7eb87124c","4728677b-ade6-438d-ae52-144d6adbdc88"]'
```

#### Update AppWAN Endpoints Response

```json
{
    "_links": {
        "endpointGroups": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/endpointGroups"
        },
        "endpoints": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/endpoints"
        },
        "network": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
        },
        "self": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2"
        },
        "services": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/services"
        }
    },
    "createdAt": "2020-05-29T22:09:22.000+0000",
    "id": "1c46ae3a-39cf-4ff3-bbbf-243fde329de2",
    "name": "kbAppWan27",
    "networkId": "3716d78d-084a-446c-9ac4-5f63ba7b569d",
    "ownerIdentityId": "40deb1ba-d18f-4480-9d63-e2c6e7812caf",
    "status": 600,
    "updatedAt": "2020-05-29T22:09:25.000+0000"
}
```

### Update AppWAN Services

Add the service to the AppWAN.

#### Update AppWAN Services Request

```bash
❯ http POST https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/services \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
  ids:='["e4d8fa7b-a94d-4d4a-9bca-54dfd209729a"]'
```

#### Update AppWAN Services Response

```json
{
    "_links": {
        "endpointGroups": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/endpointGroups"
        },
        "endpoints": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/endpoints"
        },
        "network": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d"
        },
        "self": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2"
        },
        "services": {
            "href": "https://gateway.production.netfoundry.io/rest/v1/networks/3716d78d-084a-446c-9ac4-5f63ba7b569d/appWans/1c46ae3a-39cf-4ff3-bbbf-243fde329de2/services"
        }
    },
    "createdAt": "2020-05-29T22:29:38.000+0000",
    "id": "1c46ae3a-39cf-4ff3-bbbf-243fde329de2",
    "name": "kbAppWan27",
    "networkId": "3716d78d-084a-446c-9ac4-5f63ba7b569d",
    "ownerIdentityId": "40deb1ba-d18f-4480-9d63-e2c6e7812caf",
    "status": 600,
    "updatedAt": "2020-05-29T22:49:31.000+0000"
}
```

### Install Ziti Tunneler

This is an app NetFoundry built with a [Ziti endpoint SDK](https://ziti.dev/). It will tunnel IP packets to the service via the AppWAN. You could also use any app that you built with a Ziti endpoint SDK.

### Install Ziti Enroller

This is a utility that will securely generate a unique cryptographic identity for Tunneler.

### Enroll Tunneler

