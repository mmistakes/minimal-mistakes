---
title: Azure AD Endpoint V1 vs V2
date: 2019-05-28 10:10
author: nicold
comments: true
tags: [Azure, AzureAD, open-id-connect, oauth, clientlibraries, android, ios, modern authentication]
---

The objective of this memo is to summarize in one single page the main differences between Azure AD Endpoint V1 vs V2, with a focus on client libraries and supportability.

Date of comparison: **27 May 2019** 

In brief:

* V1: **Azure Active Directory Endpoints**: they are supported and there is no ETA for decommissioning <a href="https://login.microsoftonline.com/common/oauth2/authorize" target="_blank">https://login.microsoftonline.com/common/oauth2/authorize</a>
* V2: **Microsoft Identity Platform Endpoints**: are supported in production even if not still feature parity and completed. (see notes)
o	<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://login.microsoftonline.com/common/oauth2/v2.0/authorize</a> 



|  | V1 | V2 | Notes/References
|----------|----------|----------|----------|
| Who can sign in | Work<br/>School Account<br/>Guests | Work<br/>School Account</br>Guests</br>Personal (hotmail.com, outlook.com…) | <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison#who-can-sign-in" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison#who-can-sign-in</a> 
|Incremental and dynamic consent | No | Yes | With the Microsoft identity platform endpoint, you can ignore the static permissions defined in the app registration information in the Azure portal and request permissions incrementally<br/><br/><a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-permissions-and-consent#types-of-consent" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/v1-permissions-and-consent#types-of-consent</a> 
|App can behave as|	Resource	|Scope (1 Resource -> n Scopes)|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://blogs.msdn.microsoft.com/gianlucb/2017/12/05/azure-ad-scope-based-authorization/</a> 
|Well known scopes	|No	|Yes<br/><br/>Offline Access<br/>OpenID,<br/>Profile and Email|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison#openid-profile-and-email</a>
|Supported by Microsoft	|Yes	|Yes (*) | (*) The Microsoft identity platform endpoint (V2) doesn't support all Azure AD scenarios and features.<br/><br/>To determine if you should use the Microsoft identity platform endpoint see limitations:<br/><br/> <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison#limitations</a>
|Protocols supported |OpenID Connect<br/>OAuth<br/>SAML<br/>WS-Federation |OpenID Connect<br/>OAuth
|Recommended Client Library|ADAL	|MSAL
|Platform supported (by supported client libraries)	|.NET, JavaScript, iOS, Android, Java, node.js and Python	|.NET, JavaScript, iOS, and Android, node.js
|Limitations on V2		| |Yes<br/><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison#limitations</a><br/><br/>Restrictions on app registrations<br/>Restrictions on redirect URLs<br/>Protocol changes<br/><br/>Restrictions on libraries and SDKs (see below)

# Microsoft Identity Platform (V2): Restriction on libraries and SDKs

<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/azure-ad-endpoint-comparison#restrictions-on-libraries-and-sdks</a> 

Currently, library support for the Microsoft identity platform endpoint is limited. If you want to use the Microsoft identity platform endpoint in a production application, you have these options: 


| Application Type | Supportability levelo |
|----------|----------|
|Web Application	use the generally available server-side middleware to perform sign-in and token validation.|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview#getting-started</a> |
|Desktop or Mobile Application|	use one of the preview Microsoft Authentication Libraries (MSAL). These libraries are in a production-supported preview, so it is safe to use them in production applications.<br/><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-v2-libraries</a>|
Platforms not covered by Microsoft libraries|you can integrate with the Microsoft identity platform endpoint by directly sending and receiving protocol messages in your application code.<br/><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-v2-protocols</a>|
|3th party OpenID and OAuth Libraries|The Microsoft identity platform endpoint should be compatible with many open-source protocol libraries without changes.<br/><br/>These libraries are not supported by Microsoft<br/><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-v2-libraries</a> 

## Microsoft-supported libraries for V2 Endpoints
<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-v2-libraries</a> 

### Client
Support disclaimer: “*Please note that during the preview we may make changes to the API, internal cache format, and other mechanisms of this library, which you will be required to take along with bug fixes or feature improvements. This may impact your application. For instance, a change to the cache format may impact your users, such as requiring them to sign in again. An API change may require you to update your code. When we provide the General Availability release we will require you to update to the General Availability version within six months, as applications written using a preview version of library may no longer work*”


| Platform/Library|Status|
|----------|----------|
|JS/MSAL.js|Preview|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angularjs/README.md</a> 
|Angular JS (1.x)/MS Angular JS|Preview|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angularjs/README.md</a> 
|.NET/MSAL.NET|Preview|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-dotnet</a> 
|iOS/MSAL objective_C|Preview|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-objc</a> 
|Android/Android MSAL|Preview|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-android</a> 

### Server

| Platform/Library | Status |
|----------|----------|
|.NET(+ core)<br/>ASP.NET Security<br/>IdentityModel Extensions for .NET|Stable/Supported | https://github.com/aspnet/AspNetCore <br/><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet 
|Node/Azure AD Passport</a>|Stable/Supported|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/passport-azure-ad</a> 

Brokered authentication and Single Sign On (SSO) are in roadmap:

* **Android**: is work in progress, no ETA (<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-android/pull/550</a> )
* **iOS**:  support for authentication broker released (v0.3.0 - Added Auth broker support - <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-objc/releases</a> ) 
* **.NET/Xamarin**: in roadmap “Some scenarios, involving conditional access related to a device being 
enrolled require a broker (Microsoft Company portal or Microsoft Authenticator) to be installed on a device. MSAL.NET is not yet capable of interacting with these brokers, but this is on the backlog” <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki/scenarios</a>  
“[Feature coming in future release of MSAL v3.x] … Brokered Authentication for iOS …” <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki/Leveraging-the-broker-on-iOS#brokered-authentication-for-ios</a>

## Microsoft Supported Library for V1 Endpoints (ADAL)

<a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-libraries" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-libraries</a> 

### Client

<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-libraries#microsoft-supported-client-libraries</a> 

Brokered Authentication and single sign are supported:

| Platform/Library | Status |
|----------|----------|
|.NET Client, Windows Store, UWP, Xamarin iOS and Android|Supported|<a href="https://github.com/AzureAD/azure-activedirectory-library-for-dotnet" target="_blank">https://github.com/AzureAD/azure-activedirectory-library-for-dotnet</a> 
|.NET Client, Windows Store, Windows Phone 8.1|Supported|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/azure-activedirectory-library-for-dotnet/releases/tag/v2.28.4</a> 
|Javascript|Supported|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/azure-activedirectory-library-for-js</a> 
|iOS, macOS|Supported|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/azure-activedirectory-library-for-objc</a> 
|Android|Supported|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/azure-activedirectory-library-for-android</a> 

* <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-v1-enable-sso-ios</a> 
* <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-v1-enable-sso-android</a>


### Server

<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-authentication-libraries#microsoft-supported-server-libraries</a> 


| Platform/Library | Status |
|----------|----------|
|.NET/OWIN|Supported|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/aspnet/AspNetKatana/tree/dev/src/Microsoft.Owin.Security.ActiveDirectory</a><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/aspnet/AspNetKatana/tree/dev/src/Microsoft.Owin.Security.OpenIdConnect</a><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/aspnet/AspNetKatana/tree/dev/src/Microsoft.Owin.Security.WsFederation</a><br/><a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet</a> 
|Node.js/Azure AD Passport|Supported|<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://github.com/AzureAD/passport-azure-ad</a> 

## Breaking Changes

The authentication system alters and adds features on an ongoing basis to improve security and standards compliance. To stay up-to-date with the most recent developments, the following page provides information about the details: <a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" target="_blank">https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-breaking-changes</a> 












