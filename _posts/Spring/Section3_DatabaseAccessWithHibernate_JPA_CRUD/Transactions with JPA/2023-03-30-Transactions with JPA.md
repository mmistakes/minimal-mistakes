---
layout: single
title: "@Transactions 이 뭐죠?"
categories: Spring
tag: [Java,"@Transactions",JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:

---
# Transactions 간략히 보기
The _@Transactional_ annotation is the metadata that specifies the semantics of the transactions on a method. We have two ways to rollback a transaction: declarative and programmatic.

In the **declarative approach, we annotate the methods with the _@_**_**Transactional**_ **annotation**. The _@Transactional_ annotation makes use of the attributes _rollbackFor_ or _rollbackForClassName_ to rollback the transactions, and the attributes _noRollbackFor_ or _noRollbackForClassName_ to avoid rollback on listed exceptions.
-


출처 : https://www.baeldung.com/transaction-configuration-with-jpa-and-spring