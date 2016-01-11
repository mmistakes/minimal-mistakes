---
layout: post
title: AWS Request Signer
excerpt: "Scala library to authenticate your HTTP requests to AWS services."
modified: 2016-1-11
tags: [scala, amazon web services, aws]
comments: true
---

**TL;DR**: I wrote a [Scala library](https://github.com/ticofab/aws-request-signer) to sign HTTP requests to AWS endpoints.

I recemtly had to use the ElasticSearch service offered by Amazon. They only expose an HTTP endpoint (no TCP), and every requests you fire needs to be authenticated following their very own strict procedure. Forget about the simple oauth token! In this case, each requests needs to be authenticated using a mix of credentials and the request itselfs - headers, method, host and so forth. All this information is combined and hashed several times; AWS does the same at its end with the request it receives, and the final hashes need to match. The procedure is described here in the [official AWS documentation](http://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html).

This all sounds very fit for a library, and indeed I found this [JAVA proejct](https://github.com/inreachventures/aws-signing-request-interceptor) on Github which does the job very well. At the same time this project also embeds some additional functionality I didn't need, so I decided to port it to Scala, leaving behind the extra stuff. The result is in the [AWS Request Signer](https://github.com/ticofab/aws-request-signer).

The readme explains its simple usage. Improvements are always possible so please don't hesitate to suggest them or contribute yourself!
