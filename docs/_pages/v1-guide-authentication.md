---
permalink: /v1/guides/authentication/
title: "Authentication"
sidebar:
    nav: v1guides
toc: true
---

## Audience
This is aimed at NetFoundry customers and [trial users](https://nfconsole.io/signup) who will use the API directly to augment and automate their use of the NF Console. Alternatively, anyone may [subscribe to freemium API access through RapidAPI](/v1/guides/rapidapi/) which does not entail Console access and will slightly change the API client implementation .i.e use a RapidAPI token instead of a NetFoundry token, and send requests to NetFoundry API via RapidAPI.

## Overview
All authenticated operations require an HTTP header like
```http
Authorization: Bearer {NETFOUNDRY_API_TOKEN}
``` 
where `{NETFOUNDRY_API_TOKEN}` is an expiring JSON Web Token (JWT) that you obtain from Auth0, NetFoundry API's identity provider, by authenticating with your permanent credential.

## Shell example
Pull it all together with [HTTPie (command-line HTTP client)](https://httpie.org/) and [`jq` (command-line JSON processor)](https://stedolan.github.io/jq/).

`source exportNfApiToken.bash`

<script src="https://gist.github.com/qrkourier/ab5bb279047b640b8ff82c9dd9730b5c.js"></script>

## Step by Step

### Get a permanent credential
1. [Start a free trial](https://nfconsole.io/signup) if you need a login for NF Console
2. [Log in to NF Console](https://nfconsole.io/login)
3. In NF Console, navigate to "Organization", "Manage API Account", and click <i class="fas fa-plus-circle"></i>

### Get a temporary token
Use your permanent credential; `client_id`, `client_secret`; to obtain an expiring `access_token` from the identity provider, Auth0. Here are examples for `curl` and `http` to get you started. The final snippet demonstrates how you could parse the JSON response with [`jq` (command-line JSON processor)](https://stedolan.github.io/jq/) to retain only the value of `access_token`.

**HTTPie**
```bash
❯ http POST https://netfoundry-production.auth0.com/oauth/token \
  "content-type: application/json" \
  "client_id=${CLIENT_ID}" \
  "client_secret=${CLIENT_SECRET}" \
  "audience=https://gateway.production.netfoundry.io/" \
  "grant_type=client_credentials"
```

**cURL**
```bash
❯ curl \
    --silent \
    --show-error \
    --request POST \
    --header 'content-type: application/json' \
    --data '{
        "client_id": "'${CLIENT_ID}'",
        "client_secret": "'${CLIENT_SECRET}'",  
        "audience": "https://gateway.production.netfoundry.io/",
        "grant_type": "client_credentials"
    }' \
    https://netfoundry-production.auth0.com/oauth/token
```

### Use the token with an API operation
Include the expiring bearer token in your request to the NetFoundry API. You could source the shell script above to make `NETFOUNDRY_API_TOKEN` available.

**HTTPie**
```bash
❯ http GET https://gateway.production.netfoundry.io/rest/v1/networks \
  "content-type: application/json" \
  "cache-control: no-cache" \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}"
```

**cURL**
```bash
❯ curl \
    --silent \
    --show-error \
    --request GET \
    --header 'Cache-Control: no-cache' \
    --header 'Content-Type: application/json' \
    --header "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
    https://gateway.production.netfoundry.io/rest/v1/networks \
```
