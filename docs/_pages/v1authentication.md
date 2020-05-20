---
permalink: /v1/guides/authentication/
title: "Authentication"
sidebar:
    nav: v1guides
toc: true
---

All authenticated operations require an HTTP header like `Authorization: Bearer {access_token}` where `{access_token}` is an expiring JSON Web Token (JWT) that you obtain from Auth0, NetFoundry API's identity provider.

## Get a permanent credential
1. Log in to NF Console
2. Provision an API credential
3. TODO: subsume [credential quickstart](https://netfoundry.github.io/mop/api/overview/)

## Get a temporary token

Use your permanent credential; `client_id`, `client_secret`; to obtain an expiring `access_token` from the identity provider, Auth0. Here are examples for `curl` and `http` to get you started. The final snippet demonstrates how you could parse the JSON response with [jq](https://stedolan.github.io/jq/) to retain only the value of `access_token`.

**HTTPie**
```bash
❯ http POST https://netfoundry-production.auth0.com/oauth/token \      
  "content-type: application/json" \
  "client_id=${client_id}" \
  "client_secret=${client_secret}" \
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
        "client_id": "'${client_id}'",
        "client_secret": "'${client_secret}'",  
        "audience": "https://gateway.production.netfoundry.io/",
        "grant_type": "client_credentials"
    }' \
    https://netfoundry-production.auth0.com/oauth/token
```

## Use the token with an operation

Include the expiring bearer token in your request to the NetFoundry API.

**HTTPie**
```bash
❯ http GET https://gateway.production.netfoundry.io/rest/v1/networks \
  "content-type: application/json" \
  "cache-control: no-cache" \
  "Authorization: Bearer ${access_token}"
```

**cURL**
```bash
❯ curl \
    --silent \
    --show-error \
    --request GET \
    --header 'Cache-Control: no-cache' \
    --header 'Content-Type: application/json' \
    --header "Authorization: Bearer ${access_token}" \
    https://gateway.production.netfoundry.io/rest/v1/networks \
```

## BASH script

Pull it all together with HTTPie and JQ.

`source exportNfApiToken.bash`

<script src="https://gist.github.com/qrkourier/ab5bb279047b640b8ff82c9dd9730b5c.js"></script>