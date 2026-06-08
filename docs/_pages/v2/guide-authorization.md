---
redirect_to: "https://netfoundry.io/docs/platform/api-guides/authorization"
permalink: /guides/authorization/
redirect_from:
  - /v2/guides/authorization/
title: "Authorization"
sidebar:
    nav: v2guides
toc: true
classes: wide
---

Accounts come in two flavors: `User` and `ApiAccount`. Either may be authorized for any "resource action," which are privileges that are scoped to a type of resource. Learn more about CloudZiti authorization in the [Authorization API reference](https://gateway.production.netfoundry.io/auth/v1/docs/index.html).

## Grant a Resource Action to an Identity with REST

### Objective

Grant permission to Alice to reset any users' secondary authentication factor (MFA).

### Setup

This guide uses `jq` and `http` (HTTPie) to send REST calls and parse responses. 

You can install `nfctl` with `pip install netfoundry`. The following setup step will configure the current shell with the necessary environment variables to complete the rest of the steps in this guide. Learn more about using the CLI [in the CLI guide](/guides/cli). Learn more about authentication in [the Authentication guide](/guides/authentication).

```bash
eval "$(nfctl login --eval)"
```

You may skip using this CLI step if you set environment variable `NETFOUNDRY_API_TOKEN` to an API bearer token, and `MOPENV` to the name of the CloudZiti environment to which your account belongs, e.g. `MOPENV=production`.

### Steps

1. Find the ID of the account you wish to grant a resource action to. You can find the ID of your own account by running `nfctl get identity`. You can find the ID of another account by running `nfctl list identities` for [using the Identity API](https://gateway.production.netfoundry.io/identity/v1/docs/index.html). Let's find Alice's account ID.

    ```bash
    ACCOUNT=$(
      http GET "https://gateway.${MOPENV}.netfoundry.io/identity/v1/identities" \
        "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
      | jq -r '.[]|select(.email == "alice@example.com")|.id'
    )
    ```

1. Find the ID of the resource type you wish to grant a resource action on. For this example we'll use code `user-identity`. This isn't strictly necessary, but is useful for filtering the available resource actions by their applicable resource types.

    ```bash
    RESOURCE_TYPE=$(
      http GET "https://gateway.${MOPENV}.netfoundry.io/auth/v1/resource-types" \
        "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
      | jq -r '.[]|select(.code == "user-identity")|.id'
    )
    ```

1. Find the ID of the resource action to grant. This will filter for action code `update-reset-mfa`.

    ```bash
    RESOURCE_ACTION=$(
      http GET "https://gateway.${MOPENV}.netfoundry.io/auth/v1/resource-actions?resourceTypeId=${RESOURCE_TYPE}" \
        "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
      | jq -r '.[]|select(.code == "update-reset-mfa")|.id'
    )
    ```

1. Grant the action to the identity on the resource type with the network scope.

    ```bash
    http POST https://gateway.${MOPENV}.netfoundry.io/auth/v1/identity-resource-actions \
      "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}" \
      identityId=${ACCOUNT} \
      resourceActionId=${RESOURCE_ACTION} \
      path=[]
    ```

1. Verify the action is now granted.

    ```bash
    http GET "https://gateway.${MOPENV}.netfoundry.io/auth/v1/grants?resourceActionId=${RESOURCE_ACTION}&identityId=${ACCOUNT}" \
      "Authorization: Bearer ${NETFOUNDRY_API_TOKEN}"
    ```
