---
title: Cross (micro)services authentication with Azure B2C 
tags: [AzureAD, AzureB2C, microservices, OAUTH2, OpenIDConnect, dotnetcore, xamarin]
---


Microservices  is an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice architecture enables the continuous delivery/deployment of large, complex applications. It also enables an organization to evolve its technology stack.

In this context, it is easy to have web solution composed by dozen of microservices, that exposes APIs. 

These APIs can provide anonymous access to their services, but in the real world often they must be authenticated. This means that once a user authenticates to an identity provider, an easy way to have a "single sign on" to a dozen of microservices is needed.

To add another complexity, a generic API implemented as microservice, could require information from another microservice and so on (API to API authenticated call).

At the times of the Active Directory integrated authentication, the solution was quite easy: the developer turned ON the flag "authenticated user only" on IIS and all magically was secured. This worked with the classical limitation of that old times: all machines must be on one or more a trusted domains and each time you needed to integrate a 3th party service not trusted, the pain begone :-).

In nowadays we are lucky, OpenID Connect and OAUTH2 have changed (or have opened…) the world of authentication and authorization. 

Azure Active Directory B2C, Microsoft's cloud-based identity and access management solution for consumer-facing web and mobile applications now can come in the game. It is an highly-available global service that scales to hundreds of millions of consumer identities. Built on an enterprise-grade secure platform, Azure Active Directory B2C keeps your business and your consumers protected and supports open standards such as OpenID Connect OAUTH2.

In <a href="https://github.com/nicolgit/Azure-B2C-playground" target="_blank">this Github repository</a> I have implemented an end-2-end scenario where, from scratch, I have configured:

* Azure B2C
* A simple Calculator API
* A simple scientific Calculator API that impersonating the calling user calls the Calculator API
* A simple Web Appication (Single Page Application) that authenticates on Azure B2C and calls both Calculator and Scientific Calculator
* A simple Xamarin Form Application that authenticates on Azure B2C and calls both Calculator and Scientific Calculator

![Playground Architecture](https://github.com/nicolgit/azure-b2c-playground/blob/master/assets/architecture.png)

**Side note**: All the discussion and the concept we have described is valid ALSO for Azure B2B authenticated applications.

