---
redirect_to: "https://netfoundry.io/docs/platform/api-guides/authentication"
permalink: /guides/authentication/
redirect_from:
  - /v2/guides/authentication/
title: "Authentication"
sidebar:
    nav: v2guides
toc: true
classes: wide
---

## Overview

All authenticated operations require an HTTP header like

```yaml
Authorization: Bearer {NETFOUNDRY_API_TOKEN}
```

where `{NETFOUNDRY_API_TOKEN}` is an expiring JSON Web Token (JWT) that you obtain from Cognito, NetFoundry API's identity provider, by authenticating with your API account.

## Get an API Account

1. [Sign up for the free tier](https://nfconsole.io/signup) if you need a login for NF Console
2. [Log in to NF Console](https://nfconsole.io/login)
3. In NF Console, navigate to "organization", "Manage API Account", and click <i class="fas fa-plus-circle"></i>
4. Click the button to download "credentials.json"
5. Save in one of
    * project default: `./credentials.json`
    * user default: `~/.netfoundry/credentials.json`
    * device default: `/netfoundry/credentials.json`
    * XDG config dir: e.g. `~/.config/netfoundry/credentials.json` on Linux

You may override the default paths with an environment variable like this:

```bash
NETFOUNDRY_API_ACCOUNT=~/Downloads/example-account.json
```

## Get a Token in the Current Shell

The most convenient way to get a token for your current shell is to run the NetFoundry CLI. You can learn how to install and use the CLI `nfctl` [in this guide](/guides/cli).

```bash
eval "$(nfctl --credentials=credentials.json login --eval)"
```

### Generic Authentication Example

This will explain how to request an authentication token with HTTP. This
example uses the three values that are included in an API account that you
download from the console e.g. credentials.json to show how they are used with
the identity provider to obtain a token. 

Be aware that these three values will override all other credentials sources
e.g. the credentials JSON file specified by `NETFOUNDRY_API_ACCOUNT` if you are
working with a NetFoundry SDK. The rest of this example assumes you're working
with raw REST calls, not an SDK. 

```bash
NETFOUNDRY_CLIENT_ID=3tcm6to3qqfu78juj9huppk9g3
NETFOUNDRY_PASSWORD=149a7ksfj3t5lstg0pesun69m1l4k91d6h8m779l43q0ekekr782
NETFOUNDRY_OAUTH_URL=https://netfoundry-production-xfjiye.auth.us-east-1.amazoncognito.com/oauth2/token
```

### HTTPie

```bash
http --form --auth "${NETFOUNDRY_CLIENT_ID}:${NETFOUNDRY_PASSWORD}" \
    POST ${NETFOUNDRY_OAUTH_URL} \
    "scope=https://gateway.production.netfoundry.io//ignore-scope" \
    "grant_type=client_credentials"
```

### cURL

```bash
curl --user ${NETFOUNDRY_CLIENT_ID}:${NETFOUNDRY_PASSWORD} \
    --request POST ${NETFOUNDRY_OAUTH_URL} \
    --header 'content-type: application/x-www-form-urlencoded' \
    --data 'grant_type=client_credentials&scope=https%3A%2F%2Fgateway.production.netfoundry.io%2F%2Fignore-scope'
```

### NodeJS

```javascript
const NETFOUNDRY_OAUTH_URL = process.env.NETFOUNDRY_OAUTH_URL
const NETFOUNDRY_CLIENT_ID = process.env.NETFOUNDRY_CLIENT_ID
const NETFOUNDRY_PASSWORD = process.env.NETFOUNDRY_PASSWORD

async function getCognitoAuthToken() {
    const token = `${NETFOUNDRY_CLIENT_ID}:${NETFOUNDRY_PASSWORD}`;
    const encodedToken = Buffer.from(token).toString('base64');

    let configData = "grant_type=client_credentials";

    response = await axios.post(NETFOUNDRY_OAUTH_URL, configData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+ encodedToken
        }
    })
    return response.data.access_token
}
```

Now that you have obtained a token here are [some examples of making REST API calls from the command-line](/guides/rest/). 

## Use the Token with the NetFoundry API

Include the token in your request to the NetFoundry API. This assumes you used one of the examples above to assign `NETFOUNDRY_API_TOKEN` in your current shell environment.

### HTTPie

```bash
http GET https://gateway.production.netfoundry.io/core/v2/networks \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}"
```

### cURL

```bash
curl https://gateway.production.netfoundry.io/core/v2/networks \
    --header "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}"
```

### NodeJS

```javascript
async function getNetworks(accessToken) {
    await axios.get("https://gateway.production.netfoundry.io/core/v2/networks", {
        headers: {
            "Authorization": "Bearer " + accessToken
        }
    }).then(response => {
        console.log('\nResponse data:  ',response.data)
    })
}
```

### How it works: `nfctl login --eval`

The `login --eval` command emits shell configuration including:

1. authentication token that is honored by the CLI and anything else that uses the NetFoundry Python module
1. tab autocomplete for BASH (requires PyPi `argcomplete`, see [the CLI guide](/guides/cli/))
1. helper functions for logging the shell out of NetFoundry in case you don't want to simply close the shell


```bash
 $ nfctl login --eval
✔ Logged in profile 'nfsupport'
# $ eval "$(nfctl --credentials=credentials.json login --eval)"  # you could run this in any shell or ~/.bashrc to log in that shell
export NETFOUNDRY_API_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik56UXpOelUxTlRRd05rUTBOa1U1TXpZMVF6azBOek5GTlRNNVFVVXlNVEpCUkVFNVJrVkJNZyJ9.eyJodHRwczovL25ldGZvdW5kcnkuaW8vdGVuYH50L2xhYmVsIjoiTkZTVVBQT1JUIiwiaHR0cHM6Ly9uZXRmb3VuZHJ5LmlvL2F1dGgwL2Nvbm5lY3Rpb25JZCI6Imdvb2dsZS1vYXV0aDIiLCJodHRwczovL25ldGZvdW5kcnkuaW8vb3JnYW5pemF0aW9uX2lkIj8iN2RlMmEyYmQtZjRiZC00YTg0LTlkMjItODEwMzM2NjZkOTVmIiwiaXNzIjoiaHR0cHM6Ly9uZXRmb3VuZHJ5LXByb2R1Y3Rpb24uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE2MDE0MzIwNjAyMDUzODg5Mjk0IiwiYXVkIjpbImh0dHBzOi8vZ2F0ZXdheS5wcm9kdWN0aW9uLm5ldGZvdW5kcnkuaW8vIiwiaHR0cHM6Ly9uZXRmb3VuZHJ5LXByb2R1Y3Rpb24uYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI69TY0OFU1MTc3NiwiZXhwIjoxNjQ5NTk0OTc2LCJhenAiOiJ1aVE2Y2pzUlg0RXBRSDlKN3RLTFRTSmgyY3g2b3ZWSyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.yrsH2cKj7unF4o9HnNRSM9aKB22brhmdxbKAJ7VvaIz9N2RfdrP54R45tjzFccA9MFU0kbm_lsgV2ewMjZVcUvfGiGFfKkNHSIClGmVsnAJFIbZDPe5-iseoT-naDaGiITqcS1EPKFssEjLfBmECdb17x4SpbFX77MrcIO_VTCjk2OuqjPRM-5wIGM2z0ouVt-aEQj4iNqkwUw5OntWnT0vGtFqoErMLmsCMavG18LEINTtqxCrRVwYOOAhsrRXV4e8yk1nsbFlJcmm6OTv4PbAxkx77dH6keoXeV8A2b73oS55e5bpFrs-ysxyJz6x_ci0cZynPqJuCIh2KlEZ2ZB"
export NETFOUNDRY_API_ACCOUNT="/home/kbingham/.netfoundry/nfsupport.json"
export NETFOUNDRY_ORGANIZATION="f86122fb-316b-4427-8c38-248165bf4504"
# NETFOUNDRY_NETWORK not configured
# NETFOUNDRY_NETWORK_GROUP not configured
export MOPENV="production"
export MOPURL="https://gateway.production.netfoundry.io/"
eval "$(register-python-argcomplete nfctl)"

# helper function logs out from NetFoundry
function nonf(){
    unset   NETFOUNDRY_API_ACCOUNT NETFOUNDRY_API_TOKEN \
            NETFOUNDRY_CLIENT_ID NETFOUNDRY_PASSWORD NETFOUNDRY_OAUTH_URL \
            NETFOUNDRY_ORGANIZATION NETFOUNDRY_NETWORK NETFOUNDRY_NETWORK_GROUP \
            MOPENV MOPURL
}
```

The above reveals the shell configuration that is emitted by the `login --eval` command, most notably the `NETFOUNDRY_API_TOKEN` environment variable that contains your expiring session token. Now let's look at how you'd actually use that configuration.

```bash
 # you could run this to configure a shell interatively, or add the same command to your runcom file e.g. ~/.bashrc
 $ eval "$(nfsupport --credentials=credentials.json login --eval)" 

 # now I may use the token outside the CLI in the current shell or its child processes
 $ http GET "https://gateway.$MOPENV.netfoundry.io/identity/v1/identities/self" \
  "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}"
{
  "id": "a8b42709-25c3-4380-a29d-315049e4db36",
  "organizationId": "50a1bc9d-2818-43c7-af96-c477bcd3a008",
  "auth0ClientId": null,
  "awsCognitoClientId": "us-east-1_LOGnjznhw|5rg7jp4kordp1sjdkt2cob5g2b",
  "authenticationUrl": "https://netfoundry-staging-mlvyyc.auth.us-east-1.amazoncognito.com/oauth2/token",
  "name": "developer-tools-repo",
  "contactEmail": "kenneth.bingham+kentest@netfoundry.io",
  "description": "repo secret for testing the GitHub Actions workflow netfoundry-network-ansible",
  "active": true,
  "createdAt": {
    "nano": 0,
    "epochSecond": 1640237146
  },
  "updatedAt": null,
  "deletedAt": null,
  "email": "kenneth.bingham+kentest@netfoundry.io",
  "tenantId": "50a1bc9d-2818-43c7-af96-c477bcd3a008",
  "type": "ApiAccountIdentity"
}

 # I can destroy the token, etc configuration in this shell by exiting the shell or running the built-in helper function "nonf"
 $ nonf

 $ test -n "${NETFOUNDRY_API_ACCOUNT}" || echo nope
nope
```
