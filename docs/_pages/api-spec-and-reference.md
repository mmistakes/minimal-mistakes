---
title: Definition &amp; References
permalink: /reference/
toc: true
---

## OpenAPI

[JSON](/assets/openapi-3.0.json){: .btn .btn--info .btn--x-large} &nbsp;
<!-- TODO: link to latest definition
[JSON](https://gateway.production.netfoundry.io/rest/v1/docs/openapi-3.0.json){: .btn .btn--info .btn--x-large} &nbsp;
  -->
[YAML](https://gateway.production.netfoundry.io/rest/v1/docs/openapi-3.0.yml){: .btn .btn--info .btn--x-large}

You can use this OpenAPI (formerly Swagger) definition to [generate a client](https://swagger.io/tools/swagger-codegen/) for your preferred programming language.

You can also work with this description of operations as a collection of requests in [Postman](https://www.postman.com/) by importing the definition file linked above.

## Reference
[HTTP REST Docs](https://gateway.production.netfoundry.io/rest/v1/docs/index.html){: .btn .btn--info .btn--x-large}
<!-- [API v2 Reference](https://gateway.sandbox.netfoundry.io/rest/v2/docs/index.html) -->

## Quick Reference

### Life Cycle Status Codes

The numeric value appears in the attribute `status` for many types of resources.

100
: NEW

200
: PROVISIONING

300
: PROVISIONED

400
: REGISTERED

500
: ERROR

600
: UPDATING

700
: REPLACING

800
: DELETING

900
: DELETED

### Endpoint Availability Status Codes

The numeric value of `status` indicates the realtime availability of an endpoint.

100
: REGISTERING

200
: OFFLINE

300
: ONLINE

